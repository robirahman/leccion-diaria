// ════════════════════════════════════════
//  FSRS-4.5 SPACED REPETITION (17-parameter variant)
//  Copied from bangla-sikhuna, language-agnostic
// ════════════════════════════════════════

const REVIEW_INTERVALS_MS = {
  0: 0,
  1: 1 * 24 * 60 * 60 * 1000,
  2: 3 * 24 * 60 * 60 * 1000,
  3: 7 * 24 * 60 * 60 * 1000,
  4: 30 * 24 * 60 * 60 * 1000,
};

const MAX_REVIEW_VERBS = 10;
const MAX_REVIEW_VOCAB = 10;
const MAX_REVIEW_GRAMMAR = 3;
const MAX_REVIEW_PHRASES = 3;

const FSRS_W = [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589, 1.533, 0.1544, 1.007, 1.9395, 0.11, 0.29, 2.27, 0.07, 2.9898];
if (FSRS_W.length !== 17) throw new Error('FSRS_W must have 17 weights');

const FSRS_AGAIN = 1, FSRS_HARD = 2, FSRS_GOOD = 3, FSRS_EASY = 4;

function fsrsInitS(rating) { return FSRS_W[rating - 1]; }

function fsrsInitD(rating) {
  return Math.max(1, Math.min(10, FSRS_W[4] - Math.exp(FSRS_W[5] * (rating - 1)) + 1));
}

function fsrsR(s, elapsedDays) {
  return Math.pow(1 + elapsedDays / (9 * s), -1);
}

function fsrsSAfterRecall(d, s, r, rating) {
  const hardPenalty = rating === FSRS_HARD ? FSRS_W[15] : 1;
  const easyBonus = rating === FSRS_EASY ? FSRS_W[16] : 1;
  return s * (Math.exp(FSRS_W[8]) * (11 - d) * Math.pow(s, -FSRS_W[9]) *
    (Math.exp(FSRS_W[10] * (1 - r)) - 1) * hardPenalty * easyBonus) + 1;
}

function fsrsSAfterForgetting(d, s, r) {
  return FSRS_W[11] * Math.pow(d, -FSRS_W[12]) * (Math.pow(s + 1, FSRS_W[13]) - 1) *
    Math.exp(FSRS_W[14] * (1 - r));
}

function fsrsNextD(d, rating) {
  const d3 = fsrsInitD(FSRS_GOOD);
  const dp = d - FSRS_W[6] * (rating - 3);
  return Math.max(1, Math.min(10, FSRS_W[7] * d3 + (1 - FSRS_W[7]) * dp));
}

function masteryFromFsrs(s) {
  if (!s || s < 0.5) return 1;
  if (s < 7) return 2;
  if (s < 21) return 3;
  return 4;
}
