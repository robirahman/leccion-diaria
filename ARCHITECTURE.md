# Leccion Diaria — Architecture & Developer Guide

A Progressive Web App for learning Spanish (A1–C2) using spaced repetition, adaptive testing, and gamification. Built with vanilla HTML/CSS/JS — no frameworks, no backend. Uses esbuild for production minification and cache-busting.

---

## File Overview

| File | Purpose |
|------|---------|
| **App modules** | |
| `index.html` | 30+ screens, nav bar, tab bar, modal system, share overlay |
| `app-init.js` | Startup, profile loading, event delegation (ACTION_HANDLERS map), routing, search handlers, card keyboard support |
| `app-core.js` | Progress state, FSRS helpers, shared computation (recall, mastery, CEFR), settings, TTS, toast error notifications, analytics tracking, screen announcer |
| `app-learn.js` | Today screen, verb learning/drill/quiz, grammar lessons, phrases, numbers, culture, branching dialogues, results |
| `learn-vocab.js` | Vocabulary indexes, browser, flashcards, quiz (MC + production + gender), Learn New Words |
| `placement.js` | IRT-adaptive placement test (Rasch model, per-domain scoring, Newton-Raphson MLE) |
| `app-practice.js` | Export/import (JSON + CSV), admin mode, practice exercises (minimal pairs, phonetic pairs, homophones, connectors, sentence build, cloze, translation, dictation), stats dashboard with analytics, unified review queue |
| `practice-reference.js` | Verb conjugation reference, conjugation rules/endings, pronunciation guide, reading comprehension, themed vocabulary, curriculum tracks |
| `quiz-engine.js` | Shared quiz rendering (`createQuizFlow`), MC submit helper (`processMCSubmit`), quiz HTML helpers (`renderMCQuestionHTML`, `renderFIBQuestionHTML`), haptic feedback, `partialShuffle()`, `aria-disabled` on disabled options |
| `conjugation.js` | Verb conjugation engine: 19 tenses, 252 verbs, irregular/stem-change handling (o>ue fix for preterite/imperfect subjunctive). JSDoc typed. |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm (17 parameters, input-validated). JSDoc typed. |
| `api.js` | Programmatic API (UMD): re-exports pure functions (conjugation, FSRS, IRT, utils), data access, `Session` class (profiles, XP, reviews), `PlacementSession` class (headless IRT). Browser: `window.LeccionDiaria`. Node: via `api-node.js` |
| `api-node.js` | Node.js loader for the API — uses `vm.createContext` with DOM stubs to load all source files into a sandbox, returns the API object |
| `vocab-search-worker.js` | Web Worker for non-blocking vocab search with prefix index |
| `styles.css` | Dark/light/auto themes, 4 color palettes, responsive mobile-first layout, 44px touch targets |
| `sw.js` | Service worker: dual-cache (APP_CACHE + DATA_CACHE) with separate versioning, stale-while-revalidate, fetch timeout |
| `manifest.json` | PWA metadata (maskable icons) |
| **Build & Test** | |
| `build.js` | esbuild-based build: minification, content-hash filenames, dual-cache SW generation, `escapeRegex()` helper, recursive `fs.cpSync`, per-file error handling |
| `jsconfig.json` | TypeScript/IDE type checking config (`checkJs: true`, ES2020, DOM libs) |
| `playwright.config.js` | Playwright E2E test config (Chromium only, static file server) |
| `package.json` | Node.js project config (esbuild, Playwright, serve as dev dependencies) |
| `tests/run.js` | Minimal zero-dependency test runner |
| `tests/test_*.js` | 174 unit tests for conjugation, FSRS, core utils, build helpers, quiz engine, placement, programmatic API, and vocab data validation |
| `e2e/*.spec.js` | 14 Playwright E2E tests (navigation, learn flow, placement) |
| **Data files** | |
| `verbs.js` | 252 verbs with type, group, stem change, level, frequency |
| `vocab-data.json` | ~28K words as JSON (monolithic fallback) |
| `vocab-a1a2.json` | A1+A2 vocab (~2K words, 494KB — loaded first for fast startup) |
| `vocab-b1.json` `vocab-b2.json` `vocab-c1.json` `vocab-c2.json` | Remaining vocab levels (loaded progressively in background) |
| `vocab-categories.js` | 51 vocabulary category definitions with titles and icons |
| `grammar.js` | 67 grammar lessons (A1–C2) with HTML content and quiz questions |
| `phrases.js` | 260+ phrases across 21 situations with formality and reply |
| `conversations.js` | 21 role-play dialogue scenarios with vocab and quiz |
| `branching_dialogues.js` | 6 branching dialogue scenarios (A1–B2) with player choices and feedback |
| `placement_questions.js` | 120 hand-crafted IRT-calibrated placement questions (A1–C2) |
| `curriculum_tracks.js` | Guided curriculum tracks with leveled lesson sequences |
| `reading.js` `reading_sat.js` | 51 reading comprehension passages (10 A1, 5 A2, 10 B1, 9 B2, 9 C1, 8 C2 + SAT-style) |
| `cloze_passages.js` `dictation.js` | Cloze and dictation exercises |
| `sentence_construction.js` `translation_drills.js` | Writing practice exercises |
| `minimal_pairs.js` `homophones.js` `phonetic_pairs.js` | Pronunciation exercises (49 phonetic pairs incl. b/v, intervocalic d, regional accents) |
| `connectors.js` `themed_vocab.js` `jokes.js` | Additional content modules |
| `recipes.js` `music.js` `movies.js` `poetry.js` `sports.js` `proverbs.js` `folktales.js` `festivals.js` `history.js` `travel.js` `trivia.js` `idioms.js` | Cultural content modules with descriptions, vocab, and quizzes |
| **Utilities** | |
| `generate_vocab.py` | Generates frequency vocabulary from the `wordfreq` Python library |
| `serve.sh` | Local development server (Python 3) |

