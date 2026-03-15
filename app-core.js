// ════════════════════════════════════════════════════════════
//  LECCION DIARIA — Spanish Learning PWA
//  app-core.js — State, persistence, navigation, settings,
//                achievements, FSRS, TTS, utilities
// ════════════════════════════════════════════════════════════

'use strict';

// ── State ──
let currentProfile = null;
let progress = null;
let screenStack = [];
let activeDropdown = null;

// Placement test state (IRT-based, per-domain)
let placementQuestions = [];   // flat array of all questions with difficulty
let placementCurrentQ = null;  // current question being displayed
let placementIdx = 0;
let placementThetas = { grammar: 3.0, vocab: 3.0 };  // per-domain ability
let placementHistory = [];     // [{difficulty, correct, domain}]
let placementSEs = { grammar: 2.0, vocab: 2.0 };     // per-domain standard error
let placementUsedIds = new Set();
let placementLastDomains = []; // track recent domains for variety
let placementTargetLength = 20; // adjustable test length (10, 20, or 40)
let placementMode = 'both';    // 'both', 'grammar', or 'vocab'

// Practice exercise state
let mpQueue = [], mpIdx = 0, mpScore = 0, mpAnswered = false;
let ppQueue = [], ppIdx = 0, ppScore = 0, ppAnswered = false;
let homQueue = [], homIdx = 0, homScore = 0, homAnswered = false;
let connQueue = [], connIdx = 0, connScore = 0, connAnswered = false;
let adminTaps = 0, adminTapTimer = null;
let sbQueue = [], sbIdx = 0, sbScore = 0;
let clozeQueue = [], clozeIdx = 0, clozeScore = 0;
let trQueue = [], trIdx = 0, trScore = 0;
let dictQueue = [], dictIdx = 0, dictScore = 0;

// Track whether a quiz is currently in progress (for navigation guards)
let _activeQuizScreen = null;

// Tense name constants
const TENSE_FUTURE_SUBJUNCTIVE = 'future_subjunctive';
const TENSE_SUBJUNCTIVE_IMPERFECT = 'subjunctive_imperfect';
const TENSE_IMPERATIVE_AFF = 'imperative_aff';
const TENSE_IMPERATIVE_NEG = 'imperative_neg';

// Map question domains to scoring groups
const DOMAIN_GROUP = { grammar: 'grammar', usage: 'grammar', reading: 'grammar', verb: 'grammar', vocab: 'vocab' };
function scoringGroup(domain) { return DOMAIN_GROUP[domain] || 'grammar'; }

// ── UI Strings for Display Modes (standard / immersion / hints) ──
const UI_STRINGS = {
  // Tab bar
  today: ['Today', 'Hoy'], learn: ['Learn', 'Aprender'], verbs: ['Verbs', 'Verbos'], numbers: ['Numbers', 'Números'],
  vocab: ['Vocab', 'Vocabulario'], grammar: ['Grammar', 'Gramática'],
  phrases: ['Phrases', 'Frases'], practice: ['Practice', 'Práctica'],
  culture: ['Culture', 'Cultura'], explore: ['Explore', 'Explorar'],
  stats: ['Stats', 'Estadísticas'],

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
  tapToReveal: ['Press to reveal', 'Presiona para ver'],

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
  guide: ['User Guide', 'Guía del usuario'],

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
  quickVocab: ['Quick Vocabulary Quiz', 'Prueba rápida de vocabulario'],
  quickVocabDesc: ['10 random vocabulary questions', '10 preguntas aleatorias de vocabulario'],
  words: ['words', 'palabras'],

  // Quiz prompts
  typeConjugation: ['Type the conjugation...', 'Escribe la conjugación...'],
  typeAnswer: ['Type your answer...', 'Escribe tu respuesta...'],
  typeTranslation: ['Your translation...', 'Tu traducción...'],
  typeSpanishWord: ['Type the Spanish word...', 'Escribe la palabra en español...'],
  translateToSpanish: ['How do you say', '¿Cómo se dice'],
  inSpanish: ['in Spanish?', 'en español?'],
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

  // Verb detail / reference
  compoundTenses: ['Compound Tenses', 'Tiempos compuestos'],
  conjugationRef: ['Conjugation Reference', 'Referencia de conjugación'],
  conjugationRefDesc: ['Full conjugation tables for any verb', 'Tablas completas de conjugación'],
  mixedReview: ['Mixed review across all modules', 'Repaso mixto de todos los módulos'],
  reviewQueue: ['Review Queue', 'Cola de repaso'],
  readingComprehension: ['Reading Comprehension', 'Comprensión lectora'],
  readingDesc: ['Short passages with comprehension questions', 'Pasajes cortos con preguntas de comprensión'],
  pronunciationGuide: ['Pronunciation Guide', 'Guía de pronunciación'],
  pronunciationDesc: ['Spanish sounds, stress rules, and variations', 'Sonidos, reglas de acentuación y variaciones'],
  themedVocab: ['Themed Sets', 'Conjuntos temáticos'],
  themedVocabDesc: ['Situational vocabulary for real-life scenarios', 'Vocabulario situacional para la vida real'],
  longestStreak: ['Longest Streak', 'Racha más larga'],
  totalItems: ['Total Items', 'Total de elementos'],
  masteryBreakdown: ['Mastery Breakdown', 'Desglose de dominio'],
  categoryProgress: ['Category Progress', 'Progreso por categoría'],
  practiceCalendar: ['Practice Calendar', 'Calendario de práctica'],

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
  phraseQuizLabel: ['Phrase Quiz', 'Prueba de frases'],
  whatIsSpanishFor: ['What is the Spanish for:', '¿Cómo se dice en español:'],
  whatDoesPhraseMean: ['What does this mean:', '¿Qué significa:'],
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
  correctLabelLC: ['correct', 'correctas'],

  // Profile
  dailySubtitle: ['Your daily Spanish lesson', 'Tu lección diaria de español'],
  newProfile: ['+ New Profile', '+ Nuevo perfil'],
  newProfileTitle: ['New Profile', 'Nuevo perfil'],
  yourName: ['Your name', 'Tu nombre'],

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
    ppFsrs: {}, ppMastery: {},
    homFsrs: {}, homMastery: {},
    connFsrs: {}, connMastery: {},
    sentenceFsrs: {}, sentenceMastery: {},
    clozeFsrs: {}, clozeMastery: {},
    translationFsrs: {}, translationMastery: {},
    dictFsrs: {}, dictMastery: {},
    readingFsrs: {}, readingMastery: {},
    themedVocabDone: {},
    achievements: {},
    errorCounts: {},
    perfectQuizCount: 0,
    nightOwlUnlocked: false,
    placementLevel: null,
    placementDate: null,
    settings: {
      display: 'standard', region: 'latam',
      theme: window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
      palette: 'alhambra',
      accents: 'warn', ttsRate: 1,
      hideFutureSubjunctive: true, subjunctiveForm: 'ra',
      dailyGoal: 200,
    },
  };
}

