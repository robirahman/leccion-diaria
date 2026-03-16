'use strict';

const fs = require('fs');
const vm = require('vm');

// Load app-core.js functions we can test in isolation
// We need to extract just the pure functions (no DOM deps)
const coreCode = fs.readFileSync(require('path').join(__dirname, '..', 'app-core.js'), 'utf8');

// Create a minimal mock context for app-core
const ctx = vm.createContext({
  document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [] },
  window: {},
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  navigator: { onLine: true, serviceWorker: null },
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  requestAnimationFrame: fn => fn(),
  setTimeout, clearTimeout, setInterval, clearInterval,
  console,
  indexedDB: null,
  alert: () => {},
  // FSRS constants needed by app-core
  FSRS_AGAIN: 1, FSRS_HARD: 2, FSRS_GOOD: 3, FSRS_EASY: 4,
  fsrsInitS: r => [0, 0.4, 1.18, 3.13, 15.47][r],
  fsrsInitD: () => 5,
  fsrsR: (s, d) => Math.pow(1 + d / (9 * s), -1),
  fsrsSAfterRecall: (d, s) => s * 2,
  fsrsNextD: (d) => d,
  masteryFromFsrs: s => { if (!s || s < 0.5) return 1; if (s < 7) return 2; if (s < 21) return 3; return 4; },
  VERBS: [],
  GRAMMAR_DATA: [],
  PHRASES_DATA: [],
  VOCAB_CATEGORIES: {},
});

try {
  vm.runInContext(coreCode, ctx);
} catch (e) {
  // Ignore DOM-related errors during init
}

const { stripAccents, checkAnswer, esc, pick, bookmarkType, bookmarkId, shuffle, pickN } = ctx;

describe('stripAccents', () => {
  it('removes accent marks', () => {
    assertEqual(stripAccents('café'), 'cafe');
    assertEqual(stripAccents('niño'), 'nino');
    assertEqual(stripAccents('árbol'), 'arbol');
  });

  it('handles ñ → n', () => {
    assertEqual(stripAccents('año'), 'ano');
    assertEqual(stripAccents('ñoño'), 'nono');
  });

  it('handles strings without accents', () => {
    assertEqual(stripAccents('hello'), 'hello');
    assertEqual(stripAccents(''), '');
  });

  it('handles all Spanish accented vowels', () => {
    assertEqual(stripAccents('á'), 'a');
    assertEqual(stripAccents('é'), 'e');
    assertEqual(stripAccents('í'), 'i');
    assertEqual(stripAccents('ó'), 'o');
    assertEqual(stripAccents('ú'), 'u');
    assertEqual(stripAccents('ü'), 'u');
  });
});

describe('checkAnswer', () => {
  it('returns correct for exact match', () => {
    const r = checkAnswer('hablo', 'hablo');
    assert(r.correct === true && r.accentWarn === false);
  });

  it('is case-insensitive', () => {
    assert(checkAnswer('Hablo', 'hablo').correct === true);
    assert(checkAnswer('HABLO', 'hablo').correct === true);
  });

  it('trims whitespace', () => {
    assert(checkAnswer('  hablo  ', 'hablo').correct === true);
  });

  it('detects accent mismatch (warn mode by default)', () => {
    // Default mode is 'warn' — correct but with warning
    const r = checkAnswer('cafe', 'café');
    assert(r.correct === true, 'Should be correct in warn mode');
    assert(r.accentWarn === true, 'Should warn about accent');
  });

  it('rejects wrong answers', () => {
    assert(checkAnswer('como', 'hablo').correct === false);
  });
});

describe('esc (HTML escaping)', () => {
  it('escapes HTML entities', () => {
    assertEqual(esc('<script>'), '&lt;script&gt;');
    assertEqual(esc('"hello"'), '&quot;hello&quot;');
    assertEqual(esc('a & b'), 'a &amp; b');
  });

  it('handles null/undefined', () => {
    assertEqual(esc(null), '');
    assertEqual(esc(undefined), '');
  });

  it('handles numbers', () => {
    assertEqual(esc(42), '42');
  });
});

describe('pick', () => {
  it('returns an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = pick(arr);
    assert(arr.includes(result), 'Result should be an element of the array');
  });

  it('returns undefined for empty array', () => {
    assertEqual(pick([]), undefined);
  });

  it('returns undefined for null/undefined', () => {
    assertEqual(pick(null), undefined);
    assertEqual(pick(undefined), undefined);
  });

  it('returns the only element for single-item array', () => {
    assertEqual(pick([42]), 42);
  });
});

describe('bookmarkType', () => {
  it('extracts type from bookmark key', () => {
    assertEqual(bookmarkType('vocab:hello'), 'vocab');
    assertEqual(bookmarkType('grammar:lesson-1'), 'grammar');
    assertEqual(bookmarkType('phrase:greetings:1'), 'phrase');
  });
});

describe('bookmarkId', () => {
  it('extracts id from bookmark key', () => {
    assertEqual(bookmarkId('vocab:hello'), 'hello');
    assertEqual(bookmarkId('grammar:lesson-1'), 'lesson-1');
  });

  it('handles multiple colons (returns everything after first)', () => {
    assertEqual(bookmarkId('phrase:greetings:1'), 'greetings:1');
  });

  it('returns empty string for malformed bookmark (no colon)', () => {
    assertEqual(bookmarkId('malformed'), '');
  });
});

describe('shuffle', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    assertEqual(result.length, arr.length);
  });

  it('does not modify original array', () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    assertEqual(arr.length, 3);
    assertEqual(arr[0], 1);
  });

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    for (const item of arr) {
      assert(result.includes(item), `Result should include ${item}`);
    }
  });
});

describe('pickN', () => {
  it('returns n elements from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = pickN(arr, 3);
    assertEqual(result.length, 3);
  });

  it('returns all elements when n >= array length', () => {
    const arr = [1, 2, 3];
    const result = pickN(arr, 5);
    assertEqual(result.length, 3);
  });

  it('returns empty array when n is 0', () => {
    const result = pickN([1, 2, 3], 0);
    assertEqual(result.length, 0);
  });
});
