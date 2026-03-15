'use strict';

// ════════════════════════════════════════════════════════════
//  placement.js — IRT-adaptive placement test
//  Rasch model with per-domain scoring (grammar + vocab)
// ════════════════════════════════════════════════════════════


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
  const ptFill = document.getElementById('pt-progress-bar-fill');
  ptFill.style.width = '0%';
  ptFill.setAttribute('aria-valuenow', '0');
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
  const ptFillEl = document.getElementById('pt-progress-bar-fill');
  ptFillEl.style.width = pct + '%';
  ptFillEl.setAttribute('aria-valuenow', String(pct));
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
//  PLACEMENT TEST
// ════════════════════════════════════════

const PLACEMENT_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const LEVEL_ORDER = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

function levelAtOrBelow(itemLevel, targetLevel) {
  return (LEVEL_ORDER[itemLevel] || 0) <= (LEVEL_ORDER[targetLevel] || 0);
}

function buildPlacementGrammarQs(level, count) {
  if (typeof GRAMMAR_DATA === 'undefined') return [];
  const lessons = GRAMMAR_DATA.filter(l => l.level === level);
  const picked = pickN(lessons, count);
  return picked.map(l => {
    const q = pick(l.quiz);
    return {
      domain: 'grammar', level, type: q.type,
      prompt: q.question, answer: q.answer,
      options: q.options ? shuffle([...q.options]) : null,
      explanation: q.explanation || '',
    };
  });
}

// ════════════════════════════════════════
//  LEARNING PLAN (post-placement onboarding)
// ════════════════════════════════════════

const LEARNING_PLANS = {
  A1: {
    subtitle: 'You are just getting started — here is your foundation plan.',
    modules: [
      { icon: '\u{1F44B}', label: 'Greetings & Introductions' },
      { icon: '\u{1F522}', label: 'Numbers & Counting' },
      { icon: '\u{1F4D6}', label: 'Basic Vocabulary (family, food, colors)' },
      { icon: '\u{1F3E0}', label: 'Ser vs. Estar (to be)' },
      { icon: '\u{1F4AC}', label: 'Common Phrases & Expressions' },
      { icon: '\u{1F50A}', label: 'Pronunciation Basics' },
    ],
  },
  A2: {
    subtitle: 'You know the basics — time to build fluency.',
    modules: [
      { icon: '\u{1F4DA}', label: 'Expand Core Vocabulary' },
      { icon: '\u{1F504}', label: 'Present Tense Verb Conjugation' },
      { icon: '\u{1F4AC}', label: 'Everyday Phrases & Conversations' },
      { icon: '\u{2194}\u{FE0F}', label: 'Por vs. Para' },
      { icon: '\u{1F4DD}', label: 'Basic Sentence Structure' },
      { icon: '\u{23F0}', label: 'Telling Time & Dates' },
    ],
  },
  B1: {
    subtitle: 'Intermediate level — deepen your grammar and expression.',
    modules: [
      { icon: '\u{1F552}', label: 'Past Tenses (preterite & imperfect)' },
      { icon: '\u{1F52E}', label: 'Future & Conditional Tenses' },
      { icon: '\u{1F4A1}', label: 'Subjunctive Introduction' },
      { icon: '\u{1F4D6}', label: 'Reading Comprehension' },
      { icon: '\u{270D}\u{FE0F}', label: 'Writing Prompts & Practice' },
      { icon: '\u{1F5E3}\u{FE0F}', label: 'Conversational Connectors' },
    ],
  },
  B2: {
    subtitle: 'Upper intermediate — master complex structures.',
    modules: [
      { icon: '\u{1F9E0}', label: 'Advanced Grammar Patterns' },
      { icon: '\u{1F504}', label: 'Subjunctive in Depth' },
      { icon: '\u{2696}\u{FE0F}', label: 'Comparative Grammar (EN vs. ES)' },
      { icon: '\u{1F30E}', label: 'Culture Modules & Context' },
      { icon: '\u{1F4AC}', label: 'Idioms & Colloquial Expressions' },
      { icon: '\u{1F4DD}', label: 'Structured Writing Practice' },
    ],
  },
  C1: {
    subtitle: 'Advanced — refine nuance and achieve near-native accuracy.',
    modules: [
      { icon: '\u{1F3AF}', label: 'All Grammar Modules (review & gaps)' },
      { icon: '\u{1F9D0}', label: 'Nuance & Register (formal vs. informal)' },
      { icon: '\u{270D}\u{FE0F}', label: 'Advanced Writing & Essays' },
      { icon: '\u{1F4D6}', label: 'Advanced Reading (literature, news)' },
      { icon: '\u{1F30D}', label: 'Regional Variations & Dialects' },
      { icon: '\u{1F4AC}', label: 'Complex Idioms & Proverbs' },
    ],
  },
  C2: {
    subtitle: 'Near-native — polish every detail.',
    modules: [
      { icon: '\u{1F3AF}', label: 'All Modules Unlocked' },
      { icon: '\u{1F9D0}', label: 'Stylistic Nuance & Tone' },
      { icon: '\u{270D}\u{FE0F}', label: 'Advanced Writing & Essays' },
      { icon: '\u{1F4D6}', label: 'Literary & Academic Reading' },
      { icon: '\u{1F30D}', label: 'Regional Dialects & Slang' },
      { icon: '\u{1F4AC}', label: 'Proverbs, Wordplay & Humor' },
    ],
  },
};

function showLearningPlan() {
  // Only show once per profile
  if (progress.onboardingDone) {
    switchTab('today');
    return;
  }

  const level = progress.placementLevel || 'A1';
  const plan = LEARNING_PLANS[level] || LEARNING_PLANS['A1'];

  document.getElementById('lp-subtitle').textContent =
    'Level ' + level + ' — ' + plan.subtitle;

  const checklist = document.getElementById('learning-plan-checklist');
  checklist.innerHTML = plan.modules.map(m =>
    `<div class="lp-item">
      <span class="lp-icon">${m.icon}</span>
      <span class="lp-label">${m.label}</span>
      <span class="lp-check">\u2713</span>
    </div>`
  ).join('');

  const overlay = document.getElementById('learning-plan-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
  }
}

function closeLearningPlan() {
  const overlay = document.getElementById('learning-plan-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
  progress.onboardingDone = true;
  saveProgress();
  switchTab('today');
}