// ════════════════════════════════════════
//  ACHIEVEMENTS / BADGES
// ════════════════════════════════════════

const ACHIEVEMENTS = [
  // Streak
  { id: 'streak-1',  icon: '✨', name: 'First Spark',       desc: '1-day streak',           check: p => p.streak >= 1 },
  { id: 'streak-7',  icon: '🔥', name: 'On Fire',           desc: '7-day streak',           check: p => p.longestStreak >= 7 },
  { id: 'streak-30', icon: '💥', name: 'Unstoppable',       desc: '30-day streak',          check: p => p.longestStreak >= 30 },
  // XP
  { id: 'xp-100',   icon: '⭐', name: 'Getting Started',   desc: 'Earn 100 XP',            check: p => p.xp >= 100 },
  { id: 'xp-1000',  icon: '🌟', name: 'Dedicated',         desc: 'Earn 1,000 XP',          check: p => p.xp >= 1000 },
  { id: 'xp-5000',  icon: '💫', name: 'Scholar',            desc: 'Earn 5,000 XP',          check: p => p.xp >= 5000 },
  // Verbs
  { id: 'verb-1',   icon: '🏃', name: 'First Conjugation',  desc: 'Practice 1 verb',        check: p => Object.keys(p.verbMastery).length >= 1 },
  { id: 'verb-25',  icon: '📖', name: 'Verb Collector',     desc: 'Practice 25 verbs',      check: p => Object.keys(p.verbMastery).length >= 25 },
  { id: 'verb-100', icon: '🏆', name: 'Conjugation Master', desc: 'Practice 100 verbs',     check: p => Object.keys(p.verbMastery).length >= 100 },
  // Vocab
  { id: 'vocab-10',  icon: '📝', name: 'Word Learner',      desc: 'Learn 10 words',         check: p => Object.keys(p.vocabMastery).length >= 10 },
  { id: 'vocab-100', icon: '📚', name: 'Vocabulary Builder', desc: 'Learn 100 words',        check: p => Object.keys(p.vocabMastery).length >= 100 },
  { id: 'vocab-500', icon: '🗃️', name: 'Lexicon',           desc: 'Learn 500 words',        check: p => Object.keys(p.vocabMastery).length >= 500 },
  // Grammar
  { id: 'grammar-5',  icon: '📐', name: 'Grammar Student',  desc: '5 grammar lessons',      check: p => Object.values(p.grammarDone).filter(Boolean).length >= 5 },
  { id: 'grammar-20', icon: '🎓', name: 'Grammar Pro',      desc: '20 grammar lessons',     check: p => Object.values(p.grammarDone).filter(Boolean).length >= 20 },
  // Perfect scores
  { id: 'perfect-1', icon: '💯', name: 'Perfectionist',     desc: 'Score 100% on any quiz', check: p => (p.perfectQuizCount || 0) >= 1 },
  { id: 'perfect-5', icon: '🎯', name: 'Flawless Five',     desc: '5 perfect quizzes',      check: p => (p.perfectQuizCount || 0) >= 5 },
  // Level
  { id: 'level-a1', icon: '🌱', name: 'Beginner',          desc: 'Reach A1',               check: p => p.placementLevel },
  { id: 'level-b1', icon: '🌿', name: 'Intermediate',      desc: 'Reach B1+',              check: p => (LEVEL_ORDER[p.placementLevel] || 0) >= 2 },
  { id: 'level-c1', icon: '🌳', name: 'Advanced',          desc: 'Reach C1+',              check: p => (LEVEL_ORDER[p.placementLevel] || 0) >= 4 },
  // Practice variety
  { id: 'well-rounded', icon: '🔄', name: 'Well-Rounded',  desc: 'Try all practice types', check: p => {
    const stores = ['mpMastery','ppMastery','homMastery','connMastery','sentenceMastery','clozeMastery','translationMastery','dictMastery','readingMastery','verbMastery','vocabMastery'];
    return stores.every(s => Object.keys(p[s] || {}).length > 0);
  }},
  { id: 'night-owl', icon: '🦉', name: 'Night Owl',        desc: 'Practice after 9 PM',    check: p => p.nightOwlUnlocked },
];

function checkAchievements() {
  if (!progress) return;
  // Track night practice for achievement
  if (new Date().getHours() >= 21) progress.nightOwlUnlocked = true;
  const newBadges = [];
  for (const badge of ACHIEVEMENTS) {
    if (progress.achievements[badge.id]) continue;
    if (badge.check(progress)) {
      progress.achievements[badge.id] = Date.now();
      newBadges.push(badge);
    }
  }
  if (newBadges.length) {
    saveProgress();
    for (const b of newBadges) showToast(b.icon, `Achievement unlocked: ${b.name}`);
  }
}

