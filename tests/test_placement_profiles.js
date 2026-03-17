'use strict';

// ════════════════════════════════════════════════════════════════
//  test_placement_profiles.js — 7 simulated users take the longest
//  placement test (40 questions) with different knowledge levels:
//    1. No knowledge (random MC, wrong FIB)
//    2. A1 knowledge (correct ≤A1, wrong above)
//    3. A2 knowledge (correct ≤A2, wrong above)
//    4. B1 knowledge (correct ≤B1, wrong above)
//    5. B2 knowledge (correct ≤B2, wrong above)
//    6. C1 knowledge (correct ≤C1, wrong above)
//    7. Expert / C2 (all correct)
// ════════════════════════════════════════════════════════════════

const createAPI = require('../api-node');

var VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
var LEVEL_ORDER = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

// Knowledge cutoff: answer correctly if question level <= cutoff, wrong otherwise.
// null = no knowledge (random/wrong); 'C2' = expert (all correct)
var PROFILES = [
  { name: 'NoKnowledge',  cutoff: null, selfAssess: 'A1', description: 'no Spanish knowledge' },
  { name: 'A1_Student',   cutoff: 'A1', selfAssess: 'A1', description: 'knows only A1' },
  { name: 'A2_Student',   cutoff: 'A2', selfAssess: 'A2', description: 'knows A1-A2' },
  { name: 'B1_Student',   cutoff: 'B1', selfAssess: 'B1', description: 'knows A1-B1' },
  { name: 'B2_Student',   cutoff: 'B2', selfAssess: 'B2', description: 'knows A1-B2' },
  { name: 'C1_Student',   cutoff: 'C1', selfAssess: 'C1', description: 'knows A1-C1' },
  { name: 'Expert',       cutoff: 'C2', selfAssess: 'C1', description: 'linguistics expert (all correct)' },
];

function shouldAnswerCorrectly(questionLevel, cutoff) {
  if (cutoff === null) return false; // no knowledge = always wrong
  return LEVEL_ORDER[questionLevel] <= LEVEL_ORDER[cutoff];
}

// Build a set of words that appear at multiple CEFR levels (same word, different meanings).
// These share mastery state by word key, so mastering at a lower level "leaks" to the higher.
function findCrossLevelWords(api) {
  var byWord = new Map();
  api.data.vocab.forEach(function(w) {
    if (!byWord.has(w.word)) byWord.set(w.word, new Set());
    byWord.get(w.word).add(w.level);
  });
  var crossLevel = new Set();
  byWord.forEach(function(levels, word) {
    if (levels.size > 1) crossLevel.add(word);
  });
  return crossLevel;
}

function runPlacement(api, profile) {
  var storage = new api.MemoryStorage();
  var session = api.createSession(storage);
  session.createProfile(profile.name);
  session.selectProfile(profile.name);

  var pt = session.startPlacement({
    level: profile.selfAssess,
    mode: 'both',
    length: 40,
  });

  var questionsAnswered = 0;
  var correctCount = 0;
  var questionLog = [];

  while (!pt.isFinished()) {
    var q = pt.currentQuestion();
    if (!q) break;

    var isCorrect = profile.cutoff === null ? false :
      shouldAnswerCorrectly(q.level, profile.cutoff);

    questionLog.push({
      domain: q.domain,
      level: q.level,
      type: q.type,
      answeredCorrect: isCorrect,
      difficulty: q.difficulty,
    });

    pt.answer(isCorrect);
    questionsAnswered++;
    if (isCorrect) correctCount++;
  }

  var levels = pt.finish();
  var progress = session.getProgress();

  return {
    session: session,
    levels: levels,
    progress: progress,
    questionsAnswered: questionsAnswered,
    correctCount: correctCount,
    questionLog: questionLog,
  };
}

// ════════════════════════════════════════════════════════════════
//  Run all 7 profiles
// ════════════════════════════════════════════════════════════════