---

## Architecture

```
User (browser)
  │
  ▼
app-init.js ─── Event delegation (single click listener on document)
  │              Card keyboard handler (Enter/Space for data-action cards)
  │              Vocab/grammar/verb search handlers (debounced, Worker-backed)
  │              Progressive vocab loading (A1-A2 first, then B1→C2)
  │              Lazy-loading: secondary scripts via requestIdleCallback
  │
  ├── app-core.js ──── Navigation: showScreen(id) / goBack() / switchTab(tab)
  │                     Screen transition announcer (hidden aria-live region)
  │                     Progress state, FSRS helpers, recall/mastery computation
  │                     Settings (theme auto-detect, daily goals, streak freeze)
  │                     Bookmarks system (vocab, grammar, phrases)
  │                     Onboarding carousel for new users
  │                     Persistence (localStorage per profile)
  │                     Analytics: session/quiz/feature/daily tracking
  │                     `pick()` guards against empty arrays
  │                     `bookmarkId()` handles malformed bookmarks
  │                     `announceFlip()` shared flashcard flip announcer
  │                     TTS with regional voice selection + offline detection
  │                     TTS errors show one-time toast notification
  │                     IDB backup errors now logged
  │                     Toast/snackbar notifications (success/error/info/undo)
  │                     Undo last SRS rating (snapshot/restore)
  │                     getRecallColor() shared utility
  │
  ├── learn-vocab.js ── Vocab indexes (by category, level, word); skips malformed entries
  │                      Vocab browser with progress indicators
  │                      Flashcard learning, MC/production/gender quizzes
  │                      Gender quiz tracks FSRS spaced repetition data
  │                      Learn New Words (lowest-probability flashcards)
  │
  ├── app-learn.js ──── Today screen with daily XP goal progress
  │                      Verb learning: flashcards, drills, pattern drills, quiz
  │                      Grammar lessons with searchable browser
  │                      Phrases: browser with mastery indicators, flashcards, quiz
  │                      Numbers, culture modules, dialogue practice
  │                      Branching dialogues: chat-style renderer, choice handling
  │                      Results screen
  │
  ├── placement.js ──── IRT adaptive placement test (Rasch model)
  │                      Per-domain scoring (grammar + vocab)
  │                      Newton-Raphson MLE, question selection
  │                      Post-test learning plan (A1-C2 module recommendations)
  │
  ├── app-practice.js ── Stats dashboard with analytics rendering
  │                       `VERB_DATA.length` used directly (not Object.keys)
  │                       Practice exercises: minimal pairs, phonetic pairs,
  │                         homophones, connectors, sentence build, cloze,
  │                         translation, dictation
  │                       Unified review queue (multi-store FSRS)
  │                       Export/import (JSON + CSV), admin mode
  │
  ├── practice-reference.js ── Verb conjugation reference & search
  │                             Conjugation rules/endings tables
  │                             Pronunciation guide
  │                             Reading comprehension
  │                             Themed vocabulary sets
  │                             CEFR curriculum overview & tracks
  │
  ├── quiz-engine.js ── createQuizFlow: managed MC quiz lifecycle (auto-submit option)
  │                      processMCSubmit: shared submit/disable/mark helper
  │                      renderMCQuestionHTML / renderFIBQuestionHTML: shared quiz HTML
  │                      Haptic feedback (navigator.vibrate) on answers
  │                      HTML helpers (accent bar, progress bar)
  │                      aria-disabled on quiz option disable
  │
  ├── vocab-search-worker.js ── Web Worker for vocab search
  │                              Builds prefix index (up to 4 chars) at init
  │                              Updated progressively as vocab chunks load
  │
  └── api.js ──────────────── Programmatic API (UMD module)
                                Pure function re-exports (conjugation, FSRS, IRT, utils)
                                Data access (verbs, vocab, tenses, grammar, phrases)
                                Session class (profile CRUD, XP, FSRS reviews, settings)
                                PlacementSession class (headless IRT adaptive test)
                                Browser: window.LeccionDiaria
                                Node.js: require('./api-node')()
```

### State Management

- **`progress`** — the main user state object, saved to `localStorage['ld_progress_' + profileName]`
- **`screenStack`** — array tracking navigation history for back button
- **`currentProfile`** — active profile name
- **Placement state** — `placementThetas`, `placementHistory`, etc. (session-scoped, saved to `sessionStorage` for tab-switch recovery)
- **Practice state** — per-exercise quiz state objects created via `createQuizState()` factory (e.g., `vpQuiz.queue`, `vpQuiz.idx`, `vpQuiz.score`)

All state is defined in `app-core.js` and accessible globally. The app modules read and write this shared state. Practice quiz state (queues, indices, scores) is reset via `resetPracticeState()` when the user switches profiles.

### Navigation

All screens are `<div>` elements in `index.html` with `display:none` by default. `showScreen(id)` hides the current screen, shows the target, focuses the first `h1`/`h2`/`h3` heading for screen reader accessibility, and announces the transition via a hidden `aria-live="polite"` region (`#screen-announcer`). The tab bar has 8 main tabs; Culture and Explore have dropdown submenus.

### Event Handling

A single delegated click handler on `document` routes all `data-action` attributes through the `ACTION_HANDLERS` map — a merged object of categorized handler groups (NAV_HANDLERS, VERB_HANDLERS, VOCAB_HANDLERS, QUIZ_HANDLERS, BRANCHING_HANDLERS, etc.) providing O(1) action lookup. Keyboard events handle Enter (submit/advance), 1–4 (flashcard ratings), and Enter/Space on cards (`role="button" tabindex="0"`).

---

## Data Loading

### Vocabulary (progressive JSON loading)

Vocabulary data (~28K entries) is split by CEFR level and loaded progressively:

