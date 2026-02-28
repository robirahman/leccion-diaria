// ════════════════════════════════════════════════════════════
//  LECCION DIARIA — Spanish Learning PWA
//  Main Application Logic
// ════════════════════════════════════════════════════════════

'use strict';

// ── State ──
let currentProfile = null;
let progress = null;
let screenStack = [];
let activeDropdown = null;

// Placement test state (IRT-based, per-domain)
let placementQuestions = [];   // flat array of all questions with difficulty
let placementIdx = 0;
let placementThetas = { grammar: 3.0, vocab: 3.0 };  // per-domain ability
let placementHistory = [];     // [{difficulty, correct, domain}]
let placementSEs = { grammar: 2.0, vocab: 2.0 };     // per-domain standard error
let placementUsedIds = new Set();
let placementLastDomains = []; // track recent domains for variety

// Practice exercise state
let mpQueue = [], mpIdx = 0, mpScore = 0, mpAnswered = false;
let sbQueue = [], sbIdx = 0, sbScore = 0;
let clozeQueue = [], clozeIdx = 0, clozeScore = 0;
let trQueue = [], trIdx = 0, trScore = 0;
let dictQueue = [], dictIdx = 0, dictScore = 0;

// Map question domains to scoring groups
const DOMAIN_GROUP = { grammar: 'grammar', usage: 'grammar', reading: 'grammar', verb: 'grammar', vocab: 'vocab' };
function scoringGroup(domain) { return DOMAIN_GROUP[domain] || 'grammar'; }

// ── UI Strings for Display Modes (standard / immersion / hints) ──
const UI_STRINGS = {
  // Tab bar
  today: ['Today', 'Hoy'], verbs: ['Verbs', 'Verbos'], numbers: ['Numbers', 'Números'],
  vocab: ['Vocab', 'Vocabulario'], grammar: ['Grammar', 'Gramática'],
  phrases: ['Phrases', 'Frases'], culture: ['Culture', 'Cultura'], explore: ['Explore', 'Explorar'],

  // Rating buttons
  again: ['Again', 'Otra vez'], hard: ['Hard', 'Difícil'],
  good: ['Good', 'Bien'], easy: ['Easy', 'Fácil'],

  // Quiz interaction
  next: ['Next', 'Siguiente'], check: ['Check', 'Comprobar'],
  submit: ['Submit', 'Enviar'], correct: ['Correct!', '¡Correcto!'],
  incorrect: ['Incorrect', 'Incorrecto'],

  // General buttons
  learn: ['Learn', 'Aprender'], quiz: ['Quiz', 'Prueba'],
  tryAgain: ['Try Again', 'Intentar de nuevo'], done: ['Done', 'Listo'],
  takeQuiz: ['Take Quiz', 'Hacer prueba'], back: ['Back', 'Atrás'],
  cancel: ['Cancel', 'Cancelar'], create: ['Create', 'Crear'],
  ok: ['OK', 'OK'], skip: ['Skip', 'Omitir'],
  startLearning: ['Start Learning', 'Empezar a aprender'],
  retakeTest: ['Retake Test', 'Repetir prueba'],

  // Flashcards
  tapToReveal: ['Tap to reveal', 'Toca para ver'],

  // Section headers
  continueLearning: ['Continue Learning', 'Continuar aprendiendo'],
  dueForReview: ['Due for Review', 'Pendiente de repaso'],
  dailyPractice: ['Daily Practice', 'Práctica diaria'],
  yourSpanishLevel: ['Your Spanish Level', 'Tu nivel de español'],

  // Screen headings
  verbConjugation: ['Verb Conjugation', 'Conjugación verbal'],
  vocabulary: ['Vocabulary', 'Vocabulario'],
  settings: ['Settings', 'Configuración'],
  statistics: ['Statistics', 'Estadísticas'],

  // Verb screen cards
  learnNewVerbs: ['Learn New Verbs', 'Aprender verbos nuevos'],
  flashcardsDesc: ['Flashcards with conjugation tables', 'Tarjetas con tablas de conjugación'],
  conjugationDrill: ['Conjugation Drill', 'Ejercicio de conjugación'],
  typeCorrectConj: ['Type the correct conjugation', 'Escribe la conjugación correcta'],
  verbQuiz: ['Verb Quiz', 'Prueba de verbos'],
  mcAndFib: ['Multiple choice & fill-in-blank', 'Opción múltiple y completar'],
  verbBrowser: ['Verb Browser', 'Explorar verbos'],
  irregularPatterns: ['Irregular Patterns', 'Patrones irregulares'],
  practiceByPattern: ['Practice verbs grouped by pattern', 'Practica verbos agrupados por patrón'],
  // Practice exercises
  practice: ['Practice', 'Práctica'],
  arrangeWords: ['Arrange the words:', 'Ordena las palabras:'],
  browseVerbs: ['Browse all verbs and conjugation tables', 'Ver todos los verbos y tablas de conjugación'],

  // Numbers screen
  learnNumbers: ['Learn Numbers', 'Aprender números'],
  learnNumbersDesc: ['Cardinal and ordinal numbers in Spanish', 'Números cardinales y ordinales en español'],
  numberQuiz: ['Number Quiz', 'Prueba de números'],
  numberQuizDesc: ['Practice writing numbers in Spanish', 'Practica escribiendo números en español'],
  tellingTime: ['Telling Time', 'Decir la hora'],
  tellingTimeDesc: ['Practice telling time in Spanish', 'Practica diciendo la hora en español'],

  // Stat labels
  totalXP: ['Total XP', 'XP total'], dayStreak: ['Day Streak', 'Racha de días'],
  formsPracticed: ['Forms Practiced', 'Formas practicadas'],
  totalVerbs: ['Total Verbs', 'Total de verbos'],
  wordsLearned: ['Words Learned', 'Palabras aprendidas'],
  totalWords: ['Total Words', 'Total de palabras'],
  lessonsCompleted: ['lessons completed', 'lecciones completadas'],
  formsPracticedLC: ['forms practiced', 'formas practicadas'],
  wordsLearnedLC: ['words learned', 'palabras aprendidas'],
  correctLabel: ['Correct', 'Correcto'], incorrectLabel: ['Incorrect', 'Incorrecto'],
  xpEarned: ['XP Earned', 'XP ganado'],

  // Today screen
  itemsDue: ['items due for review', 'elementos para repasar'],
  verbsLC: ['verbs', 'verbos'], vocabularyLC: ['vocabulary', 'vocabulario'],
  allCaughtUp: ['All caught up! No reviews due.', '¡Todo al día! No hay repasos pendientes.'],
  quickDrill: ['Quick Conjugation Drill', 'Ejercicio rápido de conjugación'],
  quickDrillDesc: ['10 random conjugation questions', '10 preguntas aleatorias de conjugación'],
  words: ['words', 'palabras'],

  // Quiz prompts
  typeConjugation: ['Type the conjugation...', 'Escribe la conjugación...'],
  typeAnswer: ['Type your answer...', 'Escribe tu respuesta...'],
  typeTranslation: ['Your translation...', 'Tu traducción...'],
  whatDoesMean: ['What does', '¿Qué significa'],
  mean: ['mean?', '?'],
  conjugatePrompt: ['Conjugate', 'Conjuga'],
  inThe: ['in the', 'en el/la'],
  forPerson: ['for', 'para'],
  elOrLa: ['¿El o La?', '¿El o La?'],

  // Quiz feedback
  correctAccent: ['Correct! But watch your accents:', '¡Correcto! Pero cuidado con los acentos:'],
  incorrectAccent: ['Incorrect — accent matters! The answer is:', 'Incorrecto — ¡los acentos importan! La respuesta es:'],
  incorrectAnswer: ['Incorrect. The answer is:', 'Incorrecto. La respuesta es:'],

  // Verb detail
  compoundTenses: ['Compound Tenses', 'Tiempos compuestos'],

  // Search
  searchVerbs: ['Search verbs...', 'Buscar verbos...'],
  searchVocab: ['Search vocabulary...', 'Buscar vocabulario...'],
  noResults: ['No results.', 'Sin resultados.'],

  // Filter buttons
  all: ['All', 'Todos'], regular: ['Regular', 'Regular'],
  irregular: ['Irregular', 'Irregular'], stem: ['Stem', 'Raíz'],
  reflexive: ['Reflexive', 'Reflexivo'],

  // Vocab/Gender
  genderDrill: ['Gender Drill', 'Ejercicio de género'],
  elMasc: ['el (masculine)', 'el (masculino)'],
  laFem: ['la (feminine)', 'la (femenino)'],
  vocabQuizLabel: ['Vocabulary Quiz', 'Prueba de vocabulario'],
  genderQuizLabel: ['Gender Quiz', 'Prueba de género'],
  conjDrill: ['Conjugation Drill', 'Ejercicio de conjugación'],

  // Grammar
  grammarLoading: ['Grammar data loading...', 'Cargando datos de gramática...'],
  vocabLoading: ['Vocabulary data loading...', 'Cargando datos de vocabulario...'],
  lesson: ['Lesson', 'Lección'],
  translate: ['Translate:', 'Traduce:'],

  // Phrases
  phrasesLoading: ['Phrases data loading...', 'Cargando datos de frases...'],

  // Culture
  keyVocab: ['Key Vocabulary', 'Vocabulario clave'],
  cultureQuizLabel: ['Culture Quiz', 'Prueba de cultura'],
  contentSoon: ['Content coming soon...', 'Contenido próximamente...'],

  // Dropdown modules
  music: ['Music', 'Música'], movies: ['Movies', 'Películas'],
  poetry: ['Poetry', 'Poesía'], proverbs: ['Proverbs', 'Refranes'],
  folkTales: ['Folk Tales', 'Cuentos'], conversations: ['Conversations', 'Conversaciones'],
  recipes: ['Recipes', 'Recetas'], sports: ['Sports', 'Deportes'],
  festivals: ['Festivals', 'Fiestas'], history: ['History', 'Historia'],
  travel: ['Travel', 'Viajes'], trivia: ['Trivia', 'Trivia'],
  idioms: ['Idioms', 'Modismos'],

  // Settings
  display: ['Display', 'Pantalla'], displayMode: ['Display Mode', 'Modo de pantalla'],
  howTextShown: ['How text is shown', 'Cómo se muestra el texto'],
  standard: ['Standard', 'Estándar'], immersion: ['Immersion', 'Inmersión'],
  hints: ['Hints', 'Pistas'], theme: ['Theme', 'Tema'],
  dark: ['Dark', 'Oscuro'], light: ['Light', 'Claro'],
  colorPalette: ['Color Palette', 'Paleta de colores'],
  learning: ['Learning', 'Aprendizaje'], region: ['Region', 'Región'],
  regionDesc: ['Affects verb forms and vocabulary', 'Afecta las formas verbales y vocabulario'],
  latinAmerica: ['Latin America', 'Latinoamérica'], spain: ['Spain', 'España'],
  accentStrict: ['Accent Strictness', 'Rigor de acentos'],
  accentDesc: ['How strictly to check accents', 'Cuán estricto al revisar acentos'],
  strict: ['Strict', 'Estricto'], warn: ['Warn', 'Avisar'], lenient: ['Lenient', 'Flexible'],
  ttsSpeed: ['TTS Voice Speed', 'Velocidad de voz'],
  slow: ['Slow', 'Lento'], normal: ['Normal', 'Normal'], fast: ['Fast', 'Rápido'],
  placementTest: ['Placement Test', 'Prueba de nivel'],
  placementDesc: ['Assess your level and unlock content', 'Evalúa tu nivel y desbloquea contenido'],
  takeTest: ['Take Test', 'Hacer prueba'],
  data: ['Data', 'Datos'],
  exportProgress: ['Export Progress', 'Exportar progreso'],
  importProgress: ['Import Progress', 'Importar progreso'],
  resetProgress: ['Reset All Progress', 'Reiniciar todo el progreso'],

  // Placement
  testingLevel: ['Testing:', 'Evaluando:'],
  grammarDomain: ['Grammar', 'Gramática'],
  vocabDomain: ['Vocabulary', 'Vocabulario'],
  conjDomain: ['Conjugation', 'Conjugación'],
  usageDomain: ['Usage', 'Uso'],
  readingDomain: ['Reading', 'Lectura'],
  grammarLevel: ['Grammar', 'Gramática'],
  vocabLevel: ['Vocabulary', 'Vocabulario'],
  correctLabel: ['correct', 'correctas'],

  // Profile
  dailySubtitle: ['Your daily Spanish lesson', 'Tu lección diaria de español'],
  newProfile: ['+ New Profile', '+ Nuevo perfil'],
  newProfileTitle: ['New Profile', 'Nuevo perfil'],
  yourName: ['Your name', 'Tu nombre'],

  // Mastery
  masteryBreakdown: ['Mastery Breakdown', 'Desglose de dominio'],
  practiceCalendar: ['Practice Calendar', 'Calendario de práctica'],

  // Misc labels
  reply: ['Reply:', 'Respuesta:'],
  literal: ['Literal:', 'Literal:'],

  // Modal dialogs
  importTitle: ['Import', 'Importar'],
  importSuccess: ['Progress imported successfully!', '¡Progreso importado exitosamente!'],
  errorTitle: ['Error', 'Error'],
  invalidFile: ['Invalid file format.', 'Formato de archivo inválido.'],
  resetTitle: ['Reset Progress', 'Reiniciar progreso'],
  resetConfirm: ['Are you sure? This cannot be undone.', '¿Estás seguro? Esto no se puede deshacer.'],
  reset: ['Reset', 'Reiniciar'],

  // Placement quiz prompts
  howDoYouSay: ['How do you say', '¿Cómo se dice'],
  inSpanish: ['in Spanish?', 'en español?'],

  // Placement results
  placementResultMsg: [
    'Based on your results, <strong>%g grammar lessons</strong> and <strong>%v vocabulary words</strong> have been marked as known. You can start learning at the <strong>%l</strong> level!',
    'Según tus resultados, <strong>%g lecciones de gramática</strong> y <strong>%v palabras de vocabulario</strong> se marcaron como conocidas. ¡Puedes empezar a aprender desde el nivel <strong>%l</strong>!'
  ],
  placementResultMsgDual: [
    'Grammar through <strong>%gl</strong> (%g lessons) and vocabulary through <strong>%vl</strong> (%v words) have been marked as mastered.',
    'Gramática hasta <strong>%gl</strong> (%g lecciones) y vocabulario hasta <strong>%vl</strong> (%v palabras) se marcaron como dominados.'
  ],
};