describe('Placement test — 7 user profiles (40 questions each)', function () {
  var allResults = [];

  PROFILES.forEach(function (profile) {
    it('Profile: ' + profile.name + ' (' + profile.description + ')', function () {
      var api = createAPI();
      var crossLevelWords = findCrossLevelWords(api);
      var result = runPlacement(api, profile);
      var levels = result.levels;
      var progress = result.progress;
      var correctCount = result.correctCount;
      var questionsAnswered = result.questionsAnswered;

      // ── Verify question count ──
      assert(questionsAnswered > 0, profile.name + ': Should have questions');
      assert(questionsAnswered <= 40, profile.name + ': Should not exceed 40 questions');

      // ── Verify placement level is valid ──
      assert(VALID_LEVELS.indexOf(levels.overall) !== -1,
        profile.name + ': Invalid overall level: ' + levels.overall);
      assert(VALID_LEVELS.indexOf(levels.grammar) !== -1,
        profile.name + ': Invalid grammar level: ' + levels.grammar);
      assert(VALID_LEVELS.indexOf(levels.vocab) !== -1,
        profile.name + ': Invalid vocab level: ' + levels.vocab);

      // ── Verify placement level matches knowledge ──
      if (profile.cutoff === null) {
        assert(LEVEL_ORDER[levels.overall] <= LEVEL_ORDER['A2'],
          profile.name + ': No knowledge should place at A1-A2, got ' + levels.overall);
      } else if (profile.cutoff === 'C2') {
        assert(LEVEL_ORDER[levels.overall] >= LEVEL_ORDER['C1'],
          profile.name + ': Expert should place at C1+, got ' + levels.overall);
      } else {
        var cutoffIdx = LEVEL_ORDER[profile.cutoff];
        var placedIdx = LEVEL_ORDER[levels.overall];
        var diff = Math.abs(placedIdx - cutoffIdx);
        assert(diff <= 1,
          profile.name + ': Expected placement near ' + profile.cutoff +
          ' (±1 level), got ' + levels.overall + ' (diff=' + diff + ')');
      }

      // ── Verify progress was updated ──
      assert(progress.placementLevel === levels.overall,
        profile.name + ': placementLevel should be set');
      assert(progress.placementDate,
        profile.name + ': placementDate should be set');
      assert(progress.placementLevels,
        profile.name + ': placementLevels should be set');
      assertEqual(progress.placementLevels.grammar, levels.grammar,
        profile.name + ': grammar level mismatch');
      assertEqual(progress.placementLevels.vocab, levels.vocab,
        profile.name + ': vocab level mismatch');

      // ── Verify grammar unlocked correctly ──
      var grammarLevel = levels.grammar;
      var isPerfectFull = correctCount === questionsAnswered &&
        questionsAnswered >= 40 && levels.overall === 'C2';

      var grammarData = api.data.grammar;
      if (grammarData) {
        grammarData.forEach(function (lesson) {
          if (LEVEL_ORDER[lesson.level] < LEVEL_ORDER[grammarLevel]) {
            assert(progress.grammarDone[lesson.id] === 4,
              profile.name + ': Grammar ' + lesson.id + ' (' + lesson.level +
              ') should be mastered below ' + grammarLevel);
            assert(progress.grammarFsrs[lesson.id],
              profile.name + ': Grammar ' + lesson.id + ' should have FSRS record');
          }
        });

        if (!isPerfectFull) {
          grammarData.forEach(function (lesson) {
            if (LEVEL_ORDER[lesson.level] >= LEVEL_ORDER[grammarLevel]) {
              assert(!progress.grammarDone[lesson.id] || progress.grammarDone[lesson.id] !== 4,
                profile.name + ': Grammar ' + lesson.id + ' (' + lesson.level +
                ') should NOT be mastered at grammar level ' + grammarLevel);
            }
          });
        }
      }

      // ── Verify vocab unlocked correctly ──
      var vocabLevel = levels.vocab;
      var vocabData = api.data.vocab;
      if (vocabData) {
        VALID_LEVELS.forEach(function (lv) {
          var words = vocabData.filter(function (w) { return w.level === lv; });
          if (LEVEL_ORDER[lv] < LEVEL_ORDER[vocabLevel] && words.length > 0) {
            var masteredCount = words.filter(function (w) {
              return progress.vocabMastery[w.word] === 3;
            }).length;
            assertEqual(masteredCount, words.length,
              profile.name + ': All vocab at ' + lv + ' should be mastered below ' + vocabLevel);
          }
        });

        // Vocab at/above level should NOT be mastered (except cross-level words and perfect C2)
        if (!isPerfectFull) {
          VALID_LEVELS.forEach(function (lv) {
            if (LEVEL_ORDER[lv] < LEVEL_ORDER[vocabLevel]) return;
            var words = vocabData.filter(function (w) { return w.level === lv; });
            var incorrectlyMastered = words.filter(function (w) {
              return progress.vocabMastery[w.word] === 3 && !crossLevelWords.has(w.word);
            });
            assertEqual(incorrectlyMastered.length, 0,
              profile.name + ': Non-cross-level vocab at ' + lv +
              ' should NOT be mastered at vocab level ' + vocabLevel +
              ', but found: ' + incorrectlyMastered.map(function(w) { return w.word; }).join(', '));
          });
        }
      }

      // ── Verify verb forms unlocked ──
      var verbData = api.data.verbs;
      var tenses = api.data.tenses;
      if (verbData && tenses) {
        var sampleVerbs = verbData.slice(0, 5);
        sampleVerbs.forEach(function (v) {
          if (LEVEL_ORDER[v.level] >= LEVEL_ORDER[grammarLevel]) return;
          Object.keys(tenses).forEach(function (tense) {
            if (LEVEL_ORDER[tenses[tense].level] >= LEVEL_ORDER[grammarLevel]) return;
            for (var p = 0; p < 6; p++) {
              var key = v.infinitive + ':' + tense + ':' + p;
              assert(progress.verbMastery[key] === 3,
                profile.name + ': Verb ' + key + ' should be mastered');
            }
          });
        });
      }

      allResults.push({
        profile: profile.name,
        cutoff: profile.cutoff,
        levels: levels,
        questionsAnswered: questionsAnswered,
        correct: correctCount,
        accuracy: Math.round((correctCount / questionsAnswered) * 100),
        grammarMastered: Object.keys(progress.grammarDone).length,
        vocabMastered: Object.keys(progress.vocabMastery).length,
        verbMastered: Object.keys(progress.verbMastery).length,
      });
    });
  });

  it('placement levels increase monotonically with knowledge', function () {
    assert(allResults.length === 7, 'Should have all 7 profile results, got ' + allResults.length);
    for (var i = 1; i < allResults.length; i++) {
      var prev = allResults[i - 1];
      var curr = allResults[i];
      assert(LEVEL_ORDER[curr.levels.overall] >= LEVEL_ORDER[prev.levels.overall],
        'Placement should not decrease: ' + prev.profile + ' (' + prev.levels.overall +
        ') → ' + curr.profile + ' (' + curr.levels.overall + ')');
    }
  });

  it('no-knowledge user has minimal unlocked content', function () {
    var noKnowledge = allResults[0];
    assertEqual(noKnowledge.grammarMastered, 0,
      'No-knowledge user should have 0 grammar mastered, got ' + noKnowledge.grammarMastered);
    assertEqual(noKnowledge.vocabMastered, 0,
      'No-knowledge user should have 0 vocab mastered, got ' + noKnowledge.vocabMastered);
    assertEqual(noKnowledge.verbMastered, 0,
      'No-knowledge user should have 0 verbs mastered, got ' + noKnowledge.verbMastered);
  });

  it('expert user has maximum unlocked content', function () {
    var expert = allResults[6];
    for (var i = 0; i < 6; i++) {
      assert(expert.vocabMastered >= allResults[i].vocabMastered,
        'Expert vocab (' + expert.vocabMastered +
        ') should be >= ' + allResults[i].profile + ' (' + allResults[i].vocabMastered + ')');
      assert(expert.grammarMastered >= allResults[i].grammarMastered,
        'Expert grammar (' + expert.grammarMastered +
        ') should be >= ' + allResults[i].profile + ' (' + allResults[i].grammarMastered + ')');
    }
  });

  it('mastered content increases with knowledge level', function () {
    for (var i = 1; i < allResults.length; i++) {
      assert(allResults[i].vocabMastered >= allResults[i - 1].vocabMastered,
        'Vocab mastered should not decrease: ' + allResults[i - 1].profile +
        ' (' + allResults[i - 1].vocabMastered + ') → ' + allResults[i].profile +
        ' (' + allResults[i].vocabMastered + ')');
    }
  });
});