1. `vocab-categories.js` (5KB) loads eagerly via `<script defer>` — provides `VOCAB_CATEGORIES` for rendering category cards
2. `vocab-a1a2.json` (494KB, ~2K entries) loads first via `fetch()` — enough for immediate A1-A2 use
3. `vocab-b1.json`, `vocab-b2.json`, `vocab-c1.json`, `vocab-c2.json` load in parallel via `Promise.all()` in the background
4. After all chunks load, `buildVocabIndexes()` runs once and the vocab search Worker is updated
5. The full dataset is cached in **IndexedDB** (`leccion-diaria` database, `cache` store, key `vocab-data-v2`) for instant loads on subsequent visits
6. Fallback: if split files aren't found, loads the monolithic `vocab-data.json` (7MB)
7. All code guards access with `typeof VOCAB_DATA === 'undefined'` checks

### Vocab Search Worker

`vocab-search-worker.js` runs in a Web Worker to avoid blocking the main thread when searching 28K entries:
- Builds a prefix index (prefixes up to 4 characters) on init
- Receives `search` messages with a query and returns ranked results
- Updated via `update` messages as vocab chunks load progressively
- Falls back to main-thread search if Workers aren't supported

### Other Data Files

Secondary content modules (conversations, culture, exercises, branching dialogues) are lazy-loaded via `requestIdleCallback` after app initialization. Each is appended as an async `<script>` tag. In production builds, script filenames are resolved via `window.__fileHash` (a hash map injected by `build.js`).

### Vocab Indexes

`buildVocabIndexes()` in `learn-vocab.js` creates O(1) lookup maps on first access:
- `VOCAB_BY_CATEGORY` — words grouped by category
- `VOCAB_BY_LEVEL` — words grouped by CEFR level
- `VOCAB_BY_WORD` — word string → entry object
- `VOCAB_CATEGORY_COUNTS` — category → count

Indexes rebuild automatically when `VOCAB_DATA.length` changes.

---

## Data Schemas

### Verb (`verbs.js`)
```javascript
{ infinitive: 'hablar', english: 'to speak', type: 'regular',
  group: 'ar', stemChange: null, level: 'A1', frequency: 1 }
```
Types: `regular`, `irregular`, `stem-changing`, `reflexive`

### Vocabulary (`vocab-data.json`)
```javascript
{ word: 'gato', english: 'cat', category: 'animals', pos: 'noun',
  gender: 'm', example: '¿Dónde está el gato?',
  exampleEn: 'Where is the cat?', level: 'A1', freq: 3,
  cognate: false }
```
POS values are full words (`noun`, `verb`, `adjective`, `adverb`, `phrase`, etc.) — 2,744 abbreviations were normalized. All nouns have gender values (`m`/`f`/`m/f`). 1,415 trivial cognates (word ≈ English after accent stripping) are flagged with `cognate: true`. 100 idiomatic verb phrases reclassified from `verb` to `phrase` POS. 441 A1/A2 examples rewritten to include the dictionary form of the word.

### Grammar Lesson (`grammar.js`)
```javascript
{ id: 'gram-1', title: 'El género de los sustantivos',
  titleEn: 'Noun Gender', level: 'A1', order: 1,
  content: '<h3>...</h3><p>...</p>',  // HTML
  quiz: [{ type: 'mc'|'fib', question, answer, options, explanation }] }
```

### Phrase (`phrases.js`)
```javascript
{ id: 'greet-1', situation: 'greetings',
  spanish: '¡Hola!', english: 'Hello!',
  notes: 'Informal', formality: 'informal',
  reply: { spanish: '¡Hola! ¿Qué tal?', english: 'Hello! How are you?' } }
```

### Conversation (`conversations.js`)
```javascript
{ id: 'restaurant-1', title: 'En el Restaurante', level: 'A1',
  speakers: [{ name: 'Mesero', role: 'npc' }, { name: 'Tú', role: 'player' }],
  dialogue: [{ speaker: 0, spanish: '...', english: '...' }, ...],
  vocab: [{ word, english }], quiz: [{ prompt, options, correct }] }
```

### Branching Dialogue (`branching_dialogues.js`)
```javascript
{ id: 'bd-1', title: 'En la cafetería', titleEn: 'At the café',
  icon: '☕', level: 'A1', desc: 'Order a coffee and make small talk',
  speakers: [{ name: 'Barista', role: 'npc' }, { name: 'Tú', role: 'player' }],
  nodes: [
    { id: 'start', speaker: 0, spanish: '...', english: '...', next: 'choice1' },
    { id: 'choice1', speaker: 1, choices: [
      { spanish: '...', english: '...', feedback: '...', next: 'resp1a' },
    ]},
    { id: 'end', type: 'end', spanish: '...', english: '...' }
  ],
  vocab: [{ word, english }] }
```
Nodes are either NPC lines (auto-advance with `next` pointer) or player choice points (`choices` array). End nodes mark dialogue completion.

### Placement Question (`placement_questions.js`)
```javascript
{ id: 'pq-c2-15', level: 'C2', difficulty: 5.8,
  domain: 'grammar'|'vocab'|'usage'|'reading',
  type: 'mc'|'fib', prompt: '...', answer: '...',
  options: [...], explanation: '...' }
```
Difficulty scale: A1 (1.0–1.8), A2 (1.9–2.7), B1 (2.8–3.5), B2 (3.6–4.3), C1 (4.4–5.2), C2 (5.3–6.5).

### Culture Item (all culture files)
```javascript
{ id: 'music-reggaeton', spanishName: '...', englishName: '...',
  icon: '🎤', tags: [...], descEs: '<html>', descEn: '<html>',
  vocab: [{ word, english }],
  quiz: [{ prompt, options, correct }] }
```

---

## Progress Structure

Returned by `newProgress()` in `app-core.js`, saved per-profile to localStorage:

