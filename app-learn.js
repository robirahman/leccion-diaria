// ════════════════════════════════════════════════════════════
//  app-learn.js — Today, Verbs, Vocab, Grammar, Phrases,
//                 Numbers, Culture, Dialogue, Results,
//                 Placement Test
// ════════════════════════════════════════════════════════════
'use strict';

// ════════════════════════════════════════
//  TODAY SCREEN
// ════════════════════════════════════════

function getDateSeed(dateStr) {
  // Deterministic seed from date string for consistent daily picks
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
  return Math.abs(hash);
}

function renderWordOfTheDay() {
  const div = document.getElementById('today-wotd');
  if (!div || typeof VOCAB_DATA === 'undefined') return;
  buildVocabIndexes();
  const today = new Date().toISOString().slice(0, 10);
  const level = progress.placementLevel || 'A1';
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const maxIdx = levelOrder.indexOf(level);
  // Build pool at or one level above user's level for challenge
  const targetLevels = [level];
  if (maxIdx < 5) targetLevels.push(levelOrder[maxIdx + 1]);
  let pool = [];
  for (const lv of targetLevels) {
    if (VOCAB_BY_LEVEL[lv]) pool.push(...VOCAB_BY_LEVEL[lv]);
  }
  if (pool.length === 0) pool = VOCAB_DATA;
  // Filter to words with examples
  const withExamples = pool.filter(w => w.example);
  if (withExamples.length > 0) pool = withExamples;
  const seed = getDateSeed(today);
  const word = pool[seed % pool.length];
  const gender = word.gender ? (word.gender === 'm' ? 'el ' : 'la ') : '';
  div.innerHTML = `
    <h2>Word of the Day</h2>
    <div class="card wotd-card">
      <div class="wotd-word">${gender}<strong>${esc(word.word)}</strong></div>
      <div class="wotd-english">${esc(word.english)}</div>
      ${word.example ? `<div class="wotd-example text-muted text-sm mt-1"><em>"${esc(word.example)}"</em></div>` : ''}
      ${word.exampleEn ? `<div class="text-muted text-sm">"${esc(word.exampleEn)}"</div>` : ''}
      <button class="btn btn-sm btn-secondary mt-1" data-action="speak-wotd" data-word="${esc(word.word)}" aria-label="Listen to ${esc(word.word)}">Listen</button>
    </div>
  `;
}

function renderDailyChallenge() {
  const div = document.getElementById('today-challenge');
  if (!div) return;
  const today = new Date().toISOString().slice(0, 10);
  const completed = progress.dailyChallengeDate === today;
  // Rotate topics by day of week
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const topics = [
    { label: 'Conjugation Challenge', action: 'start-verb-drill', icon: '🏃' },
    { label: 'Vocabulary Challenge', action: 'start-quick-vocab', icon: '📚' },
    { label: 'Translation Challenge', action: 'start-translation', icon: '🌍' },
    { label: 'Grammar Challenge', action: 'start-grammar-quiz-random', icon: '📝' },
    { label: 'Dictation Challenge', action: 'start-dictation', icon: '🎧' },
    { label: 'Phrase Challenge', action: 'start-phrase-quiz-daily', icon: '💬' },
    { label: 'Mixed Challenge', action: 'start-verb-drill', icon: '🎯' },
  ];
  const topic = topics[dayOfWeek];
  div.innerHTML = `
    <h2>Daily Challenge</h2>
    <div class="card${completed ? ' completed' : ''}" data-action="${completed ? '' : topic.action}">
      <div class="card-title">${topic.icon} ${topic.label}</div>
      <div class="card-subtitle">${completed ? 'Completed today!' : 'Complete for bonus XP'}</div>
    </div>
  `;
}