// ════════════════════════════════════════════════════════════════
//  Verify daily practice content is appropriate for each level
// ════════════════════════════════════════════════════════════════

describe('Post-placement daily practice appropriateness', function () {
  PROFILES.forEach(function (profile) {
    it(profile.name + ': practice content matches placement level', function () {
      var api = createAPI();
      var crossLevelWords = findCrossLevelWords(api);
      var result = runPlacement(api, profile);
      var levels = result.levels;
      var progress = result.progress;
      var placedLevel = levels.overall;
      var isPerfectFull = result.correctCount === result.questionsAnswered &&
        result.questionsAnswered >= 40 && levels.overall === 'C2';

      // ── Vocab: use vocab-specific level (not overall) for vocab checks ──
      var vocabLevel = levels.vocab;
      var vocabData = api.data.vocab;
      if (vocabData) {
        var belowLevel = vocabData.filter(function (w) {
          return LEVEL_ORDER[w.level] < LEVEL_ORDER[vocabLevel];
        });
        if (belowLevel.length > 0) {
          var belowMastered = belowLevel.filter(function (w) {
            return progress.vocabMastery[w.word] === 3;
          });
          assertEqual(belowMastered.length, belowLevel.length,
            profile.name + ': All vocab below vocab level ' + vocabLevel +
            ' should be mastered (' + belowMastered.length + '/' + belowLevel.length + ')');
        }

        // Vocab AT vocab level: should have unmastered items to study
        // (except for perfect C2 expert who masters everything)
        if (!isPerfectFull) {
          var atLevel = vocabData.filter(function (w) { return w.level === vocabLevel; });
          var unmasteredAtLevel = atLevel.filter(function (w) {
            return !progress.vocabMastery[w.word] || progress.vocabMastery[w.word] < 3;
          });
          assert(unmasteredAtLevel.length > 0,
            profile.name + ': Should have unmastered vocab at vocab level ' + vocabLevel);
        }
      }

      // ── Grammar at grammar level should have unmastered items ──
      var grammarLevel = levels.grammar;
      var grammarData = api.data.grammar;
      if (grammarData && !isPerfectFull) {
        var grammarAtLevel = grammarData.filter(function (l) { return l.level === grammarLevel; });
        var unmasteredGrammar = grammarAtLevel.filter(function (l) {
          return !progress.grammarDone[l.id] || progress.grammarDone[l.id] < 4;
        });
        assert(unmasteredGrammar.length > 0,
          profile.name + ': Should have unmastered grammar at level ' + grammarLevel);
      }

      // ── Reading passages exist at overall level ──
      var readingData = api.data.reading;
      if (readingData) {
        var readingAtLevel = readingData.filter(function (r) {
          return r.level === placedLevel;
        });
        assert(readingAtLevel.length > 0,
          profile.name + ': Should have reading passages at ' + placedLevel);
      }

      // ── Phrases exist at overall level ──
      var phrasesData = api.data.phrases;
      if (phrasesData) {
        var phrasesAtLevel = phrasesData.filter(function (p) {
          return p.level === placedLevel;
        });
        assert(phrasesAtLevel.length > 0,
          profile.name + ': Should have phrases at ' + placedLevel);
      }

      // ── Practice exercises exist at/below overall level ──
      var clozeData = api.data.cloze;
      if (clozeData) {
        var clozeAvail = clozeData.filter(function (c) {
          return LEVEL_ORDER[c.level] <= LEVEL_ORDER[placedLevel];
        });
        assert(clozeAvail.length > 0,
          profile.name + ': Should have cloze at/below ' + placedLevel);
      }

      var dictationData = api.data.dictation;
      if (dictationData) {
        var dictAvail = dictationData.filter(function (d) {
          return LEVEL_ORDER[d.level] <= LEVEL_ORDER[placedLevel];
        });
        assert(dictAvail.length > 0,
          profile.name + ': Should have dictation at/below ' + placedLevel);
      }

      var translationData = api.data.translationDrills;
      if (translationData) {
        var transAvail = translationData.filter(function (t) {
          return LEVEL_ORDER[t.level] <= LEVEL_ORDER[placedLevel];
        });
        assert(transAvail.length > 0,
          profile.name + ': Should have translations at/below ' + placedLevel);
      }
    });
  });
});

