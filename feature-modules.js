'use strict';

// ════════════════════════════════════════════════════════════════
//  feature-modules.js — Rendering logic for new feature modules:
//  Verb+Preposition, Subjunctive Triggers, Writing Prompts,
//  Comparative Grammar, Number Practice
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════
//  VERB + PREPOSITIONS
// ════════════════════════════════════════

function renderVerbPreps() {
  const el = document.getElementById('verb-preps-content');
  if (!el) return;
  if (typeof VERB_PREPOSITIONS_DATA === 'undefined') {
    el.innerHTML = '<p class="text-muted">Loading verb + preposition data...</p>';
    return;
  }

  // Group by level
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let html = '';
  for (const lv of levels) {
    const items = VERB_PREPOSITIONS_DATA.filter(v => v.level === lv);
    if (!items.length) continue;
    html += `<h3 class="mt-2 mb-1">${lv}</h3>`;
    html += items.map(v => `
      <div class="card prep-card" data-action="speak" data-text="${esc(v.verb + ' ' + v.preposition)}">
        <div>
          <span class="prep-verb">${esc(v.verb)}</span>
          <span class="prep-prep">${esc(v.preposition)}</span>
          <span class="text-muted"> — ${esc(v.english)}</span>
        </div>
        ${v.example ? `<div class="text-muted text-sm mt-1" lang="es"><em>"${esc(v.example)}"</em></div>` : ''}
        ${v.exampleEn ? `<div class="text-muted text-xs">"${esc(v.exampleEn)}"</div>` : ''}
      </div>
    `).join('');
  }

  html += `<button class="btn btn-primary mt-2" data-action="start-vp-quiz">Take Quiz</button>`;
  el.innerHTML = html;
}

let vpQuizQueue = [], vpQuizIdx = 0, vpQuizScore = 0;

function startVerbPrepsQuiz() {
  if (typeof VERB_PREPOSITIONS_DATA === 'undefined') return;
  vpQuizQueue = shuffle(VERB_PREPOSITIONS_DATA).slice(0, 10);
  vpQuizIdx = 0;
  vpQuizScore = 0;
  startSessionTimer();
  showScreen('verb-preps-quiz');
  renderVPQuizQuestion();
}

