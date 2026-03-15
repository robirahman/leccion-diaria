'use strict';

const fs = require('fs');
const vm = require('vm');
const root = require('path').join(__dirname, '..');

// ── Load levenshtein + isCognate from app-practice.js ──────────
const practiceCode = fs.readFileSync(root + '/app-practice.js', 'utf8');
// ── Load placement.js (IRT functions) ──────────────────────────
const placementCode = fs.readFileSync(root + '/placement.js', 'utf8');

// Build a minimal context with stubs for DOM/globals that placement.js references
const ctx = vm.createContext({
  console, Math, Object, Array, JSON, Set, Error, parseInt, parseFloat,
  setTimeout, clearTimeout,
  String, Number, Boolean, RegExp, Date,
  Infinity, NaN, undefined,
  // DOM stubs
  document: {
    getElementById: () => ({ style: {}, innerHTML: '', textContent: '', focus: () => {} }),
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ className: '', style: {}, textContent: '', appendChild: () => {} }),
  },
  window: {},
  navigator: { vibrate: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  // Globals that placement.js expects from app-core.js
  VOCAB_DATA: undefined,
  VERB_DATA: [],
  GRAMMAR_DATA: [],
  TENSE_META: {},
  PERSONS: ['yo', 'tú', 'él', 'nosotros', 'vosotros', 'ellos'],
  PERSON_LABELS: {},
  GRAMMAR_LEVELS: {},
  PLACEMENT_QUESTIONS: [],
  MINIMAL_PAIR_CATEGORIES: {},
  progress: { settings: {}, grammarFsrs: {}, grammarDone: {}, vocabMastery: {}, vocabFsrs: {}, verbMastery: {}, verbFsrs: {} },
  currentProfile: 'default',
  // Stub functions from app-core.js
  scoringGroup: function (domain) {
    var DOMAIN_GROUP = { grammar: 'grammar', usage: 'grammar', reading: 'grammar', verb: 'grammar', vocab: 'vocab' };
    return DOMAIN_GROUP[domain] || 'grammar';
  },
  shuffle: function (arr) { return arr.slice(); },
  pick: function (arr) { return arr[0]; },
  pickN: function (arr, n) { return arr.slice(0, n); },
  esc: function (s) { return String(s || ''); },
  t: function (k) { return k; },
  tBtn: function (k) { return k; },
  tenseLabel: function () { return ''; },
  getActiveTenses: function (pool) { return pool || []; },
  buildVocabIndexes: function () {},
  VOCAB_BY_LEVEL: {},
  checkAnswer: function (a, b) { return { correct: a === b, accentWarn: false }; },
  showScreen: function () {},
  closeModal: function () {},
  saveProgress: function () {},
  todayStr: function () { return '2026-03-15'; },
  selectMCOption: function () {},
  reviewItem: function () {},
  conjugate: function () { return 'habla'; },
  // Placement state variables (placement.js writes to these)
  placementQuestions: [],
  placementIdx: 0,
  placementThetas: { grammar: 3.0, vocab: 3.0 },
  placementHistory: [],
  placementSEs: { grammar: 2.0, vocab: 2.0 },
  placementUsedIds: null,
  placementLastDomains: [],
  placementTargetLength: 20,
  placementMode: 'both',
  placementCurrentQ: null,
});

// Initialize the Set inside the context
vm.runInContext('placementUsedIds = new Set();', ctx);

// Load app-practice.js (for levenshtein)
try { vm.runInContext(practiceCode, ctx); } catch (e) { /* ignore DOM errors */ }

// Load placement.js
try { vm.runInContext(placementCode, ctx); } catch (e) { /* ignore DOM errors */ }