```javascript
{
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastDate: null,          // 'YYYY-MM-DD' (local date, not UTC)
  freezeTokens: 0,         // earned every 7-day streak, auto-consumed on missed days

  verbMastery: {},         // 'hablar:present:0' → 1|2|3|4
  verbFsrs: {},            // same key → { s, d, lastRev }
  vocabMastery: {},        // 'gato' → 1|2|3|4
  vocabFsrs: {},           // 'gato' → { s, d, lastRev }
  grammarDone: {},         // 'gram-1' → true
  grammarFsrs: {},         // 'gram-1' → { s, d, lastRev }
  phraseMastery: {},       // 'greet-1' → 1|2|3|4
  phraseFsrs: {},          // 'greet-1' → { s, d, lastRev }
  numberMastery: {},
  cultureDone: {},
  bdDone: {},              // 'bd-1' → true (branching dialogues completed)
  practiceLog: {},         // 'YYYY-MM-DD' → number (XP earned that day)
  bookmarks: [],           // ['vocab:gato', 'grammar:gram-1', 'phrase:greet-1']

  placementLevel: 'B1',         // overall (backward compat)
  placementLevels: {             // per-domain
    grammar: 'A2', vocab: 'B2'
  },
  placementDate: '2026-02-27',

  settings: {
    display: 'standard',   // standard | immersion | hints
    region: 'latam',       // latam | spain
    theme: 'dark',         // dark | light | auto (follows system preference)
    palette: 'alhambra',   // alhambra | oaxaca | patagonia | flamenco
    accents: 'warn',       // strict | warn | lenient
    ttsRate: 1,            // 0.7 | 1 | 1.3
    dailyGoal: 200,        // 50 | 100 | 200 | 500 XP per day
  },

  analytics: {
    totalStudyTime: 0,       // milliseconds
    sessions: [],            // last 30: { start, duration, screens[] }
    quizzes: {},             // type → { completed, correct, incorrect, totalTime }
    featureUsage: {},        // feature → visit count
    dailyActivity: [],       // last 30 days: { date, xp, wordsLearned, studyTime, quizzes }
  },
}
```

**Mastery levels**: 1 = learning, 2 = familiar, 3 = intermediate, 4 = mastered. Derived from FSRS stability via `masteryFromFsrs(s)`.

---

## Analytics (`app-core.js`)

Privacy-first, local-only analytics system — zero network requests, all data in `progress.analytics`.

### Tracking

- **Sessions**: auto-start on profile load, pause/resume on `visibilitychange`, end on `beforeunload`. Last 30 sessions stored with start time, duration, and screens visited.
- **Screen visits**: mapped to feature categories (vocab, verbs, grammar, etc.) via `analyticsTrackScreen()`.
- **Quiz completions**: recorded via `analyticsTrackQuiz()` when `showResults()` fires — tracks type, correct/incorrect counts, and total time.
- **New items**: counted when `reviewItem()` processes a first-ever FSRS rating.
- **Daily activity**: 30-day rolling window of XP, words learned, study time, and quizzes per day.
- **Saves**: debounced at 3 seconds via `_debouncedAnalyticsSave()` to avoid performance hits.

### Display

`renderAnalytics()` builds five cards in the Stats screen:
1. **Study Time** — total time, session count, average session length
2. **Daily XP** — 14-day CSS-only vertical bar chart with daily goal line
3. **Quizzes By Type** — horizontal bar chart sorted by frequency, showing accuracy percentage
4. **Most Used Features** — horizontal bar chart of feature visit counts
5. **Learning Pace** — items learned, active days, items/day averages (all-time and 7-day)

---

## Branching Dialogues (`branching_dialogues.js`, `app-learn.js`)

Interactive conversation practice where player choices affect the dialogue flow.

### Data Structure

Each dialogue has a flat `nodes` array. Nodes are keyed by `id` and come in three types:
- **NPC nodes**: `{ speaker, spanish, english, next }` — auto-advance after a delay
- **Player nodes**: `{ speaker, choices: [{ spanish, english, feedback, next }] }` — render buttons, wait for selection
- **End nodes**: `{ type: 'end', spanish, english }` — show completion screen

Branches can converge (multiple paths lead to the same node ID).

### Renderer

- `openBranchingDialogues()` — renders dialogue list with completion badges
- `startBranchingDialogue(id)` — initializes session, shows first node
- `_bdRenderNode()` — processes nodes: auto-advances NPC lines (500ms delay), shows player choice buttons
- `bdPick(idx)` — handles player choice: adds message to chat, shows feedback, awards XP
- `_bdShowEnd()` — completion screen with XP summary, vocab list, persists to `progress.bdDone`

### UI

Chat-style layout with NPC messages left-aligned and player messages right-aligned. CSS classes: `bd-msg`, `bd-msg-npc`, `bd-msg-player`, `bd-choice-btn`, `bd-feedback-box`.

---

## Quiz Engine (`quiz-engine.js`)

### `createQuizFlow(config)`

Managed MC quiz lifecycle used by culture and dialogue quizzes. Handles: start → render → selectOption → submit → next → onComplete.

Config: `containerId`, `nextBtnId`, `progressId`, `autoSubmit` (boolean), `getCorrectIdx`/`getCorrectValue`, `onCorrect`/`onIncorrect`, `onComplete`, `renderQuestion`, `getExplanation`.

When `autoSubmit: true`, tapping an option triggers submit immediately (skipping the Submit button step).

### `processMCSubmit(opts)`

Shared helper used by 6+ quiz types (minimal pairs, phonetic pairs, homophones, connectors, reading, phrases). Handles the common submit pattern: disable buttons, mark correct/incorrect CSS classes, set `aria-disabled="true"`, render feedback, show next button, run FSRS review.

Config: `optionsSel`, `isCorrectBtn(btn)`, `feedbackId`, `nextBtnId`, `feedbackFn(isCorrect)`, `fsrs: { store, masteryStore, key }`.

