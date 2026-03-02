#!/usr/bin/env python3
"""
Stage 2: Enrich filtered vocabulary with translations, categories, and examples.

Sends words to Claude API in parallel batches of 50, requesting structured JSON.
Supports checkpoint/resume for reliability. Uses 10 concurrent requests.

Usage:
    python3 enrich_vocab.py

Input:  filtered_vocab.json  (from build_vocab_pipeline.py)
Output: enriched_vocab.json  (ready for merge_vocab.py)

Requires: ANTHROPIC_API_KEY environment variable
"""

import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from anthropic import Anthropic

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
INPUT_FILE = Path(__file__).parent / 'filtered_vocab.json'
OUTPUT_FILE = Path(__file__).parent / 'enriched_vocab.json'
CHECKPOINT_FILE = Path(__file__).parent / 'enrich_checkpoint.json'
ERRORS_FILE = Path(__file__).parent / 'enrich_errors.json'

BATCH_SIZE = 50
CONCURRENCY = 1  # sequential to respect rate limits
MODEL = 'claude-haiku-4-5-20251001'
MAX_RETRIES = 5
RETRY_DELAY = 30  # seconds — generous to handle rate limits
MIN_BATCH_INTERVAL = 35  # seconds between batches (~4.5k tokens/batch, 8k limit/min)

# All valid categories (existing + new)
VALID_CATEGORIES = [
    # Existing categories
    'greetings', 'family', 'food', 'animals', 'places', 'body', 'clothing',
    'professions', 'nature', 'emotions', 'colors', 'numbers', 'time',
    'weather', 'travel', 'technology', 'house', 'school', 'health',
    'sports', 'adjectives', 'adverbs', 'prepositions', 'conjunctions',
    'pronouns', 'academic', 'business', 'abstract', 'legal', 'literary',
    'scientific', 'colloquial', 'philosophy', 'verbs', 'society', 'work',
    'media', 'environment',
    # New categories for expanded vocabulary
    'medicine', 'cooking', 'music_arts', 'geography', 'economics',
    'military', 'architecture', 'fashion', 'religion', 'psychology',
    'transportation', 'agriculture', 'marine',
]

CATEGORY_LIST_STR = ', '.join(VALID_CATEGORIES)

SYSTEM_PROMPT = """You are a Spanish-English bilingual lexicographer. You will receive batches of Spanish words and must provide structured metadata for each one.

For each word, return a JSON object with these exact fields:
- "word": the Spanish word (exactly as given)
- "english": concise English translation (1-5 words, most common meaning)
- "pos": part of speech — one of: noun, verb, adjective, adverb, preposition, conjunction, pronoun, interjection, phrase
- "gender": for nouns only, "m" or "f". For all other parts of speech, null
- "category": one of: """ + CATEGORY_LIST_STR + """
- "example": a natural Spanish sentence using the word (8-15 words)
- "exampleEn": English translation of the example sentence

Guidelines:
- For verbs, the word will be in infinitive form (-ar, -er, -ir). Conjugate naturally in the example.
- Choose the most fitting single category. When in doubt:
  - Physical actions → verbs
  - Descriptive words → adjectives
  - General abstract concepts → abstract
  - Domain-specific terms → their domain category (medicine, legal, scientific, etc.)
- Example sentences should be natural, everyday Spanish at the appropriate level.
- Keep translations concise: "to run" not "to run quickly across the field".
- For nouns that can be both m/f (like "artista"), use the most common gender.

Return ONLY a JSON array of objects. No markdown, no commentary."""


def build_batch_prompt(words: list[dict]) -> str:
    """Build the user prompt for a batch of words."""
    word_list = [w['word'] for w in words]
    return (
        f"Provide metadata for these {len(word_list)} Spanish words:\n\n"
        + '\n'.join(f"- {w}" for w in word_list)
    )


def parse_response(text: str) -> list[dict]:
    """Parse the JSON array from Claude's response."""
    text = text.strip()
    if text.startswith('```'):
        lines = text.split('\n')
        text = '\n'.join(lines[1:])
        if text.endswith('```'):
            text = text[:-3]
        text = text.strip()
    return json.loads(text)


def validate_entry(entry: dict) -> list[str]:
    """Validate a single enriched entry. Returns list of issues."""
    issues = []
    required = ['word', 'english', 'pos', 'category', 'example', 'exampleEn']
    for field in required:
        if field not in entry or not entry[field]:
            issues.append(f"missing {field}")
    if entry.get('pos') == 'noun' and entry.get('gender') not in ('m', 'f'):
        issues.append("noun missing gender")
    if entry.get('category') and entry['category'] not in VALID_CATEGORIES:
        issues.append(f"invalid category: {entry['category']}")
    valid_pos = {'noun', 'verb', 'adjective', 'adverb', 'preposition',
                 'conjunction', 'pronoun', 'interjection', 'phrase'}
    if entry.get('pos') and entry['pos'] not in valid_pos:
        issues.append(f"invalid pos: {entry['pos']}")
    return issues


def load_checkpoint() -> dict:
    if CHECKPOINT_FILE.exists():
        return json.loads(CHECKPOINT_FILE.read_text(encoding='utf-8'))
    return {'completed_batches': 0, 'results': []}


def save_checkpoint(data: dict):
    CHECKPOINT_FILE.write_text(
        json.dumps(data, ensure_ascii=False),
        encoding='utf-8'
    )