function renderVPQuizQuestion() {
  if (vpQuizIdx >= vpQuizQueue.length) {
    addXP(vpQuizScore * 10);
    showSessionSummary({ type: 'Verb + Preposition', correct: vpQuizScore, total: vpQuizQueue.length, xpEarned: vpQuizScore * 10 });
    goBack();
    return;
  }
  const q = vpQuizQueue[vpQuizIdx];
  const allPreps = [...new Set(VERB_PREPOSITIONS_DATA.map(v => v.preposition))];
  const wrongs = shuffle(allPreps.filter(p => p !== q.preposition)).slice(0, 3);
  const options = shuffle([q.preposition, ...wrongs]);

  document.getElementById('vp-progress').textContent = `${vpQuizIdx + 1} / ${vpQuizQueue.length}`;
  document.getElementById('vp-next').style.display = 'none';
  document.getElementById('vp-quiz-content').innerHTML = `
    <p class="mb-1">Complete: <strong>${esc(q.verb)} ___</strong> (${esc(q.english)})</p>
    <div class="quiz-options">
      ${options.map((o, i) => `<button class="quiz-option" data-action="answer-vp-quiz" data-idx="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}
    </div>
  `;
}

function answerVPQuizMC(idx) {
  selectMCOption('#vp-quiz-content', idx, submitVPQuiz);
}

function submitVPQuiz() {
  const q = vpQuizQueue[vpQuizIdx];
  const isCorrect = processMCSubmit({
    optionsSel: '#vp-quiz-content .quiz-option',
    isCorrectBtn: btn => btn.dataset.val === q.preposition,
    feedbackId: null,
    nextBtnId: 'vp-next',
    feedbackFn: null,
  });
  if (isCorrect) vpQuizScore++;
  trackError('verb-prep:' + q.verb, isCorrect, 'verb-prep');
}

function nextVPQuiz() {
  vpQuizIdx++;
  renderVPQuizQuestion();
}

// ════════════════════════════════════════
//  SUBJUNCTIVE TRIGGERS
// ════════════════════════════════════════

function renderSubjunctiveTriggers() {
  const el = document.getElementById('subjunctive-triggers-content');
  if (!el) return;
  if (typeof SUBJUNCTIVE_TRIGGERS_DATA === 'undefined') {
    el.innerHTML = '<p class="text-muted">Loading subjunctive triggers data...</p>';
    return;
  }

  // Group by category
  const categories = {};
  for (const t of SUBJUNCTIVE_TRIGGERS_DATA) {
    (categories[t.category] ??= []).push(t);
  }

  let html = '<p class="text-muted text-sm mb-1">These expressions require the subjunctive mood in the clause that follows.</p>';
  for (const [cat, items] of Object.entries(categories)) {
    html += `<h3 class="mt-2 mb-1">${esc(cat)}</h3>`;
    html += items.map(t => `
      <div class="card" style="padding:0.5rem 0.75rem">
        <div><strong lang="es">${esc(t.trigger)}</strong> <span class="text-muted"> — ${esc(t.english)}</span></div>
        ${t.example ? `<div class="text-muted text-sm mt-1" lang="es"><em>"${esc(t.example)}"</em></div>` : ''}
        ${t.exampleEn ? `<div class="text-muted text-xs">"${esc(t.exampleEn)}"</div>` : ''}
        ${t.notes ? `<div class="text-muted text-xs mt-1">${esc(t.notes)}</div>` : ''}
      </div>
    `).join('');
  }

  html += `<button class="btn btn-primary mt-2" data-action="start-subj-quiz">Take Quiz</button>`;
  el.innerHTML = html;
}

let subjQuizQueue = [], subjQuizIdx = 0, subjQuizScore = 0;

function startSubjunctiveQuiz() {
  if (typeof SUBJUNCTIVE_TRIGGERS_DATA === 'undefined') return;
  // Build quiz: given a sentence, does it require subjunctive or indicative?
  const items = shuffle(SUBJUNCTIVE_TRIGGERS_DATA).slice(0, 10);
  subjQuizQueue = items.map(t => ({
    trigger: t.trigger,
    example: t.example,
    english: t.english,
    category: t.category,
  }));
  subjQuizIdx = 0;
  subjQuizScore = 0;
  startSessionTimer();
  showScreen('subjunctive-quiz');
  renderSubjQuizQuestion();
}

function renderSubjQuizQuestion() {
  if (subjQuizIdx >= subjQuizQueue.length) {
    addXP(subjQuizScore * 10);
    showSessionSummary({ type: 'Subjunctive Triggers', correct: subjQuizScore, total: subjQuizQueue.length, xpEarned: subjQuizScore * 10 });
    goBack();
    return;
  }
  const q = subjQuizQueue[subjQuizIdx];
  // Quiz format: "Which expression triggers the subjunctive?"
  const allTriggers = SUBJUNCTIVE_TRIGGERS_DATA.map(t => t.trigger);
  const wrongs = shuffle(allTriggers.filter(t => t !== q.trigger)).slice(0, 3);
  const options = shuffle([q.trigger, ...wrongs]);

  document.getElementById('subj-progress').textContent = `${subjQuizIdx + 1} / ${subjQuizQueue.length}`;
  document.getElementById('subj-next').style.display = 'none';
  document.getElementById('subj-quiz-content').innerHTML = `
    <p class="mb-1">Which expression means: <strong>"${esc(q.english)}"</strong>?</p>
    <div class="quiz-options">
      ${options.map((o, i) => `<button class="quiz-option" data-action="answer-subj-quiz" data-idx="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}
    </div>
  `;
}

function answerSubjQuizMC(idx) {
  selectMCOption('#subj-quiz-content', idx, submitSubjQuiz);
}

function submitSubjQuiz() {
  const q = subjQuizQueue[subjQuizIdx];
  const isCorrect = processMCSubmit({
    optionsSel: '#subj-quiz-content .quiz-option',
    isCorrectBtn: btn => btn.dataset.val === q.trigger,
    feedbackId: null,
    nextBtnId: 'subj-next',
    feedbackFn: null,
  });
  if (isCorrect) subjQuizScore++;
}

function nextSubjQuiz() {
  subjQuizIdx++;
  renderSubjQuizQuestion();
}

// ════════════════════════════════════════
//  WRITING PROMPTS
// ════════════════════════════════════════

function renderWritingPromptsList() {
  const el = document.getElementById('writing-prompts-list');
  if (!el) return;
  if (typeof WRITING_PROMPTS_DATA === 'undefined') {
    el.innerHTML = '<p class="text-muted">Loading writing prompts...</p>';
    return;
  }

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let html = '<p class="text-muted text-sm mb-1">Write freely in Spanish, then check your work against the self-assessment checklist.</p>';
  for (const lv of levels) {
    const prompts = WRITING_PROMPTS_DATA.filter(p => p.level === lv);
    if (!prompts.length) continue;
    html += `<h3 class="mt-2 mb-1">${lv}</h3>`;
    html += prompts.map(p => `
      <div class="card" data-action="start-writing" data-id="${esc(p.id)}" style="padding:0.6rem 0.75rem">
        <div class="card-title text-sm">${esc(p.promptEn)}</div>
        <div class="card-subtitle text-xs" lang="es">${esc(p.prompt)}</div>
      </div>
    `).join('');
  }
  el.innerHTML = html;
}

let currentWritingPrompt = null;

function startWritingExercise(id) {
  if (typeof WRITING_PROMPTS_DATA === 'undefined') return;
  currentWritingPrompt = WRITING_PROMPTS_DATA.find(p => p.id === id);
  if (!currentWritingPrompt) return;
  showScreen('writing-exercise');

  const p = currentWritingPrompt;
  const el = document.getElementById('writing-exercise-content');
  el.innerHTML = `
    <h3 class="mb-1">${esc(p.promptEn)}</h3>
    <p class="text-muted text-sm mb-1" lang="es">${esc(p.prompt)}</p>
    ${p.targetVocab ? `<p class="text-muted text-xs mb-1">Try to use: <strong>${p.targetVocab.map(esc).join(', ')}</strong></p>` : ''}
    ${p.targetGrammar ? `<p class="text-muted text-xs mb-1">Grammar focus: <strong>${esc(p.targetGrammar)}</strong></p>` : ''}
    <textarea class="writing-area" placeholder="Write your response in Spanish..." lang="es"></textarea>
    <div class="mt-1">
      <h4 class="mb-1">Self-Assessment Checklist</h4>
      ${(p.selfCheckItems || []).map((item, i) => `
        <label class="self-check-item">
          <input type="checkbox" id="check-${i}">
          <span>${esc(item)}</span>
        </label>
      `).join('')}
    </div>
    <button class="btn btn-secondary mt-1" data-action="show-writing-sample">Show Sample Response</button>
    <div id="writing-sample" style="display:none" class="mt-1"></div>
  `;
}

function showWritingSample() {
  if (!currentWritingPrompt) return;
  const el = document.getElementById('writing-sample');
  if (!el) return;
  el.style.display = '';
  el.innerHTML = `
    <div class="card" style="padding:0.75rem">
      <div class="card-title text-sm mb-1">Sample Response</div>
      <p lang="es" class="text-sm">${esc(currentWritingPrompt.sampleResponse)}</p>
      <p class="text-muted text-xs mt-1">${esc(currentWritingPrompt.sampleResponseEn)}</p>
    </div>
  `;
  addXP(5);
}

// ════════════════════════════════════════
//  COMPARATIVE GRAMMAR
// ════════════════════════════════════════

function renderComparativeGrammarList() {
  const el = document.getElementById('comparative-grammar-list');
  if (!el) return;
  if (typeof COMPARATIVE_GRAMMAR_DATA === 'undefined') {
    el.innerHTML = '<p class="text-muted">Loading comparative grammar data...</p>';
    return;
  }

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let html = '<p class="text-muted text-sm mb-1">Key differences between Spanish and English grammar.</p>';
  for (const lv of levels) {
    const items = COMPARATIVE_GRAMMAR_DATA.filter(g => g.level === lv);
    if (!items.length) continue;
    html += `<h3 class="mt-2 mb-1">${lv}</h3>`;
    html += items.map(g => `
      <div class="card" data-action="open-comparative-detail" data-id="${esc(g.id)}" style="padding:0.6rem 0.75rem">
        <div class="card-title text-sm">${esc(g.titleEn)}</div>
        ${g.falseAmigos && g.falseAmigos.length ? `<div class="card-subtitle text-xs text-muted">Includes ${g.falseAmigos.length} false friend${g.falseAmigos.length > 1 ? 's' : ''}</div>` : ''}
      </div>
    `).join('');
  }
  el.innerHTML = html;
}

function openComparativeDetail(id) {
  if (typeof COMPARATIVE_GRAMMAR_DATA === 'undefined') return;
  const item = COMPARATIVE_GRAMMAR_DATA.find(g => g.id === id);
  if (!item) return;
  showScreen('comparative-detail');

  const el = document.getElementById('comparative-detail-content');
  let html = `<h3 class="mb-1">${esc(item.titleEn)}</h3>`;
  html += `<div class="grammar-content mb-1">${item.content}</div>`;

  if (item.examples && item.examples.length) {
    html += '<h4 class="mt-2 mb-1">Examples</h4>';
    html += item.examples.map(ex => `
      <div class="card" style="padding:0.5rem 0.75rem">
        <div lang="es"><strong>${esc(ex.spanish)}</strong></div>
        <div class="text-muted text-sm">${esc(ex.english)}</div>
        ${ex.note ? `<div class="text-muted text-xs mt-1">${esc(ex.note)}</div>` : ''}
      </div>
    `).join('');
  }

  if (item.falseAmigos && item.falseAmigos.length) {
    html += '<h4 class="mt-2 mb-1">False Friends (Falsos Amigos)</h4>';
    html += item.falseAmigos.map(fa => `
      <div class="card" style="padding:0.5rem 0.75rem;border-left:3px solid var(--red)">
        <div><strong lang="es">${esc(fa.spanish)}</strong> ≠ ${esc(fa.trap)}</div>
        <div class="text-muted text-sm">Actually means: <strong>${esc(fa.english)}</strong></div>
      </div>
    `).join('');
  }

  el.innerHTML = html;
  addXP(5);
}

// ════════════════════════════════════════
//  NUMBER PRACTICE
// ════════════════════════════════════════

function renderNumbersHome() {
  // Render the numbers home screen content
  const el = document.getElementById('screen-numbers');
  if (!el) return;
  // Content is static in HTML, just update stats if available
}

function renderNumberLearn() {
  const el = document.getElementById('number-learn-content');
  if (!el) return;
  if (typeof NUMBER_PRACTICE_DATA === 'undefined') {
    el.innerHTML = '<p class="text-muted">Loading number data...</p>';
    return;
  }

  const data = NUMBER_PRACTICE_DATA;
  let html = '<h3 class="mb-1">Cardinal Numbers</h3>';
  const cardinals = data.CARDINAL_NUMBERS || [];
  const groups = [
    { label: '0-20', items: cardinals.filter(n => n.number <= 20) },
    { label: '21-100', items: cardinals.filter(n => n.number > 20 && n.number <= 100) },
    { label: '100+', items: cardinals.filter(n => n.number > 100) },
  ];
  for (const g of groups) {
    if (!g.items.length) continue;
    html += `<h4 class="mt-1 mb-1">${g.label}</h4>`;
    html += '<div class="card-grid">';
    html += g.items.map(n => `
      <div class="card" style="padding:0.4rem;text-align:center" data-action="speak" data-text="${esc(n.spanish)}">
        <div style="font-size:1.2rem;font-weight:700">${n.number}</div>
        <div class="text-sm" lang="es">${esc(n.spanish)}</div>
      </div>
    `).join('');
    html += '</div>';
  }

  if (data.ORDINAL_NUMBERS && data.ORDINAL_NUMBERS.length) {
    html += '<h3 class="mt-2 mb-1">Ordinal Numbers</h3>';
    html += '<div class="card-grid">';
    html += data.ORDINAL_NUMBERS.map(n => `
      <div class="card" style="padding:0.4rem;text-align:center" data-action="speak" data-text="${esc(n.spanish)}">
        <div style="font-size:1rem;font-weight:700">${n.number}</div>
        <div class="text-sm" lang="es">${esc(n.spanish)} / ${esc(n.spanishFem)}</div>
      </div>
    `).join('');
    html += '</div>';
  }

  el.innerHTML = html;
}

let nqQueue = [], nqIdx = 0, nqScore = 0;

function startNumberQuiz() {
  if (typeof NUMBER_PRACTICE_DATA === 'undefined') return;
  const data = NUMBER_PRACTICE_DATA;
  const cardinals = data.CARDINAL_NUMBERS || [];
  // Generate 10 random number quiz questions
  nqQueue = shuffle(cardinals).slice(0, 10).map(n => ({
    number: n.number,
    spanish: n.spanish,
    type: Math.random() < 0.5 ? 'toSpanish' : 'toNumber',
  }));
  nqIdx = 0;
  nqScore = 0;
  startSessionTimer();
  showScreen('number-quiz');
  renderNumberQuizQuestion();
}

function renderNumberQuizQuestion() {
  if (nqIdx >= nqQueue.length) {
    addXP(nqScore * 10);
    showSessionSummary({ type: 'Number Quiz', correct: nqScore, total: nqQueue.length, xpEarned: nqScore * 10 });
    goBack();
    return;
  }
  const q = nqQueue[nqIdx];
  const data = NUMBER_PRACTICE_DATA;
  const cardinals = data.CARDINAL_NUMBERS || [];

  document.getElementById('nq-progress').textContent = `${nqIdx + 1} / ${nqQueue.length}`;
  document.getElementById('nq-next').style.display = 'none';

  if (q.type === 'toSpanish') {
    // Show number, ask for Spanish word — FIB
    document.getElementById('nq-quiz-content').innerHTML = `
      <p class="mb-1">Write <strong>${q.number}</strong> in Spanish:</p>
      <input type="text" id="nq-input" class="quiz-input" placeholder="Type the Spanish word..." autocomplete="off" lang="es">
      ${accentBarHTML('insert-accent-nq', 'nq-input')}
      <button class="btn btn-primary mt-1" data-action="check-number-quiz">Check</button>
      <div id="nq-feedback" style="display:none"></div>
    `;
    document.getElementById('nq-input')?.focus();
  } else {
    // Show Spanish word, ask which number
    const wrongs = shuffle(cardinals.filter(n => n.number !== q.number)).slice(0, 3);
    const options = shuffle([q.number, ...wrongs.map(w => w.number)]);
    document.getElementById('nq-quiz-content').innerHTML = `
      <p class="mb-1">What number is <strong lang="es">"${esc(q.spanish)}"</strong>?</p>
      <div class="quiz-options">
        ${options.map((o, i) => `<button class="quiz-option" data-action="answer-number-quiz" data-idx="${i}" data-val="${o}">${o}</button>`).join('')}
      </div>
    `;
  }
}

function answerNumberQuizMC(idx) {
  selectMCOption('#nq-quiz-content', idx, submitNumberQuizMC);
}

function submitNumberQuizMC() {
  const q = nqQueue[nqIdx];
  const isCorrect = processMCSubmit({
    optionsSel: '#nq-quiz-content .quiz-option',
    isCorrectBtn: btn => parseInt(btn.dataset.val, 10) === q.number,
    feedbackId: null,
    nextBtnId: 'nq-next',
    feedbackFn: null,
  });
  if (isCorrect) nqScore++;
}

function checkNumberQuiz() {
  const q = nqQueue[nqIdx];
  const input = document.getElementById('nq-input');
  if (!input) return;
  const result = checkAnswer(input.value, q.spanish);
  const fb = document.getElementById('nq-feedback');
  if (result.correct) {
    nqScore++;
    if (fb) {
      fb.innerHTML = `<div class="text-sm" style="color:var(--green)">${result.accentWarn ? t('correctAccent') + ' ' + q.spanish : t('correct')}</div>`;
      fb.style.display = 'block';
    }
  } else {
    if (fb) {
      fb.innerHTML = `<div class="text-sm" style="color:var(--red)">${t('incorrectAnswer')} <strong lang="es">${esc(q.spanish)}</strong></div>`;
      fb.style.display = 'block';
    }
  }
  input.disabled = true;
  document.getElementById('nq-next').style.display = 'flex';
}

function nextNumberQuiz() {
  nqIdx++;
  renderNumberQuizQuestion();
}

// Time Quiz
let tqQueue = [], tqIdx = 0, tqScore = 0;

function startTimeQuiz() {
  if (typeof NUMBER_PRACTICE_DATA === 'undefined' || !NUMBER_PRACTICE_DATA.TIME_EXPRESSIONS) return;
  tqQueue = shuffle(NUMBER_PRACTICE_DATA.TIME_EXPRESSIONS).slice(0, 10);
  tqIdx = 0;
  tqScore = 0;
  startSessionTimer();
  showScreen('time-quiz');
  renderTimeQuizQuestion();
}

function renderTimeQuizQuestion() {
  if (tqIdx >= tqQueue.length) {
    addXP(tqScore * 10);
    showSessionSummary({ type: 'Time Quiz', correct: tqScore, total: tqQueue.length, xpEarned: tqScore * 10 });
    goBack();
    return;
  }
  const q = tqQueue[tqIdx];
  const allTimes = NUMBER_PRACTICE_DATA.TIME_EXPRESSIONS;
  const wrongs = shuffle(allTimes.filter(t => t.time !== q.time)).slice(0, 3);
  const options = shuffle([q.spanish, ...wrongs.map(w => w.spanish)]);

  document.getElementById('tq-progress').textContent = `${tqIdx + 1} / ${tqQueue.length}`;
  document.getElementById('tq-next').style.display = 'none';
  document.getElementById('tq-quiz-content').innerHTML = `
    <p class="mb-1">How do you say <strong>${esc(q.time)}</strong> in Spanish?</p>
    <div class="quiz-options">
      ${options.map((o, i) => `<button class="quiz-option" data-action="answer-time-quiz" data-idx="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}
    </div>
  `;
}

function answerTimeQuizMC(idx) {
  selectMCOption('#tq-quiz-content', idx, submitTimeQuizMC);
}

function submitTimeQuizMC() {
  const q = tqQueue[tqIdx];
  const isCorrect = processMCSubmit({
    optionsSel: '#tq-quiz-content .quiz-option',
    isCorrectBtn: btn => btn.dataset.val === q.spanish,
    feedbackId: null,
    nextBtnId: 'tq-next',
    feedbackFn: null,
  });
  if (isCorrect) tqScore++;
}

function nextTimeQuiz() {
  tqIdx++;
  renderTimeQuizQuestion();
}
