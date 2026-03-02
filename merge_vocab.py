#!/usr/bin/env python3
"""
Stage 3: Merge existing curated vocab with LLM-enriched vocab into final vocab.js.

Preserves existing 6.5k curated entries exactly, appends enriched entries,
adds new categories to VOCAB_CATEGORIES, and writes the final file.

Usage:
    python3 merge_vocab.py

Input:  vocab.js (existing curated), enriched_vocab.json (from enrich_vocab.py)
Output: vocab.js (expanded ~30k entries)
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
EXISTING_VOCAB_JS = Path(__file__).parent / 'vocab.js'
ENRICHED_FILE = Path(__file__).parent / 'enriched_vocab.json'
OUTPUT_FILE = Path(__file__).parent / 'vocab.js'
BACKUP_FILE = Path(__file__).parent / 'vocab_backup.js'

# New categories to add to VOCAB_CATEGORIES
NEW_CATEGORIES = {
    'medicine':       {'title': 'Medicina',       'titleEn': 'Medicine',           'icon': '🩺'},
    'cooking':        {'title': 'Cocina',         'titleEn': 'Cooking',            'icon': '🍳'},
    'music_arts':     {'title': 'Artes',          'titleEn': 'Music & Arts',       'icon': '🎭'},
    'geography':      {'title': 'Geografía',      'titleEn': 'Geography',          'icon': '🗺️'},
    'economics':      {'title': 'Economía',       'titleEn': 'Economics',          'icon': '📈'},
    'military':       {'title': 'Militar',        'titleEn': 'Military',           'icon': '🎖️'},
    'architecture':   {'title': 'Arquitectura',   'titleEn': 'Architecture',       'icon': '🏗️'},
    'fashion':        {'title': 'Moda',           'titleEn': 'Fashion',            'icon': '👗'},
    'religion':       {'title': 'Religión',       'titleEn': 'Religion',           'icon': '🕊️'},
    'psychology':     {'title': 'Psicología',     'titleEn': 'Psychology',         'icon': '🧠'},
    'transportation': {'title': 'Transporte',     'titleEn': 'Transportation',     'icon': '🚗'},
    'agriculture':    {'title': 'Agricultura',    'titleEn': 'Agriculture',        'icon': '🌾'},
    'marine':         {'title': 'Náutico',        'titleEn': 'Maritime',           'icon': '⚓'},
}


def parse_existing_vocab(text: str) -> tuple[str, list[dict]]:
    """
    Parse existing vocab.js into:
    - categories_block: the VOCAB_CATEGORIES = { ... }; section
    - entries: list of parsed entry dicts

    Uses Node.js to evaluate the JS and extract entries as JSON,
    which correctly handles mixed quote styles and escaped characters.
    """
    import subprocess
    import tempfile

    # Extract VOCAB_CATEGORIES block
    cat_match = re.search(
        r'(const VOCAB_CATEGORIES\s*=\s*\{.*?\};)',
        text,
        re.DOTALL
    )
    categories_block = cat_match.group(1) if cat_match else ''

    # Use Node.js: append JSON output to the vocab.js content and run as one script
    vocab_content = EXISTING_VOCAB_JS.read_text(encoding='utf-8')
    tmp_script = Path(__file__).parent / '_parse_vocab_tmp.js'
    tmp_script.write_text(
        vocab_content + '\nprocess.stdout.write(JSON.stringify(VOCAB_DATA));\n',
        encoding='utf-8'
    )

    try:
        result = subprocess.run(
            ['node', '--max-old-space-size=512', str(tmp_script)],
            capture_output=True, text=True, timeout=60
        )
        if result.returncode != 0:
            print(f"ERROR: Node.js parsing failed: {result.stderr[:500]}")
            sys.exit(1)

        entries = json.loads(result.stdout)
    finally:
        tmp_script.unlink(missing_ok=True)

    return categories_block, entries


def escape_js_string(s: str) -> str:
    """Escape a string for use in a JS single-quoted string."""
    return s.replace("\\", "\\\\").replace("'", "\\'")


def format_entry(e: dict) -> str:
    """Format a single vocab entry as a JS object literal."""
    word = escape_js_string(e['word'])
    english = escape_js_string(e.get('english', ''))
    category = escape_js_string(e.get('category', 'abstract'))
    pos = escape_js_string(e.get('pos', 'noun'))
    gender = f"'{e['gender']}'" if e.get('gender') else 'null'
    example = escape_js_string(e.get('example', ''))
    exampleEn = escape_js_string(e.get('exampleEn', ''))
    level = e.get('level', 'C2')
    freq = e.get('freq', 3)

    return (
        f"  {{ word: '{word}', english: '{english}', "
        f"category: '{category}', pos: '{pos}', gender: {gender}, "
        f"example: '{example}', exampleEn: '{exampleEn}', "
        f"level: '{level}', freq: {freq} }}"
    )


def build_categories_block(existing_text: str) -> str:
    """Add new categories to the existing VOCAB_CATEGORIES block."""
    # Find the closing }; of VOCAB_CATEGORIES
    insert_pos = existing_text.rfind('};')
    if insert_pos == -1:
        print("ERROR: Could not find end of VOCAB_CATEGORIES")
        sys.exit(1)

    # Build new category entries
    new_entries = []
    for key, val in NEW_CATEGORIES.items():
        title = escape_js_string(val['title'])
        titleEn = escape_js_string(val['titleEn'])
        icon = val['icon']
        new_entries.append(
            f"  {key}: {{ title: '{title}', titleEn: '{titleEn}', icon: '{icon}' }},"
        )

    new_block = '\n'.join(new_entries)
    return existing_text[:insert_pos] + new_block + '\n' + existing_text[insert_pos:]


def main():
    print("=" * 60)
    print("STAGE 3: Merge curated + enriched vocabulary")
    print("=" * 60)

    # Load existing vocab.js
    print("\n[1/5] Loading existing vocab.js...")
    existing_text = EXISTING_VOCAB_JS.read_text(encoding='utf-8')
    categories_block, curated_entries = parse_existing_vocab(existing_text)
    print(f"  Parsed {len(curated_entries):,} curated entries")

    # Separate curated entries into complete (with examples) and minimal (without)
    FULL_FIELDS = {'word', 'english', 'category', 'pos', 'example', 'exampleEn', 'level'}
    complete_curated = []
    minimal_curated = []
    for e in curated_entries:
        if all(e.get(f) for f in FULL_FIELDS):
            complete_curated.append(e)
        else:
            minimal_curated.append(e)
    print(f"  Complete (with examples): {len(complete_curated):,}")
    print(f"  Minimal (no examples):    {len(minimal_curated):,}")

    complete_words = {e['word'].lower() for e in complete_curated}
    minimal_words = {e['word'].lower() for e in minimal_curated}

    # Load enriched vocab
    print("\n[2/5] Loading enriched vocabulary...")
    if not ENRICHED_FILE.exists():
        print(f"ERROR: {ENRICHED_FILE} not found. Run enrich_vocab.py first.")
        sys.exit(1)

    enriched = json.loads(ENRICHED_FILE.read_text(encoding='utf-8'))
    print(f"  Loaded {len(enriched):,} enriched entries")

    # Build enriched lookup by word
    enriched_by_word = {}
    for e in enriched:
        w = e.get('word', '').lower()
        if w and w not in enriched_by_word:
            enriched_by_word[w] = e

    # Upgrade minimal curated entries with enriched data where available
    upgraded = 0
    final_curated = list(complete_curated)
    for e in minimal_curated:
        w = e['word'].lower()
        if w in enriched_by_word:
            enriched_e = enriched_by_word[w]
            # Use enriched version but preserve curated category/level if present
            merged = dict(enriched_e)
            if e.get('category'):
                merged['category'] = e['category']
            if e.get('level'):
                merged['level'] = e['level']
            final_curated.append(merged)
            upgraded += 1
        else:
            # Keep minimal entry as-is (will use format_entry defaults)
            final_curated.append(e)

    print(f"  Upgraded {upgraded:,} minimal entries with enriched data")

    curated_words = {e['word'].lower() for e in final_curated}

    # Remap invalid categories to valid ones
    CATEGORY_REMAP = {
        'history': 'society', 'politics': 'society', 'political': 'society',
        'government': 'society', 'culture': 'society', 'organization': 'society',
        'events': 'society', 'diplomatic': 'society', 'international': 'society',
        'political_legal': 'legal', 'crime': 'legal',
        'objects': 'house', 'object': 'house', 'furniture': 'house', 'toys': 'house',
        'tools': 'technology', 'materials': 'technology', 'industrial': 'technology',
        'infrastructure': 'architecture', 'real_estate': 'architecture',
        'real estate': 'architecture',
        'interjection': 'colloquial', 'interjections': 'colloquial',
        'onomatopoeia': 'colloquial', 'sounds': 'colloquial', 'speech': 'colloquial',
        'literature': 'literary', 'language': 'literary', 'linguistic': 'literary',
        'linguistics': 'literary', 'latin': 'literary', 'mythology': 'literary',
        'art': 'music_arts', 'photography': 'music_arts',
        'science': 'scientific', 'biology': 'scientific', 'chemistry': 'scientific',
        'physics': 'scientific', 'geology': 'scientific', 'astronomy': 'scientific',
        'anatomy': 'medicine', 'medical': 'medicine',
        'plants': 'nature', 'fishing': 'nature',
        'archaeology': 'academic', 'education': 'academic', 'geometry': 'academic',
        'sociology': 'academic', 'philosophy': 'philosophy',
        'celebrations': 'society', 'entertainment': 'media',
        'science fiction': 'literary', 'communication': 'media',
        'proper_nouns': 'abstract', 'proper nouns': 'abstract', 'proper noun': 'abstract',
        'brand': 'abstract', 'name': 'abstract', 'surname': 'abstract',
        'noun': 'abstract', 'phrase': 'colloquial', 'english': 'abstract',
        'hunting': 'sports', 'hobbies': 'sports', 'hobby': 'sports', 'leisure': 'sports',
        'aviation': 'transportation', 'maritime': 'marine',
        'energy': 'environment', 'mining': 'environment',
        'weapons': 'military', 'emergency': 'health',
        'documents': 'legal', 'measurements': 'scientific', 'measurement': 'scientific',
        'accessibility': 'health', 'taste': 'food',
    }

    def remap_category(entry):
        cat = entry.get('category', 'abstract')
        entry['category'] = CATEGORY_REMAP.get(cat, cat)
        return entry

    final_curated = [remap_category(e) for e in final_curated]

    # Collect truly new entries (not in any curated set)
    new_entries = []
    skipped = 0
    for e in enriched:
        if e.get('word', '').lower() in curated_words:
            skipped += 1
            continue
        if not all(e.get(f) for f in ['word', 'english', 'category', 'pos', 'example', 'exampleEn', 'level']):
            skipped += 1
            continue
        new_entries.append(remap_category(e))

    print(f"  After dedup: {len(new_entries):,} new entries ({skipped} skipped)")

    # Deduplicate within new entries (same word appearing twice)
    seen = set()
    deduped = []
    for e in new_entries:
        w = e['word'].lower()
        if w not in seen:
            seen.add(w)
            deduped.append(e)
    print(f"  After internal dedup: {len(deduped):,} unique new entries")

    total = len(final_curated) + len(deduped)
    print(f"\n  Total entries: {len(final_curated):,} curated + {len(deduped):,} new = {total:,}")

    # Backup existing file
    print("\n[3/5] Backing up existing vocab.js...")
    BACKUP_FILE.write_text(existing_text, encoding='utf-8')
    print(f"  Backup: {BACKUP_FILE}")

    # Build new categories block
    print("\n[4/5] Building expanded VOCAB_CATEGORIES...")
    new_categories_block = build_categories_block(categories_block)

    # Group new entries by category for organized output
    by_category = defaultdict(list)
    for e in deduped:
        by_category[e['category']].append(e)

    # Sort within each category by level then frequency
    level_order = {'A1': 0, 'A2': 1, 'B1': 2, 'B2': 3, 'C1': 4, 'C2': 5}
    for cat in by_category:
        by_category[cat].sort(key=lambda e: (
            level_order.get(e['level'], 5),
            e.get('freq', 3)
        ))

    # Category stats
    cat_counts = defaultdict(int)
    for e in final_curated:
        cat_counts[e['category']] += 1
    for e in deduped:
        cat_counts[e['category']] += 1

    print("  Category distribution (top 20):")
    for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1])[:20]:
        print(f"    {cat}: {count:,}")

    # Write final vocab.js
    print("\n[5/5] Writing expanded vocab.js...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('// Vocabulary Database — Lección Diaria\n')
        f.write(f'// {total:,} vocabulary entries ({len(final_curated):,} curated + {len(deduped):,} expanded)\n\n')

        # Write categories
        f.write(new_categories_block)
        f.write('\n\n')

        # Write VOCAB_DATA array
        f.write('const VOCAB_DATA = [\n')

        # First: all curated entries (preserving exact original formatting)
        f.write('  // ══════════════════════════════════════════════\n')
        f.write(f'  // CURATED ENTRIES ({len(final_curated):,} words)\n')
        f.write('  // ══════════════════════════════════════════════\n\n')

        current_cat = None
        for e in final_curated:
            if e['category'] != current_cat:
                current_cat = e['category']
                f.write(f"\n  // ── {current_cat.upper()} ──\n")
            f.write(format_entry(e) + ',\n')

        # Then: all new entries, grouped by category
        f.write('\n  // ══════════════════════════════════════════════\n')
        f.write(f'  // EXPANDED ENTRIES ({len(deduped):,} words)\n')
        f.write('  // ══════════════════════════════════════════════\n')

        # Sort categories for consistent output
        for cat in sorted(by_category.keys()):
            entries_in_cat = by_category[cat]
            f.write(f"\n  // ── {cat.upper()} (expanded, {len(entries_in_cat)} words) ──\n")
            for e in entries_in_cat:
                f.write(format_entry(e) + ',\n')

        f.write('];\n')

    file_size = OUTPUT_FILE.stat().st_size
    print(f"  Output: {OUTPUT_FILE}")
    print(f"  File size: {file_size / 1024:.0f} KB ({file_size / (1024*1024):.1f} MB)")

    # Summary
    print(f"\n{'=' * 60}")
    print(f"Merge complete!")
    print(f"  Curated:  {len(final_curated):,}")
    print(f"  New:      {len(deduped):,}")
    print(f"  Total:    {total:,}")
    print(f"\nNext: run test_vocab_quality.py to validate")


if __name__ == '__main__':
    main()