function renderToday() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? '¡Buenos días!' : hour < 18 ? '¡Buenas tardes!' : '¡Buenas noches!';
  document.getElementById('today-greeting').textContent = greet;
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Section headers (navigate from known container IDs to their sibling h2)
  const continueH2 = document.getElementById('today-continue')?.parentElement?.querySelector('h2');
  if (continueH2) continueH2.textContent = t('continueLearning');
  const reviewH2 = document.getElementById('today-review')?.parentElement?.querySelector('h2');
  if (reviewH2) reviewH2.textContent = t('dueForReview');
  const practiceH2 = document.getElementById('today-practice')?.parentElement?.querySelector('h2');
  if (practiceH2) practiceH2.textContent = t('dailyPractice');

  // Stats cards
  const verbsLearned = Object.keys(progress.verbMastery).length;
  const vocabLearned = Object.keys(progress.vocabMastery).length;
  const grammarDone = Object.values(progress.grammarDone).filter(Boolean).length;
  document.getElementById('today-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${progress.xp}</div><div class="stat-desc">${t('totalXP')}</div></div>
    <div class="stat-card"><div class="stat-num">${progress.streak}</div><div class="stat-desc">${t('dayStreak')}</div></div>
    <div class="stat-card"><div class="stat-num">${verbsLearned}</div><div class="stat-desc">${tBtn('verbs')}</div></div>
    <div class="stat-card"><div class="stat-num">${vocabLearned}</div><div class="stat-desc">${t('words')}</div></div>
  `;

  // CEFR mastery
  renderCefrMasteryCompact(document.getElementById('today-cefr-mastery'));

  // Word of the Day
  renderWordOfTheDay();

  // Daily Challenge
  renderDailyChallenge();

  // Continue learning
  const cont = document.getElementById('today-continue');
  cont.innerHTML = `
    <div class="card" data-action="switch-tab" data-tab="verbs">
      <div class="card-title">${t('verbConjugation')}</div>
      <div class="card-subtitle">${verbsLearned} ${t('formsPracticedLC')}</div>
    </div>
    <div class="card" data-action="switch-tab" data-tab="vocab">
      <div class="card-title">${t('vocabulary')}</div>
      <div class="card-subtitle">${vocabLearned} ${t('wordsLearnedLC')}</div>
    </div>
    <div class="card" data-action="switch-tab" data-tab="grammar">
      <div class="card-title">${tBtn('grammar')}</div>
      <div class="card-subtitle">${grammarDone} ${t('lessonsCompleted')}</div>
    </div>
  `;

  // Due for review — detailed per-category breakdown
  const dueCategories = [
    { label: 'verb forms',   icon: '🏃', stores: ['verbFsrs'] },
    { label: 'vocabulary',   icon: '📚', stores: ['vocabFsrs'] },
    { label: 'grammar',      icon: '📝', stores: ['grammarFsrs'] },
    { label: 'phrases',      icon: '💬', stores: ['phraseFsrs'] },
    { label: 'exercises',    icon: '✏️', stores: ['mpFsrs','ppFsrs','homFsrs','connFsrs','sentenceFsrs','clozeFsrs','translationFsrs','dictFsrs','readingFsrs'] },
  ];
  let totalDue = 0;
  const dueLines = [];
  for (const cat of dueCategories) {
    let catDue = 0;
    for (const store of cat.stores) {
      if (progress[store]) catDue += getDueItems(progress[store], Object.keys(progress[store])).length;
    }
    if (catDue > 0) dueLines.push({ ...cat, count: catDue });
    totalDue += catDue;
  }
  const reviewDiv = document.getElementById('today-review');
  if (totalDue > 0) {
    const breakdown = dueLines.map(d =>
      `<li><span class="due-icon">${d.icon}</span><span class="due-count">${d.count}</span> ${d.label}</li>`
    ).join('');
    reviewDiv.innerHTML = `
      <div class="card" data-action="start-review">
        <div class="card-title">${t('dueForReview')}</div>
        <ul class="due-breakdown mt-1">
          ${breakdown}
          <li class="due-total"><span class="due-icon"></span><span class="due-count">${totalDue}</span> total — Start Review</li>
        </ul>
      </div>
    `;
  } else {
    reviewDiv.innerHTML = `<p class="text-muted text-sm">${t('allCaughtUp')}</p>`;
  }

  // Daily practice
  document.getElementById('today-practice').innerHTML = `
    <div class="card" data-action="start-verb-drill">
      <div class="card-title">${t('quickDrill')}</div>
      <div class="card-subtitle">${t('quickDrillDesc')}</div>
    </div>
    <div class="card" data-action="start-quick-vocab">
      <div class="card-title">${t('quickVocab')}</div>
      <div class="card-subtitle">${t('quickVocabDesc')}</div>
    </div>
    <div class="card" data-action="start-learn-new">
      <div class="card-title">Learn New Words</div>
      <div class="card-subtitle">Study your weakest or unseen vocabulary</div>
    </div>
  `;

  // Focus areas (weak items)
  renderTodayFocus();
}

// ════════════════════════════════════════
//  VERB MODULE
// ════════════════════════════════════════

let verbLearnQueue = [];
let verbLearnIdx = 0;
let verbDrillQueue = [];
let verbDrillIdx = 0;
let verbDrillScore = 0;
let verbQuizQueue = [];
let verbQuizIdx = 0;
let verbQuizScore = 0;

// ── Verb Pattern Metadata ──
const VERB_PATTERNS = {
  'e-ie': {
    label: 'e → ie', labelEs: 'e → ie',
    desc: 'Stem-changing: e → ie in stressed syllables',
    descEs: 'Cambio de raíz: e → ie en sílabas acentuadas',
    filter: v => v.stemChange === 'e>ie',
    tenses: ['present', 'subjunctive_present'],
    hint: (v) => `${v.infinitive}: e→ie in stressed syllables. Nosotros/vosotros keep "e".`,
  },
  'o-ue': {
    label: 'o → ue', labelEs: 'o → ue',
    desc: 'Stem-changing: o → ue in stressed syllables',
    descEs: 'Cambio de raíz: o → ue en sílabas acentuadas',
    filter: v => v.stemChange === 'o>ue',
    tenses: ['present', 'subjunctive_present'],
    hint: (v) => `${v.infinitive}: o→ue in stressed syllables. Nosotros/vosotros keep "o".`,
  },
  'e-i': {
    label: 'e → i', labelEs: 'e → i',
    desc: 'Stem-changing: e → i (all -ir verbs)',
    descEs: 'Cambio de raíz: e → i (verbos en -ir)',
    filter: v => v.stemChange === 'e>i',
    tenses: ['present', 'preterite', 'subjunctive_present'],
    hint: (v) => `${v.infinitive}: e→i. Unlike e→ie, this also changes in preterite (3rd person).`,
  },
  'go-verbs': {
    label: 'Yo "go"', labelEs: 'Yo "go"',
    desc: 'Irregular yo form ending in -go',
    descEs: 'Forma irregular de yo terminada en -go',
    filter: v => ['tener','hacer','poner','salir','venir','decir','traer','caer','oír'].includes(v.infinitive),
    tenses: ['present', 'subjunctive_present'],
    hint: (v) => `${v.infinitive}: irregular yo form (-go). The "go" carries into all subjunctive forms.`,
  },
  'fully-irregular': {
    label: 'Fully Irregular', labelEs: 'Completamente irregulares',
    desc: 'ser, estar, ir, haber — unique conjugation patterns',
    descEs: 'ser, estar, ir, haber — patrones únicos',
    filter: v => ['ser','estar','ir','haber'].includes(v.infinitive),
    tenses: ['present', 'preterite', 'imperfect', 'subjunctive_present'],
    hint: (v) => `${v.infinitive}: fully irregular — must be memorized.`,
  },
  'irregular-stems': {
    label: 'Irregular Future/Cond.', labelEs: 'Futuro/Cond. irregular',
    desc: 'Irregular stems in future and conditional tenses',
    descEs: 'Raíces irregulares en futuro y condicional',
    filter: v => ['tener','poder','saber','hacer','decir','salir','venir','poner','querer','haber'].includes(v.infinitive),
    tenses: ['future', 'conditional'],
    hint: (v) => {
      const stems = {tener:'tendr-',poder:'podr-',saber:'sabr-',hacer:'har-',decir:'dir-',salir:'saldr-',venir:'vendr-',poner:'pondr-',querer:'querr-',haber:'habr-'};
      return `${v.infinitive}: irregular stem "${stems[v.infinitive] || '?'}" in future/conditional.`;
    },
  },
};

// Get a teaching hint for a verb/tense combination
function buildVerbExplanation(verb, tense, personIdx, correctForm) {
  if (!verb) return '';
  const meta = TENSE_META[tense];
  if (!meta) return '';
  const tenseName = meta.labelEn;
  const personKey = PERSONS[personIdx] || 'yo';
  const personLabel = PERSON_LABELS[personKey] || personKey;

  // Compound tenses: haber + participle
  if (meta.compound) {
    const participle = getParticiple(verb.infinitive.replace(/se$/, ''));
    return `${tenseName}: haber (${meta.auxTense}) + past participle (${participle}). ${personLabel}: ${correctForm}.`;
  }
  // Progressive tenses: estar + gerund
  if (meta.progressive) {
    const gerund = getGerund(verb.infinitive.replace(/se$/, ''));
    return `${tenseName}: estar (${meta.auxTense}) + gerund (${gerund}). ${personLabel}: ${correctForm}.`;
  }
  // Reflexive note
  const reflexNote = verb.infinitive.endsWith('se') ? ' Reflexive: pronoun + conjugation.' : '';
  // Irregular future/conditional stems
  const base = verb.infinitive.replace(/se$/, '');
  if (['future', 'conditional'].includes(tense) && IRREGULAR_FUTURE_STEMS[base]) {
    const stem = IRREGULAR_FUTURE_STEMS[base];
    return `Irregular ${tenseName.toLowerCase()} stem: ${stem}-.${reflexNote} ${personLabel}: ${correctForm}.`;
  }
  // Strong irregular preterites
  if (tense === 'preterite' && verb.type === 'irregular') {
    const pretStems = {tener:'tuv',estar:'estuv',hacer:'hic/hiz',poder:'pud',poner:'pus',saber:'sup',venir:'vin',querer:'quis',decir:'dij',traer:'traj',conducir:'conduj'};
    if (pretStems[base]) return `Irregular preterite stem: ${pretStems[base]}-.${reflexNote} ${personLabel}: ${correctForm}.`;
  }
  // Stem-changing verbs
  if (verb.stemChange) {
    const pattern = verb.stemChange.replace('>', '→');
    const isBoot = BOOT_PERSONS.includes(personIdx);
    if (['present', 'subjunctive_present'].includes(tense) && isBoot) {
      return `Stem change ${pattern} in stressed syllables (boot pattern: yo/tú/él/ellos).${reflexNote} ${personLabel}: ${correctForm}.`;
    }
    if (['present', 'subjunctive_present'].includes(tense) && !isBoot) {
      return `Stem change ${pattern} does NOT apply to ${personLabel} (outside boot pattern). ${correctForm}.`;
    }
    if (tense === 'preterite' && ['e>i', 'o>u'].includes(verb.stemChange) && [2, 5].includes(personIdx)) {
      return `${pattern} stem change applies in 3rd person preterite.${reflexNote} ${personLabel}: ${correctForm}.`;
    }
  }
  // Fully irregular
  if (verb.type === 'irregular') {
    return `${verb.infinitive} is irregular in the ${tenseName.toLowerCase()}. ${personLabel}: ${correctForm} (must be memorized).`;
  }
  // Regular verbs — show stem + ending
  if (verb.type === 'regular' || verb.type === 'reflexive') {
    const group = verb.group || base.slice(-2);
    const endings = REGULAR_ENDINGS[tense];
    if (endings && endings[group]) {
      const ending = endings[group][personIdx];
      const stem = base.slice(0, -2);
      return `Regular -${group} verb. ${tenseName} ${personLabel}: stem (${stem}) + -${ending} = ${correctForm}.`;
    }
  }
  return `${personLabel}: ${correctForm}.`;
}

let patternDrillPattern = null; // current pattern key for drill

function renderVerbsHome() {
  const learned = Object.keys(progress.verbMastery).length;
  const total = typeof VERB_DATA !== 'undefined' ? VERB_DATA.length * 6 : 0; // 6 persons
  document.getElementById('verbs-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${learned}</div><div class="stat-desc">${t('formsPracticed')}</div></div>
    <div class="stat-card"><div class="stat-num">${typeof VERB_DATA !== 'undefined' ? VERB_DATA.length : 0}</div><div class="stat-desc">${t('totalVerbs')}</div></div>
  `;

  // Tense mastery breakdown
  const el = document.getElementById('verbs-tense-mastery');
  if (el) renderTenseMasteryBars(el, computeTenseMastery());
}