// ════════════════════════════════════════════════════════════════
//  Verify question grading is correct for each question type
// ════════════════════════════════════════════════════════════════

describe('Placement test grading correctness', function () {
  it('MC questions: selecting the correct option is graded correct', function () {
    var api = createAPI();
    var session = api.createSession();
    session.createProfile('grading_mc');
    session.selectProfile('grading_mc');

    var pt = session.startPlacement({ level: 'B1', mode: 'both', length: 10 });
    var mcCount = 0;
    while (!pt.isFinished()) {
      var q = pt.currentQuestion();
      if (!q) break;
      if (q.type === 'mc' && q.options) mcCount++;
      pt.answer(true);
    }
    var levels = pt.finish();
    assert(mcCount > 0, 'Should have encountered MC questions');
    assert(LEVEL_ORDER[levels.overall] >= LEVEL_ORDER['B1'],
      'All correct should place at B1+, got ' + levels.overall);
  });

  it('FIB questions: checkAnswer correctly grades fill-in-blank', function () {
    var api = createAPI();
    // Exact match
    assert(api.checkAnswer('habla', 'habla').correct, 'Exact match should be correct');
    // Case insensitive
    assert(api.checkAnswer('HABLA', 'habla').correct, 'Case insensitive should be correct');
    // Accent warning
    var r3 = api.checkAnswer('esta', 'está');
    assert(r3.correct, 'Missing accent should still be correct');
    assert(r3.accentWarn, 'Should warn about missing accent');
    // Wrong answer
    assert(!api.checkAnswer('come', 'habla').correct, 'Wrong answer should be incorrect');
  });

  it('IRT theta updates correctly with answer patterns', function () {
    var api = createAPI();
    // All correct → high placement
    var s1 = api.createSession();
    s1.createProfile('theta_up');
    s1.selectProfile('theta_up');
    var pt1 = s1.startPlacement({ level: 'B1', mode: 'both', length: 20 });
    while (!pt1.isFinished()) {
      if (!pt1.currentQuestion()) break;
      pt1.answer(true);
    }
    var l1 = pt1.finish();

    // All wrong → low placement
    var s2 = api.createSession();
    s2.createProfile('theta_down');
    s2.selectProfile('theta_down');
    var pt2 = s2.startPlacement({ level: 'B1', mode: 'both', length: 20 });
    while (!pt2.isFinished()) {
      if (!pt2.currentQuestion()) break;
      pt2.answer(false);
    }
    var l2 = pt2.finish();

    assert(LEVEL_ORDER[l1.overall] > LEVEL_ORDER[l2.overall],
      'All correct (' + l1.overall + ') should place higher than all wrong (' + l2.overall + ')');
  });
});