function renderAchievements() {
  const el = document.getElementById('stats-achievements');
  if (!el) return;
  el.innerHTML = ACHIEVEMENTS.map(b => {
    const unlocked = progress.achievements[b.id];
    const cls = unlocked ? 'unlocked' : 'locked';
    const dateStr = unlocked ? new Date(unlocked).toLocaleDateString() : '';
    return `<div class="badge-item ${cls}" title="${esc(b.desc)}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${esc(b.name)}</div>
      ${dateStr ? `<div class="badge-date">${dateStr}</div>` : ''}
    </div>`;
  }).join('');
}

function showToast(icon, text) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${esc(text)}</span>`;
  container.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4800);
}

function showLoading(text) {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('hidden');
  const textEl = document.getElementById('loading-text');
  if (textEl) textEl.textContent = text || 'Loading...';
  const progressBar = document.getElementById('loading-progress');
  if (progressBar) progressBar.style.display = text ? 'block' : 'none';
  const fill = document.getElementById('loading-progress-fill');
  if (fill) fill.style.width = '0%';
}
function updateLoadingProgress(pct, text) {
  const fill = document.getElementById('loading-progress-fill');
  if (fill) fill.style.width = Math.min(100, Math.round(pct)) + '%';
  const bar = document.getElementById('loading-progress');
  if (bar) bar.style.display = 'block';
  if (text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.textContent = text;
  }
}
function hideLoading() {
  document.getElementById('loading-overlay')?.classList.add('hidden');
}

// ── Error state helper ──
function showErrorState(containerId, message, retryAction) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="error-state">
    <div class="error-state-icon">&#9888;</div>
    <div class="error-state-text">${esc(message)}</div>
    ${retryAction ? `<button class="btn btn-primary" data-action="${retryAction}">Try Again</button>` : ''}
  </div>`;
}

// ════════════════════════════════════════
//  WEAK AREAS TRACKER
// ════════════════════════════════════════

function trackError(key, isCorrect, category) {
  if (!progress) return;
  if (!progress.errorCounts) progress.errorCounts = {};
  if (!progress.errorCounts[key]) progress.errorCounts[key] = { wrong: 0, total: 0 };
  progress.errorCounts[key].total++;
  if (!isCorrect) progress.errorCounts[key].wrong++;
  // Track error categories
  if (category && !isCorrect) {
    if (!progress.errorCategories) progress.errorCategories = {};
    if (!progress.errorCategories[category]) progress.errorCategories[category] = { wrong: 0, total: 0 };
    progress.errorCategories[category].wrong++;
    progress.errorCategories[category].total++;
  } else if (category) {
    if (!progress.errorCategories) progress.errorCategories = {};
    if (!progress.errorCategories[category]) progress.errorCategories[category] = { wrong: 0, total: 0 };
    progress.errorCategories[category].total++;
  }
}

// Detect error category for verb drills
function classifyVerbError(userInput, correctAnswer, tense) {
  if (!userInput || !correctAnswer) return 'verb';
  const inp = stripAccents(userInput.trim().toLowerCase());
  const cor = stripAccents(correctAnswer.trim().toLowerCase());
  if (inp === cor) return 'accent';
  // Check if user got the tense wrong (same root, wrong ending pattern)
  const tenseCat = ['subjunctive_present', 'subjunctive_imperfect', 'subjunctive_perfect', 'subjunctive_pluperfect'].includes(tense)
    ? 'subjunctive' : tense;
  return tenseCat;
}

let _weakAreasCache = null;
let _weakAreasCacheKey = '';
function getWeakAreas(limit) {
  if (!progress || !progress.errorCounts) return [];
  // Memoize: invalidate when error counts change
  const cacheKey = Object.keys(progress.errorCounts).length + ':' + Object.values(progress.errorCounts).reduce((s, v) => s + v.total, 0);
  if (_weakAreasCacheKey !== cacheKey) {
    _weakAreasCache = Object.entries(progress.errorCounts)
      .filter(([, v]) => v.total >= 3)
      .map(([key, v]) => ({ key, wrong: v.wrong, total: v.total, rate: v.wrong / v.total }))
      .filter(x => x.rate > 0.3)
      .sort((a, b) => b.rate - a.rate);
    _weakAreasCacheKey = cacheKey;
  }
  const items = _weakAreasCache;
  return items.slice(0, limit || 8);
}

function getWeakCategories() {
  if (!progress || !progress.errorCategories) return [];
  return Object.entries(progress.errorCategories)
    .filter(([, v]) => v.total >= 3)
    .map(([cat, v]) => ({ category: cat, wrong: v.wrong, total: v.total, rate: v.wrong / v.total }))
    .filter(x => x.rate > 0.2)
    .sort((a, b) => b.rate - a.rate);
}

const CATEGORY_LABELS = {
  accent: 'Accent Marks', gender: 'Noun Gender', present: 'Present Tense',
  preterite: 'Preterite', imperfect: 'Imperfect', future: 'Future Tense',
  conditional: 'Conditional', subjunctive: 'Subjunctive', imperative: 'Imperative',
  vocab: 'Vocabulary', grammar: 'Grammar', phrase: 'Phrases',
};