// Translation helper — returns appropriate text for the current display mode
function t(key) {
  const s = UI_STRINGS[key];
  if (!s) return key;
  const mode = progress?.settings?.display || 'standard';
  if (mode === 'standard') return s[0];
  if (mode === 'immersion') return s[1];
  // hints: Spanish with English in parentheses
  return s[1] + ' (' + s[0] + ')';
}

// Short translation helper for buttons — hints mode shows just Spanish (no parenthetical)
function tBtn(key) {
  const s = UI_STRINGS[key];
  if (!s) return key;
  const mode = progress?.settings?.display || 'standard';
  if (mode === 'standard') return s[0];
  return s[1];
}

// Tense label helper: adapts to display mode
function tenseLabel(meta) {
  if (!meta) return '';
  const mode = progress?.settings?.display || 'standard';
  if (mode === 'immersion') return meta.label;
  if (mode === 'hints') return meta.label + ' (' + meta.labelEn + ')';
  // standard: show both for learning
  return meta.label + ' (' + meta.labelEn + ')';
}

// ── Default Progress State ──
function newProgress() {
  return {
    xp: 0, streak: 0, longestStreak: 0, lastDate: null, freezeTokens: 0,
    verbMastery: {}, verbFsrs: {},
    vocabMastery: {}, vocabFsrs: {},
    grammarDone: {}, grammarFsrs: {},
    phraseMastery: {}, phraseFsrs: {},
    numberMastery: {},
    cultureDone: {},
    practiceLog: {},
    mpFsrs: {}, mpMastery: {},
    sentenceFsrs: {}, sentenceMastery: {},
    clozeFsrs: {}, clozeMastery: {},
    translationFsrs: {}, translationMastery: {},
    dictFsrs: {}, dictMastery: {},
    placementLevel: null,
    placementDate: null,
    settings: {
      display: 'standard', region: 'latam', theme: 'dark', palette: 'alhambra',
      accents: 'warn', ttsRate: 1,
    },
  };
}

// ════════════════════════════════════════
//  PERSISTENCE
// ════════════════════════════════════════

function getProfiles() {
  try { return JSON.parse(localStorage.getItem('ld_profiles') || '[]'); }
  catch { return []; }
}
function saveProfiles(list) { localStorage.setItem('ld_profiles', JSON.stringify(list)); }

function loadProgress(name) {
  try { return JSON.parse(localStorage.getItem('ld_progress_' + name)) || newProgress(); }
  catch { return newProgress(); }
}
function saveProgress() {
  if (!currentProfile) return;
  localStorage.setItem('ld_progress_' + currentProfile, JSON.stringify(progress));
}

// ════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════

function showScreen(id, pushStack = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) {
    el.classList.add('active');
    el.classList.add('fade-in');
    setTimeout(() => el.classList.remove('fade-in'), 300);
  }
  if (pushStack && screenStack[screenStack.length - 1] !== id) screenStack.push(id);

  // Show/hide nav back button
  const backBtn = document.querySelector('.nav-back');
  if (backBtn) backBtn.classList.toggle('visible', screenStack.length > 1 && id !== 'profile' && id !== 'today');

  // Close any open dropdown
  closeDropdowns();
}

function goBack() {
  if (screenStack.length > 1) {
    screenStack.pop();
    showScreen(screenStack[screenStack.length - 1], false);
  }
}

function switchTab(tab) {
  // Dropdown tabs
  if (tab === 'culture' || tab === 'explore') {
    const dd = document.getElementById(tab === 'culture' ? 'culture-dropdown' : 'explore-dropdown');
    if (dd) {
      const isOpen = dd.classList.contains('open');
      closeDropdowns();
      if (!isOpen) { dd.classList.add('open'); activeDropdown = dd; }
    }
    return;
  }
  closeDropdowns();
  document.querySelectorAll('.tab-bar .tab').forEach(t => t.classList.remove('active'));
  const tabBtn = document.querySelector(`.tab[data-tab="${tab}"]`);
  if (tabBtn) tabBtn.classList.add('active');

  screenStack = [tab];
  showScreen(tab, false);

  // Populate screen
  if (tab === 'today') renderToday();
  else if (tab === 'verbs') renderVerbsHome();
  else if (tab === 'vocab') renderVocabHome();
  else if (tab === 'grammar') renderGrammarHome();
  else if (tab === 'phrases') renderPhrasesHome();
  else if (tab === 'numbers') renderNumbersHome();
}

function closeDropdowns() {
  document.querySelectorAll('.tab-dropdown').forEach(d => d.classList.remove('open'));
  activeDropdown = null;
}

// ════════════════════════════════════════
//  PROFILE SYSTEM
// ════════════════════════════════════════

function renderProfiles() {
  const list = getProfiles();
  const container = document.getElementById('profile-list');
  container.innerHTML = list.map(p =>
    `<div class="profile-item" data-action="select-profile" data-name="${esc(p)}">
      <div class="avatar">${p.charAt(0).toUpperCase()}</div>
      <div class="name">${esc(p)}</div>
    </div>`
  ).join('');
}

function selectProfile(name) {
  currentProfile = name;
  progress = loadProgress(name);
  applySettings();
  updateNavStats();
  document.getElementById('tab-bar').style.display = 'flex';
  switchTab('today');
  try { sessionStorage.setItem('ld_active_profile', name); } catch (e) { /* ignore */ }
}

