'use strict';

const createAPI = require('../api-node');
const api = createAPI();

var VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ════════════════════════════════════════════════════════════════
//  Group 1 — Vocabulary flashcard workflow
// ════════════════════════════════════════════════════════════════

describe('Vocabulary flashcard workflow', () => {
  it('can filter vocab by each CEFR level', () => {
    VALID_LEVELS.forEach(function (lvl) {
      var words = api.data.vocab.filter(function (v) { return v.level === lvl; });
      assert(words.length > 0, 'No vocab at level ' + lvl);
    });
  });

  it('can filter vocab by category and pick items', () => {
    var cats = Object.keys(api.data.categories);
    assert(cats.length > 0, 'No categories');
    var cat = cats[0];
    var words = api.data.vocab.filter(function (v) { return v.category === cat; });
    assert(words.length > 0, 'Category ' + cat + ' has no words');
    var picked = api.util.pickN(words, Math.min(3, words.length));
    picked.forEach(function (w) {
      assertEqual(w.category, cat, 'Picked word should be from category ' + cat);
    });
  });

  it('review items and verify mastery progression', () => {
    var session = api.createSession();
    session.createProfile('vocab_wf');
    session.selectProfile('vocab_wf');

    // Rating 1 (Again) gives low mastery
    session.reviewItem('vocabFsrs', 'vocabMastery', 'gato', 1);
    var m1 = session.getProgress().vocabMastery.gato;

    // Rating 4 (Easy) on a different word gives higher mastery
    session.reviewItem('vocabFsrs', 'vocabMastery', 'perro', 4);
    var m4 = session.getProgress().vocabMastery.perro;
    assert(m4 >= m1, 'Easy rating should give >= mastery than Again');
  });

  it('due items list shrinks after review', () => {
    var session = api.createSession();
    session.createProfile('vocab_due');
    session.selectProfile('vocab_due');

    var keys = ['gato', 'perro', 'casa', 'libro', 'mesa'];
    assertEqual(session.getDueItems('vocabFsrs', keys).length, 5);

    session.reviewItem('vocabFsrs', 'vocabMastery', 'gato', 3);
    session.reviewItem('vocabFsrs', 'vocabMastery', 'perro', 3);
    assertEqual(session.getDueItems('vocabFsrs', keys).length, 3);
  });

  it('vocab entries with example also have exampleEn', () => {
    var withExample = api.data.vocab.filter(function (v) { return v.example; });
    assert(withExample.length > 1000, 'Expected many vocab entries with examples');
    var missing = withExample.filter(function (v) { return !v.exampleEn; });
    assert(missing.length === 0,
      missing.length + ' vocab entries have example but no exampleEn: ' +
      missing.slice(0, 3).map(function (v) { return v.word; }).join(', '));
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 2 — Grammar quiz workflow
// ════════════════════════════════════════════════════════════════

describe('Grammar quiz workflow', () => {
  it('MC quiz: checkAnswer works with correct answer', () => {
    var lesson = api.data.grammar.find(function (g) {
      return g.quiz.some(function (q) { return q.type === 'mc'; });
    });
    assert(lesson, 'No grammar lesson with MC quiz found');
    var q = lesson.quiz.find(function (q) { return q.type === 'mc'; });
    var result = api.checkAnswer(q.answer, q.answer);
    assert(result.correct, 'checkAnswer should return correct for exact match');
    assert(q.options.indexOf(q.answer) !== -1, 'Answer should be in options');
  });

  it('FIB quiz: checkAnswer works with correct answer', () => {
    var lesson = api.data.grammar.find(function (g) {
      return g.quiz.some(function (q) { return q.type === 'fib'; });
    });
    assert(lesson, 'No grammar lesson with FIB quiz found');
    var q = lesson.quiz.find(function (q) { return q.type === 'fib'; });
    var result = api.checkAnswer(q.answer, q.answer);
    assert(result.correct, 'checkAnswer should return correct for FIB answer');
  });

  it('error-correct quiz: sentence differs from answer', () => {
    var lesson = api.data.grammar.find(function (g) {
      return g.quiz.some(function (q) { return q.type === 'error-correct'; });
    });
    assert(lesson, 'No grammar lesson with error-correct quiz found');
    var q = lesson.quiz.find(function (q) { return q.type === 'error-correct'; });
    assert(q.sentence !== q.answer, 'Error-correct sentence should differ from answer');
  });

  it('transform quiz: question and answer are both present and different', () => {
    var lesson = api.data.grammar.find(function (g) {
      return g.quiz.some(function (q) { return q.type === 'transform'; });
    });
    assert(lesson, 'No grammar lesson with transform quiz found');
    var q = lesson.quiz.find(function (q) { return q.type === 'transform'; });
    assert(q.question && q.answer, 'Transform should have question and answer');
    assert(q.question !== q.answer, 'Transform question and answer should differ');
  });

  it('can review grammar items with FSRS', () => {
    var session = api.createSession();
    session.createProfile('gram_wf');
    session.selectProfile('gram_wf');
    var id = api.data.grammar[0].id;
    session.reviewItem('grammarFsrs', 'grammarDone', id, 3);
    assert(session.getProgress().grammarFsrs[id], 'Should have FSRS record');
    assert(session.getProgress().grammarDone[id] >= 1, 'Should have mastery');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 3 — Reading comprehension workflow
// ════════════════════════════════════════════════════════════════

describe('Reading comprehension workflow', () => {
  it('reading passage: correct answer option is a valid string', () => {
    api.data.reading.forEach(function (r) {
      assert(r.text.length > 20, r.id + ' text too short');
      r.questions.forEach(function (q, qi) {
        var correctOption = q.options[q.correct];
        assert(typeof correctOption === 'string' && correctOption.length > 0,
          r.id + ' q[' + qi + '] correct option is not a valid string');
      });
    });
  });

  it('SAT reading: correct answer option is a valid string', () => {
    api.data.readingSat.forEach(function (r) {
      r.questions.forEach(function (q, qi) {
        var correctOption = q.options[q.correct];
        assert(typeof correctOption === 'string' && correctOption.length > 0,
          r.id + ' q[' + qi + '] correct option is not a valid string');
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 4 — Cloze exercise workflow
// ════════════════════════════════════════════════════════════════

describe('Cloze exercise workflow', () => {
  it('filling in blanks produces a passage with no remaining placeholders', () => {
    api.data.cloze.forEach(function (c) {
      var filled = c.passage;
      c.blanks.forEach(function (b) {
        filled = filled.replace('{' + b.id + '}', b.answer);
      });
      assert(filled.indexOf('{') === -1,
        c.id + ' still has placeholders after filling: ' + filled.substring(0, 100));
    });
  });

  it('checkAnswer works with cloze blank answers', () => {
    var c = api.data.cloze[0];
    var b = c.blanks[0];
    var result = api.checkAnswer(b.answer, b.answer);
    assert(result.correct, 'checkAnswer should match cloze answer');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 5 — Dictation workflow
// ════════════════════════════════════════════════════════════════

describe('Dictation workflow', () => {
  it('checkAnswer matches dictation sentence exactly', () => {
    VALID_LEVELS.forEach(function (lvl) {
      var d = api.data.dictation.find(function (d) { return d.level === lvl; });
      if (d) {
        var result = api.checkAnswer(d.sentence, d.sentence);
        assert(result.correct, 'Dictation ' + d.id + ' should match itself');
      }
    });
  });

  it('stripAccents produces valid string for dictation sentences', () => {
    api.data.dictation.slice(0, 10).forEach(function (d) {
      var stripped = api.stripAccents(d.sentence);
      assert(typeof stripped === 'string' && stripped.length > 0,
        'stripAccents failed for ' + d.id);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 6 — Translation drill workflow
// ════════════════════════════════════════════════════════════════

describe('Translation drill workflow', () => {
  it('checkAnswer matches primary translation', () => {
    api.data.translationDrills.slice(0, 10).forEach(function (t) {
      var result = api.checkAnswer(t.primary, t.primary);
      assert(result.correct, 'Translation ' + t.id + ' primary should match itself');
    });
  });

  it('alternatives differ from primary when present', () => {
    var withAlt = api.data.translationDrills.filter(function (t) {
      return t.alternatives && t.alternatives.length > 0;
    });
    if (withAlt.length > 0) {
      withAlt.slice(0, 5).forEach(function (t) {
        t.alternatives.forEach(function (alt) {
          assert(typeof alt === 'string' && alt.length > 0,
            t.id + ' has empty alternative');
        });
      });
    }
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 7 — Sentence construction workflow
// ════════════════════════════════════════════════════════════════

describe('Sentence construction workflow', () => {
  it('words array tokens appear in the sentence', () => {
    api.data.sentenceConstruction.forEach(function (s) {
      var lower = s.sentence.toLowerCase();
      s.words.forEach(function (w) {
        assert(lower.indexOf(w.toLowerCase()) !== -1,
          s.id + ' word "' + w + '" not found in sentence "' + s.sentence + '"');
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 8 — Branching dialogue traversal
// ════════════════════════════════════════════════════════════════

describe('Branching dialogue traversal', () => {
  it('every dialogue can be traversed from start to terminal node', () => {
    api.data.branchingDialogues.forEach(function (bd) {
      var nodeMap = {};
      bd.nodes.forEach(function (n) { nodeMap[n.id] = n; });

      var current = bd.nodes[0];
      var steps = 0;
      var maxSteps = bd.nodes.length * 2; // prevent infinite loops
      var visited = {};

      while (current && steps < maxSteps) {
        if (visited[current.id]) break; // cycle detection
        visited[current.id] = true;
        steps++;

        if (current.choices && current.choices.length > 0) {
          // Pick first choice
          var nextId = current.choices[0].next;
          current = nextId ? nodeMap[nextId] : null;
        } else if (current.next) {
          current = nodeMap[current.next];
        } else {
          // Terminal node
          break;
        }
      }

      assert(steps > 1, bd.id + ' traversal too short: ' + steps + ' steps');
      assert(steps < maxSteps, bd.id + ' may have infinite loop');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 9 — Phrase practice workflow
// ════════════════════════════════════════════════════════════════

describe('Phrase practice workflow', () => {
  it('all situations have at least 1 phrase', () => {
    var situations = {};
    api.data.phrases.forEach(function (p) { situations[p.situation] = true; });
    var sitKeys = Object.keys(situations);
    assert(sitKeys.length >= 13, 'Expected at least 13 situations, got ' + sitKeys.length);
    sitKeys.forEach(function (sit) {
      var count = api.data.phrases.filter(function (p) { return p.situation === sit; }).length;
      assert(count > 0, 'Situation "' + sit + '" has no phrases');
    });
  });

  it('can review phrases with FSRS', () => {
    var session = api.createSession();
    session.createProfile('phrase_wf');
    session.selectProfile('phrase_wf');
    var id = api.data.phrases[0].id;
    session.reviewItem('phraseFsrs', 'phraseMastery', id, 3);
    assert(session.getProgress().phraseFsrs[id], 'Should have FSRS record');
    assert(session.getProgress().phraseMastery[id] >= 1, 'Should have mastery');
  });

  it('checkAnswer works with phrase text', () => {
    var p = api.data.phrases[0];
    var result = api.checkAnswer(p.spanish, p.spanish);
    assert(result.correct, 'checkAnswer should match phrase spanish text');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 10 — Verb conjugation drill workflow
// ════════════════════════════════════════════════════════════════

describe('Verb conjugation drill workflow', () => {
  it('can pick verbs by type and conjugate them', () => {
    var types = ['regular', 'irregular', 'stem-changing', 'reflexive'];
    types.forEach(function (type) {
      var verbs = api.data.verbs.filter(function (v) { return v.type === type; });
      assert(verbs.length > 0, 'No verbs of type ' + type);
      var verb = verbs[0];
      var form = api.conjugate(verb.infinitive, 'present', 0);
      assert(form && form.length > 0, verb.infinitive + ' present yo is empty');
    });
  });

  it('checkAnswer validates conjugated forms', () => {
    var form = api.conjugate('hablar', 'present', 0);
    var result = api.checkAnswer(form, 'hablo');
    assert(result.correct, 'Conjugated form should match expected');
  });

  it('can review verb items with FSRS', () => {
    var session = api.createSession();
    session.createProfile('verb_wf');
    session.selectProfile('verb_wf');
    session.reviewItem('verbFsrs', 'verbMastery', 'hablar:present:0', 3);
    assert(session.getProgress().verbFsrs['hablar:present:0'], 'Should have FSRS record');
  });

  it('reflexive verbs include reflexive pronouns in conjugation', () => {
    var reflexive = api.data.verbs.filter(function (v) { return v.type === 'reflexive'; });
    assert(reflexive.length > 0, 'No reflexive verbs found');
    var pronouns = ['me ', 'te ', 'se ', 'nos ', 'os ', 'se '];
    var verb = reflexive[0];
    for (var p = 0; p < 6; p++) {
      var form = api.conjugate(verb.infinitive, 'present', p);
      assert(form.indexOf(pronouns[p].trim()) !== -1,
        verb.infinitive + ' person ' + p + ' = "' + form + '" missing pronoun "' + pronouns[p].trim() + '"');
    }
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 11 — Pronunciation content workflow
// ════════════════════════════════════════════════════════════════

describe('Pronunciation content workflow', () => {
  it('each minimal pair category has at least 1 pair', () => {
    var cats = api.data.minimalPairCategories;
    Object.keys(cats).forEach(function (catKey) {
      var pairs = api.data.minimalPairs.filter(function (mp) { return mp.category === catKey; });
      assert(pairs.length > 0, 'Minimal pair category "' + catKey + '" has no pairs');
    });
  });

  it('each phonetic pair category has at least 1 pair', () => {
    var cats = api.data.phoneticPairCategories;
    Object.keys(cats).forEach(function (catKey) {
      var pairs = api.data.phoneticPairs.filter(function (pp) { return pp.category === catKey; });
      assert(pairs.length > 0, 'Phonetic pair category "' + catKey + '" has no pairs');
    });
  });

  it('each homophone category has at least 1 entry', () => {
    var cats = api.data.homophoneCategories;
    Object.keys(cats).forEach(function (catKey) {
      var entries = api.data.homophones.filter(function (h) { return h.category === catKey; });
      assert(entries.length > 0, 'Homophone category "' + catKey + '" has no entries');
    });
  });

  it('each connector category has at least 1 entry', () => {
    var cats = api.data.connectorCategories;
    Object.keys(cats).forEach(function (catKey) {
      var entries = api.data.connectors.filter(function (c) { return c.category === catKey; });
      assert(entries.length > 0, 'Connector category "' + catKey + '" has no entries');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 12 — Cultural content quiz workflow
// ════════════════════════════════════════════════════════════════

describe('Cultural content quiz workflow', () => {
  // prompt/options/correct schema
  var indexModules = ['recipes', 'music', 'movies', 'sports', 'festivals',
                      'history', 'travel', 'poetry'];
  indexModules.forEach(function (mod) {
    it(mod + ': correct option is a valid string', () => {
      var entry = api.data[mod][0];
      entry.quiz.forEach(function (q, qi) {
        var correct = q.options[q.correct];
        assert(typeof correct === 'string' && correct.length > 0,
          mod + ' ' + entry.id + ' quiz[' + qi + '] correct option invalid');
      });
    });
  });

  // question/answer/options schema
  it('proverbs: answer is in options', () => {
    api.data.proverbs[0].quiz.forEach(function (q, qi) {
      assert(q.options.indexOf(q.answer) !== -1,
        'proverbs quiz[' + qi + '] answer not in options');
    });
  });

  it('folktales: answer is in options', () => {
    api.data.folktales[0].quiz.forEach(function (q, qi) {
      assert(q.options.indexOf(q.answer) !== -1,
        'folktales quiz[' + qi + '] answer not in options');
    });
  });

  // trivia flat format
  it('trivia: correct index resolves to a string', () => {
    api.data.trivia.slice(0, 5).forEach(function (t) {
      var correct = t.options[t.correct];
      assert(typeof correct === 'string', t.id + ' correct option not a string');
    });
  });

  // idioms
  it('idioms: spanish and meaning are non-empty strings', () => {
    api.data.idioms.slice(0, 5).forEach(function (d) {
      assert(d.spanish.length > 0, d.id + ' empty spanish');
      assert(d.meaning.length > 0, d.id + ' empty meaning');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 13 — FSRS behavior: difficulty & stability progression
// ════════════════════════════════════════════════════════════════

describe('FSRS behavior — difficulty and stability progression', () => {
  it('nextD increases difficulty on Again (1), decreases on Easy (4)', () => {
    var d = 5.0;
    var dAfterAgain = api.fsrs.nextD(d, 1);
    var dAfterEasy = api.fsrs.nextD(d, 4);
    assert(dAfterAgain > d, 'Difficulty should increase after Again: ' + dAfterAgain + ' > ' + d);
    assert(dAfterEasy < d, 'Difficulty should decrease after Easy: ' + dAfterEasy + ' < ' + d);
  });

  it('repeated Good ratings increase stability', () => {
    var s = api.fsrs.initS(3);
    var d = api.fsrs.initD(3);
    var r = api.fsrs.recall(s, 1);
    var s2 = api.fsrs.sAfterRecall(d, s, r, 3);
    assert(s2 > s, 'Stability should increase after Good recall: ' + s2 + ' > ' + s);
  });

  it('sAfterForgetting decreases stability', () => {
    var s = 10.0;
    var d = 5.0;
    var r = api.fsrs.recall(s, 5);
    var sNew = api.fsrs.sAfterForgetting(d, s, r);
    assert(sNew < s, 'Stability should decrease after forgetting: ' + sNew + ' < ' + s);
  });

  it('recall at elapsed=0 is approximately 1.0', () => {
    var r = api.fsrs.recall(5, 0);
    assertClose(r, 1.0, 0.001, 'Recall at elapsed=0 should be ~1.0, got ' + r);
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 14 — Streak & XP mechanics
// ════════════════════════════════════════════════════════════════

describe('Streak and XP mechanics', () => {
  it('addXP sets streak to 1 on first use', () => {
    var session = api.createSession();
    session.createProfile('streak1');
    session.selectProfile('streak1');
    assertEqual(session.getProgress().streak, 0);
    session.addXP(10);
    assertEqual(session.getProgress().streak, 1);
  });

  it('longestStreak is tracked in progress', () => {
    var session = api.createSession();
    session.createProfile('streak2');
    session.selectProfile('streak2');
    session.addXP(10);
    assert(session.getProgress().longestStreak >= 1,
      'longestStreak should be >= 1 after addXP');
  });

  it('practiceLog records XP by date', () => {
    var session = api.createSession();
    session.createProfile('streak3');
    session.selectProfile('streak3');
    session.addXP(25);
    var log = session.getProgress().practiceLog;
    var keys = Object.keys(log);
    assert(keys.length === 1, 'Should have 1 date entry in practiceLog');
    assertEqual(log[keys[0]], 25, 'Should record 25 XP');
  });

  it('freezeTokens field exists in progress', () => {
    var session = api.createSession();
    session.createProfile('streak4');
    session.selectProfile('streak4');
    var p = session.getProgress();
    assert(p.freezeTokens !== undefined, 'freezeTokens should exist');
    assert(typeof p.freezeTokens === 'number', 'freezeTokens should be a number');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 15 — Session edge cases
// ════════════════════════════════════════════════════════════════

describe('Session edge cases', () => {
  it('getProgress before selectProfile returns null', () => {
    var session = api.createSession();
    assertEqual(session.getProgress(), null);
  });

  it('addXP before selectProfile is a no-op', () => {
    var session = api.createSession();
    session.addXP(10); // should not throw
  });

  it('reviewItem before selectProfile is a no-op', () => {
    var session = api.createSession();
    session.reviewItem('vocabFsrs', 'vocabMastery', 'test', 3); // should not throw
  });

  it('save before selectProfile is a no-op', () => {
    var session = api.createSession();
    session.save(); // should not throw
  });

  it('selectProfile with corrupted storage falls back to fresh progress', () => {
    var storage = new api.MemoryStorage();
    storage.setItem('ld_profiles', '["corrupt"]');
    storage.setItem('ld_progress_corrupt', '{{{invalid json');
    var session = api.createSession(storage);
    session.selectProfile('corrupt');
    var p = session.getProgress();
    assert(p, 'Should have progress');
    assertEqual(p.xp, 0, 'Should start with 0 XP');
  });

  it('MemoryStorage.getItem returns null for non-existent key', () => {
    var storage = new api.MemoryStorage();
    assertEqual(storage.getItem('nonexistent'), null);
  });

  it('MemoryStorage.removeItem works correctly', () => {
    var storage = new api.MemoryStorage();
    storage.setItem('key', 'value');
    assertEqual(storage.getItem('key'), 'value');
    storage.removeItem('key');
    assertEqual(storage.getItem('key'), null);
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 16 — checkAnswer edge cases
// ════════════════════════════════════════════════════════════════

describe('checkAnswer edge cases', () => {
  it('case insensitive matching', () => {
    var result = api.checkAnswer('HOLA', 'hola');
    assert(result.correct, 'Should match case-insensitively');
  });

  it('trims leading/trailing whitespace', () => {
    var result = api.checkAnswer('  hola  ', 'hola');
    assert(result.correct, 'Should match after trimming whitespace');
  });

  it('wrong answer returns correct: false', () => {
    var result = api.checkAnswer('perro', 'gato');
    assert(!result.correct, 'Wrong answer should not be correct');
    assert(!result.accentWarn, 'Wrong answer should not have accent warning');
  });

  it('accent variations on multi-word input', () => {
    var result = api.checkAnswer('como estas', 'cómo estás');
    assert(result.correct, 'Should match accent-insensitively');
    assert(result.accentWarn, 'Should warn about missing accents');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 17 — Tense metadata completeness
// ════════════════════════════════════════════════════════════════

describe('Tense metadata completeness', () => {
  it('all tenses have label, labelEn, and level', () => {
    var tenses = api.data.tenses;
    var keys = Object.keys(tenses);
    assert(keys.length >= 19, 'Expected >= 19 tenses, got ' + keys.length);
    keys.forEach(function (t) {
      var meta = tenses[t];
      assert(meta.label, t + ' missing label');
      assert(meta.labelEn, t + ' missing labelEn');
      assert(meta.level, t + ' missing level');
      assert(VALID_LEVELS.indexOf(meta.level) !== -1, t + ' has invalid level: ' + meta.level);
    });
  });

  it('compound tenses have compound: true', () => {
    var tenses = api.data.tenses;
    var compound = Object.keys(tenses).filter(function (t) { return tenses[t].compound; });
    assert(compound.length > 0, 'Should have compound tenses');
    compound.forEach(function (t) {
      assertEqual(tenses[t].compound, true, t + ' should have compound: true');
    });
  });

  it('progressive tenses have progressive: true', () => {
    var tenses = api.data.tenses;
    var progressive = Object.keys(tenses).filter(function (t) { return tenses[t].progressive; });
    assert(progressive.length > 0, 'Should have progressive tenses');
    progressive.forEach(function (t) {
      assertEqual(tenses[t].progressive, true, t + ' should have progressive: true');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 18 — Content ID uniqueness (all types)
// ════════════════════════════════════════════════════════════════

describe('Content ID uniqueness — all types', () => {
  var contentTypes = [
    { name: 'phrases', data: api.data.phrases },
    { name: 'cloze', data: api.data.cloze },
    { name: 'dictation', data: api.data.dictation },
    { name: 'sentenceConstruction', data: api.data.sentenceConstruction },
    { name: 'translationDrills', data: api.data.translationDrills },
    { name: 'branchingDialogues', data: api.data.branchingDialogues },
    { name: 'minimalPairs', data: api.data.minimalPairs },
    { name: 'phoneticPairs', data: api.data.phoneticPairs },
    { name: 'homophones', data: api.data.homophones },
    { name: 'connectors', data: api.data.connectors },
    { name: 'conversations', data: api.data.conversations },
    { name: 'jokes', data: api.data.jokes },
    { name: 'themedVocab', data: api.data.themedVocab },
    { name: 'verbPrepositions', data: api.data.verbPrepositions },
    { name: 'subjunctiveTriggers', data: api.data.subjunctiveTriggers },
    { name: 'writingPrompts', data: api.data.writingPrompts },
    { name: 'comparativeGrammar', data: api.data.comparativeGrammar },
  ];

  contentTypes.forEach(function (ct) {
    it(ct.name + ' IDs are unique', () => {
      var ids = {};
      ct.data.forEach(function (entry) {
        assert(!ids[entry.id], ct.name + ' duplicate ID: ' + entry.id);
        ids[entry.id] = true;
      });
    });
  });

  var culturalTypes = ['recipes', 'music', 'movies', 'poetry', 'sports',
    'proverbs', 'folktales', 'festivals', 'history', 'travel', 'trivia', 'idioms'];

  culturalTypes.forEach(function (mod) {
    it(mod + ' IDs are unique', () => {
      var ids = {};
      api.data[mod].forEach(function (entry) {
        assert(!ids[entry.id], mod + ' duplicate ID: ' + entry.id);
        ids[entry.id] = true;
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 19 — Placement test question quality
// ════════════════════════════════════════════════════════════════

describe('Placement test question quality', () => {
  it('placement questions span all 3 domains', () => {
    var session = api.createSession();
    session.createProfile('ptq');
    session.selectProfile('ptq');
    var pt = session.startPlacement({ level: 'B1', mode: 'both', length: 30 });

    var domains = {};
    var count = 0;
    while (!pt.isFinished() && count < 30) {
      var q = pt.currentQuestion();
      if (!q) break;
      domains[q.domain] = true;
      assert(q.explanation || q.explanation === '',
        'Question ' + q.id + ' missing explanation');
      pt.answer(count % 2 === 0);
      count++;
    }
    pt.finish();

    assert(count > 0, 'Should have answered at least 1 question');
    var domainKeys = Object.keys(domains);
    assert(domainKeys.length >= 2,
      'Expected questions from at least 2 domains, got: ' + domainKeys.join(', '));
  });

  it('placement questions span multiple CEFR levels', () => {
    var session = api.createSession();
    session.createProfile('ptq_levels');
    session.selectProfile('ptq_levels');
    var pt = session.startPlacement({ level: 'B1', mode: 'both', length: 20 });

    var levels = {};
    var count = 0;
    while (!pt.isFinished() && count < 20) {
      var q = pt.currentQuestion();
      if (!q) break;
      levels[q.level] = true;
      pt.answer(count % 3 === 0); // mostly wrong to force level variation
      count++;
    }
    pt.finish();

    var levelKeys = Object.keys(levels);
    assert(levelKeys.length >= 2,
      'Expected questions from at least 2 levels, got: ' + levelKeys.join(', '));
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 20 — Full study session integration
// ════════════════════════════════════════════════════════════════

describe('Full study session integration', () => {
  it('end-to-end: placement → filter vocab → study → verify progress', () => {
    var storage = new api.MemoryStorage();
    var session = api.createSession(storage);
    session.createProfile('e2e');
    session.selectProfile('e2e');

    // Step 1: Run placement test
    var pt = session.startPlacement({ level: 'A2', mode: 'both', length: 5 });
    var count = 0;
    while (!pt.isFinished()) {
      var q = pt.currentQuestion();
      if (!q) break;
      pt.answer(true);
      count++;
    }
    assert(count > 0, 'Placement should have questions');
    var levels = pt.finish();
    assert(levels.overall, 'Should have overall level');

    // Step 2: Filter vocab by placement level
    var level = levels.overall;
    var vocabAtLevel = api.data.vocab.filter(function (v) { return v.level === level; });
    assert(vocabAtLevel.length > 0, 'Should have vocab at level ' + level);

    // Step 3: Study 5 words with FSRS
    var words = api.util.pickN(vocabAtLevel, Math.min(5, vocabAtLevel.length));
    words.forEach(function (w) {
      session.addXP(10);
      session.reviewItem('vocabFsrs', 'vocabMastery', w.word, 3);
    });

    // Step 4: Verify progress
    var p = session.getProgress();
    assert(p.xp >= 50, 'Should have at least 50 XP, got ' + p.xp);
    assert(p.streak >= 1, 'Should have streak >= 1');
    assert(p.placementLevel, 'Should have placement level set');
    assert(p.placementDate, 'Should have placement date set');

    // Verify FSRS records exist for studied words
    words.forEach(function (w) {
      assert(p.vocabFsrs[w.word], 'Should have FSRS record for ' + w.word);
      assert(p.vocabMastery[w.word] >= 1, 'Should have mastery for ' + w.word);
    });

    // Step 5: Save and reload
    session.save();
    var session2 = api.createSession(storage);
    session2.selectProfile('e2e');
    var p2 = session2.getProgress();
    assertEqual(p2.xp, p.xp, 'XP should persist');
    assert(p2.placementLevel, 'Placement level should persist');
  });
});
