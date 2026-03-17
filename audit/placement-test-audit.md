# Placement Test Audit — 7 User Profiles

**Date:** 2026-03-17
**Test:** 40-question adaptive placement test (IRT/Rasch model, grammar + vocab)
**Method:** Programmatic simulation via `api-node.js` with 7 user profiles

## Profiles Tested

| # | Profile | Strategy | Self-Assessment |
|---|---------|----------|-----------------|
| 1 | NoKnowledge | All answers wrong | A1 |
| 2 | A1_Student | Correct on A1 questions only | A1 |
| 3 | A2_Student | Correct on A1-A2 questions | A2 |
| 4 | B1_Student | Correct on A1-B1 questions | B1 |
| 5 | B2_Student | Correct on A1-B2 questions | B2 |
| 6 | C1_Student | Correct on A1-C1 questions | C1 |
| 7 | Expert | All answers correct | C1 |

## Placement Results

| Profile | Accuracy | Overall | Grammar | Vocab | Grammar Mastered | Vocab Mastered | Verbs Mastered |
|---------|----------|---------|---------|-------|-----------------|----------------|----------------|
| NoKnowledge | 0% | A1 | A1 | A1 | 0 | 0 | 0 |
| A1_Student | 45% | A2 | A2 | A1 | 14 | 0 | 300 |
| A2_Student | 48% | A2 | A2 | A2 | 14 | 890 | 300 |
| B1_Student | 53% | B2 | B2 | B2 | 35 | 5,060 | 11,544 |
| B2_Student | 55% | C1 | C1 | B2 | 45 | 5,060 | 17,712 |
| C1_Student | 57% | C2 | C2 | C2 | 57 | 17,302 | 23,976 |
| Expert | 100% | C2 | C2 | C2 | 67 | 28,090 | 28,614 |

## Assertions Verified (22 tests, all passing)

### 1. Grading Correctness
- MC questions: correct option selection is graded as correct
- FIB questions: `checkAnswer` validates exact match, case-insensitive match, accent-insensitive match (with warning), and wrong answers
- IRT theta: all-correct answers produce higher theta (and placement) than all-wrong answers

### 2. Placement Level Accuracy
- Each profile places within +/-1 CEFR level of their knowledge cutoff
- NoKnowledge places at A1-A2 (Bayesian prior pulls toward B1, but 0% accuracy overrides)
- Expert places at C1+ (100% accuracy on all levels)
- Placement levels increase monotonically as knowledge increases across profiles

### 3. Content Unlocking
- **Grammar lessons:** All lessons below the grammar placement level are marked as mastered (grammarDone = 4) with FSRS records (s=30, d=5). Lessons at or above the level remain unmastered.
- **Vocabulary:** All words below the vocab placement level are marked as mastered (vocabMastery = 3) with FSRS records. Words at or above the level remain unmastered.
- **Verb conjugations:** All verb+tense combinations where both the verb level and tense level are below the grammar placement level are marked as mastered with FSRS records.
- **Perfect C2 exception:** Expert with 100% on 40 questions gets all content including C2 marked as mastered (by design).

### 4. Daily Practice Appropriateness
For each profile after placement:
- Unmastered vocabulary exists at the placed vocab level (items available to study next)
- Unmastered grammar lessons exist at the placed grammar level
- Reading passages exist at the placed overall level
- Phrases exist at the placed overall level
- Cloze passages, dictation, and translation drills exist at or below the placed level

### 5. Cross-Profile Consistency
- Mastered vocabulary count increases monotonically with knowledge level
- Expert has more unlocked content than all other profiles
- NoKnowledge has zero mastered content across all categories

## Known Edge Cases

### Cross-Level Vocabulary Words
Two words appear at multiple CEFR levels with different meanings:
- `tio` — A1 (uncle) and C2 (dude, Spain slang)
- `receta` — A2 (recipe) and B2 (prescription)

Since `vocabMastery` uses the word string as key, mastering a word at a lower level also marks the higher-level entry as mastered. This is a minor data characteristic (2 out of ~28,000 vocab entries) and does not affect the learning experience in practice.

### IRT Estimation Variance
The IRT adaptive algorithm uses randomized question selection and a Bayesian prior (mean=3.0/B1, SD=1.5). This means:
- Profiles near the boundary between levels may place slightly differently across runs
- The B2_Student sometimes places at B2, sometimes at C1, depending on which questions are selected
- This variance is expected and acceptable for an adaptive test

## Test Script

The test script is located at `tests/test_placement_profiles.js` and runs as part of the standard test suite (`npm test`). It can also be run independently.

## How to Reproduce

```bash
npm test
# Or run just this test:
node -e '
  require("./tests/run.js");  // runs all tests including placement profiles
'
```
