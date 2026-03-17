'use strict';

// ════════════════════════════════════════════════════════════════
//  api-node.js — Node.js loader for Lección Diaria API
//  Uses vm.createContext to load browser globals into a sandbox
// ════════════════════════════════════════════════════════════════

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname);

function createAPI() {
  // ── Build DOM stubs ──
  var store = Object.create(null);
  var storageMock = {
    _store: store,
    getItem: function (k) { return store[k] !== undefined ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; },
  };

  var ctx = vm.createContext({
    // JS builtins
    console: console,
    Math: Math,
    Object: Object,
    Array: Array,
    JSON: JSON,
    Set: Set,
    Map: Map,
    Error: Error,
    TypeError: TypeError,
    RangeError: RangeError,
    parseInt: parseInt,
    parseFloat: parseFloat,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    String: String,
    Number: Number,
    Boolean: Boolean,
    RegExp: RegExp,
    Date: Date,
    Infinity: Infinity,
    NaN: NaN,
    undefined: undefined,
    isNaN: isNaN,
    isFinite: isFinite,
    encodeURIComponent: encodeURIComponent,
    decodeURIComponent: decodeURIComponent,

    // DOM stubs
    document: {
      getElementById: function () { return null; },
      querySelector: function () { return null; },
      querySelectorAll: function () { return []; },
      createElement: function () { return { className: '', style: {}, textContent: '', appendChild: function () {} }; },
    },
    window: {},
    localStorage: storageMock,
    sessionStorage: { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} },
    navigator: { onLine: true, serviceWorker: null, vibrate: function () {} },
    matchMedia: function () { return { matches: false, addEventListener: function () {} }; },
    requestAnimationFrame: function (fn) { fn(); },
    indexedDB: null,
    alert: function () {},

    // Placement state variables
    placementQuestions: [],
    placementIdx: 0,
    placementThetas: { grammar: 3.0, vocab: 3.0 },
    placementHistory: [],
    placementSEs: { grammar: 2.0, vocab: 2.0 },
    placementUsedIds: new Set(),
    placementLastDomains: [],
    placementTargetLength: 20,
    placementMode: 'both',
    placementCurrentQ: null,
  });

  // ── Load source files in dependency order ──
  var files = [
    'fsrs.js',
    'conjugation.js',
    'verbs.js',
    'vocab-categories.js',
    'grammar.js',
    'phrases.js',
    'placement_questions.js',
    'quiz-engine.js',
    'app-core.js',
    'learn-vocab.js',
    'app-practice.js',
    'placement.js',
    // Content modules
    'reading.js',
    'reading_sat.js',
    'cloze_passages.js',
    'dictation.js',
    'sentence_construction.js',
    'translation_drills.js',
    'branching_dialogues.js',
    'minimal_pairs.js',
    'phonetic_pairs.js',
    'homophones.js',
    'connectors.js',
    // Cultural modules
    'recipes.js',
    'music.js',
    'movies.js',
    'poetry.js',
    'sports.js',
    'proverbs.js',
    'folktales.js',
    'festivals.js',
    'history.js',
    'travel.js',
    'trivia.js',
    'idioms.js',
    // Additional content modules
    'conversations.js',
    'jokes.js',
    'themed_vocab.js',
    'curriculum_tracks.js',
    'verb_prepositions.js',
    'subjunctive_triggers.js',
    'writing_prompts.js',
    'comparative_grammar.js',
    'number_practice.js',
    'feature-modules.js',
  ];

  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(ROOT, files[i]);
    if (!fs.existsSync(filePath)) continue;
    var code = fs.readFileSync(filePath, 'utf8');
    try {
      vm.runInContext(code, ctx, { filename: files[i] });
    } catch (e) {
      // Ignore DOM-related errors during init
    }
  }

  // ── Load vocab data from JSON ──
  var vocabPath = path.join(ROOT, 'vocab-data.json');
  if (fs.existsSync(vocabPath)) {
    try {
      var vocabData = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
      ctx.VOCAB_DATA = vocabData;
      vm.runInContext('if (typeof buildVocabIndexes === "function") buildVocabIndexes();', ctx);
    } catch (e) {
      // Non-fatal — vocab features just won't work
    }
  }

  // ── Export const/let declarations to context ──
  try {
    vm.runInContext([
      'this.conjugate = conjugate;',
      'this.conjugateAll = conjugateAll;',
      'this.getParticiple = getParticiple;',
      'this.getGerund = getGerund;',
      'this.checkAnswer = checkAnswer;',
      'this.stripAccents = stripAccents;',
      'this.esc = esc;',
      'this.todayStr = todayStr;',
      'this.dateStr = dateStr;',
      'this.newProgress = newProgress;',
      'this.migrateProgress = migrateProgress;',
      'this.shuffle = shuffle;',
      'this.pick = pick;',
      'this.pickN = pickN;',
      'this.irtProb = irtProb;',
      'this.thetaToLevel = thetaToLevel;',
      'this.updateTheta = updateTheta;',
      'this.selectNextIRTQuestion = selectNextIRTQuestion;',
      'this.buildPlacementIRTPool = buildPlacementIRTPool;',
      'this.determinePlacementLevel = determinePlacementLevel;',
      'this.applyPlacementResults = applyPlacementResults;',
      'this.TENSE_META = TENSE_META;',
      'this.PERSONS = PERSONS;',
      'this.VERB_DATA = typeof VERB_DATA !== "undefined" ? VERB_DATA : undefined;',
      'this.GRAMMAR_DATA = typeof GRAMMAR_DATA !== "undefined" ? GRAMMAR_DATA : undefined;',
      'this.PHRASES_DATA = typeof PHRASES_DATA !== "undefined" ? PHRASES_DATA : undefined;',
      'this.VOCAB_CATEGORIES = typeof VOCAB_CATEGORIES !== "undefined" ? VOCAB_CATEGORIES : undefined;',
      'this.VOCAB_DATA = typeof VOCAB_DATA !== "undefined" ? VOCAB_DATA : undefined;',
      'this.VOCAB_BY_LEVEL = typeof VOCAB_BY_LEVEL !== "undefined" ? VOCAB_BY_LEVEL : undefined;',
      'this.scoringGroup = typeof scoringGroup !== "undefined" ? scoringGroup : undefined;',
      'this.PLACEMENT_QUESTIONS = typeof PLACEMENT_QUESTIONS !== "undefined" ? PLACEMENT_QUESTIONS : undefined;',
      'this.PLACEMENT_LEVELS = typeof PLACEMENT_LEVELS !== "undefined" ? PLACEMENT_LEVELS : undefined;',
      'this.LEVEL_DIFFICULTY = typeof LEVEL_DIFFICULTY !== "undefined" ? LEVEL_DIFFICULTY : undefined;',
      'this.LEVEL_ORDER = typeof LEVEL_ORDER !== "undefined" ? LEVEL_ORDER : undefined;',
      'this.buildVocabIndexes = typeof buildVocabIndexes !== "undefined" ? buildVocabIndexes : undefined;',
      'this.saveProgress = typeof saveProgress !== "undefined" ? saveProgress : undefined;',
      // Content modules
      'this.READING_DATA = typeof READING_DATA !== "undefined" ? READING_DATA : undefined;',
      'this.READING_SAT_DATA = typeof READING_SAT_DATA !== "undefined" ? READING_SAT_DATA : undefined;',
      'this.CLOZE_PASSAGES = typeof CLOZE_PASSAGES !== "undefined" ? CLOZE_PASSAGES : undefined;',
      'this.DICTATION_DATA = typeof DICTATION_DATA !== "undefined" ? DICTATION_DATA : undefined;',
      'this.SENTENCE_CONSTRUCTION = typeof SENTENCE_CONSTRUCTION !== "undefined" ? SENTENCE_CONSTRUCTION : undefined;',
      'this.TRANSLATION_DRILLS = typeof TRANSLATION_DRILLS !== "undefined" ? TRANSLATION_DRILLS : undefined;',
      'this.BRANCHING_DIALOGUES = typeof BRANCHING_DIALOGUES !== "undefined" ? BRANCHING_DIALOGUES : undefined;',
      'this.MINIMAL_PAIR_CATEGORIES = typeof MINIMAL_PAIR_CATEGORIES !== "undefined" ? MINIMAL_PAIR_CATEGORIES : undefined;',
      'this.MINIMAL_PAIRS = typeof MINIMAL_PAIRS !== "undefined" ? MINIMAL_PAIRS : undefined;',
      'this.PHONETIC_PAIR_CATEGORIES = typeof PHONETIC_PAIR_CATEGORIES !== "undefined" ? PHONETIC_PAIR_CATEGORIES : undefined;',
      'this.PHONETIC_PAIRS = typeof PHONETIC_PAIRS !== "undefined" ? PHONETIC_PAIRS : undefined;',
      'this.HOMOPHONE_CATEGORIES = typeof HOMOPHONE_CATEGORIES !== "undefined" ? HOMOPHONE_CATEGORIES : undefined;',
      'this.HOMOPHONES = typeof HOMOPHONES !== "undefined" ? HOMOPHONES : undefined;',
      'this.CONNECTOR_CATEGORIES = typeof CONNECTOR_CATEGORIES !== "undefined" ? CONNECTOR_CATEGORIES : undefined;',
      'this.CONNECTORS = typeof CONNECTORS !== "undefined" ? CONNECTORS : undefined;',
      'this.RECIPES_DATA = typeof RECIPES_DATA !== "undefined" ? RECIPES_DATA : undefined;',
      'this.MUSIC_DATA = typeof MUSIC_DATA !== "undefined" ? MUSIC_DATA : undefined;',
      'this.MOVIES_DATA = typeof MOVIES_DATA !== "undefined" ? MOVIES_DATA : undefined;',
      'this.POETRY_DATA = typeof POETRY_DATA !== "undefined" ? POETRY_DATA : undefined;',
      'this.SPORTS_DATA = typeof SPORTS_DATA !== "undefined" ? SPORTS_DATA : undefined;',
      'this.PROVERBS_DATA = typeof PROVERBS_DATA !== "undefined" ? PROVERBS_DATA : undefined;',
      'this.FOLKTALES_DATA = typeof FOLKTALES_DATA !== "undefined" ? FOLKTALES_DATA : undefined;',
      'this.FESTIVALS_DATA = typeof FESTIVALS_DATA !== "undefined" ? FESTIVALS_DATA : undefined;',
      'this.HISTORY_DATA = typeof HISTORY_DATA !== "undefined" ? HISTORY_DATA : undefined;',
      'this.TRAVEL_DATA = typeof TRAVEL_DATA !== "undefined" ? TRAVEL_DATA : undefined;',
      'this.TRIVIA_DATA = typeof TRIVIA_DATA !== "undefined" ? TRIVIA_DATA : undefined;',
      'this.IDIOMS_DATA = typeof IDIOMS_DATA !== "undefined" ? IDIOMS_DATA : undefined;',
      // Additional content modules
      'this.CONVERSATIONS_DATA = typeof CONVERSATIONS_DATA !== "undefined" ? CONVERSATIONS_DATA : undefined;',
      'this.JOKES_DATA = typeof JOKES_DATA !== "undefined" ? JOKES_DATA : undefined;',
      'this.THEMED_VOCAB_DATA = typeof THEMED_VOCAB_DATA !== "undefined" ? THEMED_VOCAB_DATA : undefined;',
      'this.CURRICULUM_TRACKS = typeof CURRICULUM_TRACKS !== "undefined" ? CURRICULUM_TRACKS : undefined;',
      'this.VERB_PREPOSITIONS_DATA = typeof VERB_PREPOSITIONS_DATA !== "undefined" ? VERB_PREPOSITIONS_DATA : undefined;',
      'this.SUBJUNCTIVE_TRIGGER_CATEGORIES = typeof SUBJUNCTIVE_TRIGGER_CATEGORIES !== "undefined" ? SUBJUNCTIVE_TRIGGER_CATEGORIES : undefined;',
      'this.SUBJUNCTIVE_TRIGGERS_DATA = typeof SUBJUNCTIVE_TRIGGERS_DATA !== "undefined" ? SUBJUNCTIVE_TRIGGERS_DATA : undefined;',
      'this.WRITING_PROMPTS_DATA = typeof WRITING_PROMPTS_DATA !== "undefined" ? WRITING_PROMPTS_DATA : undefined;',
      'this.COMPARATIVE_GRAMMAR_DATA = typeof COMPARATIVE_GRAMMAR_DATA !== "undefined" ? COMPARATIVE_GRAMMAR_DATA : undefined;',
      'this.NUMBER_PRACTICE_DATA = typeof NUMBER_PRACTICE_DATA !== "undefined" ? NUMBER_PRACTICE_DATA : undefined;',
      // Setter/getter helpers for let-scoped placement state (let vars are not on global object)
      'this._setPlacementState = function(state) {',
      '  placementQuestions = state.questions;',
      '  placementIdx = state.idx;',
      '  placementThetas = state.thetas;',
      '  placementHistory = state.history;',
      '  placementSEs = state.ses;',
      '  placementUsedIds = state.usedIds;',
      '  placementLastDomains = state.lastDomains;',
      '  placementTargetLength = state.targetLength;',
      '  placementMode = state.mode;',
      '};',
      'this._getPlacementState = function() {',
      '  return {',
      '    questions: placementQuestions,',
      '    history: placementHistory,',
      '    thetas: placementThetas,',
      '    usedIds: placementUsedIds,',
      '    lastDomains: placementLastDomains,',
      '  };',
      '};',
      // Setter/getter for progress/currentProfile (also let-scoped in app-core.js)
      'this._setProgress = function(p) { progress = p; };',
      'this._getProgress = function() { return progress; };',
      'this._setCurrentProfile = function(p) { currentProfile = p; };',
      'this._getCurrentProfile = function() { return currentProfile; };',
    ].join('\n'), ctx);
  } catch (e) {
    // Some functions may not exist if files failed to load
  }

  // ── Build API via the factory from api.js ──
  var apiCode = fs.readFileSync(path.join(ROOT, 'api.js'), 'utf8');
  vm.runInContext(apiCode, ctx, { filename: 'api.js' });

  // The UMD factory was exported as module.exports in Node mode,
  // but inside the sandbox there's no module object — the factory
  // is the last expression. We need to call buildAPI(ctx).
  var api = vm.runInContext('buildAPI(this)', ctx);
  return api;
}

module.exports = createAPI;