function renderTenseMasteryBars(el, tenseData) {
  if (!tenseData.length) { el.innerHTML = ''; return; }

  // Group by mood
  const indicative = [], subjunctive = [], imperative = [], compound = [], progressive = [];
  for (const t of tenseData) {
    if (t.compound) compound.push(t);
    else if (t.progressive) progressive.push(t);
    else if (t.tense.startsWith('subjunctive')) subjunctive.push(t);
    else if (t.tense.startsWith('imperative')) imperative.push(t);
    else indicative.push(t);
  }

  const renderGroup = (title, items) => {
    if (!items.length) return '';
    let html = `<div class="text-sm text-muted" style="margin:0.5rem 0 0.25rem;font-weight:600">${title}</div>`;
    for (const t of items) {
      const rc = t.avgRecall !== null
        ? (t.avgRecall >= 90 ? 'var(--green)' : t.avgRecall >= 70 ? 'var(--yellow)' : 'var(--red)')
        : 'var(--text3)';
      const recallText = t.avgRecall !== null ? `${t.avgRecall}%` : '—';
      html += `<div class="stat-row" style="margin-bottom:0.2rem">
        <span class="stat-label" style="min-width:8rem;font-size:0.8rem">${t.label}</span>
        <span style="font-size:0.65rem;color:var(--text3);min-width:2rem">${t.level}</span>
        <span style="font-size:0.75rem;min-width:2.5rem;text-align:right;color:${rc}">${recallText}</span>
        <span class="text-muted" style="font-size:0.7rem;min-width:2rem;text-align:right">${t.practiced}</span>
      </div>`;
    }
    return html;
  };

  el.innerHTML = `<div class="card mt-1" style="padding:0.75rem">
    <div class="card-title mb-1" style="font-size:0.85rem">Tense Mastery</div>
    <div class="stat-row" style="margin-bottom:0.3rem;font-size:0.65rem;color:var(--text3)">
      <span style="min-width:8rem">Tense</span>
      <span style="min-width:2rem">Lvl</span>
      <span style="min-width:2.5rem;text-align:right">Recall</span>
      <span style="min-width:2rem;text-align:right">Forms</span>
    </div>
    ${renderGroup('Indicative', indicative)}
    ${renderGroup('Subjunctive', subjunctive)}
    ${renderGroup('Imperative', imperative)}
    ${renderGroup('Compound', compound)}
    ${renderGroup('Progressive', progressive)}
  </div>`;
}

// ── Verb Learn (Flashcards) ──
function startVerbLearn() {
  if (typeof VERB_DATA === 'undefined') return;
  // Use all simple tenses (no compound/progressive for flashcards), filtered by settings
  const tenses = getActiveTenses(Object.keys(TENSE_META).filter(t =>
    !TENSE_META[t].compound && !TENSE_META[t].progressive
  ));
  verbLearnQueue = [];
  const verbs = pickN(VERB_DATA, 10);
  verbs.forEach(v => {
    const tense = pick(tenses);
    const isImperative = tense === TENSE_IMPERATIVE_AFF || tense === TENSE_IMPERATIVE_NEG;
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const useSeForm = (tense === TENSE_SUBJUNCTIVE_IMPERFECT) && shouldUseSeForm();
    verbLearnQueue.push({ verb: v, tense, person, useSeForm });
  });
  verbLearnIdx = 0;
  showScreen('verb-learn');
  renderVerbLearnCard();
}

function renderVerbLearnCard() {
  if (verbLearnIdx >= verbLearnQueue.length) {
    showScreen('today');
    renderToday();
    return;
  }
  const item = verbLearnQueue[verbLearnIdx];
  const card = document.getElementById('verb-flashcard');
  card.classList.remove('flipped');
  document.getElementById('verb-learn-rating').style.display = 'none';

  document.getElementById('vl-verb').textContent = item.verb.infinitive;
  document.getElementById('vl-english').textContent = item.verb.english;
  document.getElementById('vl-prompt').textContent = `${TENSE_META[item.tense]?.label || item.tense} — ${PERSON_LABELS[PERSONS[item.person]]}`;

  const answer = conjugate(item.verb.infinitive, item.tense, item.person, item.useSeForm);
  document.getElementById('vl-answer').textContent = answer;

  // Build mini conjugation table for the back
  const all = conjugateAll(item.verb.infinitive, item.tense, item.useSeForm);
  document.getElementById('vl-table').innerHTML = all.map((form, i) =>
    `<div class="${i === item.person ? 'highlight' : ''}" style="font-size:0.85rem">${PERSON_LABELS[PERSONS[i]]}: ${form}</div>`
  ).join('');

  document.getElementById('verb-learn-progress').textContent = `${verbLearnIdx + 1} / ${verbLearnQueue.length}`;
  speak(answer);
}

function flipVerbCard() {
  document.getElementById('verb-flashcard').classList.add('flipped');
  document.getElementById('verb-learn-rating').style.display = 'flex';
}

function rateVerb(rating) {
  const item = verbLearnQueue[verbLearnIdx];
  const key = `${item.verb.infinitive}:${item.tense}:${item.person}`;
  reviewItem(progress.verbFsrs, progress.verbMastery, key, rating);
  addXP(rating >= 3 ? 5 : 2);
  verbLearnIdx++;
  renderVerbLearnCard();
}

// ── Verb Drill (Typing) ──
function startVerbDrill() {
  if (typeof VERB_DATA === 'undefined') return;
  // All simple tenses + progressive for typing drill, filtered by settings
  const tenses = getActiveTenses(Object.keys(TENSE_META).filter(t => !TENSE_META[t].compound));
  verbDrillQueue = [];
  for (let i = 0; i < 10; i++) {
    const verb = pick(VERB_DATA);
    const tense = pick(tenses);
    const isImperative = tense === TENSE_IMPERATIVE_AFF || tense === TENSE_IMPERATIVE_NEG;
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const useSeForm = (tense === TENSE_SUBJUNCTIVE_IMPERFECT) && shouldUseSeForm();
    const answer = conjugate(verb.infinitive, tense, person, useSeForm);
    if (!answer || answer === '—' || answer === '?') { i--; continue; }
    verbDrillQueue.push({ verb, tense, person, answer, useSeForm });
  }
  verbDrillIdx = 0;
  verbDrillScore = 0;
  showScreen('verb-drill');
  renderVerbDrillQuestion();
}

function renderVerbDrillQuestion() {
  if (verbDrillIdx >= verbDrillQueue.length) {
    showResults(verbDrillScore, verbDrillQueue.length, 'verb-drill', t('conjDrill'));
    return;
  }
  const item = verbDrillQueue[verbDrillIdx];
  document.getElementById('verb-drill-progress').textContent = `${verbDrillIdx + 1} / ${verbDrillQueue.length}`;
  document.getElementById('vd-question').textContent =
    `${t('conjugatePrompt')} "${item.verb.infinitive}" (${item.verb.english}) ${t('inThe')} ${tenseLabel(TENSE_META[item.tense]) || item.tense} ${t('forPerson')} ${PERSON_LABELS[PERSONS[item.person]]}`;
  document.getElementById('vd-input').value = '';
  document.getElementById('vd-input').focus();
  document.getElementById('vd-feedback').style.display = 'none';
  document.getElementById('vd-next').style.display = 'none';
}

