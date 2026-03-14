// ════════════════════════════════════════════════════════════
//  app-practice.js — Practice exercises, export/import,
//                    admin, dashboard, review, reading,
//                    themed vocab, curriculum tracks
// ════════════════════════════════════════════════════════════
'use strict';

// Detect English/Spanish cognates — words similar enough to guess without knowing Spanish.
// Uses normalized Levenshtein distance: cognate if edit distance / max length < 0.35
function isCognate(spanish, english) {
  const s = spanish.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const e = english.toLowerCase();
  if (s === e) return true;
  const maxLen = Math.max(s.length, e.length);
  if (maxLen <= 2) return s === e;
  return levenshtein(s, e) / maxLen < 0.35;
}

function buildPlacementVocabQs(level, count) {
  if (typeof VOCAB_DATA === 'undefined') return [];
  buildVocabIndexes();
  // Exclude cognates from B1+ — they're trivially guessable at higher levels
  const levelIdx = LEVEL_ORDER[level] || 0;
  const words = (VOCAB_BY_LEVEL[level] || []).filter(w =>
    levelIdx < 3 || !w._cognate);
  if (words.length < 4) return [];
  const picked = pickN(words, count);
  return picked.map(w => {
    const reverse = Math.random() < 0.5;
    const pool = words.filter(x => x.word !== w.word);
    // Prefer distractors matching part of speech so e.g. adjective answers
    // don't get verb distractors (obvious giveaway)
    const samePos = w.pos ? pool.filter(x => x.pos === w.pos) : pool;
    const posPool = samePos.length >= 3 ? samePos : pool;
    // Prefer distractors with similar word count so multi-word answers
    // don't stand out against single-word distractors (and vice versa)
    const answerWordCount = (reverse ? w.word : w.english).split(/\s+/).length;
    const sameLength = posPool.filter(x => {
      const xWords = (reverse ? x.word : x.english).split(/\s+/).length;
      return xWords === answerWordCount;
    });
    const distPool = sameLength.length >= 3 ? sameLength : posPool;
    const wrongs = pickN(distPool, 3);
    if (reverse) {
      return {
        domain: 'vocab', level, type: 'mc',
        prompt: `${t('howDoYouSay')} "${w.english}" ${t('inSpanish')}`,
        answer: w.word,
        options: shuffle([w.word, ...wrongs.map(x => x.word)]),
        explanation: `${w.word} = ${w.english}`,
      };
    } else {
      return {
        domain: 'vocab', level, type: 'mc',
        prompt: `${t('whatDoesMean')} "${w.word}" ${t('mean')}`,
        answer: w.english,
        options: shuffle([w.english, ...wrongs.map(x => x.english)]),
        explanation: `${w.word} = ${w.english}`,
      };
    }
  });
}

// Determine the effective difficulty of a verb conjugation question.
// Regular verbs: difficulty is based on the tense alone (conjugation patterns are trivial).
// Irregular/stem-changing verbs: difficulty is the higher of tense level and verb level.
function getVerbQuestionLevel(verb, tense) {
  const tenseLevel = TENSE_META[tense].level;
  if (verb.type === 'regular') return tenseLevel;
  return LEVEL_ORDER[verb.level] >= LEVEL_ORDER[tenseLevel] ? verb.level : tenseLevel;
}

function buildPlacementVerbQs(level, count) {
  if (typeof VERB_DATA === 'undefined' || typeof conjugate === 'undefined') return [];
  const simpleTenses = getActiveTenses(Object.keys(TENSE_META).filter(t => !TENSE_META[t].compound));

  // Build candidates where the effective difficulty matches the requested level
  const candidates = [];
  for (const v of VERB_DATA) {
    for (const t of simpleTenses) {
      if (getVerbQuestionLevel(v, t) === level) {
        candidates.push({ verb: v, tense: t });
      }
    }
  }
  if (candidates.length === 0) return [];

  const picked = pickN(candidates, count);
  return picked.map(({ verb: v, tense }) => {
    // For imperatives, skip yo (person 0) — it doesn't exist
    const isImperative = tense === TENSE_IMPERATIVE_AFF || tense === TENSE_IMPERATIVE_NEG;
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const correct = conjugate(v.infinitive, tense, person);
    if (!correct || correct === '—' || correct === '?') return null;
    // Build harder distractors: same verb in different persons/tenses
    const wrongs = new Set();
    let attempts = 0;
    // First: same verb, different tense, same person (shares person marker)
    while (wrongs.size < 2 && attempts < 20) {
      const wt = pick(simpleTenses.filter(t => t !== tense));
      if (wt === TENSE_IMPERATIVE_AFF || wt === TENSE_IMPERATIVE_NEG) { attempts++; continue; }
      const w = conjugate(v.infinitive, wt, person);
      if (w && w !== correct && w !== '—' && w !== '?') wrongs.add(w);
      attempts++;
    }
    // Then: same verb, same tense, different person
    attempts = 0;
    while (wrongs.size < 3 && attempts < 20) {
      let wp = Math.floor(Math.random() * 6);
      if (isImperative && wp === 0) wp = 1;
      if (wp === person) { attempts++; continue; }
      const w = conjugate(v.infinitive, tense, wp);
      if (w && w !== correct && w !== '—' && w !== '?') wrongs.add(w);
      attempts++;
    }
    // Fallback: other verbs same tense if still needed
    attempts = 0;
    while (wrongs.size < 3 && attempts < 20) {
      const wv = pick(VERB_DATA);
      const w = conjugate(wv.infinitive, tense, person);
      if (w && w !== correct && w !== '—' && w !== '?') wrongs.add(w);
      attempts++;
    }
    if (wrongs.size < 3) return null;
    return {
      domain: 'verb', level, type: 'mc',
      prompt: `${t('conjugatePrompt')} "<strong>${esc(v.infinitive)}</strong>" (${esc(v.english)})<br><span class="text-muted">${tenseLabel(TENSE_META[tense]) || tense} — ${PERSON_LABELS[PERSONS[person]]}</span>`,
      answer: correct,
      options: shuffle([correct, ...wrongs]),
      explanation: `${v.infinitive} → ${correct}`,
    };
  }).filter(Boolean);
}

// IRT difficulty midpoints per level
const LEVEL_DIFFICULTY = { A1: 1.4, A2: 2.3, B1: 3.15, B2: 3.95, C1: 4.8, C2: 5.9 };

function buildPlacementIRTPool() {
  const pool = [];
  const mode = placementMode || 'both';

  // 1. Add dedicated placement questions (placement_questions.js)
  if (typeof PLACEMENT_QUESTIONS !== 'undefined') {
    for (const q of PLACEMENT_QUESTIONS) {
      if (mode !== 'both' && scoringGroup(q.domain) !== mode) continue;
      pool.push({ ...q, source: 'dedicated' });
    }
  }

  // 2. Add generated questions from existing content (grammar, vocab, verbs)
  for (const level of PLACEMENT_LEVELS) {
    const diff = LEVEL_DIFFICULTY[level];
    if (mode !== 'vocab') {
      const grammar = buildPlacementGrammarQs(level, 5);
      grammar.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-g-${pool.length}`, source: 'generated' }));
      const verbs = buildPlacementVerbQs(level, 4);
      verbs.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-vb-${pool.length}`, source: 'generated' }));
    }
    if (mode !== 'grammar') {
      const vocab = buildPlacementVocabQs(level, 5);
      vocab.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-v-${pool.length}`, source: 'generated' }));
    }
  }

  return pool;
}

function savePlacementState() {
  try {
    const state = {
      questions: placementQuestions,
      idx: placementIdx,
      thetas: placementThetas,
      history: placementHistory,
      ses: placementSEs,
      usedIds: [...placementUsedIds],
      lastDomains: placementLastDomains,
      targetLength: placementTargetLength,
      mode: placementMode,
      profile: currentProfile,
    };
    sessionStorage.setItem('ld_placement_state', JSON.stringify(state));
  } catch (e) { /* ignore quota errors */ }
}

function clearPlacementState() {
  sessionStorage.removeItem('ld_placement_state');
}

function restorePlacementTest() {
  try {
    const raw = sessionStorage.getItem('ld_placement_state');
    if (!raw) return false;
    const state = JSON.parse(raw);
    if (state.profile !== currentProfile || state.idx >= (state.targetLength || 40)) {
      clearPlacementState();
      return false;
    }
    placementQuestions = state.questions;
    placementIdx = state.idx;
    // Backward compat: old saved state with single theta
    if (state.thetas) {
      placementThetas = state.thetas;
      placementSEs = state.ses;
    } else {
      placementThetas = { grammar: state.theta || 3.0, vocab: state.theta || 3.0 };
      placementSEs = { grammar: state.se || 2.0, vocab: state.se || 2.0 };
    }
    placementHistory = state.history;
    placementUsedIds = new Set(state.usedIds);
    placementLastDomains = state.lastDomains;
    placementTargetLength = state.targetLength || 40;
    placementMode = state.mode || 'both';
    showScreen('placement');
    renderPlacementQuestion();
    return true;
  } catch (e) {
    clearPlacementState();
    return false;
  }
}

function startPlacementTest() {
  closeModal();
  showScreen('placement');
  // Show self-assessment step
  document.getElementById('pt-container').innerHTML = `
    <h3 style="text-align:center;margin-bottom:0.5rem">How would you describe your Spanish?</h3>
    <p class="text-muted text-sm" style="text-align:center;margin-bottom:1rem">This helps us start the test at the right level.</p>
    <div class="pt-self-assess">
      <button class="card pt-level-choice" data-action="start-placement-at" data-level="A1">
        <div class="card-title">Complete Beginner</div>
        <div class="card-subtitle text-xs">I know little to no Spanish</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-at" data-level="A2">
        <div class="card-title">Elementary</div>
        <div class="card-subtitle text-xs">I know basic greetings, numbers, and simple phrases</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-at" data-level="B1">
        <div class="card-title">Intermediate</div>
        <div class="card-subtitle text-xs">I can hold simple conversations and use past tense</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-at" data-level="B2">
        <div class="card-title">Upper Intermediate</div>
        <div class="card-subtitle text-xs">I'm comfortable with most tenses and can discuss complex topics</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-at" data-level="C1">
        <div class="card-title">Advanced</div>
        <div class="card-subtitle text-xs">I'm fluent but want to refine grammar and vocabulary</div>
      </button>
    </div>
  `;
  document.getElementById('pt-progress').textContent = '';
  document.getElementById('pt-level-badge').textContent = '';
  document.getElementById('pt-progress-bar-fill').style.width = '0%';
  document.getElementById('pt-next').style.display = 'none';
  const ctrl = document.getElementById('pt-controls');
  if (ctrl) ctrl.innerHTML = '';
}

function showPlacementModeSelection(level) {
  document.getElementById('pt-container').innerHTML = `
    <h3 style="text-align:center;margin-bottom:0.5rem">What do you want to test?</h3>
    <p class="text-muted text-sm" style="text-align:center;margin-bottom:1rem">Choose which skills to assess.</p>
    <div class="pt-self-assess">
      <button class="card pt-level-choice" data-action="start-placement-mode" data-level="${level}" data-mode="both">
        <div class="card-title">Grammar &amp; Vocabulary</div>
        <div class="card-subtitle text-xs">Full placement test covering both skills</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-mode" data-level="${level}" data-mode="grammar">
        <div class="card-title">Grammar Only</div>
        <div class="card-subtitle text-xs">Test grammar and verb conjugation only</div>
      </button>
      <button class="card pt-level-choice" data-action="start-placement-mode" data-level="${level}" data-mode="vocab">
        <div class="card-title">Vocabulary Only</div>
        <div class="card-subtitle text-xs">Test vocabulary knowledge only</div>
      </button>
    </div>
  `;
}

function startPlacementAt(level, mode) {
  placementMode = mode || 'both';
  const startTheta = LEVEL_DIFFICULTY[level] || 3.0;
  placementQuestions = buildPlacementIRTPool();
  placementIdx = 0;
  // Single-mode: only adjust the tested domain's theta; leave the other at default
  if (placementMode === 'grammar') {
    placementThetas = { grammar: startTheta, vocab: 3.0 };
  } else if (placementMode === 'vocab') {
    placementThetas = { grammar: 3.0, vocab: startTheta };
  } else {
    placementThetas = { grammar: startTheta, vocab: startTheta };
  }
  placementHistory = [];
  placementSEs = { grammar: 2.0, vocab: 2.0 };
  placementUsedIds = new Set();
  placementLastDomains = [];
  placementTargetLength = 20;
  savePlacementState();
  renderPlacementQuestion();
}

// IRT: Select next question with difficulty closest to current theta
function selectNextIRTQuestion() {
  const available = placementQuestions.filter(q => !placementUsedIds.has(q.id));
  if (available.length === 0) return null;

  const mode = placementMode || 'both';
  const singleMode = mode !== 'both';

  // Count questions asked per scoring group so far
  const counts = { grammar: 0, vocab: 0 };
  for (const h of placementHistory) counts[scoringGroup(h.domain)]++;
  const total = placementHistory.length;
  const remaining = placementTargetLength - total;

  // Target ~60% grammar, ~40% vocab for balanced estimates (skip in single-mode)
  let preferredGroup = null;
  if (!singleMode && remaining > 0) {
    const grammarTarget = Math.round(placementTargetLength * 0.6);
    const vocabTarget = placementTargetLength - grammarTarget;
    const grammarNeed = Math.max(0, grammarTarget - counts.grammar);
    const vocabNeed = Math.max(0, vocabTarget - counts.vocab);
    if (vocabNeed >= remaining) preferredGroup = 'vocab';
    else if (grammarNeed >= remaining) preferredGroup = 'grammar';
  }

  // Consecutive-domain penalty (skip in single-mode — all same group)
  const lastTwo = placementLastDomains.slice(-2);
  const allSame = !singleMode && lastTwo.length === 2 && lastTwo[0] === lastTwo[1];

  let best = null;
  let bestScore = Infinity;
  for (const q of available) {
    const group = scoringGroup(q.domain);
    const theta = placementThetas[group];
    const dist = Math.abs(q.difficulty - theta);
    const domainPenalty = (allSame && q.domain === lastTwo[0]) ? 2.0 : 0;
    const quotaPenalty = (preferredGroup && group !== preferredGroup) ? 1.5 : 0;
    const score = dist + domainPenalty + quotaPenalty;
    if (score < bestScore) {
      bestScore = score;
      best = q;
    }
  }
  return best;
}

function renderPlacementQuestion() {
  if (placementIdx >= placementTargetLength) { finishPlacementTest(); return; }

  const q = selectNextIRTQuestion();
  if (!q) { finishPlacementTest(); return; }

  placementUsedIds.add(q.id);
  // Store current question for answer checking
  placementCurrentQ = q;

  // Update UI — use the relevant theta for the current mode
  const mode = placementMode || 'both';
  const estTheta = mode === 'grammar' ? placementThetas.grammar
    : mode === 'vocab' ? placementThetas.vocab
    : (placementThetas.grammar + placementThetas.vocab) / 2;
  const estimatedLevel = thetaToLevel(estTheta);
  document.getElementById('pt-progress').textContent = `${placementIdx + 1} / ${placementTargetLength}`;
  const pct = Math.round(((placementIdx) / placementTargetLength) * 100);
  document.getElementById('pt-progress-bar-fill').style.width = pct + '%';
  document.getElementById('pt-level-badge').textContent = `${t('testingLevel')} ${estimatedLevel}`;
  document.getElementById('pt-level-badge').style.background = (GRAMMAR_LEVELS || {})[estimatedLevel]?.color || 'var(--accent)';
  document.getElementById('pt-next').style.display = 'none';

  // Test controls (adjust length / end early)
  const controlsEl = document.getElementById('pt-controls');
  if (controlsEl) {
    const minReached = placementIdx >= 5;
    controlsEl.innerHTML = `<div class="pt-controls-row">
      <button class="btn btn-outline btn-xs${placementTargetLength===10?' active':''}" data-action="pt-set-length" data-len="10">10 Qs</button>
      <button class="btn btn-outline btn-xs${placementTargetLength===20?' active':''}" data-action="pt-set-length" data-len="20">20 Qs</button>
      <button class="btn btn-outline btn-xs${placementTargetLength===40?' active':''}" data-action="pt-set-length" data-len="40">40 Qs</button>
      <button class="btn btn-outline btn-xs pt-end-btn" data-action="end-placement-early" ${minReached?'':'disabled'} title="${minReached?'End test and see results':'Answer at least 5 questions'}">End Test</button>
    </div>`;
  }

  const container = document.getElementById('pt-container');
  const domainLabel = q.domain === 'grammar' ? t('grammarDomain') : q.domain === 'vocab' ? t('vocabDomain') : q.domain === 'usage' ? t('usageDomain') : q.domain === 'reading' ? t('readingDomain') : t('conjDomain');

  if (q.type === 'mc' && q.options) {
    container.innerHTML = `
      <div class="text-muted mb-1" style="font-size:0.75rem">${domainLabel} — ${q.level}</div>
      <div class="quiz-question">${q.prompt}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) =>
          `<button class="quiz-option" data-action="answer-placement" data-idx="${i}">${esc(opt)}</button>`
        ).join('')}
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-placement-mc" style="display:none">${tBtn('submit')}</button>
    `;
  } else {
    container.innerHTML = `
      <div class="text-muted mb-1" style="font-size:0.75rem">${domainLabel} — ${q.level}</div>
      <div class="quiz-question">${q.prompt}</div>
      <div class="quiz-input-row">
        <input type="text" id="pt-fib-input" placeholder="${t('typeAnswer')}" autocomplete="off" autocapitalize="off">
        <button class="btn btn-primary" data-action="submit-placement-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-pt" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-pt" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-pt" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-pt" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-pt" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-pt" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="pt-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('pt-fib-input')?.focus(), 50);
  }
}

function answerPlacementMC(idx) {
  selectMCOption('#pt-container', idx);
}

