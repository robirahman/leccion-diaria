#!/usr/bin/env python3
"""
Add example sentences to vocab entries that are missing them.

Sends words to Claude API in batches of 50, requesting example sentences.
Supports checkpoint/resume. Updates vocab.js in place when complete.

Usage:
    python3 enrich_examples.py

Input:  missing_examples.json (extracted from vocab.js)
Output: enriched_examples.json, then patches vocab.js
"""

import json
import os
import sys
import time
from pathlib import Path

from anthropic import Anthropic

INPUT_FILE = Path(__file__).parent / 'missing_examples.json'
OUTPUT_FILE = Path(__file__).parent / 'enriched_examples.json'
CHECKPOINT_FILE = Path(__file__).parent / 'examples_checkpoint.json'

BATCH_SIZE = 50
MODEL = 'claude-haiku-4-5-20251001'
MAX_RETRIES = 5
RETRY_DELAY = 30
MIN_BATCH_INTERVAL = 35

SYSTEM_PROMPT = """You are a Spanish-English bilingual lexicographer. You will receive Spanish words with their English translations and part of speech. For each word, provide an example sentence.

Return a JSON array where each object has:
- "word": the Spanish word (exactly as given)
- "example": a natural Spanish sentence using the word (8-15 words)
- "exampleEn": English translation of the example sentence

Guidelines:
- For verbs, conjugate naturally in the example.
- Example sentences should be natural, everyday Spanish.
- Match the difficulty level to the word's CEFR level when possible.

Return ONLY a JSON array. No markdown, no commentary."""


def build_prompt(words):
    lines = []
    for w in words:
        pos = w.get('pos', '')
        eng = w.get('english', '')
        level = w.get('level', '')
        lines.append(f"- {w['word']} ({pos}, \"{eng}\", {level})")
    return f"Provide example sentences for these {len(lines)} Spanish words:\n\n" + '\n'.join(lines)


def parse_response(text):
    text = text.strip()
    if text.startswith('```'):
        lines = text.split('\n')
        text = '\n'.join(lines[1:])
        if text.endswith('```'):
            text = text[:-3]
        text = text.strip()
    return json.loads(text)


def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        return json.loads(CHECKPOINT_FILE.read_text(encoding='utf-8'))
    return {'completed_batches': 0, 'results': []}


def save_checkpoint(data):
    CHECKPOINT_FILE.write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')


def process_batch(client, batch, batch_idx, total_batches):
    for attempt in range(MAX_RETRIES):
        try:
            response = client.messages.create(
                model=MODEL,
                max_tokens=8192,
                system=SYSTEM_PROMPT,
                messages=[{'role': 'user', 'content': build_prompt(batch)}],
            )
            text = response.content[0].text
            results = parse_response(text)

            # Build lookup
            by_word = {r['word']: r for r in results if 'word' in r}

            enriched = []
            for w in batch:
                r = by_word.get(w['word'], {})
                enriched.append({
                    'word': w['word'],
                    'example': r.get('example', ''),
                    'exampleEn': r.get('exampleEn', ''),
                })

            tokens = f"{response.usage.input_tokens}in/{response.usage.output_tokens}out"
            ok = sum(1 for e in enriched if e['example'])
            return (batch_idx, enriched, ok, tokens)

        except json.JSONDecodeError as e:
            print(f"    Batch {batch_idx+1}: JSON parse error (attempt {attempt+1}): {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
        except Exception as e:
            err = type(e).__name__
            print(f"    Batch {batch_idx+1}: {err} (attempt {attempt+1}): {e}")
            if attempt < MAX_RETRIES - 1:
                wait = 60 if 'rate' in str(e).lower() else RETRY_DELAY * (attempt + 1)
                time.sleep(wait)

    return (batch_idx, [{'word': w['word'], 'example': '', 'exampleEn': ''} for w in batch], 0, 'FAILED')


def main():
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("ERROR: Set ANTHROPIC_API_KEY environment variable")
        sys.exit(1)

    if not INPUT_FILE.exists():
        print(f"ERROR: {INPUT_FILE} not found")
        sys.exit(1)

    words = json.loads(INPUT_FILE.read_text(encoding='utf-8'))
    print(f"Loaded {len(words):,} words missing examples")

    batches = [words[i:i + BATCH_SIZE] for i in range(0, len(words), BATCH_SIZE)]
    print(f"Created {len(batches)} batches of {BATCH_SIZE}")

    checkpoint = load_checkpoint()
    start_batch = checkpoint['completed_batches']
    results = checkpoint['results']

    if start_batch > 0:
        print(f"Resuming from batch {start_batch + 1}/{len(batches)} "
              f"({len(results)} words done)")

    client = Anthropic(api_key=api_key)
    t0 = time.time()
    last_batch_time = 0
    total_done = start_batch

    for batch_idx in range(start_batch, len(batches)):
        elapsed_since_last = time.time() - last_batch_time
        if elapsed_since_last < MIN_BATCH_INTERVAL and last_batch_time > 0:
            time.sleep(MIN_BATCH_INTERVAL - elapsed_since_last)

        last_batch_time = time.time()
        _, enriched, ok, tokens = process_batch(client, batches[batch_idx], batch_idx, len(batches))
        results.extend(enriched)
        total_done += 1

        elapsed = time.time() - t0
        rate = total_done / elapsed if elapsed > 0 else 0
        eta = (len(batches) - total_done) / rate / 60 if rate > 0 else 0
        print(f"  Batch {batch_idx+1}/{len(batches)}: {ok}/{len(enriched)} OK "
              f"[{tokens}] — {len(results):,} total, ETA {eta:.0f}m")

        checkpoint['completed_batches'] = batch_idx + 1
        checkpoint['results'] = results
        save_checkpoint(checkpoint)

    # Write output
    OUTPUT_FILE.write_text(json.dumps(results, ensure_ascii=False), encoding='utf-8')

    ok_count = sum(1 for r in results if r['example'])
    print(f"\n{'=' * 60}")
    print(f"Done! {ok_count:,}/{len(results):,} examples generated")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Elapsed: {(time.time()-t0)/60:.1f} minutes")

    if CHECKPOINT_FILE.exists():
        CHECKPOINT_FILE.unlink()
        print("Checkpoint cleaned up")


if __name__ == '__main__':
    main()