### `renderMCQuestionHTML(cfg)` / `renderFIBQuestionHTML(cfg)`

Shared HTML generators for quiz question layouts, used by verb, vocab, and grammar quiz renderers to eliminate duplicated markup:
- `renderMCQuestionHTML({ question, options, answerAction, submitAction })` — question text + MC option buttons + submit button
- `renderFIBQuestionHTML({ question, inputId, submitAction, accentAction, feedbackId })` — question text + text input + accent bar + feedback div

### `partialShuffle(arr, n)`

Fisher-Yates partial shuffle — selects `n` random elements from `arr` in O(n) time instead of shuffling the entire array. Used by quiz builders that only need a subset of questions.

### Auto-Submit & Haptic Feedback

Most MC quiz types now auto-submit when the user taps an option (via `selectMCOption(selector, idx, autoSubmitFn)`). This reduces the interaction from 3 taps (select + submit + next) to 2 (select + next). The placement test is excluded from auto-submit since it's high-stakes.

Both `createQuizFlow.submit()` and `processMCSubmit()` call `_haptic(correct)` which triggers `navigator.vibrate()` on supported devices: a short 30ms pulse for correct answers, a double pulse (40-30-40ms) for incorrect.

---

## FSRS Spaced Repetition (`fsrs.js`)

Implementation of FSRS-4.5 with 17 trained weights. All functions include input validation clamps (rating to [1,4], stability to >0, difficulty to [1,10], recall to (0,1]) to prevent NaN propagation from invalid inputs. Functions are annotated with JSDoc types for IDE support.

**Per-item state**: `{ s: stability, d: difficulty, lastRev: timestamp }`

**Key functions**:
- `fsrsR(s, elapsedDays)` — recall probability (exponential decay)
- `fsrsInitS(rating)` / `fsrsInitD(rating)` — initial values from first rating
- `fsrsSAfterRecall(d, s, r, rating)` — new stability after correct review
- `fsrsSAfterForgetting(d, s, r)` — new stability after failed review
- `masteryFromFsrs(s)` — stability → mastery level (1–4)

**Review flow** (in `app-core.js`):
1. User rates item 1–4 (Again/Hard/Good/Easy)
2. `_saveRatingSnapshot()` captures pre-rating state for undo
3. `reviewItem(fsrsStore, masteryStore, key, rating)` computes new s, d; triggers `analyticsTrackWordsLearned()` on first review
4. Item is "due" when `fsrsR(s, elapsed) < 0.9`
5. `getDueItems()` returns items needing review
6. `undoLastRating()` restores the snapshot if user taps undo within the toast window

---

## Conjugation Engine (`conjugation.js`)

Supports 19 tenses across 6 persons (yo, tú, él, nosotros, vosotros, ellos). Functions are annotated with JSDoc types for IDE support.

**Tense categories**:
- **Simple** (9): present, preterite, imperfect, future, conditional, subjunctive present/imperfect, imperative affirmative/negative
- **Compound** (6): present perfect, pluperfect, future perfect, conditional perfect, subjunctive perfect/pluperfect — formed with haber + past participle
- **Progressive** (3): present/preterite/imperfect progressive — formed with estar + gerund

**Algorithm** (`conjugate(infinitive, tense, person)`):
0. Validate `personIdx` is integer in [0, 5]; return `'?'` otherwise
1. Check for compound tense → conjugate haber + `getParticiple()`
2. Check for progressive → conjugate estar + `getGerund()`
3. Check `FULL_IRREGULARS` for complete override
4. Check irregular future/conditional stems
5. Apply stem change (e>ie, o>ue, e>i) for boot-pattern persons
6. Apply spelling change (c>qu, g>gu, z>c, etc.)
7. Add regular ending from `REGULAR_ENDINGS[tense][group]`
8. For reflexive verbs, prepend/append pronoun

---

## Placement Test — IRT Adaptive Algorithm (`placement.js`)

Uses a **Rasch model** (1-parameter Item Response Theory) with per-domain scoring.

### Model

```
P(correct | θ, b) = 1 / (1 + exp(-(θ - b)))
```
- θ = user ability estimate (starts at 3.0 ≈ B1)
- b = question difficulty (1.0–6.5)

### Per-Domain Scoring

Questions are grouped into two scoring domains:
- **Grammar**: grammar + usage + reading + verb questions
- **Vocab**: vocabulary questions

Each domain has its own θ and standard error, estimated independently. This allows the test to produce different levels for grammar vs vocabulary (e.g., grammar A2, vocab B2).

### Question Selection

`selectNextIRTQuestion()` picks the unused question that maximizes information:
1. For each available question, compute distance from its group's θ
2. Apply penalties for: 3+ consecutive same domain, over-quota group
3. Target ratio: ~60% grammar, ~40% vocab (24/16 out of 40 questions)

### Ability Update

After each answer, `updateTheta()` runs Newton-Raphson MLE per domain:
```
θ_new = θ + Σ(x_i - P_i) / Σ(P_i * (1 - P_i))
```
where x_i = 1 if correct, P_i = model probability. Converges in ~5 iterations.

### Level Mapping

θ → CEFR: <1.85 = A1, <2.725 = A2, <3.55 = B1, <4.375 = B2, <5.35 = C1, ≥5.35 = C2 (midpoints between adjacent LEVEL_DIFFICULTY values)

### Result Application

`applyPlacementResults(levels)` unlocks content independently:
- Grammar lessons + verb forms: unlocked at/below the **grammar** level
- Vocabulary words: unlocked at/below the **vocab** level
- Unlocked items get mature FSRS state (`s: 30, d: 5`) so they appear as "mastered" and are reviewed infrequently

### Personalized Learning Plan