// Export const/function declarations to the context
vm.runInContext(`
  this.LEVEL_DIFFICULTY = LEVEL_DIFFICULTY;
  this.LEVEL_ORDER = LEVEL_ORDER;
  this.PLACEMENT_LEVELS = PLACEMENT_LEVELS;
  this.irtProb = irtProb;
  this.thetaToLevel = thetaToLevel;
  this.isCognate = isCognate;
  this.levenshtein = levenshtein;
  this.updateTheta = updateTheta;
  this.selectNextIRTQuestion = selectNextIRTQuestion;
  this.buildPlacementVocabQs = buildPlacementVocabQs;
  this.buildPlacementVerbQs = buildPlacementVerbQs;
`, ctx);

const {
  LEVEL_DIFFICULTY, LEVEL_ORDER, PLACEMENT_LEVELS,
  irtProb, thetaToLevel, isCognate, levenshtein,
  updateTheta, selectNextIRTQuestion,
  buildPlacementVocabQs, buildPlacementVerbQs,
} = ctx;


// ═══════════════════════════════════════════════════════════
//  Tests
// ═══════════════════════════════════════════════════════════

describe('LEVEL_DIFFICULTY ordering', () => {
  it('has difficulty values that increase from A1 to C2', () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    for (let i = 1; i < levels.length; i++) {
      assert(
        LEVEL_DIFFICULTY[levels[i]] > LEVEL_DIFFICULTY[levels[i - 1]],
        `${levels[i]} (${LEVEL_DIFFICULTY[levels[i]]}) should be > ${levels[i - 1]} (${LEVEL_DIFFICULTY[levels[i - 1]]})`
      );
    }
  });
});

describe('thetaToLevel', () => {
  it('maps low theta to A1', () => {
    assertEqual(thetaToLevel(0.5), 'A1');
    assertEqual(thetaToLevel(1.0), 'A1');
    assertEqual(thetaToLevel(1.7), 'A1');
  });

  it('maps mid-range theta to B1', () => {
    assertEqual(thetaToLevel(3.0), 'B1');
    assertEqual(thetaToLevel(3.4), 'B1');
  });

  it('maps high theta to C2', () => {
    assertEqual(thetaToLevel(5.5), 'C2');
    assertEqual(thetaToLevel(6.0), 'C2');
  });

  it('covers all CEFR levels', () => {
    assertEqual(thetaToLevel(1.0), 'A1');
    assertEqual(thetaToLevel(2.0), 'A2');
    assertEqual(thetaToLevel(3.0), 'B1');
    assertEqual(thetaToLevel(3.8), 'B2');
    assertEqual(thetaToLevel(4.8), 'C1');
    assertEqual(thetaToLevel(5.5), 'C2');
  });
});

describe('IRT probability (irtProb)', () => {
  it('returns values in (0, 1) range', () => {
    for (const theta of [0, 1, 3, 5, 7]) {
      for (const diff of [0, 1, 3, 5, 7]) {
        const p = irtProb(theta, diff);
        assert(p > 0 && p < 1, `irtProb(${theta}, ${diff}) = ${p} out of (0,1)`);
      }
    }
  });

  it('P increases when theta > difficulty (high ability)', () => {
    const p = irtProb(5.0, 2.0);
    assert(p > 0.5, `P(5,2) = ${p} should be > 0.5`);
    assert(p > 0.9, `P(5,2) = ${p} should be > 0.9 for large gap`);
  });

  it('P decreases when theta < difficulty', () => {
    const p = irtProb(1.0, 4.0);
    assert(p < 0.5, `P(1,4) = ${p} should be < 0.5`);
    assert(p < 0.1, `P(1,4) = ${p} should be < 0.1 for large gap`);
  });

  it('P ≈ 0.5 when theta equals difficulty (Rasch property)', () => {
    assertClose(irtProb(3.0, 3.0), 0.5, 0.001, 'P(theta=b) should be ~0.5');
    assertClose(irtProb(1.0, 1.0), 0.5, 0.001, 'P(1,1) should be ~0.5');
    assertClose(irtProb(5.0, 5.0), 0.5, 0.001, 'P(5,5) should be ~0.5');
  });
});