function renderWeakAreas() {
  const el = document.getElementById('stats-weak-areas');
  if (!el) return;

  // Category-level weak areas
  const weakCats = getWeakCategories();
  let html = '';
  if (weakCats.length > 0) {
    html += '<div class="mb-1">';
    html += weakCats.slice(0, 5).map(w => {
      const pct = Math.round(w.rate * 100);
      const label = CATEGORY_LABELS[w.category] || w.category;
      return `<div class="weak-item">
        <span class="weak-label">${esc(label)}</span>
        <span class="text-muted text-sm">${w.wrong}/${w.total}</span>
        <span class="weak-rate">${pct}%</span>
      </div>`;
    }).join('');
    html += '</div>';
  }

  // Item-level weak areas
  const weak = getWeakAreas(8);
  if (!weak.length && !weakCats.length) {
    el.innerHTML = '<p class="text-muted text-sm">No weak areas detected yet. Keep practicing!</p>';
    return;
  }
  if (weak.length) {
    html += weak.map(w => {
      const pct = Math.round(w.rate * 100);
      const label = w.key.replace(/:/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return `<div class="weak-item">
        <span class="weak-label">${esc(label)}</span>
        <span class="text-muted text-sm">${w.wrong}/${w.total}</span>
        <span class="weak-rate">${pct}%</span>
      </div>`;
    }).join('');
  }
  el.innerHTML = html;
}

function renderTodayFocus() {
  const weak = getWeakAreas(3);
  const section = document.getElementById('today-focus-section');
  const el = document.getElementById('today-focus');
  if (!section || !el) return;
  if (!weak.length) { section.style.display = 'none'; return; }
  section.style.display = '';
  el.innerHTML = `
    <div class="card" data-action="start-weak-review">
      <div class="card-title">Practice Weak Areas</div>
      <div class="card-subtitle">${weak.length} items need extra practice</div>
    </div>
  `;
}

function startWeakReview() {
  // Build a review queue from weak items only
  const weak = getWeakAreas(10);
  if (!weak.length) {
    showModal('Focus Areas', '<p>No weak areas found yet. Keep practicing!</p>', [
      { label: tBtn('ok'), action: 'close-modal', cls: 'btn-primary' }
    ]);
    return;
  }
  // Map weak keys back to review items
  reviewQueue = [];
  for (const w of weak) {
    // Try to identify item type from key format
    if (w.key.startsWith('vocab:')) {
      reviewQueue.push({ type: 'vocab', key: w.key.replace('vocab:', ''), fsrs: 'vocabFsrs', mastery: 'vocabMastery' });
    } else if (w.key.startsWith('grammar:')) {
      reviewQueue.push({ type: 'grammar', key: w.key.replace('grammar:', ''), fsrs: 'grammarFsrs', mastery: 'grammarDone' });
    } else if (w.key.includes(':')) {
      // verb key format: infinitive:tense:person
      reviewQueue.push({ type: 'verb', key: w.key, fsrs: 'verbFsrs', mastery: 'verbMastery' });
    }
  }
  if (!reviewQueue.length) { startReview(); return; }
  reviewIdx = 0; reviewScore = 0; reviewSelected = -1;
  showScreen('review');
  renderReviewItem();
}

// ════════════════════════════════════════
//  PROGRESS SHARING CARD
// ════════════════════════════════════════

function generateShareCard() {
  const canvas = document.getElementById('share-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = 400, h = 500;
  canvas.width = w; canvas.height = h;

  // Read current theme colors from CSS variables
  const cs = getComputedStyle(document.documentElement);
  const bgColor = cs.getPropertyValue('--bg').trim();
  const bg2Color = cs.getPropertyValue('--bg2').trim();
  const textColor = cs.getPropertyValue('--text').trim();
  const mutedColor = cs.getPropertyValue('--text2').trim();
  const accentColor = cs.getPropertyValue('--accent').trim();

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, bgColor);
  grad.addColorStop(1, bg2Color);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  // App name
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 28px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Lección Diaria', w / 2, 60);

  // Level badge
  const level = progress?.placementLevel || 'A1';
  ctx.beginPath();
  ctx.arc(w / 2, 120, 35, 0, Math.PI * 2);
  ctx.fillStyle = accentColor;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.fillText(level, w / 2, 130);

  // Stats
  ctx.fillStyle = textColor;
  ctx.font = 'bold 18px system-ui, sans-serif';
  let y = 190;

  const stats = [
    [`⚡ ${progress?.xp || 0} XP`, ''],
    [`🔥 ${progress?.streak || 0} day streak`, `(longest: ${progress?.longestStreak || 0})`],
    [`🏃 ${Object.keys(progress?.verbMastery || {}).length} verb forms`, ''],
    [`📚 ${Object.keys(progress?.vocabMastery || {}).length} words learned`, ''],
    [`📝 ${Object.values(progress?.grammarDone || {}).filter(Boolean).length} grammar lessons`, ''],
  ];

  for (const [main, sub] of stats) {
    ctx.fillStyle = textColor;
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(main, w / 2, y);
    if (sub) {
      ctx.fillStyle = mutedColor;
      ctx.font = '13px system-ui, sans-serif';
      ctx.fillText(sub, w / 2, y + 18);
      y += 22;
    }
    y += 32;
  }

  // Top achievement
  const unlocked = ACHIEVEMENTS.filter(b => progress?.achievements[b.id]);
  if (unlocked.length) {
    const top = unlocked[unlocked.length - 1];
    ctx.fillStyle = mutedColor;
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText('Latest achievement', w / 2, y + 5);
    ctx.fillStyle = textColor;
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(`${top.icon} ${top.name}`, w / 2, y + 28);
    y += 45;
  }

  // Date
  ctx.fillStyle = mutedColor;
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), w / 2, h - 25);

  // Show the overlay
  document.getElementById('share-overlay').classList.add('open');
  if (navigator.share && navigator.canShare) {
    document.getElementById('native-share-btn').style.display = '';
  }
}