function createProfile() {
  showModal(t('newProfileTitle'), `
    <input type="text" id="new-profile-name" placeholder="${t('yourName')}" maxlength="20" style="width:100%">
  `, [
    { label: tBtn('cancel'), action: 'close-modal', cls: 'btn-secondary' },
    { label: tBtn('create'), action: 'confirm-create-profile', cls: 'btn-primary' },
  ]);
  setTimeout(() => document.getElementById('new-profile-name')?.focus(), 100);
}

function confirmCreateProfile() {
  const input = document.getElementById('new-profile-name');
  const name = input?.value.trim();
  if (!name) return;
  const profiles = getProfiles();
  if (profiles.includes(name)) return;
  profiles.push(name);
  saveProfiles(profiles);
  closeModal();
  selectProfile(name);
  // Offer placement test for new profiles
  setTimeout(() => {
    showModal(t('placementTest'), `
      <p>Want to take a quick placement test to skip content you already know?</p>
      <p class="text-muted">~5 minutes, 40 adaptive questions covering grammar, vocabulary, and verbs.</p>
    `, [
      { label: tBtn('skip'), action: 'close-modal', cls: 'btn-secondary' },
      { label: tBtn('takeTest'), action: 'start-placement', cls: 'btn-primary' },
    ]);
  }, 300);
}

// ════════════════════════════════════════
//  MODAL SYSTEM
// ════════════════════════════════════════

function showModal(title, bodyHtml, buttons) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-actions').innerHTML = buttons.map(b =>
    `<button class="btn ${b.cls || ''}" data-action="${b.action}">${b.label}</button>`
  ).join('');
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }

// ════════════════════════════════════════
//  SETTINGS
// ════════════════════════════════════════

function applySettings() {
  if (!progress) return;
  const s = progress.settings;
  document.documentElement.setAttribute('data-theme', s.theme || 'dark');
  document.documentElement.setAttribute('data-palette', s.palette || 'alhambra');
  // Highlight active pills
  document.querySelectorAll('[data-action^="set-"]').forEach(pill => {
    const act = pill.dataset.action;
    const val = pill.dataset.val;
    let key;
    if (act === 'set-display') key = 'display';
    else if (act === 'set-theme') key = 'theme';
    else if (act === 'set-palette') key = 'palette';
    else if (act === 'set-region') key = 'region';
    else if (act === 'set-accents') key = 'accents';
    else if (act === 'set-tts-rate') key = 'ttsRate';
    if (key) {
      const current = String(s[key] || '');
      pill.classList.toggle('active', val === current);
    }
  });
  applyDisplayMode();
}

// Translate all static HTML elements based on display mode
function applyDisplayMode() {
  // Tab bar labels
  const tabs = { today: 'today', verbs: 'verbs', numbers: 'numbers', vocab: 'vocab',
    grammar: 'grammar', phrases: 'phrases', culture: 'culture', explore: 'explore' };
  for (const [tab, key] of Object.entries(tabs)) {
    const el = document.querySelector(`.tab[data-tab="${tab}"] span:last-child`);
    if (el) el.textContent = tBtn(key);
  }

  // Dropdown items
  const dropdowns = { music: 'music', movies: 'movies', poetry: 'poetry', proverbs: 'proverbs',
    folktales: 'folkTales', conversations: 'conversations', recipes: 'recipes', sports: 'sports',
    festivals: 'festivals', history: 'history', travel: 'travel', trivia: 'trivia', idioms: 'idioms' };
  for (const [mod, key] of Object.entries(dropdowns)) {
    const el = document.querySelector(`.dropdown-item[data-module="${mod}"]`);
    if (el) el.textContent = tBtn(key);
  }

  // Rating buttons (all 3 sets: verb, vocab, phrase)
  const ratings = { 1: 'again', 2: 'hard', 3: 'good', 4: 'easy' };
  document.querySelectorAll('.rating-btn').forEach(btn => {
    const r = btn.dataset.rating;
    if (ratings[r]) btn.textContent = tBtn(ratings[r]);
  });

  // Screen headings (h2 in static HTML)
  const headings = [
    ['#screen-verbs > h2', 'verbConjugation'],
    ['#screen-numbers > h2', 'numbers'],
    ['#screen-vocab > h2', 'vocabulary'],
    ['#screen-grammar > h2', 'grammar'],
    ['#screen-phrases > h2', 'phrases'],
    ['#screen-settings > h2', 'settings'],
    ['#screen-stats > h2', 'statistics'],
  ];
  for (const [sel, key] of headings) {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  }

  // Verb screen cards
  const cards = [
    ['[data-action="start-verb-learn"] .card-title', 'learnNewVerbs'],
    ['[data-action="start-verb-learn"] .card-subtitle', 'flashcardsDesc'],
    ['[data-action="start-verb-drill"] .card-title', 'conjugationDrill'],
    ['[data-action="start-verb-drill"] .card-subtitle', 'typeCorrectConj'],
    ['[data-action="start-verb-quiz"] .card-title', 'verbQuiz'],
    ['[data-action="start-verb-quiz"] .card-subtitle', 'mcAndFib'],
    ['[data-action="open-verb-patterns"] .card-title', 'irregularPatterns'],
    ['[data-action="open-verb-patterns"] .card-subtitle', 'practiceByPattern'],
    ['[data-action="open-verb-browser"] .card-title', 'verbBrowser'],
    ['[data-action="open-verb-browser"] .card-subtitle', 'browseVerbs'],
    ['[data-action="start-number-learn"] .card-title', 'learnNumbers'],
    ['[data-action="start-number-learn"] .card-subtitle', 'learnNumbersDesc'],
    ['[data-action="start-number-quiz"] .card-title', 'numberQuiz'],
    ['[data-action="start-number-quiz"] .card-subtitle', 'numberQuizDesc'],
    ['[data-action="start-time-quiz"] .card-title', 'tellingTime'],
    ['[data-action="start-time-quiz"] .card-subtitle', 'tellingTimeDesc'],
  ];
  for (const [sel, key] of cards) {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  }

  // Vocab category buttons
  const vocBtns = [
    ['[data-action="start-vocab-learn"]', 'learn'],
    ['[data-action="start-vocab-quiz"]', 'quiz'],
    ['[data-action="start-gender-quiz"]', 'genderDrill'],
    ['[data-action="start-phrase-learn"]', 'learn'],
  ];
  for (const [sel, key] of vocBtns) {
    document.querySelectorAll(sel).forEach(el => { el.textContent = tBtn(key); });
  }

  // Take Quiz buttons
  document.querySelectorAll('[data-action="start-grammar-quiz"], [data-action="start-culture-quiz"]').forEach(el => {
    el.textContent = tBtn('takeQuiz');
  });

  // Flashcard "Tap to reveal"
  document.querySelectorAll('.flashcard .front .text-muted.text-sm').forEach(el => {
    if (el.textContent.trim() === 'Tap to reveal' || el.textContent.trim() === 'Toca para ver')
      el.textContent = t('tapToReveal');
  });

  // Profile screen
  const subtitle = document.querySelector('.profile-screen .subtitle');
  if (subtitle) subtitle.textContent = t('dailySubtitle');
  const newProfBtn = document.querySelector('[data-action="create-profile"]');
  if (newProfBtn) newProfBtn.textContent = tBtn('newProfile');

  // Results screen buttons
  const retryBtn = document.querySelector('[data-action="results-retry"]');
  if (retryBtn) retryBtn.textContent = tBtn('tryAgain');
  const homeBtn = document.querySelector('[data-action="results-home"]');
  if (homeBtn) homeBtn.textContent = tBtn('done');

  // Placement results buttons
  const placeDoneBtn = document.querySelector('[data-action="placement-done"]');
  if (placeDoneBtn) placeDoneBtn.textContent = tBtn('startLearning');
  const retakeBtn = document.querySelector('[data-action="retake-placement"]');
  if (retakeBtn) retakeBtn.textContent = tBtn('retakeTest');
  const placeTitleEl = document.querySelector('#screen-placement-results h2');
  if (placeTitleEl) placeTitleEl.textContent = t('yourSpanishLevel');

  // Next buttons
  document.querySelectorAll('#vq-next, #vocq-next, #gq-next, #cq-next').forEach(el => {
    el.textContent = tBtn('next');
  });

  // Settings labels
  const settingsMap = [
    ['#screen-settings .settings-group:nth-child(1) > h3', 'display'],
    ['#screen-settings .settings-group:nth-child(2) > h3', 'learning'],
    ['#screen-settings .settings-group:nth-child(3) > h3', 'data'],
  ];
  for (const [sel, key] of settingsMap) {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  }

  // Settings row labels
  const settingLabels = document.querySelectorAll('#screen-settings .setting-label');
  const labelMap = { 'Display Mode': 'displayMode', 'Theme': 'theme', 'Color Palette': 'colorPalette',
    'Region': 'region', 'Accent Strictness': 'accentStrict', 'TTS Voice Speed': 'ttsSpeed',
    'Placement Test': 'placementTest' };
  const descMap = { 'How text is shown': 'howTextShown', 'Affects verb forms and vocabulary': 'regionDesc',
    'How strictly to check accents': 'accentDesc', 'Assess your level and unlock content': 'placementDesc' };
  settingLabels.forEach(el => {
    const origText = el.getAttribute('data-orig') || el.textContent.trim();
    if (!el.getAttribute('data-orig')) el.setAttribute('data-orig', origText);
    if (labelMap[origText]) el.textContent = t(labelMap[origText]);
  });
  document.querySelectorAll('#screen-settings .setting-desc').forEach(el => {
    const origText = el.getAttribute('data-orig') || el.textContent.trim();
    if (!el.getAttribute('data-orig')) el.setAttribute('data-orig', origText);
    if (descMap[origText]) el.textContent = t(descMap[origText]);
  });

  // Settings pill buttons
  const pillMap = {
    'Standard': 'standard', 'Immersion': 'immersion', 'Hints': 'hints',
    'Dark': 'dark', 'Light': 'light',
    'Latin America': 'latinAmerica', 'Spain': 'spain',
    'Strict': 'strict', 'Warn': 'warn', 'Lenient': 'lenient',
    'Slow': 'slow', 'Normal': 'normal', 'Fast': 'fast',
  };
  document.querySelectorAll('#screen-settings .pill').forEach(pill => {
    const origText = pill.getAttribute('data-orig') || pill.textContent.trim();
    if (!pill.getAttribute('data-orig')) pill.setAttribute('data-orig', origText);
    if (pillMap[origText]) pill.textContent = tBtn(pillMap[origText]);
  });

  // Settings action buttons
  const actionBtnMap = {
    'start-placement': 'takeTest', 'export-progress': 'exportProgress',
    'import-progress': 'importProgress', 'reset-progress': 'resetProgress',
  };
  for (const [action, key] of Object.entries(actionBtnMap)) {
    const el = document.querySelector(`#screen-settings [data-action="${action}"]`);
    if (el) el.textContent = tBtn(key);
  }

  // Search placeholders
  const verbSearch = document.getElementById('verb-search');
  if (verbSearch) verbSearch.placeholder = t('searchVerbs');
  const vocabSearch = document.getElementById('vocab-search');
  if (vocabSearch) vocabSearch.placeholder = t('searchVocab');

  // Verb drill static elements
  const vdInput = document.getElementById('vd-input');
  if (vdInput) vdInput.placeholder = t('typeConjugation');
  const vdCheckBtn = document.querySelector('[data-action="check-verb-drill"]');
  if (vdCheckBtn) vdCheckBtn.textContent = tBtn('check');

  // Placement next button
  const ptNextBtn = document.querySelector('[data-action="next-placement"]');
  if (ptNextBtn) ptNextBtn.textContent = tBtn('next');

  // Verb browser filter buttons
  const filterMap = { all: 'all', regular: 'regular', irregular: 'irregular', 'stem-changing': 'stem', reflexive: 'reflexive' };
  document.querySelectorAll('[data-action="filter-verbs"]').forEach(btn => {
    const filter = btn.dataset.filter;
    if (filterMap[filter]) btn.textContent = tBtn(filterMap[filter]);
  });

  // Stats screen
  const masteryTitle = document.querySelector('#screen-stats .card:nth-child(2) .card-title');
  if (masteryTitle) masteryTitle.textContent = t('masteryBreakdown');
  const calTitle = document.querySelector('#screen-stats .card:nth-child(3) .card-title');
  if (calTitle) calTitle.textContent = t('practiceCalendar');

  // Nav title
  const navTitle = document.querySelector('.nav-title');
  if (navTitle) navTitle.textContent = 'Lección Diaria';
}

