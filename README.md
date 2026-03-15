# Leccion Diaria

A comprehensive Spanish learning app covering A1 through C2 proficiency levels. Built as a Progressive Web App with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Uses esbuild for production minification and cache-busting. All progress is stored locally in the browser.

## Features

- **Adaptive Placement Test** — IRT-based (Rasch model) assessment that determines your grammar and vocabulary levels independently, so practice starts at the right difficulty
- **Spaced Repetition** — FSRS-4.5 algorithm schedules reviews at optimal intervals for long-term retention across all content types
- **Verb Conjugation** — 252 verbs across 19 tenses (simple, compound, progressive) with a full conjugation engine handling irregulars, stem changes, and spelling rules
- **Vocabulary** — 28,000+ words across 55+ categories with translations, example sentences, and CEFR levels; searchable browser with progress indicators
- **Grammar** — 67 lessons from A1 to C2 with interactive quizzes and searchable lesson browser
- **Phrases & Conversations** — 260+ phrases across 21 situations with mastery tracking, plus role-play dialogues
- **Pronunciation** — Minimal pairs, homophones, phonetic exercises, and text-to-speech with regional voice selection (Latin American / Castilian)
- **Reading & Listening** — Cloze passages, dictation, SAT-style reading comprehension, translation drills, and sentence construction
- **Culture** — Modules on recipes, music, movies, poetry, sports, proverbs, folktales, festivals, history, travel, trivia, and idioms
- **CEFR Curriculum** — Comprehensive view of what you need to learn at each level with mastery tracking across vocabulary, verbs, and grammar
- **Progress Tracking** — Daily XP goals with progress bar, streaks with freeze token protection, mastery levels, recall probability display, SRS card state distribution, tense/grammar mastery breakdowns, and per-level CEFR mastery percentages
- **Bookmarks** — Star any vocab word, grammar lesson, or phrase for quick access from the Today screen
- **Onboarding** — 4-step welcome carousel for new users explaining SRS, goals, and navigation
- **Offline Support** — Service worker caches app shell on install, data files on first use
- **Customization** — Dark/light/auto themes, 4 color palettes, Latin American/Spain regional variants, display modes (standard/immersion/hints), adjustable TTS speed, configurable daily goals
- **Performance** — Progressive vocab loading (A1-A2 first at 494KB, rest in background), Web Worker for search, esbuild minification with content-hash cache-busting

## Running Locally

The app is a static site — just serve the source files directly for development:

```bash
git clone https://github.com/robirahman/leccion-diaria.git
cd leccion-diaria
./serve.sh
```

This starts a local server at `http://localhost:8000` using Python 3's built-in HTTP server. No build step is needed for development.

### Production Build

To create a minified, cache-busted build:

```bash
npm install
npm test       # 49 unit tests
npm run build  # outputs to dist/
```

The build produces a `dist/` directory with content-hashed filenames, minified JS/CSS, and an auto-generated service worker. This is what gets deployed to GitHub Pages.

### Alternative Dev Servers

```bash
# Node.js
npx serve .

# PHP
php -S localhost:8000

# Custom port
./serve.sh 3000
```

## Project Structure

| File | Purpose |
|------|---------|
| **App modules** | |
| `index.html` | All screens, navigation, modal system |
| `app-init.js` | Startup, event delegation, routing, search handlers |
| `app-core.js` | Progress state, FSRS helpers, settings, TTS |
| `app-learn.js` | Today screen, verbs, grammar, phrases, culture, results |
| `learn-vocab.js` | Vocabulary indexes, browser, flashcards, quiz |
| `placement.js` | IRT-adaptive placement test |
| `app-practice.js` | Practice exercises, stats dashboard, review queue |
| `practice-reference.js` | Verb reference, reading, pronunciation, curriculum |
| `quiz-engine.js` | Shared quiz rendering, auto-submit, haptic feedback |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm |
| `conjugation.js` | Verb conjugation engine (19 tenses, irregulars) |
| `vocab-search-worker.js` | Web Worker for non-blocking vocab search |
| `styles.css` | Dark/light/auto themes, 4 palettes, responsive layout |
| `sw.js` | Service worker for offline caching |
| **Build & Test** | |
| `build.js` | esbuild-based build: minification, cache-busting, dist/ |
| `package.json` | Node.js project config |
| `tests/` | Unit tests for conjugation, FSRS, core utils, vocab data |
| **Data files** | |
| `vocab-a1a2.json` | A1+A2 vocab (~2K words, loaded first for fast startup) |
| `vocab-b1.json` ... `vocab-c2.json` | B1–C2 vocab (loaded progressively) |
| `vocab-data.json` | ~28K words (monolithic fallback) |
| `vocab-categories.js` | 55+ vocabulary category definitions |
| `verbs.js` | 252 verbs with type, group, level, frequency |
| `grammar.js` | 67 grammar lessons (A1–C2) with quizzes |
| `phrases.js` | 260+ phrases across 21 situations |
| `conversations.js` | 21 role-play dialogue scenarios |
| `placement_questions.js` | 120 IRT-calibrated placement questions |
| `curriculum_tracks.js` | Guided curriculum tracks |
| `reading.js` `reading_sat.js` | Reading comprehension passages |
| `cloze_passages.js` `dictation.js` | Cloze and dictation exercises |
| `sentence_construction.js` `translation_drills.js` | Writing practice |
| `minimal_pairs.js` `homophones.js` `phonetic_pairs.js` | Pronunciation exercises |
| `connectors.js` `themed_vocab.js` `jokes.js` | Additional content |
| `recipes.js` `music.js` `movies.js` ... | Cultural content modules |

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed technical documentation including data schemas, algorithms, and how to add content.

## License

All rights reserved.