After placement, `showLearningPlan()` displays a level-specific module recommendation overlay. `LEARNING_PLANS` maps each CEFR level (A1–C2) to a prioritized list of modules, focus areas, and daily time recommendations. Users can start the plan or dismiss it; the plan is also accessible later via "See Your Learning Plan" on the placement results screen.

---

## Programmatic API (`api.js`, `api-node.js`)

A clean API layer that exposes the app's core functionality for use from Node.js scripts, automated tests, and the browser console — without modifying any existing code.

### Environment Support

| Environment | Access | How it works |
|---|---|---|
| **Browser** | `window.LeccionDiaria` | UMD wrapper reads from globals after all `<script defer>` tags execute |
| **Node.js** | `require('./api-node')()` | `vm.createContext` loads all source files into a sandbox with DOM stubs |

### API Surface

```js
// ── Node.js ──
const api = require('./api-node')();

// ── Browser (after page load) ──
const api = window.LeccionDiaria;

// ── Pure functions (no state) ──
api.conjugate('hablar', 'present', 0)         // 'hablo'
api.conjugateAll('ser', 'preterite')           // ['fui','fuiste','fue',...]
api.getParticiple('escribir')                  // 'escrito'
api.getGerund('dormir')                        // 'durmiendo'
api.checkAnswer('cafe', 'café')                // {correct: true, accentWarn: true}
api.stripAccents('año')                        // 'ano'
api.esc('<b>')                                 // '&lt;b&gt;'

api.fsrs.initS(3)                              // initial stability for rating 3
api.fsrs.recall(stability, elapsedDays)        // retrievability (0–1)
api.fsrs.mastery(stability)                    // mastery level 1–4

api.irt.prob(theta, difficulty)                // Rasch probability
api.irt.thetaToLevel(theta)                    // theta → CEFR string

api.util.shuffle([1,2,3])                      // shuffled copy
api.util.pick([1,2,3])                         // random element
api.util.pickN([1,2,3], 2)                     // 2 random elements

// ── Data access ──
api.data.verbs                                 // VERB_DATA array (251 verbs)
api.data.vocab                                 // VOCAB_DATA array (28K words)
api.data.tenses                                // TENSE_META object (19 tenses)
api.data.persons                               // PERSONS array (6 persons)
api.data.grammar                               // GRAMMAR_DATA array (67 lessons)
api.data.phrases                               // PHRASES_DATA array (325 phrases)
api.data.categories                            // VOCAB_CATEGORIES object (51 categories)

// ── Stateful session (profiles, progress, reviews) ──
const session = api.createSession();            // in-memory storage
const session = api.createSession(localStorage) // browser storage
session.createProfile('maria');
session.selectProfile('maria');
session.getProgress();                          // progress object
session.addXP(10);                              // increments XP, updates streak
session.reviewItem('vocabFsrs', 'vocabMastery', 'gato', 3);
session.isDue('vocabFsrs', 'gato');             // false (just reviewed)
session.getDueItems('vocabFsrs', ['gato','perro','casa']);
session.setSetting('accents', 'strict');
session.save();                                 // persist to storage

// ── Placement test (headless IRT) ──
const pt = session.startPlacement({ level: 'B1', mode: 'both', length: 20 });
while (!pt.isFinished()) {
  const q = pt.currentQuestion();
  if (!q) break;                                // pool exhausted
  const correct = /* evaluate answer */;
  pt.answer(correct);                           // updates theta via Newton-Raphson
}
const levels = pt.finish();                     // {grammar: 'B2', vocab: 'A2', overall: 'B1'}
```

### Session Class

Replicates pure logic from `app-core.js` without DOM calls. Uses injectable storage backend — `new api.MemoryStorage()` for testing, `localStorage` for browser persistence.

| Session method | Wraps | Skips (DOM) |
|---|---|---|
| `addXP(n)` | XP increment, practiceLog, streak logic | `updateNavStats()`, achievement toasts |
| `reviewItem(store, mastery, key, rating)` | FSRS computation, mastery update | `analyticsTrackWordsLearned()` DOM calls |
| `_checkStreak()` | Streak/freeze logic | Streak milestone toasts |
| `save()` | localStorage write | IDB backup |
| `selectProfile(name)` | Load progress from storage | `applySettings()`, `switchTab()` |

### PlacementSession Class

Wraps the IRT state machine from `placement.js` without DOM rendering:

1. Constructor sets up placement state and builds question pool via `buildPlacementIRTPool()`
2. `currentQuestion()` calls `selectNextIRTQuestion()` to pick the optimal next question
3. `answer(isCorrect)` records the answer and calls `updateTheta()` (Newton-Raphson MLE)
4. `finish()` calls `determinePlacementLevel()` and `applyPlacementResults()` (seeds FSRS state for mastered items)

Placement modes: `'both'` (grammar + vocab), `'grammar'`, `'vocab'`. Test length: 10, 20, or 40 questions. Starting level: any CEFR level (A1–C2) for initial theta.

### Node.js Loader (`api-node.js`)

Uses the same `vm.createContext` pattern as the existing test suite (`tests/test_core.js`). Loads source files in dependency order with a minimal DOM stub context:

- `document.getElementById()` → `null` (safe — all DOM code has null guards or is bypassed)
- `localStorage` → `MemoryStorage` (functional in-memory mock)
- `indexedDB` → `null` (IDB backup silently skips via existing `.catch()`)
- `matchMedia` → `{ matches: false }` (defaults to dark theme)

Special handling for `let`-scoped placement state variables (which are not shared across `vm.runInContext` calls): setter/getter helper functions (`_setPlacementState`, `_getPlacementState`, `_setProgress`, `_setCurrentProfile`) bridge the lexical scope gap.

Vocab data is loaded synchronously from `vocab-data.json` on disk, and `buildVocabIndexes()` is called to populate lookup maps.

---

## Display Modes & Localization

All user-facing strings are in `UI_STRINGS` with `[english, spanish]` pairs.