function setSetting(key, val) {
  if (!progress) return;
  if (key === 'ttsRate') val = parseFloat(val);
  progress.settings[key] = val;
  saveProgress();
  applySettings();
}

// ════════════════════════════════════════
//  XP / STREAK
// ════════════════════════════════════════

function addXP(amount) {
  if (!progress) return;
  progress.xp += amount;
  const today = todayStr();
  progress.practiceLog[today] = (progress.practiceLog[today] || 0) + amount;
  checkStreak();
  saveProgress();
  updateNavStats();
}

function checkStreak() {
  const today = todayStr();
  if (progress.lastDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const ys = dateStr(yesterday);
  if (progress.lastDate === ys) {
    progress.streak++;
  } else if (progress.lastDate !== today) {
    if (progress.freezeTokens > 0 && progress.lastDate) {
      progress.freezeTokens--;
    } else {
      progress.streak = 1;
    }
  }
  progress.lastDate = today;
  if (progress.streak > progress.longestStreak) progress.longestStreak = progress.streak;
}

function updateNavStats() {
  if (!progress) return;
  document.getElementById('nav-xp').textContent = progress.xp + ' XP';
  document.getElementById('nav-streak').textContent = progress.streak + 'd';
}

// ════════════════════════════════════════
//  FSRS HELPERS
// ════════════════════════════════════════

function reviewItem(fsrsStore, masteryStore, key, rating) {
  const now = Date.now();
  let rec = fsrsStore[key];
  if (!rec) {
    const s = fsrsInitS(rating);
    const d = fsrsInitD(rating);
    rec = { s, d, lastRev: now };
  } else {
    const elapsed = (now - rec.lastRev) / (1000 * 60 * 60 * 24);
    const r = fsrsR(rec.s, elapsed);
    const newD = fsrsNextD(rec.d, rating);
    const newS = rating === FSRS_AGAIN
      ? fsrsSAfterForgetting(rec.d, rec.s, r)
      : fsrsSAfterRecall(rec.d, rec.s, r, rating);
    rec = { s: newS, d: newD, lastRev: now };
  }
  fsrsStore[key] = rec;
  masteryStore[key] = masteryFromFsrs(rec.s);
  saveProgress();
}

function isDue(fsrsStore, key) {
  const rec = fsrsStore[key];
  if (!rec) return true;
  const elapsed = (Date.now() - rec.lastRev) / (1000 * 60 * 60 * 24);
  const r = fsrsR(rec.s, elapsed);
  return r < 0.9;
}

function getDueItems(fsrsStore, allKeys) {
  return allKeys.filter(k => isDue(fsrsStore, k));
}

// ════════════════════════════════════════
//  TEXT-TO-SPEECH
// ════════════════════════════════════════

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES';
  u.rate = progress?.settings?.ttsRate || 1;
  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es'));
  if (esVoice) u.voice = esVoice;
  window.speechSynthesis.speak(u);
}

// ════════════════════════════════════════
//  ANSWER CHECKING
// ════════════════════════════════════════

function stripAccents(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/gi, 'n');
}

function checkAnswer(input, correct) {
  const inp = input.trim().toLowerCase();
  const cor = correct.trim().toLowerCase();
  if (inp === cor) return { correct: true, accentWarn: false };
  // Accent-insensitive check
  if (stripAccents(inp) === stripAccents(cor)) {
    const mode = progress?.settings?.accents || 'warn';
    if (mode === 'strict') return { correct: false, accentWarn: true };
    if (mode === 'lenient') return { correct: true, accentWarn: false };
    return { correct: true, accentWarn: true };
  }
  return { correct: false, accentWarn: false };
}

// ════════════════════════════════════════
//  UTILITY
// ════════════════════════════════════════

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// Generic MC option selection helper
function selectMCOption(containerSelector, idx) {
  const btns = document.querySelectorAll(`${containerSelector} .quiz-option`);
  if (btns[0]?.classList.contains('disabled')) return;
  btns.forEach(btn => btn.classList.remove('selected'));
  if (btns[idx]) btns[idx].classList.add('selected');
  const submitBtn = document.querySelector(`${containerSelector} .mc-submit`);
  if (submitBtn) submitBtn.style.display = 'block';
}
function todayStr() { return dateStr(new Date()); }
function dateStr(d) { return d.toISOString().slice(0, 10); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { return shuffle(arr).slice(0, n); }

// ════════════════════════════════════════
//  TODAY SCREEN
// ════════════════════════════════════════

function renderToday() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? '¡Buenos días!' : hour < 18 ? '¡Buenas tardes!' : '¡Buenas noches!';
  document.getElementById('today-greeting').textContent = greet;
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Section headers
  document.querySelector('#screen-today .today-section:nth-child(3) h2').textContent = t('continueLearning');
  document.querySelector('#screen-today .today-section:nth-child(4) h2').textContent = t('dueForReview');
  document.querySelector('#screen-today .today-section:nth-child(5) h2').textContent = t('dailyPractice');

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

  // Continue learning
  const cont = document.getElementById('today-continue');
  cont.innerHTML = `
    <div class="card" data-action="switch-tab" data-tab="verbs" style="cursor:pointer">
      <div class="card-title">${t('verbConjugation')}</div>
      <div class="card-subtitle">${verbsLearned} ${t('formsPracticedLC')}</div>
    </div>
    <div class="card" data-action="switch-tab" data-tab="vocab" style="cursor:pointer">
      <div class="card-title">${t('vocabulary')}</div>
      <div class="card-subtitle">${vocabLearned} ${t('wordsLearnedLC')}</div>
    </div>
    <div class="card" data-action="switch-tab" data-tab="grammar" style="cursor:pointer">
      <div class="card-title">${tBtn('grammar')}</div>
      <div class="card-subtitle">${grammarDone} ${t('lessonsCompleted')}</div>
    </div>
  `;

  // Due for review
  const dueVerbs = typeof VERB_DATA !== 'undefined' ? getDueItems(progress.verbFsrs, Object.keys(progress.verbFsrs)) : [];
  const dueVocab = typeof VOCAB_DATA !== 'undefined' ? getDueItems(progress.vocabFsrs, Object.keys(progress.vocabFsrs)) : [];
  const reviewDiv = document.getElementById('today-review');
  const totalDue = dueVerbs.length + dueVocab.length;
  if (totalDue > 0) {
    reviewDiv.innerHTML = `
      <div class="card" style="cursor:pointer" data-action="start-review">
        <div class="card-title">${totalDue} ${t('itemsDue')}</div>
        <div class="card-subtitle">${dueVerbs.length} ${t('verbsLC')}, ${dueVocab.length} ${t('vocabularyLC')}</div>
      </div>
    `;
  } else {
    reviewDiv.innerHTML = `<p class="text-muted text-sm">${t('allCaughtUp')}</p>`;
  }

  // Daily practice
  document.getElementById('today-practice').innerHTML = `
    <div class="card" data-action="start-verb-drill" style="cursor:pointer">
      <div class="card-title">${t('quickDrill')}</div>
      <div class="card-subtitle">${t('quickDrillDesc')}</div>
    </div>
  `;
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
}