function checkVerbDrill() {
  const item = verbDrillQueue[verbDrillIdx];
  const input = document.getElementById('vd-input').value;
  const result = checkAnswer(input, item.answer);
  const fb = document.getElementById('vd-feedback');
  fb.style.display = 'block';
  fb.setAttribute('role', 'alert');

  const key = `${item.verb.infinitive}:${item.tense}:${item.person}`;
  const errCat = result.correct ? item.tense : classifyVerbError(input, item.answer, item.tense);
  trackError(key, result.correct, errCat);

  if (result.correct) {
    fb.className = 'quiz-feedback correct';
    fb.textContent = result.accentWarn ? `${t('correctAccent')} ${item.answer}` : t('correct');
    verbDrillScore++;
    reviewItem(progress.verbFsrs, progress.verbMastery, key, result.accentWarn ? FSRS_HARD : FSRS_GOOD);
    addXP(5);
  } else {
    fb.className = 'quiz-feedback incorrect';
    fb.textContent = result.accentWarn
      ? `${t('incorrectAccent')} ${item.answer}`
      : `${t('incorrectAnswer')} ${item.answer}`;
    reviewItem(progress.verbFsrs, progress.verbMastery, key, FSRS_AGAIN);
    addXP(1);
  }
  const explanation = buildVerbExplanation(item.verb, item.tense, item.person, item.answer);
  if (explanation) {
    fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(explanation)}</span>`;
  }
  speak(item.answer);
  document.getElementById('vd-next').style.display = 'flex';
}

function nextVerbDrill() {
  verbDrillIdx++;
  renderVerbDrillQuestion();
}

// ── Verb Pattern Drill ──
function renderVerbPatterns() {
  const container = document.getElementById('verb-pattern-cards');
  if (!container || typeof VERB_DATA === 'undefined') return;
  document.getElementById('verb-patterns-title').textContent = t('irregularPatterns');
  document.getElementById('verb-patterns-desc').textContent = t('practiceByPattern');
  const mode = progress?.settings?.display || 'standard';
  let html = '';
  for (const [key, pat] of Object.entries(VERB_PATTERNS)) {
    const verbs = VERB_DATA.filter(pat.filter);
    if (verbs.length === 0) continue;
    const label = mode === 'immersion' ? pat.labelEs : pat.label;
    const desc = mode === 'immersion' ? pat.descEs : pat.desc;
    const examples = verbs.slice(0, 4).map(v => v.infinitive).join(', ');
    html += `
      <div class="card" data-action="start-pattern-drill" data-pattern="${key}">
        <div class="card-title">${esc(label)}</div>
        <div class="card-subtitle">${esc(desc)}</div>
        <div class="text-muted text-sm" style="margin-top:0.25rem">${esc(examples)}${verbs.length > 4 ? '...' : ''} (${verbs.length} verbs)</div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function startPatternDrill(patternKey) {
  if (typeof VERB_DATA === 'undefined') return;
  const pattern = VERB_PATTERNS[patternKey];
  if (!pattern) return;
  patternDrillPattern = patternKey;

  const verbs = VERB_DATA.filter(pattern.filter);
  if (verbs.length === 0) return;

  const tenses = pattern.tenses.filter(t => !TENSE_META[t]?.compound);
  verbDrillQueue = [];
  const count = Math.min(10, verbs.length * tenses.length);
  let attempts = 0;
  while (verbDrillQueue.length < count && attempts < 50) {
    const verb = pick(verbs);
    const tense = pick(tenses);
    const isImperative = tense === TENSE_IMPERATIVE_AFF || tense === TENSE_IMPERATIVE_NEG;
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const answer = conjugate(verb.infinitive, tense, person);
    if (!answer || answer === '—' || answer === '?') { attempts++; continue; }
    verbDrillQueue.push({ verb, tense, person, answer });
    attempts++;
  }
  if (verbDrillQueue.length === 0) return;

  verbDrillIdx = 0;
  verbDrillScore = 0;
  showScreen('verb-drill');
  renderVerbDrillQuestion();
}

// ── Verb Quiz (MC + FIB) ──
function startVerbQuiz() {
  if (typeof VERB_DATA === 'undefined') return;
  // All tenses including compound and progressive, filtered by settings
  const tenses = getActiveTenses();
  verbQuizQueue = [];
  for (let i = 0; i < 10; i++) {
    const verb = pick(VERB_DATA);
    const tense = pick(tenses);
    const isImperative = tense === TENSE_IMPERATIVE_AFF || tense === TENSE_IMPERATIVE_NEG;
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const useSeForm = (tense === TENSE_SUBJUNCTIVE_IMPERFECT || TENSE_META[tense]?.auxTense === TENSE_SUBJUNCTIVE_IMPERFECT) && shouldUseSeForm();
    const correct = conjugate(verb.infinitive, tense, person, useSeForm);
    if (!correct || correct === '—' || correct === '?') { i--; continue; }
    // Generate wrong options
    const wrongs = new Set();
    while (wrongs.size < 3) {
      const wv = pick(VERB_DATA);
      const wp = Math.floor(Math.random() * 6);
      const w = conjugate(wv.infinitive, tense, wp, useSeForm);
      if (w !== correct && w !== '—' && w !== '?') wrongs.add(w);
    }
    const options = shuffle([correct, ...wrongs]);
    verbQuizQueue.push({
      verb, tense, person, correct, options, useSeForm,
      type: Math.random() < 0.5 ? 'mc' : 'fib',
    });
  }
  verbQuizIdx = 0;
  verbQuizScore = 0;
  showScreen('verb-quiz');
  renderVerbQuizQuestion();
}

function renderVerbQuizQuestion() {
  if (verbQuizIdx >= verbQuizQueue.length) {
    showResults(verbQuizScore, verbQuizQueue.length, 'verb-quiz', t('verbQuiz'));
    return;
  }
  const item = verbQuizQueue[verbQuizIdx];
  document.getElementById('vq-progress').textContent = `${verbQuizIdx + 1} / ${verbQuizQueue.length}`;
  const container = document.getElementById('vq-container');
  document.getElementById('vq-next').style.display = 'none';

  const prompt = `${t('conjugatePrompt')} "${item.verb.infinitive}" (${item.verb.english})<br>
    <span class="text-muted">${tenseLabel(TENSE_META[item.tense]) || item.tense} — ${PERSON_LABELS[PERSONS[item.person]]}</span>`;

  if (item.type === 'mc') {
    container.innerHTML = `
      <div class="quiz-question">${prompt}</div>
      <div class="quiz-options">
        ${item.options.map((opt, i) =>
          `<button class="quiz-option" data-action="answer-verb-quiz" data-idx="${i}">${esc(opt)}</button>`
        ).join('')}
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-verb-quiz-mc" style="display:none">${tBtn('submit')}</button>
    `;
  } else {
    container.innerHTML = `
      <div class="quiz-question">${prompt}</div>
      <div class="quiz-input-row">
        <input type="text" id="vq-fib-input" placeholder="${t('typeConjugation')}" autocomplete="off" autocapitalize="off">
        <button class="btn btn-primary" data-action="submit-verb-quiz-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-vq" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-vq" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-vq" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-vq" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-vq" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-vq" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="vq-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('vq-fib-input')?.focus(), 50);
  }
}

function answerVerbQuizMC(idx) {
  selectMCOption('#vq-container', idx);
}

function submitVerbQuizMC() {
  const selectedBtn = document.querySelector('#vq-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const item = verbQuizQueue[verbQuizIdx];
  const selected = item.options[idx];
  const key = `${item.verb.infinitive}:${item.tense}:${item.person}`;
  const isCorrect = selected === item.correct;
  trackError(key, isCorrect, item.tense);
  const btns = document.querySelectorAll('#vq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (item.options[i] === item.correct) btn.classList.add('correct');
    if (i === idx && selected !== item.correct) btn.classList.add('incorrect');
  });
  if (isCorrect) {
    verbQuizScore++;
    reviewItem(progress.verbFsrs, progress.verbMastery, key, FSRS_GOOD);
    addXP(5);
  } else {
    reviewItem(progress.verbFsrs, progress.verbMastery, key, FSRS_AGAIN);
    addXP(1);
  }
  const explanation = buildVerbExplanation(item.verb, item.tense, item.person, item.correct);
  if (explanation) {
    const expDiv = document.createElement('div');
    expDiv.className = 'text-muted';
    expDiv.style.fontSize = '0.85rem';
    expDiv.style.marginTop = '0.5rem';
    expDiv.textContent = explanation;
    document.querySelector('#vq-container')?.appendChild(expDiv);
  }
  speak(item.correct);
  const submitBtn = document.querySelector('#vq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  document.getElementById('vq-next').style.display = 'flex';
}

function submitVerbQuizFIB() {
  const item = verbQuizQueue[verbQuizIdx];
  const input = document.getElementById('vq-fib-input')?.value || '';
  const result = checkAnswer(input, item.correct);
  const key = `${item.verb.infinitive}:${item.tense}:${item.person}`;
  const fb = document.getElementById('vq-fib-feedback');
  fb.style.display = 'block';
  if (result.correct) {
    fb.className = 'quiz-feedback correct';
    fb.textContent = result.accentWarn ? `${t('correctAccent')} ${item.correct}` : t('correct');
    verbQuizScore++;
    reviewItem(progress.verbFsrs, progress.verbMastery, key, result.accentWarn ? FSRS_HARD : FSRS_GOOD);
    addXP(5);
  } else {
    fb.className = 'quiz-feedback incorrect';
    fb.textContent = result.accentWarn ? `${t('incorrectAccent')} ${item.correct}` : `${t('incorrectAnswer')} ${item.correct}`;
    reviewItem(progress.verbFsrs, progress.verbMastery, key, FSRS_AGAIN);
    addXP(1);
  }
  const explanation = buildVerbExplanation(item.verb, item.tense, item.person, item.correct);
  if (explanation) {
    fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(explanation)}</span>`;
  }
  speak(item.correct);
  document.getElementById('vq-next').style.display = 'flex';
}

function nextVerbQuiz() {
  verbQuizIdx++;
  renderVerbQuizQuestion();
}

// ── Verb Browser ──
function renderVerbBrowser(filter = 'all', search = '') {
  if (typeof VERB_DATA === 'undefined') return;
  showScreen('verb-browser');
  let verbs = VERB_DATA;
  // Support stem-change sub-filters: 'stem-e>ie', 'stem-o>ue', 'stem-e>i'
  if (filter.startsWith('stem-')) {
    const sc = filter.replace('stem-', '').replace('-', '>');
    verbs = verbs.filter(v => v.stemChange === sc);
  } else if (filter !== 'all') {
    verbs = verbs.filter(v => v.type === filter);
  }
  if (search) verbs = verbs.filter(v => v.infinitive.includes(search.toLowerCase()) || v.english.toLowerCase().includes(search.toLowerCase()));

  const container = document.getElementById('verb-list-container');
  container.innerHTML = verbs.map(v => {
    const badge = v.stemChange
      ? `<span class="verb-type-badge stem-changing">${v.stemChange.replace('>', '→')}</span>`
      : `<span class="verb-type-badge ${v.type}">${v.type}</span>`;
    return `
      <div class="verb-item" data-action="show-verb-detail" data-verb="${esc(v.infinitive)}">
        <div>
          <span class="verb-name">${esc(v.infinitive)}</span>
          <span class="verb-eng text-sm text-muted"> — ${esc(v.english)}</span>
        </div>
        ${badge}
      </div>
    `;
  }).join('');
}

function showVerbDetail(infinitive) {
  if (typeof VERB_DATA === 'undefined') return;
  const verb = VERB_DATA.find(v => v.infinitive === infinitive);
  if (!verb) return;
  showScreen('verb-detail');
  document.getElementById('vdet-title').textContent = verb.infinitive;
  document.getElementById('vdet-subtitle').textContent = `${verb.english} — ${verb.type} (${verb.group})`;

  const tenses = ['present', 'preterite', 'imperfect', 'future', 'conditional',
    'subjunctive_present', 'subjunctive_imperfect', 'imperative_aff'];
  let html = '';
  tenses.forEach(tense => {
    const meta = TENSE_META[tense];
    if (!meta) return;
    const forms = conjugateAll(infinitive, tense);
    html += `<div class="card mb-1">
      <div class="card-title text-sm">${tenseLabel(meta)}</div>
      <div class="conj-table-scroll"><table class="conj-table mt-1">
        ${PERSONS.map((p, i) => `<tr><td style="width:40%">${PERSON_LABELS[p]}</td><td>${forms[i]}</td></tr>`).join('')}
      </table></div>
    </div>`;
  });

  // Compound tenses
  html += `<h3 class="mt-2 mb-1 text-sm text-muted">${t('compoundTenses')}</h3>`;
  ['present_perfect', 'pluperfect', 'future_perfect', 'conditional_perfect'].forEach(tense => {
    const meta = TENSE_META[tense];
    if (!meta) return;
    const forms = conjugateAll(infinitive, tense);
    html += `<div class="card mb-1">
      <div class="card-title text-sm">${tenseLabel(meta)}</div>
      <div class="conj-table-scroll"><table class="conj-table mt-1">
        ${PERSONS.map((p, i) => `<tr><td style="width:40%">${PERSON_LABELS[p]}</td><td>${forms[i]}</td></tr>`).join('')}
      </table></div>
    </div>`;
  });

  document.getElementById('vdet-tables').innerHTML = html;
}

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
    return `<div class="card" data-action="open-vocab-cat" data-cat="${key}">
      <div class="card-icon">${cat.icon || ''}</div>
      <div class="card-title text-sm">${esc(cat.title)}</div>
      <div class="card-subtitle text-xs">${count} ${t('words')}</div>
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

// ════════════════════════════════════════
//  GRAMMAR MODULE
// ════════════════════════════════════════

let grammarQuizQueue = [];
let grammarQuizIdx = 0;
let grammarQuizScore = 0;
let currentLesson = null;

function renderGrammarHome() {
  if (typeof GRAMMAR_DATA === 'undefined') {
    showErrorState('grammar-levels', 'Grammar data is still loading. Please wait a moment and try again.', 'open-grammar');
    return;
  }

  // Level summary bars
  const summaryEl = document.getElementById('grammar-level-summary');
  if (summaryEl) {
    const gp = computeGrammarProgress();
    if (gp.length) {
      let sHtml = '';
      for (const lv of gp) {
        const pct = Math.round(lv.done / lv.total * 100);
        const rc = lv.avgRecall !== null
          ? (lv.avgRecall >= 90 ? 'var(--green)' : lv.avgRecall >= 70 ? 'var(--yellow)' : 'var(--red)')
          : '';
        const recallText = lv.avgRecall !== null ? `<span style="color:${rc};font-size:0.75rem;margin-left:0.5rem">${lv.avgRecall}% recall</span>` : '';
        sHtml += `<div class="stat-row" style="margin-bottom:0.4rem">
          <span class="stat-label" style="min-width:2rem;font-weight:600">${lv.level}</span>
          <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:8px;border-radius:4px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--accent)"></div>
          </div>
          <span class="text-muted text-sm" style="min-width:4rem;text-align:right">${lv.done}/${lv.total}${recallText}</span>
        </div>`;
      }
      summaryEl.innerHTML = `<div class="card mb-1" style="padding:0.75rem">${sHtml}</div>`;
    } else {
      summaryEl.innerHTML = '';
    }
  }

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let html = '';
  levels.forEach(level => {
    const lessons = GRAMMAR_DATA.filter(l => l.level === level);
    if (!lessons.length) return;
    html += `<h3 class="text-sm text-muted mt-2 mb-1">${level}</h3>`;
    const masteryLabels = ['', 'Learning', 'Familiar', 'Intermediate', 'Mastered'];
    lessons.forEach((l, i) => {
      const raw = progress.grammarDone[l.id];
      const level = raw === true ? 4 : (raw || 0);
      const badge = level > 0
        ? `<span class="mastery-badge mastery-${level}">${masteryLabels[level]}</span>`
        : '';
      const r = getRecallPct(progress.grammarFsrs, l.id);
      const recallBadge = r !== null
        ? (() => { const c = r >= 90 ? 'var(--green)' : r >= 70 ? 'var(--yellow)' : 'var(--red)'; return `<span style="font-size:0.65rem;padding:0.05rem 0.35rem;background:${c}20;color:${c};border-radius:3px;margin-left:0.3rem">${r}%</span>`; })()
        : '';
      html += `<div class="card" data-action="open-grammar-lesson" data-lesson="${esc(l.id)}">
        <div class="flex justify-between items-center">
          <div>
            <div class="card-title">${i + 1}. ${esc(l.titleEn || l.title)}${recallBadge}</div>
            <div class="card-subtitle">${esc(l.shortDesc || '')}</div>
          </div>
          ${badge}
        </div>
      </div>`;
    });
  });
  document.getElementById('grammar-levels').innerHTML = html;
}

function openGrammarLesson(id) {
  if (typeof GRAMMAR_DATA === 'undefined') return;
  const lesson = GRAMMAR_DATA.find(l => l.id === id);
  if (!lesson) return;
  currentLesson = lesson;
  showScreen('grammar-lesson');
  document.getElementById('gl-level').textContent = `${lesson.level} — ${t('lesson')} ${lesson.order}`;
  document.getElementById('gl-title').textContent = lesson.titleEn || lesson.title;

  // Render lesson content (sanitized — strip dangerous tags and attributes)
  const rawContent = lesson.content || '';
  const sanitizedContent = rawContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\bon\w+\s*=\s*\S+/gi, '')
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
    .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""');
  document.getElementById('gl-content').innerHTML = sanitizedContent;

  // Examples
  const exHtml = (lesson.examples || []).map(ex => `
    <div class="example-box">
      <div class="es">${esc(ex.spanish)}</div>
      <div class="en">${esc(ex.english)}</div>
    </div>
  `).join('');
  document.getElementById('gl-examples').innerHTML = exHtml;
}

function startGrammarQuiz() {
  if (!currentLesson || !currentLesson.quiz || !currentLesson.quiz.length) return;
  grammarQuizQueue = shuffle([...currentLesson.quiz]);
  grammarQuizIdx = 0;
  grammarQuizScore = 0;
  showScreen('grammar-quiz');
  renderGrammarQuizQuestion();
}

function renderGrammarQuizQuestion() {
  if (grammarQuizIdx >= grammarQuizQueue.length) {
    const pct = grammarQuizScore / grammarQuizQueue.length;
    const rating = pct >= 1.0 ? FSRS_EASY : pct >= 0.8 ? FSRS_GOOD : pct >= 0.6 ? FSRS_HARD : FSRS_AGAIN;
    reviewItem(progress.grammarFsrs, progress.grammarDone, currentLesson.id, rating);
    showResults(grammarQuizScore, grammarQuizQueue.length, 'grammar-quiz', `${tBtn('grammar')}: ${currentLesson.titleEn || currentLesson.title}`);
    return;
  }
  const q = grammarQuizQueue[grammarQuizIdx];
  document.getElementById('gq-progress').textContent = `${grammarQuizIdx + 1} / ${grammarQuizQueue.length}`;
  const container = document.getElementById('gq-container');
  document.getElementById('gq-next').style.display = 'none';

  if (q.type === 'mc') {
    container.innerHTML = `
      <div class="quiz-question">${esc(q.question)}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) =>
          `<button class="quiz-option" data-action="answer-grammar-quiz" data-idx="${i}">${esc(opt)}</button>`
        ).join('')}
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-grammar-quiz-mc" style="display:none">${tBtn('submit')}</button>
    `;
  } else if (q.type === 'fib') {
    container.innerHTML = `
      <div class="quiz-question">${esc(q.question)}</div>
      <div class="quiz-input-row">
        <input type="text" id="gq-fib-input" placeholder="${t('typeAnswer')}" autocomplete="off" autocapitalize="off">
        <button class="btn btn-primary" data-action="submit-grammar-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-gq" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="gq-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('gq-fib-input')?.focus(), 50);
  } else if (q.type === 'translate') {
    container.innerHTML = `
      <div class="quiz-question">${t('translate')} <strong>${esc(q.question)}</strong></div>
      <div class="quiz-input-row">
        <input type="text" id="gq-fib-input" placeholder="${t('typeTranslation')}" autocomplete="off" autocapitalize="off">
        <button class="btn btn-primary" data-action="submit-grammar-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-gq" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="gq-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('gq-fib-input')?.focus(), 50);
  } else if (q.type === 'error-correct') {
    container.innerHTML = `
      <div class="quiz-question">Find and fix the error:</div>
      <div class="error-sentence">"${esc(q.sentence)}"</div>
      <div class="quiz-input-row mt-1">
        <input type="text" id="gq-fib-input" placeholder="Type the corrected sentence..." autocomplete="off" autocapitalize="none" value="${esc(q.sentence)}">
        <button class="btn btn-primary" data-action="submit-grammar-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-gq" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="gq-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('gq-fib-input')?.focus(), 50);
  } else if (q.type === 'transform') {
    container.innerHTML = `
      <div class="quiz-question">${esc(q.question)}</div>
      <div class="error-sentence">"${esc(q.sentence)}"</div>
      <div class="quiz-input-row mt-1">
        <input type="text" id="gq-fib-input" placeholder="Type the transformed sentence..." autocomplete="off" autocapitalize="none">
        <button class="btn btn-primary" data-action="submit-grammar-fib">${tBtn('check')}</button>
      </div>
      <div class="accent-bar">
        <button class="accent-btn" data-action="insert-accent-gq" data-char="á">á</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="é">é</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="í">í</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ó">ó</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ú">ú</button>
        <button class="accent-btn" data-action="insert-accent-gq" data-char="ñ">ñ</button>
      </div>
      <div class="quiz-feedback" id="gq-fib-feedback" style="display:none"></div>
    `;
    setTimeout(() => document.getElementById('gq-fib-input')?.focus(), 50);
  }
}

