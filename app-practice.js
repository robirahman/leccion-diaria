// ════════════════════════════════════════════════════════════
//  app-practice.js — Export/import, admin mode, practice
//  exercises, stats dashboard, unified review queue
// ════════════════════════════════════════════════════════════
'use strict';

// ── Practice Constants ──
const SCORE_EXCELLENT = 0.9;
const SCORE_GOOD = 0.7;
const TTS_SLOW_MULTIPLIER = 0.55;
const QUIZ_SIZE_DEFAULT = 10;
const QUIZ_SIZE_CLOZE = 8;
const DICTATION_PHRASE_SUPPLEMENT = 10;
const STATS_CATEGORY_LIMIT = 12;

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

function exportProgressCSV() {
  if (!progress) return;
  const rows = [];
  // Summary header + row
  rows.push(['Date', 'XP', 'Streak', 'VerbsMastered', 'VocabLearned', 'GrammarDone', 'PhrasesLearned', 'PlacementLevel'].join(','));
  rows.push([
    todayStr(),
    progress.xp || 0,
    progress.streak || 0,
    Object.keys(progress.verbMastery || {}).length,
    Object.keys(progress.vocabMastery || {}).length,
    Object.keys(progress.grammarDone || {}).length,
    Object.keys(progress.phraseMastery || {}).length,
    progress.placementLevel || 'none'
  ].join(','));
  rows.push('');
  // Detailed SRS data section
  const srsStores = [
    { name: 'verbFsrs', label: 'Verbs' },
    { name: 'vocabFsrs', label: 'Vocab' },
    { name: 'grammarFsrs', label: 'Grammar' },
    { name: 'phraseFsrs', label: 'Phrases' }
  ];
  for (const store of srsStores) {
    const data = progress[store.name];
    if (!data || Object.keys(data).length === 0) continue;
    rows.push(`Detailed ${store.label} SRS`);
    rows.push('Item,Stability,Difficulty,Reps,Lapses,LastReview,NextReview');
    for (const [key, card] of Object.entries(data)) {
      rows.push([
        '"' + key.replace(/"/g, '""') + '"',
        card.s != null ? card.s.toFixed(2) : '',
        card.d != null ? card.d.toFixed(2) : '',
        card.reps || 0,
        card.lapses || 0,
        card.last || '',
        card.next || ''
      ].join(','));
    }
    rows.push('');
  }
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leccion-diaria-${currentProfile}-${todayStr()}.csv`;
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
        // Validate imported data structure
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
          throw new Error('Invalid format');
        }
        // Sanitize numeric fields to prevent injection of negative/extreme values
        const base = newProgress();
        const merged = { ...base, ...data };
        if (typeof merged.xp !== 'number' || merged.xp < 0) merged.xp = base.xp;
        if (typeof merged.streak !== 'number' || merged.streak < 0) merged.streak = base.streak;
        if (typeof merged.longestStreak !== 'number' || merged.longestStreak < 0) merged.longestStreak = base.longestStreak;
        if (typeof merged.freezeTokens !== 'number' || merged.freezeTokens < 0) merged.freezeTokens = base.freezeTokens;
        // Ensure settings is an object and merge with defaults
        merged.settings = { ...base.settings, ...(typeof merged.settings === 'object' && merged.settings ? merged.settings : {}) };
        progress = merged;
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
    reader.onerror = () => {
      showModal(t('errorTitle'), `<p>${t('invalidFile')}</p>`, [
        { label: tBtn('ok'), action: 'close-modal', cls: 'btn-primary' },
      ]);
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
      ${count > 0 ? `<button class="btn btn-sm btn-outline" data-action="admin-clear-store" data-stores="${fs.stores}" class="text-incorrect">Clear</button>` : ''}
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
    container.innerHTML = '<p class="text-muted text-center">Loading…</p>';
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
  items = shuffle(items).slice(0, QUIZ_SIZE_DEFAULT);
  if (items.length === 0) return;
  mpQueue = items; mpIdx = 0; mpScore = 0; mpAnswered = false;
  showScreen('mp-drill');
  renderMPQuestion();
}

function renderMPQuestion() {
  if (mpIdx >= mpQueue.length) { showResults(mpScore, mpQueue.length, 'mp', 'Minimal Pairs'); return; }
  const item = mpQueue[mpIdx];
  mpAnswered = false;
  const mpProgEl = document.getElementById('mp-progress');
  if (mpProgEl) mpProgEl.textContent = `${mpIdx + 1} / ${mpQueue.length}`;
  const mpSentEl = document.getElementById('mp-sentence');
  if (mpSentEl) mpSentEl.innerHTML = esc(item.sentence).replace('___', '<strong>______</strong>');
  const mpOptsEl = document.getElementById('mp-options');
  if (mpOptsEl) mpOptsEl.innerHTML = item.options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-mp" data-idx="${i}">${esc(opt)}</button>`
  ).join('');
  const mpFbEl = document.getElementById('mp-feedback');
  if (mpFbEl) mpFbEl.style.display = 'none';
  const mpContrastEl = document.getElementById('mp-contrast');
  if (mpContrastEl) mpContrastEl.style.display = 'none';
  const mpNextEl = document.getElementById('mp-next');
  if (mpNextEl) mpNextEl.style.display = 'none';
}

