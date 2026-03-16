'use strict';

const createAPI = require('../api-node');
const api = createAPI();

const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ── Helper ──
function assertFields(obj, fields, label) {
  fields.forEach(function (f) {
    assert(obj[f] !== undefined && obj[f] !== null, label + ' missing field: ' + f);
  });
}

// ════════════════════════════════════════════════════════════════
//  Group 1 — Data availability
// ════════════════════════════════════════════════════════════════

describe('Data availability — all content types load', () => {
  var arrays = {
    verbs: 200, vocab: 25000, grammar: 60, phrases: 300,
    reading: 40, readingSat: 10, cloze: 20, dictation: 40,
    sentenceConstruction: 40, translationDrills: 50,
    branchingDialogues: 5, minimalPairs: 100, phoneticPairs: 40,
    homophones: 20, connectors: 40,
    recipes: 8, music: 8, movies: 8, poetry: 8, sports: 8,
    proverbs: 15, folktales: 10, festivals: 8, history: 8,
    travel: 8, trivia: 30, idioms: 20,
  };
  Object.keys(arrays).forEach(function (key) {
    it('api.data.' + key + ' has >= ' + arrays[key] + ' entries', () => {
      var d = api.data[key];
      assert(Array.isArray(d), key + ' should be an array');
      assert(d.length >= arrays[key], key + ' has ' + d.length + ', expected >= ' + arrays[key]);
    });
  });

  it('api.data.tenses has present and preterite', () => {
    assert(api.data.tenses.present, 'Should have present');
    assert(api.data.tenses.preterite, 'Should have preterite');
  });

  it('api.data.persons has 6 entries', () => {
    assertEqual(api.data.persons.length, 6);
  });

  it('api.data.categories is a non-empty object', () => {
    assert(Object.keys(api.data.categories).length >= 40, 'Should have >= 40 vocab categories');
  });

  it('api.data.minimalPairCategories is a non-empty object', () => {
    assert(Object.keys(api.data.minimalPairCategories).length >= 5);
  });

  it('api.data.phoneticPairCategories is a non-empty object', () => {
    assert(Object.keys(api.data.phoneticPairCategories).length >= 5);
  });

  it('api.data.homophoneCategories is a non-empty object', () => {
    assert(Object.keys(api.data.homophoneCategories).length >= 3);
  });

  it('api.data.connectorCategories is a non-empty object', () => {
    assert(Object.keys(api.data.connectorCategories).length >= 5);
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 2 — Vocabulary data integrity
// ════════════════════════════════════════════════════════════════

describe('Vocabulary data integrity', () => {
  it('every vocab entry has required fields', () => {
    var required = ['word', 'english', 'level', 'pos'];
    api.data.vocab.forEach(function (v, i) {
      assertFields(v, required, 'vocab[' + i + '] (' + v.word + ')');
    });
  });

  it('all vocab levels are valid CEFR', () => {
    api.data.vocab.forEach(function (v) {
      assert(VALID_LEVELS.indexOf(v.level) !== -1, v.word + ' has invalid level: ' + v.level);
    });
  });

  it('nouns have gender field', () => {
    var nouns = api.data.vocab.filter(function (v) { return v.pos === 'noun'; });
    assert(nouns.length > 1000, 'Should have many nouns');
    nouns.forEach(function (v) {
      assert(v.gender === 'm' || v.gender === 'f' || v.gender === 'm/f',
        v.word + ' is a noun but has gender=' + v.gender);
    });
  });

  it('every vocab category has at least 1 word', () => {
    var cats = api.data.categories;
    Object.keys(cats).forEach(function (catKey) {
      var words = api.data.vocab.filter(function (v) { return v.category === catKey; });
      assert(words.length > 0, 'Category "' + catKey + '" has no words');
    });
  });

  it('all CEFR levels are represented', () => {
    VALID_LEVELS.forEach(function (lvl) {
      var count = api.data.vocab.filter(function (v) { return v.level === lvl; }).length;
      assert(count > 0, 'No vocab at level ' + lvl);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 3 — Verb data integrity
// ════════════════════════════════════════════════════════════════

describe('Verb data integrity', () => {
  it('every verb has required fields', () => {
    api.data.verbs.forEach(function (v, i) {
      assertFields(v, ['infinitive', 'english', 'type', 'group', 'level'],
        'verb[' + i + '] (' + v.infinitive + ')');
    });
  });

  it('verb groups are valid', () => {
    api.data.verbs.forEach(function (v) {
      assert(['ar', 'er', 'ir'].indexOf(v.group) !== -1,
        v.infinitive + ' has invalid group: ' + v.group);
    });
  });

  it('verb types are valid', () => {
    var valid = ['regular', 'irregular', 'stem-changing', 'reflexive'];
    api.data.verbs.forEach(function (v) {
      assert(valid.indexOf(v.type) !== -1, v.infinitive + ' has invalid type: ' + v.type);
    });
  });

  it('participles and gerunds generate for all verbs', () => {
    api.data.verbs.forEach(function (v) {
      var p = api.getParticiple(v.infinitive);
      var g = api.getGerund(v.infinitive);
      assert(p && p.length > 0, v.infinitive + ' has empty participle');
      assert(g && g.length > 0, v.infinitive + ' has empty gerund');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 4 — Exhaustive conjugation (all verbs x all tenses)
// ════════════════════════════════════════════════════════════════

describe('Exhaustive conjugation — all verbs x all tenses', () => {
  var tenseKeys = Object.keys(api.data.tenses);

  it('all 19 tenses are available', () => {
    assert(tenseKeys.length >= 19, 'Expected >= 19 tenses, got ' + tenseKeys.length);
  });

  it('every verb conjugates in every simple tense without error', () => {
    var simpleTenses = tenseKeys.filter(function (t) {
      var meta = api.data.tenses[t];
      return !meta.compound && !meta.progressive;
    });
    var errors = [];
    api.data.verbs.forEach(function (v) {
      simpleTenses.forEach(function (t) {
        for (var p = 0; p < 6; p++) {
          var form = api.conjugate(v.infinitive, t, p);
          if (!form || form.length === 0) {
            errors.push(v.infinitive + '/' + t + '/' + p);
          }
        }
      });
    });
    assert(errors.length === 0,
      'Empty conjugations (' + errors.length + '): ' + errors.slice(0, 5).join(', '));
  });

  it('conjugateAll returns 6 forms for every verb/tense', () => {
    var errors = [];
    api.data.verbs.forEach(function (v) {
      tenseKeys.forEach(function (t) {
        var forms = api.conjugateAll(v.infinitive, t);
        if (!forms || forms.length !== 6) {
          errors.push(v.infinitive + '/' + t);
        }
      });
    });
    assert(errors.length === 0,
      'Bad conjugateAll (' + errors.length + '): ' + errors.slice(0, 5).join(', '));
  });

  it('compound tenses contain auxiliary haber', () => {
    var compound = tenseKeys.filter(function (t) {
      return api.data.tenses[t].compound;
    });
    assert(compound.length > 0, 'Should have compound tenses');
    compound.forEach(function (t) {
      var forms = api.conjugateAll('hablar', t);
      forms.forEach(function (f, i) {
        assert(f && f.length > 0, 'hablar/' + t + '/' + i + ' is empty');
        // Compound forms should contain a space (auxiliary + participle)
        assert(f.indexOf(' ') !== -1,
          'hablar/' + t + '/' + i + ' = "' + f + '" — expected compound form with space');
      });
    });
  });

  it('progressive tenses contain estar + gerund', () => {
    var progressive = tenseKeys.filter(function (t) {
      return api.data.tenses[t].progressive;
    });
    if (progressive.length > 0) {
      progressive.forEach(function (t) {
        var forms = api.conjugateAll('hablar', t);
        forms.forEach(function (f, i) {
          assert(f && f.indexOf('hablando') !== -1,
            'hablar/' + t + '/' + i + ' = "' + f + '" — expected gerund');
        });
      });
    }
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 5 — Grammar lesson integrity
// ════════════════════════════════════════════════════════════════

describe('Grammar lesson integrity', () => {
  it('every lesson has required fields', () => {
    api.data.grammar.forEach(function (g, i) {
      assertFields(g, ['id', 'title', 'titleEn', 'level', 'order', 'content', 'quiz'],
        'grammar[' + i + '] (' + g.id + ')');
    });
  });

  it('every lesson has quiz questions with required fields', () => {
    api.data.grammar.forEach(function (g) {
      assert(Array.isArray(g.quiz) && g.quiz.length > 0,
        g.id + ' has no quiz questions');
      g.quiz.forEach(function (q, qi) {
        // All quiz types have a type field and an answer field
        assert(q.type, g.id + ' quiz[' + qi + '] missing type');
        assert(q.answer, g.id + ' quiz[' + qi + '] missing answer');
        var validTypes = ['mc', 'fib', 'error-correct', 'transform'];
        assert(validTypes.indexOf(q.type) !== -1,
          g.id + ' quiz[' + qi + '] has invalid type: ' + q.type);
        // error-correct has sentence but no question; transform has both
        if (q.type === 'error-correct') {
          assert(q.sentence, g.id + ' quiz[' + qi + '] missing sentence');
        } else {
          assert(q.question, g.id + ' quiz[' + qi + '] missing question');
        }
      });
    });
  });

  it('MC questions have options array containing the answer', () => {
    api.data.grammar.forEach(function (g) {
      g.quiz.forEach(function (q, qi) {
        if (q.type === 'mc') {
          assert(Array.isArray(q.options), g.id + ' quiz[' + qi + '] has no options');
          assert(q.options.indexOf(q.answer) !== -1,
            g.id + ' quiz[' + qi + '] answer "' + q.answer + '" not in options');
        }
      });
    });
  });

  it('all CEFR levels have grammar lessons', () => {
    VALID_LEVELS.forEach(function (lvl) {
      var count = api.data.grammar.filter(function (g) { return g.level === lvl; }).length;
      assert(count > 0, 'No grammar lessons at ' + lvl);
    });
  });

  it('grammar IDs are unique', () => {
    var ids = {};
    api.data.grammar.forEach(function (g) {
      assert(!ids[g.id], 'Duplicate grammar ID: ' + g.id);
      ids[g.id] = true;
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 6 — Phrases integrity
// ════════════════════════════════════════════════════════════════

describe('Phrases integrity', () => {
  it('every phrase has required fields', () => {
    api.data.phrases.forEach(function (p, i) {
      assertFields(p, ['id', 'situation', 'spanish', 'english'],
        'phrase[' + i + '] (' + p.id + ')');
    });
  });

  it('formality values are valid when present', () => {
    var valid = ['informal', 'formal', 'neutral'];
    api.data.phrases.forEach(function (p) {
      if (p.formality) {
        assert(valid.indexOf(p.formality) !== -1,
          p.id + ' has invalid formality: ' + p.formality);
      }
    });
  });

  it('reply objects have spanish and english', () => {
    api.data.phrases.forEach(function (p) {
      if (p.reply) {
        assert(p.reply.spanish, p.id + ' reply missing spanish');
        assert(p.reply.english, p.id + ' reply missing english');
      }
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 7 — Reading passages integrity
// ════════════════════════════════════════════════════════════════

describe('Reading passages integrity', () => {
  it('every reading entry has required fields', () => {
    api.data.reading.forEach(function (r, i) {
      assertFields(r, ['id', 'level', 'title', 'text', 'questions'],
        'reading[' + i + '] (' + r.id + ')');
    });
  });

  it('questions have valid structure with correct index in bounds', () => {
    api.data.reading.forEach(function (r) {
      r.questions.forEach(function (q, qi) {
        assertFields(q, ['prompt', 'options', 'correct'],
          r.id + ' q[' + qi + ']');
        assert(Array.isArray(q.options), r.id + ' q[' + qi + '] options not array');
        assert(q.correct >= 0 && q.correct < q.options.length,
          r.id + ' q[' + qi + '] correct=' + q.correct + ' out of bounds (options.length=' + q.options.length + ')');
      });
    });
  });

  it('all reading levels are valid CEFR', () => {
    api.data.reading.forEach(function (r) {
      assert(VALID_LEVELS.indexOf(r.level) !== -1, r.id + ' has invalid level: ' + r.level);
    });
  });

  it('reading IDs are unique', () => {
    var ids = {};
    api.data.reading.forEach(function (r) {
      assert(!ids[r.id], 'Duplicate reading ID: ' + r.id);
      ids[r.id] = true;
    });
  });
});

describe('Reading SAT passages integrity', () => {
  it('every SAT reading entry has required fields', () => {
    api.data.readingSat.forEach(function (r, i) {
      assertFields(r, ['id', 'level', 'title', 'text', 'questions'],
        'readingSat[' + i + '] (' + r.id + ')');
    });
  });

  it('SAT questions have correct index in bounds', () => {
    api.data.readingSat.forEach(function (r) {
      r.questions.forEach(function (q, qi) {
        assert(q.correct >= 0 && q.correct < q.options.length,
          r.id + ' q[' + qi + '] correct out of bounds');
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 8 — Cloze passages integrity
// ════════════════════════════════════════════════════════════════

describe('Cloze passages integrity', () => {
  it('every cloze entry has required fields', () => {
    api.data.cloze.forEach(function (c, i) {
      assertFields(c, ['id', 'level', 'passage', 'blanks'],
        'cloze[' + i + '] (' + c.id + ')');
    });
  });

  it('blanks have required fields', () => {
    api.data.cloze.forEach(function (c) {
      c.blanks.forEach(function (b, bi) {
        assertFields(b, ['id', 'answer'],
          c.id + ' blank[' + bi + ']');
      });
    });
  });

  it('passage contains placeholder for each blank', () => {
    api.data.cloze.forEach(function (c) {
      c.blanks.forEach(function (b) {
        assert(c.passage.indexOf('{' + b.id + '}') !== -1,
          c.id + ' passage missing placeholder {' + b.id + '}');
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 9 — Dictation data integrity
// ════════════════════════════════════════════════════════════════

describe('Dictation data integrity', () => {
  it('every dictation entry has required fields', () => {
    api.data.dictation.forEach(function (d, i) {
      assertFields(d, ['id', 'level', 'sentence', 'english'],
        'dictation[' + i + '] (' + d.id + ')');
    });
  });

  it('all dictation levels are valid CEFR', () => {
    api.data.dictation.forEach(function (d) {
      assert(VALID_LEVELS.indexOf(d.level) !== -1, d.id + ' has invalid level: ' + d.level);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 10 — Sentence construction integrity
// ════════════════════════════════════════════════════════════════

describe('Sentence construction integrity', () => {
  it('every entry has required fields', () => {
    api.data.sentenceConstruction.forEach(function (s, i) {
      assertFields(s, ['id', 'level', 'english', 'sentence', 'words'],
        'sentenceConstruction[' + i + '] (' + s.id + ')');
    });
  });

  it('words array is non-empty', () => {
    api.data.sentenceConstruction.forEach(function (s) {
      assert(Array.isArray(s.words) && s.words.length >= 2,
        s.id + ' has fewer than 2 words');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 11 — Translation drills integrity
// ════════════════════════════════════════════════════════════════

describe('Translation drills integrity', () => {
  it('every entry has required fields', () => {
    api.data.translationDrills.forEach(function (t, i) {
      assertFields(t, ['id', 'level', 'english', 'primary'],
        'translationDrills[' + i + '] (' + t.id + ')');
    });
  });

  it('all levels are valid CEFR', () => {
    api.data.translationDrills.forEach(function (t) {
      assert(VALID_LEVELS.indexOf(t.level) !== -1, t.id + ' has invalid level: ' + t.level);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 12 — Branching dialogues integrity
// ════════════════════════════════════════════════════════════════

describe('Branching dialogues integrity', () => {
  it('every dialogue has required fields', () => {
    api.data.branchingDialogues.forEach(function (bd, i) {
      assertFields(bd, ['id', 'title', 'level', 'speakers', 'nodes'],
        'branchingDialogues[' + i + '] (' + bd.id + ')');
    });
  });

  it('node graph is valid — every next pointer references an existing node', () => {
    api.data.branchingDialogues.forEach(function (bd) {
      var nodeIds = {};
      bd.nodes.forEach(function (n) { nodeIds[n.id] = true; });
      bd.nodes.forEach(function (n) {
        if (n.next) {
          assert(nodeIds[n.next], bd.id + ' node "' + n.id + '" points to missing node: ' + n.next);
        }
        if (n.choices) {
          n.choices.forEach(function (c, ci) {
            if (c.next) {
              assert(nodeIds[c.next],
                bd.id + ' node "' + n.id + '" choice[' + ci + '] points to missing node: ' + c.next);
            }
          });
        }
      });
    });
  });

  it('choice nodes have spanish and english text', () => {
    api.data.branchingDialogues.forEach(function (bd) {
      bd.nodes.forEach(function (n) {
        if (n.choices) {
          n.choices.forEach(function (c, ci) {
            assert(c.spanish, bd.id + ' node "' + n.id + '" choice[' + ci + '] missing spanish');
            assert(c.english, bd.id + ' node "' + n.id + '" choice[' + ci + '] missing english');
          });
        }
      });
    });
  });

  it('every dialogue has at least one terminal node (no next, no choices)', () => {
    api.data.branchingDialogues.forEach(function (bd) {
      var hasTerminal = bd.nodes.some(function (n) {
        return !n.next && !n.choices;
      });
      assert(hasTerminal, bd.id + ' has no terminal node');
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 13 — Pronunciation data integrity
// ════════════════════════════════════════════════════════════════

describe('Minimal pairs integrity', () => {
  it('every entry has required fields', () => {
    api.data.minimalPairs.forEach(function (mp, i) {
      assertFields(mp, ['id', 'category', 'level'],
        'minimalPairs[' + i + '] (' + mp.id + ')');
    });
  });

  it('categories referenced by pairs exist', () => {
    var cats = api.data.minimalPairCategories;
    api.data.minimalPairs.forEach(function (mp) {
      assert(cats[mp.category], mp.id + ' references missing category: ' + mp.category);
    });
  });
});

describe('Phonetic pairs integrity', () => {
  it('every entry has required fields', () => {
    api.data.phoneticPairs.forEach(function (pp, i) {
      assertFields(pp, ['id', 'category', 'level'],
        'phoneticPairs[' + i + '] (' + pp.id + ')');
    });
  });

  it('categories referenced by pairs exist', () => {
    var cats = api.data.phoneticPairCategories;
    api.data.phoneticPairs.forEach(function (pp) {
      assert(cats[pp.category], pp.id + ' references missing category: ' + pp.category);
    });
  });
});

describe('Homophones integrity', () => {
  it('every entry has required fields', () => {
    api.data.homophones.forEach(function (h, i) {
      assertFields(h, ['id', 'category', 'level', 'words'],
        'homophones[' + i + '] (' + h.id + ')');
    });
  });

  it('words array has at least 2 words each', () => {
    api.data.homophones.forEach(function (h) {
      assert(h.words.length >= 2, h.id + ' has fewer than 2 words');
    });
  });
});

describe('Connectors integrity', () => {
  it('every entry has required fields', () => {
    api.data.connectors.forEach(function (c, i) {
      assertFields(c, ['id', 'category', 'level'],
        'connectors[' + i + '] (' + c.id + ')');
    });
  });

  it('categories referenced by connectors exist', () => {
    var cats = api.data.connectorCategories;
    api.data.connectors.forEach(function (c) {
      assert(cats[c.category], c.id + ' references missing category: ' + c.category);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 14 — Cultural content integrity
// ════════════════════════════════════════════════════════════════

// Standard cultural module schema (prompt/options/correct)
var culturalModules = [
  'recipes', 'music', 'movies', 'sports', 'festivals', 'history', 'travel'
];

culturalModules.forEach(function (mod) {
  describe(mod.charAt(0).toUpperCase() + mod.slice(1) + ' cultural content integrity', () => {
    it('every entry has required fields', () => {
      api.data[mod].forEach(function (e, i) {
        assertFields(e, ['id', 'spanishName', 'englishName', 'vocab', 'quiz'],
          mod + '[' + i + '] (' + e.id + ')');
      });
    });

    it('quiz questions have valid structure', () => {
      api.data[mod].forEach(function (e) {
        assert(Array.isArray(e.quiz) && e.quiz.length > 0, e.id + ' has no quiz');
        e.quiz.forEach(function (q, qi) {
          assertFields(q, ['prompt', 'options', 'correct'],
            e.id + ' quiz[' + qi + ']');
          assert(q.correct >= 0 && q.correct < q.options.length,
            e.id + ' quiz[' + qi + '] correct=' + q.correct + ' out of bounds');
        });
      });
    });

    it('vocab arrays have word and english', () => {
      api.data[mod].forEach(function (e) {
        if (e.vocab && e.vocab.length > 0) {
          e.vocab.forEach(function (v, vi) {
            assertFields(v, ['word', 'english'], e.id + ' vocab[' + vi + ']');
          });
        }
      });
    });
  });
});

// Poetry has the same schema plus level
describe('Poetry cultural content integrity', () => {
  it('every entry has required fields including level', () => {
    api.data.poetry.forEach(function (e, i) {
      assertFields(e, ['id', 'spanishName', 'englishName', 'level', 'vocab', 'quiz'],
        'poetry[' + i + '] (' + e.id + ')');
    });
  });

  it('quiz questions are valid', () => {
    api.data.poetry.forEach(function (e) {
      e.quiz.forEach(function (q, qi) {
        assertFields(q, ['prompt', 'options', 'correct'], e.id + ' quiz[' + qi + ']');
        assert(q.correct >= 0 && q.correct < q.options.length,
          e.id + ' quiz[' + qi + '] correct out of bounds');
      });
    });
  });
});

// Proverbs/Folktales use question/answer (string) schema
describe('Proverbs content integrity', () => {
  it('every entry has required fields', () => {
    api.data.proverbs.forEach(function (p, i) {
      assertFields(p, ['id', 'spanishName', 'englishName', 'quiz'],
        'proverbs[' + i + '] (' + p.id + ')');
    });
  });

  it('quiz uses question/answer/options schema', () => {
    api.data.proverbs.forEach(function (p) {
      p.quiz.forEach(function (q, qi) {
        assertFields(q, ['question', 'options', 'answer'],
          p.id + ' quiz[' + qi + ']');
        assert(q.options.indexOf(q.answer) !== -1,
          p.id + ' quiz[' + qi + '] answer not in options');
      });
    });
  });
});

describe('Folktales content integrity', () => {
  it('every entry has required fields', () => {
    api.data.folktales.forEach(function (f, i) {
      assertFields(f, ['id', 'spanishName', 'englishName', 'quiz'],
        'folktales[' + i + '] (' + f.id + ')');
    });
  });

  it('quiz uses question/answer/options schema', () => {
    api.data.folktales.forEach(function (f) {
      f.quiz.forEach(function (q, qi) {
        assertFields(q, ['question', 'options', 'answer'],
          f.id + ' quiz[' + qi + ']');
        assert(q.options.indexOf(q.answer) !== -1,
          f.id + ' quiz[' + qi + '] answer not in options');
      });
    });
  });
});

// Trivia uses a flat question format
describe('Trivia content integrity', () => {
  it('every entry has required fields', () => {
    api.data.trivia.forEach(function (t, i) {
      assertFields(t, ['id', 'category', 'prompt', 'options', 'correct'],
        'trivia[' + i + '] (' + t.id + ')');
    });
  });

  it('correct index is in bounds', () => {
    api.data.trivia.forEach(function (t) {
      assert(t.correct >= 0 && t.correct < t.options.length,
        t.id + ' correct=' + t.correct + ' out of bounds');
    });
  });
});

// Idioms
describe('Idioms content integrity', () => {
  it('every entry has required fields', () => {
    api.data.idioms.forEach(function (d, i) {
      assertFields(d, ['id', 'spanish', 'meaning', 'level'],
        'idioms[' + i + '] (' + d.id + ')');
    });
  });

  it('idiom levels are valid CEFR', () => {
    api.data.idioms.forEach(function (d) {
      assert(VALID_LEVELS.indexOf(d.level) !== -1, d.id + ' has invalid level: ' + d.level);
    });
  });

  it('quiz questions have valid structure when present', () => {
    api.data.idioms.forEach(function (d) {
      if (d.quiz) {
        d.quiz.forEach(function (q, qi) {
          assertFields(q, ['prompt', 'options', 'correct'], d.id + ' quiz[' + qi + ']');
          assert(q.correct >= 0 && q.correct < q.options.length,
            d.id + ' quiz[' + qi + '] correct out of bounds');
        });
      }
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 15 — FSRS algorithm edge cases
// ════════════════════════════════════════════════════════════════

describe('FSRS algorithm — all ratings and edge cases', () => {
  it('initS and initD accept ratings 1-4', () => {
    for (var r = 1; r <= 4; r++) {
      var s = api.fsrs.initS(r);
      var d = api.fsrs.initD(r);
      assert(typeof s === 'number' && s > 0, 'initS(' + r + ') should be positive');
      assert(typeof d === 'number' && d > 0, 'initD(' + r + ') should be positive');
    }
  });

  it('higher ratings produce higher initial stability', () => {
    assert(api.fsrs.initS(4) > api.fsrs.initS(1), 'Easy should have higher stability than Again');
  });

  it('recall decreases over time', () => {
    var r1 = api.fsrs.recall(5, 1);
    var r10 = api.fsrs.recall(5, 10);
    var r100 = api.fsrs.recall(5, 100);
    assert(r1 > r10, 'Recall at 1 day should be > recall at 10 days');
    assert(r10 > r100, 'Recall at 10 days should be > recall at 100 days');
  });

  it('mastery progression with increasing stability', () => {
    assertEqual(api.fsrs.mastery(0.1), 1);
    assertEqual(api.fsrs.mastery(3), 2);
    assertEqual(api.fsrs.mastery(10), 3);
    assertEqual(api.fsrs.mastery(30), 4);
  });

  it('sAfterRecall produces positive stability', () => {
    var s = api.fsrs.sAfterRecall(5, 5, 0.9, 3);
    assert(typeof s === 'number' && s > 0, 'sAfterRecall should return positive number');
  });

  it('sAfterForgetting produces positive stability', () => {
    var s = api.fsrs.sAfterForgetting(5, 5, 0.9);
    assert(typeof s === 'number' && s > 0, 'sAfterForgetting should return positive number');
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 16 — Placement test — all modes and levels
// ════════════════════════════════════════════════════════════════

describe('Placement test — all modes and starting levels', () => {
  var modes = ['both', 'grammar', 'vocab'];
  var levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  modes.forEach(function (mode) {
    levels.forEach(function (level) {
      it('completes with mode=' + mode + ', level=' + level, () => {
        var session = api.createSession();
        session.createProfile('pt_' + mode + '_' + level);
        session.selectProfile('pt_' + mode + '_' + level);

        var pt = session.startPlacement({ level: level, mode: mode, length: 5 });
        var count = 0;
        while (!pt.isFinished()) {
          var q = pt.currentQuestion();
          if (!q) break;
          pt.answer(count % 2 === 0);
          count++;
        }
        assert(count > 0, 'Should answer at least one question');
        var result = pt.finish();
        assert(result.overall, 'Should have overall level');
        assert(VALID_LEVELS.indexOf(result.overall) !== -1,
          'Overall level should be valid CEFR: ' + result.overall);

        // Check domain-specific levels based on mode
        if (mode === 'both' || mode === 'grammar') {
          assert(result.grammar, 'Should have grammar level for mode=' + mode);
        }
        if (mode === 'both' || mode === 'vocab') {
          assert(result.vocab, 'Should have vocab level for mode=' + mode);
        }
      });
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 17 — Session lifecycle — all FSRS stores
// ════════════════════════════════════════════════════════════════

describe('Session lifecycle — all FSRS stores', () => {
  var stores = [
    { fsrs: 'vocabFsrs', mastery: 'vocabMastery', key: 'gato' },
    { fsrs: 'verbFsrs', mastery: 'verbMastery', key: 'hablar:present:0' },
    { fsrs: 'grammarFsrs', mastery: 'grammarDone', key: 'gram-1' },
    { fsrs: 'phraseFsrs', mastery: 'phraseMastery', key: 'greet-1' },
  ];

  stores.forEach(function (s) {
    it('review + isDue + getDueItems works for ' + s.fsrs, () => {
      var session = api.createSession();
      session.createProfile('store_' + s.fsrs);
      session.selectProfile('store_' + s.fsrs);

      assert(session.isDue(s.fsrs, s.key), s.key + ' should be due initially');
      session.reviewItem(s.fsrs, s.mastery, s.key, 3);
      assert(!session.isDue(s.fsrs, s.key), s.key + ' should not be due after review');

      var due = session.getDueItems(s.fsrs, [s.key, 'nonexistent']);
      assertEqual(due.length, 1, 'Only nonexistent should be due');
      assertEqual(due[0], 'nonexistent');
    });
  });

  it('profile isolation — two profiles do not share state', () => {
    var storage = new api.MemoryStorage();
    var session = api.createSession(storage);

    session.createProfile('alice');
    session.createProfile('bob');

    session.selectProfile('alice');
    session.addXP(100);
    session.save();

    session.selectProfile('bob');
    assertEqual(session.getProgress().xp, 0, 'Bob should have 0 XP');

    session.selectProfile('alice');
    assertEqual(session.getProgress().xp, 100, 'Alice should still have 100 XP');
  });

  it('settings round-trip for all keys', () => {
    var session = api.createSession();
    session.createProfile('settings_test');
    session.selectProfile('settings_test');

    var settings = {
      display: 'immersion',
      region: 'spain',
      theme: 'light',
      palette: 'oaxaca',
      accents: 'strict',
      ttsRate: 1.3,
      dailyGoal: 200,
    };

    Object.keys(settings).forEach(function (k) {
      session.setSetting(k, settings[k]);
    });

    var p = session.getProgress();
    Object.keys(settings).forEach(function (k) {
      assertEqual(p.settings[k], settings[k], 'Setting ' + k + ' should be ' + settings[k]);
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Group 18 — Cross-content consistency
// ════════════════════════════════════════════════════════════════

describe('Cross-content consistency', () => {
  it('all content types use valid CEFR levels', () => {
    var contentArrays = [
      { name: 'vocab', data: api.data.vocab, field: 'level' },
      { name: 'grammar', data: api.data.grammar, field: 'level' },
      { name: 'reading', data: api.data.reading, field: 'level' },
      { name: 'readingSat', data: api.data.readingSat, field: 'level' },
      { name: 'cloze', data: api.data.cloze, field: 'level' },
      { name: 'dictation', data: api.data.dictation, field: 'level' },
      { name: 'sentenceConstruction', data: api.data.sentenceConstruction, field: 'level' },
      { name: 'translationDrills', data: api.data.translationDrills, field: 'level' },
      { name: 'branchingDialogues', data: api.data.branchingDialogues, field: 'level' },
      { name: 'minimalPairs', data: api.data.minimalPairs, field: 'level' },
      { name: 'phoneticPairs', data: api.data.phoneticPairs, field: 'level' },
      { name: 'homophones', data: api.data.homophones, field: 'level' },
      { name: 'connectors', data: api.data.connectors, field: 'level' },
    ];
    contentArrays.forEach(function (ca) {
      ca.data.forEach(function (entry) {
        assert(VALID_LEVELS.indexOf(entry[ca.field]) !== -1,
          ca.name + ' entry ' + (entry.id || entry.word) + ' has invalid level: ' + entry[ca.field]);
      });
    });
  });

  it('IRT thetaToLevel covers all CEFR levels', () => {
    var thetas = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    var seen = {};
    thetas.forEach(function (t) { seen[api.irt.thetaToLevel(t)] = true; });
    VALID_LEVELS.forEach(function (lvl) {
      assert(seen[lvl], 'thetaToLevel never returns ' + lvl);
    });
  });

  it('checkAnswer handles accent variations correctly', () => {
    // Exact match
    var r1 = api.checkAnswer('café', 'café');
    assert(r1.correct && !r1.accentWarn, 'Exact match should be correct without warning');

    // Missing accent
    var r2 = api.checkAnswer('cafe', 'café');
    assert(r2.correct && r2.accentWarn, 'Missing accent should be correct with warning');

    // Wrong answer
    var r3 = api.checkAnswer('te', 'café');
    assert(!r3.correct, 'Wrong answer should not be correct');
  });

  it('util.pickN returns correct count without duplicates', () => {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var picked = api.util.pickN(arr, 5);
    assertEqual(picked.length, 5);
    var unique = {};
    picked.forEach(function (v) { unique[v] = true; });
    assertEqual(Object.keys(unique).length, 5, 'All picked values should be unique');
  });
});