function submitPlacementMC() {
  const selectedBtn = document.querySelector('#pt-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const q = placementCurrentQ;
  if (!q) return;
  const selected = q.options[idx];
  const isCorrect = selected === q.answer;

  // Highlight buttons
  const btns = document.querySelectorAll('#pt-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (q.options[i] === q.answer) btn.classList.add('correct');
    if (i === idx && !isCorrect) btn.classList.add('incorrect');
  });

  const submitBtn = document.querySelector('#pt-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  recordPlacementAnswer(q, isCorrect);
  document.getElementById('pt-next').style.display = 'flex';
}

function submitPlacementFIB() {
  const q = placementCurrentQ;
  if (!q) return;
  const input = document.getElementById('pt-fib-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  const result = checkAnswer(val, q.answer);
  const fb = document.getElementById('pt-fib-feedback');
  fb.style.display = 'block';
  input.disabled = true;

  if (result.correct) {
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = result.accentWarn
      ? `${t('correctAccent')} <span class="text-muted">${esc(q.answer)}</span>`
      : `${t('correct')} <strong>${esc(q.answer)}</strong>`;
    recordPlacementAnswer(q, true);
  } else {
    fb.className = 'quiz-feedback incorrect';
    fb.innerHTML = `${t('incorrectAnswer')} <strong>${esc(q.answer)}</strong>`;
    if (q.explanation) fb.innerHTML += `<br><span class="text-muted">${esc(q.explanation)}</span>`;
    recordPlacementAnswer(q, false);
  }
  document.getElementById('pt-next').style.display = 'flex';
}

// Rasch model probability: P(correct | theta, difficulty)
function irtProb(theta, difficulty) {
  return 1 / (1 + Math.exp(-(theta - difficulty)));
}

// Convert theta to CEFR level
function thetaToLevel(theta) {
  if (theta < 1.8) return 'A1';
  if (theta < 2.7) return 'A2';
  if (theta < 3.5) return 'B1';
  if (theta < 4.3) return 'B2';
  if (theta < 5.2) return 'C1';
  return 'C2';
}

// Newton-Raphson MLE update for theta after each answer
// Uses a Bayesian prior (normal, mean=3.0, sd=1.5) to regularize estimates
// and prevent wild jumps from lucky answers on hard questions.
function updateTheta() {
  if (placementHistory.length === 0) return;

  const PRIOR_MEAN = 3.0;  // B1 center
  const PRIOR_SD = 1.5;    // fairly broad prior
  const PRIOR_VAR = PRIOR_SD * PRIOR_SD;

  // Run regularized Newton-Raphson separately for each scoring group
  for (const group of ['grammar', 'vocab']) {
    const items = placementHistory.filter(h => scoringGroup(h.domain) === group);
    if (items.length === 0) continue;

    let theta = placementThetas[group];
    for (let iter = 0; iter < 20; iter++) {
      let num = 0, den = 0;
      for (const h of items) {
        const p = irtProb(theta, h.difficulty);
        num += (h.correct ? 1 : 0) - p;
        den += p * (1 - p);
      }
      // Add Bayesian prior: pulls theta toward PRIOR_MEAN
      num -= (theta - PRIOR_MEAN) / PRIOR_VAR;
      den += 1 / PRIOR_VAR;
      if (den < 0.001) break;
      const step = num / den;
      // Dampen step: limit to ±1.0 per iteration
      const dampedStep = Math.max(-1.0, Math.min(1.0, step));
      theta += dampedStep;
      theta = Math.max(0.5, Math.min(6.5, theta));
      if (Math.abs(dampedStep) < 0.005) break;
    }
    placementThetas[group] = theta;

    let info = 0;
    for (const h of items) {
      const p = irtProb(theta, h.difficulty);
      info += p * (1 - p);
    }
    // Include prior information in SE calculation
    info += 1 / PRIOR_VAR;
    placementSEs[group] = info > 0 ? 1 / Math.sqrt(info) : 2.0;
  }
}

function recordPlacementAnswer(q, isCorrect) {
  placementHistory.push({
    difficulty: q.difficulty || LEVEL_DIFFICULTY[q.level] || 3.0,
    correct: isCorrect,
    domain: q.domain,
    level: q.level,
  });
  placementLastDomains.push(q.domain);

  // Update theta estimate
  updateTheta();
  savePlacementState();
}

function nextPlacementQuestion() {
  placementIdx++;
  savePlacementState();
  renderPlacementQuestion();
}

function determinePlacementLevel() {
  const mode = placementMode || 'both';
  const gLevel = thetaToLevel(placementThetas.grammar);
  const vLevel = thetaToLevel(placementThetas.vocab);
  let overall;
  if (mode === 'grammar') overall = gLevel;
  else if (mode === 'vocab') overall = vLevel;
  else overall = thetaToLevel((placementThetas.grammar + placementThetas.vocab) / 2);
  return { grammar: gLevel, vocab: vLevel, overall };
}

function seedMatureFsrs(store, key) {
  store[key] = { s: 30, d: 5, lastRev: Date.now() };
}

function levelBelow(itemLevel, targetLevel) {
  return (LEVEL_ORDER[itemLevel] || 0) < (LEVEL_ORDER[targetLevel] || 0);
}

function applyPlacementResults(levels) {
  const mode = placementMode || 'both';
  const grammarLevel = levels.grammar;
  const vocabLevel = levels.vocab;

  // Mark levels BELOW the placed level as known.
  // Only exception: 100% on the full 40-question test at C2 → mark C2 as complete too.
  const totalCorrect = placementHistory.filter(h => h.correct).length;
  const perfectFull = totalCorrect === placementHistory.length
    && placementHistory.length >= 40
    && levels.overall === 'C2';
  const grammarCheck = perfectFull ? levelAtOrBelow : levelBelow;
  const vocabCheck = perfectFull ? levelAtOrBelow : levelBelow;

  // Mark grammar lessons as mastered (uses grammar level) — skip in vocab-only mode
  if (mode !== 'vocab' && typeof GRAMMAR_DATA !== 'undefined') {
    GRAMMAR_DATA.forEach(l => {
      if (grammarCheck(l.level, grammarLevel)) {
        seedMatureFsrs(progress.grammarFsrs, l.id);
        progress.grammarDone[l.id] = 4;
      }
    });
  }

  // Mark vocab as mastered (uses vocab level) — skip in grammar-only mode
  if (mode !== 'grammar' && typeof VOCAB_DATA !== 'undefined') {
    buildVocabIndexes();
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    for (const lv of levelOrder) {
      if (!vocabCheck(lv, vocabLevel)) continue;
      for (const w of (VOCAB_BY_LEVEL[lv] || [])) {
        progress.vocabMastery[w.word] = 3;
        seedMatureFsrs(progress.vocabFsrs, w.word);
      }
    }
  }

  // Mark verb forms as mastered (uses grammar level — conjugation is structural) — skip in vocab-only mode
  if (mode !== 'vocab' && typeof VERB_DATA !== 'undefined' && typeof TENSE_META !== 'undefined') {
    VERB_DATA.forEach(v => {
      if (!grammarCheck(v.level, grammarLevel)) return;
      Object.keys(TENSE_META).forEach(tense => {
        if (!grammarCheck(TENSE_META[tense].level, grammarLevel)) return;
        for (let p = 0; p < 6; p++) {
          const key = `${v.infinitive}:${tense}:${p}`;
          progress.verbMastery[key] = 3;
          seedMatureFsrs(progress.verbFsrs, key);
        }
      });
    });
  }

  progress.placementLevel = levels.overall;  // backward compat
  // In single-mode, only update the tested domain's level; preserve the other
  if (mode === 'grammar') {
    progress.placementLevels = { grammar: grammarLevel, vocab: progress.placementLevels?.vocab || vocabLevel };
  } else if (mode === 'vocab') {
    progress.placementLevels = { grammar: progress.placementLevels?.grammar || grammarLevel, vocab: vocabLevel };
  } else {
    progress.placementLevels = { grammar: grammarLevel, vocab: vocabLevel };
  }
  progress.placementDate = todayStr();
  saveProgress();
}

function finishPlacementTest() {
  clearPlacementState();
  const levels = determinePlacementLevel();
  applyPlacementResults(levels);

  showScreen('placement-results');

  // Overall level badge
  const info = GRAMMAR_LEVELS?.[levels.overall] || { name: levels.overall, color: '#888' };
  document.getElementById('ptr-level').textContent = levels.overall;
  document.getElementById('ptr-level').style.background = info.color;
  document.getElementById('ptr-level-name').textContent = info.name;

  // Per-level accuracy from history
  const levelStats = {};
  for (const lv of PLACEMENT_LEVELS) levelStats[lv] = { correct: 0, total: 0 };
  for (const h of placementHistory) {
    if (levelStats[h.level]) {
      levelStats[h.level].total++;
      if (h.correct) levelStats[h.level].correct++;
    }
  }

  let breakdownHtml = '';

  // Per-domain level badges
  const mode = placementMode || 'both';
  const gInfo = GRAMMAR_LEVELS?.[levels.grammar] || { color: '#888' };
  const vInfo = GRAMMAR_LEVELS?.[levels.vocab] || { color: '#888' };
  const gTheta = Math.round(placementThetas.grammar * 100) / 100;
  const vTheta = Math.round(placementThetas.vocab * 100) / 100;
  const gSE = Math.round(placementSEs.grammar * 100) / 100;
  const vSE = Math.round(placementSEs.vocab * 100) / 100;
  const totalCorrect = placementHistory.filter(h => h.correct).length;

  breakdownHtml += `<div style="display:flex;gap:1.5rem;justify-content:center;margin-bottom:1rem">`;
  if (mode !== 'vocab') {
    breakdownHtml += `
      <div style="text-align:center">
        <div style="font-size:0.75rem;color:var(--text-muted)">${t('grammarLevel')}</div>
        <div class="level-badge" style="background:${gInfo.color};display:inline-block;padding:0.25rem 0.75rem;border-radius:0.5rem;color:#fff;font-weight:700;font-size:1.1rem">${levels.grammar}</div>
        <div style="font-size:0.7rem;color:var(--text-muted)">${gTheta} &plusmn; ${gSE}</div>
      </div>`;
  }
  if (mode !== 'grammar') {
    breakdownHtml += `
      <div style="text-align:center">
        <div style="font-size:0.75rem;color:var(--text-muted)">${t('vocabLevel')}</div>
        <div class="level-badge" style="background:${vInfo.color};display:inline-block;padding:0.25rem 0.75rem;border-radius:0.5rem;color:#fff;font-weight:700;font-size:1.1rem">${levels.vocab}</div>
        <div style="font-size:0.7rem;color:var(--text-muted)">${vTheta} &plusmn; ${vSE}</div>
      </div>`;
  }
  breakdownHtml += `
    </div>
    <div style="text-align:center;margin-bottom:0.75rem;font-size:0.85rem;color:var(--text-muted)">
      ${totalCorrect}/${placementHistory.length} ${t('correctLabelLC')}
    </div>
  `;

  for (const lv of PLACEMENT_LEVELS) {
    const sc = levelStats[lv].correct;
    const tot = levelStats[lv].total;
    const pct = tot > 0 ? Math.round((sc / tot) * 100) : 0;
    const lvInfo = GRAMMAR_LEVELS?.[lv] || { color: '#888' };
    breakdownHtml += `
      <div class="placement-breakdown-row">
        <span class="placement-breakdown-label">${lv}</span>
        <div class="placement-breakdown-bar">
          <div class="placement-breakdown-fill" style="width:${pct}%;background:${lvInfo.color}"></div>
        </div>
        <span class="placement-breakdown-score">${tot > 0 ? sc + '/' + tot : '—'}</span>
      </div>
    `;
  }
  document.getElementById('ptr-breakdown').innerHTML = breakdownHtml;

  // Message showing per-domain results (match the same check used in applyPlacementResults)
  const totalCorr = placementHistory.filter(h => h.correct).length;
  const perfFull = totalCorr === placementHistory.length
    && placementHistory.length >= 40
    && levels.overall === 'C2';
  const gCheck = perfFull ? levelAtOrBelow : levelBelow;
  const vCheck = perfFull ? levelAtOrBelow : levelBelow;

  if (mode === 'grammar') {
    const grammarCount = GRAMMAR_DATA?.filter(l => gCheck(l.level, levels.grammar)).length || 0;
    document.getElementById('ptr-message').innerHTML =
      `Grammar placed at <strong>${levels.grammar}</strong> — ${grammarCount} lessons and verb forms marked as known.`;
  } else if (mode === 'vocab') {
    buildVocabIndexes();
    let vocabCount = 0;
    for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      if (vCheck(lv, levels.vocab)) vocabCount += (VOCAB_BY_LEVEL[lv] || []).length;
    }
    document.getElementById('ptr-message').innerHTML =
      `Vocabulary placed at <strong>${levels.vocab}</strong> — ${vocabCount} words marked as mastered.`;
  } else {
    const grammarCount = GRAMMAR_DATA?.filter(l => gCheck(l.level, levels.grammar)).length || 0;
    buildVocabIndexes();
    let vocabCount = 0;
    for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      if (vCheck(lv, levels.vocab)) vocabCount += (VOCAB_BY_LEVEL[lv] || []).length;
    }
    document.getElementById('ptr-message').innerHTML =
      t('placementResultMsgDual')
        .replace('%gl', levels.grammar).replace('%g', grammarCount)
        .replace('%vl', levels.vocab).replace('%v', vocabCount);
  }
}

// ════════════════════════════════════════
//  EXPORT / IMPORT
// ════════════════════════════════════════