function answerGrammarQuizMC(idx) {
  selectMCOption('#gq-container', idx);
}

function submitGrammarQuizMC() {
  const selectedBtn = document.querySelector('#gq-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const q = grammarQuizQueue[grammarQuizIdx];
  const correctIdx = q.options ? q.options.indexOf(q.answer) : -1;
  const btns = document.querySelectorAll('#gq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correctIdx) btn.classList.add('correct');
    if (i === idx && idx !== correctIdx) btn.classList.add('incorrect');
  });
  trackError(`grammar:${q.id || grammarQuizIdx}`, idx === correctIdx, 'grammar');
  if (idx === correctIdx) {
    grammarQuizScore++;
    addXP(5);
  } else {
    addXP(1);
  }
  const submitBtn = document.querySelector('#gq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  if (q.explanation) {
    const expDiv = document.createElement('div');
    expDiv.className = 'quiz-feedback text-muted';
    expDiv.style.fontSize = '0.85rem';
    expDiv.textContent = q.explanation;
    document.getElementById('gq-container').appendChild(expDiv);
  }
  document.getElementById('gq-next').style.display = 'flex';
}

function submitGrammarFIB() {
  const q = grammarQuizQueue[grammarQuizIdx];
  const input = document.getElementById('gq-fib-input')?.value || '';
  const answer = q.answer || q.correct;
  const acceptable = q.acceptable || [];
  const allCorrect = [answer, ...acceptable];

  let isCorrect = false;
  let accentWarn = false;
  for (const ans of allCorrect) {
    const result = checkAnswer(input, ans);
    if (result.correct) { isCorrect = true; accentWarn = result.accentWarn; break; }
  }

  const fb = document.getElementById('gq-fib-feedback');
  fb.style.display = 'block';
  if (isCorrect) {
    fb.className = 'quiz-feedback correct';
    fb.textContent = accentWarn ? `${t('correctAccent')} ${answer}` : t('correct');
    grammarQuizScore++;
    addXP(5);
  } else {
    fb.className = 'quiz-feedback incorrect';
    fb.textContent = `${t('incorrectAnswer')} ${answer}`;
    addXP(1);
  }
  if (q.explanation) {
    fb.innerHTML += `<br><span class="text-muted" style="font-size:0.85rem">${esc(q.explanation)}</span>`;
  }
  document.getElementById('gq-next').style.display = 'flex';
}

