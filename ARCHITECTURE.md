# Leccion Diaria — Architecture & Developer Guide

A Progressive Web App for learning Spanish (A1–C2) using spaced repetition, adaptive testing, and gamification. Built with vanilla HTML/CSS/JS — no frameworks, no backend. Uses esbuild for production minification and cache-busting.

---

## File Overview

| File | Purpose |
|------|---------|
| **App modules** | |
| `index.html` | 30+ screens, nav bar, tab bar, modal system |
| `app-init.js` | Startup, profile loading, event delegation, routing, search handlers |
| `app-core.js` | Progress state, FSRS helpers, shared computation (recall, mastery, CEFR), settings, TTS |
| `app-learn.js` | Today screen, verb learning/drill/quiz, grammar lessons, phrases, numbers, culture, results |
| `learn-vocab.js` | Vocabulary indexes, browser, flashcards, quiz (MC + production + gender), Learn New Words |
| `placement.js` | IRT-adaptive placement test (Rasch model, per-domain scoring, Newton-Raphson MLE) |
| `app-practice.js` | Export/import, admin mode, practice exercises (minimal pairs, phonetic pairs, homophones, connectors, sentence build, cloze, translation, dictation), stats dashboard, unified review queue |
| `practice-reference.js` | Verb conjugation reference, conjugation rules/endings, pronunciation guide, reading comprehension, themed vocabulary, curriculum tracks |
| `quiz-engine.js` | Shared quiz rendering (`createQuizFlow`), MC submit helper (`processMCSubmit`), haptic feedback, HTML helpers |
| `conjugation.js` | Verb conjugation engine: 19 tenses, 252 verbs, irregular/stem-change handling |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm (17 parameters) |
| `vocab-search-worker.js` | Web Worker for non-blocking vocab search with prefix index |
| `styles.css` | Dark/light/auto themes, 4 color palettes, responsive mobile-first layout |
| `sw.js` | Service worker: app shell precache + stale-while-revalidate for data |
| `manifest.json` | PWA metadata (maskable icons) |
| **Build & Test** | |
| `build.js` | esbuild-based build: minification, content-hash filenames, dist/ output |
| `package.json` | Node.js project config (esbuild dev dependency) |
| `tests/run.js` | Minimal zero-dependency test runner |
| `tests/test_*.js` | Unit tests for conjugation, FSRS, core utils, and vocab data validation |
| **Data files** | |
| `verbs.js` | 252 verbs with type, group, stem change, level, frequency |
| `vocab-data.json` | ~28K words as JSON (monolithic fallback) |
| `vocab-a1a2.json` | A1+A2 vocab (~2K words, 494KB — loaded first for fast startup) |
| `vocab-b1.json` `vocab-b2.json` `vocab-c1.json` `vocab-c2.json` | Remaining vocab levels (loaded progressively in background) |
| `vocab-categories.js` | 55+ vocabulary category definitions with titles and icons |
| `grammar.js` | 67 grammar lessons (A1–C2) with HTML content and quiz questions |
| `phrases.js` | 260+ phrases across 21 situations with formality and reply |
| `conversations.js` | 21 role-play dialogue scenarios with vocab and quiz |
| `placement_questions.js` | 120 hand-crafted IRT-calibrated placement questions (A1–C2) |
| `curriculum_tracks.js` | Guided curriculum tracks with leveled lesson sequences |
| `reading.js` `reading_sat.js` | Reading comprehension passages |
| `cloze_passages.js` `dictation.js` | Cloze and dictation exercises |
| `sentence_construction.js` `translation_drills.js` | Writing practice exercises |
| `minimal_pairs.js` `homophones.js` `phonetic_pairs.js` | Pronunciation exercises |
| `connectors.js` `themed_vocab.js` `jokes.js` | Additional content modules |
| `recipes.js` `music.js` `movies.js` `poetry.js` `sports.js` `proverbs.js` `folktales.js` `festivals.js` `history.js` `travel.js` `trivia.js` `idioms.js` | Cultural content modules with descriptions, vocab, and quizzes |
| **Utilities** | |
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
  │              Vocab/grammar/verb search handlers (Worker-backed)
  │              Progressive vocab loading (A1-A2 first, then B1→C2)
  │              Lazy-loading: secondary scripts via requestIdleCallback
  │
  ├── app-core.js ──── Navigation: showScreen(id) / goBack() / switchTab(tab)
  │                     Progress state, FSRS helpers, recall/mastery computation
  │                     Settings (theme auto-detect, daily goals, streak freeze)
  │                     Bookmarks system (vocab, grammar, phrases)
  │                     Onboarding carousel for new users
  │                     Persistence (localStorage per profile)
  │                     TTS with regional voice selection (es-MX / es-ES)
  │
  ├── learn-vocab.js ── Vocab indexes (by category, level, word)
  │                      Vocab browser with progress indicators
  │                      Flashcard learning, MC/production/gender quizzes
  │                      Learn New Words (lowest-probability flashcards)
  │
  ├── app-learn.js ──── Today screen with daily XP goal progress
  │                      Verb learning: flashcards, drills, pattern drills, quiz
  │                      Grammar lessons with searchable browser
  │                      Phrases: browser with mastery indicators, flashcards, quiz
  │                      Numbers, culture modules, dialogue practice
  │                      Results screen
  │
  ├── placement.js ──── IRT adaptive placement test (Rasch model)
  │                      Per-domain scoring (grammar + vocab)
  │                      Newton-Raphson MLE, question selection
  │
  ├── app-practice.js ── Stats dashboard, recall health, SRS card distribution
  │                       Practice exercises: minimal pairs, phonetic pairs,
  │                         homophones, connectors, sentence build, cloze,
  │                         translation, dictation
  │                       Unified review queue (multi-store FSRS)
  │                       Export/import, admin mode
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
  │                      Haptic feedback (navigator.vibrate) on answers
  │                      HTML helpers (accent bar, progress bar)
  │
  └── vocab-search-worker.js ── Web Worker for vocab search
                                 Builds prefix index (up to 4 chars) at init
                                 Updated progressively as vocab chunks load
