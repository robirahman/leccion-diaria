'use strict';

// ════════════════════════════════════════════════════════════
//  learn-vocab.js — Vocabulary indexes, browser, flashcards,
//  quiz (MC + production + gender), Learn New Words
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════
//  VOCABULARY MODULE
// ════════════════════════════════════════

let vocabLearnQueue = [];
let vocabLearnIdx = 0;
let vocabQuizQueue = [];
let vocabQuizIdx = 0;
let vocabQuizScore = 0;
let currentVocabCategory = null;

// ── Vocab Indexes (built once for O(1) lookups instead of O(n) .filter()) ──
const VOCAB_BY_CATEGORY = Object.create(null);
const VOCAB_BY_LEVEL = Object.create(null);
const VOCAB_BY_WORD = Object.create(null);
const VOCAB_CATEGORY_COUNTS = Object.create(null);
let _vocabIndexedLength = 0;

function buildVocabIndexes() {
  if (typeof VOCAB_DATA === 'undefined') return;
  if (_vocabIndexedLength === VOCAB_DATA.length) return;
  // Clear stale indexes before rebuilding
  for (const k in VOCAB_BY_CATEGORY) delete VOCAB_BY_CATEGORY[k];
  for (const k in VOCAB_BY_LEVEL) delete VOCAB_BY_LEVEL[k];
  for (const k in VOCAB_BY_WORD) delete VOCAB_BY_WORD[k];
  for (const k in VOCAB_CATEGORY_COUNTS) delete VOCAB_CATEGORY_COUNTS[k];
  for (const v of VOCAB_DATA) {
    const cat = v.category;
    (VOCAB_BY_CATEGORY[cat] ??= []).push(v);
    (VOCAB_BY_LEVEL[v.level] ??= []).push(v);
    VOCAB_BY_WORD[v.word.toLowerCase()] = v;
    // Pre-compute cognate flag to avoid levenshtein in placement loops
    if (v._cognate === undefined) v._cognate = isCognate(v.word, v.english);
  }
  for (const [cat, arr] of Object.entries(VOCAB_BY_CATEGORY)) {
    VOCAB_CATEGORY_COUNTS[cat] = arr.length;
  }
  _vocabIndexedLength = VOCAB_DATA.length;
}