function downloadShareCard() {
  const canvas = document.getElementById('share-canvas');
  if (!canvas) return;
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leccion-diaria-progress.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function nativeShareCard() {
  const canvas = document.getElementById('share-canvas');
  if (!canvas) return;
  canvas.toBlob(async blob => {
    const file = new File([blob], 'leccion-diaria-progress.png', { type: 'image/png' });
    try {
      await navigator.share({ files: [file], title: 'My Lección Diaria Progress' });
    } catch (e) {
      // User cancelled or share failed
    }
  });
}

// ════════════════════════════════════════
//  PERSISTENCE
// ════════════════════════════════════════

function getProfiles() {
  try { return JSON.parse(localStorage.getItem('ld_profiles') || '[]'); }
  catch (e) {
    showToast('⚠️', 'Could not load profiles. Data may be corrupted.');
    console.error('getProfiles error:', e);
    return [];
  }
}
function saveProfiles(list) { localStorage.setItem('ld_profiles', JSON.stringify(list)); }

function migrateProgress(p) {
  if (!p.achievements) p.achievements = {};
  if (!p.errorCounts) p.errorCounts = {};
  if (p._perfectQuizCount != null && p.perfectQuizCount == null) {
    p.perfectQuizCount = p._perfectQuizCount;
    delete p._perfectQuizCount;
  }
  if (p._nightOwl != null && p.nightOwlUnlocked == null) {
    p.nightOwlUnlocked = p._nightOwl;
    delete p._nightOwl;
  }
  if (p.perfectQuizCount == null) p.perfectQuizCount = 0;
  if (p.nightOwlUnlocked == null) p.nightOwlUnlocked = false;
  return p;
}

function loadProgress(name) {
  try {
    const raw = localStorage.getItem('ld_progress_' + name);
    if (raw) return migrateProgress(JSON.parse(raw));
    // localStorage empty — try IDB backup recovery
    restoreFromIDB(name).then(data => {
      if (data && currentProfile === name) {
        progress = migrateProgress(data);
        saveProgress();
        showToast('✅', 'Progress restored from backup.');
      }
    });
    return newProgress();
  }
  catch (e) {
    showToast('⚠️', 'Could not load progress. Starting fresh.');
    console.error('loadProgress error:', e);
    return newProgress();
  }
}
function saveProgress() {
  if (!currentProfile) return;
  try {
    localStorage.setItem('ld_progress_' + currentProfile, JSON.stringify(progress));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      showToast('⚠️', 'Storage full! Export your data from Settings.');
    } else {
      showToast('⚠️', 'Could not save progress.');
    }
    console.error('saveProgress error:', e);
  }
  // Redundant backup to IndexedDB (fire-and-forget)
  backupToIDB();

}

// ════════════════════════════════════════
//  IndexedDB backup (redundant data safety)
// ════════════════════════════════════════

let _idbReady = false;
let _idb = null;

function openIDB() {
  return new Promise((resolve, reject) => {
    if (_idb) { resolve(_idb); return; }
    const req = indexedDB.open('leccion-diaria-backup', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'profile' });
      }
    };
    req.onsuccess = () => { _idb = req.result; _idbReady = true; resolve(_idb); };
    req.onerror = () => reject(req.error);
  });
}

function backupToIDB() {
  if (!currentProfile || !progress) return;
  openIDB().then(db => {
    const tx = db.transaction('progress', 'readwrite');
    tx.objectStore('progress').put({ profile: currentProfile, data: progress, ts: Date.now() });
  }).catch(() => { /* silent — IDB is optional redundancy */ });
}

function restoreFromIDB(profileName) {
  return openIDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('progress', 'readonly');
      const req = tx.objectStore('progress').get(profileName);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  }).catch(() => null);
}

// ════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════

const SCREEN_NAMES = {
  learn: 'Learn', verbs: 'Verbs', vocab: 'Vocabulary', grammar: 'Grammar',
  numbers: 'Numbers', practice: 'Practice', culture: 'Culture', stats: 'Stats',
  settings: 'Settings', 'verb-learn': 'Learn Verbs', 'verb-drill': 'Verb Drill',
  'verb-quiz': 'Verb Quiz', 'verb-browser': 'Browse Verbs', 'verb-detail': 'Verb Detail',
  'vocab-cat': 'Category', 'vocab-learn': 'Learn Vocab', 'vocab-quiz': 'Vocab Quiz',
  'grammar-lesson': 'Lesson', 'grammar-quiz': 'Grammar Quiz',
  'phrase-learn': 'Learn Phrases', 'phrase-quiz': 'Phrase Quiz',
  review: 'Review', results: 'Results', placement: 'Placement Test',
  'minimal-pairs': 'Minimal Pairs', 'sentence-build': 'Sentence Builder',
  cloze: 'Cloze', 'translation-drill': 'Translation', dictation: 'Dictation',
  reading: 'Reading', 'reading-sat': 'Reading SAT', pronunciation: 'Pronunciation',
  'phonetic-pairs': 'Phonetic Pairs', homophones: 'Homophones',
  connectors: 'Connectors', 'themed-vocab': 'Themed Vocab',
};

function emptyState(icon, message) {
  return `<div class="empty-state"><div class="empty-state-icon">${icon}</div><p class="empty-state-text">${message}</p></div>`;
}

function showScreen(id, pushStack = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) {
    el.classList.add('active');
    el.classList.add('fade-in');
    setTimeout(() => el.classList.remove('fade-in'), 250);
    window.scrollTo(0, 0);
    // Accessibility: move focus to screen heading or container
    const focusTarget = el.querySelector('h2, h3, [tabindex="-1"]') || el;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
  }
  if (pushStack && screenStack[screenStack.length - 1] !== id) screenStack.push(id);

  // Show/hide nav back button
  const backBtn = document.querySelector('.nav-back');
  if (backBtn) backBtn.classList.toggle('visible', screenStack.length > 1 && id !== 'profile' && id !== 'today');

  // Update breadcrumb
  const crumbEl = document.getElementById('nav-crumb');
  if (crumbEl) {
    const name = SCREEN_NAMES[id];
    if (name && id !== 'today' && id !== 'profile') {
      crumbEl.textContent = name;
      crumbEl.classList.add('visible');
    } else {
      crumbEl.classList.remove('visible');
    }
  }

  // Close any open dropdown
  closeDropdowns();
}