describe('MLE theta update direction', () => {
  it('theta moves up after correct answers', () => {
    // Reset placement state
    ctx.placementHistory = [];
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementSEs = { grammar: 2.0, vocab: 2.0 };

    const startTheta = ctx.placementThetas.grammar;
    // Add correct answers at difficulty = 3.0
    ctx.placementHistory = [
      { difficulty: 3.0, correct: true, domain: 'grammar', level: 'B1' },
      { difficulty: 3.0, correct: true, domain: 'grammar', level: 'B1' },
      { difficulty: 3.0, correct: true, domain: 'grammar', level: 'B1' },
    ];
    updateTheta();
    assert(
      ctx.placementThetas.grammar > startTheta,
      `Theta should increase after correct answers: ${ctx.placementThetas.grammar} > ${startTheta}`
    );
  });

  it('theta moves down after incorrect answers', () => {
    ctx.placementHistory = [];
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementSEs = { grammar: 2.0, vocab: 2.0 };

    const startTheta = ctx.placementThetas.grammar;
    ctx.placementHistory = [
      { difficulty: 3.0, correct: false, domain: 'grammar', level: 'B1' },
      { difficulty: 3.0, correct: false, domain: 'grammar', level: 'B1' },
      { difficulty: 3.0, correct: false, domain: 'grammar', level: 'B1' },
    ];
    updateTheta();
    assert(
      ctx.placementThetas.grammar < startTheta,
      `Theta should decrease after incorrect answers: ${ctx.placementThetas.grammar} < ${startTheta}`
    );
  });
});

describe('Standard error decreases with more answers', () => {
  it('SE is smaller after 10 answers than after 2', () => {
    // 2 answers
    ctx.placementHistory = [];
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementSEs = { grammar: 2.0, vocab: 2.0 };
    ctx.placementHistory = [
      { difficulty: 2.5, correct: true, domain: 'grammar', level: 'A2' },
      { difficulty: 3.5, correct: false, domain: 'grammar', level: 'B2' },
    ];
    updateTheta();
    const se2 = ctx.placementSEs.grammar;

    // 10 answers
    ctx.placementHistory = [];
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementSEs = { grammar: 2.0, vocab: 2.0 };
    for (let i = 0; i < 10; i++) {
      ctx.placementHistory.push({
        difficulty: 2.0 + i * 0.4, correct: i % 2 === 0, domain: 'grammar', level: 'B1',
      });
    }
    updateTheta();
    const se10 = ctx.placementSEs.grammar;

    assert(se10 < se2, `SE with 10 answers (${se10}) should be < SE with 2 answers (${se2})`);
  });
});

describe('selectNextIRTQuestion', () => {
  it('picks the question closest to current theta', () => {
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementHistory = [];
    ctx.placementUsedIds = vm.runInContext('new Set()', ctx);
    ctx.placementLastDomains = [];
    ctx.placementTargetLength = 20;
    ctx.placementMode = 'both';
    ctx.placementQuestions = [
      { id: 'q1', difficulty: 1.0, domain: 'grammar', level: 'A1' },
      { id: 'q2', difficulty: 3.1, domain: 'grammar', level: 'B1' },
      { id: 'q3', difficulty: 5.5, domain: 'grammar', level: 'C2' },
    ];
    const next = selectNextIRTQuestion();
    assertEqual(next.id, 'q2', 'Should pick question closest to theta=3.0');
  });

  it('does not pick already-used questions', () => {
    ctx.placementThetas = { grammar: 3.0, vocab: 3.0 };
    ctx.placementHistory = [];
    ctx.placementUsedIds = vm.runInContext('new Set(["q2"])', ctx);
    ctx.placementLastDomains = [];
    ctx.placementTargetLength = 20;
    ctx.placementMode = 'both';
    ctx.placementQuestions = [
      { id: 'q1', difficulty: 1.0, domain: 'grammar', level: 'A1' },
      { id: 'q2', difficulty: 3.1, domain: 'grammar', level: 'B1' },
      { id: 'q3', difficulty: 5.5, domain: 'grammar', level: 'C2' },
    ];
    const next = selectNextIRTQuestion();
    assert(next.id !== 'q2', 'Should not pick an already-used question');
  });
});