- **`t(key)`** — returns English in standard mode, Spanish in immersion, Spanish (English) in hints
- **`tBtn(key)`** — same but no parenthetical in hints mode (for button labels)
- **`tenseLabel(meta)`** — returns tense name adapted to display mode

`applyDisplayMode()` batch-updates all translatable elements using data attributes:
- `data-i18n="key"` → `el.textContent = t(key)` (headings, labels, descriptions)
- `data-i18n-btn="key"` → `el.textContent = tBtn(key)` (buttons, tabs, pills)
- `data-i18n-placeholder="key"` → `el.placeholder = t(key)` (input fields)

Verb tense metadata has both `label` (Spanish) and `labelEn` (English), selected by `tenseLabel()`.

---

## Theming (`styles.css`)

CSS custom properties drive the theme system. Four color palettes (Alhambra, Oaxaca, Patagonia, Flamenco) and three theme modes (dark, light, auto) are applied by setting CSS variables on `<html>`.

**Auto theme** resolves to dark or light based on the system's `prefers-color-scheme` media query. A `matchMedia` listener in `app-core.js` triggers instant theme switching when the system preference changes.

Mobile-first responsive design with max-width 640px centered container. Safe-area insets for notched phones. Card grid uses `minmax(100px, 1fr)` for 320px screen support.

**Z-index scale**: nav/tab-bar=100, dropdowns=200, modals=1000, toasts=1100.

**Accessibility**: All color combinations verified WCAG AA 4.5:1 contrast ratio. Dark theme `--text2` set to `#cdd4e0` for improved contrast. Interactive cards have `role="button" tabindex="0"`, `cursor:pointer`, hover lift (`translateY`), shadow transitions, and `:focus-visible` outlines. All touch targets (nav buttons, accent buttons, tab bar) are ≥44px. Flashcard rating buttons use semantic `<button>` elements. Flashcard flip uses shared `announceFlip()` with `aria-live` announcer. Quiz feedback divs have `aria-live="assertive"`. Disabled quiz options have `aria-disabled="true"`. Progress bars include `aria-valuenow` updates. Tabs use `aria-controls`. Focus-visible styling on tab elements, cards, nav buttons. Grammar search input has `aria-label`. Share modal/overlay has proper dialog ARIA attributes, focus trap, and `aria-hidden` toggle. Arrow key navigation guards empty option lists. Screen transitions announced via hidden `aria-live` region. Nav streak has `aria-live="polite"`. Skip-to-content link. `@media prefers-reduced-motion` support. `.writing-area` and `.cloze-blank` use `:focus-visible`.

Key CSS ordering note: `.quiz-option.correct` and `.quiz-option.incorrect` must appear **after** `.quiz-option.selected` in the stylesheet to ensure answer highlighting overrides selection styling.

---

## Service Worker (`sw.js`)

Dual-cache system with independent versioning:

- **`APP_CACHE`** (~500KB) — precached on install: HTML, CSS, core JS modules, manifest, vocab search worker
- **`DATA_CACHE`** (~10MB+) — cached on first use via stale-while-revalidate: split vocab JSON files, grammar, phrases, branching dialogues, all content modules

`KNOWN_CACHES = [APP_CACHE, DATA_CACHE]` — on activate, any cache not in this list is deleted.

On fetch, `isDataFile(url)` routes requests to the correct cache. The cached version is served immediately while a network fetch runs in the background to update the cache. Fetch requests have timeouts (5 seconds for data files, 10 seconds for app shell) — on timeout, the cached response is returned to avoid indefinite waits on slow connections.

In development, cache names are manually versioned (e.g., `leccion-app-v1`, `leccion-data-v1`). In production builds, `build.js` computes separate content hashes for app shell and data files (e.g., `leccion-app-90810069`, `leccion-data-e9bd889a`). This means app shell code changes don't force re-download of large data files, and vice versa.

---

## Toast Notifications

`showToast(icon, text, type)` in `app-core.js` renders animated snackbar notifications. Types: `success`, `error`, `info`, `undo`. Toasts auto-dismiss after 3.5 seconds with a fade-out animation. The undo toast includes a button that calls `undoLastRating()` to restore the previous SRS state.

---

## Offline Indicator

The app listens for `online`/`offline` events. When offline, all TTS buttons receive the `.offline-disabled` class (grayscale filter + reduced opacity) and `speak()` checks `navigator.onLine` before attempting speech synthesis. When connectivity returns, TTS buttons are re-enabled automatically.

---

## Streak & Daily Goals

### Streak Freeze Tokens

Users earn 1 freeze token for every 7-day streak milestone. Tokens are consumed automatically when a day is missed (preserving the streak). The freeze token count is displayed in Settings.

### Daily XP Goal

Configurable in Settings (50/100/200/500 XP). The Today screen shows a progress bar tracking today's XP against the goal. XP is tracked per-day in `progress.practiceLog`.

---

## Onboarding

New users see a 4-step onboarding carousel after creating their first profile (before the placement test offer). Steps cover: welcome, spaced repetition explanation, daily goals/streaks, and tab navigation. The carousel is implemented in `app-core.js` (`showOnboarding()`, `onboardingNext()`, `onboardingSkip()`).

After completing the placement test, users see a personalized learning plan recommending specific modules and focus areas based on their assessed level (see Placement Test section).

---

## Bookmarks

Users can bookmark vocab words, grammar lessons, and phrases for quick review. Bookmarks are stored as `type:id` strings in `progress.bookmarks[]`.

- `toggleBookmark(type, id)` — adds/removes a bookmark
- `isBookmarked(type, id)` — check if bookmarked
- `bookmarkBtnHTML(type, id)` — renders a star toggle button
- `bookmarkType(bk)` / `bookmarkId(bk)` — parse `type:id` bookmark strings
- `renderBookmarks()` — renders the Bookmarks section on the Today screen (up to 20 items)