function nextGrammarQuiz() {
  grammarQuizIdx++;
  renderGrammarQuizQuestion();
}

// ════════════════════════════════════════
//  PHRASES MODULE
// ════════════════════════════════════════

let phraseLearnQueue = [];
let phraseLearnIdx = 0;
let currentSituation = null;

function renderPhrasesHome() {
  if (typeof PHRASES_SITUATIONS === 'undefined') {
    showErrorState('phrases-situations', 'Phrase data is still loading. Please wait a moment and try again.', 'open-phrases');
    return;
  }
  const grid = document.getElementById('phrases-situations');
  grid.innerHTML = PHRASES_SITUATIONS.map(s => `
    <div class="card" data-action="open-phrase-sit" data-sit="${esc(s.slug)}">
      <div class="card-icon">${s.icon || ''}</div>
      <div class="card-title text-sm">${esc(s.title)}</div>
      <div class="card-subtitle text-xs">${esc(s.desc || '')}</div>
    </div>
  `).join('');
}

function openPhraseSituation(slug) {
  if (typeof PHRASES_DATA === 'undefined') return;
  currentSituation = slug;
  const sit = PHRASES_SITUATIONS?.find(s => s.slug === slug);
  showScreen('phrases-sit');
  document.getElementById('ps-title').textContent = sit ? sit.title : slug;

  const phrases = PHRASES_DATA.filter(p => p.situation === slug);
  document.getElementById('ps-phrases').innerHTML = phrases.map(p => `
    <div class="phrase-card">
      <div class="phrase-es">${esc(p.spanish)}</div>
      <div class="phrase-en">${esc(p.english)}</div>
      ${p.reply ? `<div class="phrase-reply">
        <div class="label">${t('reply')}</div>
        <div><strong>${esc(p.reply.spanish)}</strong></div>
        <div class="text-muted text-sm">${esc(p.reply.english)}</div>
      </div>` : ''}
      ${p.notes ? `<div class="text-xs text-muted mt-1">${esc(p.notes)}</div>` : ''}
    </div>
  `).join('');
}

function startPhraseLearn() {
  if (typeof PHRASES_DATA === 'undefined') return;
  const phrases = currentSituation
    ? PHRASES_DATA.filter(p => p.situation === currentSituation)
    : PHRASES_DATA;
  phraseLearnQueue = pickN(phrases, Math.min(10, phrases.length));
  phraseLearnIdx = 0;
  showScreen('phrase-learn');
  renderPhraseLearnCard();
}

