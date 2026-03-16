'use strict';

// ════════════════════════════════════════════════════════════════
//  api.js — Programmatic API for Lección Diaria
//  UMD wrapper: works in browser (reads globals) and Node.js
// ════════════════════════════════════════════════════════════════

/* global buildAPI */
// eslint-disable-next-line no-unused-vars
var buildAPI; // hoisted for vm.createContext access in api-node.js

(function (root, factory) {
  // Always expose buildAPI for programmatic use (api-node.js calls it directly)
  buildAPI = factory;

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js — context is passed in by api-node.js
    module.exports = factory;
  } else {
    // Browser — read from globals once all scripts have loaded
    var init = function () { root.LeccionDiaria = factory(root); };
    if (root.document && root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', init);
    } else {
      // defer to next tick so all defer scripts have executed
      setTimeout(init, 0);
    }
  }
})(typeof window !== 'undefined' ? window : this, function _buildAPI(ctx) {

  // ── Helper: safe ref ──
  function ref(name) { return ctx[name]; }

  // ── MemoryStorage (in-memory localStorage replacement) ──
  function MemoryStorage() {
    this._store = Object.create(null);
  }
  MemoryStorage.prototype.getItem = function (k) {
    return this._store[k] !== undefined ? this._store[k] : null;
  };
  MemoryStorage.prototype.setItem = function (k, v) {
    this._store[k] = String(v);
  };
  MemoryStorage.prototype.removeItem = function (k) {
    delete this._store[k];
  };

  // ── Pure function re-exports ──
  var conjugate     = ref('conjugate');
  var conjugateAll  = ref('conjugateAll');
  var getParticiple = ref('getParticiple');
  var getGerund     = ref('getGerund');
  var checkAnswer   = ref('checkAnswer');
  var stripAccents  = ref('stripAccents');
  var esc           = ref('esc');

  // FSRS
  var fsrsInitS           = ref('fsrsInitS');
  var fsrsInitD           = ref('fsrsInitD');
  var fsrsR               = ref('fsrsR');
  var fsrsSAfterRecall    = ref('fsrsSAfterRecall');
  var fsrsSAfterForgetting = ref('fsrsSAfterForgetting');
  var fsrsNextD           = ref('fsrsNextD');
  var masteryFromFsrs     = ref('masteryFromFsrs');

  // IRT
  var irtProb      = ref('irtProb');
  var thetaToLevel = ref('thetaToLevel');

  // Utilities
  var shuffle = ref('shuffle');
  var pick    = ref('pick');
  var pickN   = ref('pickN');

  // Internal helpers we need
  var newProgress    = ref('newProgress');
  var migrateProgress = ref('migrateProgress');
  var todayStr       = ref('todayStr');
  var dateStr        = ref('dateStr');

  // Placement internals
  var buildPlacementIRTPool   = ref('buildPlacementIRTPool');
  var selectNextIRTQuestion   = ref('selectNextIRTQuestion');
  var determinePlacementLevel = ref('determinePlacementLevel');
  var applyPlacementResults   = ref('applyPlacementResults');

  // ── Session class ──
  function Session(storage) {
    this._storage = storage || new MemoryStorage();
    this._profile = null;
    this._progress = null;
  }

  Session.prototype.createProfile = function (name) {
    var profiles = JSON.parse(this._storage.getItem('ld_profiles') || '[]');
    if (profiles.indexOf(name) === -1) {
      profiles.push(name);
      this._storage.setItem('ld_profiles', JSON.stringify(profiles));
    }
  };

  Session.prototype.listProfiles = function () {
    return JSON.parse(this._storage.getItem('ld_profiles') || '[]');
  };

  Session.prototype.selectProfile = function (name) {
    this._profile = name;
    var raw = this._storage.getItem('ld_progress_' + name);
    if (raw) {
      try {
        this._progress = migrateProgress ? migrateProgress(JSON.parse(raw)) : JSON.parse(raw);
      } catch (e) {
        this._progress = newProgress();
      }
    } else {
      this._progress = newProgress();
    }
  };

  Session.prototype.getProgress = function () {
    return this._progress;
  };

  Session.prototype.addXP = function (amount) {
    if (!this._progress) return;
    this._progress.xp += amount;
    var today = todayStr();
    this._progress.practiceLog[today] = (this._progress.practiceLog[today] || 0) + amount;
    this._checkStreak();
  };

  Session.prototype._checkStreak = function () {
    var today = todayStr();
    if (this._progress.lastDate === today) return;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var ys = dateStr(yesterday);
    if (this._progress.lastDate === ys) {
      this._progress.streak++;
    } else if (this._progress.lastDate !== today) {
      if (this._progress.freezeTokens > 0 && this._progress.lastDate) {
        this._progress.freezeTokens--;
      } else {
        this._progress.streak = 1;
      }
    }
    this._progress.lastDate = today;
    if (this._progress.streak > this._progress.longestStreak) {
      this._progress.longestStreak = this._progress.streak;
    }
    if (this._progress.streak > 0 && this._progress.streak % 7 === 0) {
      this._progress.freezeTokens = (this._progress.freezeTokens || 0) + 1;
    }
  };

  Session.prototype.reviewItem = function (fsrsStore, masteryStore, key, rating) {
    var p = this._progress;
    if (!p) return;
    var store = p[fsrsStore];
    var mStore = p[masteryStore];
    if (!store || !mStore) return;

    var now = Date.now();
    var rec = store[key];
    if (!rec) {
      var s = fsrsInitS(rating);
      var d = fsrsInitD(rating);
      rec = { s: s, d: d, lastRev: now };
    } else {
      var elapsed = (now - rec.lastRev) / (1000 * 60 * 60 * 24);
      var r = fsrsR(rec.s, elapsed);
      var newD = fsrsNextD(rec.d, rating);
      var FSRS_AGAIN = 1;
      var newS = rating === FSRS_AGAIN
        ? fsrsSAfterForgetting(rec.d, rec.s, r)
        : fsrsSAfterRecall(rec.d, rec.s, r, rating);
      rec = { s: newS, d: newD, lastRev: now };
    }
    store[key] = rec;
    mStore[key] = masteryFromFsrs(rec.s);
  };

  Session.prototype.isDue = function (fsrsStore, key) {
    var p = this._progress;
    if (!p) return true;
    var store = p[fsrsStore];
    if (!store) return true;
    var rec = store[key];
    if (!rec) return true;
    var elapsed = (Date.now() - rec.lastRev) / (1000 * 60 * 60 * 24);
    var r = fsrsR(rec.s, elapsed);
    return r < 0.9;
  };

  Session.prototype.getDueItems = function (fsrsStore, allKeys) {
    var self = this;
    return allKeys.filter(function (k) { return self.isDue(fsrsStore, k); });
  };

  Session.prototype.setSetting = function (key, value) {
    if (!this._progress) return;
    this._progress.settings[key] = value;
  };

  Session.prototype.save = function () {
    if (!this._profile || !this._progress) return;
    this._storage.setItem('ld_progress_' + this._profile, JSON.stringify(this._progress));
  };

  Session.prototype.startPlacement = function (opts) {
    if (!this._progress) throw new Error('No profile selected');
    return new PlacementSession(this, opts || {});
  };

  // ── Placement state helpers ──
  // In Node.js (vm.createContext), let-scoped variables from app-core.js are not
  // accessible via ctx property assignment. We use setter/getter helpers created
  // by api-node.js. In the browser, direct property assignment works.
  var _setPlacementState = ref('_setPlacementState');
  var _getPlacementState = ref('_getPlacementState');
  var _setProgress = ref('_setProgress');
  var _getProgress = ref('_getProgress');
  var _setCurrentProfile = ref('_setCurrentProfile');
  var _getCurrentProfile = ref('_getCurrentProfile');

  function setPlacementState(state) {
    if (_setPlacementState) {
      _setPlacementState(state);
    } else {
      // Browser: direct assignment works
      ctx.placementQuestions = state.questions;
      ctx.placementIdx = state.idx;
      ctx.placementThetas = state.thetas;
      ctx.placementHistory = state.history;
      ctx.placementSEs = state.ses;
      ctx.placementUsedIds = state.usedIds;
      ctx.placementLastDomains = state.lastDomains;
      ctx.placementTargetLength = state.targetLength;
      ctx.placementMode = state.mode;
    }
  }

  function getPlacementState() {
    if (_getPlacementState) return _getPlacementState();
    return {
      questions: ctx.placementQuestions,
      history: ctx.placementHistory,
      thetas: ctx.placementThetas,
      usedIds: ctx.placementUsedIds,
      lastDomains: ctx.placementLastDomains,
    };
  }

  function setGlobalProgress(p) {
    if (_setProgress) _setProgress(p);
    else ctx.progress = p;
  }

  function getGlobalProgress() {
    if (_getProgress) return _getProgress();
    return ctx.progress;
  }

  function setGlobalProfile(p) {
    if (_setCurrentProfile) _setCurrentProfile(p);
    else ctx.currentProfile = p;
  }

  function getGlobalProfile() {
    if (_getCurrentProfile) return _getCurrentProfile();
    return ctx.currentProfile;
  }

  // ── PlacementSession class ──
  function PlacementSession(session, opts) {
    this._session = session;
    this._idx = 0;
    this._targetLength = opts.length || 20;
    this._mode = opts.mode || 'both';
    this._currentQ = null;

    // Determine starting theta based on self-assessment level
    var startThetas = { A1: 1.5, A2: 2.5, B1: 3.0, B2: 4.0, C1: 5.0, C2: 5.5 };
    var startTheta = startThetas[opts.level] || 3.0;

    var thetas;
    if (this._mode === 'grammar') {
      thetas = { grammar: startTheta, vocab: 3.0 };
    } else if (this._mode === 'vocab') {
      thetas = { grammar: 3.0, vocab: startTheta };
    } else {
      thetas = { grammar: startTheta, vocab: startTheta };
    }

    // Initialize placement state via helpers
    setPlacementState({
      questions: [],
      idx: 0,
      thetas: thetas,
      history: [],
      ses: { grammar: 2.0, vocab: 2.0 },
      usedIds: new Set(),
      lastDomains: [],
      targetLength: this._targetLength,
      mode: this._mode,
    });

    // Build question pool (reads placementMode from global state)
    var pool = buildPlacementIRTPool();
    setPlacementState({
      questions: pool,
      idx: 0,
      thetas: thetas,
      history: [],
      ses: { grammar: 2.0, vocab: 2.0 },
      usedIds: new Set(),
      lastDomains: [],
      targetLength: this._targetLength,
      mode: this._mode,
    });
    this._questions = pool;
  }

  PlacementSession.prototype.isFinished = function () {
    return this._idx >= this._targetLength;
  };

  PlacementSession.prototype.currentQuestion = function () {
    if (this.isFinished()) return null;
    var q = selectNextIRTQuestion();
    if (!q) return null;
    this._currentQ = q;
    var state = getPlacementState();
    state.usedIds.add(q.id);
    return q;
  };

  PlacementSession.prototype.answer = function (isCorrect) {
    if (!this._currentQ) return;
    var q = this._currentQ;
    var LEVEL_DIFFICULTY = { A1: 1.4, A2: 2.3, B1: 3.15, B2: 3.95, C1: 4.8, C2: 5.9 };
    var state = getPlacementState();
    state.history.push({
      difficulty: q.difficulty || LEVEL_DIFFICULTY[q.level] || 3.0,
      correct: isCorrect,
      domain: q.domain,
      level: q.level,
    });
    state.lastDomains.push(q.domain);

    // Update theta via global function
    var updateTheta = ref('updateTheta');
    if (updateTheta) updateTheta();

    this._idx++;
    this._currentQ = null;
  };

  PlacementSession.prototype.finish = function () {
    var levels = determinePlacementLevel();
    // Wire up progress so applyPlacementResults can modify it
    var oldProgress = getGlobalProgress();
    var oldProfile = getGlobalProfile();
    setGlobalProgress(this._session._progress);
    setGlobalProfile(this._session._profile);
    applyPlacementResults(levels);
    this._session._progress = getGlobalProgress();
    setGlobalProgress(oldProgress);
    setGlobalProfile(oldProfile);
    return levels;
  };

  // ── Build and return the API object ──
  var api = {
    // Pure functions
    conjugate: conjugate,
    conjugateAll: conjugateAll,
    getParticiple: getParticiple,
    getGerund: getGerund,
    checkAnswer: checkAnswer,
    stripAccents: stripAccents,
    esc: esc,

    // FSRS namespace
    fsrs: {
      initS: fsrsInitS,
      initD: fsrsInitD,
      recall: fsrsR,
      sAfterRecall: fsrsSAfterRecall,
      sAfterForgetting: fsrsSAfterForgetting,
      nextD: fsrsNextD,
      mastery: masteryFromFsrs,
    },

    // IRT namespace
    irt: {
      prob: irtProb,
      thetaToLevel: thetaToLevel,
    },

    // Utilities
    util: {
      shuffle: shuffle,
      pick: pick,
      pickN: pickN,
    },

    // Data access
    data: {
      get verbs()      { return ref('VERB_DATA'); },
      get vocab()      { return ref('VOCAB_DATA'); },
      get tenses()     { return ref('TENSE_META'); },
      get persons()    { return ref('PERSONS'); },
      get grammar()    { return ref('GRAMMAR_DATA'); },
      get phrases()    { return ref('PHRASES_DATA'); },
      get categories() { return ref('VOCAB_CATEGORIES'); },
    },

    // Session factory
    createSession: function (storage) {
      return new Session(storage);
    },

    // Expose MemoryStorage for external use
    MemoryStorage: MemoryStorage,
  };

  return api;
});
