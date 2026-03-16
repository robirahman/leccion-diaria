'use strict';

const createAPI = require('../api-node');

let api;

describe('API loader', () => {
  it('creates API without errors', () => {
    api = createAPI();
    assert(api, 'API should be truthy');
  });
});

describe('Pure function access', () => {
  it('conjugate returns correct form', () => {
    assertEqual(api.conjugate('hablar', 'present', 0), 'hablo');
    assertEqual(api.conjugate('comer', 'present', 0), 'como');
  });

  it('conjugateAll returns 6 forms', () => {
    const forms = api.conjugateAll('hablar', 'present');
    assertEqual(forms.length, 6);
    assertEqual(forms[0], 'hablo');
    assertEqual(forms[5], 'hablan');
  });

  it('getParticiple returns past participle', () => {
    assertEqual(api.getParticiple('hablar'), 'hablado');
    assertEqual(api.getParticiple('escribir'), 'escrito');
  });

  it('getGerund returns gerund', () => {
    assertEqual(api.getGerund('hablar'), 'hablando');
    assertEqual(api.getGerund('dormir'), 'durmiendo');
  });

  it('checkAnswer handles exact and accent matches', () => {
    const exact = api.checkAnswer('café', 'café');
    assert(exact.correct, 'Exact match should be correct');
    assert(!exact.accentWarn, 'Exact match should not warn');

    const accent = api.checkAnswer('cafe', 'café');
    assert(accent.correct, 'Accent-insensitive should be correct');
    assert(accent.accentWarn, 'Should warn about missing accent');
  });

  it('stripAccents removes diacritics', () => {
    assertEqual(api.stripAccents('café'), 'cafe');
    assertEqual(api.stripAccents('niño'), 'nino');
    assertEqual(api.stripAccents('año'), 'ano');
  });

  it('esc escapes HTML', () => {
    assertEqual(api.esc('<b>'), '&lt;b&gt;');
  });
});

describe('FSRS functions', () => {
  it('initS returns initial stability', () => {
    const s = api.fsrs.initS(3);
    assert(typeof s === 'number' && s > 0, 'initS(3) should return positive number');
  });

  it('recall returns retrievability', () => {
    const r = api.fsrs.recall(5, 1);
    assert(r > 0 && r < 1, 'recall should be between 0 and 1');
    assert(r > 0.9, 'recall after 1 day with stability 5 should be high');
  });

  it('mastery returns level 1-4', () => {
    assertEqual(api.fsrs.mastery(0.1), 1);
    assertEqual(api.fsrs.mastery(3), 2);
    assertEqual(api.fsrs.mastery(10), 3);
    assertEqual(api.fsrs.mastery(30), 4);
  });
});

describe('IRT functions', () => {
  it('prob returns probability', () => {
    const p = api.irt.prob(3.0, 3.0);
    assert(Math.abs(p - 0.5) < 0.001, 'Equal theta and difficulty should give 0.5');
  });

  it('thetaToLevel returns CEFR level', () => {
    assertEqual(api.irt.thetaToLevel(1.0), 'A1');
    assertEqual(api.irt.thetaToLevel(2.0), 'A2');
    assertEqual(api.irt.thetaToLevel(3.0), 'B1');
    assertEqual(api.irt.thetaToLevel(4.0), 'B2');
    assertEqual(api.irt.thetaToLevel(5.0), 'C1');
    assertEqual(api.irt.thetaToLevel(6.0), 'C2');
  });
});

describe('Utility functions', () => {
  it('shuffle returns new array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = api.util.shuffle(arr);
    assertEqual(shuffled.length, 5);
    // Original should be unchanged
    assertEqual(arr[0], 1);
  });

  it('pick returns an element from array', () => {
    const arr = [1, 2, 3];
    const el = api.util.pick(arr);
    assert(arr.indexOf(el) !== -1, 'pick should return element from array');
  });
});

describe('Data access', () => {
  it('verbs array has entries', () => {
    assert(api.data.verbs.length >= 200, 'Should have at least 200 verbs');
  });

  it('tenses object has entries', () => {
    assert(api.data.tenses.present, 'Should have present tense');
    assert(api.data.tenses.preterite, 'Should have preterite tense');
  });

  it('persons array has 6 entries', () => {
    assertEqual(api.data.persons.length, 6);
  });

  it('grammar data has entries', () => {
    assert(api.data.grammar.length > 0, 'Should have grammar lessons');
  });

  it('phrases data has entries', () => {
    assert(api.data.phrases.length > 0, 'Should have phrases');
  });

  it('categories object has entries', () => {
    assert(Object.keys(api.data.categories).length > 0, 'Should have vocab categories');
  });
});