function renderPhraseLearnCard() {
  if (phraseLearnIdx >= phraseLearnQueue.length) {
    goBack();
    return;
  }
  const p = phraseLearnQueue[phraseLearnIdx];
  const card = document.getElementById('phrase-flashcard');
  card.classList.remove('flipped');
  document.getElementById('phrase-learn-rating').style.display = 'none';
  document.getElementById('pl-spanish').textContent = p.spanish;
  document.getElementById('pl-english').textContent = p.english;
  document.getElementById('pl-notes').textContent = p.notes || '';
  document.getElementById('pl-progress').textContent = `${phraseLearnIdx + 1} / ${phraseLearnQueue.length}`;
  speak(p.spanish);
}

function flipPhraseCard() {
  document.getElementById('phrase-flashcard').classList.add('flipped');
  document.getElementById('phrase-learn-rating').style.display = 'flex';
}

function ratePhrase(rating) {
  const p = phraseLearnQueue[phraseLearnIdx];
  reviewItem(progress.phraseFsrs, progress.phraseMastery, p.id, rating);
  addXP(rating >= 3 ? 5 : 2);
  phraseLearnIdx++;
  renderPhraseLearnCard();
}

// ── Phrase Quiz ──

let phraseQuizQueue = [];
let phraseQuizIdx = 0;
let phraseQuizScore = 0;

function startPhraseQuiz() {
  if (typeof PHRASES_DATA === 'undefined') return;
  const phrases = currentSituation
    ? PHRASES_DATA.filter(p => p.situation === currentSituation)
    : PHRASES_DATA;
  if (phrases.length < 4) return;

  phraseQuizQueue = [];
  const selected = pickN(phrases, Math.min(10, phrases.length));
  selected.forEach((p, i) => {
    if (i % 3 === 0) {
      // English→Spanish MC
      const wrongs = pickN(phrases.filter(x => x.id !== p.id), 3).map(x => x.spanish);
      const options = shuffle([p.spanish, ...wrongs]);
      phraseQuizQueue.push({ phrase: p, options, correct: p.spanish, direction: 'en-es' });
    } else {
      // Spanish→English MC
      const wrongs = pickN(phrases.filter(x => x.id !== p.id), 3).map(x => x.english);
      const options = shuffle([p.english, ...wrongs]);
      phraseQuizQueue.push({ phrase: p, options, correct: p.english, direction: 'es-en' });
    }
  });
  phraseQuizIdx = 0;
  phraseQuizScore = 0;
  showScreen('phrase-quiz');
  renderPhraseQuizQuestion();
}

function renderPhraseQuizQuestion() {
  if (phraseQuizIdx >= phraseQuizQueue.length) {
    showResults(phraseQuizScore, phraseQuizQueue.length, 'phrase-quiz', t('phraseQuizLabel'));
    return;
  }
  const item = phraseQuizQueue[phraseQuizIdx];
  document.getElementById('pq-progress').textContent = `${phraseQuizIdx + 1} / ${phraseQuizQueue.length}`;
  const container = document.getElementById('pq-container');
  document.getElementById('pq-next').style.display = 'none';

  const prompt = item.direction === 'en-es'
    ? `${t('whatIsSpanishFor')} <strong>"${esc(item.phrase.english)}"</strong>`
    : `${t('whatDoesPhraseMean')} <strong>"${esc(item.phrase.spanish)}"</strong>`;

  container.innerHTML = `
    <div class="quiz-question">${prompt}</div>
    <div class="quiz-options">
      ${item.options.map((opt, i) =>
        `<button class="quiz-option" data-action="answer-phrase-quiz" data-idx="${i}">${esc(opt)}</button>`
      ).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-phrase-quiz-mc" style="display:none">${tBtn('submit')}</button>
  `;
  if (item.direction === 'es-en') speak(item.phrase.spanish);
}

function answerPhraseQuizMC(idx) {
  selectMCOption('#pq-container', idx);
}

