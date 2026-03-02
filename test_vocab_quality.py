#!/usr/bin/env python3
"""
Stage 4: Validate quality of the expanded vocab.js.

Runs automated checks on all entries and reports issues.

Usage:
    python3 test_vocab_quality.py

Input:  vocab.js (expanded)
Output: Console report + vocab_quality_report.json
"""

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

VOCAB_JS = Path(__file__).parent / 'vocab.js'
REPORT_FILE = Path(__file__).parent / 'vocab_quality_report.json'

VALID_CATEGORIES = {
    'greetings', 'family', 'food', 'animals', 'places', 'body', 'clothing',
    'professions', 'nature', 'emotions', 'colors', 'numbers', 'time',
    'weather', 'travel', 'technology', 'house', 'school', 'health',
    'sports', 'adjectives', 'adverbs', 'prepositions', 'conjunctions',
    'pronouns', 'academic', 'business', 'abstract', 'legal', 'literary',
    'scientific', 'colloquial', 'philosophy', 'verbs', 'society', 'work',
    'media', 'environment',
    'medicine', 'cooking', 'music_arts', 'geography', 'economics',
    'military', 'architecture', 'fashion', 'religion', 'psychology',
    'transportation', 'agriculture', 'marine',
}

VALID_POS = {'noun', 'verb', 'adjective', 'adverb', 'preposition',
             'conjunction', 'pronoun', 'interjection', 'phrase'}

VALID_LEVELS = {'A1', 'A2', 'B1', 'B2', 'C1', 'C2'}

# Target level distribution (approximate)
LEVEL_TARGETS = {
    'A1': (1000, 3000),
    'A2': (2000, 4500),
    'B1': (4000, 8000),
    'B2': (5000, 9000),
    'C1': (4000, 8000),
    'C2': (3000, 8000),
}


def parse_vocab_js(path: Path) -> list[dict]:
    """Parse all entries from vocab.js."""
    text = path.read_text(encoding='utf-8')

    entries = []
    entry_pattern = re.compile(
        r"\{\s*"
        r"word:\s*['\"](.+?)['\"],\s*"
        r"english:\s*['\"](.+?)['\"],\s*"
        r"category:\s*['\"](.+?)['\"],\s*"
        r"pos:\s*['\"](.+?)['\"],\s*"
        r"gender:\s*(?:'([mf])'|null),\s*"
        r"example:\s*['\"](.+?)['\"],\s*"
        r"exampleEn:\s*['\"](.+?)['\"],\s*"
        r"level:\s*['\"](.+?)['\"],\s*"
        r"freq:\s*(\d+)\s*"
        r"\}"
    )

    for m in entry_pattern.finditer(text):
        entries.append({
            'word': m.group(1),
            'english': m.group(2),
            'category': m.group(3),
            'pos': m.group(4),
            'gender': m.group(5),
            'example': m.group(6),
            'exampleEn': m.group(7),
            'level': m.group(8),
            'freq': int(m.group(9)),
        })

    return entries


def check_entry(entry: dict, all_words: set) -> list[str]:
    """Validate a single entry. Returns list of issue descriptions."""
    issues = []
    word = entry.get('word', '')
    pos = entry.get('pos', '')
    gender = entry.get('gender')
    category = entry.get('category', '')
    level = entry.get('level', '')
    english = entry.get('english', '')
    example = entry.get('example', '')
    exampleEn = entry.get('exampleEn', '')
    freq = entry.get('freq', 0)

    # Required fields
    if not word:
        issues.append('empty word')
    if not english:
        issues.append('empty english translation')
    if not example:
        issues.append('empty example')
    if not exampleEn:
        issues.append('empty exampleEn')

    # POS validation
    if pos not in VALID_POS:
        issues.append(f'invalid pos: {pos}')

    # Gender for nouns
    if pos == 'noun' and gender not in ('m', 'f'):
        issues.append('noun missing gender')

    # Category validation
    if category not in VALID_CATEGORIES:
        issues.append(f'invalid category: {category}')

    # Level validation
    if level not in VALID_LEVELS:
        issues.append(f'invalid level: {level}')

    # Freq validation
    if freq < 1 or freq > 5:
        issues.append(f'freq out of range: {freq}')

    # Verb should end in -ar/-er/-ir/-se
    if pos == 'verb':
        if not re.search(r'(ar|er|ir|arse|erse|irse)$', word):
            issues.append(f'verb does not end in -ar/-er/-ir: {word}')

    # English translation should not be the same as Spanish word
    if english.lower() == word.lower():
        issues.append('english same as spanish word')

    # Example sentence should contain the word (or a stem for verbs)
    if example and word:
        word_lower = word.lower()
        example_lower = example.lower()
        # For verbs, check the stem (first 4+ chars)
        if pos == 'verb':
            stem = word_lower[:-2] if len(word_lower) > 4 else word_lower[:-1]
            if stem not in example_lower and word_lower not in example_lower:
                issues.append('example may not contain the verb')
        else:
            if word_lower not in example_lower:
                issues.append('example does not contain the word')

    # Example sentence length check
    if example:
        word_count = len(example.split())
        if word_count < 3:
            issues.append(f'example too short ({word_count} words)')
        elif word_count > 25:
            issues.append(f'example too long ({word_count} words)')

    return issues