def process_batch(client, batch, batch_idx, total_batches):
    """Process a single batch. Returns (batch_idx, valid_entries, errors)."""
    for attempt in range(MAX_RETRIES):
        try:
            response = client.messages.create(
                model=MODEL,
                max_tokens=16384,
                system=SYSTEM_PROMPT,
                messages=[{
                    'role': 'user',
                    'content': build_batch_prompt(batch),
                }],
            )

            response_text = response.content[0].text
            enriched = parse_response(response_text)

            batch_errors = []
            valid_entries = []
            for entry in enriched:
                issues = validate_entry(entry)
                if issues:
                    batch_errors.append({
                        'word': entry.get('word', '?'),
                        'issues': issues,
                        'entry': entry,
                    })
                valid_entries.append(entry)

            # Merge with frequency data
            word_to_freq = {w['word']: w for w in batch}
            for entry in valid_entries:
                freq_data = word_to_freq.get(entry.get('word', ''), {})
                entry['rank'] = freq_data.get('rank', 0)
                entry['zipf'] = freq_data.get('zipf', 0)
                entry['level'] = freq_data.get('level', 'C2')
                z = entry['zipf']
                if z >= 6.0:   entry['freq'] = 1
                elif z >= 5.0: entry['freq'] = 2
                elif z >= 4.0: entry['freq'] = 3
                elif z >= 3.5: entry['freq'] = 4
                else:          entry['freq'] = 5

            tokens = f"{response.usage.input_tokens}in/{response.usage.output_tokens}out"
            return (batch_idx, valid_entries, batch_errors, tokens)

        except json.JSONDecodeError as e:
            print(f"    Batch {batch_idx+1}: JSON parse error (attempt {attempt+1}): {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
        except Exception as e:
            err_name = type(e).__name__
            print(f"    Batch {batch_idx+1}: Error (attempt {attempt+1}): {err_name}: {e}")
            if attempt < MAX_RETRIES - 1:
                # Longer wait for rate limits
                wait = 60 if 'rate_limit' in str(e).lower() or 'RateLimit' in err_name else RETRY_DELAY * (attempt + 1)
                time.sleep(wait)

    # All retries failed
    failed_errors = [{'word': w['word'], 'issues': ['batch_failed'], 'entry': w} for w in batch]
    return (batch_idx, [], failed_errors, 'FAILED')


def main():
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("ERROR: Set ANTHROPIC_API_KEY environment variable")
        sys.exit(1)

    if not INPUT_FILE.exists():
        print(f"ERROR: {INPUT_FILE} not found. Run build_vocab_pipeline.py first.")
        sys.exit(1)

    words = json.loads(INPUT_FILE.read_text(encoding='utf-8'))
    print(f"Loaded {len(words):,} filtered words from {INPUT_FILE}")

    batches = [words[i:i + BATCH_SIZE] for i in range(0, len(words), BATCH_SIZE)]
    print(f"Created {len(batches)} batches of {BATCH_SIZE}")

    checkpoint = load_checkpoint()
    start_batch = checkpoint['completed_batches']
    results = checkpoint['results']
    all_errors = []

    if start_batch > 0:
        print(f"Resuming from batch {start_batch + 1}/{len(batches)} "
              f"({len(results)} words already enriched)")

    client = Anthropic(api_key=api_key)

    total_done = start_batch
    t0 = time.time()
    last_batch_time = 0

    # Process sequentially with rate limiting
    for batch_idx in range(start_batch, len(batches)):
        # Rate limiting: wait between batches
        elapsed_since_last = time.time() - last_batch_time
        if elapsed_since_last < MIN_BATCH_INTERVAL and last_batch_time > 0:
            wait = MIN_BATCH_INTERVAL - elapsed_since_last
            time.sleep(wait)

        last_batch_time = time.time()
        batch_idx_val, valid_entries, batch_errors, tokens = process_batch(
            client, batches[batch_idx], batch_idx, len(batches)
        )
        results.extend(valid_entries)
        all_errors.extend(batch_errors)
        total_done += 1

        status = f"{len(valid_entries)} OK" if valid_entries else "FAILED"
        if batch_errors and valid_entries:
            status += f", {len(batch_errors)} issues"
        elapsed = time.time() - t0
        rate = total_done / elapsed if elapsed > 0 else 0
        eta = (len(batches) - total_done) / rate / 60 if rate > 0 else 0
        print(f"  Batch {batch_idx+1}/{len(batches)}: {status} "
              f"[{tokens}] — {len(results):,} total, "
              f"ETA {eta:.0f}m")

        # Save checkpoint after each batch
        checkpoint['completed_batches'] = batch_idx + 1
        checkpoint['results'] = results
        save_checkpoint(checkpoint)

    # Write final output
    OUTPUT_FILE.write_text(
        json.dumps(results, ensure_ascii=False, indent=None),
        encoding='utf-8'
    )
    print(f"\n{'=' * 60}")
    print(f"Enrichment complete!")
    print(f"  Total enriched: {len(results):,}")
    print(f"  Entries with issues: {len(all_errors)}")
    print(f"  Output: {OUTPUT_FILE}")
    print(f"  Elapsed: {(time.time()-t0)/60:.1f} minutes")

    if all_errors:
        ERRORS_FILE.write_text(
            json.dumps(all_errors, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )
        print(f"  Errors: {ERRORS_FILE}")

    if CHECKPOINT_FILE.exists():
        CHECKPOINT_FILE.unlink()
        print("  Checkpoint cleaned up")


if __name__ == '__main__':
    main()