function exportProgress() {
  if (!progress) return;
  const data = JSON.stringify(progress, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leccion-diaria-${currentProfile}-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        progress = { ...newProgress(), ...data };
        saveProgress();
        applySettings();
        updateNavStats();
        showModal(t('importTitle'), `<p>${t('importSuccess')}</p>`, [
          { label: tBtn('ok'), action: 'close-modal', cls: 'btn-primary' },
        ]);
      } catch {
        showModal(t('errorTitle'), `<p>${t('invalidFile')}</p>`, [
          { label: tBtn('ok'), action: 'close-modal', cls: 'btn-primary' },
        ]);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ════════════════════════════════════════
//  ADMIN MODE
// ════════════════════════════════════════

function renderAdmin() {
  const el = document.getElementById('admin-content');
  if (!el || !progress) return;
  let html = '';

  // ── Placement Level ──
  const levels = ['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  html += `<div class="settings-group"><h3>Placement Level</h3>
    <div class="setting-row"><div class="pill-group">
      ${levels.map(l => `<button class="pill${(progress.placementLevel || '') === l ? ' active' : ''}" data-action="admin-set-level" data-val="${l}">${l || 'None'}</button>`).join('')}
    </div></div></div>`;

  // ── Boolean completion stores ──
  const boolSections = [
    { title: 'Grammar Lessons', store: 'grammarDone', items: typeof GRAMMAR_DATA !== 'undefined' ? GRAMMAR_DATA.map(g => ({ key: g.id, label: `${g.titleEn || g.title} (${g.level})` })) : [] },
    { title: 'Themed Vocabulary', store: 'themedVocabDone', items: typeof THEMED_VOCAB_DATA !== 'undefined' ? THEMED_VOCAB_DATA.map(t => ({ key: t.id, label: `${t.theme} (${t.level})` })) : [] },
  ];

  // Culture items from various modules
  const cultureItems = [];
  const cultureModules = [
    [typeof CONVERSATIONS_DATA !== 'undefined' ? CONVERSATIONS_DATA : null, 'title'],
    [typeof RECIPES_DATA !== 'undefined' ? RECIPES_DATA : null, 'englishName'],
    [typeof MUSIC_DATA !== 'undefined' ? MUSIC_DATA : null, 'titleEn'],
    [typeof MOVIES_DATA !== 'undefined' ? MOVIES_DATA : null, 'titleEn'],
    [typeof POETRY_DATA !== 'undefined' ? POETRY_DATA : null, 'titleEn'],
    [typeof SPORTS_DATA !== 'undefined' ? SPORTS_DATA : null, 'titleEn'],
    [typeof PROVERBS_DATA !== 'undefined' ? PROVERBS_DATA : null, 'titleEn'],
    [typeof FOLKTALES_DATA !== 'undefined' ? FOLKTALES_DATA : null, 'titleEn'],
    [typeof FESTIVALS_DATA !== 'undefined' ? FESTIVALS_DATA : null, 'titleEn'],
    [typeof HISTORY_DATA !== 'undefined' ? HISTORY_DATA : null, 'titleEn'],
    [typeof TRAVEL_DATA !== 'undefined' ? TRAVEL_DATA : null, 'titleEn'],
    [typeof TRIVIA_DATA !== 'undefined' ? TRIVIA_DATA : null, 'titleEn'],
    [typeof IDIOMS_DATA !== 'undefined' ? IDIOMS_DATA : null, 'titleEn'],
    [typeof JOKES_DATA !== 'undefined' ? JOKES_DATA : null, 'titleEn'],
  ];
  for (const [d, field] of cultureModules) {
    if (d && Array.isArray(d)) {
      for (const item of d) {
        if (item.id) cultureItems.push({ key: item.id, label: item[field] || item.title || item.id });
      }
    }
  }
  if (cultureItems.length) boolSections.push({ title: 'Culture', store: 'cultureDone', items: cultureItems });

  for (const sec of boolSections) {
    const doneCount = sec.items.filter(i => progress[sec.store]?.[i.key]).length;
    html += `<div class="settings-group">
      <h3 data-action="admin-collapse">${sec.title} <span class="text-muted text-sm">(${doneCount}/${sec.items.length})</span> ▸</h3>
      <div class="admin-section" style="display:none">
        ${sec.items.map(i => {
          const done = !!progress[sec.store]?.[i.key];
          return `<div class="setting-row" style="padding:0.3rem 0">
            <span class="text-sm">${esc(i.label)}</span>
            <button class="btn btn-sm ${done ? 'btn-primary' : 'btn-outline'}" data-action="admin-toggle" data-store="${sec.store}" data-key="${esc(i.key)}" style="min-width:3rem">${done ? 'Done' : '—'}</button>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  // ── FSRS/Mastery stores ──
  const fsrsStores = [
    { title: 'Verb Mastery', stores: 'verbFsrs,verbMastery' },
    { title: 'Vocabulary Mastery', stores: 'vocabFsrs,vocabMastery' },
    { title: 'Phrase Mastery', stores: 'phraseFsrs,phraseMastery' },
    { title: 'Number Mastery', stores: 'numberMastery' },
    { title: 'Minimal Pairs', stores: 'mpFsrs,mpMastery' },
    { title: 'Phonetic Pairs', stores: 'ppFsrs,ppMastery' },
    { title: 'Homophones', stores: 'homFsrs,homMastery' },
    { title: 'Connectors', stores: 'connFsrs,connMastery' },
    { title: 'Sentence Construction', stores: 'sentenceFsrs,sentenceMastery' },
    { title: 'Cloze Passages', stores: 'clozeFsrs,clozeMastery' },
    { title: 'Translation Drills', stores: 'translationFsrs,translationMastery' },
    { title: 'Dictation', stores: 'dictFsrs,dictMastery' },
    { title: 'Reading', stores: 'readingFsrs,readingMastery' },
  ];

  html += '<div class="settings-group"><h3>Mastery &amp; FSRS Stores</h3>';
  for (const fs of fsrsStores) {
    const keys = fs.stores.split(',');
    const count = keys.reduce((n, k) => n + Object.keys(progress[k] || {}).length, 0);
    html += `<div class="setting-row">
      <span class="text-sm">${fs.title} <span class="text-muted">(${count} items)</span></span>
      ${count > 0 ? `<button class="btn btn-sm btn-outline" data-action="admin-clear-store" data-stores="${fs.stores}" style="color:var(--red)">Clear</button>` : ''}
    </div>`;
  }
  html += '</div>';

  // ── XP & Streak ──
  html += `<div class="settings-group"><h3>Stats</h3>
    <div class="setting-row"><span class="text-sm">XP: ${progress.xp}</span></div>
    <div class="setting-row"><span class="text-sm">Streak: ${progress.streak} days (longest: ${progress.longestStreak})</span></div>
  </div>`;

  el.innerHTML = html;
}

// ════════════════════════════════════════
//  PRACTICE EXERCISES
// ════════════════════════════════════════

// Levenshtein distance for dictation fuzzy matching
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => { const r = new Array(b.length + 1); r[0] = i; return r; });
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[a.length][b.length];
}

// ── Minimal Pairs ──

function renderMinimalPairCategories() {
  const container = document.getElementById('mp-categories');
  if (!container) return;
  if (typeof MINIMAL_PAIR_CATEGORIES === 'undefined') {
    container.innerHTML = '<p class="text-muted" style="text-align:center">Loading…</p>';
    return;
  }
  container.innerHTML = Object.entries(MINIMAL_PAIR_CATEGORIES).map(([key, cat]) => `
    <div class="card" data-action="start-mp" data-cat="${key}">
      <div class="card-title">${esc(cat.label || cat.titleEn || cat.title)}</div>
      <div class="card-subtitle">${esc((cat.optionLabels || cat.options)?.join(' vs ') || '')}</div>
    </div>
  `).join('');
}

function startMinimalPairs(category) {
  if (typeof MINIMAL_PAIRS === 'undefined') return;
  const userLevel = progress?.placementLevel || 'B1';
  let items = MINIMAL_PAIRS.filter(p => p.category === category);
  items = shuffle(items).slice(0, 10);
  if (items.length === 0) return;
  mpQueue = items; mpIdx = 0; mpScore = 0; mpAnswered = false;
  showScreen('mp-drill');
  renderMPQuestion();
}

function renderMPQuestion() {
  if (mpIdx >= mpQueue.length) { showResults(mpScore, mpQueue.length, 'mp', 'Minimal Pairs'); return; }
  const item = mpQueue[mpIdx];
  mpAnswered = false;
  document.getElementById('mp-progress').textContent = `${mpIdx + 1} / ${mpQueue.length}`;
  document.getElementById('mp-sentence').innerHTML = esc(item.sentence).replace('___', '<strong>______</strong>');
  document.getElementById('mp-options').innerHTML = item.options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-mp" data-idx="${i}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('mp-feedback').style.display = 'none';
  document.getElementById('mp-contrast').style.display = 'none';
  document.getElementById('mp-next').style.display = 'none';
}

function answerMP(idx) {
  if (mpAnswered) return;
  const btns = document.querySelectorAll('#mp-options .quiz-option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[idx]?.classList.add('selected');
  // Auto-submit on selection (binary choice, no need for separate submit)
  submitMP();
}

function submitMP() {
  if (mpAnswered) return;
  const selectedBtn = document.querySelector('#mp-options .quiz-option.selected');
  if (!selectedBtn) return;
  mpAnswered = true;
  const item = mpQueue[mpIdx];
  const chosen = selectedBtn.textContent.trim();
  const correct = chosen.toLowerCase() === item.answer.toLowerCase() ||
    stripAccents(chosen.toLowerCase()) === stripAccents(item.answer.toLowerCase());

  const btns = document.querySelectorAll('#mp-options .quiz-option');
  btns.forEach(b => {
    b.classList.add('disabled');
    const btnText = b.textContent.trim().toLowerCase();
    if (btnText === item.answer.toLowerCase() || stripAccents(btnText) === stripAccents(item.answer.toLowerCase())) {
      b.classList.add('correct');
    } else if (b.classList.contains('selected')) {
      b.classList.add('incorrect');
    }
  });

  if (correct) { mpScore++; addXP(5); }
  else { addXP(1); }

  const displayMode = progress?.settings?.display || 'standard';
  const explanation = (displayMode === 'immersion' && item.explanationEs) ? item.explanationEs : item.explanation;

  const fb = document.getElementById('mp-feedback');
  fb.innerHTML = `<div class="${correct ? 'text-correct' : 'text-incorrect'}">${correct ? '✓' : '✗'} ${esc(explanation)}</div>`;
  fb.style.display = 'block';

  const contrast = document.getElementById('mp-contrast');
  if (item.contrast) {
    contrast.innerHTML = esc(item.contrast);
    contrast.style.display = 'block';
  }

  document.getElementById('mp-next').style.display = 'flex';
  reviewItem(progress.mpFsrs, progress.mpMastery, item.id, correct ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextMP() { mpIdx++; renderMPQuestion(); }

// ── Phonetic Pairs ──

function renderPhoneticPairCategories() {
  const container = document.getElementById('pp-categories');
  if (!container || typeof PHONETIC_PAIR_CATEGORIES === 'undefined') return;
  container.innerHTML = Object.entries(PHONETIC_PAIR_CATEGORIES).map(([key, cat]) => `
    <div class="card" data-action="start-pp" data-cat="${key}">
      <div class="card-title">${esc(cat.label)}</div>
      <div class="card-subtitle">${esc(cat.description)}</div>
    </div>
  `).join('');
}

function startPhoneticPairs(category) {
  if (typeof PHONETIC_PAIRS === 'undefined') return;
  const items = shuffle(PHONETIC_PAIRS.filter(p => p.category === category));
  // Flatten: each pair produces 2 questions (one per example sentence)
  const queue = [];
  for (const item of items) {
    // Randomly pick which side (A or B) to ask first
    const sides = shuffle(['A', 'B']);
    for (const side of sides) {
      queue.push({ item, side, sentence: item['example' + side], answer: item['word' + side], wrong: item['word' + (side === 'A' ? 'B' : 'A')] });
    }
  }
  ppQueue = shuffle(queue).slice(0, 10);
  if (ppQueue.length === 0) return;
  ppIdx = 0; ppScore = 0; ppAnswered = false;
  showScreen('pp-drill');
  renderPPQuestion();
}

function renderPPQuestion() {
  if (ppIdx >= ppQueue.length) { showResults(ppScore, ppQueue.length, 'pp', 'Phonetic Pairs'); return; }
  const q = ppQueue[ppIdx];
  const cat = PHONETIC_PAIR_CATEGORIES[q.item.category];
  ppAnswered = false;
  document.getElementById('pp-progress').textContent = `${ppIdx + 1} / ${ppQueue.length}`;
  document.getElementById('pp-ipa').innerHTML = `${esc(q.item.ipaA)} vs ${esc(q.item.ipaB)}`;
  document.getElementById('pp-tts').innerHTML =
    `<button class="btn btn-sm" data-action="speak" data-text="${esc(q.item.wordA)}" aria-label="Listen to ${esc(q.item.wordA)}">${esc(q.item.wordA)} &#9654;</button> ` +
    `<button class="btn btn-sm" data-action="speak" data-text="${esc(q.item.wordB)}" aria-label="Listen to ${esc(q.item.wordB)}">${esc(q.item.wordB)} &#9654;</button>`;
  document.getElementById('pp-sentence').innerHTML = esc(q.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([q.answer, q.wrong]);
  document.getElementById('pp-options').innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-pp" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('pp-feedback').style.display = 'none';
  document.getElementById('pp-next').style.display = 'none';
}

function answerPP(idx) {
  if (ppAnswered) return;
  const btns = document.querySelectorAll('#pp-options .quiz-option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[idx]?.classList.add('selected');
  submitPP();
}

function submitPP() {
  if (ppAnswered) return;
  const selectedBtn = document.querySelector('#pp-options .quiz-option.selected');
  if (!selectedBtn) return;
  ppAnswered = true;
  const q = ppQueue[ppIdx];
  const chosen = selectedBtn.dataset.val;
  const correct = chosen === q.answer;

  const btns = document.querySelectorAll('#pp-options .quiz-option');
  btns.forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.val === q.answer) b.classList.add('correct');
    else if (b.classList.contains('selected')) b.classList.add('incorrect');
  });

  if (correct) { ppScore++; addXP(5); } else { addXP(1); }

  const displayMode = progress?.settings?.display || 'standard';
  const meaningKey = q.side === 'A' ? 'meaningA' : 'meaningB';
  const meaningEsKey = q.side === 'A' ? 'meaningAEs' : 'meaningBEs';
  const wrongMeaningKey = q.side === 'A' ? 'meaningB' : 'meaningA';
  const explanation = `"${q.answer}" = ${displayMode === 'immersion' ? q.item[meaningEsKey] : q.item[meaningKey]}. ` +
    `"${q.wrong}" = ${displayMode === 'immersion' ? q.item[meaningEsKey === 'meaningAEs' ? 'meaningBEs' : 'meaningAEs'] : q.item[wrongMeaningKey]}.`;

  const fb = document.getElementById('pp-feedback');
  fb.innerHTML = `<div class="${correct ? 'text-correct' : 'text-incorrect'}">${correct ? '\u2713' : '\u2717'} ${esc(explanation)}</div>`;
  fb.style.display = 'block';
  document.getElementById('pp-next').style.display = 'flex';
  reviewItem(progress.ppFsrs, progress.ppMastery, q.item.id, correct ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextPP() { ppIdx++; renderPPQuestion(); }

// ── Homophones ──

function renderHomophoneCategories() {
  const container = document.getElementById('hom-categories');
  if (!container || typeof HOMOPHONE_CATEGORIES === 'undefined') return;
  container.innerHTML = Object.entries(HOMOPHONE_CATEGORIES).map(([key, cat]) => `
    <div class="card" data-action="start-hom" data-cat="${key}">
      <div class="card-title">${esc(cat.label)}</div>
      <div class="card-subtitle">${esc(cat.description)}</div>
    </div>
  `).join('');
}

function startHomophones(category) {
  if (typeof HOMOPHONES === 'undefined') return;
  const items = HOMOPHONES.filter(h => h.category === category);
  // Flatten: each homophone set produces one question per example sentence
  const queue = [];
  for (const item of items) {
    for (const ex of item.examples) {
      const options = item.words.map(w => w.word);
      queue.push({ item, sentence: ex.sentence, answer: ex.answer, english: ex.english, options });
    }
  }
  homQueue = shuffle(queue).slice(0, 10);
  if (homQueue.length === 0) return;
  homIdx = 0; homScore = 0; homAnswered = false;
  showScreen('hom-drill');
  renderHomQuestion();
}

function renderHomQuestion() {
  if (homIdx >= homQueue.length) { showResults(homScore, homQueue.length, 'hom', 'Homophones'); return; }
  const q = homQueue[homIdx];
  homAnswered = false;
  document.getElementById('hom-progress').textContent = `${homIdx + 1} / ${homQueue.length}`;
  document.getElementById('hom-pronunciation').textContent = q.item.pronunciation;
  document.getElementById('hom-sentence').innerHTML = esc(q.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([...new Set(q.options.map(o => o.toLowerCase().replace(/^¡|!$/g, '')))].map(o => {
    // Find original casing from the options
    return q.options.find(orig => orig.toLowerCase().replace(/^¡|!$/g, '') === o) || o;
  }));
  document.getElementById('hom-options').innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-hom" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('hom-feedback').style.display = 'none';
  document.getElementById('hom-next').style.display = 'none';
}

function answerHom(idx) {
  if (homAnswered) return;
  const btns = document.querySelectorAll('#hom-options .quiz-option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[idx]?.classList.add('selected');
  submitHom();
}

function submitHom() {
  if (homAnswered) return;
  const selectedBtn = document.querySelector('#hom-options .quiz-option.selected');
  if (!selectedBtn) return;
  homAnswered = true;
  const q = homQueue[homIdx];
  const chosen = selectedBtn.dataset.val;
  const correct = chosen.toLowerCase() === q.answer.toLowerCase() ||
    stripAccents(chosen.toLowerCase()) === stripAccents(q.answer.toLowerCase());

  const btns = document.querySelectorAll('#hom-options .quiz-option');
  btns.forEach(b => {
    b.classList.add('disabled');
    const btnVal = b.dataset.val;
    if (btnVal.toLowerCase() === q.answer.toLowerCase() || stripAccents(btnVal.toLowerCase()) === stripAccents(q.answer.toLowerCase())) {
      b.classList.add('correct');
    } else if (b.classList.contains('selected')) {
      b.classList.add('incorrect');
    }
  });

  if (correct) { homScore++; addXP(5); } else { addXP(1); }

  const displayMode = progress?.settings?.display || 'standard';
  const tip = (displayMode === 'immersion' && q.item.tipEs) ? q.item.tipEs : q.item.tip;

  const fb = document.getElementById('hom-feedback');
  let html = `<div class="${correct ? 'text-correct' : 'text-incorrect'}">${correct ? '\u2713' : '\u2717'} ${esc(tip)}</div>`;
  if (q.item.regionalNote) {
    const note = (displayMode === 'immersion' && q.item.regionalNoteEs) ? q.item.regionalNoteEs : q.item.regionalNote;
    html += `<div class="text-muted text-sm mt-half">${esc(note)}</div>`;
  }
  fb.innerHTML = html;
  fb.style.display = 'block';
  document.getElementById('hom-next').style.display = 'flex';
  reviewItem(progress.homFsrs, progress.homMastery, q.item.id, correct ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextHom() { homIdx++; renderHomQuestion(); }

// ── Connectors ──

function renderConnectorCategories() {
  const container = document.getElementById('conn-categories');
  if (!container || typeof CONNECTOR_CATEGORIES === 'undefined') return;
  container.innerHTML = Object.entries(CONNECTOR_CATEGORIES).map(([key, cat]) => `
    <div class="card" data-action="start-conn" data-cat="${key}">
      <div class="card-title">${esc(cat.label)}</div>
      <div class="card-subtitle">${esc(cat.description)}</div>
    </div>
  `).join('');
}

function startConnectors(category) {
  if (typeof CONNECTORS === 'undefined') return;
  const items = shuffle(CONNECTORS.filter(c => c.category === category)).slice(0, 10);
  if (items.length === 0) return;
  connQueue = items; connIdx = 0; connScore = 0; connAnswered = false;
  showScreen('conn-drill');
  renderConnQuestion();
}

function renderConnQuestion() {
  if (connIdx >= connQueue.length) { showResults(connScore, connQueue.length, 'conn', 'Connectors'); return; }
  const item = connQueue[connIdx];
  connAnswered = false;
  document.getElementById('conn-progress').textContent = `${connIdx + 1} / ${connQueue.length}`;
  document.getElementById('conn-sentence').innerHTML = esc(item.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([...item.options]);
  document.getElementById('conn-options').innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-conn" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('conn-feedback').style.display = 'none';
  document.getElementById('conn-next').style.display = 'none';
}

function answerConn(idx) {
  if (connAnswered) return;
  const btns = document.querySelectorAll('#conn-options .quiz-option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[idx]?.classList.add('selected');
  submitConn();
}

function submitConn() {
  if (connAnswered) return;
  const selectedBtn = document.querySelector('#conn-options .quiz-option.selected');
  if (!selectedBtn) return;
  connAnswered = true;
  const item = connQueue[connIdx];
  const chosen = selectedBtn.dataset.val;
  const correct = chosen === item.answer;

  const btns = document.querySelectorAll('#conn-options .quiz-option');
  btns.forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.val === item.answer) b.classList.add('correct');
    else if (b.classList.contains('selected')) b.classList.add('incorrect');
  });

  if (correct) { connScore++; addXP(5); } else { addXP(1); }

  const displayMode = progress?.settings?.display || 'standard';
  const explanation = (displayMode === 'immersion' && item.explanationEs) ? item.explanationEs : item.explanation;

  const fb = document.getElementById('conn-feedback');
  fb.innerHTML = `<div class="${correct ? 'text-correct' : 'text-incorrect'}">${correct ? '\u2713' : '\u2717'} ${esc(explanation)}</div>`;
  fb.style.display = 'block';
  document.getElementById('conn-next').style.display = 'flex';
  reviewItem(progress.connFsrs, progress.connMastery, item.id, correct ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextConn() { connIdx++; renderConnQuestion(); }

// ── Sentence Construction ──

function startSentenceBuild() {
  if (typeof SENTENCE_CONSTRUCTION === 'undefined') {
    showToast('⏳', 'Still loading — please try again in a moment.');
    return;
  }
  let items = shuffle([...SENTENCE_CONSTRUCTION]).slice(0, 10);
  if (items.length === 0) return;
  sbQueue = items; sbIdx = 0; sbScore = 0;
  showScreen('sentence-build');
  renderSBQuestion();
}

function renderSBQuestion() {
  if (sbIdx >= sbQueue.length) { showResults(sbScore, sbQueue.length, 'sb', 'Sentence Construction'); return; }
  const item = sbQueue[sbIdx];
  document.getElementById('sb-progress').textContent = `${sbIdx + 1} / ${sbQueue.length}`;
  document.getElementById('sb-prompt').innerHTML = `${t('arrangeWords') || 'Arrange the words:'} <strong>${esc(item.english)}</strong>`;
  const bank = document.getElementById('sb-word-bank');
  const allWords = [...item.words, ...(item.distractors || [])];
  bank.innerHTML = shuffle(allWords).map(w =>
    `<button class="sb-word-tile" data-action="tap-sb-word">${esc(w)}</button>`
  ).join('');
  document.getElementById('sb-answer-row').innerHTML = '';
  document.getElementById('sb-feedback').style.display = 'none';
  document.getElementById('sb-check').style.display = 'flex';
  document.getElementById('sb-next').style.display = 'none';
}

function tapSBWord(target) {
  if (!target.classList.contains('sb-word-tile')) return;
  const answerRow = document.getElementById('sb-answer-row');
  const bank = document.getElementById('sb-word-bank');
  if (target.parentElement === bank) {
    answerRow.appendChild(target);
  } else {
    bank.appendChild(target);
  }
}

function checkSentenceBuild() {
  const item = sbQueue[sbIdx];
  const tiles = Array.from(document.getElementById('sb-answer-row').children);
  const answer = tiles.map(t => t.textContent).join(' ');
  const allAcceptable = [item.sentence, ...(item.acceptable || [])];
  let correct = false;
  for (const acc of allAcceptable) {
    if (checkAnswer(answer, acc).correct) { correct = true; break; }
  }
  // Also check normalized
  if (!correct) {
    const norm = s => stripAccents(s.toLowerCase().replace(/[¿¡.,;:!?]/g, '').trim());
    for (const acc of allAcceptable) {
      if (norm(answer) === norm(acc)) { correct = true; break; }
    }
  }

  const fb = document.getElementById('sb-feedback');
  if (correct) {
    sbScore++; addXP(5);
    fb.innerHTML = `<div class="text-correct">✓ ${esc(item.sentence)}</div>`;
    if (item.hint) fb.innerHTML += `<div class="text-muted text-sm">${esc(item.hint)}</div>`;
  } else {
    addXP(1);
    // Mark distractor tiles
    const distractors = new Set(item.distractors || []);
    tiles.forEach(t => { if (distractors.has(t.textContent)) t.classList.add('distractor-wrong'); });
    fb.innerHTML = `<div class="text-incorrect">✗ ${esc(item.sentence)}</div>`;
    if (item.hint) fb.innerHTML += `<div class="text-muted text-sm">${esc(item.hint)}</div>`;
  }
  fb.style.display = 'block';
  document.getElementById('sb-check').style.display = 'none';
  document.getElementById('sb-next').style.display = 'flex';
  document.querySelectorAll('.sb-word-tile').forEach(t => t.style.pointerEvents = 'none');
  reviewItem(progress.sentenceFsrs, progress.sentenceMastery, item.id, correct ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextSentenceBuild() { sbIdx++; renderSBQuestion(); }

// ── Cloze Passages ──

function renderClozeTopics() {
  if (typeof CLOZE_PASSAGES === 'undefined') return;
  const topics = [...new Set(CLOZE_PASSAGES.map(p => p.topic))];
  const container = document.getElementById('cloze-topic-cards');
  if (!container) return;
  const topicLabels = {
    ser_estar: 'Ser vs Estar', preterite_imperfect: 'Preterite vs Imperfect',
    subjunctive: 'Subjunctive', pronouns: 'Pronouns',
    prepositions: 'Prepositions', mixed: 'Mixed Grammar',
  };
  container.innerHTML = topics.map(t => `
    <div class="card" data-action="start-cloze" data-topic="${t}">
      <div class="card-title">${esc(topicLabels[t] || t)}</div>
    </div>
  `).join('') + `
    <div class="card" data-action="start-cloze" data-topic="all">
      <div class="card-title">All Topics</div>
    </div>
  `;
}

function startCloze(topic) {
  if (typeof CLOZE_PASSAGES === 'undefined') return;
  let items = topic === 'all' ? [...CLOZE_PASSAGES] : CLOZE_PASSAGES.filter(p => p.topic === topic);
  items = shuffle(items).slice(0, 8);
  if (items.length === 0) return;
  clozeQueue = items; clozeIdx = 0; clozeScore = 0;
  showScreen('cloze');
  renderClozePassage();
}

function renderClozePassage() {
  if (clozeIdx >= clozeQueue.length) { showResults(clozeScore, clozeQueue.length, 'cloze', 'Cloze Passages'); return; }
  const item = clozeQueue[clozeIdx];
  document.getElementById('cloze-progress').textContent = `${clozeIdx + 1} / ${clozeQueue.length}`;
  const displayMode = progress?.settings?.display || 'standard';
  document.getElementById('cloze-title').textContent = displayMode === 'immersion' ? item.title : (item.titleEn || item.title);
  // Replace {N} tokens with input fields
  let html = esc(item.passage).replace(/\{(\d+)\}/g, (_, n) =>
    `<input class="cloze-blank" data-blank="${n}" size="10" autocomplete="off" autocapitalize="off">`
  );
  document.getElementById('cloze-container').innerHTML = html;
  document.getElementById('cloze-feedback').style.display = 'none';
  document.getElementById('cloze-feedback').innerHTML = '';
  document.getElementById('cloze-check').style.display = 'flex';
  document.getElementById('cloze-next').style.display = 'none';
  // Focus first blank
  setTimeout(() => document.querySelector('.cloze-blank')?.focus(), 50);
}

function checkCloze() {
  const item = clozeQueue[clozeIdx];
  const blanks = document.querySelectorAll('.cloze-blank');
  let allCorrect = true;
  const explanations = [];

  blanks.forEach(input => {
    const n = parseInt(input.dataset.blank);
    const blankDef = item.blanks.find(b => b.id === n);
    if (!blankDef) return;
    const userVal = input.value.trim();
    let correct = checkAnswer(userVal, blankDef.answer).correct;
    if (!correct && blankDef.acceptable) {
      for (const alt of blankDef.acceptable) {
        if (checkAnswer(userVal, alt).correct) { correct = true; break; }
      }
    }
    input.classList.add(correct ? 'correct' : 'incorrect');
    input.readOnly = true;
    if (!correct) {
      allCorrect = false;
      input.value = blankDef.answer;
    }
    explanations.push(`<div class="cloze-explanation">{${n}} <strong>${esc(blankDef.answer)}</strong> — ${esc(blankDef.explanation)}</div>`);
  });

  if (allCorrect) { clozeScore++; addXP(5); }
  else { addXP(1); }

  const fb = document.getElementById('cloze-feedback');
  fb.innerHTML = `<div class="${allCorrect ? 'text-correct' : 'text-incorrect'}">${allCorrect ? '✓ All correct!' : '✗ Some blanks were incorrect.'}</div>` + explanations.join('');
  fb.style.display = 'block';
  document.getElementById('cloze-check').style.display = 'none';
  document.getElementById('cloze-next').style.display = 'flex';
  reviewItem(progress.clozeFsrs, progress.clozeMastery, item.id, allCorrect ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextCloze() { clozeIdx++; renderClozePassage(); }

// ── Translation Drills ──

function startTranslation() {
  if (typeof TRANSLATION_DRILLS === 'undefined') return;
  let items = shuffle([...TRANSLATION_DRILLS]).slice(0, 10);
  if (items.length === 0) return;
  // Assign random direction: ~50% EN→ES, ~50% ES→EN
  trQueue = items.map(item => ({ ...item, direction: Math.random() < 0.5 ? 'es-en' : 'en-es' }));
  trIdx = 0; trScore = 0;
  showScreen('translation');
  renderTranslationQuestion();
}

function renderTranslationQuestion() {
  if (trIdx >= trQueue.length) { showResults(trScore, trQueue.length, 'tr', 'Translation Drills'); return; }
  const item = trQueue[trIdx];
  document.getElementById('tr-progress').textContent = `${trIdx + 1} / ${trQueue.length}`;
  if (item.direction === 'es-en') {
    document.getElementById('tr-prompt').innerHTML = `Translate to English: <strong>${esc(item.primary)}</strong>`;
    speak(item.primary);
  } else {
    document.getElementById('tr-prompt').innerHTML = `Translate to Spanish: <strong>${esc(item.english)}</strong>`;
  }
  document.getElementById('tr-input').value = '';
  document.getElementById('tr-feedback').style.display = 'none';
  document.getElementById('tr-next').style.display = 'none';
  setTimeout(() => document.getElementById('tr-input')?.focus(), 50);
}

function checkTranslation() {
  const item = trQueue[trIdx];
  const input = document.getElementById('tr-input').value.trim();
  if (!input) return;

  const isReverse = item.direction === 'es-en';
  const allCorrect = isReverse
    ? [item.english, ...(item.acceptableEn || [])]
    : [item.primary, ...(item.acceptable || [])];
  const modelAnswer = isReverse ? item.english : item.primary;

  // Tier 1: exact match with accent tolerance
  let correct = false, accentWarn = false;
  for (const ans of allCorrect) {
    const result = checkAnswer(input, ans);
    if (result.correct) { correct = true; accentWarn = result.accentWarn; break; }
  }

  // Tier 2: normalized comparison (strip punctuation)
  if (!correct) {
    const norm = s => stripAccents(s.toLowerCase().replace(/[¿¡.,;:!?"""'']/g, '').trim());
    for (const ans of allCorrect) {
      if (norm(input) === norm(ans)) { correct = true; accentWarn = true; break; }
    }
  }

  // Tier 3: key word analysis for partial credit feedback (EN→ES only)
  let keyHits = [], keyMisses = [];
  if (!correct && !isReverse && item.keyWords) {
    const inputLower = stripAccents(input.toLowerCase());
    keyHits = item.keyWords.filter(kw => inputLower.includes(stripAccents(kw.toLowerCase())));
    keyMisses = item.keyWords.filter(kw => !inputLower.includes(stripAccents(kw.toLowerCase())));
  }

  if (correct) { trScore++; addXP(accentWarn ? 3 : 5); }
  else { addXP(1); }

  const fb = document.getElementById('tr-feedback');
  let html = '';
  if (correct) {
    html = `<div class="text-correct">✓ Correct!</div>`;
    if (accentWarn) html += `<div class="text-muted text-sm">Watch your accents: ${esc(modelAnswer)}</div>`;
  } else {
    html = `<div class="text-incorrect">✗ Model answer: <strong>${esc(modelAnswer)}</strong></div>`;
    const altAnswers = isReverse ? (item.acceptableEn || []) : (item.acceptable || []);
    if (altAnswers.length) {
      html += `<div class="text-muted text-sm">Also accepted: ${altAnswers.map(a => esc(a)).join(', ')}</div>`;
    }
    if (keyHits.length > 0) {
      html += `<div class="text-muted text-sm">You got: ${keyHits.map(k => '<strong>' + esc(k) + '</strong>').join(', ')}</div>`;
    }
  }
  if (item.explanation) html += `<div class="text-muted text-sm mt-1">${esc(item.explanation)}</div>`;
  fb.innerHTML = html;
  fb.style.display = 'block';
  document.getElementById('tr-next').style.display = 'flex';
  document.getElementById('tr-input').readOnly = true;
  reviewItem(progress.translationFsrs, progress.translationMastery, item.id,
    correct ? (accentWarn ? FSRS_HARD : FSRS_GOOD) : FSRS_AGAIN);
  saveProgress();
}

function nextTranslation() { trIdx++; renderTranslationQuestion(); }

// ── Dictation ──

function startDictation() {
  let items = [];
  if (typeof DICTATION_DATA !== 'undefined') items = [...DICTATION_DATA];
  // Supplement with phrases
  if (typeof PHRASE_DATA !== 'undefined') {
    const extras = PHRASE_DATA.flatMap(sit =>
      (sit.phrases || []).filter(p => p.spanish && p.spanish.length > 5 && p.spanish.length < 80)
        .map(p => ({ id: 'dict-p-' + p.id, level: 'A2', topic: sit.situation, sentence: p.spanish, english: p.english, notes: '' }))
    );
    items = items.concat(shuffle(extras).slice(0, 10));
  }
  items = shuffle(items).slice(0, 10);
  if (items.length === 0) return;
  dictQueue = items; dictIdx = 0; dictScore = 0;
  showScreen('dictation');
  renderDictationQuestion();
}

function renderDictationQuestion() {
  if (dictIdx >= dictQueue.length) { showResults(dictScore, dictQueue.length, 'dict', 'Dictation'); return; }
  document.getElementById('dict-progress').textContent = `${dictIdx + 1} / ${dictQueue.length}`;
  document.getElementById('dict-input').value = '';
  document.getElementById('dict-input').readOnly = false;
  document.getElementById('dict-feedback').style.display = 'none';
  document.getElementById('dict-next').style.display = 'none';
  setTimeout(() => {
    dictPlayNormal();
    document.getElementById('dict-input')?.focus();
  }, 200);
}

function dictPlayNormal() {
  const item = dictQueue[dictIdx];
  if (item) speak(item.sentence);
}

function dictPlaySlow() {
  const item = dictQueue[dictIdx];
  if (!item) return;
  const rate = (progress?.settings?.ttsRate || 1) * 0.55;
  const orig = progress?.settings?.ttsRate;
  if (progress?.settings) progress.settings.ttsRate = rate;
  speak(item.sentence);
  if (progress?.settings) progress.settings.ttsRate = orig;
}

function checkDictation() {
  const item = dictQueue[dictIdx];
  const input = document.getElementById('dict-input').value.trim();
  if (!input) return;

  const norm = s => s.toLowerCase().replace(/[¿¡.,;:!?"""''—–\-()]/g, '').trim();
  const inputWords = norm(input).split(/\s+/).filter(Boolean);
  const correctWords = norm(item.sentence).split(/\s+/).filter(Boolean);

  let matches = 0;
  const results = [];
  for (let i = 0; i < correctWords.length; i++) {
    const cw = correctWords[i];
    const iw = inputWords[i] || '';
    const chk = checkAnswer(iw, cw);
    if (chk.correct) {
      matches++;
      results.push({ word: cw, status: chk.accentWarn ? 'accent' : 'correct' });
    } else if (iw && levenshtein(stripAccents(iw), stripAccents(cw)) <= 1) {
      matches += 0.5;
      results.push({ word: cw, status: 'typo', typed: iw });
    } else {
      results.push({ word: cw, status: iw ? 'wrong' : 'missing', typed: iw });
    }
  }
  const extra = Math.max(0, inputWords.length - correctWords.length);
  const score = Math.max(0, matches - extra * 0.5) / correctWords.length;

  if (score >= 0.9) { dictScore++; addXP(5); }
  else if (score >= 0.7) { addXP(3); }
  else { addXP(1); }

  // Build word-by-word feedback
  const wordHtml = results.map(r => {
    if (r.status === 'correct') return `<span class="dict-word correct">${esc(r.word)}</span>`;
    if (r.status === 'accent') return `<span class="dict-word accent">${esc(r.word)}</span>`;
    if (r.status === 'typo') return `<span class="dict-word typo" title="You typed: ${esc(r.typed)}">${esc(r.word)}</span>`;
    if (r.status === 'missing') return `<span class="dict-word missing">${esc(r.word)}</span>`;
    return `<span class="dict-word wrong" title="You typed: ${esc(r.typed)}">${esc(r.word)}</span>`;
  }).join(' ');

  const fb = document.getElementById('dict-feedback');
  const pct = Math.round(score * 100);
  fb.innerHTML = `<div class="${score >= 0.9 ? 'text-correct' : score >= 0.7 ? '' : 'text-incorrect'}">${pct}% correct</div>` +
    `<div class="mt-1">${wordHtml}</div>` +
    `<div class="text-muted text-sm mt-1">${esc(item.english)}</div>` +
    (item.notes ? `<div class="text-muted text-sm">${esc(item.notes)}</div>` : '');
  fb.style.display = 'block';
  document.getElementById('dict-input').readOnly = true;
  document.getElementById('dict-next').style.display = 'flex';
  const rating = score >= 0.9 ? FSRS_GOOD : score >= 0.7 ? FSRS_HARD : FSRS_AGAIN;
  reviewItem(progress.dictFsrs, progress.dictMastery, item.id, rating);
  saveProgress();
}

function nextDictation() { dictIdx++; renderDictationQuestion(); }

// ════════════════════════════════════════
//  PROGRESS DASHBOARD
// ════════════════════════════════════════

function renderStats() {
  if (!progress) return;
  const verbsLearned = Object.keys(progress.verbMastery).length;
  const vocabLearned = Object.keys(progress.vocabMastery).length;
  const grammarDone = Object.values(progress.grammarDone).filter(Boolean).length;
  const phrasesLearned = Object.keys(progress.phraseMastery).length;
  const level = progress.placementLevel || 'A1';
  const totalItems = verbsLearned + vocabLearned + phrasesLearned;

  document.getElementById('stats-overview').innerHTML = `
    <div class="stat-card"><div class="stat-num">${progress.xp}</div><div class="stat-desc">${t('totalXP')}</div></div>
    <div class="stat-card"><div class="stat-num">${progress.streak}d</div><div class="stat-desc">${t('dayStreak')}</div></div>
    <div class="stat-card"><div class="stat-num">${progress.longestStreak}d</div><div class="stat-desc">${t('longestStreak')}</div></div>
    <div class="stat-card"><div class="stat-num">${totalItems}</div><div class="stat-desc">${t('totalItems')}</div></div>
    <div class="stat-card"><div class="stat-num">${level}</div><div class="stat-desc">CEFR</div></div>
  `;

  // Mastery breakdown bars
  const modules = [
    { name: t('verbs'), store: progress.verbMastery },
    { name: t('vocab'), store: progress.vocabMastery },
    { name: t('phrases'), store: progress.phraseMastery },
  ];
  let masteryHtml = '';
  for (const mod of modules) {
    const counts = [0, 0, 0, 0, 0];
    for (const v of Object.values(mod.store)) counts[v] = (counts[v] || 0) + 1;
    const total = Object.keys(mod.store).length || 1;
    masteryHtml += `<div class="stat-row">
      <span class="stat-label" style="min-width:4rem">${mod.name}</span>
      <div class="mastery-bar" style="flex:1;margin-left:0.5rem" title="L1:${counts[1]} L2:${counts[2]} L3:${counts[3]} L4:${counts[4]}">
        <div style="width:${counts[1]/total*100}%;background:var(--red)"></div>
        <div style="width:${counts[2]/total*100}%;background:var(--yellow)"></div>
        <div style="width:${counts[3]/total*100}%;background:var(--green)"></div>
        <div style="width:${counts[4]/total*100}%;background:var(--blue)"></div>
      </div>
      <span class="text-muted text-sm" style="min-width:2rem;text-align:right">${Object.keys(mod.store).length}</span>
    </div>`;
  }
  document.getElementById('stats-mastery').innerHTML = masteryHtml;

  // Category progress
  let catHtml = '';
  if (typeof VOCAB_CATEGORIES !== 'undefined' && typeof VOCAB_DATA !== 'undefined') {
    buildVocabIndexes();
    const cats = Object.entries(VOCAB_CATEGORIES).slice(0, 12);
    for (const [key, cat] of cats) {
      const catWords = VOCAB_BY_CATEGORY[key] || [];
      const total = catWords.length;
      const learned = catWords.filter(v => progress.vocabMastery[v.word]).length;
      const pct = total ? Math.round(learned / total * 100) : 0;
      catHtml += `<div class="stat-row">
        <span class="stat-label">${cat.titleEn || cat.title}</span>
        <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:8px;border-radius:4px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:var(--accent)"></div>
        </div>
        <span class="text-muted text-sm">${learned}/${total}</span>
      </div>`;
    }
  }
  const catEl = document.getElementById('stats-categories');
  if (catEl) catEl.innerHTML = catHtml || emptyState('📚', 'No vocabulary learned yet. Start a lesson to begin!');

  // Accuracy stats from practiceLog
  const log = progress.practiceLog || {};
  const days = Object.keys(log);
  const totalXpLogged = days.reduce((s, d) => s + (log[d] || 0), 0);
  const activeDays = days.length;
  const accEl = document.getElementById('stats-accuracy');
  if (accEl) {
    accEl.innerHTML = `
      <div class="stat-row"><span class="stat-label">Active days</span><span class="stat-value">${activeDays}</span></div>
      <div class="stat-row"><span class="stat-label">Total XP earned</span><span class="stat-value">${totalXpLogged}</span></div>
      <div class="stat-row"><span class="stat-label">Avg XP/day</span><span class="stat-value">${activeDays ? Math.round(totalXpLogged / activeDays) : 0}</span></div>
      <div class="stat-row"><span class="stat-label">Grammar lessons</span><span class="stat-value">${grammarDone}/${typeof GRAMMAR_DATA !== 'undefined' ? GRAMMAR_DATA.length : '?'}</span></div>
    `;
  }

  // Practice calendar heatmap (84 days)
  const cal = document.getElementById('stats-calendar');
  if (cal) {
    const today = new Date();
    let calHtml = '';
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const ds = dateStr(d);
      const xp = log[ds] || 0;
      const intensity = xp === 0 ? '' : xp < 20 ? 'low' : xp < 50 ? 'med' : 'high';
      calHtml += `<div class="streak-day ${intensity} ${i === 0 ? 'today' : ''}" title="${ds}: ${xp} XP"></div>`;
    }
    cal.innerHTML = calHtml;
  }

  // Render achievements, weak areas, and recall health
  renderAchievements();
  renderWeakAreas();
  renderRecallHealth();
  renderCefrMasteryDetailed(document.getElementById('stats-cefr-mastery'));
  renderStatsTenseMastery();
  renderStatsGrammarProgress();
}

function renderStatsTenseMastery() {
  const el = document.getElementById('stats-tense-mastery');
  if (!el) return;
  const data = computeTenseMastery();
  if (!data.length) { el.innerHTML = '<p class="text-muted text-sm">No verb forms practiced yet.</p>'; return; }

  let html = '';
  for (const t of data) {
    const rc = t.avgRecall !== null
      ? (t.avgRecall >= 90 ? 'var(--green)' : t.avgRecall >= 70 ? 'var(--yellow)' : 'var(--red)')
      : 'var(--text3)';
    const recallText = t.avgRecall !== null ? `${t.avgRecall}%` : '—';
    const total = t.levels.reduce((a, b) => a + b, 0) || 1;
    html += `<div style="margin-bottom:0.5rem">
      <div class="stat-row" style="margin-bottom:0.15rem">
        <span class="stat-label" style="font-size:0.8rem">${t.label}</span>
        <span style="font-size:0.65rem;color:var(--text3)">${t.level}</span>
        <span style="font-size:0.75rem;color:${rc};min-width:2.5rem;text-align:right">${recallText}</span>
      </div>
      <div class="mastery-bar" title="L1:${t.levels[1]} L2:${t.levels[2]} L3:${t.levels[3]} L4:${t.levels[4]}">
        <div style="width:${t.levels[1]/total*100}%;background:var(--red)"></div>
        <div style="width:${t.levels[2]/total*100}%;background:var(--yellow)"></div>
        <div style="width:${t.levels[3]/total*100}%;background:var(--green)"></div>
        <div style="width:${t.levels[4]/total*100}%;background:var(--blue)"></div>
      </div>
    </div>`;
  }
  el.innerHTML = html;
}

function renderStatsGrammarProgress() {
  const el = document.getElementById('stats-grammar-progress');
  if (!el) return;
  const data = computeGrammarProgress();
  if (!data.length) { el.innerHTML = '<p class="text-muted text-sm">No grammar lessons completed yet.</p>'; return; }

  let html = '';
  for (const lv of data) {
    const pct = Math.round(lv.done / lv.total * 100);
    const rc = lv.avgRecall !== null
      ? (lv.avgRecall >= 90 ? 'var(--green)' : lv.avgRecall >= 70 ? 'var(--yellow)' : 'var(--red)')
      : '';
    const recallText = lv.avgRecall !== null ? ` &middot; ${lv.avgRecall}% recall` : '';
    html += `<div class="stat-row" style="margin-bottom:0.4rem">
      <span class="stat-label" style="min-width:2rem;font-weight:600">${lv.level}</span>
      <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:8px;border-radius:4px;overflow:hidden">
        <div style="width:${pct}%;height:100%;background:var(--accent)"></div>
      </div>
      <span class="text-muted text-sm">${lv.done}/${lv.total}${recallText}</span>
    </div>`;
  }
  el.innerHTML = html;
}

function renderRecallHealth() {
  const el = document.getElementById('stats-recall');
  if (!el || !progress) return;
  const stores = [
    { name: 'Verbs', fsrs: progress.verbFsrs },
    { name: 'Vocab', fsrs: progress.vocabFsrs },
    { name: 'Grammar', fsrs: progress.grammarFsrs },
    { name: 'Phrases', fsrs: progress.phraseFsrs },
  ];
  let totalR = 0, count = 0, due = 0, strong = 0, fading = 0, weak = 0;
  const now = Date.now();
  const perStore = [];

  for (const { name, fsrs } of stores) {
    let sR = 0, sN = 0, sDue = 0;
    for (const rec of Object.values(fsrs || {})) {
      if (!rec || !rec.s) continue;
      const elapsed = (now - rec.lastRev) / 86400000;
      const r = fsrsR(rec.s, elapsed);
      totalR += r; count++;
      sR += r; sN++;
      if (r < 0.7) { weak++; sDue++; }
      else if (r < 0.9) { fading++; sDue++; }
      else strong++;
      if (r < 0.9) due++;
    }
    if (sN > 0) perStore.push({ name, avg: Math.round(sR / sN * 100), count: sN, due: sDue });
  }

  if (count === 0) {
    el.innerHTML = '<p class="text-muted text-sm">No items studied yet.</p>';
    return;
  }

  const avgPct = Math.round(totalR / count * 100);
  const total = count || 1;
  const avgColor = avgPct >= 90 ? 'var(--green)' : avgPct >= 70 ? 'var(--yellow)' : 'var(--red)';

  let html = `<div class="stat-row" style="margin-bottom:0.5rem">
    <span class="stat-label">Average Recall</span>
    <span style="font-weight:700;color:${avgColor}">${avgPct}%</span>
  </div>
  <div class="stat-row" style="margin-bottom:0.5rem">
    <span class="stat-label">Due for review</span>
    <span class="stat-value">${due} of ${count}</span>
  </div>
  <div class="mastery-bar" style="margin-bottom:0.75rem" title="Strong:${strong} Fading:${fading} Weak:${weak}">
    <div style="width:${strong/total*100}%;background:var(--green)"></div>
    <div style="width:${fading/total*100}%;background:var(--yellow)"></div>
    <div style="width:${weak/total*100}%;background:var(--red)"></div>
  </div>
  <div style="display:flex;gap:1rem;font-size:0.75rem;color:var(--text3);margin-bottom:0.5rem">
    <span style="color:var(--green)">&#9632; Strong ${strong}</span>
    <span style="color:var(--yellow)">&#9632; Fading ${fading}</span>
    <span style="color:var(--red)">&#9632; Weak ${weak}</span>
  </div>`;

  for (const s of perStore) {
    const c = s.avg >= 90 ? 'var(--green)' : s.avg >= 70 ? 'var(--yellow)' : 'var(--red)';
    html += `<div class="stat-row">
      <span class="stat-label">${s.name}</span>
      <span class="text-muted text-sm">${s.count} items</span>
      <span style="font-weight:600;color:${c};min-width:3rem;text-align:right">${s.avg}%</span>
    </div>`;
  }

  el.innerHTML = html;
}

// ════════════════════════════════════════
//  UNIFIED REVIEW QUEUE
// ════════════════════════════════════════

let reviewQueue = [], reviewIdx = 0, reviewScore = 0, reviewSelected = -1;

function buildReviewQueue() {
  const queue = [];
  const stores = [
    { type: 'verb', fsrs: 'verbFsrs', mastery: 'verbMastery', max: MAX_REVIEW_VERBS },
    { type: 'vocab', fsrs: 'vocabFsrs', mastery: 'vocabMastery', max: MAX_REVIEW_VOCAB },
    { type: 'grammar', fsrs: 'grammarFsrs', mastery: 'grammarDone', max: MAX_REVIEW_GRAMMAR },
    { type: 'phrase', fsrs: 'phraseFsrs', mastery: 'phraseMastery', max: MAX_REVIEW_PHRASES },
    { type: 'mp', fsrs: 'mpFsrs', mastery: 'mpMastery', max: 3 },
    { type: 'pp', fsrs: 'ppFsrs', mastery: 'ppMastery', max: 3 },
    { type: 'hom', fsrs: 'homFsrs', mastery: 'homMastery', max: 3 },
    { type: 'conn', fsrs: 'connFsrs', mastery: 'connMastery', max: 3 },
    { type: 'cloze', fsrs: 'clozeFsrs', mastery: 'clozeMastery', max: 3 },
    { type: 'translation', fsrs: 'translationFsrs', mastery: 'translationMastery', max: 3 },
    { type: 'dictation', fsrs: 'dictFsrs', mastery: 'dictMastery', max: 3 },
    { type: 'sentence', fsrs: 'sentenceFsrs', mastery: 'sentenceMastery', max: 3 },
    { type: 'reading', fsrs: 'readingFsrs', mastery: 'readingMastery', max: 3 },
  ];
  for (const st of stores) {
    if (!progress[st.fsrs]) continue;
    const due = getDueItems(progress[st.fsrs], Object.keys(progress[st.fsrs]));
    due.slice(0, st.max).forEach(key => {
      queue.push({ type: st.type, key, fsrs: st.fsrs, mastery: st.mastery });
    });
  }
  return shuffle(queue);
}

function startReview() {
  reviewQueue = buildReviewQueue();
  reviewIdx = 0; reviewScore = 0; reviewSelected = -1;
  if (reviewQueue.length === 0) {
    showModal(t('allCaughtUp'), emptyState('✅', 'All caught up! No reviews due right now.'), [
      { label: tBtn('ok'), action: 'close-modal', cls: 'btn-primary' }
    ]);
    return;
  }
  showScreen('review');
  renderReviewItem();
}

function renderReviewItem() {
  if (reviewIdx >= reviewQueue.length) {
    showResults(reviewScore, reviewQueue.length, 'review', t('reviewQueue'));
    return;
  }
  const item = reviewQueue[reviewIdx];
  const total = reviewQueue.length;
  document.getElementById('rev-progress').innerHTML = `<div class="quiz-progress-fill" style="width:${reviewIdx/total*100}%"></div>`;
  const c = document.getElementById('rev-container');
  document.getElementById('rev-next').style.display = 'none';
  document.getElementById('rev-accents').style.display = 'none';
  reviewSelected = -1;

  if (item.type === 'verb') {
    // Conjugation drill style
    const keys = Object.keys(progress.verbFsrs);
    const key = item.key;
    // key format: "hablar:present:0" or just the verb infinitive
    const parts = key.split(':');
    let verb, tense, person;
    if (parts.length >= 3) {
      person = parseInt(parts.pop());
      tense = parts.pop();
      verb = parts.join(':');
    } else {
      verb = key; tense = 'present'; person = 0;
    }
    const correct = typeof conjugate === 'function' ? conjugate(verb, tense, person) : key;
    const personLabel = PERSON_LABELS[PERSONS[person]] || PERSONS[person] || 'yo';
    const meta = TENSE_META[tense] || {};
    c.innerHTML = `
      <div class="card">
        <div class="text-muted text-sm">${t('reviewQueue')} (${reviewIdx+1}/${total})</div>
        <h3 class="mt-1">${t('conjugatePrompt')} "${esc(verb)}"</h3>
        <p>${personLabel} — ${meta.labelEn || tense}</p>
        <input type="text" class="quiz-input mt-1" id="rev-drill-input" placeholder="${t('typeConjugation')}" autocomplete="off" autocapitalize="none">
        <button class="btn btn-primary btn-block mt-1" data-action="check-review-drill">Check</button>
        <div class="quiz-feedback mt-1" id="rev-drill-fb" style="display:none"></div>
      </div>
    `;
    document.getElementById('rev-accents').style.display = 'flex';
    document.getElementById('rev-drill-input').focus();
  } else if (item.type === 'vocab') {
    buildVocabIndexes();
    const word = VOCAB_BY_WORD[item.key?.toLowerCase()] || null;
    if (!word) { reviewIdx++; renderReviewItem(); return; }
    c.innerHTML = `
      <div class="card">
        <div class="text-muted text-sm">${t('reviewQueue')} (${reviewIdx+1}/${total})</div>
        <h3 class="mt-1">${t('whatDoesMean')} "${esc(word.word)}" ${t('mean')}</h3>
        ${word.example ? `<p class="text-muted text-sm mt-1">${esc(word.example)}</p>` : ''}
      </div>
      <div class="flashcard mt-1" id="rev-flashcard" data-action="flip-review-card">
        <div class="flashcard-inner">
          <div class="front" id="rev-card-front">
            <div class="word-main">${esc(word.word)}</div>
            <div class="text-muted text-sm">${t('tapToReveal')}</div>
          </div>
          <div class="back" id="rev-card-back">
            <div class="word-main">${esc(word.english)}</div>
          </div>
        </div>
      </div>
      <div class="rating-buttons mt-1" id="rev-rating" style="display:none">
        <button class="rating-btn" data-action="rate-review" data-rating="1">${tBtn('again')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="2">${tBtn('hard')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="3">${tBtn('good')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="4">${tBtn('easy')}</button>
      </div>
    `;
  } else if (item.type === 'phrase') {
    const phrase = typeof PHRASES_DATA !== 'undefined' ? PHRASES_DATA.find(p => p.id === item.key) : null;
    if (!phrase) { reviewIdx++; renderReviewItem(); return; }
    c.innerHTML = `
      <div class="card">
        <div class="text-muted text-sm">${t('reviewQueue')} (${reviewIdx+1}/${total})</div>
      </div>
      <div class="flashcard mt-1" id="rev-flashcard" data-action="flip-review-card">
        <div class="flashcard-inner">
          <div class="front" id="rev-card-front">
            <div class="word-main" style="font-size:1.1rem">${esc(phrase.spanish)}</div>
            <div class="text-muted text-sm">${t('tapToReveal')}</div>
          </div>
          <div class="back" id="rev-card-back">
            <div class="word-main" style="font-size:1.1rem">${esc(phrase.english)}</div>
          </div>
        </div>
      </div>
      <div class="rating-buttons mt-1" id="rev-rating" style="display:none">
        <button class="rating-btn" data-action="rate-review" data-rating="1">${tBtn('again')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="2">${tBtn('hard')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="3">${tBtn('good')}</button>
        <button class="rating-btn" data-action="rate-review" data-rating="4">${tBtn('easy')}</button>
      </div>
    `;
  } else if (item.type === 'grammar') {
    // Find a quiz question for this grammar lesson
    const lesson = typeof GRAMMAR_DATA !== 'undefined' ? GRAMMAR_DATA.find(g => g.id === item.key) : null;
    if (!lesson || !lesson.quiz || !lesson.quiz.length) { reviewIdx++; renderReviewItem(); return; }
    const q = pick(lesson.quiz.filter(q => q.type === 'mc'));
    if (!q) { reviewIdx++; renderReviewItem(); return; }
    c.innerHTML = `
      <div class="card">
        <div class="text-muted text-sm">${t('reviewQueue')} (${reviewIdx+1}/${total}) — ${esc(lesson.titleEn || lesson.title)}</div>
        <div class="quiz-question mt-1">${esc(q.question)}</div>
        <div class="quiz-options mt-1" id="rev-mc-options">
          ${q.options.map((opt, i) => `<button class="quiz-option" data-action="answer-review" data-idx="${i}">${esc(opt)}</button>`).join('')}
        </div>
        <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-review-mc" style="display:none">Check</button>
        <div class="quiz-feedback mt-1" id="rev-mc-fb" style="display:none"></div>
      </div>
    `;
    c._revQuiz = q;
  } else {
    // Generic: skip unknown types
    reviewIdx++; renderReviewItem(); return;
  }
}

function flipReviewCard() {
  const card = document.getElementById('rev-flashcard');
  const rating = document.getElementById('rev-rating');
  if (card) {
    card.classList.add('flipped');
    if (rating) rating.style.display = 'flex';
  }
}

function answerReviewMC(idx) {
  selectMCOption('#rev-container', idx);
  reviewSelected = idx;
}

function submitReviewMC() {
  const item = reviewQueue[reviewIdx];
  const q = document.getElementById('rev-container')._revQuiz;
  if (!q || reviewSelected < 0) return;
  const opts = document.querySelectorAll('#rev-mc-options .quiz-option');
  opts.forEach((o, i) => {
    o.classList.add('disabled');
    if (i === q.correct) o.classList.add('correct');
    else if (i === reviewSelected && i !== q.correct) o.classList.add('incorrect');
  });
  const correct = reviewSelected === q.correct;
  trackError(item.key, correct);
  if (correct) reviewScore++;
  const fb = document.getElementById('rev-mc-fb');
  fb.textContent = correct ? t('correct') : `${t('incorrectAnswer')} ${q.answer || q.options[q.correct]}`;
  if (q.explanation) fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(q.explanation)}</span>`;
  fb.style.display = 'block';
  document.querySelector('#rev-container .mc-submit').style.display = 'none';
  reviewItem(progress[item.fsrs], progress[item.mastery], item.key, correct ? FSRS_GOOD : FSRS_AGAIN);
  document.getElementById('rev-next').style.display = 'flex';
}

function checkReviewDrill() {
  const item = reviewQueue[reviewIdx];
  const parts = item.key.split(':');
  let verb, tense, person;
  if (parts.length >= 3) { person = parseInt(parts.pop()); tense = parts.pop(); verb = parts.join(':'); }
  else { verb = item.key; tense = 'present'; person = 0; }
  const correct = typeof conjugate === 'function' ? conjugate(verb, tense, person) : '';
  const input = document.getElementById('rev-drill-input');
  if (!input) return;
  const result = checkAnswer(input.value, correct);
  trackError(item.key, result.correct);
  const fb = document.getElementById('rev-drill-fb');
  if (result.correct) {
    reviewScore++;
    fb.innerHTML = result.accentWarn
      ? `<span class="text-correct">${t('correctAccent')} ${esc(correct)}</span>`
      : `<span class="text-correct">${t('correct')}</span>`;
    reviewItem(progress[item.fsrs], progress[item.mastery], item.key, result.accentWarn ? FSRS_HARD : FSRS_GOOD);
  } else {
    fb.innerHTML = result.accentWarn
      ? `<span class="text-incorrect">${t('incorrectAccent')} ${esc(correct)}</span>`
      : `<span class="text-incorrect">${t('incorrectAnswer')} ${esc(correct)}</span>`;
    reviewItem(progress[item.fsrs], progress[item.mastery], item.key, FSRS_AGAIN);
  }
  fb.style.display = 'block';
  input.readOnly = true;
  document.querySelector('#rev-container [data-action="check-review-drill"]').style.display = 'none';
  document.getElementById('rev-next').style.display = 'flex';
}

function rateReviewItem(rating) {
  const item = reviewQueue[reviewIdx];
  reviewItem(progress[item.fsrs], progress[item.mastery], item.key, rating);
  if (rating >= FSRS_GOOD) reviewScore++;
  document.getElementById('rev-rating').style.display = 'none';
  reviewIdx++;
  renderReviewItem();
}

function nextReviewItem() {
  reviewIdx++;
  renderReviewItem();
}

// ════════════════════════════════════════
//  VERB CONJUGATION REFERENCE
// ════════════════════════════════════════

function renderVerbReference(infinitive) {
  if (!infinitive || typeof VERB_DATA === 'undefined') return;
  const verb = VERB_DATA.find(v => v.infinitive === infinitive);
  if (!verb) {
    document.getElementById('vref-content').innerHTML = `<p class="text-muted">Verb not found.</p>`;
    return;
  }
  document.getElementById('vref-suggestions').innerHTML = '';
  let html = '';

  // Compute overall verb recall
  const verbFsrsKeys = Object.keys(progress.verbFsrs || {}).filter(k => k.startsWith(infinitive + ':'));
  let verbRecallBadge = '';
  if (verbFsrsKeys.length) {
    const now = Date.now();
    const sum = verbFsrsKeys.reduce((s, k) => {
      const rec = progress.verbFsrs[k];
      return s + (rec?.s ? fsrsR(rec.s, (now - rec.lastRev) / 86400000) : 0);
    }, 0);
    const avgR = Math.round(sum / verbFsrsKeys.length * 100);
    const rc = avgR >= 90 ? 'var(--green)' : avgR >= 70 ? 'var(--yellow)' : 'var(--red)';
    verbRecallBadge = `<span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:${rc}20;color:${rc};border-radius:4px">Recall ${avgR}%</span>`;
  }

  // Header
  html += `<div class="card mb-1">
    <h2 style="margin:0">${esc(verb.infinitive)}</h2>
    <p class="text-muted">${esc(verb.english)}</p>
    <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
      <span class="verb-type-badge ${verb.type}" style="font-size:0.7rem;padding:0.15rem 0.5rem">${verb.type}</span>
      <span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--bg3);color:var(--text2);border-radius:4px">-${verb.group}</span>
      <span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--accent-bg);color:var(--accent);border-radius:4px">${verb.level}</span>
      ${verb.stemChange ? `<span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--yellow-bg);color:var(--yellow);border-radius:4px">${verb.stemChange}</span>` : ''}
      ${verbRecallBadge}
    </div>
  </div>`;

  // Non-finite forms
  const base = infinitive.replace(/se$/, '');
  html += `<div class="card mb-1">
    <div class="card-title text-sm" style="color:var(--text2)">Non-Finite Forms</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><td>Infinitive</td><td><strong>${esc(infinitive)}</strong></td></tr>
      <tr><td>Past Participle</td><td><strong>${esc(getParticiple(base))}</strong></td></tr>
      <tr><td>Gerund</td><td><strong>${esc(getGerund(base))}</strong></td></tr>
    </table></div>
  </div>`;

  // Tense groups by mood
  const indicative = ['present','preterite','imperfect','future','conditional',
    'present_perfect','pluperfect','future_perfect','conditional_perfect',
    'progressive_present','progressive_preterite','progressive_imperfect'];
  const subjunctive = getActiveTenses(['subjunctive_present','subjunctive_imperfect',
    'subjunctive_perfect','subjunctive_pluperfect','future_subjunctive']);
  const imperative = ['imperative_aff','imperative_neg'];

  // Determine -se form preference for reference tables
  const seFormPref = progress?.settings?.subjunctiveForm || 'ra';

  html += '<div class="mood-header mood-indicative">Indicative</div>';
  for (const t of indicative) html += renderRefTenseTable(base, t);

  html += '<div class="mood-header mood-subjunctive">Subjunctive</div>';
  for (const t of subjunctive) {
    const isSubjImpf = (t === 'subjunctive_imperfect' || t === 'subjunctive_pluperfect');
    if (isSubjImpf && seFormPref === 'both') {
      html += renderRefTenseTable(base, t, false);
      html += renderRefTenseTable(base, t, true);
    } else {
      html += renderRefTenseTable(base, t, isSubjImpf && seFormPref === 'se');
    }
  }

  html += '<div class="mood-header mood-imperative">Imperative</div>';
  for (const t of imperative) html += renderRefTenseTable(base, t);

  document.getElementById('vref-content').innerHTML = html;
}

function renderRefTenseTable(infinitive, tense, useSeForm = false) {
  const meta = TENSE_META[tense];
  if (!meta) return '';
  let forms;
  try { forms = conjugateAll(infinitive, tense, useSeForm); }
  catch { return ''; }
  const lookupTense = useSeForm ? 'subjunctive_imperfect_se' : tense;
  const isIrregular = !!(FULL_IRREGULARS[infinitive] && FULL_IRREGULARS[infinitive][lookupTense]);
  const label = useSeForm ? (tenseLabel(meta) + ' (-se)') : tenseLabel(meta);

  // Per-tense recall badge
  let tenseRecallBadge = '';
  const tenseKeys = PERSONS.map((_, i) => `${infinitive}:${lookupTense}:${i}`);
  const tenseRecs = tenseKeys.map(k => progress.verbFsrs?.[k]).filter(r => r?.s);
  if (tenseRecs.length) {
    const now = Date.now();
    const avg = Math.round(tenseRecs.reduce((s, r) => s + fsrsR(r.s, (now - r.lastRev) / 86400000), 0) / tenseRecs.length * 100);
    const tc = avg >= 90 ? 'var(--green)' : avg >= 70 ? 'var(--yellow)' : 'var(--red)';
    tenseRecallBadge = `<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:${tc}20;color:${tc};border-radius:3px">${avg}%</span>`;
  }

  return `<div class="card mb-1">
    <div class="flex" style="justify-content:space-between;align-items:center">
      <div class="card-title text-sm">${label}</div>
      <div style="display:flex;gap:0.25rem">
        <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">${meta.level}</span>
        ${isIrregular ? '<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--accent-bg);color:var(--accent);border-radius:3px">irregular</span>' : ''}
        ${tenseRecallBadge}
      </div>
    </div>
    ${meta.compound ? `<div class="text-muted" style="font-size:0.7rem">haber (${meta.auxTense}) + past participle</div>` : ''}
    ${meta.progressive ? `<div class="text-muted" style="font-size:0.7rem">estar (${meta.auxTense}) + gerund</div>` : ''}
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      ${PERSONS.map((p, i) => {
        const form = forms[i];
        if (form === '—') return `<tr><td>${PERSON_LABELS[p]}</td><td style="color:var(--text3)">—</td></tr>`;
        return `<tr><td>${PERSON_LABELS[p]}</td><td${isIrregular ? ' class="irreg"' : ''}>${esc(form)}</td></tr>`;
      }).join('')}
    </table></div>
  </div>`;
}

function showVrefSuggestions(query) {
  if (!query || typeof VERB_DATA === 'undefined') {
    document.getElementById('vref-suggestions').innerHTML = '';
    document.getElementById('vref-content').innerHTML = '';
    return;
  }
  const exact = VERB_DATA.find(v => v.infinitive === query);
  if (exact) { renderVerbReference(query); return; }
  const matches = VERB_DATA.filter(v => v.infinitive.startsWith(query) || v.english.toLowerCase().includes(query)).slice(0, 10);
  document.getElementById('vref-content').innerHTML = '';
  document.getElementById('vref-suggestions').innerHTML = matches.map(v =>
    `<div class="vref-suggestion" data-action="select-vref" data-verb="${esc(v.infinitive)}">
      <strong>${esc(v.infinitive)}</strong> <span class="text-muted text-sm">— ${esc(v.english)}</span>
    </div>`
  ).join('') || '<p class="text-muted text-sm" style="padding:0.5rem">No matching verbs.</p>';
}

// ════════════════════════════════════════
//  CONJUGATION RULES / ENDINGS REFERENCE
// ════════════════════════════════════════

function renderConjugationRules() {
  const container = document.getElementById('vref-tab-rules');
  if (!container) return;

  const seFormPref = progress?.settings?.subjunctiveForm || 'ra';
  if (container.dataset.rendered === seFormPref) return; // already rendered with current setting
  container.dataset.rendered = seFormPref;

  const groups = ['ar', 'er', 'ir'];
  const personLabels = ['yo', 'tú', 'él/ella/Ud.', 'nosotros', 'vosotros', 'ellos/Uds.'];

  function endingsTable(tenseKey, caption) {
    const endings = REGULAR_ENDINGS[tenseKey];
    if (!endings) return '';
    const meta = TENSE_META[tenseKey];
    const label = caption || (meta ? tenseLabel(meta) : tenseKey);
    let rows = personLabels.map((p, i) => {
      const cells = groups.map(g => {
        const e = endings[g][i];
        return `<td>${e === '—' ? '<span style="color:var(--text3)">—</span>' : '<strong>' + esc(e) + '</strong>'}</td>`;
      }).join('');
      return `<tr><td>${p}</td>${cells}</tr>`;
    }).join('');
    return `<div class="card mb-1">
      <div class="card-title text-sm">${label}</div>
      ${meta ? `<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">${meta.level}</span>` : ''}
      <div class="conj-table-scroll"><table class="conj-table mt-1">
        <tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr>
        ${rows}
      </table></div>
    </div>`;
  }

  let html = '';

  // ── Non-finite forms ──
  html += '<div class="mood-header mood-indicative">Non-Finite Forms</div>';
  html += `<div class="card mb-1">
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr>
      <tr><td>Past Participle</td><td><strong>-ado</strong></td><td><strong>-ido</strong></td><td><strong>-ido</strong></td></tr>
      <tr><td>Gerund</td><td><strong>-ando</strong></td><td><strong>-iendo</strong></td><td><strong>-iendo</strong></td></tr>
    </table></div>
  </div>`;

  // ── Indicative mood ──
  html += '<div class="mood-header mood-indicative">Indicative</div>';
  const indicativeSimple = ['present', 'preterite', 'imperfect'];
  for (const t of indicativeSimple) html += endingsTable(t);

  // Future & conditional use full infinitive as stem
  html += `<div class="card mb-1">
    <div class="card-title text-sm">${tenseLabel(TENSE_META.future)}</div>
    <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">A2</span>
    <p class="text-muted text-sm mt-1">Add endings to the <strong>full infinitive</strong> (e.g. hablar + é = hablaré).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>Ending</th></tr>
      ${['é','ás','á','emos','éis','án'].map((e,i) => `<tr><td>${personLabels[i]}</td><td><strong>-${e}</strong></td></tr>`).join('')}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">${tenseLabel(TENSE_META.conditional)}</div>
    <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">B1</span>
    <p class="text-muted text-sm mt-1">Add endings to the <strong>full infinitive</strong> (e.g. hablar + ía = hablaría).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>Ending</th></tr>
      ${['ía','ías','ía','íamos','íais','ían'].map((e,i) => `<tr><td>${personLabels[i]}</td><td><strong>-${e}</strong></td></tr>`).join('')}
    </table></div>
  </div>`;

  // Compound tenses
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Compound Tenses (Indicative)</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>haber</strong> (conjugated) + <strong>past participle</strong> (-ado/-ido).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Haber form</th><th>Example</th></tr>
      <tr><td>Present Perfect</td><td>he, has, ha, hemos, habéis, han</td><td>he hablado</td></tr>
      <tr><td>Pluperfect</td><td>había, habías, había…</td><td>había comido</td></tr>
      <tr><td>Future Perfect</td><td>habré, habrás, habrá…</td><td>habrá vivido</td></tr>
      <tr><td>Conditional Perfect</td><td>habría, habrías, habría…</td><td>habría dicho</td></tr>
    </table></div>
  </div>`;

  // Progressive
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Progressive Tenses</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>estar</strong> (conjugated) + <strong>gerund</strong> (-ando/-iendo).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Estar form</th><th>Example</th></tr>
      <tr><td>Present Progressive</td><td>estoy, estás, está…</td><td>estoy hablando</td></tr>
      <tr><td>Preterite Progressive</td><td>estuve, estuviste, estuvo…</td><td>estuvo comiendo</td></tr>
      <tr><td>Imperfect Progressive</td><td>estaba, estabas, estaba…</td><td>estaba viviendo</td></tr>
    </table></div>
  </div>`;

  // ── Subjunctive mood ──
  html += '<div class="mood-header mood-subjunctive">Subjunctive</div>';
  html += endingsTable('subjunctive_present');
  if (seFormPref === 'ra' || seFormPref === 'both')
    html += endingsTable('subjunctive_imperfect', tenseLabel(TENSE_META.subjunctive_imperfect) + ' (-ra)');
  if (seFormPref === 'se' || seFormPref === 'both')
    html += endingsTable('subjunctive_imperfect_se', tenseLabel(TENSE_META.subjunctive_imperfect) + ' (-se)');

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Compound Tenses (Subjunctive)</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>haber</strong> (subjunctive) + <strong>past participle</strong>.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Haber form</th><th>Example</th></tr>
      <tr><td>Present Perfect Subj.</td><td>haya, hayas, haya…</td><td>haya hablado</td></tr>
      ${seFormPref === 'se'
        ? '<tr><td>Pluperfect Subj.</td><td>hubiese, hubieses, hubiese…</td><td>hubiese dicho</td></tr>'
        : '<tr><td>Pluperfect Subj.</td><td>hubiera, hubieras, hubiera…</td><td>hubiera dicho</td></tr>'}
    </table></div>
  </div>`;

  html += endingsTable('future_subjunctive');

  // ── Imperative mood ──
  html += '<div class="mood-header mood-imperative">Imperative</div>';
  html += endingsTable('imperative_aff');
  html += endingsTable('imperative_neg');

  // ── Key rules ──
  html += '<div class="mood-header" style="border-color:var(--text2)">Key Rules</div>';

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Stem Changes (Boot Pattern)</div>
    <p class="text-muted text-sm mt-1">Affect yo, tú, él/ella, ellos/ellas in present indicative &amp; subjunctive. Nosotros and vosotros keep the regular stem.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Pattern</th><th>Example</th><th>Present yo</th></tr>
      <tr><td>e → ie</td><td>pensar</td><td>pienso</td></tr>
      <tr><td>o → ue</td><td>poder</td><td>puedo</td></tr>
      <tr><td>e → i</td><td>pedir</td><td>pido</td></tr>
      <tr><td>u → ue</td><td>jugar</td><td>juego</td></tr>
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Spelling Changes</div>
    <p class="text-muted text-sm mt-1">Preserve pronunciation when the following vowel changes.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Change</th><th>When</th><th>Example</th></tr>
      <tr><td>c → qu</td><td>-ar verb before e</td><td>buscar → busqué</td></tr>
      <tr><td>g → gu</td><td>-ar verb before e</td><td>pagar → pagué</td></tr>
      <tr><td>z → c</td><td>before e</td><td>empezar → empecé</td></tr>
      <tr><td>g → j</td><td>-er/-ir verb before a, o</td><td>coger → cojo</td></tr>
    </table></div>
  </div>`;

  const futStems = Object.entries(IRREGULAR_FUTURE_STEMS).map(([verb, stem]) =>
    `<tr><td>${esc(verb)}</td><td>${esc(stem)}-</td></tr>`
  ).join('');
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Future/Conditional Stems</div>
    <p class="text-muted text-sm mt-1">These verbs use a modified stem instead of the full infinitive for future and conditional.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Stem</th></tr>
      ${futStems}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Past Participles</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Participle</th></tr>
      ${Object.entries(IRREGULAR_PARTICIPLES).map(([v, p]) => `<tr><td>${esc(v)}</td><td>${esc(p)}</td></tr>`).join('')}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Gerunds</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Gerund</th></tr>
      ${Object.entries(IRREGULAR_GERUNDS).map(([v, g]) => `<tr><td>${esc(v)}</td><td>${esc(g)}</td></tr>`).join('')}
    </table></div>
  </div>`;

  container.innerHTML = html;
}

// ════════════════════════════════════════
//  PRONUNCIATION GUIDE
// ════════════════════════════════════════

function renderPronunciation() {
  const speakBtn = (text) => `<button class="tts-inline" data-action="speak" data-text="${esc(text)}" aria-label="Listen to ${esc(text)}">&#9654;</button>`;

  let html = '';

  // Vowels
  html += `<div class="card mb-1"><div class="card-title mb-1">Vowels — Vocales</div>
    <p class="text-muted text-sm mb-1">Spanish has 5 pure vowel sounds. Each is always pronounced the same way.</p>`;
  const vowels = [
    ['a', '/a/', 'Like "ah" in "father"', 'casa', 'house'],
    ['e', '/e/', 'Like "e" in "bed" — never silent', 'mesa', 'table'],
    ['i', '/i/', 'Like "ee" in "see"', 'hijo', 'son'],
    ['o', '/o/', 'Like "o" in "go" (but shorter)', 'todo', 'everything'],
    ['u', '/u/', 'Like "oo" in "food"', 'luna', 'moon'],
  ];
  for (const [letter, ipa, desc, ex, en] of vowels) {
    html += `<div class="pron-row">
      <span class="pron-letter">${letter}</span>
      <div style="flex:1"><span class="pron-ipa">${ipa}</span> — ${desc}<br>
        <span class="text-muted text-sm">${esc(ex)} (${en})</span>
      </div>${speakBtn(ex)}
    </div>`;
  }
  html += '</div>';

  // Consonants
  html += `<div class="card mb-1"><div class="card-title mb-1">Consonant Differences — Consonantes</div>
    <p class="text-muted text-sm mb-1">These sounds differ significantly from English.</p>`;
  const cons = [
    ['b / v', '/b/ or /\u03B2/', 'Both pronounced the same! Soft between vowels.', 'vivir', 'to live'],
    ['d', '/d/ or /\u00F0/', 'Soft "th" (like "the") between vowels', 'nada', 'nothing'],
    ['g', '/x/ before e,i', '"h" sound before e/i; hard "g" elsewhere', 'gente', 'people'],
    ['j', '/x/', 'Harsh "h" (like Scottish "loch")', 'joven', 'young'],
    ['ll', '/\u028E/ or /\u029D/', 'Like "y" in "yes" (varies by region)', 'calle', 'street'],
    ['\u00F1', '/\u0272/', 'Like "ny" in "canyon"', 'a\u00F1o', 'year'],
    ['r', '/\u027E/', 'Single tap (like "tt" in American "butter")', 'pero', 'but'],
    ['rr', '/r/', 'Rolled/trilled (multiple taps)', 'perro', 'dog'],
    ['z, c+e/i', '/s/ or /\u03B8/', 'In Spain: "th". In Latin America: "s"', 'zapato', 'shoe'],
  ];
  for (const [letter, ipa, desc, ex, en] of cons) {
    html += `<div class="pron-row">
      <span class="pron-letter" style="font-size:1rem">${letter}</span>
      <div style="flex:1"><span class="pron-ipa">${ipa}</span> — ${desc}<br>
        <span class="text-muted text-sm">${esc(ex)} (${en})</span>
      </div>${speakBtn(ex)}
    </div>`;
  }
  html += '</div>';

  // Stress rules
  html += `<div class="card mb-1"><div class="card-title mb-1">Stress Rules — Acentuaci\u00F3n</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>1.</strong> Words ending in a <strong>vowel, -n, or -s</strong>: stress the <em>second-to-last</em> syllable.<br>
        <span class="text-muted text-sm">ha-<strong>BLO</strong>, co-<strong>MEN</strong>, ca-<strong>SA</strong></span> ${speakBtn('hablo')}</p>
      <p><strong>2.</strong> Words ending in any <strong>other consonant</strong>: stress the <em>last</em> syllable.<br>
        <span class="text-muted text-sm">ha-<strong>BLAR</strong>, co-<strong>MER</strong>, ciu-<strong>DAD</strong></span> ${speakBtn('hablar')}</p>
      <p><strong>3.</strong> Written <strong>accent marks</strong> override these rules.<br>
        <span class="text-muted text-sm">ca-<strong>F\u00C9</strong>, <strong>M\u00DA</strong>-si-ca, pl\u00E1-<strong>TA</strong>-no</span> ${speakBtn('caf\u00E9')}</p>
      <p><strong>4.</strong> Accents also <strong>distinguish meaning</strong>:<br>
        <span class="text-muted text-sm">si (if) vs s\u00ED (yes), el (the) vs \u00E9l (he), tu (your) vs t\u00FA (you)</span></p>
    </div>
  </div>`;

  // Diphthongs
  html += `<div class="card mb-1"><div class="card-title mb-1">Diphthongs & Hiatus — Diptongos e hiato</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>Strong vowels:</strong> a, e, o &nbsp; <strong>Weak vowels:</strong> i, u</p>
      <p><strong>Strong + weak</strong> = diphthong (one syllable): ai, ei, oi, au, eu<br>
        <span class="text-muted text-sm">bai-le, Eu-ro-pa, cau-sa</span> ${speakBtn('baile')}</p>
      <p><strong>Two strong vowels</strong> = hiatus (two syllables):<br>
        <span class="text-muted text-sm">le-er, ca-er, po-e-ta</span> ${speakBtn('poeta')}</p>
      <p><strong>Accent on weak vowel</strong> breaks diphthong:<br>
        <span class="text-muted text-sm">d\u00ED-a, r\u00ED-o, pa-\u00EDs</span> ${speakBtn('d\u00EDa')}</p>
    </div>
  </div>`;

  // Regional variations
  html += `<div class="card mb-1"><div class="card-title mb-1">Regional Variations — Variaciones regionales</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>Seseo</strong> — z and c(e,i) pronounced as /s/<br>
        <span class="text-muted text-sm">Latin America, southern Spain, Canary Islands</span></p>
      <p><strong>Ye\u00EDsmo</strong> — ll and y both pronounced as /\u029D/<br>
        <span class="text-muted text-sm">Most Spanish speakers worldwide</span></p>
      <p><strong>Voseo</strong> — "vos" instead of "t\u00FA" with modified conjugations<br>
        <span class="text-muted text-sm">Argentina, Uruguay, Central America. E.g. "vos habl\u00E1s" instead of "t\u00FA hablas"</span> ${speakBtn('vos habl\u00E1s')}</p>
    </div>
  </div>`;

  document.getElementById('pron-content').innerHTML = html;
}

// ════════════════════════════════════════
//  READING COMPREHENSION
// ════════════════════════════════════════

let readingQueue = [], readingIdx = 0, readingQIdx = 0, readingScore = 0, readingSelected = -1, currentReading = null;
let listenMode = false;

let readingTypeFilter = 'standard';

function renderReadingList(filter) {
  if (typeof READING_DATA === 'undefined') {
    document.getElementById('reading-passages').innerHTML = '<p class="text-muted">Loading...</p>';
    return;
  }
  filter = filter || 'all';

  // Update type filter buttons
  document.querySelectorAll('#reading-type-filters .btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === readingTypeFilter);
  });

  // Update level filter button active states
  document.querySelectorAll('#reading-filters .btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  // Select data source based on type filter
  const isSat = readingTypeFilter === 'sat';
  const source = isSat && typeof READING_SAT_DATA !== 'undefined' ? READING_SAT_DATA
    : !isSat ? READING_DATA : [];

  const passages = filter === 'all' ? source : source.filter(p => p.level === filter);
  document.getElementById('reading-passages').innerHTML = passages.map(p => {
    const done = progress.readingMastery && progress.readingMastery[p.id];
    const satBadge = p.sat ? '<span class="sat-badge">SAT</span> ' : '';
    return `<div class="card" data-action="start-reading" data-id="${esc(p.id)}" data-sat="${p.sat ? '1' : ''}">
      <div class="flex" style="justify-content:space-between;align-items:center">
        <div class="card-title">${satBadge}${esc(p.title)}</div>
        <div style="display:flex;gap:0.25rem;align-items:center">
          ${done ? '<span style="color:var(--green)">&#10003;</span>' : ''}
          <span style="font-size:0.65rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text2);border-radius:3px">${p.level}</span>
        </div>
      </div>
      <div class="card-subtitle">${esc(p.titleEn)}</div>
    </div>`;
  }).join('') || '<p class="text-muted">No passages at this level.</p>';
}

function startReading(id) {
  if (typeof READING_DATA === 'undefined') return;
  currentReading = READING_DATA?.find(p => p.id === id)
    || (typeof READING_SAT_DATA !== 'undefined' ? READING_SAT_DATA.find(p => p.id === id) : null);
  if (!currentReading || !currentReading.questions) return;
  readingQIdx = 0; readingScore = 0; readingSelected = -1;
  listenMode = false;
  showScreen('reading');
  document.getElementById('read-title').textContent = currentReading.title;
  document.getElementById('read-level').textContent = currentReading.level;
  document.getElementById('read-text').textContent = currentReading.text;
  document.getElementById('read-text').style.display = '';
  document.getElementById('read-speak').dataset.text = currentReading.text;
  document.getElementById('read-listen-toggle').classList.remove('active');

  // Vocab sidebar
  if (currentReading.vocab && currentReading.vocab.length) {
    document.getElementById('read-vocab').innerHTML = `<div class="card">
      <div class="card-title text-sm" style="color:var(--text2)">Key Vocabulary</div>
      ${currentReading.vocab.map(v => `<div class="stat-row"><span>${esc(v.word)}</span><span class="text-muted">${esc(v.english)}</span></div>`).join('')}
    </div>`;
  } else {
    document.getElementById('read-vocab').innerHTML = '';
  }

  renderReadingQuestion();
}

function renderReadingQuestion() {
  if (!currentReading || readingQIdx >= currentReading.questions.length) {
    // Done
    reviewItem(progress.readingFsrs, progress.readingMastery, currentReading.id,
      readingScore >= currentReading.questions.length * 0.8 ? FSRS_GOOD : FSRS_AGAIN);
    showResults(readingScore, currentReading.questions.length, 'reading', `${t('readingComprehension')}: ${currentReading.title}`);
    return;
  }

  const total = currentReading.questions.length;
  const pct = total > 0 ? (readingQIdx / total * 100) : 0;
  document.getElementById('read-progress').innerHTML = `<div class="quiz-progress-fill" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100" style="width:${pct}%"></div>`;
  const q = currentReading.questions[readingQIdx];
  readingSelected = -1;
  document.getElementById('read-question').textContent = q.prompt;
  document.getElementById('read-options').innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-reading" data-idx="${i}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('read-submit').style.display = 'none';
  document.getElementById('read-feedback').style.display = 'none';
  document.getElementById('read-next').style.display = 'none';
}

function answerReadingMC(idx) {
  selectMCOption('#read-question-card', idx);
  readingSelected = idx;
  document.getElementById('read-submit').style.display = 'block';
}

function submitReadingMC() {
  if (!currentReading || readingSelected < 0) return;
  const q = currentReading.questions[readingQIdx];
  const opts = document.querySelectorAll('#read-options .quiz-option');
  opts.forEach((o, i) => {
    o.classList.add('disabled');
    if (i === q.correct) o.classList.add('correct');
    else if (i === readingSelected && i !== q.correct) o.classList.add('incorrect');
  });
  const correct = readingSelected === q.correct;
  if (correct) readingScore++;
  const fb = document.getElementById('read-feedback');
  fb.setAttribute('role', 'alert');
  fb.innerHTML = correct ? `<span class="text-correct">${t('correct')}</span>` :
    `<span class="text-incorrect">${t('incorrectAnswer')} ${esc(q.options[q.correct])}</span>`;
  if (q.explanation) fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(q.explanation)}</span>`;
  fb.style.display = 'block';
  document.getElementById('read-submit').style.display = 'none';
  document.getElementById('read-next').style.display = 'flex';
}

function nextReading() { readingQIdx++; renderReadingQuestion(); }

// ════════════════════════════════════════
//  THEMED VOCABULARY
// ════════════════════════════════════════

let currentTheme = null;

function renderThemedVocabList() {
  if (typeof THEMED_VOCAB_DATA === 'undefined') {
    document.getElementById('themed-vocab-list').innerHTML = '<p class="text-muted">Loading...</p>';
    return;
  }
  document.getElementById('themed-vocab-list').innerHTML = THEMED_VOCAB_DATA.map(th => {
    const done = progress.themedVocabDone && progress.themedVocabDone[th.id];
    return `<div class="card" data-action="open-themed-detail" data-id="${esc(th.id)}">
      <div class="flex" style="justify-content:space-between;align-items:center">
        <div class="card-title">${th.icon || ''} ${esc(th.theme)}</div>
        <div style="display:flex;gap:0.25rem;align-items:center">
          ${done ? '<span style="color:var(--green)">&#10003;</span>' : ''}
          <span style="font-size:0.65rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text2);border-radius:3px">${th.level}</span>
        </div>
      </div>
      <div class="card-subtitle">${esc(th.themeEs)}</div>
    </div>`;
  }).join('');
}

function openThemedDetail(id) {
  if (typeof THEMED_VOCAB_DATA === 'undefined') return;
  currentTheme = THEMED_VOCAB_DATA.find(th => th.id === id);
  if (!currentTheme) return;
  showScreen('themed-detail');
  document.getElementById('tv-title').textContent = `${currentTheme.icon || ''} ${currentTheme.theme}`;
  document.getElementById('tv-scenario').textContent = currentTheme.scenario;

  // Dialogue
  if (currentTheme.dialogue && currentTheme.dialogue.length) {
    document.getElementById('tv-dialogue').innerHTML = currentTheme.dialogue.map((d, i) =>
      `<div class="tv-dialogue-line">
        <span class="tv-speaker">${esc(d.speaker)}</span>
        <span>${esc(d.text)}</span>
        <button class="tts-inline" data-action="speak" data-text="${esc(d.text)}" aria-label="Listen to ${esc(d.text)}">&#9654;</button>
      </div>`
    ).join('');
  } else {
    document.getElementById('tv-dialogue').innerHTML = '';
  }

  // Phrases
  document.getElementById('tv-phrases').innerHTML = currentTheme.phrases.map(p =>
    `<div class="phrase-card">
      <div class="phrase-es">${esc(p.spanish)} <button class="tts-inline" data-action="speak" data-text="${esc(p.spanish)}" aria-label="Listen to ${esc(p.spanish)}">&#9654;</button></div>
      <div class="phrase-en">${esc(p.english)}</div>
      ${p.notes ? `<div class="text-muted text-sm">${esc(p.notes)}</div>` : ''}
    </div>`
  ).join('');

  // Vocab
  document.getElementById('tv-vocab').innerHTML = currentTheme.vocab.map(v =>
    `<div class="stat-row">
      ${v.gender ? `<span class="word-gender ${v.gender}" style="font-size:0.6rem;padding:0.05rem 0.25rem">${v.gender === 'f' ? 'la' : 'el'}</span>` : ''}
      <span style="flex:1;margin-left:0.25rem"><strong>${esc(v.word)}</strong></span>
      <span class="text-muted text-sm">${esc(v.english)}</span>
    </div>`
  ).join('');
}

// Themed vocab quiz — powered by createQuizFlow
const themedQuizFlow = createQuizFlow({
  containerId: 'tvq-container',
  nextBtnId: 'tvq-next',
  getCorrectIdx: q => q.correct,
  onCorrect: () => {},
  onIncorrect: () => {},
  getExplanation: q => q.explanation || null,
  onComplete: (score, total) => {
    if (currentTheme) {
      progress.themedVocabDone[currentTheme.id] = true;
      saveProgress();
    }
    showResults(score, total, 'themed-quiz', currentTheme ? currentTheme.theme : 'Themed Vocab');
  },
  renderQuestion: (q, idx, total) => {
    // Update progress bar
    const tvqPct = total > 0 ? (idx / total * 100) : 0;
    const progEl = document.getElementById('tvq-progress');
    if (progEl) progEl.innerHTML = progressBarHTML(idx, total);
    return `
      <div class="card">
        <div class="text-muted text-sm">${idx + 1} / ${total}</div>
        <div class="quiz-question mt-1">${esc(q.prompt)}</div>
        <div class="quiz-options mt-1">
          ${q.options.map((opt, i) => `<button class="quiz-option" data-action="answer-themed-quiz" data-idx="${i}">${esc(opt)}</button>`).join('')}
        </div>
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-themed-quiz-mc" style="display:none">${tBtn('submit')}</button>
    `;
  },
});

function startThemedQuiz() {
  if (!currentTheme || !currentTheme.quiz || !currentTheme.quiz.length) return;
  showScreen('themed-quiz');
  themedQuizFlow.start([...currentTheme.quiz]);
}
function answerThemedQuizMC(idx) { themedQuizFlow.selectOption(idx); }
function submitThemedQuizMC() { themedQuizFlow.submit(); }
function nextThemedQuiz() { themedQuizFlow.next(); }

// ════════════════════════════════════════
//  CURRICULUM TRACKS
// ════════════════════════════════════════

// ════════════════════════════════════════
//  CEFR CURRICULUM
// ════════════════════════════════════════

const CEFR_DESCRIPTIONS = {
  A1: {
    name: 'Principiante', nameEn: 'Beginner',
    desc: 'Understand and use familiar everyday expressions. Introduce yourself, ask and answer basic personal questions. Interact in a simple way if the other person speaks slowly.',
    conversations: 'Basic greetings, ordering food, asking for directions, introductions, telling time',
  },
  A2: {
    name: 'Elemental', nameEn: 'Elementary',
    desc: 'Understand frequently used expressions (personal info, shopping, local geography, employment). Communicate in simple routine tasks. Describe aspects of your background and immediate environment.',
    conversations: 'Shopping, transport, health, social chat, restaurant ordering, emergencies',
  },
  B1: {
    name: 'Intermedio', nameEn: 'Intermediate',
    desc: 'Understand main points on familiar matters (work, school, leisure). Deal with most situations while travelling. Produce simple connected text. Describe experiences, events, dreams, and briefly give reasons and explanations.',
    conversations: 'Work and meetings, expressing opinions, travel planning, describing experiences, romance',
  },
  B2: {
    name: 'Intermedio Alto', nameEn: 'Upper Intermediate',
    desc: 'Understand main ideas of complex text on both concrete and abstract topics. Interact with fluency and spontaneity. Produce clear, detailed text on a wide range of subjects and explain viewpoints.',
    conversations: 'Debates, nuanced opinion, detailed narratives, hypothetical situations, formal correspondence',
  },
  C1: {
    name: 'Avanzado', nameEn: 'Advanced',
    desc: 'Understand a wide range of demanding, longer texts and recognize implicit meaning. Express ideas fluently and spontaneously. Use language flexibly and effectively for social, academic, and professional purposes.',
    conversations: 'Academic presentations, journalism, diplomacy, complex negotiations, abstract discussions',
  },
  C2: {
    name: 'Maestría', nameEn: 'Mastery',
    desc: 'Understand with ease virtually everything heard or read. Summarize information from different sources, reconstructing arguments coherently. Express yourself spontaneously, very fluently, and precisely, differentiating finer shades of meaning.',
    conversations: 'Literary analysis, philosophical discourse, legal argumentation, simultaneous interpretation, any professional domain',
  },
};

const CEFR_COLORS = { A1: '#4CAF50', A2: '#8BC34A', B1: '#FF9800', B2: '#F44336', C1: '#9C27B0', C2: '#311B92' };

function getCefrContentCounts(lv) {
  const counts = {};
  if (typeof VOCAB_DATA !== 'undefined' && typeof buildVocabIndexes === 'function') {
    buildVocabIndexes();
    counts.vocab = (VOCAB_BY_LEVEL[lv] || []).length;
  }
  if (typeof VERB_DATA !== 'undefined') {
    counts.verbs = VERB_DATA.filter(v => v.level === lv).length;
  }
  if (typeof TENSE_META !== 'undefined') {
    counts.tenses = Object.values(TENSE_META).filter(t => t.level === lv).length;
  }
  if (typeof GRAMMAR_DATA !== 'undefined') {
    counts.grammar = GRAMMAR_DATA.filter(l => l.level === lv).length;
  }
  if (typeof CONVERSATIONS_DATA !== 'undefined') {
    counts.conversations = CONVERSATIONS_DATA.filter(c => c.level === lv).length;
  }
  if (typeof READING_DATA !== 'undefined') {
    counts.reading = READING_DATA.filter(r => r.level === lv).length;
  }
  if (typeof SENTENCE_CONSTRUCTION !== 'undefined') {
    counts.sentences = SENTENCE_CONSTRUCTION.filter(s => s.level === lv).length;
  }
  if (typeof TRANSLATION_DRILLS !== 'undefined') {
    counts.translations = TRANSLATION_DRILLS.filter(t => t.level === lv).length;
  }
  return counts;
}

function renderCurriculumOverview() {
  const el = document.getElementById('curriculum-levels');
  if (!el) return;
  const mastery = computeCefrMastery();
  const masteryMap = {};
  for (const m of mastery) masteryMap[m.level] = m;

  let html = '';
  for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const info = CEFR_DESCRIPTIONS[lv];
    const color = CEFR_COLORS[lv];
    const m = masteryMap[lv] || { overall: 0, pillars: [] };
    const counts = getCefrContentCounts(lv);
    const c = cefrColor(m.overall);

    html += `<div class="card mb-1" data-action="open-curriculum-level" data-level="${lv}" style="border-left:4px solid ${color};cursor:pointer">
      <div class="flex justify-between items-center mb-1">
        <div>
          <span style="font-weight:700;font-size:1.1rem;color:${color}">${lv}</span>
          <span class="text-muted" style="margin-left:0.5rem">${info.nameEn}</span>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;font-size:1.1rem;color:${c}">${m.overall}%</div>
        </div>
      </div>
      <div class="mastery-bar" style="margin-bottom:0.5rem;height:8px">
        <div style="width:${m.overall}%;background:${color}"></div>
      </div>
      <p class="text-muted" style="font-size:0.75rem;margin:0 0 0.4rem">${info.desc}</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;font-size:0.65rem;color:var(--text3)">
        ${counts.vocab ? `<span>${counts.vocab} words</span>` : ''}
        ${counts.verbs ? `<span>${counts.verbs} verbs</span>` : ''}
        ${counts.tenses ? `<span>${counts.tenses} tenses</span>` : ''}
        ${counts.grammar ? `<span>${counts.grammar} lessons</span>` : ''}
        ${counts.conversations ? `<span>${counts.conversations} dialogues</span>` : ''}
        ${counts.reading ? `<span>${counts.reading} readings</span>` : ''}
      </div>
    </div>`;
  }
  el.innerHTML = html;
}

function renderCurriculumLevel(lv) {
  if (!lv) return;
  const info = CEFR_DESCRIPTIONS[lv];
  const color = CEFR_COLORS[lv];
  if (!info) return;

  const mastery = computeCefrMastery();
  const m = mastery.find(x => x.level === lv) || { overall: 0, pillars: [] };
  const counts = getCefrContentCounts(lv);
  const c = cefrColor(m.overall);

  // Header
  let headerHtml = `
    <div style="border-left:4px solid ${color};padding-left:0.75rem;margin-bottom:1rem">
      <h2 style="margin:0"><span style="color:${color}">${lv}</span> — ${info.nameEn}</h2>
      <p class="text-muted" style="font-size:0.85rem;margin:0.25rem 0">${info.name}</p>
    </div>
    <div class="card mb-1">
      <div class="flex justify-between items-center mb-1">
        <span style="font-weight:600">Overall Mastery</span>
        <span style="font-weight:700;font-size:1.2rem;color:${c}">${m.overall}%</span>
      </div>
      <div class="mastery-bar" style="height:12px;margin-bottom:0.5rem">
        <div style="width:${m.overall}%;background:${color}"></div>
      </div>
      ${m.pillars.map(p => {
        const pp = p.total ? Math.round(p.pct * 100) : 0;
        const pc = cefrColor(pp);
        return `<div class="stat-row" style="margin-bottom:0.2rem">
          <span class="stat-label" style="font-size:0.8rem">${p.name}</span>
          <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:6px;border-radius:3px;overflow:hidden">
            <div style="width:${pp}%;height:100%;background:${pc}"></div>
          </div>
          <span style="font-size:0.75rem;color:${pc}">${p.done}/${p.total}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="card mb-1">
      <div class="card-title mb-1" style="font-size:0.85rem">What you can do at ${lv}</div>
      <p style="font-size:0.8rem;margin:0 0 0.4rem">${info.desc}</p>
      <div class="text-muted" style="font-size:0.75rem"><strong>Conversations:</strong> ${info.conversations}</div>
    </div>`;

  document.getElementById('curriculum-level-header').innerHTML = headerHtml;

  // Content sections
  let contentHtml = '';

  // Grammar lessons
  if (typeof GRAMMAR_DATA !== 'undefined') {
    const lessons = GRAMMAR_DATA.filter(l => l.level === lv);
    if (lessons.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Grammar (${lessons.length} lessons)</div>`;
      for (const l of lessons) {
        const done = !!progress.grammarDone?.[l.id];
        const r = getRecallPct(progress.grammarFsrs, l.id);
        const icon = done ? '<span style="color:var(--green)">&#10003;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        const recall = r !== null ? (() => { const rc = r >= 90 ? 'var(--green)' : r >= 70 ? 'var(--yellow)' : 'var(--red)'; return `<span style="font-size:0.65rem;color:${rc}">${r}%</span>`; })() : '';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem;cursor:pointer" data-action="open-grammar-lesson" data-lesson="${esc(l.id)}">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="flex:1;font-size:0.8rem">${esc(l.titleEn || l.title)}</span>
          ${recall}
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Verb tenses at this level
  if (typeof TENSE_META !== 'undefined') {
    const tenses = Object.entries(TENSE_META).filter(([, m]) => m.level === lv);
    if (tenses.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Verb Tenses (${tenses.length})</div>`;
      for (const [tKey, tMeta] of tenses) {
        // Compute mastery across all verbs for this tense
        let practiced = 0, total = 0;
        if (typeof VERB_DATA !== 'undefined') {
          for (const v of VERB_DATA) {
            for (let p = 0; p < 6; p++) {
              if (tKey.startsWith('imperative') && p === 0) continue;
              total++;
              if (progress.verbMastery?.[`${v.infinitive}:${tKey}:${p}`]) practiced++;
            }
          }
        }
        const pct = total ? Math.round(practiced / total * 100) : 0;
        const pc = cefrColor(pct);
        const icon = pct >= 80 ? '<span style="color:var(--green)">&#10003;</span>' : pct > 0 ? '<span style="color:var(--yellow)">&#9673;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="flex:1;font-size:0.8rem">${tMeta.labelEn || tMeta.label}</span>
          <span style="font-size:0.65rem;color:${pc}">${pct}%</span>
          <span class="text-muted" style="font-size:0.65rem;min-width:3rem;text-align:right">${practiced}/${total}</span>
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Verbs at this level
  if (typeof VERB_DATA !== 'undefined') {
    const verbs = VERB_DATA.filter(v => v.level === lv);
    if (verbs.length) {
      const learnedVerbs = verbs.filter(v => {
        return Object.keys(progress.verbMastery || {}).some(k => k.startsWith(v.infinitive + ':'));
      });
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Verbs (${learnedVerbs.length}/${verbs.length} practiced)</div>`;
      contentHtml += '<div style="display:flex;flex-wrap:wrap;gap:0.3rem">';
      for (const v of verbs) {
        const practiced = Object.keys(progress.verbMastery || {}).some(k => k.startsWith(v.infinitive + ':'));
        const bg = practiced ? `${color}20` : 'var(--bg3)';
        const fg = practiced ? color : 'var(--text3)';
        contentHtml += `<span style="font-size:0.7rem;padding:0.15rem 0.4rem;background:${bg};color:${fg};border-radius:3px">${esc(v.infinitive)}</span>`;
      }
      contentHtml += '</div></div>';
    }
  }

  // Vocabulary
  if (typeof VOCAB_DATA !== 'undefined' && typeof buildVocabIndexes === 'function') {
    buildVocabIndexes();
    const words = VOCAB_BY_LEVEL[lv] || [];
    if (words.length) {
      const learned = words.filter(w => progress.vocabMastery?.[w.word]).length;
      // Group by category
      const byCat = {};
      for (const w of words) {
        const cat = w.category || 'other';
        (byCat[cat] ??= { total: 0, done: 0 }).total++;
        if (progress.vocabMastery?.[w.word]) byCat[cat].done++;
      }
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Vocabulary (${learned}/${words.length} learned)</div>`;
      const catEntries = Object.entries(byCat).sort((a, b) => b[1].total - a[1].total).slice(0, 15);
      for (const [cat, info] of catEntries) {
        const catPct = Math.round(info.done / info.total * 100);
        const catTitle = typeof VOCAB_CATEGORIES !== 'undefined' && VOCAB_CATEGORIES[cat]
          ? (VOCAB_CATEGORIES[cat].titleEn || VOCAB_CATEGORIES[cat].title)
          : cat;
        contentHtml += `<div class="stat-row" style="margin-bottom:0.15rem">
          <span style="flex:1;font-size:0.75rem">${esc(catTitle)}</span>
          <span class="text-muted" style="font-size:0.65rem">${info.done}/${info.total}</span>
        </div>`;
      }
      if (Object.keys(byCat).length > 15) {
        contentHtml += `<div class="text-muted" style="font-size:0.65rem;margin-top:0.2rem">+${Object.keys(byCat).length - 15} more categories</div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Conversations
  if (typeof CONVERSATIONS_DATA !== 'undefined') {
    const convs = CONVERSATIONS_DATA.filter(c => c.level === lv);
    if (convs.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Conversations (${convs.length})</div>`;
      for (const c of convs) {
        contentHtml += `<div style="font-size:0.8rem;margin-bottom:0.2rem">${c.icon || ''} ${esc(c.titleEn || c.title)}</div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Reading
  if (typeof READING_DATA !== 'undefined') {
    const readings = READING_DATA.filter(r => r.level === lv);
    if (readings.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Reading (${readings.length})</div>`;
      for (const r of readings) {
        const done = !!progress.readingMastery?.[r.id];
        const icon = done ? '<span style="color:var(--green)">&#10003;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="font-size:0.8rem">${esc(r.titleEn || r.title)}</span>
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Other exercises
  const exerciseTypes = [
    { name: 'Sentence Construction', data: typeof SENTENCE_CONSTRUCTION !== 'undefined' ? SENTENCE_CONSTRUCTION : null, store: 'sentenceMastery' },
    { name: 'Translation Drills', data: typeof TRANSLATION_DRILLS !== 'undefined' ? TRANSLATION_DRILLS : null, store: 'translationMastery' },
    { name: 'Cloze Passages', data: typeof CLOZE_PASSAGES !== 'undefined' ? CLOZE_PASSAGES : null, store: 'clozeMastery' },
    { name: 'Dictation', data: typeof DICTATION_DATA !== 'undefined' ? DICTATION_DATA : null, store: 'dictMastery' },
  ];
  for (const ex of exerciseTypes) {
    if (!ex.data) continue;
    const items = ex.data.filter(i => i.level === lv);
    if (!items.length) continue;
    const done = items.filter(i => progress[ex.store]?.[i.id]).length;
    const icon = done === items.length ? '<span style="color:var(--green)">&#10003;</span>'
      : done > 0 ? '<span style="color:var(--yellow)">&#9673;</span>'
      : '<span style="color:var(--text3)">&#9675;</span>';
    contentHtml += `<div class="stat-row" style="margin-bottom:0.3rem">
      <span style="min-width:1.2rem">${icon}</span>
      <span style="flex:1;font-size:0.8rem">${ex.name}</span>
      <span class="text-muted" style="font-size:0.7rem">${done}/${items.length}</span>
    </div>`;
  }

  // Skills still needed
  const todo = [];
  for (const p of m.pillars) {
    const remaining = p.total - p.done;
    if (remaining > 0) todo.push(`${remaining} more ${p.name.toLowerCase()} items`);
  }
  if (todo.length) {
    contentHtml += `<div class="card mb-1" style="border-left:3px solid var(--yellow)">
      <div class="card-title mb-1" style="font-size:0.85rem">Still needed for ${lv} mastery</div>
      <ul style="margin:0;padding-left:1.2rem;font-size:0.8rem;color:var(--text2)">
        ${todo.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>`;
  }

  document.getElementById('curriculum-level-content').innerHTML = contentHtml;
}

let currentTrack = null;

function renderTrackList() {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const el = document.getElementById('track-list');
  if (!el) return;
  el.innerHTML = CURRICULUM_TRACKS.map(track => {
    const comp = getTrackCompletion(track);
    return `
    <div class="card track-card" data-action="open-track-detail" data-id="${esc(track.id)}" style="border-left:4px solid ${track.color}">
      <div class="flex align-center gap-1 mb-1">
        <span style="font-size:1.5rem">${track.icon}</span>
        <div style="flex:1">
          <div class="card-title">${esc(track.title)} <span class="text-muted" style="font-weight:400">— ${esc(track.titleEn)}</span></div>
          <div class="card-subtitle text-xs">${esc(track.level)} · ${esc(track.grammarFocus)}</div>
        </div>
      </div>
      <div class="text-sm text-muted mb-1">${esc(track.description)}</div>
      <div class="track-progress-wrap">
        <div class="track-progress-bar" style="width:${comp.percent}%;background:${track.color}"></div>
      </div>
      <div class="text-xs text-muted" style="margin-top:0.25rem">${comp.completed}/${comp.total} modules completed</div>
    </div>`;
  }).join('');
}

function openTrackDetail(trackId) {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const track = CURRICULUM_TRACKS.find(t => t.id === trackId);
  if (!track) return;
  currentTrack = track;
  showScreen('track-detail');

  const comp = getTrackCompletion(track);
  document.getElementById('track-header').innerHTML = `
    <div class="flex align-center gap-1 mb-1">
      <span style="font-size:2rem">${track.icon}</span>
      <div style="flex:1">
        <h2 style="margin:0">${esc(track.title)}</h2>
        <div class="text-muted text-sm">${esc(track.titleEn)} · ${esc(track.level)}</div>
      </div>
      <div class="track-completion-ring" style="--pct:${comp.percent};--clr:${track.color}">
        <span>${comp.percent}%</span>
      </div>
    </div>
    <div class="text-sm mb-1">${esc(track.description)}</div>
    <div class="text-xs text-muted mb-2" style="font-style:italic">Grammar focus: ${esc(track.grammarFocus)}</div>
  `;

  const typeLabels = { vocab: 'Vocab', grammar: 'Grammar', themed: 'Scenario', culture: 'Culture', reading: 'Reading', conversation: 'Convo' };
  const cs = getComputedStyle(document.documentElement);
  const typeColors = {
    vocab: cs.getPropertyValue('--green').trim(),
    grammar: cs.getPropertyValue('--yellow').trim(),
    themed: cs.getPropertyValue('--blue').trim(),
    culture: cs.getPropertyValue('--accent').trim(),
    reading: cs.getPropertyValue('--text2').trim(),
    conversation: cs.getPropertyValue('--accent2').trim()
  };

  document.getElementById('track-modules').innerHTML = track.modules.map((mod, i) => {
    const done = isTrackModuleComplete(mod);
    const label = typeLabels[mod.type] || mod.type;
    const color = typeColors[mod.type] || '#666';
    return `
    <div class="track-module-item${done ? ' completed' : ''}" data-action="launch-track-module" data-track-id="${esc(track.id)}" data-module-id="${esc(mod.id)}">
      <div class="track-module-num" style="background:${done ? track.color : 'var(--surface2)'};color:${done ? '#fff' : 'var(--text2)'}">${i + 1}</div>
      <div style="flex:1">
        <div class="text-sm" style="font-weight:500">${esc(mod.title)}</div>
        <div class="text-xs text-muted">${esc(mod.titleEs)}</div>
      </div>
      <span class="module-type-badge" style="background:${color}20;color:${color}">${label}</span>
      ${done ? '<span style="color:var(--correct);font-size:1.1rem">✓</span>' : ''}
    </div>`;
  }).join('');
}

function isTrackModuleComplete(mod) {
  if (!progress) return false;
  switch (mod.type) {
    case 'grammar':
      return !!(progress.grammarDone && progress.grammarDone[mod.ref.grammarId]);
    case 'themed':
      return !!(progress.themedVocabDone && progress.themedVocabDone[mod.ref.themedId]);
    case 'reading':
      return !!(progress.readingMastery && progress.readingMastery[mod.ref.readingId]);
    case 'culture':
      return !!(progress.cultureDone && progress.cultureDone[mod.ref.itemId]);
    case 'vocab': {
      if (!progress.vocabMastery || typeof VOCAB_DATA === 'undefined') return false;
      buildVocabIndexes();
      const cat = mod.ref.category;
      const catWords = VOCAB_BY_CATEGORY[cat] || [];
      const threshold = Math.min(10, catWords.length);
      const learned = catWords.filter(v => progress.vocabMastery[v.word]).length;
      return learned >= threshold;
    }
    case 'conversation':
      return !!(progress.cultureDone && progress.cultureDone[mod.ref.itemId]);
    default:
      return false;
  }
}

function getTrackCompletion(track) {
  const total = track.modules.length;
  const completed = track.modules.filter(m => isTrackModuleComplete(m)).length;
  return { completed, total, percent: total ? Math.round(completed / total * 100) : 0 };
}

function launchTrackModule(trackId, moduleId) {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const track = CURRICULUM_TRACKS.find(t => t.id === trackId);
  if (!track) return;
  const mod = track.modules.find(m => m.id === moduleId);
  if (!mod) return;

  switch (mod.type) {
    case 'grammar':
      openGrammarLesson(mod.ref.grammarId);
      break;
    case 'vocab':
      openVocabCategory(mod.ref.category);
      break;
    case 'themed':
      openThemedDetail(mod.ref.themedId);
      break;
    case 'reading':
      startReading(mod.ref.readingId);
      break;
    case 'culture':
    case 'conversation':
      currentCultureModule = mod.ref.module;
      openCultureItem(mod.ref.itemId);
      break;
  }
}