// ── Verb Learn (Flashcards) ──
function startVerbLearn() {
  if (typeof VERB_DATA === 'undefined') return;
  // Use all simple tenses (no compound/progressive for flashcards)
  const tenses = Object.keys(TENSE_META).filter(t =>
    !TENSE_META[t].compound && !TENSE_META[t].progressive
  );
  verbLearnQueue = [];
  const verbs = pickN(VERB_DATA, 10);
  verbs.forEach(v => {
    const tense = pick(tenses);
    const person = Math.floor(Math.random() * 6);
    verbLearnQueue.push({ verb: v, tense, person });
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

  const answer = conjugate(item.verb.infinitive, item.tense, item.person);
  document.getElementById('vl-answer').textContent = answer;

  // Build mini conjugation table for the back
  const all = conjugateAll(item.verb.infinitive, item.tense);
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
  // All simple tenses + progressive for typing drill
  const tenses = Object.keys(TENSE_META).filter(t => !TENSE_META[t].compound);
  verbDrillQueue = [];
  for (let i = 0; i < 10; i++) {
    const verb = pick(VERB_DATA);
    const tense = pick(tenses);
    const person = Math.floor(Math.random() * 6);
    const answer = conjugate(verb.infinitive, tense, person);
    if (!answer || answer === '—' || answer === '?') { i--; continue; }
    verbDrillQueue.push({ verb, tense, person, answer });
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

  const key = `${item.verb.infinitive}:${item.tense}:${item.person}`;

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
      <div class="card" data-action="start-pattern-drill" data-pattern="${key}" style="cursor:pointer">
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
    const isImperative = tense === 'imperative_aff' || tense === 'imperative_neg';
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
  // All tenses including compound and progressive
  const tenses = Object.keys(TENSE_META);
  verbQuizQueue = [];
  for (let i = 0; i < 10; i++) {
    const verb = pick(VERB_DATA);
    const tense = pick(tenses);
    const person = Math.floor(Math.random() * 6);
    const correct = conjugate(verb.infinitive, tense, person);
    if (!correct || correct === '—' || correct === '?') { i--; continue; }
    // Generate wrong options
    const wrongs = new Set();
    while (wrongs.size < 3) {
      const wv = pick(VERB_DATA);
      const wp = Math.floor(Math.random() * 6);
      const w = conjugate(wv.infinitive, tense, wp);
      if (w !== correct && w !== '—' && w !== '?') wrongs.add(w);
    }
    const options = shuffle([correct, ...wrongs]);
    verbQuizQueue.push({
      verb, tense, person, correct, options,
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
  const btns = document.querySelectorAll('#vq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (item.options[i] === item.correct) btn.classList.add('correct');
    if (i === idx && selected !== item.correct) btn.classList.add('incorrect');
  });
  if (selected === item.correct) {
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
      <table class="conj-table mt-1">
        ${PERSONS.map((p, i) => `<tr><td style="width:40%">${PERSON_LABELS[p]}</td><td>${forms[i]}</td></tr>`).join('')}
      </table>
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
      <table class="conj-table mt-1">
        ${PERSONS.map((p, i) => `<tr><td style="width:40%">${PERSON_LABELS[p]}</td><td>${forms[i]}</td></tr>`).join('')}
      </table>
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

function renderVocabHome() {
  if (typeof VOCAB_DATA === 'undefined' || typeof VOCAB_CATEGORIES === 'undefined') {
    document.getElementById('vocab-categories').innerHTML = `<p class="text-muted">${t('vocabLoading')}</p>`;
    return;
  }
  const learned = Object.keys(progress.vocabMastery).length;
  document.getElementById('vocab-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${learned}</div><div class="stat-desc">${t('wordsLearned')}</div></div>
    <div class="stat-card"><div class="stat-num">${VOCAB_DATA.length}</div><div class="stat-desc">${t('totalWords')}</div></div>
  `;

  const grid = document.getElementById('vocab-categories');
  grid.innerHTML = Object.entries(VOCAB_CATEGORIES).map(([key, cat]) => {
    const count = VOCAB_DATA.filter(v => v.category === key).length;
    return `<div class="card" data-action="open-vocab-cat" data-cat="${key}" style="cursor:pointer">
      <div class="card-icon">${cat.icon || ''}</div>
      <div class="card-title text-sm">${esc(cat.title)}</div>
      <div class="card-subtitle text-xs">${count} ${t('words')}</div>
    </div>`;
  }).join('');
}

function openVocabCategory(cat) {
  if (typeof VOCAB_DATA === 'undefined') return;
  currentVocabCategory = cat;
  const catInfo = VOCAB_CATEGORIES[cat];
  showScreen('vocab-cat');
  document.getElementById('vcat-title').textContent = catInfo ? `${catInfo.title} (${catInfo.titleEn})` : cat;

  const words = VOCAB_DATA.filter(v => v.category === cat);
  document.getElementById('vcat-words').innerHTML = words.map(w => `
    <div class="card" style="padding:0.6rem 0.75rem">
      <div class="flex justify-between items-center">
        <div>
          ${w.gender ? `<span class="word-gender ${w.gender}" style="font-size:0.65rem;padding:0.05rem 0.3rem">${w.gender === 'f' ? 'la' : 'el'}</span>` : ''}
          <strong>${esc(w.word)}</strong>
          <span class="text-muted text-sm"> — ${esc(w.english)}</span>
        </div>
        <button class="tts-btn" data-action="speak" data-text="${esc(w.word)}">&#128266;</button>
      </div>
      ${w.example ? `<div class="text-sm text-muted mt-1">${esc(w.example)}</div>` : ''}
    </div>
  `).join('');
}

// ── Vocab Learn (Flashcards) ──
function startVocabLearn() {
  if (typeof VOCAB_DATA === 'undefined') return;
  const words = currentVocabCategory
    ? VOCAB_DATA.filter(v => v.category === currentVocabCategory)
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
  const pool = currentVocabCategory
    ? VOCAB_DATA.filter(v => v.category === currentVocabCategory)
    : VOCAB_DATA;
  if (pool.length < 4) return;

  vocabQuizQueue = [];
  const words = pickN(pool, Math.min(10, pool.length));
  words.forEach(w => {
    const wrongs = pickN(pool.filter(x => x.word !== w.word), 3).map(x => x.english);
    const options = shuffle([w.english, ...wrongs]);
    vocabQuizQueue.push({ word: w, options, correct: w.english, type: 'mc' });
  });
  vocabQuizIdx = 0;
  vocabQuizScore = 0;
  showScreen('vocab-quiz');
  renderVocabQuizQuestion();
}

function renderVocabQuizQuestion() {
  if (vocabQuizIdx >= vocabQuizQueue.length) {
    showResults(vocabQuizScore, vocabQuizQueue.length, 'vocab-quiz', t('vocabQuizLabel'));
    return;
  }
  const item = vocabQuizQueue[vocabQuizIdx];
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
  if (selected === item.correct) {
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
  const correctIdx = item.correct === 'el (masculine)' ? 0 : 1;
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
  const pool = (currentVocabCategory
    ? VOCAB_DATA.filter(v => v.category === currentVocabCategory)
    : VOCAB_DATA).filter(v => v.gender);
  if (pool.length < 4) return;

  vocabQuizQueue = pickN(pool, Math.min(10, pool.length)).map(w => ({
    word: w,
    options: ['el (masculine)', 'la (feminine)'],
    correct: w.gender === 'm' ? 'el (masculine)' : 'la (feminine)',
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
    document.getElementById('grammar-levels').innerHTML = `<p class="text-muted">${t('grammarLoading')}</p>`;
    return;
  }
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let html = '';
  levels.forEach(level => {
    const lessons = GRAMMAR_DATA.filter(l => l.level === level);
    if (!lessons.length) return;
    html += `<h3 class="text-sm text-muted mt-2 mb-1">${level}</h3>`;
    lessons.forEach(l => {
      const done = progress.grammarDone[l.id];
      html += `<div class="card" data-action="open-grammar-lesson" data-lesson="${esc(l.id)}" style="cursor:pointer">
        <div class="flex justify-between items-center">
          <div>
            <div class="card-title">${l.order}. ${esc(l.titleEn || l.title)}</div>
            <div class="card-subtitle">${esc(l.shortDesc || '')}</div>
          </div>
          ${done ? `<span class="mastery-badge mastery-4">${tBtn('done')}</span>` : ''}
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

  // Render lesson content (already HTML)
  document.getElementById('gl-content').innerHTML = lesson.content || '';

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
  grammarQuizQueue = [...currentLesson.quiz];
  grammarQuizIdx = 0;
  grammarQuizScore = 0;
  showScreen('grammar-quiz');
  renderGrammarQuizQuestion();
}

function renderGrammarQuizQuestion() {
  if (grammarQuizIdx >= grammarQuizQueue.length) {
    progress.grammarDone[currentLesson.id] = true;
    saveProgress();
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
    document.getElementById('phrases-situations').innerHTML = `<p class="text-muted">${t('phrasesLoading')}</p>`;
    return;
  }
  const grid = document.getElementById('phrases-situations');
  grid.innerHTML = PHRASES_SITUATIONS.map(s => `
    <div class="card" data-action="open-phrase-sit" data-sit="${esc(s.slug)}" style="cursor:pointer">
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
let cultureQuizQueue = [];
let cultureQuizIdx = 0;
let cultureQuizScore = 0;

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
    <div class="card" data-action="open-culture-item" data-id="${esc(item.id)}" style="cursor:pointer">
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

function startCultureQuiz() {
  if (!currentCultureItem || !currentCultureItem.quiz || !currentCultureItem.quiz.length) return;
  cultureQuizQueue = [...currentCultureItem.quiz];
  cultureQuizIdx = 0;
  cultureQuizScore = 0;
  showScreen('culture-quiz');
  renderCultureQuizQuestion();
}

function renderCultureQuizQuestion() {
  if (cultureQuizIdx >= cultureQuizQueue.length) {
    showResults(cultureQuizScore, cultureQuizQueue.length, 'culture-quiz', t('cultureQuizLabel'));
    return;
  }
  const q = cultureQuizQueue[cultureQuizIdx];
  document.getElementById('cq-progress').textContent = `${cultureQuizIdx + 1} / ${cultureQuizQueue.length}`;
  const container = document.getElementById('cq-container');
  document.getElementById('cq-next').style.display = 'none';

  container.innerHTML = `
    <div class="quiz-question">${esc(q.prompt)}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) =>
        `<button class="quiz-option" data-action="answer-culture-quiz" data-idx="${i}">${esc(opt)}</button>`
      ).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-culture-quiz-mc" style="display:none">${tBtn('submit')}</button>
  `;
}

function answerCultureQuizMC(idx) {
  selectMCOption('#cq-container', idx);
}

function submitCultureQuizMC() {
  const selectedBtn = document.querySelector('#cq-container .quiz-option.selected');
  if (!selectedBtn) return;
  const idx = parseInt(selectedBtn.dataset.idx);
  const q = cultureQuizQueue[cultureQuizIdx];
  const btns = document.querySelectorAll('#cq-container .quiz-option');
  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.correct) btn.classList.add('correct');
    if (i === idx && idx !== q.correct) btn.classList.add('incorrect');
  });
  if (idx === q.correct) { cultureQuizScore++; addXP(5); }
  else { addXP(1); }
  const submitBtn = document.querySelector('#cq-container .mc-submit');
  if (submitBtn) submitBtn.style.display = 'none';
  if (q.explanation) {
    const expDiv = document.createElement('div');
    expDiv.className = 'quiz-feedback text-muted';
    expDiv.style.fontSize = '0.85rem';
    expDiv.textContent = q.explanation;
    document.getElementById('cq-container').appendChild(expDiv);
  }
  document.getElementById('cq-next').style.display = 'flex';
}

function nextCultureQuiz() {
  cultureQuizIdx++;
  renderCultureQuizQuestion();
}

// ════════════════════════════════════════
//  RESULTS SCREEN
// ════════════════════════════════════════

let lastQuizModule = '';

function showResults(score, total, module, label) {
  lastQuizModule = module;
  showScreen('results');
  const pct = Math.round((score / total) * 100);
  document.getElementById('res-score').textContent = `${pct}%`;
  document.getElementById('res-label').textContent = `${score} / ${total} ${t('correctLabel').toLowerCase()} — ${label}`;
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

// Detect English/Spanish cognates — words similar enough to guess without knowing Spanish.
// Uses normalized Levenshtein distance: cognate if edit distance / max length < 0.35
function isCognate(spanish, english) {
  const s = spanish.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const e = english.toLowerCase();
  if (s === e) return true;
  const maxLen = Math.max(s.length, e.length);
  if (maxLen <= 2) return s === e;
  // Levenshtein distance
  const dp = Array.from({ length: s.length + 1 }, (_, i) => {
    const row = new Array(e.length + 1);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= e.length; j++) dp[0][j] = j;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= e.length; j++) {
      dp[i][j] = s[i-1] === e[j-1] ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  return dp[s.length][e.length] / maxLen < 0.35;
}

function buildPlacementVocabQs(level, count) {
  if (typeof VOCAB_DATA === 'undefined') return [];
  // Exclude cognates from B1+ — they're trivially guessable at higher levels
  const levelIdx = LEVEL_ORDER[level] || 0;
  const words = VOCAB_DATA.filter(w => w.level === level
    && (levelIdx < 3 || !isCognate(w.word, w.english)));
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
  const simpleTenses = Object.keys(TENSE_META).filter(t => !TENSE_META[t].compound);

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
    const isImperative = tense === 'imperative_aff' || tense === 'imperative_neg';
    const person = isImperative ? (1 + Math.floor(Math.random() * 5)) : Math.floor(Math.random() * 6);
    const correct = conjugate(v.infinitive, tense, person);
    if (!correct || correct === '—' || correct === '?') return null;
    // Build harder distractors: same verb in different persons/tenses
    const wrongs = new Set();
    let attempts = 0;
    // First: same verb, different tense, same person (shares person marker)
    while (wrongs.size < 2 && attempts < 20) {
      const wt = pick(simpleTenses.filter(t => t !== tense));
      if (wt === 'imperative_aff' || wt === 'imperative_neg') { attempts++; continue; }
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

  // 1. Add dedicated placement questions (placement_questions.js)
  if (typeof PLACEMENT_QUESTIONS !== 'undefined') {
    for (const q of PLACEMENT_QUESTIONS) {
      pool.push({ ...q, source: 'dedicated' });
    }
  }

  // 2. Add generated questions from existing content (grammar, vocab, verbs)
  for (const level of PLACEMENT_LEVELS) {
    const diff = LEVEL_DIFFICULTY[level];
    const grammar = buildPlacementGrammarQs(level, 5);
    grammar.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-g-${pool.length}`, source: 'generated' }));
    const vocab = buildPlacementVocabQs(level, 5);
    vocab.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-v-${pool.length}`, source: 'generated' }));
    const verbs = buildPlacementVerbQs(level, 4);
    verbs.forEach(q => pool.push({ ...q, difficulty: diff + (Math.random() - 0.5) * 0.4, id: `gen-vb-${pool.length}`, source: 'generated' }));
  }

  // 3. Add freq-vocab recognition questions
  if (typeof FREQ_VOCAB !== 'undefined') {
    pool.push(...buildFreqVocabQuestions(20));
  }

  return pool;
}

function buildFreqVocabQuestions(count) {
  // Generate vocab questions by matching FREQ_VOCAB words against VOCAB_DATA (which has translations)
  if (typeof VOCAB_DATA === 'undefined') return [];
  const questions = [];

  // Build lookup of freq words that also have translations in VOCAB_DATA
  const vocabByWord = Object.create(null);
  for (const v of VOCAB_DATA) vocabByWord[v.word.toLowerCase()] = v;

  // Find freq_vocab entries that have corresponding VOCAB_DATA entries
  // Exclude cognates from B1+ levels — they're trivially guessable
  const matchable = FREQ_VOCAB.filter(fw => {
    const v = vocabByWord[fw.w.toLowerCase()];
    if (!v) return false;
    const levelIdx = LEVEL_ORDER[fw.l] || 0;
    return levelIdx < 3 || !isCognate(fw.w, v.english);
  });
  if (matchable.length < 10) return [];

  // Sample across difficulty levels
  const levelSamples = { A1: 2, A2: 3, B1: 3, B2: 4, C1: 4, C2: 4 };

  for (const [level, n] of Object.entries(levelSamples)) {
    const wordsAtLevel = matchable.filter(w => w.l === level);
    if (wordsAtLevel.length < 4) continue;
    const picked = pickN(wordsAtLevel, Math.min(n, wordsAtLevel.length));
    for (const fw of picked) {
      const vocabEntry = vocabByWord[fw.w.toLowerCase()];
      const diff = LEVEL_DIFFICULTY[level] + (Math.random() - 0.5) * 0.3;
      // Get distractors from same level in VOCAB_DATA
      const sameLevel = VOCAB_DATA.filter(v => v.level === level && v.word.toLowerCase() !== fw.w.toLowerCase());
      if (sameLevel.length < 3) continue;
      const wrongs = pickN(sameLevel, 3);
      const reverse = Math.random() < 0.5;
      if (reverse) {
        questions.push({
          id: `fv-${fw.r}`,
          level, difficulty: diff, domain: 'vocab', type: 'mc',
          prompt: `${t('howDoYouSay')} "${esc(vocabEntry.english)}" ${t('inSpanish')}`,
          answer: vocabEntry.word,
          options: shuffle([vocabEntry.word, ...wrongs.map(w => w.word)]),
          explanation: `${vocabEntry.word} = ${vocabEntry.english}`,
          source: 'freq',
        });
      } else {
        questions.push({
          id: `fv-${fw.r}`,
          level, difficulty: diff, domain: 'vocab', type: 'mc',
          prompt: `${t('whatDoesMean')} "${esc(vocabEntry.word)}" ${t('mean')}`,
          answer: vocabEntry.english,
          options: shuffle([vocabEntry.english, ...wrongs.map(w => w.english)]),
          explanation: `${vocabEntry.word} = ${vocabEntry.english}`,
          source: 'freq',
        });
      }
    }
  }
  return questions;
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
    if (state.profile !== currentProfile || state.idx >= 40) {
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
  placementQuestions = buildPlacementIRTPool();
  placementIdx = 0;
  placementThetas = { grammar: 3.0, vocab: 3.0 };
  placementHistory = [];
  placementSEs = { grammar: 2.0, vocab: 2.0 };
  placementUsedIds = new Set();
  placementLastDomains = [];
  savePlacementState();
  showScreen('placement');
  renderPlacementQuestion();
}

// IRT: Select next question with difficulty closest to current theta
function selectNextIRTQuestion() {
  const available = placementQuestions.filter(q => !placementUsedIds.has(q.id));
  if (available.length === 0) return null;

  // Count questions asked per scoring group so far
  const counts = { grammar: 0, vocab: 0 };
  for (const h of placementHistory) counts[scoringGroup(h.domain)]++;
  const total = placementHistory.length;
  const remaining = 40 - total;

  // Target ~60% grammar, ~40% vocab for balanced estimates
  const grammarNeed = Math.max(0, 24 - counts.grammar);
  const vocabNeed = Math.max(0, 16 - counts.vocab);
  let preferredGroup = null;
  if (remaining > 0) {
    if (vocabNeed >= remaining) preferredGroup = 'vocab';
    else if (grammarNeed >= remaining) preferredGroup = 'grammar';
  }

  // Consecutive-domain penalty
  const lastTwo = placementLastDomains.slice(-2);
  const allSame = lastTwo.length === 2 && lastTwo[0] === lastTwo[1];

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
  if (placementIdx >= 40) { finishPlacementTest(); return; }

  const q = selectNextIRTQuestion();
  if (!q) { finishPlacementTest(); return; }

  placementUsedIds.add(q.id);
  // Store current question for answer checking
  placementQuestions._current = q;

  // Update UI
  const estimatedLevel = thetaToLevel((placementThetas.grammar + placementThetas.vocab) / 2);
  document.getElementById('pt-progress').textContent = `${placementIdx + 1} / 40`;
  const pct = Math.round(((placementIdx) / 40) * 100);
  document.getElementById('pt-progress-bar-fill').style.width = pct + '%';
  document.getElementById('pt-level-badge').textContent = `${t('testingLevel')} ${estimatedLevel}`;
  document.getElementById('pt-level-badge').style.background = (GRAMMAR_LEVELS || {})[estimatedLevel]?.color || 'var(--accent)';
  document.getElementById('pt-next').style.display = 'none';

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
  const q = placementQuestions._current;
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
  const q = placementQuestions._current;
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
  return {
    grammar: thetaToLevel(placementThetas.grammar),
    vocab: thetaToLevel(placementThetas.vocab),
    overall: thetaToLevel((placementThetas.grammar + placementThetas.vocab) / 2),
  };
}

function seedMatureFsrs(store, key) {
  store[key] = { s: 30, d: 5, lastRev: Date.now() };
}

function applyPlacementResults(levels) {
  const grammarLevel = levels.grammar;
  const vocabLevel = levels.vocab;

  // Mark grammar lessons as done (uses grammar level)
  if (typeof GRAMMAR_DATA !== 'undefined') {
    GRAMMAR_DATA.forEach(l => {
      if (levelAtOrBelow(l.level, grammarLevel)) {
        progress.grammarDone[l.id] = true;
      }
    });
  }

  // Mark vocab as mastered (uses vocab level)
  if (typeof VOCAB_DATA !== 'undefined') {
    VOCAB_DATA.forEach(w => {
      if (levelAtOrBelow(w.level, vocabLevel)) {
        progress.vocabMastery[w.word] = 3;
        seedMatureFsrs(progress.vocabFsrs, w.word);
      }
    });
  }

  // Mark verb forms as mastered (uses grammar level — conjugation is structural)
  if (typeof VERB_DATA !== 'undefined' && typeof TENSE_META !== 'undefined') {
    VERB_DATA.forEach(v => {
      if (!levelAtOrBelow(v.level, grammarLevel)) return;
      Object.keys(TENSE_META).forEach(tense => {
        if (!levelAtOrBelow(TENSE_META[tense].level, grammarLevel)) return;
        for (let p = 0; p < 6; p++) {
          const key = `${v.infinitive}:${tense}:${p}`;
          progress.verbMastery[key] = 3;
          seedMatureFsrs(progress.verbFsrs, key);
        }
      });
    });
  }

  progress.placementLevel = levels.overall;  // backward compat
  progress.placementLevels = { grammar: grammarLevel, vocab: vocabLevel };
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
  const gInfo = GRAMMAR_LEVELS?.[levels.grammar] || { color: '#888' };
  const vInfo = GRAMMAR_LEVELS?.[levels.vocab] || { color: '#888' };
  const gTheta = Math.round(placementThetas.grammar * 100) / 100;
  const vTheta = Math.round(placementThetas.vocab * 100) / 100;
  const gSE = Math.round(placementSEs.grammar * 100) / 100;
  const vSE = Math.round(placementSEs.vocab * 100) / 100;
  const totalCorrect = placementHistory.filter(h => h.correct).length;

  breakdownHtml += `
    <div style="display:flex;gap:1.5rem;justify-content:center;margin-bottom:1rem">
      <div style="text-align:center">
        <div style="font-size:0.75rem;color:var(--text-muted)">${t('grammarLevel')}</div>
        <div class="level-badge" style="background:${gInfo.color};display:inline-block;padding:0.25rem 0.75rem;border-radius:0.5rem;color:#fff;font-weight:700;font-size:1.1rem">${levels.grammar}</div>
        <div style="font-size:0.7rem;color:var(--text-muted)">${gTheta} &plusmn; ${gSE}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:0.75rem;color:var(--text-muted)">${t('vocabLevel')}</div>
        <div class="level-badge" style="background:${vInfo.color};display:inline-block;padding:0.25rem 0.75rem;border-radius:0.5rem;color:#fff;font-weight:700;font-size:1.1rem">${levels.vocab}</div>
        <div style="font-size:0.7rem;color:var(--text-muted)">${vTheta} &plusmn; ${vSE}</div>
      </div>
    </div>
    <div style="text-align:center;margin-bottom:0.75rem;font-size:0.85rem;color:var(--text-muted)">
      ${totalCorrect}/${placementHistory.length} ${t('correctLabel')}
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

  // Message showing per-domain results
  const grammarCount = GRAMMAR_DATA?.filter(l => levelAtOrBelow(l.level, levels.grammar)).length || 0;
  const vocabCount = VOCAB_DATA?.filter(w => levelAtOrBelow(w.level, levels.vocab)).length || 0;
  document.getElementById('ptr-message').innerHTML =
    t('placementResultMsgDual')
      .replace('%gl', levels.grammar).replace('%g', grammarCount)
      .replace('%vl', levels.vocab).replace('%v', vocabCount);
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
  if (!container || typeof MINIMAL_PAIR_CATEGORIES === 'undefined') return;
  container.innerHTML = Object.entries(MINIMAL_PAIR_CATEGORIES).map(([key, cat]) => `
    <div class="card" data-action="start-mp" data-cat="${key}" style="cursor:pointer">
      <div class="card-title">${esc(cat.titleEn || cat.title)}</div>
      <div class="card-subtitle">${esc(cat.options?.join(' vs ') || '')}</div>
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

// ── Sentence Construction ──

function startSentenceBuild() {
  if (typeof SENTENCE_CONSTRUCTION === 'undefined') return;
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
    <div class="card" data-action="start-cloze" data-topic="${t}" style="cursor:pointer">
      <div class="card-title">${esc(topicLabels[t] || t)}</div>
    </div>
  `).join('') + `
    <div class="card" data-action="start-cloze" data-topic="all" style="cursor:pointer">
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
  trQueue = items; trIdx = 0; trScore = 0;
  showScreen('translation');
  renderTranslationQuestion();
}

function renderTranslationQuestion() {
  if (trIdx >= trQueue.length) { showResults(trScore, trQueue.length, 'tr', 'Translation Drills'); return; }
  const item = trQueue[trIdx];
  document.getElementById('tr-progress').textContent = `${trIdx + 1} / ${trQueue.length}`;
  document.getElementById('tr-prompt').innerHTML = `Translate to Spanish: <strong>${esc(item.english)}</strong>`;
  document.getElementById('tr-input').value = '';
  document.getElementById('tr-feedback').style.display = 'none';
  document.getElementById('tr-next').style.display = 'none';
  setTimeout(() => document.getElementById('tr-input')?.focus(), 50);
}

function checkTranslation() {
  const item = trQueue[trIdx];
  const input = document.getElementById('tr-input').value.trim();
  if (!input) return;
  const allCorrect = [item.primary, ...(item.acceptable || [])];

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

  // Tier 3: key word analysis for partial credit feedback
  let keyHits = [], keyMisses = [];
  if (!correct && item.keyWords) {
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
    if (accentWarn) html += `<div class="text-muted text-sm">Watch your accents: ${esc(item.primary)}</div>`;
  } else {
    html = `<div class="text-incorrect">✗ Model answer: <strong>${esc(item.primary)}</strong></div>`;
    if (item.acceptable?.length) {
      html += `<div class="text-muted text-sm">Also accepted: ${item.acceptable.map(a => esc(a)).join(', ')}</div>`;
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
//  EVENT DELEGATION
// ════════════════════════════════════════

document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target) {
    closeDropdowns();
    return;
  }
  const action = target.dataset.action;

  switch (action) {
    // Navigation
    case 'go-back': goBack(); break;
    case 'switch-tab': switchTab(target.dataset.tab); break;
    case 'toggle-theme': {
      const cur = progress?.settings?.theme || 'dark';
      setSetting('theme', cur === 'dark' ? 'light' : 'dark');
      break;
    }
    case 'open-settings': showScreen('settings'); break;

    // Profile
    case 'select-profile': selectProfile(target.dataset.name); break;
    case 'create-profile': createProfile(); break;
    case 'confirm-create-profile': confirmCreateProfile(); break;

    // Modal
    case 'close-modal': closeModal(); break;

    // Settings
    case 'set-display': setSetting('display', target.dataset.val); break;
    case 'set-theme': setSetting('theme', target.dataset.val); break;
    case 'set-palette': setSetting('palette', target.dataset.val); break;
    case 'set-region': setSetting('region', target.dataset.val); break;
    case 'set-accents': setSetting('accents', target.dataset.val); break;
    case 'set-tts-rate': setSetting('ttsRate', target.dataset.val); break;
    case 'export-progress': exportProgress(); break;
    case 'import-progress': importProgress(); break;
    case 'reset-progress': {
      showModal(t('resetTitle'), `<p>${t('resetConfirm')}</p>`, [
        { label: tBtn('cancel'), action: 'close-modal', cls: 'btn-secondary' },
        { label: tBtn('reset'), action: 'confirm-reset', cls: 'btn-primary' },
      ]);
      break;
    }
    case 'confirm-reset': {
      progress = newProgress();
      saveProgress();
      updateNavStats();
      closeModal();
      switchTab('today');
      break;
    }

    // Verbs
    case 'start-verb-learn': startVerbLearn(); break;
    case 'start-verb-drill': startVerbDrill(); break;
    case 'start-verb-quiz': startVerbQuiz(); break;
    case 'open-verb-patterns': showScreen('verb-patterns'); renderVerbPatterns(); break;
    case 'start-pattern-drill': startPatternDrill(target.dataset.pattern || target.closest('[data-pattern]')?.dataset.pattern); break;
    case 'open-verb-browser': renderVerbBrowser(); break;
    case 'flip-verb-card': flipVerbCard(); break;
    case 'rate-verb': rateVerb(parseInt(target.dataset.rating)); break;
    case 'check-verb-drill': checkVerbDrill(); break;
    case 'next-verb-drill': nextVerbDrill(); break;
    case 'answer-verb-quiz': answerVerbQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-verb-quiz-mc': submitVerbQuizMC(); break;
    case 'submit-verb-quiz-fib': submitVerbQuizFIB(); break;
    case 'next-verb-quiz': nextVerbQuiz(); break;
    case 'show-verb-detail': showVerbDetail(target.dataset.verb); break;
    case 'filter-verbs': renderVerbBrowser(target.dataset.filter); break;
    case 'search-verbs': renderVerbBrowser('all', document.getElementById('verb-search')?.value); break;

    // Vocab
    case 'open-vocab-cat': openVocabCategory(target.dataset.cat); break;
    case 'start-vocab-learn': startVocabLearn(); break;
    case 'start-vocab-quiz': startVocabQuiz(); break;
    case 'start-gender-quiz': startGenderQuiz(); break;
    case 'flip-vocab-card': flipVocabCard(); break;
    case 'rate-vocab': rateVocab(parseInt(target.dataset.rating)); break;
    case 'answer-vocab-quiz': {
      answerVocabQuizMC(parseInt(target.dataset.idx));
      break;
    }
    case 'submit-vocab-quiz-mc': {
      if (vocabQuizQueue[vocabQuizIdx]?.type === 'gender') {
        submitGenderQuizMC();
      } else {
        submitVocabQuizMC();
      }
      break;
    }
    case 'next-vocab-quiz': {
      vocabQuizIdx++;
      if (vocabQuizQueue[vocabQuizIdx]?.type === 'gender') renderVocabQuizQuestion_Gender();
      else renderVocabQuizQuestion();
      break;
    }

    // Grammar
    case 'open-grammar-lesson': openGrammarLesson(target.dataset.lesson); break;
    case 'start-grammar-quiz': startGrammarQuiz(); break;
    case 'answer-grammar-quiz': answerGrammarQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-grammar-quiz-mc': submitGrammarQuizMC(); break;
    case 'submit-grammar-fib': submitGrammarFIB(); break;
    case 'next-grammar-quiz': nextGrammarQuiz(); break;

    // Phrases
    case 'open-phrase-sit': openPhraseSituation(target.dataset.sit); break;
    case 'start-phrase-learn': startPhraseLearn(); break;
    case 'start-phrase-quiz': {/* TODO */} break;
    case 'flip-phrase-card': flipPhraseCard(); break;
    case 'rate-phrase': ratePhrase(parseInt(target.dataset.rating)); break;

    // Culture
    case 'open-culture': openCultureModule(target.dataset.module); break;
    case 'open-culture-item': openCultureItem(target.dataset.id); break;
    case 'start-culture-quiz': startCultureQuiz(); break;
    case 'answer-culture-quiz': answerCultureQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-culture-quiz-mc': submitCultureQuizMC(); break;
    case 'next-culture-quiz': nextCultureQuiz(); break;

    // Results
    case 'results-retry': goBack(); break;
    case 'results-home': switchTab('today'); break;

    // Review
    case 'start-review': startVerbDrill(); break;

    // Placement Test
    case 'start-placement': startPlacementTest(); break;
    case 'answer-placement': answerPlacementMC(parseInt(target.dataset.idx)); break;
    case 'submit-placement-mc': submitPlacementMC(); break;
    case 'submit-placement-fib': submitPlacementFIB(); break;
    case 'next-placement': nextPlacementQuestion(); break;
    case 'placement-done': switchTab('today'); break;
    case 'retake-placement': startPlacementTest(); break;

    // Practice exercises
    case 'open-minimal-pairs': showScreen('minimal-pairs'); renderMinimalPairCategories(); break;
    case 'start-mp': startMinimalPairs(target.dataset.cat || target.closest('[data-cat]')?.dataset.cat); break;
    case 'answer-mp': answerMP(parseInt(target.dataset.idx)); break;
    case 'submit-mp': submitMP(); break;
    case 'next-mp': nextMP(); break;
    case 'open-sentence-build-topics': startSentenceBuild(); break;
    case 'tap-sb-word': tapSBWord(target); break;
    case 'check-sentence-build': checkSentenceBuild(); break;
    case 'next-sentence-build': nextSentenceBuild(); break;
    case 'open-cloze-topics': showScreen('cloze-topics'); renderClozeTopics(); break;
    case 'start-cloze': startCloze(target.dataset.topic || target.closest('[data-topic]')?.dataset.topic); break;
    case 'check-cloze': checkCloze(); break;
    case 'next-cloze': nextCloze(); break;
    case 'open-translation-topics': startTranslation(); break;
    case 'check-translation': checkTranslation(); break;
    case 'next-translation': nextTranslation(); break;
    case 'open-dictation': startDictation(); break;
    case 'dict-play': dictPlayNormal(); break;
    case 'dict-play-slow': dictPlaySlow(); break;
    case 'check-dictation': checkDictation(); break;
    case 'next-dictation': nextDictation(); break;

    // TTS
    case 'speak': speak(target.dataset.text); break;

    // Accent insertion
    case 'insert-accent': {
      const input = document.getElementById('vd-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
    case 'insert-accent-vq': {
      const input = document.getElementById('vq-fib-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
    case 'insert-accent-gq': {
      const input = document.getElementById('gq-fib-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
    case 'insert-accent-pt': {
      const input = document.getElementById('pt-fib-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
    case 'insert-accent-cloze': {
      const focused = document.activeElement;
      if (focused?.classList.contains('cloze-blank')) insertCharAtCursor(focused, target.dataset.char);
      break;
    }
    case 'insert-accent-tr': {
      const input = document.getElementById('tr-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
    case 'insert-accent-dict': {
      const input = document.getElementById('dict-input');
      if (input) insertCharAtCursor(input, target.dataset.char);
      break;
    }
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    // Submit on Enter for drill inputs
    if (document.getElementById('screen-verb-drill')?.classList.contains('active')) {
      if (document.getElementById('vd-next').style.display !== 'none') nextVerbDrill();
      else checkVerbDrill();
      e.preventDefault();
    }
    // Enter to advance or submit on quiz screens
    const quizScreens = [
      { screen: 'verb-quiz', next: 'vq-next', fib: 'vq-fib-input', submitFn: submitVerbQuizFIB, nextFn: nextVerbQuiz },
      { screen: 'vocab-quiz', next: 'vocq-next', fib: null, submitFn: null, nextFn: () => { vocabQuizIdx++; renderVocabQuiz(); } },
      { screen: 'grammar-quiz', next: 'gq-next', fib: 'gq-fib-input', submitFn: submitGrammarFIB, nextFn: nextGrammarQuiz },
      { screen: 'culture-quiz', next: 'cq-next', fib: null, submitFn: null, nextFn: nextCultureQuiz },
      { screen: 'placement', next: 'pt-next', fib: 'pt-fib-input', submitFn: submitPlacementFIB, nextFn: nextPlacementQuestion },
      { screen: 'mp-drill', next: 'mp-next', fib: null, submitFn: submitMP, nextFn: nextMP },
      { screen: 'sentence-build', next: 'sb-next', fib: null, submitFn: checkSentenceBuild, nextFn: nextSentenceBuild },
      { screen: 'cloze', next: 'cloze-next', fib: null, submitFn: checkCloze, nextFn: nextCloze },
      { screen: 'translation', next: 'tr-next', fib: 'tr-input', submitFn: checkTranslation, nextFn: nextTranslation },
      { screen: 'dictation', next: 'dict-next', fib: 'dict-input', submitFn: checkDictation, nextFn: nextDictation },
    ];
    for (const qs of quizScreens) {
      if (!document.getElementById('screen-' + qs.screen)?.classList.contains('active')) continue;
      const nextBtn = document.getElementById(qs.next);
      if (nextBtn && nextBtn.style.display !== 'none') {
        qs.nextFn();
        e.preventDefault();
      } else if (qs.fib && qs.submitFn) {
        const fibInput = document.getElementById(qs.fib);
        if (fibInput && document.activeElement === fibInput) {
          qs.submitFn();
          e.preventDefault();
        }
      }
      break;
    }
    // Enter to create profile
    if (document.getElementById('modal-overlay').classList.contains('open')) {
      const nameInput = document.getElementById('new-profile-name');
      if (nameInput && document.activeElement === nameInput) {
        confirmCreateProfile();
        e.preventDefault();
      }
    }
  }

  // Number shortcuts for rating (1-4)
  const ratingBars = [
    { screen: 'verb-learn', bar: 'verb-learn-rating', fn: rateVerb },
    { screen: 'vocab-learn', bar: 'vocab-learn-rating', fn: rateVocab },
    { screen: 'phrase-learn', bar: 'phrase-learn-rating', fn: ratePhrase },
  ];
  for (const { screen, bar, fn } of ratingBars) {
    const el = document.getElementById(`screen-${screen}`);
    if (el?.classList.contains('active') && document.getElementById(bar)?.style.display !== 'none') {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) { fn(num); e.preventDefault(); break; }
    }
  }
});

// Verb search input
document.getElementById('verb-search')?.addEventListener('input', e => {
  renderVerbBrowser('all', e.target.value);
});

// Vocab search input
document.getElementById('vocab-search')?.addEventListener('input', e => {
  if (typeof VOCAB_DATA === 'undefined') return;
  const q = e.target.value.toLowerCase();
  if (!q) { renderVocabHome(); return; }
  const results = VOCAB_DATA.filter(v => v.word.includes(q) || v.english.toLowerCase().includes(q));
  document.getElementById('vocab-categories').innerHTML = results.slice(0, 50).map(w => `
    <div class="card" style="padding:0.5rem 0.75rem;text-align:left">
      ${w.gender ? `<span class="word-gender ${w.gender}" style="font-size:0.6rem;padding:0.05rem 0.25rem">${w.gender === 'f' ? 'la' : 'el'}</span>` : ''}
      <strong>${esc(w.word)}</strong>
      <span class="text-muted text-sm"> — ${esc(w.english)}</span>
    </div>
  `).join('') || `<p class="text-muted">${t('noResults')}</p>`;
});

function insertCharAtCursor(input, char) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const val = input.value;
  input.value = val.substring(0, start) + char + val.substring(end);
  input.selectionStart = input.selectionEnd = start + char.length;
  input.focus();
}

// ════════════════════════════════════════
//  INITIALIZATION
// ════════════════════════════════════════

function init() {
  renderProfiles();
  // Pre-populate voices
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
  // Restore session if the page was discarded (e.g. tab switch on mobile/PWA)
  try {
    const savedProfile = sessionStorage.getItem('ld_active_profile');
    if (savedProfile && getProfiles().includes(savedProfile)) {
      selectProfile(savedProfile);
      // Restore placement test if it was in progress
      restorePlacementTest();
    }
  } catch (e) { /* ignore */ }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

init();