function answerMP(idx) {
  if (mpAnswered) return;
  selectMCOption('#mp-options', idx);
  mpAnswered = true;
  const item = mpQueue[mpIdx];
  const answerLower = item.answer.toLowerCase();
  const answerStripped = stripAccents(answerLower);
  const displayMode = progress?.settings?.display || 'standard';
  const explanation = (displayMode === 'immersion' && item.explanationEs) ? item.explanationEs : item.explanation;
  const correct = processMCSubmit({
    optionsSel: '#mp-options .quiz-option',
    isCorrectBtn: btn => {
      const t = btn.textContent.trim().toLowerCase();
      return t === answerLower || stripAccents(t) === answerStripped;
    },
    feedbackId: 'mp-feedback', nextBtnId: 'mp-next',
    feedbackFn: ok => `<div class="${ok ? 'text-correct' : 'text-incorrect'}">${ok ? '\u2713' : '\u2717'} ${esc(explanation)}</div>`,
    fsrs: { store: progress.mpFsrs, masteryStore: progress.mpMastery, key: item.id },
  });
  if (correct) { mpScore++; addXP(XP_CORRECT); } else { addXP(XP_INCORRECT); }
  const contrast = document.getElementById('mp-contrast');
  if (item.contrast) { contrast.innerHTML = esc(item.contrast); contrast.style.display = 'block'; }
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
  ppQueue = shuffle(queue).slice(0, QUIZ_SIZE_DEFAULT);
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
  const ppProgEl = document.getElementById('pp-progress');
  if (ppProgEl) ppProgEl.textContent = `${ppIdx + 1} / ${ppQueue.length}`;
  const ppIpaEl = document.getElementById('pp-ipa');
  if (ppIpaEl) ppIpaEl.innerHTML = `${esc(q.item.ipaA)} vs ${esc(q.item.ipaB)}`;
  const ppTtsEl = document.getElementById('pp-tts');
  if (ppTtsEl) ppTtsEl.innerHTML =
    `<button class="btn btn-sm" data-action="speak" data-text="${esc(q.item.wordA)}" aria-label="Listen to ${esc(q.item.wordA)}">${esc(q.item.wordA)} &#9654;</button> ` +
    `<button class="btn btn-sm" data-action="speak" data-text="${esc(q.item.wordB)}" aria-label="Listen to ${esc(q.item.wordB)}">${esc(q.item.wordB)} &#9654;</button>`;
  const ppSentEl = document.getElementById('pp-sentence');
  if (ppSentEl) ppSentEl.innerHTML = esc(q.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([q.answer, q.wrong]);
  const ppOptsEl = document.getElementById('pp-options');
  if (ppOptsEl) ppOptsEl.innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-pp" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  const ppFbEl = document.getElementById('pp-feedback');
  if (ppFbEl) ppFbEl.style.display = 'none';
  const ppNextEl = document.getElementById('pp-next');
  if (ppNextEl) ppNextEl.style.display = 'none';
}

function answerPP(idx) {
  if (ppAnswered) return;
  selectMCOption('#pp-options', idx);
  ppAnswered = true;
  const q = ppQueue[ppIdx];
  const displayMode = progress?.settings?.display || 'standard';
  const meaningKey = q.side === 'A' ? 'meaningA' : 'meaningB';
  const meaningEsKey = q.side === 'A' ? 'meaningAEs' : 'meaningBEs';
  const wrongMeaningKey = q.side === 'A' ? 'meaningB' : 'meaningA';
  const explanation = `"${q.answer}" = ${displayMode === 'immersion' ? q.item[meaningEsKey] : q.item[meaningKey]}. ` +
    `"${q.wrong}" = ${displayMode === 'immersion' ? q.item[meaningEsKey === 'meaningAEs' ? 'meaningBEs' : 'meaningAEs'] : q.item[wrongMeaningKey]}.`;
  const correct = processMCSubmit({
    optionsSel: '#pp-options .quiz-option',
    isCorrectBtn: btn => btn.dataset.val === q.answer,
    feedbackId: 'pp-feedback', nextBtnId: 'pp-next',
    feedbackFn: ok => `<div class="${ok ? 'text-correct' : 'text-incorrect'}">${ok ? '\u2713' : '\u2717'} ${esc(explanation)}</div>`,
    fsrs: { store: progress.ppFsrs, masteryStore: progress.ppMastery, key: q.item.id },
  });
  if (correct) { ppScore++; addXP(XP_CORRECT); } else { addXP(XP_INCORRECT); }
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
  homQueue = shuffle(queue).slice(0, QUIZ_SIZE_DEFAULT);
  if (homQueue.length === 0) return;
  homIdx = 0; homScore = 0; homAnswered = false;
  showScreen('hom-drill');
  renderHomQuestion();
}

function renderHomQuestion() {
  if (homIdx >= homQueue.length) { showResults(homScore, homQueue.length, 'hom', 'Homophones'); return; }
  const q = homQueue[homIdx];
  homAnswered = false;
  const homProgEl = document.getElementById('hom-progress');
  if (homProgEl) homProgEl.textContent = `${homIdx + 1} / ${homQueue.length}`;
  const homPronEl = document.getElementById('hom-pronunciation');
  if (homPronEl) homPronEl.textContent = q.item.pronunciation;
  const homSentEl = document.getElementById('hom-sentence');
  if (homSentEl) homSentEl.innerHTML = esc(q.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([...new Set(q.options.map(o => o.toLowerCase().replace(/^¡|!$/g, '')))].map(o => {
    // Find original casing from the options
    return q.options.find(orig => orig.toLowerCase().replace(/^¡|!$/g, '') === o) || o;
  }));
  const homOptsEl = document.getElementById('hom-options');
  if (homOptsEl) homOptsEl.innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-hom" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  const homFbEl = document.getElementById('hom-feedback');
  if (homFbEl) homFbEl.style.display = 'none';
  const homNextEl = document.getElementById('hom-next');
  if (homNextEl) homNextEl.style.display = 'none';
}

function answerHom(idx) {
  if (homAnswered) return;
  selectMCOption('#hom-options', idx);
  homAnswered = true;
  const q = homQueue[homIdx];
  const answerLower = q.answer.toLowerCase();
  const answerStripped = stripAccents(answerLower);
  const displayMode = progress?.settings?.display || 'standard';
  const tip = (displayMode === 'immersion' && q.item.tipEs) ? q.item.tipEs : q.item.tip;
  const correct = processMCSubmit({
    optionsSel: '#hom-options .quiz-option',
    isCorrectBtn: btn => {
      const v = btn.dataset.val.toLowerCase();
      return v === answerLower || stripAccents(v) === answerStripped;
    },
    feedbackId: 'hom-feedback', nextBtnId: 'hom-next',
    feedbackFn: ok => {
      let html = `<div class="${ok ? 'text-correct' : 'text-incorrect'}">${ok ? '\u2713' : '\u2717'} ${esc(tip)}</div>`;
      if (q.item.regionalNote) {
        const note = (displayMode === 'immersion' && q.item.regionalNoteEs) ? q.item.regionalNoteEs : q.item.regionalNote;
        html += `<div class="text-muted text-sm mt-half">${esc(note)}</div>`;
      }
      return html;
    },
    fsrs: { store: progress.homFsrs, masteryStore: progress.homMastery, key: q.item.id },
  });
  if (correct) { homScore++; addXP(XP_CORRECT); } else { addXP(XP_INCORRECT); }
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
  const items = shuffle(CONNECTORS.filter(c => c.category === category)).slice(0, QUIZ_SIZE_DEFAULT);
  if (items.length === 0) return;
  connQueue = items; connIdx = 0; connScore = 0; connAnswered = false;
  showScreen('conn-drill');
  renderConnQuestion();
}

function renderConnQuestion() {
  if (connIdx >= connQueue.length) { showResults(connScore, connQueue.length, 'conn', 'Connectors'); return; }
  const item = connQueue[connIdx];
  connAnswered = false;
  const connProgEl = document.getElementById('conn-progress');
  if (connProgEl) connProgEl.textContent = `${connIdx + 1} / ${connQueue.length}`;
  const connSentEl = document.getElementById('conn-sentence');
  if (connSentEl) connSentEl.innerHTML = esc(item.sentence).replace('___', '<strong>______</strong>');
  const options = shuffle([...item.options]);
  const connOptsEl = document.getElementById('conn-options');
  if (connOptsEl) connOptsEl.innerHTML = options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-conn" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
  ).join('');
  const connFbEl = document.getElementById('conn-feedback');
  if (connFbEl) connFbEl.style.display = 'none';
  const connNextEl = document.getElementById('conn-next');
  if (connNextEl) connNextEl.style.display = 'none';
}

function answerConn(idx) {
  if (connAnswered) return;
  selectMCOption('#conn-options', idx);
  connAnswered = true;
  const item = connQueue[connIdx];
  const displayMode = progress?.settings?.display || 'standard';
  const explanation = (displayMode === 'immersion' && item.explanationEs) ? item.explanationEs : item.explanation;
  const correct = processMCSubmit({
    optionsSel: '#conn-options .quiz-option',
    isCorrectBtn: btn => btn.dataset.val === item.answer,
    feedbackId: 'conn-feedback', nextBtnId: 'conn-next',
    feedbackFn: ok => `<div class="${ok ? 'text-correct' : 'text-incorrect'}">${ok ? '\u2713' : '\u2717'} ${esc(explanation)}</div>`,
    fsrs: { store: progress.connFsrs, masteryStore: progress.connMastery, key: item.id },
  });
  if (correct) { connScore++; addXP(XP_CORRECT); } else { addXP(XP_INCORRECT); }
}

function nextConn() { connIdx++; renderConnQuestion(); }

// ── Sentence Construction ──

function startSentenceBuild() {
  if (typeof SENTENCE_CONSTRUCTION === 'undefined') {
    showToast('⏳', 'Still loading — please try again in a moment.');
    return;
  }
  let items = shuffle([...SENTENCE_CONSTRUCTION]).slice(0, QUIZ_SIZE_DEFAULT);
  if (items.length === 0) return;
  sbQueue = items; sbIdx = 0; sbScore = 0;
  showScreen('sentence-build');
  renderSBQuestion();
}

function renderSBQuestion() {
  if (sbIdx >= sbQueue.length) { showResults(sbScore, sbQueue.length, 'sb', 'Sentence Construction'); return; }
  const item = sbQueue[sbIdx];
  const sbProgEl = document.getElementById('sb-progress');
  if (sbProgEl) sbProgEl.textContent = `${sbIdx + 1} / ${sbQueue.length}`;
  const sbPromptEl = document.getElementById('sb-prompt');
  if (sbPromptEl) sbPromptEl.innerHTML = `${t('arrangeWords') || 'Arrange the words:'} <strong>${esc(item.english)}</strong>`;
  const bank = document.getElementById('sb-word-bank');
  const allWords = [...item.words, ...(item.distractors || [])];
  if (bank) bank.innerHTML = shuffle(allWords).map(w =>
    `<button class="sb-word-tile" data-action="tap-sb-word">${esc(w)}</button>`
  ).join('');
  const sbAnswerEl = document.getElementById('sb-answer-row');
  if (sbAnswerEl) sbAnswerEl.innerHTML = '';
  const sbFbEl = document.getElementById('sb-feedback');
  if (sbFbEl) sbFbEl.style.display = 'none';
  const sbCheckEl = document.getElementById('sb-check');
  if (sbCheckEl) sbCheckEl.style.display = 'flex';
  const sbNextEl = document.getElementById('sb-next');
  if (sbNextEl) sbNextEl.style.display = 'none';
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
    sbScore++; addXP(XP_CORRECT);
    if (fb) fb.innerHTML = `<div class="text-correct">✓ ${esc(item.sentence)}</div>`;
    if (fb && item.hint) fb.innerHTML += `<div class="text-muted text-sm">${esc(item.hint)}</div>`;
  } else {
    addXP(XP_INCORRECT);
    // Mark distractor tiles
    const distractors = new Set(item.distractors || []);
    tiles.forEach(t => { if (distractors.has(t.textContent)) t.classList.add('distractor-wrong'); });
    if (fb) fb.innerHTML = `<div class="text-incorrect">✗ ${esc(item.sentence)}</div>`;
    if (fb && item.hint) fb.innerHTML += `<div class="text-muted text-sm">${esc(item.hint)}</div>`;
  }
  if (fb) fb.style.display = 'block';
  const sbChkEl = document.getElementById('sb-check');
  if (sbChkEl) sbChkEl.style.display = 'none';
  const sbNxtEl = document.getElementById('sb-next');
  if (sbNxtEl) sbNxtEl.style.display = 'flex';
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
    ser_estar: t('topicSerEstar'), preterite_imperfect: t('topicPretImperfect'),
    subjunctive: t('topicSubjunctive'), pronouns: t('topicPronouns'),
    prepositions: t('topicPrepositions'), mixed: t('topicMixedGrammar'),
  };
  container.innerHTML = topics.map(tp => `
    <div class="card" data-action="start-cloze" data-topic="${tp}">
      <div class="card-title">${esc(topicLabels[tp] || tp)}</div>
    </div>
  `).join('') + `
    <div class="card" data-action="start-cloze" data-topic="all">
      <div class="card-title">${t('topicAllTopics')}</div>
    </div>
  `;
}