Bookmark types: `vocab` (keyed by word), `grammar` (keyed by lesson ID), `phrase` (keyed by phrase text).

---

## Build System

### Development

No build step needed — serve source files directly via `./serve.sh` or any HTTP server. Scripts load as global `<script defer>` tags.

### Production Build

`npm run build` (or `node build.js`) produces an optimized `dist/` directory:

1. **Minification** — All JS (via esbuild, with prominent fallback warning) and CSS are minified (~320KB savings, ~21% CSS reduction); per-file try/catch with file name in error messages
2. **Cache-busting** — Each file gets a content hash in its filename (e.g., `app-core.d50c0d2d.js`), using `escapeRegex()` helper for safe filename regex replacement
3. **HTML rewriting** — `index.html` is updated with hashed filenames and whitespace-collapsed
4. **Dual-cache SW generation** — A new `sw.js` is generated with hashed filenames, fetch timeouts, and separate content-based version hashes for app shell (`APP_CACHE`) and data files (`DATA_CACHE`)
5. **Lazy-script resolution** — A `window.__fileHash` map is injected so `app-init.js` can resolve lazy-loaded scripts and data files to their hashed names
6. **Static copies** — Split vocab JSON files, manifest, and icons are copied via recursive `fs.cpSync`

### Testing

**Unit tests**: `npm test` (or `node tests/run.js`) runs 174 unit tests with zero dependencies (per-test timeout, full stack traces on failure):
- **Conjugation**: regular/irregular verbs across all 19 tenses, stem changes (incl. dormir o>ue), reflexives, compounds, unknown verbs, bounds checking
- **FSRS**: stability, difficulty, recall probability, mastery level mapping
- **Core utils**: `checkAnswer()`, `stripAccents()`, `esc()` HTML escaping, `pick()`, `bookmarkId()`/`bookmarkType()`, `shuffle()`, `pickN()`, localStorage round-trips (save/load, empty, corrupt JSON)
- **Placement**: IRT probability, theta updates, question selection, cognate detection, levenshtein distance
- **Quiz engine**: `createQuizFlow` API, score tracking, `processMCSubmit`, accent bar, progress bar
- **Build helpers**: `contentHash()` determinism/length/hex, `escapeRegex()` for all metacharacters
- **Programmatic API**: pure function access (conjugation, FSRS, IRT, utils), data access (verbs, vocab, tenses, grammar, phrases, categories), session CRUD (profile create/select, XP, settings, save/reload), FSRS review flow (reviewItem, isDue, getDueItems), headless placement test (grammar-only, vocab-only, both modes)
- **Vocab data**: field validation, CEFR levels, POS normalization, noun genders, category presence, frequency range, split file integrity

**E2E tests**: `npm run test:e2e` runs 14 Playwright tests with Chromium:
- **Navigation** (6): app loads clean, stat cards + tab bar visible, tab navigation (Learn, Practice, Home), back button
- **Learn flow** (5): navigate to Vocabulary, see categories, open category, start quiz with options, click answer and get feedback
- **Placement** (3): reach level selection, start A1 test, answer question and verify progress

### Type Checking

`jsconfig.json` enables VS Code / IDE type checking with `checkJs: true`. JSDoc annotations on `fsrs.js` and `conjugation.js` provide type-aware autocompletion, hover info, and basic error detection. `strict: false` allows gradual migration.

## Deployment

GitHub Pages deployment via `.github/workflows/deploy.yml`. On push to `main`, the workflow:
1. Installs Node.js dependencies (`npm install`)
2. Runs the test suite (`npm test`)
3. Builds to `dist/` (`npm run build`) — minified, cache-busted output with dual-cache SW
4. Deploys `dist/` to GitHub Pages

---

## Adding Content

### New grammar lesson
Add to `GRAMMAR_DATA` in `grammar.js`. Include `id`, `title`, `titleEn`, `level`, `order`, `content` (HTML), and `quiz` (array of 5 questions with `type`, `question`, `answer`, `options`, `explanation`).

### New vocabulary
Add entries to `vocab-data.json`. If creating a new category, also add it to `VOCAB_CATEGORIES` in `vocab-categories.js`. After editing, re-split the vocab data by running `node -e` to regenerate `vocab-a1a2.json`, `vocab-b1.json`, `vocab-b2.json`, `vocab-c1.json`, and `vocab-c2.json` (see `build.js` or the split script used during development). Ensure: POS is a full word, nouns have gender, examples contain the dictionary form of the word, freq is 1–6.

### New verbs
Add to `VERB_DATA` in `verbs.js`. The conjugation engine handles regular verbs automatically. For irregular verbs, add overrides to `FULL_IRREGULARS` or `IRREGULAR_FUTURE_STEMS` in `conjugation.js`.

### New placement questions
Add to `PLACEMENT_QUESTIONS` in `placement_questions.js`. Set `difficulty` on the IRT scale (1.0–6.5) matching the question's CEFR level range.

### New culture module
Create a new `modulename.js` file following the culture item schema. Add the `<script>` tag to `index.html` (before the app modules), add it to the `DATA_FILES` set in `sw.js`, and register it in the `CULTURE_MODULES` object in `app-learn.js`.

### New branching dialogue
Add a new entry to `BRANCHING_DIALOGUES` in `branching_dialogues.js`. Follow the node structure: NPC nodes with `next`, player nodes with `choices` array, and an end node with `type: 'end'`. Each choice needs `spanish`, `english`, `feedback`, and `next` (node ID). Include a `vocab` array for the completion screen.

### New reading passage
Add to `READING_DATA` in `reading.js`. Include `id` (sequential), `title`, `titleEn`, `level`, `text` (Spanish passage), `vocab` array, and `questions` array with `prompt`, `options`, and `correct` index. Update the passage count comment at the top of the file.