function goBack() {
  if (screenStack.length > 1) {
    screenStack.pop();
    showScreen(screenStack[screenStack.length - 1], false);
  }
}

// Screens that represent active quizzes (navigating away loses progress)
const QUIZ_SCREENS = new Set([
  'verb-learn', 'verb-drill', 'verb-quiz', 'vocab-quiz', 'vocab-learn',
  'grammar-quiz', 'phrase-quiz', 'phrase-learn', 'culture-quiz', 'dialogue-practice',
  'placement', 'mp-drill', 'pp-drill', 'hom-drill', 'conn-drill',
  'sentence-build', 'cloze', 'translation', 'dictation', 'reading',
  'themed-quiz', 'review',
]);
let _pendingNavTab = null;
let _leaveConfirmed = false;

function confirmLeaveQuiz(callback) {
  if (_leaveConfirmed) { _leaveConfirmed = false; return false; }
  const currentScreen = screenStack[screenStack.length - 1];
  if (QUIZ_SCREENS.has(currentScreen)) {
    showModal('Leave Quiz?', '<p>You have a quiz in progress. Your progress will be lost.</p>', [
      { label: tBtn('cancel'), action: 'close-modal', cls: 'btn-secondary' },
      { label: 'Leave', action: 'confirm-leave-quiz', cls: 'btn-primary' },
    ]);
    _pendingNavTab = callback;
    return true; // blocked
  }
  return false; // proceed
}