def main():
    print("=" * 60)
    print("VOCABULARY QUALITY REPORT")
    print("=" * 60)

    if not VOCAB_JS.exists():
        print(f"ERROR: {VOCAB_JS} not found")
        sys.exit(1)

    entries = parse_vocab_js(VOCAB_JS)
    print(f"\nTotal entries parsed: {len(entries):,}")

    if len(entries) == 0:
        print("ERROR: No entries parsed!")
        sys.exit(1)

    # Duplicate check
    word_counts = Counter(e['word'].lower() for e in entries)
    duplicates = {w: c for w, c in word_counts.items() if c > 1}

    # Per-entry validation
    all_words = {e['word'].lower() for e in entries}
    issues_by_word = {}
    issue_counts = Counter()
    clean_count = 0

    for entry in entries:
        issues = check_entry(entry, all_words)
        if issues:
            issues_by_word[entry['word']] = issues
            for issue in issues:
                # Normalize issue type
                issue_type = issue.split(':')[0].strip()
                issue_counts[issue_type] += 1
        else:
            clean_count += 1

    # Level distribution
    level_counts = Counter(e['level'] for e in entries)

    # Category distribution
    cat_counts = Counter(e['category'] for e in entries)

    # POS distribution
    pos_counts = Counter(e['pos'] for e in entries)

    # Print report
    print(f"\n{'─' * 40}")
    print("SUMMARY")
    print(f"{'─' * 40}")
    print(f"  Total entries:    {len(entries):,}")
    print(f"  Clean entries:    {clean_count:,} ({clean_count/len(entries)*100:.1f}%)")
    print(f"  Entries w/issues: {len(issues_by_word):,} ({len(issues_by_word)/len(entries)*100:.1f}%)")
    print(f"  Duplicate words:  {len(duplicates)}")

    print(f"\n{'─' * 40}")
    print("LEVEL DISTRIBUTION")
    print(f"{'─' * 40}")
    for lv in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        count = level_counts.get(lv, 0)
        lo, hi = LEVEL_TARGETS.get(lv, (0, 99999))
        status = 'OK' if lo <= count <= hi else 'WARNING'
        bar = '#' * (count // 200)
        print(f"  {lv}: {count:>6,}  (target {lo:,}-{hi:,})  [{status}]  {bar}")

    print(f"\n{'─' * 40}")
    print("CATEGORY DISTRIBUTION (top 20)")
    print(f"{'─' * 40}")
    for cat, count in cat_counts.most_common(20):
        too_big = ' [WARNING: >3000]' if count > 3000 else ''
        print(f"  {cat:<20s} {count:>5,}{too_big}")

    small_cats = [c for c, n in cat_counts.items() if n < 50]
    if small_cats:
        print(f"\n  WARNING: Categories with <50 entries: {', '.join(small_cats)}")

    print(f"\n{'─' * 40}")
    print("POS DISTRIBUTION")
    print(f"{'─' * 40}")
    for pos, count in pos_counts.most_common():
        print(f"  {pos:<15s} {count:>6,}")

    print(f"\n{'─' * 40}")
    print("ISSUE TYPES")
    print(f"{'─' * 40}")
    if issue_counts:
        for issue, count in issue_counts.most_common():
            print(f"  {issue:<40s} {count:>5,}")
    else:
        print("  No issues found!")

    if duplicates:
        print(f"\n{'─' * 40}")
        print(f"DUPLICATES ({len(duplicates)})")
        print(f"{'─' * 40}")
        for word, count in sorted(duplicates.items(), key=lambda x: -x[1])[:20]:
            print(f"  '{word}' appears {count} times")
        if len(duplicates) > 20:
            print(f"  ... and {len(duplicates) - 20} more")

    # Sample issues
    if issues_by_word:
        print(f"\n{'─' * 40}")
        print("SAMPLE ISSUES (first 20)")
        print(f"{'─' * 40}")
        for i, (word, issues) in enumerate(list(issues_by_word.items())[:20]):
            print(f"  {word}: {'; '.join(issues)}")

    # Write full report
    report = {
        'total_entries': len(entries),
        'clean_entries': clean_count,
        'entries_with_issues': len(issues_by_word),
        'duplicates': len(duplicates),
        'level_distribution': dict(level_counts),
        'category_distribution': dict(cat_counts),
        'pos_distribution': dict(pos_counts),
        'issue_counts': dict(issue_counts),
        'duplicate_words': duplicates,
        'all_issues': issues_by_word,
    }
    REPORT_FILE.write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )
    print(f"\nFull report written to {REPORT_FILE}")

    # Exit code based on quality
    if len(issues_by_word) / max(len(entries), 1) > 0.20:
        print("\nFAIL: >20% of entries have issues")
        sys.exit(1)
    elif len(issues_by_word) > 0:
        print(f"\nWARN: {len(issues_by_word)} entries have issues (< 20%)")
        sys.exit(0)
    else:
        print("\nPASS: All entries are clean!")
        sys.exit(0)


if __name__ == '__main__':
    main()
