#!/usr/bin/env python3
"""Generate freq_vocab.js from wordfreq's top 30k Spanish words."""

import re
from wordfreq import top_n_list, zipf_frequency

# Common English words that leak into Spanish frequency lists
ENGLISH_STOPWORDS = {
    'the', 'and', 'for', 'that', 'with', 'this', 'from', 'are', 'was',
    'have', 'has', 'not', 'but', 'you', 'all', 'can', 'had', 'her',
    'one', 'our', 'out', 'day', 'get', 'him', 'his', 'how', 'its',
    'may', 'new', 'now', 'old', 'see', 'way', 'who', 'did', 'got',
    'let', 'say', 'she', 'too', 'use', 'act', 'art', 'home', 'live',
    'just', 'than', 'them', 'been', 'call', 'come', 'each', 'make',
    'like', 'long', 'look', 'many', 'most', 'much', 'must', 'name',
    'only', 'over', 'such', 'take', 'they', 'very', 'when', 'will',
    'with', 'your', 'about', 'after', 'could', 'every', 'first',
    'found', 'great', 'house', 'large', 'little', 'never', 'other',
    'place', 'right', 'small', 'still', 'their', 'there', 'these',
    'thing', 'think', 'those', 'under', 'water', 'where', 'which',
    'world', 'would', 'being', 'between', 'people', 'made', 'more',
    'some', 'time', 'what', 'were', 'into', 'back', 'good', 'know',
    'same', 'well', 'work', 'down', 'even', 'here', 'last', 'then',
    'before', 'should', 'through', 'also', 'years', 'life', 'off',
    'own', 'love', 'free', 'best', 'open', 'play', 'start', 'keep',
    'real', 'need', 'help', 'show', 'hand', 'high', 'part', 'end',
    'turn', 'full', 'head', 'given', 'set', 'run', 'land', 'line',
    'point', 'city', 'state', 'form', 'power', 'music', 'team',
    'game', 'night', 'human', 'service', 'system', 'social', 'public',
    'market', 'club', 'online', 'video', 'data', 'post', 'face',
    'app', 'blog', 'email', 'web', 'internet', 'software', 'media',
    'phone', 'chat', 'site', 'link', 'file', 'user', 'server',
}

# Words that look English but are valid Spanish
SPANISH_VALID = {
    'plan', 'bar', 'test', 'hotel', 'real', 'popular', 'general',
    'social', 'final', 'total', 'natural', 'normal', 'central',
    'original', 'capital', 'principal', 'material', 'animal',
    'cultural', 'personal', 'nacional', 'regional', 'local',
    'federal', 'legal', 'moral', 'rural', 'brutal', 'fatal',
    'control', 'color', 'error', 'favor', 'honor', 'humor',
    'motor', 'sector', 'factor', 'director', 'doctor', 'actor',
    'interior', 'exterior', 'superior', 'anterior', 'posterior',
}


def level_from_rank(rank):
    if rank <= 500:
        return 'A1'
    elif rank <= 1500:
        return 'A2'
    elif rank <= 4000:
        return 'B1'
    elif rank <= 8000:
        return 'B2'
    elif rank <= 15000:
        return 'C1'
    else:
        return 'C2'


def is_valid_spanish(word):
    """Filter out non-Spanish entries."""
    if not word.isalpha():
        return False
    if len(word) < 2:
        return False
    if word in SPANISH_VALID:
        return True
    if word.lower() in ENGLISH_STOPWORDS:
        return False
    # Filter words with non-Spanish characters
    if not re.match(r'^[a-záéíóúüñ]+$', word, re.IGNORECASE):
        return False
    return True


def main():
    raw_words = top_n_list('es', 35000)  # Get extra to account for filtering

    entries = []
    rank = 0
    for word in raw_words:
        if not is_valid_spanish(word):
            continue
        rank += 1
        if rank > 30000:
            break
        zipf = zipf_frequency(word, 'es')
        level = level_from_rank(rank)
        entries.append((word, rank, round(zipf, 2), level))

    # Write JS file
    with open('freq_vocab.js', 'w', encoding='utf-8') as f:
        f.write('// Auto-generated from wordfreq top 30k Spanish words\n')
        f.write(f'// Total entries: {len(entries)}\n')
        f.write('// Fields: word, rank (frequency), zipf (log frequency), level (estimated CEFR)\n\n')
        f.write('const FREQ_VOCAB = [\n')
        for word, r, zipf, level in entries:
            # Escape single quotes in words (shouldn't happen, but safe)
            w = word.replace("'", "\\'")
            f.write(f"  {{w:'{w}',r:{r},z:{zipf},l:'{level}'}},\n")
        f.write('];\n')

    print(f'Generated freq_vocab.js with {len(entries)} entries')
    # Level distribution
    from collections import Counter
    levels = Counter(e[3] for e in entries)
    for lv in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        print(f'  {lv}: {levels[lv]}')


if __name__ == '__main__':
    main()
