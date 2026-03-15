# Leccion Diaria — Architecture & Developer Guide

A Progressive Web App for learning Spanish (A1–C2) using spaced repetition, adaptive testing, and gamification. Built with vanilla HTML/CSS/JS — no frameworks, no build tools, no backend.

---

## File Overview

| File | Purpose |
|------|---------|
| **App modules** | |
| `index.html` | 30+ screens, nav bar, tab bar, modal system |
| `app-init.js` | Startup, profile loading, event delegation, routing |
| `app-core.js` | Progress state, FSRS helpers, shared computation (recall, mastery, CEFR) |
| `app-learn.js` | Vocab, verb, and grammar learning interfaces |
| `app-practice.js` | Stats dashboard, quizzes, verb reference, curriculum display |
| `quiz-engine.js` | Shared quiz rendering and answer-checking pipeline |
| `conjugation.js` | Verb conjugation engine: 19 tenses, 252 verbs, irregular/stem-change handling |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm (17 parameters) |
| `styles.css` | Dark/light themes, 4 color palettes, responsive mobile-first layout |
| `sw.js` | Service worker: cache-first offline strategy |
| `manifest.json` | PWA metadata |
| **Data files** | |
| `verbs.js` | 252 verbs with type, group, stem change, level, frequency |
| `vocab.js` | ~28K words across 45+ categories with gender, examples, level |
| `grammar.js` | 67 grammar lessons (A1–C2) with HTML content and quiz questions |
| `phrases.js` | 260+ phrases across 21 situations with formality and reply |
| `conversations.js` | 21 role-play dialogue scenarios with vocab and quiz |
| `freq_vocab.js` | Top 30k Spanish words by frequency (auto-generated) |
| `placement_questions.js` | 120 hand-crafted IRT-calibrated placement questions (A1–C2) |
| `curriculum_tracks.js` | Guided curriculum tracks with leveled lesson sequences |
| `reading.js` `reading_sat.js` | Reading comprehension passages |
| `cloze_passages.js` `dictation.js` | Cloze and dictation exercises |
| `sentence_construction.js` `translation_drills.js` | Writing practice exercises |
| `minimal_pairs.js` `homophones.js` `phonetic_pairs.js` | Pronunciation exercises |
| `connectors.js` `themed_vocab.js` `jokes.js` | Additional content modules |
| `recipes.js` `music.js` `movies.js` `poetry.js` `sports.js` `proverbs.js` `folktales.js` `festivals.js` `history.js` `travel.js` `trivia.js` `idioms.js` | Cultural content modules with descriptions, vocab, and quizzes |
| **Utilities** | |
| `generate_vocab.py` | Generates `freq_vocab.js` from the `wordfreq` Python library |
| `serve.sh` | Local development server (Python 3) |

---

## Architecture

```
User (browser)
  │
  ▼
app-init.js ─── Event delegation (single click listener on document)
  │
  ├── app-core.js ──── Navigation: showScreen(id) / goBack() / switchTab(tab)
  │                     Progress state, FSRS helpers, recall/mastery computation
  │                     Settings, persistence (localStorage per profile)
  │                     Placement test: IRT adaptive (Rasch model), Newton-Raphson MLE
  │
  ├── app-learn.js ─── Vocab browser, flashcard learning, verb/grammar interfaces
  │                     Learn New Words (lowest-probability flashcards)
  │                     Tense mastery display, grammar level summaries
  │
  ├── app-practice.js ─ Stats dashboard, recall health, CEFR curriculum
  │                      Quiz modules, verb reference with conjugation tables
  │                      Cultural content rendering
  │
  └── quiz-engine.js ── Shared quiz pipeline: render → answer → check → rate → FSRS update
```

### State Management

- **`progress`** — the main user state object, saved to `localStorage['ld_progress_' + profileName]`
- **`screenStack`** — array tracking navigation history for back button
- **`currentProfile`** — active profile name
- **Placement state** — `placementThetas`, `placementHistory`, etc. (session-scoped, saved to `sessionStorage` for tab-switch recovery)