function renderVocabHome() {
  if (typeof VOCAB_DATA === 'undefined' || typeof VOCAB_CATEGORIES === 'undefined') {
    showErrorState('vocab-categories', 'Vocabulary data is still loading. Please wait a moment and try again.', 'open-vocab');
    return;
  }
  buildVocabIndexes();
  const learned = Object.keys(progress.vocabMastery).length;
  document.getElementById('vocab-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${learned}</div><div class="stat-desc">${t('wordsLearned')}</div></div>
    <div class="stat-card"><div class="stat-num">${VOCAB_DATA.length}</div><div class="stat-desc">${t('totalWords')}</div></div>
  `;

  const grid = document.getElementById('vocab-categories');
  grid.innerHTML = Object.entries(VOCAB_CATEGORIES).map(([key, cat]) => {
    const count = VOCAB_CATEGORY_COUNTS[key] || 0;
    const catWords = VOCAB_BY_CATEGORY[key] || [];
    const masteredCount = catWords.filter(w => progress.vocabMastery[w.word]).length;
    const pct = count > 0 ? Math.round(masteredCount / count * 100) : 0;
    return `<div class="card" data-action="open-vocab-cat" data-cat="${key}">
      <div class="card-icon">${cat.icon || ''}</div>
      <div class="card-title text-sm">${esc(cat.title)}</div>
      <div class="card-subtitle text-xs">${masteredCount}/${count} ${t('words')}</div>
      ${masteredCount > 0 ? `<div class="quiz-progress-bar" style="height:3px;margin-top:4px"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>` : ''}
    </div>`;
  }).join('');
}

let vocabCatPage = 0;
const VOCAB_CAT_PAGE_SIZE = 50;

function openVocabCategory(cat, page) {
  if (typeof VOCAB_DATA === 'undefined') return;
  buildVocabIndexes();
  currentVocabCategory = cat;
  vocabCatPage = page || 0;
  const catInfo = VOCAB_CATEGORIES[cat];
  showScreen('vocab-cat');
  document.getElementById('vcat-title').textContent = catInfo ? `${catInfo.title} (${catInfo.titleEn})` : cat;

  const words = VOCAB_BY_CATEGORY[cat] || [];

  // Group by POS, show sub-headers when a category has multiple parts of speech
  const posLabels = { noun: 'Nouns', verb: 'Verbs', v: 'Verbs', adjective: 'Adjectives', adj: 'Adjectives', adverb: 'Adverbs', adv: 'Adverbs', phrase: 'Phrases', preposition: 'Prepositions', conjunction: 'Conjunctions', pronoun: 'Pronouns', interjection: 'Interjections', number: 'Numbers' };
  const posOrder = ['noun', 'verb', 'adjective', 'adj', 'adverb', 'adv', 'phrase', 'preposition', 'conjunction', 'pronoun', 'interjection', 'number'];
  const groups = {};
  for (const w of words) {
    const label = posLabels[w.pos] || 'Other';
    (groups[label] ??= []).push(w);
  }
  const groupKeys = Object.keys(groups);
  const showHeaders = groupKeys.length > 1;

  // Render in POS order
  const seen = new Set();
  const ordered = [];
  for (const p of posOrder) {
    const label = posLabels[p];
    if (label && groups[label] && !seen.has(label)) {
      seen.add(label);
      ordered.push([label, groups[label]]);
    }
  }
  for (const [label, items] of Object.entries(groups)) {
    if (!seen.has(label)) ordered.push([label, items]);
  }

  // Flatten for pagination
  const flat = [];
  for (const [label, items] of ordered) {
    if (showHeaders) flat.push({ _header: label });
    for (const w of items) flat.push(w);
  }

  const start = vocabCatPage * VOCAB_CAT_PAGE_SIZE;
  const pageItems = flat.slice(start, start + VOCAB_CAT_PAGE_SIZE);
  const hasMore = start + VOCAB_CAT_PAGE_SIZE < flat.length;

  const recallBadge = w => {
    const r = getRecallPct(progress.vocabFsrs, w.word);
    if (r === null) return '';
    const color = r >= 90 ? 'var(--green)' : r >= 70 ? 'var(--yellow)' : 'var(--red)';
    return `<span style="font-size:0.65rem;padding:0.05rem 0.35rem;background:${color}20;color:${color};border-radius:3px;margin-left:0.3rem">${r}%</span>`;
  };

  const renderWord = w => `
    <div class="card" style="padding:0.6rem 0.75rem">
      <div class="flex justify-between items-center">
        <div>
          ${w.gender ? `<span class="word-gender ${w.gender}" style="font-size:0.65rem;padding:0.05rem 0.3rem">${w.gender === 'f' ? 'la' : 'el'}</span>` : ''}
          <strong>${esc(w.word)}</strong>${recallBadge(w)}
          <span class="text-muted text-sm"> — ${esc(w.english)}</span>
        </div>
        <button class="tts-btn" data-action="speak" data-text="${esc(w.word)}" aria-label="Listen to ${esc(w.word)}">&#128266;</button>
      </div>
      ${w.example ? `<div class="text-sm text-muted mt-1">${esc(w.example)}</div>` : ''}
    </div>`;

  let html = '';
  for (const item of pageItems) {
    if (item._header) {
      html += `<h3 class="mt-2 mb-1" style="font-size:0.9rem;opacity:0.7">${item._header}</h3>`;
    } else {
      html += renderWord(item);
    }
  }
  if (hasMore) {
    html += `<button class="btn btn-secondary btn-block mt-1" data-action="vocab-cat-more" data-cat="${cat}" data-page="${vocabCatPage + 1}">Load More (${flat.length - start - VOCAB_CAT_PAGE_SIZE} remaining)</button>`;
  }
  if (vocabCatPage === 0) {
    document.getElementById('vcat-words').innerHTML = html;
  } else {
    // Remove previous "Load More" button and append
    const container = document.getElementById('vcat-words');
    const oldBtn = container.querySelector('[data-action="vocab-cat-more"]');
    if (oldBtn) oldBtn.remove();
    container.insertAdjacentHTML('beforeend', html);
  }
}

// ── Vocab Learn (Flashcards) ──
function startVocabLearn() {
  if (typeof VOCAB_DATA === 'undefined') return;
  buildVocabIndexes();
  const words = currentVocabCategory
    ? (VOCAB_BY_CATEGORY[currentVocabCategory] || [])
    : VOCAB_DATA;
  vocabLearnQueue = pickN(words, Math.min(15, words.length));
  vocabLearnIdx = 0;
  showScreen('vocab-learn');
  renderVocabLearnCard();
}

function renderVocabLearnCard() {
  if (vocabLearnIdx >= vocabLearnQueue.length) {
    switchTab('vocab');
    return;
  }
  const w = vocabLearnQueue[vocabLearnIdx];
  const card = document.getElementById('vocab-flashcard');
  card.classList.remove('flipped');
  document.getElementById('vocab-learn-rating').style.display = 'none';

  const genderEl = document.getElementById('vocl-gender');
  if (w.gender) {
    genderEl.textContent = w.gender === 'f' ? t('laFem') : t('elMasc');
    genderEl.className = `word-gender ${w.gender}`;
    genderEl.style.display = 'inline-block';
  } else {
    genderEl.style.display = 'none';
  }
  document.getElementById('vocl-word').textContent = w.word;
  document.getElementById('vocl-english').textContent = w.english;
  document.getElementById('vocl-example').textContent = w.example || '';
  document.getElementById('vocl-progress').textContent = `${vocabLearnIdx + 1} / ${vocabLearnQueue.length}`;
  speak(w.word);
}

function flipVocabCard() {
  document.getElementById('vocab-flashcard').classList.add('flipped');
  document.getElementById('vocab-learn-rating').style.display = 'flex';
}

function rateVocab(rating) {
  const w = vocabLearnQueue[vocabLearnIdx];
  reviewItem(progress.vocabFsrs, progress.vocabMastery, w.word, rating);
  addXP(rating >= 3 ? 5 : 2);
  vocabLearnIdx++;
  renderVocabLearnCard();
}

// ── Vocab Quiz ──
function startVocabQuiz() {
  if (typeof VOCAB_DATA === 'undefined') return;
  buildVocabIndexes();
  const pool = currentVocabCategory
    ? (VOCAB_BY_CATEGORY[currentVocabCategory] || [])
    : VOCAB_DATA;
  if (pool.length < 4) return;

  vocabQuizQueue = [];
  const words = pickN(pool, Math.min(10, pool.length));
  words.forEach((w, i) => {
    if (i % 3 === 2) {
      // ~30% production questions: type Spanish from English
      vocabQuizQueue.push({ word: w, correct: w.word, type: 'produce' });
    } else {
      const wrongs = pickN(pool.filter(x => x.word !== w.word), 3).map(x => x.english);
      const options = shuffle([w.english, ...wrongs]);
      vocabQuizQueue.push({ word: w, options, correct: w.english, type: 'mc' });
    }
  });
  vocabQuizIdx = 0;
  vocabQuizScore = 0;
  showScreen('vocab-quiz');
  renderVocabQuizQuestion();
}

function startQuickVocab() {
  if (typeof VOCAB_DATA === 'undefined' || VOCAB_DATA.length < 4) return;
  buildVocabIndexes();
  const level = progress.placementLevel || 'A1';
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const maxIdx = levelOrder.indexOf(level);
  const levelPool = [];
  for (let i = 0; i <= maxIdx; i++) {
    const lv = levelOrder[i];
    if (VOCAB_BY_LEVEL[lv]) levelPool.push(...VOCAB_BY_LEVEL[lv]);
  }
  const pool = levelPool.length >= 4 ? levelPool : VOCAB_DATA;
  currentVocabCategory = null;
  vocabQuizQueue = [];
  const words = pickN(pool, Math.min(10, pool.length));
  words.forEach((w, i) => {
    if (i % 3 === 2) {
      vocabQuizQueue.push({ word: w, correct: w.word, type: 'produce' });
    } else {
      const wrongs = pickN(pool.filter(x => x.word !== w.word), 3).map(x => x.english);
      const options = shuffle([w.english, ...wrongs]);
      vocabQuizQueue.push({ word: w, options, correct: w.english, type: 'mc' });
    }
  });
  vocabQuizIdx = 0;
  vocabQuizScore = 0;
  showScreen('vocab-quiz');
  renderVocabQuizQuestion();
}

function startLearnNewWords() {
  if (typeof VOCAB_DATA === 'undefined' || VOCAB_DATA.length < 4) return;
  buildVocabIndexes();
  const level = progress.placementLevel || 'A1';
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const maxIdx = Math.min(levelOrder.indexOf(level) + 1, levelOrder.length - 1);
  let pool = [];
  for (let i = 0; i <= maxIdx; i++) {
    if (VOCAB_BY_LEVEL[levelOrder[i]]) pool.push(...VOCAB_BY_LEVEL[levelOrder[i]]);
  }
  if (pool.length < 10) pool = VOCAB_DATA;

  const now = Date.now();
  const scored = pool.map(w => {
    const rec = progress.vocabFsrs?.[w.word];
    const r = rec?.s ? fsrsR(rec.s, (now - rec.lastRev) / 86400000) : 0;
    return { w, r };
  });
  scored.sort((a, b) => a.r - b.r);

  vocabLearnQueue = scored.slice(0, 10).map(s => s.w);
  vocabLearnIdx = 0;
  currentVocabCategory = null;
  showScreen('vocab-learn');
  renderVocabLearnCard();
}

function renderVocabQuizQuestion() {
  if (vocabQuizIdx >= vocabQuizQueue.length) {
    showResults(vocabQuizScore, vocabQuizQueue.length, 'vocab-quiz', t('vocabQuizLabel'));
    return;
  }
  const item = vocabQuizQueue[vocabQuizIdx];
  if (item.type === 'produce') { renderVocabQuizQuestion_Produce(); return; }
  document.getElementById('vocq-progress').textContent = `${vocabQuizIdx + 1} / ${vocabQuizQueue.length}`;
  const container = document.getElementById('vocq-container');
  document.getElementById('vocq-next').style.display = 'none';

  container.innerHTML = `
    <div class="quiz-question">${t('whatDoesMean')} <strong>${esc(item.word.word)}</strong> ${t('mean')}</div>
    <div class="quiz-options">
      ${item.options.map((opt, i) =>
        `<button class="quiz-option" data-action="answer-vocab-quiz" data-idx="${i}">${esc(opt)}</button>`
      ).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-vocab-quiz-mc" style="display:none">${tBtn('submit')}</button>
  `;
  speak(item.word.word);
}

function renderVocabQuizQuestion_Produce() {
  const item = vocabQuizQueue[vocabQuizIdx];
  document.getElementById('vocq-progress').textContent = `${vocabQuizIdx + 1} / ${vocabQuizQueue.length}`;
  const container = document.getElementById('vocq-container');
  document.getElementById('vocq-next').style.display = 'none';

  container.innerHTML = `
    <div class="quiz-question">${t('translateToSpanish')} <strong>"${esc(item.word.english)}"</strong> ${t('inSpanish')}</div>
    <div class="fib-container mt-1">
      <input type="text" class="quiz-input" id="vocq-produce-input" placeholder="${t('typeSpanishWord')}" autocomplete="off" autocapitalize="none">
      <button class="btn btn-primary" data-action="submit-vocab-quiz-produce">${tBtn('check')}</button>
    </div>
    <div class="accent-bar">
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="á">á</button>
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="é">é</button>
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="í">í</button>
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="ó">ó</button>
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="ú">ú</button>
      <button class="accent-btn" data-action="insert-accent-vocq" data-char="ñ">ñ</button>
    </div>
    <div class="quiz-feedback" id="vocq-produce-feedback" style="display:none"></div>
  `;
  document.getElementById('vocq-produce-input').focus();
}

function submitVocabQuizProduce() {
  const item = vocabQuizQueue[vocabQuizIdx];
  const input = document.getElementById('vocq-produce-input');
  if (!input || !input.value.trim()) return;
  const result = checkAnswer(input.value, item.correct);
  input.disabled = true;
  trackError(`vocab:${item.word.word}`, result.correct, 'vocab');
  const fb = document.getElementById('vocq-produce-feedback');
  fb.setAttribute('role', 'alert');
  if (result.correct) {
    vocabQuizScore++;
    fb.innerHTML = result.accentWarn
      ? `<span class="text-correct">${t('correctAccent')} ${esc(item.correct)}</span>`
      : `<span class="text-correct">${t('correct')}</span>`;
    reviewItem(progress.vocabFsrs, progress.vocabMastery, item.word.word, result.accentWarn ? FSRS_HARD : FSRS_GOOD);
    addXP(5);
  } else {
    fb.innerHTML = result.accentWarn
      ? `<span class="text-incorrect">${t('incorrectAccent')} ${esc(item.correct)}</span>`
      : `<span class="text-incorrect">${t('incorrectAnswer')} ${esc(item.correct)}</span>`;
    reviewItem(progress.vocabFsrs, progress.vocabMastery, item.word.word, FSRS_AGAIN);
    addXP(1);
  }
  fb.style.display = 'block';
  document.getElementById('vocq-next').style.display = 'flex';
}

function answerVocabQuizMC(idx) {
  selectMCOption('#vocq-container', idx);
}

function submitVocabQuizMC() {
  const selectedBtn = document.querySelector('#vocq-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const item = vocabQuizQueue[vocabQuizIdx];
  const selected = item.options[idx];
  const btns = document.querySelectorAll('#vocq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (item.options[i] === item.correct) btn.classList.add('correct');
    if (i === idx && selected !== item.correct) btn.classList.add('incorrect');
  });
  const vocCorrect = selected === item.correct;
  trackError(`vocab:${item.word.word}`, vocCorrect, 'vocab');
  if (vocCorrect) {
    vocabQuizScore++;
    reviewItem(progress.vocabFsrs, progress.vocabMastery, item.word.word, FSRS_GOOD);
    addXP(5);
  } else {
    reviewItem(progress.vocabFsrs, progress.vocabMastery, item.word.word, FSRS_AGAIN);
    addXP(1);
  }
  const submitBtn = document.querySelector('#vocq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  document.getElementById('vocq-next').style.display = 'flex';
}

function submitGenderQuizMC() {
  const selectedBtn = document.querySelector('#vocq-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const item = vocabQuizQueue[vocabQuizIdx];
  const correctIdx = item.correct === item.options[0] ? 0 : 1;
  const btns = document.querySelectorAll('#vocq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correctIdx) btn.classList.add('correct');
    if (i === idx && idx !== correctIdx) btn.classList.add('incorrect');
  });
  if (idx === correctIdx) { vocabQuizScore++; addXP(5); } else { addXP(1); }
  const submitBtn = document.querySelector('#vocq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  document.getElementById('vocq-next').style.display = 'flex';
}

function nextVocabQuiz() {
  vocabQuizIdx++;
  renderVocabQuizQuestion();
}

// ── Gender Quiz ──
function startGenderQuiz() {
  if (typeof VOCAB_DATA === 'undefined') return;
  buildVocabIndexes();
  const pool = (currentVocabCategory
    ? (VOCAB_BY_CATEGORY[currentVocabCategory] || [])
    : VOCAB_DATA).filter(v => v.gender);
  if (pool.length < 4) return;

  vocabQuizQueue = pickN(pool, Math.min(10, pool.length)).map(w => ({
    word: w,
    options: [t('elMasc'), t('laFem')],
    correct: w.gender === 'm' ? t('elMasc') : t('laFem'),
    type: 'gender',
  }));
  vocabQuizIdx = 0;
  vocabQuizScore = 0;
  showScreen('vocab-quiz');
  renderVocabQuizQuestion_Gender();
}

function renderVocabQuizQuestion_Gender() {
  if (vocabQuizIdx >= vocabQuizQueue.length) {
    showResults(vocabQuizScore, vocabQuizQueue.length, 'gender-quiz', t('genderQuizLabel'));
    return;
  }
  const item = vocabQuizQueue[vocabQuizIdx];
  document.getElementById('vocq-progress').textContent = `${vocabQuizIdx + 1} / ${vocabQuizQueue.length}`;
  const container = document.getElementById('vocq-container');
  document.getElementById('vocq-next').style.display = 'none';

  container.innerHTML = `
    <div class="quiz-question">${t('elOrLa')} <strong>_____ ${esc(item.word.word)}</strong></div>
    <div class="quiz-options">
      <button class="quiz-option" data-action="answer-vocab-quiz" data-idx="0">${t('elMasc')}</button>
      <button class="quiz-option" data-action="answer-vocab-quiz" data-idx="1">${t('laFem')}</button>
    </div>
    <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-vocab-quiz-mc" style="display:none">${tBtn('submit')}</button>
  `;
}