describe('buildPlacementVocabQs', () => {
  it('returns empty array when VOCAB_DATA is undefined', () => {
    ctx.VOCAB_DATA = undefined;
    const qs = buildPlacementVocabQs('A1', 5);
    assert(Array.isArray(qs), 'Should return an array');
    assertEqual(qs.length, 0, 'Should be empty when no vocab data');
  });

  it('generates valid MC questions with 4 options when data exists', () => {
    // Provide minimal vocab data
    ctx.VOCAB_DATA = true; // just needs to be defined
    ctx.VOCAB_BY_LEVEL = {
      A1: [
        { word: 'hola', english: 'hello', pos: 'interjection' },
        { word: 'gato', english: 'cat', pos: 'noun' },
        { word: 'perro', english: 'dog', pos: 'noun' },
        { word: 'casa', english: 'house', pos: 'noun' },
        { word: 'agua', english: 'water', pos: 'noun' },
      ],
    };
    ctx.LEVEL_ORDER = LEVEL_ORDER;
    const qs = buildPlacementVocabQs('A1', 2);
    assert(Array.isArray(qs), 'Should return an array');
    for (const q of qs) {
      assertEqual(q.type, 'mc', 'Question type should be mc');
      assertEqual(q.domain, 'vocab', 'Domain should be vocab');
      assertEqual(q.level, 'A1', 'Level should match');
      assert(q.options.length === 4, `Should have 4 options, got ${q.options.length}`);
      assert(q.options.includes(q.answer), 'Options should include the correct answer');
      assert(typeof q.prompt === 'string' && q.prompt.length > 0, 'Should have a prompt');
    }
  });
});

describe('buildPlacementVerbQs', () => {
  it('returns empty array when VERB_DATA is empty', () => {
    ctx.VERB_DATA = [];
    const qs = buildPlacementVerbQs('A1', 3);
    assert(Array.isArray(qs), 'Should return an array');
    assertEqual(qs.length, 0, 'Should be empty with no verb data');
  });
});

describe('isCognate', () => {
  it('returns true for identical words', () => {
    assert(isCognate('hotel', 'hotel') === true, '"hotel"/"hotel" should be cognate');
  });

  it('returns true for near-identical words (accents stripped)', () => {
    assert(isCognate('televisión', 'television') === true, '"televisión"/"television" should be cognate');
  });

  it('returns false for completely different words', () => {
    assert(isCognate('perro', 'dog') === false, '"perro"/"dog" should not be cognate');
    assert(isCognate('casa', 'house') === false, '"casa"/"house" should not be cognate');
  });

  it('returns true for similar Romance-derived words', () => {
    assert(isCognate('animal', 'animal') === true, '"animal"/"animal" should be cognate');
  });

  it('handles short words correctly', () => {
    // Words of length <= 2 require exact match
    assert(isCognate('no', 'no') === true, '"no"/"no" should be cognate');
    assert(isCognate('si', 'if') === false, '"si"/"if" should not be cognate');
  });
});

describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    assertEqual(levenshtein('abc', 'abc'), 0);
    assertEqual(levenshtein('', ''), 0);
  });

  it('returns length of other string when one is empty', () => {
    assertEqual(levenshtein('', 'abc'), 3);
    assertEqual(levenshtein('hello', ''), 5);
  });

  it('returns 1 for single insertion', () => {
    assertEqual(levenshtein('cat', 'cats'), 1);
  });

  it('returns 1 for single deletion', () => {
    assertEqual(levenshtein('cats', 'cat'), 1);
  });

  it('returns 1 for single substitution', () => {
    assertEqual(levenshtein('cat', 'car'), 1);
  });

  it('computes correct distance for longer strings', () => {
    assertEqual(levenshtein('kitten', 'sitting'), 3);
    assertEqual(levenshtein('saturday', 'sunday'), 3);
  });
});