// ════════════════════════════════════════════════════════════════
//  Summary report
// ════════════════════════════════════════════════════════════════

describe('Placement test profile summary', function () {
  it('print summary of all 7 profiles', function () {
    var api = createAPI();
    console.log('\n    ┌──────────────────┬──────────┬───────┬─────────┬─────────┬──────────┬──────────┬──────────┐');
    console.log('    │ Profile          │ Accuracy │ Level │ Grammar │ Vocab   │ G.Master │ V.Master │ Vb.Mastr │');
    console.log('    ├──────────────────┼──────────┼───────┼─────────┼─────────┼──────────┼──────────┼──────────┤');

    PROFILES.forEach(function (profile) {
      var result = runPlacement(api, profile);
      var levels = result.levels;
      var progress = result.progress;
      var acc = result.questionsAnswered > 0 ?
        Math.round((result.correctCount / result.questionsAnswered) * 100) : 0;
      var gm = Object.keys(progress.grammarDone).length;
      var vm = Object.keys(progress.vocabMastery).length;
      var vbm = Object.keys(progress.verbMastery).length;

      var name = (profile.name + '                ').substring(0, 16);
      var accStr = (acc + '%        ').substring(0, 8);
      var lvl = (levels.overall + '     ').substring(0, 5);
      var glvl = (levels.grammar + '       ').substring(0, 7);
      var vlvl = (levels.vocab + '       ').substring(0, 7);
      var gmStr = (gm + '        ').substring(0, 8);
      var vmStr = (vm + '        ').substring(0, 8);
      var vbmStr = (vbm + '        ').substring(0, 8);
      console.log('    │ ' + name + ' │ ' + accStr + ' │ ' + lvl + ' │ ' + glvl + ' │ ' + vlvl + ' │ ' + gmStr + ' │ ' + vmStr + ' │ ' + vbmStr + ' │');
    });

    console.log('    └──────────────────┴──────────┴───────┴─────────┴─────────┴──────────┴──────────┴──────────┘');
  });
});