function submitPhraseQuizMC() {
  const item = phraseQuizQueue[phraseQuizIdx];
  const isCorrect = processMCSubmit({
    optionsSel: '#pq-container .quiz-option',
    isCorrectBtn: btn => item.options[parseInt(btn.dataset.idx)] === item.correct,
    nextBtnId: 'pq-next',
    fsrs: { store: progress.phraseFsrs, masteryStore: progress.phraseMastery, key: item.phrase.id },
  });
  trackError(`phrase:${item.phrase.id}`, isCorrect, 'phrase');
  if (isCorrect) { phraseQuizScore++; addXP(5); } else { addXP(1); }
  const submitBtn = document.querySelector('#pq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
}

function nextPhraseQuiz() {
  phraseQuizIdx++;
  renderPhraseQuizQuestion();
}

// ════════════════════════════════════════
//  NUMBERS MODULE
// ════════════════════════════════════════

const SPANISH_NUMBERS = {
  0:'cero',1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',
  8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',
  15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho',19:'diecinueve',
  20:'veinte',21:'veintiuno',22:'veintidós',23:'veintitrés',24:'veinticuatro',
  25:'veinticinco',26:'veintiséis',27:'veintisiete',28:'veintiocho',29:'veintinueve',
  30:'treinta',40:'cuarenta',50:'cincuenta',60:'sesenta',70:'setenta',80:'ochenta',
  90:'noventa',100:'cien',200:'doscientos',300:'trescientos',400:'cuatrocientos',
  500:'quinientos',600:'seiscientos',700:'setecientos',800:'ochocientos',
  900:'novecientos',1000:'mil',
};

function renderNumbersHome() {
  // Numbers screen content is already in HTML
}

// ════════════════════════════════════════
//  CULTURAL CONTENT MODULE
// ════════════════════════════════════════

const CULTURE_MODULES = {
  recipes: { data: () => typeof RECIPES_DATA !== 'undefined' ? RECIPES_DATA : [], title: 'Recipes', titleEs: 'Recetas' },
  music: { data: () => typeof MUSIC_DATA !== 'undefined' ? MUSIC_DATA : [], title: 'Music', titleEs: 'Música' },
  movies: { data: () => typeof MOVIES_DATA !== 'undefined' ? MOVIES_DATA : [], title: 'Movies', titleEs: 'Películas' },
  poetry: { data: () => typeof POETRY_DATA !== 'undefined' ? POETRY_DATA : [], title: 'Poetry', titleEs: 'Poesía' },
  sports: { data: () => typeof SPORTS_DATA !== 'undefined' ? SPORTS_DATA : [], title: 'Sports', titleEs: 'Deportes' },
  proverbs: { data: () => typeof PROVERBS_DATA !== 'undefined' ? PROVERBS_DATA : [], title: 'Proverbs', titleEs: 'Refranes' },
  folktales: { data: () => typeof FOLKTALES_DATA !== 'undefined' ? FOLKTALES_DATA : [], title: 'Folk Tales', titleEs: 'Cuentos' },
  festivals: { data: () => typeof FESTIVALS_DATA !== 'undefined' ? FESTIVALS_DATA : [], title: 'Festivals', titleEs: 'Fiestas' },
  history: { data: () => typeof HISTORY_DATA !== 'undefined' ? HISTORY_DATA : [], title: 'History', titleEs: 'Historia' },
  travel: { data: () => typeof TRAVEL_DATA !== 'undefined' ? TRAVEL_DATA : [], title: 'Travel', titleEs: 'Viajes' },
  trivia: { data: () => typeof TRIVIA_DATA !== 'undefined' ? TRIVIA_DATA : [], title: 'Trivia', titleEs: 'Trivia' },
  idioms: { data: () => typeof IDIOMS_DATA !== 'undefined' ? IDIOMS_DATA : [], title: 'Idioms', titleEs: 'Modismos' },
  conversations: { data: () => typeof CONVERSATIONS_DATA !== 'undefined' ? CONVERSATIONS_DATA : [], title: 'Conversations', titleEs: 'Conversaciones' },
  jokes: { data: () => typeof JOKES_DATA !== 'undefined' ? JOKES_DATA : [], title: 'Jokes', titleEs: 'Bromas' },
};

let currentCultureModule = null;
let currentCultureItem = null;

function openCultureModule(module) {
  const mod = CULTURE_MODULES[module];
  if (!mod) return;
  currentCultureModule = module;
  const items = mod.data();
  showScreen('culture-list');
  const mode = progress?.settings?.display || 'standard';
  document.getElementById('culture-title').textContent = mode === 'standard' ? mod.title : mod.titleEs;

  if (!items.length) {
    document.getElementById('culture-items').innerHTML = `<p class="text-muted">${t('contentSoon')}</p>`;
    return;
  }

  document.getElementById('culture-items').innerHTML = items.map(item => `
    <div class="card" data-action="open-culture-item" data-id="${esc(item.id)}">
      ${item.icon ? `<div class="card-icon">${item.icon}</div>` : ''}
      <div class="card-title text-sm">${esc(item.spanishName || item.title || item.spanish || '')}</div>
      <div class="card-subtitle text-xs">${esc(item.englishName || item.titleEn || item.meaning || item.english || '')}</div>
    </div>
  `).join('');
}

function openCultureItem(id) {
  const mod = CULTURE_MODULES[currentCultureModule];
  if (!mod) return;
  const items = mod.data();
  const item = items.find(i => i.id === id);
  if (!item) return;
  currentCultureItem = item;
  showScreen('culture-detail');

  document.getElementById('cd-title').textContent = item.spanishName || item.title || item.spanish || '';

  let content = '';
  if (item.descEs) content += `<p>${esc(item.descEs)}</p>`;
  if (item.descEn) content += `<p class="text-muted">${esc(item.descEn)}</p>`;
  if (item.story) content += `<p>${esc(item.story)}</p>`;
  if (item.storyEn) content += `<p class="text-muted">${esc(item.storyEn)}</p>`;
  if (item.example) content += `<div class="example-box"><div class="es">${esc(item.example)}</div>${item.exampleEn ? `<div class="en">${esc(item.exampleEn)}</div>` : ''}</div>`;
  if (item.literal) content += `<p class="text-sm text-muted">${t('literal')} ${esc(item.literal)}</p>`;
  document.getElementById('cd-content').innerHTML = content;

  // Vocab section
  const vocabItems = item.vocab || [];
  document.getElementById('cd-vocab').innerHTML = vocabItems.length ? `
    <h3 class="text-sm text-muted mb-1">${t('keyVocab')}</h3>
    ${vocabItems.map(v => `<div class="flex justify-between" style="padding:0.25rem 0;border-bottom:1px solid var(--border)">
      <strong>${esc(v.word || v.spanish)}</strong><span class="text-muted">${esc(v.english)}</span>
    </div>`).join('')}
  ` : '';
}

// Culture quiz — powered by createQuizFlow
const cultureQuizFlow = createQuizFlow({
  containerId: 'cq-container',
  nextBtnId: 'cq-next',
  progressId: 'cq-progress',
  getCorrectIdx: q => q.correct,
  onCorrect: () => addXP(5),
  onIncorrect: () => addXP(1),
  getExplanation: q => q.explanation || null,
  onComplete: (score, total) => showResults(score, total, 'culture-quiz', t('cultureQuizLabel')),
  renderQuestion: (q) => `
    <div class="quiz-question">${esc(q.prompt)}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) =>
        `<button class="quiz-option" data-action="answer-culture-quiz" data-idx="${i}">${esc(opt)}</button>`
      ).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-culture-quiz-mc" style="display:none">${tBtn('submit')}</button>
  `,
});

function startCultureQuiz() {
  if (!currentCultureItem || !currentCultureItem.quiz || !currentCultureItem.quiz.length) return;
  showScreen('culture-quiz');
  cultureQuizFlow.start([...currentCultureItem.quiz]);
}
function answerCultureQuizMC(idx) { cultureQuizFlow.selectOption(idx); }
function submitCultureQuizMC() { cultureQuizFlow.submit(); }
function nextCultureQuiz() { cultureQuizFlow.next(); }

// ── Dialogue Practice — powered by createQuizFlow ──

const dialogueQuizFlow = createQuizFlow({
  containerId: 'dp-container',
  nextBtnId: 'dp-next',
  progressId: 'dp-progress',
  getCorrectValue: q => q.correct.spanish,
  onCorrect: () => addXP(5),
  onIncorrect: () => addXP(1),
  getExplanation: q => `"${q.correct.english}"`,
  onComplete: (score, total) => showResults(score, total, 'dialogue', 'Dialogue Practice'),
  renderQuestion: (q, idx, total) => {
    // Also render transcript above the quiz container
    const transcript = document.getElementById('dp-transcript');
    if (transcript) {
      transcript.innerHTML = q.context.map(line => {
        const speaker = q.conv.speakers[line.speaker];
        const isPlayer = speaker?.role === 'player';
        return `<div class="dialogue-line${isPlayer ? ' player' : ''}">
          <strong>${esc(speaker?.name || '?')}:</strong> ${esc(line.spanish)}
          <div class="text-muted text-sm">${esc(line.english)}</div>
        </div>`;
      }).join('');
    }
    return `
      <div class="quiz-question">What would you say next?</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) =>
          `<button class="quiz-option" data-action="answer-dialogue" data-idx="${i}" data-val="${esc(opt)}">${esc(opt)}</button>`
        ).join('')}
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-dialogue-mc" style="display:none">${tBtn('submit')}</button>
    `;
  },
});

function startDialoguePractice() {
  if (typeof CONVERSATIONS_DATA === 'undefined' || CONVERSATIONS_DATA.length === 0) return;
  const conv = CONVERSATIONS_DATA[Math.floor(Math.random() * CONVERSATIONS_DATA.length)];
  const playerIndices = [];
  conv.dialogue.forEach((line, i) => {
    if (conv.speakers[line.speaker]?.role === 'player') playerIndices.push(i);
  });
  if (playerIndices.length === 0) return;

  const allPlayerLines = [];
  for (const c of CONVERSATIONS_DATA) {
    for (const line of c.dialogue) {
      if (c.speakers[line.speaker]?.role === 'player') allPlayerLines.push(line.spanish);
    }
  }

  const queue = playerIndices.map(idx => {
    const correctLine = conv.dialogue[idx];
    const context = conv.dialogue.slice(0, idx);
    const wrongPool = allPlayerLines.filter(s => s !== correctLine.spanish);
    const wrongs = pickN(wrongPool, 3);
    return {
      conv,
      context,
      correct: correctLine,
      options: shuffle([correctLine.spanish, ...wrongs]),
    };
  });
  showScreen('dialogue-practice');
  dialogueQuizFlow.start(queue);
}
function answerDialogueMC(idx) { dialogueQuizFlow.selectOption(idx); }
function submitDialogueMC() { dialogueQuizFlow.submit(); }
function nextDialogue() { dialogueQuizFlow.next(); }

// ════════════════════════════════════════
//  RESULTS SCREEN
// ════════════════════════════════════════

let lastQuizModule = '';

function showResults(score, total, module, label) {
  lastQuizModule = module;
  showScreen('results');
  const pct = Math.round((score / total) * 100);

  // Track perfect quizzes for achievements
  if (pct === 100 && total >= 3) {
    progress.perfectQuizCount = (progress.perfectQuizCount || 0) + 1;
    saveProgress();
  }
  checkAchievements();

  // Celebratory feedback based on score
  let scoreClass, emoji, message;
  if (pct >= 90) {
    scoreClass = 'excellent'; emoji = '🎉'; message = '¡Excelente!';
  } else if (pct >= 70) {
    scoreClass = 'good'; emoji = '👏'; message = '¡Muy bien!';
  } else {
    scoreClass = 'needs-work'; emoji = '💪'; message = '¡Sigue practicando!';
  }

  const scoreEl = document.getElementById('res-score');
  scoreEl.textContent = `${pct}%`;
  scoreEl.className = `score ${scoreClass}`;

  // Insert emoji and message before the label
  document.getElementById('res-label').innerHTML = `
    <div class="score-emoji">${emoji}</div>
    <div class="score-message">${message}</div>
    <div>${score} / ${total} ${t('correctLabel').toLowerCase()} — ${label}</div>
  `;
  document.getElementById('res-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num" style="color:var(--green)">${score}</div><div class="stat-desc">${t('correctLabel')}</div></div>
    <div class="stat-card"><div class="stat-num" style="color:var(--red)">${total - score}</div><div class="stat-desc">${t('incorrectLabel')}</div></div>
    <div class="stat-card"><div class="stat-num">+${score * 5 + (total - score)}</div><div class="stat-desc">${t('xpEarned')}</div></div>
  `;
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
