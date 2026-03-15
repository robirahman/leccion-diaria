'use strict';

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'vocab-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

describe('Vocab Data Validation', () => {
  it('has at least 25,000 entries', () => {
    assert(data.length >= 25000, `Only ${data.length} entries`);
  });

  it('every entry has word, english, and level', () => {
    let bad = 0;
    for (let i = 0; i < data.length; i++) {
      const w = data[i];
      if (!w.word || !w.english || !w.level) {
        bad++;
        if (bad <= 3) console.log(`      BAD [${i}]: ${JSON.stringify(w).slice(0, 100)}`);
      }
    }
    assertEqual(bad, 0, `${bad} entries missing required fields`);
  });

  it('every entry has a valid CEFR level', () => {
    const valid = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
    const bad = data.filter(w => !valid.has(w.level));
    assertEqual(bad.length, 0, `${bad.length} entries with invalid level`);
  });

  it('every entry has a category', () => {
    const bad = data.filter(w => !w.category);
    assertEqual(bad.length, 0, `${bad.length} entries missing category`);
  });

  it('no duplicate words (same word + level)', () => {
    const seen = new Set();
    let dupes = 0;
    for (const w of data) {
      const key = `${w.word}|${w.level}`;
      if (seen.has(key)) {
        dupes++;
        if (dupes <= 3) console.log(`      DUPE: ${w.word} (${w.level})`);
      }
      seen.add(key);
    }
    // Allow some dupes (different categories) but flag if excessive
    assert(dupes < 500, `${dupes} duplicate word+level entries (too many)`);
  });

  it('split files sum to original', () => {
    const chunks = ['vocab-a1a2.json', 'vocab-b1.json', 'vocab-b2.json', 'vocab-c1.json', 'vocab-c2.json'];
    let total = 0;
    for (const chunk of chunks) {
      const p = path.join(__dirname, '..', chunk);
      if (!fs.existsSync(p)) {
        assert(false, `Missing chunk file: ${chunk}`);
        return;
      }
      const d = JSON.parse(fs.readFileSync(p, 'utf8'));
      total += d.length;
    }
    assertEqual(total, data.length, `Split files total ${total} != original ${data.length}`);
  });
});