function startCloze(topic) {
  if (typeof CLOZE_PASSAGES === 'undefined') return;
  let items = topic === 'all' ? [...CLOZE_PASSAGES] : CLOZE_PASSAGES.filter(p => p.topic === topic);
  items = shuffle(items).slice(0, QUIZ_SIZE_CLOZE);
  if (items.length === 0) return;
  clozeQueue = items; clozeIdx = 0; clozeScore = 0;
  showScreen('cloze');
  renderClozePassage();
}

function renderClozePassage() {
  if (clozeIdx >= clozeQueue.length) { showResults(clozeScore, clozeQueue.length, 'cloze', 'Cloze Passages'); return; }
  const item = clozeQueue[clozeIdx];
  const clozeProgEl = document.getElementById('cloze-progress');
  if (clozeProgEl) clozeProgEl.textContent = `${clozeIdx + 1} / ${clozeQueue.length}`;
  const displayMode = progress?.settings?.display || 'standard';
  const clozeTitleEl = document.getElementById('cloze-title');
  if (clozeTitleEl) clozeTitleEl.textContent = displayMode === 'immersion' ? item.title : (item.titleEn || item.title);
  // Replace {N} tokens with input fields
  let html = esc(item.passage).replace(/\{(\d+)\}/g, (_, n) =>
    `<input class="cloze-blank" data-blank="${n}" size="10" autocomplete="off" autocapitalize="off">`
  );
  const clozeContEl = document.getElementById('cloze-container');
  if (clozeContEl) clozeContEl.innerHTML = html;
  const clozeFbEl = document.getElementById('cloze-feedback');
  if (clozeFbEl) { clozeFbEl.style.display = 'none'; clozeFbEl.innerHTML = ''; }
  const clozeChkEl = document.getElementById('cloze-check');
  if (clozeChkEl) clozeChkEl.style.display = 'flex';
  const clozeNxtEl = document.getElementById('cloze-next');
  if (clozeNxtEl) clozeNxtEl.style.display = 'none';
  // Focus first blank
  setTimeout(() => document.querySelector('.cloze-blank')?.focus(), 50);
}

