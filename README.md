# Leccion Diaria

A comprehensive Spanish learning app covering A1 through C2 proficiency levels. Built as a Progressive Web App with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no backend. All progress is stored locally in the browser.

## Features

- **Adaptive Placement Test** — IRT-based (Rasch model) assessment that determines your grammar and vocabulary levels independently, so practice starts at the right difficulty
- **Spaced Repetition** — FSRS-4.5 algorithm schedules reviews at optimal intervals for long-term retention across all content types
- **Verb Conjugation** — 252 verbs across 19 tenses (simple, compound, progressive) with a full conjugation engine handling irregulars, stem changes, and spelling rules
- **Vocabulary** — 28,000+ words across 45+ categories with translations, example sentences, and CEFR levels
- **Grammar** — 67 lessons from A1 to C2 with interactive quizzes
- **Phrases & Conversations** — 260+ phrases across 21 situations, plus role-play dialogues
- **Pronunciation** — Minimal pairs, homophones, phonetic exercises, and text-to-speech
- **Reading & Listening** — Cloze passages, dictation, SAT-style reading comprehension, translation drills, and sentence construction
- **Culture** — Modules on recipes, music, movies, poetry, sports, proverbs, folktales, festivals, history, travel, trivia, and idioms
- **CEFR Curriculum** — Comprehensive view of what you need to learn at each level with mastery tracking across vocabulary, verbs, and grammar
- **Progress Tracking** — XP, streaks, mastery levels, recall probability display, tense/grammar mastery breakdowns, and per-level CEFR mastery percentages
- **Offline Support** — Service worker caches all assets for fully offline use
- **Customization** — Dark/light themes, 4 color palettes, Latin American/Spain regional variants, display modes (standard/immersion/hints), adjustable TTS speed

## Running Locally

The app is a static site — just serve the files over HTTP. The easiest way is with the included script:

```bash
git clone https://github.com/robirahman/leccion-diaria.git
cd leccion-diaria
./serve.sh
```

This starts a local server at `http://localhost:8000` using Python 3's built-in HTTP server. Pass a custom port as an argument if needed:

```bash
./serve.sh 3000
```

**Requirements:** Python 3 (pre-installed on macOS and most Linux distributions).

Alternatively, use any static file server:

```bash
# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Project Structure

| File | Purpose |
|------|---------|
| `index.html` | All screens, navigation, modal system |
| `app-init.js` | Startup, event delegation, routing |
| `app-core.js` | Progress state, FSRS helpers, shared computation |
| `app-learn.js` | Vocab, verb, and grammar learning interfaces |
| `app-practice.js` | Stats dashboard, quizzes, verb reference, curriculum |
| `quiz-engine.js` | Shared quiz rendering and answer checking |
| `fsrs.js` | FSRS-4.5 spaced repetition algorithm |
| `conjugation.js` | Verb conjugation engine (19 tenses, irregulars) |
| `styles.css` | Dark/light themes, 4 palettes, responsive layout |
| `sw.js` | Service worker for offline caching |
| **Data files** | |
| `vocab.js` | ~28K words with translations, examples, categories |
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