function switchTab(tab) {
  closeDropdowns();

  // Guard: confirm navigation away from active quiz
  if (confirmLeaveQuiz(() => switchTab(tab))) return;

  // Map sub-tabs to their parent tab for highlighting
  const TAB_PARENT = { verbs: 'learn', vocab: 'learn', grammar: 'learn', numbers: 'learn', phrases: 'practice' };
  const highlightTab = TAB_PARENT[tab] || tab;

  document.querySelectorAll('.tab-bar .tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const tabBtn = document.querySelector(`.tab[data-tab="${highlightTab}"]`);
  if (tabBtn) {
    tabBtn.classList.add('active');
    tabBtn.setAttribute('aria-selected', 'true');
  }

  screenStack = [tab];
  showScreen(tab, false);

  // Populate screen
  if (tab === 'today') renderToday();
  else if (tab === 'learn') { /* static hub */ }
  else if (tab === 'verbs') renderVerbsHome();
  else if (tab === 'vocab') renderVocabHome();
  else if (tab === 'grammar') renderGrammarHome();
  else if (tab === 'phrases') renderPhrasesHome();
  else if (tab === 'numbers') renderNumbersHome();
  else if (tab === 'culture') { /* static culture hub */ }
  else if (tab === 'stats') renderStats();
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
      <p class="text-muted">Adaptive test — choose your starting level and test length. As few as 10 questions.</p>
    `, [
      { label: tBtn('skip'), action: 'close-modal', cls: 'btn-secondary' },
      { label: tBtn('takeTest'), action: 'start-placement', cls: 'btn-primary' },
    ]);
  }, 300);
}

// ════════════════════════════════════════
//  MODAL SYSTEM
// ════════════════════════════════════════

let _preModalFocus = null;
function showModal(title, bodyHtml, buttons) {
  _preModalFocus = document.activeElement;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-actions').innerHTML = buttons.map(b =>
    `<button class="btn ${b.cls || ''}" data-action="${b.action}">${b.label}</button>`
  ).join('');
  const overlay = document.getElementById('modal-overlay');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  // Focus the first button in the modal
  const firstBtn = overlay.querySelector('.modal .btn');
  if (firstBtn) setTimeout(() => firstBtn.focus(), 50);
}
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if (_preModalFocus) { _preModalFocus.focus(); _preModalFocus = null; }
}

// Modal focus trap, ESC to close, and global keyboard shortcuts
document.addEventListener('keydown', e => {
  // Close share overlay on ESC
  if (e.key === 'Escape') {
    const shareOverlay = document.getElementById('share-overlay');
    if (shareOverlay?.classList.contains('open')) {
      shareOverlay.classList.remove('open');
      e.preventDefault();
      return;
    }
  }
  const overlay = document.getElementById('modal-overlay');

  // Modal focus trap
  if (overlay && overlay.classList.contains('open')) {
    if (e.key === 'Escape') { closeModal(); e.preventDefault(); return; }
    if (e.key === 'Tab') {
      const focusable = overlay.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
    return;
  }

  // Skip shortcuts when typing in an input
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  // Alt+1-5 for tab switching
  if (e.altKey && !e.ctrlKey && !e.metaKey) {
    const tabMap = { '1': 'today', '2': 'learn', '3': 'practice', '4': 'culture', '5': 'stats' };
    if (tabMap[e.key]) { switchTab(tabMap[e.key]); e.preventDefault(); return; }
  }

  // Alt+B for back
  if (e.altKey && e.key === 'b') {
    const backBtn = document.querySelector('.nav-back.visible');
    if (backBtn) { backBtn.click(); e.preventDefault(); }
  }
});

// ════════════════════════════════════════
//  SETTINGS
// ════════════════════════════════════════

function applySettings() {
  if (!progress) return;
  const s = progress.settings;
  // Resolve 'auto' theme to actual light/dark based on system preference
  let resolvedTheme = s.theme || 'dark';
  if (resolvedTheme === 'auto') {
    resolvedTheme = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  document.documentElement.setAttribute('data-palette', s.palette || 'alhambra');
  document.documentElement.setAttribute('data-region', s.region || 'latam');
  // Update streak freeze display
  const freezeEl = document.getElementById('freeze-token-count');
  if (freezeEl) freezeEl.textContent = (progress.freezeTokens || 0) + ' available';
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
    else if (act === 'set-hideFutureSubjunctive') key = 'hideFutureSubjunctive';
    else if (act === 'set-subjunctiveForm') key = 'subjunctiveForm';
    else if (act === 'set-dailyGoal') key = 'dailyGoal';
    if (key) {
      const current = String(s[key] ?? '');
      const isActive = val === current;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-pressed', String(isActive));
    }
  });
  applyDisplayMode();
}

// Watch for system color scheme changes (applies when theme = 'auto')
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (progress?.settings?.theme === 'auto') applySettings();
  });
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
    if (el.textContent.trim() === 'Press to reveal' || el.textContent.trim() === 'Presiona para ver')
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
    ['#screen-settings .settings-group:nth-child(2) > h3', 'display'],
    ['#screen-settings .settings-group:nth-child(3) > h3', 'learning'],
    ['#screen-settings .settings-group:nth-child(4) > h3', 'data'],
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
  // Stats screen card titles — find by their associated content containers
  const masteryCard = document.getElementById('stats-mastery')?.closest('.card');
  if (masteryCard) { const title = masteryCard.querySelector('.card-title'); if (title) title.textContent = t('masteryBreakdown'); }
  const calCard = document.getElementById('stats-calendar')?.closest('.card');
  if (calCard) { const title = calCard.querySelector('.card-title'); if (title) title.textContent = t('practiceCalendar'); }

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

// ── Tense filtering helpers ──
function getActiveTenses(pool) {
  let tenses = pool ? [...pool] : Object.keys(TENSE_META);
  if (progress?.settings?.hideFutureSubjunctive) {
    tenses = tenses.filter(t => t !== TENSE_FUTURE_SUBJUNCTIVE);
  }
  return tenses;
}

function shouldUseSeForm() {
  const pref = progress?.settings?.subjunctiveForm || 'ra';
  if (pref === 'se') return true;
  if (pref === 'both') return Math.random() < 0.5;
  return false;
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
  checkAchievements();
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
  // Award a freeze token every 7-day streak milestone
  if (progress.streak > 0 && progress.streak % 7 === 0) {
    progress.freezeTokens = (progress.freezeTokens || 0) + 1;
    showToast('🧊', `Streak freeze earned! You now have ${progress.freezeTokens} token${progress.freezeTokens > 1 ? 's' : ''}.`);
  }
}

function updateNavStats() {
  if (!progress) return;
  const xpEl = document.getElementById('nav-xp');
  const oldText = xpEl.textContent;
  const newText = progress.xp + ' XP';
  xpEl.textContent = newText;
  if (oldText !== newText && oldText !== '0 XP') {
    xpEl.classList.remove('xp-pop');
    void xpEl.offsetWidth;
    xpEl.classList.add('xp-pop');
  }
  document.getElementById('nav-streak').innerHTML = '🔥 ' + progress.streak;
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

function getRecallPct(fsrsStore, key) {
  const rec = fsrsStore[key];
  if (!rec || !rec.s) return null;
  return Math.round(fsrsR(rec.s, (Date.now() - rec.lastRev) / 86400000) * 100);
}

function computeTenseMastery() {
  if (typeof TENSE_META === 'undefined') return [];
  const now = Date.now();
  const fsrs = progress.verbFsrs || {};
  const mastery = progress.verbMastery || {};
  const result = [];

  for (const [tense, meta] of Object.entries(TENSE_META)) {
    let practiced = 0, totalR = 0, rCount = 0;
    let levels = [0, 0, 0, 0, 0]; // mastery 0-4
    for (const [key, val] of Object.entries(mastery)) {
      const parts = key.split(':');
      if (parts[1] !== tense) continue;
      practiced++;
      levels[val] = (levels[val] || 0) + 1;
    }
    for (const [key, rec] of Object.entries(fsrs)) {
      const parts = key.split(':');
      if (parts[1] !== tense || !rec?.s) continue;
      totalR += fsrsR(rec.s, (now - rec.lastRev) / 86400000);
      rCount++;
    }
    if (practiced > 0) {
      result.push({
        tense, label: meta.labelEn || meta.label, level: meta.level,
        compound: !!meta.compound, progressive: !!meta.progressive,
        practiced, avgRecall: rCount ? Math.round(totalR / rCount * 100) : null,
        levels,
      });
    }
  }
  return result;
}

function computeGrammarProgress() {
  if (typeof GRAMMAR_DATA === 'undefined') return [];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const result = [];
  for (const lv of levels) {
    const lessons = GRAMMAR_DATA.filter(l => l.level === lv);
    if (!lessons.length) continue;
    let done = 0, totalR = 0, rCount = 0;
    const now = Date.now();
    for (const l of lessons) {
      if (progress.grammarDone[l.id]) done++;
      const rec = progress.grammarFsrs?.[l.id];
      if (rec?.s) {
        totalR += fsrsR(rec.s, (now - rec.lastRev) / 86400000);
        rCount++;
      }
    }
    result.push({
      level: lv, total: lessons.length, done,
      avgRecall: rCount ? Math.round(totalR / rCount * 100) : null,
    });
  }
  return result;
}

function computeCefrMastery() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const LEVEL_IDX = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  const result = [];

  for (const lv of levels) {
    const li = LEVEL_IDX[lv];
    const pillars = [];

    // ── Vocabulary pillar ──
    if (typeof VOCAB_DATA !== 'undefined' && typeof buildVocabIndexes === 'function') {
      buildVocabIndexes();
      const words = VOCAB_BY_LEVEL[lv] || [];
      const total = words.length;
      const done = total ? words.filter(w => progress.vocabMastery?.[w.word]).length : 0;
      if (total > 0) pillars.push({ name: 'Vocab', done, total, pct: done / total });
    }

    // ── Verb conjugation pillar ──
    // A verb form belongs to a level if max(verb.level, tense.level) == lv
    if (typeof VERB_DATA !== 'undefined' && typeof TENSE_META !== 'undefined') {
      let vTotal = 0, vDone = 0;
      const simpleTenses = Object.keys(TENSE_META).filter(t =>
        !TENSE_META[t].compound && !TENSE_META[t].progressive
      );
      for (const v of VERB_DATA) {
        const vli = LEVEL_IDX[v.level] ?? 99;
        for (const tense of simpleTenses) {
          const tli = LEVEL_IDX[TENSE_META[tense].level] ?? 99;
          if (Math.max(vli, tli) !== li) continue;
          const persons = tense.startsWith('imperative') ? 5 : 6;
          for (let p = 0; p < 6; p++) {
            if (tense.startsWith('imperative') && p === 0) continue;
            vTotal++;
            const key = `${v.infinitive}:${tense}:${p}`;
            if (progress.verbMastery?.[key]) vDone++;
          }
        }
      }
      if (vTotal > 0) pillars.push({ name: 'Verbs', done: vDone, total: vTotal, pct: vDone / vTotal });
    }

    // ── Grammar pillar ──
    if (typeof GRAMMAR_DATA !== 'undefined') {
      const lessons = GRAMMAR_DATA.filter(l => l.level === lv);
      const total = lessons.length;
      const done = total ? lessons.filter(l => progress.grammarDone?.[l.id]).length : 0;
      if (total > 0) pillars.push({ name: 'Grammar', done, total, pct: done / total });
    }

    // ── Overall: equal-weight average of pillars ──
    const overall = pillars.length
      ? Math.round(pillars.reduce((s, p) => s + p.pct, 0) / pillars.length * 100)
      : 0;

    result.push({ level: lv, overall, pillars });
  }
  return result;
}

function cefrColor(pct) {
  if (pct >= 80) return 'var(--green)';
  if (pct >= 50) return 'var(--yellow)';
  if (pct > 0) return 'var(--red)';
  return 'var(--text3)';
}

function renderCefrMasteryCompact(el) {
  if (!el) return;
  const data = computeCefrMastery();
  if (!data.length || data.every(d => d.overall === 0)) { el.innerHTML = ''; return; }

  let html = '<div class="card" style="padding:0.75rem">';
  html += '<div class="card-title mb-1" style="font-size:0.85rem">Level Mastery</div>';
  html += '<div style="display:flex;gap:0.4rem;flex-wrap:wrap">';
  for (const d of data) {
    const c = cefrColor(d.overall);
    html += `<div style="text-align:center;min-width:3rem">
      <div style="font-weight:700;font-size:0.9rem;color:${c}">${d.overall}%</div>
      <div style="font-size:0.65rem;color:var(--text3)">${d.level}</div>
    </div>`;
  }
  html += '</div></div>';
  el.innerHTML = html;
}

function renderCefrMasteryDetailed(el) {
  if (!el) return;
  const data = computeCefrMastery();
  if (!data.length || data.every(d => d.overall === 0)) {
    el.innerHTML = '<p class="text-muted text-sm">Start learning to see your level mastery.</p>';
    return;
  }

  let html = '';
  for (const d of data) {
    const c = cefrColor(d.overall);
    html += `<div style="margin-bottom:0.75rem">
      <div class="stat-row" style="margin-bottom:0.2rem">
        <span style="font-weight:700;min-width:2rem">${d.level}</span>
        <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:10px;border-radius:5px;overflow:hidden">
          <div style="width:${d.overall}%;height:100%;background:${c};transition:width 0.3s"></div>
        </div>
        <span style="font-weight:700;color:${c};min-width:2.5rem;text-align:right">${d.overall}%</span>
      </div>`;
    if (d.pillars.length) {
      html += '<div style="display:flex;gap:0.75rem;padding-left:2.5rem;font-size:0.7rem;color:var(--text3)">';
      for (const p of d.pillars) {
        html += `<span>${p.name}: ${p.done}/${p.total}</span>`;
      }
      html += '</div>';
    }
    html += '</div>';
  }
  el.innerHTML = html;
}

// ════════════════════════════════════════
//  TEXT-TO-SPEECH
// ════════════════════════════════════════

let _ttsWarningShown = false;
function speak(text) {
  if (!window.speechSynthesis) {
    if (!_ttsWarningShown) { _ttsWarningShown = true; showToast('🔇', 'Text-to-speech is not available in this browser.'); }
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const region = progress?.settings?.region;
    u.lang = region === 'spain' ? 'es-ES' : 'es-MX';
    u.rate = progress?.settings?.ttsRate || 1;
    const voices = window.speechSynthesis.getVoices();
    const preferredLang = region === 'spain' ? 'es-ES' : 'es-MX';
    const esVoice = voices.find(v => v.lang === preferredLang) || voices.find(v => v.lang.startsWith('es'));
    if (esVoice) u.voice = esVoice;
    else if (!_ttsWarningShown && voices.length > 0) {
      _ttsWarningShown = true;
      showToast('🔇', 'No Spanish voice found. Using default voice.');
    }
    u.onerror = () => {}; // suppress errors silently
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('TTS error:', e);
  }
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

function esc(s) { if (s == null) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

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
function dateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { return shuffle(arr).slice(0, n); }