function checkCloze() {
  const item = clozeQueue[clozeIdx];
  const blanks = document.querySelectorAll('.cloze-blank');
  let allCorrect = true;
  const explanations = [];

  blanks.forEach(input => {
    const n = parseInt(input.dataset.blank, 10);
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

  if (allCorrect) { clozeScore++; addXP(XP_CORRECT); }
  else { addXP(XP_INCORRECT); }

  const fb = document.getElementById('cloze-feedback');
  if (fb) {
    fb.innerHTML = `<div class="${allCorrect ? 'text-correct' : 'text-incorrect'}">${allCorrect ? '✓ All correct!' : '✗ Some blanks were incorrect.'}</div>` + explanations.join('');
    fb.style.display = 'block';
  }
  const clozeChk = document.getElementById('cloze-check');
  if (clozeChk) clozeChk.style.display = 'none';
  const clozeNxt = document.getElementById('cloze-next');
  if (clozeNxt) clozeNxt.style.display = 'flex';
  reviewItem(progress.clozeFsrs, progress.clozeMastery, item.id, allCorrect ? FSRS_GOOD : FSRS_AGAIN);
  saveProgress();
}

function nextCloze() { clozeIdx++; renderClozePassage(); }

// ── Translation Drills ──

function startTranslation() {
  if (typeof TRANSLATION_DRILLS === 'undefined') return;
  let items = shuffle([...TRANSLATION_DRILLS]).slice(0, QUIZ_SIZE_DEFAULT);
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
  const trProgEl = document.getElementById('tr-progress');
  if (trProgEl) trProgEl.textContent = `${trIdx + 1} / ${trQueue.length}`;
  const trPromptEl = document.getElementById('tr-prompt');
  if (item.direction === 'es-en') {
    if (trPromptEl) trPromptEl.innerHTML = `Translate to English: <strong>${esc(item.primary)}</strong>`;
    speak(item.primary);
  } else {
    if (trPromptEl) trPromptEl.innerHTML = `Translate to Spanish: <strong>${esc(item.english)}</strong>`;
  }
  const trInputEl = document.getElementById('tr-input');
  if (trInputEl) trInputEl.value = '';
  const trFbEl = document.getElementById('tr-feedback');
  if (trFbEl) trFbEl.style.display = 'none';
  const trNextEl = document.getElementById('tr-next');
  if (trNextEl) trNextEl.style.display = 'none';
  setTimeout(() => document.getElementById('tr-input')?.focus(), 50);
}

function checkTranslation() {
  const item = trQueue[trIdx];
  const trInEl = document.getElementById('tr-input');
  const input = trInEl ? trInEl.value.trim() : '';
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

  if (correct) { trScore++; addXP(accentWarn ? XP_ACCENT_WARN : XP_CORRECT); }
  else { addXP(XP_INCORRECT); }

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
  if (fb) { fb.innerHTML = html; fb.style.display = 'block'; }
  const trNxtEl = document.getElementById('tr-next');
  if (trNxtEl) trNxtEl.style.display = 'flex';
  if (trInEl) trInEl.readOnly = true;
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
    items = items.concat(shuffle(extras).slice(0, DICTATION_PHRASE_SUPPLEMENT));
  }
  items = shuffle(items).slice(0, QUIZ_SIZE_DEFAULT);
  if (items.length === 0) return;
  dictQueue = items; dictIdx = 0; dictScore = 0;
  showScreen('dictation');
  renderDictationQuestion();
}

function renderDictationQuestion() {
  if (dictIdx >= dictQueue.length) { showResults(dictScore, dictQueue.length, 'dict', 'Dictation'); return; }
  const dictProgEl = document.getElementById('dict-progress');
  if (dictProgEl) dictProgEl.textContent = `${dictIdx + 1} / ${dictQueue.length}`;
  const dictInEl = document.getElementById('dict-input');
  if (dictInEl) { dictInEl.value = ''; dictInEl.readOnly = false; }
  const dictFbEl = document.getElementById('dict-feedback');
  if (dictFbEl) dictFbEl.style.display = 'none';
  const dictNxtEl = document.getElementById('dict-next');
  if (dictNxtEl) dictNxtEl.style.display = 'none';
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
  const rate = (progress?.settings?.ttsRate || 1) * TTS_SLOW_MULTIPLIER;
  const orig = progress?.settings?.ttsRate;
  if (progress?.settings) progress.settings.ttsRate = rate;
  try {
    speak(item.sentence);
  } finally {
    if (progress?.settings) progress.settings.ttsRate = orig;
  }
}

function checkDictation() {
  const item = dictQueue[dictIdx];
  const dictInputEl = document.getElementById('dict-input');
  const input = dictInputEl ? dictInputEl.value.trim() : '';
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

  if (score >= SCORE_EXCELLENT) { dictScore++; addXP(XP_CORRECT); }
  else if (score >= SCORE_GOOD) { addXP(XP_ACCENT_WARN); }
  else { addXP(XP_INCORRECT); }

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
  if (fb) {
    fb.innerHTML = `<div class="${score >= SCORE_EXCELLENT ? 'text-correct' : score >= SCORE_GOOD ? '' : 'text-incorrect'}">${pct}% correct</div>` +
      `<div class="mt-1">${wordHtml}</div>` +
      `<div class="text-muted text-sm mt-1">${esc(item.english)}</div>` +
      (item.notes ? `<div class="text-muted text-sm">${esc(item.notes)}</div>` : '');
    fb.style.display = 'block';
  }
  if (dictInputEl) dictInputEl.readOnly = true;
  const dictNextBtn = document.getElementById('dict-next');
  if (dictNextBtn) dictNextBtn.style.display = 'flex';
  const rating = score >= SCORE_EXCELLENT ? FSRS_GOOD : score >= SCORE_GOOD ? FSRS_HARD : FSRS_AGAIN;
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

  const statsOv = document.getElementById('stats-overview');
  if (statsOv) statsOv.innerHTML = `
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
  const statsMast = document.getElementById('stats-mastery');
  if (statsMast) statsMast.innerHTML = masteryHtml;

  // Category progress
  let catHtml = '';
  if (typeof VOCAB_CATEGORIES !== 'undefined' && typeof VOCAB_DATA !== 'undefined') {
    buildVocabIndexes();
    const cats = Object.entries(VOCAB_CATEGORIES).slice(0, STATS_CATEGORY_LIMIT);
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
  renderSrsDashboard();
  renderSkillRadar();
}

// ════════════════════════════════════════
//  SKILL RADAR CHART
// ════════════════════════════════════════

function renderSkillRadar() {
  const canvas = document.getElementById('skill-radar-canvas');
  if (!canvas || !progress) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;
  const maxR = Math.min(cx, cy) - 40;

  // Compute mastery percentages for each domain
  const verbTotal = typeof VERB_DATA !== 'undefined' ? VERB_DATA.length : 100;
  const vocabTotal = typeof VOCAB_DATA !== 'undefined' ? VOCAB_DATA.length : 1000;
  const grammarTotal = typeof GRAMMAR_DATA !== 'undefined' ? GRAMMAR_DATA.length : 50;
  const phraseTotal = typeof PHRASES_DATA !== 'undefined' ? Object.keys(PHRASES_DATA).reduce((s, k) => s + (PHRASES_DATA[k]?.phrases?.length || 0), 0) : 100;
  const readingTotal = Math.max(Object.keys(progress.readingMastery || {}).length, 10);
  const listeningTotal = Math.max(Object.keys(progress.dictMastery || {}).length, 10);

  const domains = [
    { label: 'Verbs', value: Math.min(100, Math.round((Object.keys(progress.verbMastery).length / Math.max(verbTotal, 1)) * 100)) },
    { label: 'Vocab', value: Math.min(100, Math.round((Object.keys(progress.vocabMastery).length / Math.max(vocabTotal, 1)) * 100)) },
    { label: 'Grammar', value: Math.min(100, Math.round((Object.values(progress.grammarDone).filter(Boolean).length / Math.max(grammarTotal, 1)) * 100)) },
    { label: 'Phrases', value: Math.min(100, Math.round((Object.keys(progress.phraseMastery).length / Math.max(phraseTotal, 1)) * 100)) },
    { label: 'Listening', value: Math.min(100, Math.round((Object.keys(progress.dictMastery || {}).length / Math.max(listeningTotal, 1)) * 100)) },
    { label: 'Reading', value: Math.min(100, Math.round((Object.keys(progress.readingMastery || {}).length / Math.max(readingTotal, 1)) * 100)) },
  ];

  const n = domains.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2; // start from top

  // Read theme colors
  const cs = getComputedStyle(document.documentElement);
  const borderColor = cs.getPropertyValue('--border').trim() || '#2a3a5c';
  const textColor = cs.getPropertyValue('--text2').trim() || '#b8c0d4';
  const accentColor = cs.getPropertyValue('--accent').trim() || '#c7553b';
  const accentBg = cs.getPropertyValue('--accent-bg').trim() || 'rgba(199,85,59,0.15)';

  ctx.clearRect(0, 0, w, h);

  // Draw grid rings (25%, 50%, 75%, 100%)
  for (const pct of [0.25, 0.5, 0.75, 1.0]) {
    const r = maxR * pct;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = startAngle + i * angleStep;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw axis lines
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw data polygon (filled)
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    const r = maxR * (domains[i].value / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = accentBg;
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw data points
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    const r = maxR * (domains[i].value / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
  }

  // Draw labels
  ctx.fillStyle = textColor;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    const labelR = maxR + 22;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);
    ctx.fillText(`${domains[i].label} ${domains[i].value}%`, x, y);
  }
}

function renderStatsTenseMastery() {
  const el = document.getElementById('stats-tense-mastery');
  if (!el) return;
  const data = computeTenseMastery();
  if (!data.length) { el.innerHTML = '<p class="text-muted text-sm">No verb forms practiced yet.</p>'; return; }

  let html = '';
  for (const t of data) {
    const rc = t.avgRecall !== null
      ? getRecallColor(t.avgRecall)
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
      ? getRecallColor(lv.avgRecall)
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

function renderSrsDashboard() {
  const el = document.getElementById('stats-srs-dashboard');
  if (!el || !progress) return;

  const domains = [
    { name: 'Verbs', mastery: progress.verbMastery, fsrs: progress.verbFsrs },
    { name: 'Vocab', mastery: progress.vocabMastery, fsrs: progress.vocabFsrs },
    { name: 'Grammar', mastery: progress.grammarMastery || {}, fsrs: progress.grammarFsrs },
    { name: 'Phrases', mastery: progress.phraseMastery, fsrs: progress.phraseFsrs },
  ];

  const now = Date.now();
  let html = '<div style="font-size:0.7rem;display:flex;gap:0.75rem;margin-bottom:0.5rem;color:var(--text3)">'
    + '<span style="color:var(--text2)">New</span>'
    + '<span class="text-incorrect">Learning</span>'
    + '<span class="text-warning">Review</span>'
    + '<span class="text-correct">Mature</span></div>';

  for (const d of domains) {
    // Count cards in each SRS state
    let newCount = 0, learning = 0, review = 0, mature = 0;
    const keys = Object.keys(d.mastery || {});
    for (const key of keys) {
      const fsrsState = d.fsrs?.[key];
      if (!fsrsState || !fsrsState.s) {
        newCount++;
      } else {
        const m = masteryFromFsrs(fsrsState.s);
        if (m <= 1) learning++;
        else if (m <= 2) review++;
        else if (m <= 3) review++;
        else mature++;
      }
    }
    const total = keys.length || 1;
    if (keys.length === 0) continue;

    html += `<div style="margin-bottom:0.6rem">
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.2rem">
        <strong>${d.name}</strong>
        <span class="text-muted text-sm">${keys.length} cards</span>
      </div>
      <div class="mastery-bar" style="height:12px" title="New:${newCount} Learning:${learning} Review:${review} Mature:${mature}">
        <div style="width:${newCount/total*100}%;background:var(--text3)"></div>
        <div style="width:${learning/total*100}%;background:var(--red)"></div>
        <div style="width:${review/total*100}%;background:var(--yellow)"></div>
        <div style="width:${mature/total*100}%;background:var(--green)"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text3);margin-top:0.1rem">
        <span>${newCount}</span><span>${learning}</span><span>${review}</span><span>${mature}</span>
      </div>
    </div>`;
  }

  el.innerHTML = html || '<p class="text-muted text-sm">No items studied yet.</p>';
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
  const avgColor = getRecallColor(avgPct);

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
    <span class="text-correct">&#9632; Strong ${strong}</span>
    <span class="text-warning">&#9632; Fading ${fading}</span>
    <span class="text-incorrect">&#9632; Weak ${weak}</span>
  </div>`;

  for (const s of perStore) {
    const c = getRecallColor(s.avg);
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

let reviewQueue = [], reviewIdx = 0, reviewScore = 0, reviewSelected = -1, _currentRevQuiz = null;

function resetPracticeState() {
  mpQueue = []; mpIdx = 0; mpScore = 0; mpAnswered = false;
  ppQueue = []; ppIdx = 0; ppScore = 0; ppAnswered = false;
  homQueue = []; homIdx = 0; homScore = 0; homAnswered = false;
  connQueue = []; connIdx = 0; connScore = 0; connAnswered = false;
  sbQueue = []; sbIdx = 0; sbScore = 0;
  clozeQueue = []; clozeIdx = 0; clozeScore = 0;
  trQueue = []; trIdx = 0; trScore = 0;
  dictQueue = []; dictIdx = 0; dictScore = 0;
  reviewQueue = []; reviewIdx = 0; reviewScore = 0; reviewSelected = -1; _currentRevQuiz = null;
  _activeQuizScreen = null;
}

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
  const revProg = document.getElementById('rev-progress');
  if (revProg) revProg.innerHTML = `<div class="quiz-progress-fill" role="progressbar" aria-valuenow="${Math.round(reviewIdx/total*100)}" aria-valuemin="0" aria-valuemax="100" aria-label="Review progress" style="width:${reviewIdx/total*100}%"></div>`;
  const c = document.getElementById('rev-container');
  const revNext = document.getElementById('rev-next');
  if (revNext) revNext.style.display = 'none';
  const revAccents = document.getElementById('rev-accents');
  if (revAccents) revAccents.style.display = 'none';
  reviewSelected = -1;

  if (item.type === 'verb') {
    // Conjugation drill style
    const keys = Object.keys(progress.verbFsrs);
    const key = item.key;
    // key format: "hablar:present:0" or just the verb infinitive
    const parts = key.split(':');
    let verb, tense, person;
    if (parts.length >= 3) {
      person = parseInt(parts.pop(), 10);
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
    if (revAccents) revAccents.style.display = 'flex';
    document.getElementById('rev-drill-input')?.focus();
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
    _currentRevQuiz = q;
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
    // Accessibility: announce flipped card content to screen readers
    const backContent = document.getElementById('rev-card-back');
    if (backContent) {
      let announcer = document.getElementById('flip-announcer');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'flip-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('role', 'status');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
      }
      announcer.textContent = '';
      setTimeout(() => { announcer.textContent = backContent.textContent.trim(); }, 100);
    }
  }
}

function answerReviewMC(idx) {
  reviewSelected = idx;
  selectMCOption('#rev-container', idx, submitReviewMC);
}

function submitReviewMC() {
  const item = reviewQueue[reviewIdx];
  const q = _currentRevQuiz;
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
  if (fb) {
    fb.textContent = correct ? t('correct') : `${t('incorrectAnswer')} ${q.answer || q.options[q.correct]}`;
    if (q.explanation) fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(q.explanation)}</span>`;
    fb.style.display = 'block';
  }
  const mcSubmitBtn = document.querySelector('#rev-container .mc-submit');
  if (mcSubmitBtn) mcSubmitBtn.style.display = 'none';
  reviewItem(progress[item.fsrs], progress[item.mastery], item.key, correct ? FSRS_GOOD : FSRS_AGAIN);
  const revNextBtn = document.getElementById('rev-next');
  if (revNextBtn) revNextBtn.style.display = 'flex';
}

function checkReviewDrill() {
  const item = reviewQueue[reviewIdx];
  const parts = item.key.split(':');
  let verb, tense, person;
  if (parts.length >= 3) { person = parseInt(parts.pop(), 10); tense = parts.pop(); verb = parts.join(':'); }
  else { verb = item.key; tense = 'present'; person = 0; }
  const correct = typeof conjugate === 'function' ? conjugate(verb, tense, person) : '';
  const input = document.getElementById('rev-drill-input');
  if (!input) return;
  const result = checkAnswer(input.value, correct);
  trackError(item.key, result.correct);
  const fb = document.getElementById('rev-drill-fb');
  if (result.correct) {
    reviewScore++;
    if (fb) fb.innerHTML = result.accentWarn
      ? `<span class="text-correct">${t('correctAccent')} ${esc(correct)}</span>`
      : `<span class="text-correct">${t('correct')}</span>`;
    reviewItem(progress[item.fsrs], progress[item.mastery], item.key, result.accentWarn ? FSRS_HARD : FSRS_GOOD);
  } else {
    if (fb) fb.innerHTML = result.accentWarn
      ? `<span class="text-incorrect">${t('incorrectAccent')} ${esc(correct)}</span>`
      : `<span class="text-incorrect">${t('incorrectAnswer')} ${esc(correct)}</span>`;
    reviewItem(progress[item.fsrs], progress[item.mastery], item.key, FSRS_AGAIN);
  }
  if (fb) fb.style.display = 'block';
  input.readOnly = true;
  const drillBtn = document.querySelector('#rev-container [data-action="check-review-drill"]');
  if (drillBtn) drillBtn.style.display = 'none';
  const revNextEl = document.getElementById('rev-next');
  if (revNextEl) revNextEl.style.display = 'flex';
}

function rateReviewItem(rating) {
  const item = reviewQueue[reviewIdx];
  reviewItem(progress[item.fsrs], progress[item.mastery], item.key, rating);
  if (rating >= FSRS_GOOD) reviewScore++;
  const revRating = document.getElementById('rev-rating');
  if (revRating) revRating.style.display = 'none';
  reviewIdx++;
  renderReviewItem();
}

function nextReviewItem() {
  reviewIdx++;
  renderReviewItem();
}

