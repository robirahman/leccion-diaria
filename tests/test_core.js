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

const { stripAccents, checkAnswer, esc } = ctx;

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