```

### State Management

- **`progress`** — the main user state object, saved to `localStorage['ld_progress_' + profileName]`
- **`screenStack`** — array tracking navigation history for back button
- **`currentProfile`** — active profile name
- **Placement state** — `placementThetas`, `placementHistory`, etc. (session-scoped, saved to `sessionStorage` for tab-switch recovery)
- **Practice state** — per-exercise queue/index/score variables (e.g., `mpQueue`, `mpIdx`, `mpScore`)

All state is defined in `app-core.js` and accessible globally. The app modules read and write this shared state.

### Navigation

All screens are `<div>` elements in `index.html` with `display:none` by default. `showScreen(id)` hides the current screen and shows the target. The tab bar has 8 main tabs; Culture and Explore have dropdown submenus.

### Event Handling

A single delegated click handler on `document` routes all `data-action` attributes to handler functions. Keyboard events handle Enter (submit/advance) and 1–4 (flashcard ratings).

---

## Data Loading

### Vocabulary (progressive JSON loading)

Vocabulary data (~28K entries) is split by CEFR level and loaded progressively:

1. `vocab-categories.js` (5KB) loads eagerly via `<script defer>` — provides `VOCAB_CATEGORIES` for rendering category cards
2. `vocab-a1a2.json` (494KB, ~2K entries) loads first via `fetch()` — enough for immediate A1-A2 use
3. `vocab-b1.json`, `vocab-b2.json`, `vocab-c1.json`, `vocab-c2.json` load sequentially in the background
4. After each chunk, `buildVocabIndexes()` runs and the vocab search Worker is updated
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

Secondary content modules (conversations, culture, exercises) are lazy-loaded via `requestIdleCallback` after app initialization. Each is appended as an async `<script>` tag. In production builds, script filenames are resolved via `window.__fileHash` (a hash map injected by `build.js`).

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
  exampleEn: 'Where is the cat?', level: 'A1', freq: 50 }
```

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
}
```

**Mastery levels**: 1 = learning, 2 = familiar, 3 = intermediate, 4 = mastered. Derived from FSRS stability via `masteryFromFsrs(s)`.

---

## Quiz Engine (`quiz-engine.js`)

### `createQuizFlow(config)`

Managed MC quiz lifecycle used by culture and dialogue quizzes. Handles: start → render → selectOption → submit → next → onComplete.

Config: `containerId`, `nextBtnId`, `progressId`, `autoSubmit` (boolean), `getCorrectIdx`/`getCorrectValue`, `onCorrect`/`onIncorrect`, `onComplete`, `renderQuestion`, `getExplanation`.

When `autoSubmit: true`, tapping an option triggers submit immediately (skipping the Submit button step).

### `processMCSubmit(opts)`

Shared helper used by 6+ quiz types (minimal pairs, phonetic pairs, homophones, connectors, reading, phrases). Handles the common submit pattern: disable buttons, mark correct/incorrect CSS classes, render feedback, show next button, run FSRS review.

Config: `optionsSel`, `isCorrectBtn(btn)`, `feedbackId`, `nextBtnId`, `feedbackFn(isCorrect)`, `fsrs: { store, masteryStore, key }`.

### Auto-Submit & Haptic Feedback

Most MC quiz types now auto-submit when the user taps an option (via `selectMCOption(selector, idx, autoSubmitFn)`). This reduces the interaction from 3 taps (select + submit + next) to 2 (select + next). The placement test is excluded from auto-submit since it's high-stakes.

Both `createQuizFlow.submit()` and `processMCSubmit()` call `_haptic(correct)` which triggers `navigator.vibrate()` on supported devices: a short 30ms pulse for correct answers, a double pulse (40-30-40ms) for incorrect.

---

## FSRS Spaced Repetition (`fsrs.js`)

Implementation of FSRS-4.5 with 17 trained weights.

**Per-item state**: `{ s: stability, d: difficulty, lastRev: timestamp }`

**Key functions**:
- `fsrsR(s, elapsedDays)` — recall probability (exponential decay)
- `fsrsInitS(rating)` / `fsrsInitD(rating)` — initial values from first rating
- `fsrsSAfterRecall(d, s, r, rating)` — new stability after correct review
- `fsrsSAfterForgetting(d, s, r)` — new stability after failed review
- `masteryFromFsrs(s)` — stability → mastery level (1–4)

**Review flow** (in `app-core.js`):
1. User rates item 1–4 (Again/Hard/Good/Easy)
2. `reviewItem(fsrsStore, masteryStore, key, rating)` computes new s, d
3. Item is "due" when `fsrsR(s, elapsed) < 0.9`
4. `getDueItems()` returns items needing review

---

## Conjugation Engine (`conjugation.js`)

Supports 19 tenses across 6 persons (yo, tú, él, nosotros, vosotros, ellos).

**Tense categories**:
- **Simple** (9): present, preterite, imperfect, future, conditional, subjunctive present/imperfect, imperative affirmative/negative
- **Compound** (6): present perfect, pluperfect, future perfect, conditional perfect, subjunctive perfect/pluperfect — formed with haber + past participle
- **Progressive** (3): present/preterite/imperfect progressive — formed with estar + gerund

**Algorithm** (`conjugate(infinitive, tense, person)`):
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

θ → CEFR: <1.8 = A1, <2.7 = A2, <3.5 = B1, <4.3 = B2, <5.2 = C1, ≥5.2 = C2

### Result Application

`applyPlacementResults(levels)` unlocks content independently:
- Grammar lessons + verb forms: unlocked at/below the **grammar** level
- Vocabulary words: unlocked at/below the **vocab** level
- Unlocked items get mature FSRS state (`s: 30, d: 5`) so they appear as "mastered" and are reviewed infrequently

---

## Display Modes & Localization

All user-facing strings are in `UI_STRINGS` with `[english, spanish]` pairs.

- **`t(key)`** — returns English in standard mode, Spanish in immersion, Spanish (English) in hints
- **`tBtn(key)`** — same but no parenthetical in hints mode (for button labels)
- **`tenseLabel(meta)`** — returns tense name adapted to display mode

Verb tense metadata has both `label` (Spanish) and `labelEn` (English), selected by `tenseLabel()`.

---

## Theming (`styles.css`)

CSS custom properties drive the theme system. Four color palettes (Alhambra, Oaxaca, Patagonia, Flamenco) and three theme modes (dark, light, auto) are applied by setting CSS variables on `<html>`.

**Auto theme** resolves to dark or light based on the system's `prefers-color-scheme` media query. A `matchMedia` listener in `app-core.js` triggers instant theme switching when the system preference changes.

Mobile-first responsive design with max-width 640px centered container. Safe-area insets for notched phones.

Key CSS ordering note: `.quiz-option.correct` and `.quiz-option.incorrect` must appear **after** `.quiz-option.selected` in the stylesheet to ensure answer highlighting overrides selection styling.

---

## Service Worker (`sw.js`)

Two-tier caching strategy:

- **App shell** (~500KB) — precached on install: HTML, CSS, core JS modules, manifest, vocab search worker
- **Data files** (~10MB+) — cached on first use via stale-while-revalidate: split vocab JSON files, grammar, phrases, all content modules

On fetch, the cached version is served immediately while a network fetch runs in the background to update the cache.

In development, the cache name is manually versioned (e.g., `leccion-diaria-v18`). In production builds, `build.js` generates a content-based hash (e.g., `leccion-diaria-ef2b709a`) and rewrites the SW with hashed filenames.

---

## Streak & Daily Goals

### Streak Freeze Tokens

Users earn 1 freeze token for every 7-day streak milestone. Tokens are consumed automatically when a day is missed (preserving the streak). The freeze token count is displayed in Settings.

### Daily XP Goal

Configurable in Settings (50/100/200/500 XP). The Today screen shows a progress bar tracking today's XP against the goal. XP is tracked per-day in `progress.practiceLog`.

---

## Onboarding

New users see a 4-step onboarding carousel after creating their first profile (before the placement test offer). Steps cover: welcome, spaced repetition explanation, daily goals/streaks, and tab navigation. The carousel is implemented in `app-core.js` (`showOnboarding()`, `onboardingNext()`, `onboardingSkip()`).

---

## Bookmarks

Users can bookmark vocab words, grammar lessons, and phrases for quick review. Bookmarks are stored as `type:id` strings in `progress.bookmarks[]`.

- `toggleBookmark(type, id)` — adds/removes a bookmark
- `isBookmarked(type, id)` — check if bookmarked
- `bookmarkBtnHTML(type, id)` — renders a star toggle button
- `renderBookmarks()` — renders the Bookmarks section on the Today screen (up to 20 items)

Bookmark types: `vocab` (keyed by word), `grammar` (keyed by lesson ID), `phrase` (keyed by phrase text).

---

## Build System

### Development

No build step needed — serve source files directly via `./serve.sh` or any HTTP server. Scripts load as global `<script defer>` tags.

### Production Build

`npm run build` (or `node build.js`) produces an optimized `dist/` directory:

1. **Minification** — All JS (via esbuild) and CSS are minified (~264KB savings, ~20% CSS reduction)
2. **Cache-busting** — Each file gets a content hash in its filename (e.g., `app-core.d50c0d2d.js`)
3. **HTML rewriting** — `index.html` is updated with hashed filenames and whitespace-collapsed
4. **SW generation** — A new `sw.js` is generated with hashed filenames and a content-based cache version
5. **Lazy-script resolution** — A `window.__fileHash` map is injected so `app-init.js` can resolve lazy-loaded scripts to their hashed names
6. **Static copies** — Split vocab JSON files, manifest, and icons are copied as-is

### Testing

`npm test` (or `node tests/run.js`) runs 49 unit tests with zero dependencies:
- **Conjugation**: regular/irregular verbs across all 19 tenses, stem changes, reflexives, compounds
- **FSRS**: stability, difficulty, recall probability, mastery level mapping
- **Core utils**: `checkAnswer()`, `stripAccents()`, `esc()` HTML escaping
- **Vocab data**: field validation, CEFR levels, category presence, split file integrity

## Deployment

GitHub Pages deployment via `.github/workflows/deploy.yml`. On push to `main`, the workflow:
1. Installs Node.js dependencies (`npm install`)
2. Runs the test suite (`npm test`)
3. Builds to `dist/` (`npm run build`) — minified, cache-busted output
4. Deploys `dist/` to GitHub Pages

---

## Adding Content

### New grammar lesson
Add to `GRAMMAR_DATA` in `grammar.js`. Include `id`, `title`, `titleEn`, `level`, `order`, `content` (HTML), and `quiz` (array of 5 questions with `type`, `question`, `answer`, `options`, `explanation`).

### New vocabulary
Add entries to `vocab-data.json`. If creating a new category, also add it to `VOCAB_CATEGORIES` in `vocab-categories.js`. After editing, re-split the vocab data by running `node -e` to regenerate `vocab-a1a2.json`, `vocab-b1.json`, `vocab-b2.json`, `vocab-c1.json`, and `vocab-c2.json` (see `build.js` or the split script used during development).

### New verbs
Add to `VERB_DATA` in `verbs.js`. The conjugation engine handles regular verbs automatically. For irregular verbs, add overrides to `FULL_IRREGULARS` or `IRREGULAR_FUTURE_STEMS` in `conjugation.js`.

### New placement questions
Add to `PLACEMENT_QUESTIONS` in `placement_questions.js`. Set `difficulty` on the IRT scale (1.0–6.5) matching the question's CEFR level range.

### New culture module
Create a new `modulename.js` file following the culture item schema. Add the `<script>` tag to `index.html` (before the app modules), add it to the `DATA_FILES` set in `sw.js`, and register it in the `CULTURE_MODULES` object in `app-learn.js`.