All state is defined in `app-core.js` and accessible globally. The app modules (`app-learn.js`, `app-practice.js`) read and write this shared state.

### Navigation

All screens are `<div>` elements in `index.html` with `display:none` by default. `showScreen(id)` hides the current screen and shows the target. The tab bar has 8 main tabs; Culture and Explore have dropdown submenus.

### Event Handling

A single delegated click handler on `document` routes all `data-action` attributes to handler functions. Keyboard events handle Enter (submit/advance) and 1–4 (flashcard ratings).

---

## Data Schemas

### Verb (`verbs.js`)
```javascript
{ infinitive: 'hablar', english: 'to speak', type: 'regular',
  group: 'ar', stemChange: null, level: 'A1', frequency: 1 }
```
Types: `regular`, `irregular`, `stem-changing`, `reflexive`

### Vocabulary (`vocab.js`)
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

### Frequency Vocabulary (`freq_vocab.js`)
```javascript
{ w: 'de', r: 1, z: 7.81, l: 'A1' }
// w=word, r=rank, z=zipf frequency, l=CEFR level
```
30,000 entries. Level assigned by rank: A1 (1–500), A2 (501–1500), B1 (1501–4000), B2 (4001–8000), C1 (8001–15000), C2 (15001–30000).

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
  lastDate: null,          // 'YYYY-MM-DD'
  freezeTokens: 0,

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
    theme: 'dark',         // dark | light
    palette: 'alhambra',   // alhambra | oaxaca | patagonia | flamenco
    accents: 'warn',       // strict | warn | lenient
    ttsRate: 1,            // 0.7 | 1 | 1.3
  },
}
```

**Mastery levels**: 1 = learning, 2 = familiar, 3 = intermediate, 4 = mastered. Derived from FSRS stability via `masteryFromFsrs(s)`.

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

## Placement Test — IRT Adaptive Algorithm

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

CSS custom properties drive the theme system. Four color palettes (Alhambra, Oaxaca, Patagonia, Flamenco) and two themes (dark, light) are applied by setting CSS variables on `<body>`.

Mobile-first responsive design with max-width 640px centered container. Safe-area insets for notched phones.

Key CSS ordering note: `.quiz-option.correct` and `.quiz-option.incorrect` must appear **after** `.quiz-option.selected` in the stylesheet to ensure answer highlighting overrides selection styling.

---

## Service Worker (`sw.js`)

Cache name: `leccion-diaria-v15`. Strategy: cache-first with background network update.

All static assets are pre-cached on install. On fetch, the cached version is served immediately while a network fetch runs in the background to update the cache. Bump the cache version when deploying changes.

---

## Generating Frequency Vocabulary

```bash
pip install wordfreq
python3 generate_vocab.py
```

Produces `freq_vocab.js` with 30,000 entries. Filters English stopwords, non-alphabetic entries, and single characters. Assigns CEFR levels by frequency rank.

---

## Adding Content

### New grammar lesson
Add to `GRAMMAR_DATA` in `grammar.js`. Include `id`, `title`, `titleEn`, `level`, `order`, `content` (HTML), and `quiz` (array of 5 questions with `type`, `question`, `answer`, `options`, `explanation`).

### New vocabulary
Add to `VOCAB_DATA` in `vocab.js`. If creating a new category, also add it to `VOCAB_CATEGORIES`.

### New verbs
Add to `VERB_DATA` in `verbs.js`. The conjugation engine handles regular verbs automatically. For irregular verbs, add overrides to `FULL_IRREGULARS` or `IRREGULAR_FUTURE_STEMS` in `conjugation.js`.

### New placement questions
Add to `PLACEMENT_QUESTIONS` in `placement_questions.js`. Set `difficulty` on the IRT scale (1.0–6.5) matching the question's CEFR level range.

### New culture module
Create a new `modulename.js` file following the culture item schema. Add the `<script>` tag to `index.html` (before the app modules), add it to the `ASSETS` array in `sw.js`, and register it in the culture module list in `app-practice.js`.