describe('Session — profile management', () => {
  it('creates and lists profiles', () => {
    const session = api.createSession();
    session.createProfile('maria');
    session.createProfile('juan');
    const profiles = session.listProfiles();
    assert(profiles.indexOf('maria') !== -1, 'Should contain maria');
    assert(profiles.indexOf('juan') !== -1, 'Should contain juan');
  });

  it('does not duplicate profiles', () => {
    const session = api.createSession();
    session.createProfile('maria');
    session.createProfile('maria');
    assertEqual(session.listProfiles().length, 1);
  });
});

describe('Session — progress and XP', () => {
  it('selectProfile initializes fresh progress', () => {
    const session = api.createSession();
    session.createProfile('test');
    session.selectProfile('test');
    const p = session.getProgress();
    assertEqual(p.xp, 0);
    assertEqual(p.streak, 0);
  });

  it('addXP increments XP and updates streak', () => {
    const session = api.createSession();
    session.createProfile('test');
    session.selectProfile('test');
    session.addXP(10);
    assertEqual(session.getProgress().xp, 10);
    assertEqual(session.getProgress().streak, 1);
    session.addXP(5);
    assertEqual(session.getProgress().xp, 15);
  });

  it('save and reload preserves progress', () => {
    const storage = new api.MemoryStorage();
    const s1 = api.createSession(storage);
    s1.createProfile('persist');
    s1.selectProfile('persist');
    s1.addXP(42);
    s1.save();

    const s2 = api.createSession(storage);
    s2.selectProfile('persist');
    assertEqual(s2.getProgress().xp, 42);
  });
});

describe('Session — FSRS review', () => {
  it('reviewItem creates FSRS state', () => {
    const session = api.createSession();
    session.createProfile('reviewer');
    session.selectProfile('reviewer');

    session.reviewItem('vocabFsrs', 'vocabMastery', 'gato', 3);

    const p = session.getProgress();
    assert(p.vocabFsrs.gato, 'Should have FSRS record for gato');
    assert(p.vocabFsrs.gato.s > 0, 'Stability should be positive');
    assert(p.vocabMastery.gato >= 1, 'Mastery should be set');
  });

  it('isDue returns false for just-reviewed items', () => {
    const session = api.createSession();
    session.createProfile('due');
    session.selectProfile('due');

    assert(session.isDue('vocabFsrs', 'perro'), 'New item should be due');
    session.reviewItem('vocabFsrs', 'vocabMastery', 'perro', 3);
    assert(!session.isDue('vocabFsrs', 'perro'), 'Just-reviewed item should not be due');
  });

  it('getDueItems filters correctly', () => {
    const session = api.createSession();
    session.createProfile('dueList');
    session.selectProfile('dueList');

    session.reviewItem('vocabFsrs', 'vocabMastery', 'gato', 3);
    const due = session.getDueItems('vocabFsrs', ['gato', 'perro', 'casa']);
    assertEqual(due.length, 2);
    assert(due.indexOf('perro') !== -1, 'perro should be due');
    assert(due.indexOf('casa') !== -1, 'casa should be due');
  });
});

describe('Session — settings', () => {
  it('setSetting updates progress settings', () => {
    const session = api.createSession();
    session.createProfile('settings');
    session.selectProfile('settings');
    session.setSetting('accents', 'strict');
    assertEqual(session.getProgress().settings.accents, 'strict');
  });
});

describe('PlacementSession — headless IRT', () => {
  it('runs a complete placement test', () => {
    const session = api.createSession();
    session.createProfile('placer');
    session.selectProfile('placer');

    const pt = session.startPlacement({ level: 'B1', mode: 'both', length: 10 });
    let count = 0;
    while (!pt.isFinished()) {
      const q = pt.currentQuestion();
      if (!q) break; // pool exhausted
      // Simulate alternating correct/incorrect
      pt.answer(count % 2 === 0);
      count++;
    }

    assert(count > 0, 'Should have answered at least one question');
    const levels = pt.finish();
    assert(levels.grammar, 'Should have grammar level');
    assert(levels.vocab, 'Should have vocab level');
    assert(levels.overall, 'Should have overall level');
    // Level should be a valid CEFR string
    var validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    assert(validLevels.indexOf(levels.overall) !== -1, 'Overall level should be valid CEFR: ' + levels.overall);
  });

  it('placement results update session progress', () => {
    const session = api.createSession();
    session.createProfile('placed');
    session.selectProfile('placed');

    const pt = session.startPlacement({ level: 'A2', mode: 'both', length: 10 });
    let count = 0;
    while (!pt.isFinished()) {
      const q = pt.currentQuestion();
      if (!q) break;
      pt.answer(true); // answer all correctly
      count++;
    }
    if (count > 0) {
      const levels = pt.finish();
      const p = session.getProgress();
      assert(p.placementLevel, 'Placement level should be set');
      assert(p.placementDate, 'Placement date should be set');
    }
  });
});
