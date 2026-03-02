#!/usr/bin/env python3
"""
Stage 1: Extract, filter, and lemmatize Spanish vocabulary from wordfreq.

Pulls ~80k raw candidates, aggressively filters (conjugations, proper nouns,
English loanwords, plurals, etc.), lemmatizes with spaCy, and outputs a clean
JSON file of ~25-30k base-form Spanish words ready for LLM enrichment.

Usage:
    python3 build_vocab_pipeline.py

Output:
    filtered_vocab.json  — list of {word, rank, zipf, level} objects
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

import spacy
from wordfreq import top_n_list, zipf_frequency

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
RAW_POOL_SIZE = 100_000       # Pull this many from wordfreq
TARGET_COUNT = 30_000         # We want this many clean lemmas
EXISTING_VOCAB_JS = Path(__file__).parent / 'vocab.js'
OUTPUT_FILE = Path(__file__).parent / 'filtered_vocab.json'

# ---------------------------------------------------------------------------
# CEFR level assignment from frequency rank
# ---------------------------------------------------------------------------
def level_from_rank(rank: int) -> str:
    if rank <= 500:    return 'A1'
    if rank <= 1500:   return 'A2'
    if rank <= 4000:   return 'B1'
    if rank <= 8000:   return 'B2'
    if rank <= 15000:  return 'C1'
    return 'C2'


def level_from_zipf(z: float) -> str:
    """Assign CEFR level based on actual frequency (zipf score).
    This is more accurate than rank-based assignment since it reflects
    true word frequency regardless of filtering."""
    if z >= 5.5:   return 'A1'
    if z >= 4.8:   return 'A2'
    if z >= 4.0:   return 'B1'
    if z >= 3.3:   return 'B2'
    if z >= 2.7:   return 'C1'
    return 'C2'

# ---------------------------------------------------------------------------
# Words that look English but are valid Spanish (cognates / borrowings)
# ---------------------------------------------------------------------------
SPANISH_VALID = {
    # Common cognates
    'plan', 'bar', 'test', 'hotel', 'real', 'popular', 'general',
    'social', 'final', 'total', 'natural', 'normal', 'central',
    'original', 'capital', 'principal', 'material', 'animal',
    'cultural', 'personal', 'nacional', 'regional', 'local',
    'federal', 'legal', 'moral', 'rural', 'brutal', 'fatal',
    'control', 'color', 'error', 'favor', 'honor', 'humor',
    'motor', 'sector', 'factor', 'director', 'doctor', 'actor',
    'interior', 'exterior', 'superior', 'anterior', 'posterior',
    'chocolate', 'tomate', 'garaje', 'radio', 'piano', 'crisis',
    'drama', 'trauma', 'virus', 'alcohol', 'canal', 'debate',
    'editorial', 'familiar', 'formal', 'informal', 'global',
    'ideal', 'industrial', 'lateral', 'liberal', 'literal',
    'mental', 'mineral', 'neutral', 'oral', 'plural', 'radical',
    'ritual', 'sexual', 'serial', 'tropical', 'universal',
    'verbal', 'virtual', 'visual', 'vocal', 'vital', 'brutal',
    'casual', 'dental', 'digital', 'dual', 'electoral',
    'experimental', 'festival', 'fiscal', 'fundamental',
    'horizontal', 'integral', 'manual', 'marginal', 'medieval',
    'nominal', 'occasional', 'oriental', 'oval', 'parental',
    'pastoral', 'perpetual', 'postal', 'provisional', 'serial',
    'terminal', 'textual', 'tribal', 'trivial', 'vertical',
    # Established loanwords in Spanish
    'internet', 'software', 'hardware', 'web', 'blog', 'club',
    'golf', 'rugby', 'jazz', 'rock', 'blues', 'hip', 'rap',
    'marketing', 'manager', 'staff', 'stock', 'parking',
    'camping', 'sandwich', 'hamburger', 'pizza', 'ballet',
    'yoga', 'surf', 'pub', 'show', 'chat', 'fan', 'film',
    'poster', 'spray', 'stress', 'best', 'boom', 'cool',
    # Words that exist in both languages with Spanish meaning
    'noble', 'simple', 'triple', 'doble', 'cable', 'rifle',
    'temple', 'terrible', 'horrible', 'invisible', 'flexible',
    'variable', 'notable', 'probable', 'comparable', 'inevitable',
    'considerable', 'vulnerable', 'favorable', 'considerable',
    'considerable', 'responsable', 'considerable', 'increíble',
    'posible', 'imposible', 'visible', 'sensible', 'estable',
    'miserable', 'adorable', 'admirable', 'aceptable',
}

# ---------------------------------------------------------------------------
# Conjugated verb suffix patterns (to catch forms spaCy misses)
# ---------------------------------------------------------------------------
CONJUGATED_SUFFIXES = [
    # Preterite
    r'[aei]ste$', r'[aei]mos$', r'[aei]steis$',
    r'aron$', r'ieron$', r'ó$',
    # Imperfect
    r'aba$', r'abas$', r'aban$', r'ábamos$', r'abais$',
    r'ías$', r'ían$', r'íamos$', r'íais$',
    # Gerund
    r'ando$', r'iendo$', r'yendo$',
    # Subjunctive imperfect
    r'ara$', r'aras$', r'áramos$', r'aran$',
    r'iera$', r'ieras$', r'iéramos$', r'ieran$',
    r'ase$', r'ases$', r'ásemos$', r'asen$',
    r'iese$', r'ieses$', r'iésemos$', r'iesen$',
    # Conditional / Future
    r'aría$', r'arías$', r'aríamos$', r'arían$',
    r'ería$', r'erías$', r'eríamos$', r'erían$',
    r'iría$', r'irías$', r'iríamos$', r'irían$',
    r'aré$', r'arás$', r'ará$', r'aremos$', r'arán$',
    r'eré$', r'erás$', r'erá$', r'eremos$', r'erán$',
    r'iré$', r'irás$', r'irá$', r'iremos$', r'irán$',
]
CONJUGATED_RE = [re.compile(p) for p in CONJUGATED_SUFFIXES]

# Infinitive endings — these are NOT conjugated
INFINITIVE_RE = re.compile(r'(ar|er|ir|arse|erse|irse)$')

# Participle patterns — keep as adjectives if common enough
PARTICIPLE_RE = re.compile(r'(ado|ido|ada|ida|ados|idos|adas|idas)$')

# ---------------------------------------------------------------------------
# Load existing curated vocab words to deduplicate against
# ---------------------------------------------------------------------------
def load_existing_vocab(path: Path) -> set[str]:
    """Parse vocab.js to extract existing word entries."""
    words = set()
    text = path.read_text(encoding='utf-8')
    # Match word: 'xxx' or word: "xxx" patterns
    for m in re.finditer(r"word:\s*['\"](.+?)['\"]", text):
        words.add(m.group(1).lower())
    print(f"  Loaded {len(words)} existing curated words from vocab.js")
    return words


# ---------------------------------------------------------------------------
# Build English word set for loanword detection
# ---------------------------------------------------------------------------
def build_english_set() -> set[str]:
    """Get common English words to filter against."""
    en_words = set(top_n_list('en', 25000))
    # Remove words that are also very common in Spanish (top 5k)
    es_common = set(top_n_list('es', 5000))
    return en_words - es_common - SPANISH_VALID


# ---------------------------------------------------------------------------
# Proper noun detection via curated patterns
# ---------------------------------------------------------------------------
PROPER_NOUN_PATTERNS = [
    # Common name endings
    r'^(san|santa|santo)\s',  # San José, Santa María
]

# We'll also use spaCy's POS tagging for proper noun detection


# ---------------------------------------------------------------------------
# Main filtering pipeline
# ---------------------------------------------------------------------------
def is_valid_base_form(word: str) -> bool:
    """Quick pre-filter before spaCy processing."""
    # Must be alphabetic (allow Spanish chars)
    if not re.match(r'^[a-záéíóúüñ]+$', word, re.IGNORECASE):
        return False
    # Minimum length
    if len(word) < 3:
        return False
    # All caps (acronyms) — reject if short
    if word.isupper() and len(word) < 5:
        return False
    return True


def looks_conjugated(word: str) -> bool:
    """Check if word matches conjugated verb suffix patterns."""
    # Don't flag infinitives
    if INFINITIVE_RE.search(word):
        return False
    return any(p.search(word) for p in CONJUGATED_RE)


def is_diminutive_or_augmentative(word: str, base_forms: set[str]) -> bool:
    """Check if word is a diminutive/augmentative of an existing word."""
    suffixes = ['ito', 'ita', 'itos', 'itas', 'illo', 'illa',
                'ote', 'ota', 'azo', 'aza', 'ón', 'ona',
                'uelo', 'uela', 'uco', 'uca', 'ucho', 'ucha']
    for suf in suffixes:
        if word.endswith(suf) and len(word) > len(suf) + 2:
            stem = word[:-len(suf)]
            # Check if a plausible base form exists
            for ending in ['o', 'a', 'e', '']:
                if stem + ending in base_forms:
                    return True
    return False


def is_plural(word: str, base_forms: set[str]) -> bool:
    """Check if word is a plural when the singular already exists."""
    if word.endswith('es') and len(word) > 4:
        singular = word[:-2]
        if singular in base_forms:
            return True
        # -ces -> -z (peces -> pez)
        if word.endswith('ces'):
            singular_z = word[:-3] + 'z'
            if singular_z in base_forms:
                return True
    if word.endswith('s') and not word.endswith('es') and len(word) > 3:
        singular = word[:-1]
        if singular in base_forms:
            return True
    return False


def main():
    print("=" * 60)
    print("STAGE 1: Build filtered vocabulary pipeline")
    print("=" * 60)

    # Step 1: Extract raw candidates
    print(f"\n[1/7] Extracting {RAW_POOL_SIZE:,} raw candidates from wordfreq...")
    raw_words = top_n_list('es', RAW_POOL_SIZE)
    print(f"  Got {len(raw_words):,} words")

    # Step 2: Load existing vocab
    print("\n[2/7] Loading existing curated vocabulary...")
    existing_words = load_existing_vocab(EXISTING_VOCAB_JS)

    # Step 3: Build English filter set
    print("\n[3/7] Building English loanword filter...")
    english_set = build_english_set()
    print(f"  English filter: {len(english_set):,} words")

    # Step 4: Basic filtering pass
    print("\n[4/7] Running basic filters...")
    candidates = []
    stats = defaultdict(int)

    for word in raw_words:
        w = word.lower().strip()

        if not is_valid_base_form(w):
            stats['invalid_form'] += 1
            continue

        if w in existing_words:
            stats['already_curated'] += 1
            continue

        if w in english_set and w not in SPANISH_VALID:
            stats['english_loanword'] += 1
            continue

        candidates.append(w)

    print(f"  After basic filters: {len(candidates):,} candidates")
    for reason, count in sorted(stats.items(), key=lambda x: -x[1]):
        print(f"    Filtered {reason}: {count:,}")

    # Step 5: spaCy lemmatization and POS filtering
    print("\n[5/7] Loading spaCy model and lemmatizing...")
    nlp = spacy.load('es_core_news_lg')

    # Process in batches for efficiency
    BATCH_SIZE = 1000
    lemma_map = {}  # lemma -> best (original_word, freq_rank)
    pos_map = {}    # word -> POS tag
    rejected = defaultdict(int)

    for i in range(0, len(candidates), BATCH_SIZE):
        batch = candidates[i:i + BATCH_SIZE]
        if i % 10000 == 0:
            print(f"  Processing {i:,}/{len(candidates):,}...")

        # Process each word in a minimal sentence context for better POS tagging
        for word in batch:
            doc = nlp(word)
            if not doc or len(doc) == 0:
                rejected['empty_parse'] += 1
                continue

            token = doc[0]
            pos = token.pos_
            lemma = token.lemma_.lower()

            # Store POS for later use
            pos_map[word] = pos

            # Filter proper nouns
            if pos == 'PROPN':
                rejected['proper_noun'] += 1
                continue

            # Filter punctuation, symbols, numbers
            if pos in ('PUNCT', 'SYM', 'NUM', 'X'):
                rejected[f'pos_{pos}'] += 1
                continue

            # For verbs: keep only the infinitive form
            if pos == 'VERB' or pos == 'AUX':
                # If the word IS an infinitive, keep it
                if INFINITIVE_RE.search(word):
                    lemma = word  # Keep the original infinitive
                # If spaCy gives us an infinitive lemma, use that
                elif INFINITIVE_RE.search(lemma):
                    pass  # lemma is already the infinitive
                # Otherwise this looks conjugated — try to get the infinitive
                elif looks_conjugated(word):
                    if INFINITIVE_RE.search(lemma):
                        pass  # spaCy found the infinitive
                    else:
                        rejected['conjugated_verb'] += 1
                        continue
                else:
                    # Neither infinitive nor obviously conjugated;
                    # keep if spaCy's lemma is an infinitive
                    if not INFINITIVE_RE.search(lemma):
                        rejected['verb_no_infinitive'] += 1
                        continue

                # Use the infinitive form as the canonical entry
                word_to_store = lemma if INFINITIVE_RE.search(lemma) else word
            else:
                # For non-verbs, use lemma to collapse variants
                # (e.g., europea -> europeo, naturales -> natural)
                word_to_store = lemma if lemma and len(lemma) >= 3 else word

            # Track best rank for each lemma
            freq_rank = i + batch.index(word) + 1  # approximate rank
            if word_to_store not in lemma_map or freq_rank < lemma_map[word_to_store][1]:
                lemma_map[word_to_store] = (word_to_store, freq_rank)

    print(f"  After spaCy processing: {len(lemma_map):,} unique lemmas")
    for reason, count in sorted(rejected.items(), key=lambda x: -x[1]):
        print(f"    Rejected {reason}: {count:,}")

    # Step 6: Second-pass filters (plurals, diminutives, conjugation leftovers)
    print("\n[6/7] Running second-pass filters...")
    all_lemmas = set(lemma_map.keys())
    second_pass_rejected = defaultdict(int)
    final_lemmas = {}

    for word, (canonical, rank) in lemma_map.items():
        # Skip if it's in existing curated vocab
        if word in existing_words:
            second_pass_rejected['already_curated_2'] += 1
            continue

        # Plural check
        if is_plural(word, all_lemmas):
            second_pass_rejected['plural'] += 1
            continue

        # Diminutive/augmentative check
        if is_diminutive_or_augmentative(word, all_lemmas):
            second_pass_rejected['diminutive'] += 1
            continue

        # Still looks conjugated after lemmatization?
        if looks_conjugated(word) and not INFINITIVE_RE.search(word):
            second_pass_rejected['still_conjugated'] += 1
            continue

        # Participle that's not independently common
        if PARTICIPLE_RE.search(word) and rank > 10000:
            # Only keep participles if they're very common (likely used as adjectives)
            second_pass_rejected['rare_participle'] += 1
            continue

        # Filter words with zero or very low zipf (not real Spanish words)
        z = zipf_frequency(word, 'es')
        if z < 1.5:
            second_pass_rejected['very_low_zipf'] += 1
            continue

        # Filter very short fragments that aren't real words
        if len(word) <= 3 and z < 4.0:
            second_pass_rejected['short_low_freq'] += 1
            continue

        # Filter words that are likely proper nouns by checking capitalization
        # frequency in corpora (proper nouns often have high zipf only capitalized)
        # Use a heuristic: if word contains unusual letter combos, reject
        if re.search(r'(kk|ww|xx|zz|qq|yy)', word):
            second_pass_rejected['unusual_chars'] += 1
            continue

        # Filter words ending in non-Spanish patterns
        if re.search(r'(ght|tion|sion|ness|ment|ing|ous|ful|less|ship|ance|ence)$', word):
            second_pass_rejected['english_suffix'] += 1
            continue

        final_lemmas[word] = (rank, z)

    print(f"  After second pass: {len(final_lemmas):,} words")
    for reason, count in sorted(second_pass_rejected.items(), key=lambda x: -x[1]):
        print(f"    Rejected {reason}: {count:,}")

    # Step 7: Sort by frequency and assign levels
    print("\n[7/7] Sorting and assigning CEFR levels...")
    sorted_words = sorted(final_lemmas.items(), key=lambda x: -x[1][1])  # Sort by zipf desc

    entries = []
    for new_rank, (word, (_original_rank, zipf)) in enumerate(sorted_words, 1):
        level = level_from_zipf(zipf)
        entries.append({
            'word': word,
            'rank': new_rank,
            'zipf': round(zipf, 2),
            'level': level,
        })

    # Level distribution
    level_counts = defaultdict(int)
    for e in entries:
        level_counts[e['level']] += 1

    print(f"\n  Total filtered words: {len(entries):,}")
    print("  Level distribution:")
    for lv in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        print(f"    {lv}: {level_counts[lv]:,}")

    # Write output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(entries, f, ensure_ascii=False, indent=None)

    print(f"\n  Output written to {OUTPUT_FILE}")
    print(f"  File size: {OUTPUT_FILE.stat().st_size / 1024:.0f} KB")

    # Also write a summary for human review
    summary_file = Path(__file__).parent / 'filtered_vocab_summary.txt'
    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write(f"Total words: {len(entries)}\n\n")
        f.write("Level distribution:\n")
        for lv in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
            f.write(f"  {lv}: {level_counts[lv]}\n")
        f.write(f"\nSample entries (first 50):\n")
        for e in entries[:50]:
            f.write(f"  {e['rank']:5d}  {e['word']:<25s}  zipf={e['zipf']:.2f}  {e['level']}\n")
        f.write(f"\nSample entries (around rank 5000):\n")
        for e in entries[4990:5010]:
            f.write(f"  {e['rank']:5d}  {e['word']:<25s}  zipf={e['zipf']:.2f}  {e['level']}\n")
        f.write(f"\nSample entries (around rank 15000):\n")
        for e in entries[14990:15010]:
            f.write(f"  {e['rank']:5d}  {e['word']:<25s}  zipf={e['zipf']:.2f}  {e['level']}\n")
        f.write(f"\nSample entries (last 20):\n")
        for e in entries[-20:]:
            f.write(f"  {e['rank']:5d}  {e['word']:<25s}  zipf={e['zipf']:.2f}  {e['level']}\n")
    print(f"  Summary written to {summary_file}")


if __name__ == '__main__':
    main()
