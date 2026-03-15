# Leccion Diaria — Architecture & Developer Guide

A Progressive Web App for learning Spanish (A1–C2) using spaced repetition, adaptive testing, and gamification. Built with vanilla HTML/CSS/JS — no frameworks, no build tools, no backend.

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
| `quiz-engine.js` | Shared quiz rendering (`createQuizFlow`), MC submit helper (`processMCSubmit`), HTML helpers |
| `conjugation.js` | Verb conjugation engine: 19 tenses, 252 verbs, irregular/stem-change handling |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm (17 parameters) |
| `styles.css` | Dark/light/auto themes, 4 color palettes, responsive mobile-first layout |
| `sw.js` | Service worker: app shell precache + stale-while-revalidate for data |
| `manifest.json` | PWA metadata (maskable icons) |
| **Data files** | |
| `verbs.js` | 252 verbs with type, group, stem change, level, frequency |
| `vocab-data.json` | ~28K words as JSON (loaded async via fetch, cached in IndexedDB) |
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
| `generate_vocab.py` | Generates frequency vocabulary from the `wordfreq` Python library |
| `serve.sh` | Local development server (Python 3) |

---

## Architecture

```
User (browser)
  │
  ▼
app-init.js ─── Event delegation (single click listener on document)
  │              Vocab/grammar/verb search handlers
  │              Lazy-loading: secondary scripts + vocab JSON via IndexedDB
  │
  ├── app-core.js ──── Navigation: showScreen(id) / goBack() / switchTab(tab)
  │                     Progress state, FSRS helpers, recall/mastery computation
  │                     Settings (theme auto-detect, daily goals, streak freeze)
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
  ├── app-practice.js ── Stats dashboard, recall health
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
  └── quiz-engine.js ── createQuizFlow: managed MC quiz lifecycle
                         processMCSubmit: shared submit/disable/mark helper
                         HTML helpers (accent bar, progress bar)
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

### Vocabulary (async JSON)

Vocabulary data (~28K entries, ~7MB) is loaded asynchronously to avoid blocking initial paint:

1. `vocab-categories.js` (5KB) loads eagerly via `<script defer>` — provides `VOCAB_CATEGORIES` for rendering category cards
2. `vocab-data.json` (7MB) loads via `fetch()` + `JSON.parse()` after init (2–3x faster than JS eval)
3. Parsed data is cached in **IndexedDB** (`leccion-diaria` database, `cache` store) for instant loads on subsequent visits
4. All code guards access with `typeof VOCAB_DATA === 'undefined'` checks

### Other Data Files

Secondary content modules (conversations, culture, exercises) are lazy-loaded via `requestIdleCallback` after app initialization. Each is appended as an async `<script>` tag.

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

Config: `containerId`, `nextBtnId`, `progressId`, `getCorrectIdx`/`getCorrectValue`, `onCorrect`/`onIncorrect`, `onComplete`, `renderQuestion`, `getExplanation`.

### `processMCSubmit(opts)`

Shared helper used by 6+ quiz types (minimal pairs, phonetic pairs, homophones, connectors, reading, phrases). Handles the common submit pattern: disable buttons, mark correct/incorrect CSS classes, render feedback, show next button, run FSRS review.

Config: `optionsSel`, `isCorrectBtn(btn)`, `feedbackId`, `nextBtnId`, `feedbackFn(isCorrect)`, `fsrs: { store, masteryStore, key }`.

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

Cache name: `leccion-diaria-v17`. Two-tier caching strategy:

- **App shell** (~500KB) — precached on install: HTML, CSS, core JS modules, manifest
- **Data files** (~10MB+) — cached on first use via stale-while-revalidate: vocab JSON, grammar, phrases, all content modules

On fetch, the cached version is served immediately while a network fetch runs in the background to update the cache. Bump the cache version when deploying changes.

---

## Streak & Daily Goals

### Streak Freeze Tokens

Users earn 1 freeze token for every 7-day streak milestone. Tokens are consumed automatically when a day is missed (preserving the streak). The freeze token count is displayed in Settings.

### Daily XP Goal

Configurable in Settings (50/100/200/500 XP). The Today screen shows a progress bar tracking today's XP against the goal. XP is tracked per-day in `progress.practiceLog`.

---

## Deployment

GitHub Pages deployment via `.github/workflows/deploy.yml`. On push to `main`, the workflow:
1. Copies only web assets (HTML, CSS, JS, JSON, icons) to a `dist/` directory
2. Excludes Python scripts, build artifacts, and non-web files
3. Deploys `dist/` to GitHub Pages

---

## Adding Content

### New grammar lesson
Add to `GRAMMAR_DATA` in `grammar.js`. Include `id`, `title`, `titleEn`, `level`, `order`, `content` (HTML), and `quiz` (array of 5 questions with `type`, `question`, `answer`, `options`, `explanation`).

### New vocabulary
Add entries to `vocab-data.json`. If creating a new category, also add it to `VOCAB_CATEGORIES` in `vocab-categories.js`. Re-generate `vocab-data.json` by running: `node -e "..."` or updating the source and re-exporting.

### New verbs
Add to `VERB_DATA` in `verbs.js`. The conjugation engine handles regular verbs automatically. For irregular verbs, add overrides to `FULL_IRREGULARS` or `IRREGULAR_FUTURE_STEMS` in `conjugation.js`.

### New placement questions
Add to `PLACEMENT_QUESTIONS` in `placement_questions.js`. Set `difficulty` on the IRT scale (1.0–6.5) matching the question's CEFR level range.

### New culture module
Create a new `modulename.js` file following the culture item schema. Add the `<script>` tag to `index.html` (before the app modules), add it to the `DATA_FILES` set in `sw.js`, and register it in the `CULTURE_MODULES` object in `app-learn.js`.
