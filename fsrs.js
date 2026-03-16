// ════════════════════════════════════════
//  FSRS-4.5 SPACED REPETITION (17-parameter variant)
//  Copied from bangla-sikhuna, language-agnostic
// ════════════════════════════════════════

/** @type {Readonly<Record<number, number>>} */
const REVIEW_INTERVALS_MS = {
  0: 0,
  1: 1 * 24 * 60 * 60 * 1000,
  2: 3 * 24 * 60 * 60 * 1000,
  3: 7 * 24 * 60 * 60 * 1000,
  4: 30 * 24 * 60 * 60 * 1000,
};

/** @type {number} */
const MAX_REVIEW_VERBS = 10;
/** @type {number} */
const MAX_REVIEW_VOCAB = 10;
/** @type {number} */
const MAX_REVIEW_GRAMMAR = 3;
/** @type {number} */
const MAX_REVIEW_PHRASES = 3;

/** @type {readonly number[]} FSRS-4.5 17-parameter weight vector */
const FSRS_W = [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589, 1.533, 0.1544, 1.007, 1.9395, 0.11, 0.29, 2.27, 0.07, 2.9898];
if (FSRS_W.length !== 17) throw new Error('FSRS_W must have 17 weights');

/** @type {1} */ const FSRS_AGAIN = 1;
/** @type {2} */ const FSRS_HARD = 2;
/** @type {3} */ const FSRS_GOOD = 3;
/** @type {4} */ const FSRS_EASY = 4;

/**
 * Initial stability for a card based on first rating.
 * @param {number} rating - 1 (Again) to 4 (Easy)
 * @returns {number} Initial stability value
 */
function fsrsInitS(rating) {
  rating = Math.max(1, Math.min(4, rating));
  return FSRS_W[rating - 1];
}

/**
 * Initial difficulty for a card based on first rating.
 * @param {number} rating - 1 (Again) to 4 (Easy)
 * @returns {number} Initial difficulty (clamped 1-10)
 */
function fsrsInitD(rating) {
  rating = Math.max(1, Math.min(4, rating));
  return Math.max(1, Math.min(10, FSRS_W[4] - Math.exp(FSRS_W[5] * (rating - 1)) + 1));
}

/**
 * Retrievability — probability of recall after elapsed days.
 * @param {number} s - Current stability
 * @param {number} elapsedDays - Days since last review
 * @returns {number} Probability of recall (0-1)
 */
function fsrsR(s, elapsedDays) {
  if (s <= 0) return 0;
  if (elapsedDays < 0) elapsedDays = 0;
  return Math.pow(1 + elapsedDays / (9 * s), -1);
}

/**
 * New stability after a successful recall.
 * @param {number} d - Current difficulty (1-10)
 * @param {number} s - Current stability
 * @param {number} r - Retrievability at time of review (0-1)
 * @param {number} rating - 1 (Again) to 4 (Easy)
 * @returns {number} New stability
 */
function fsrsSAfterRecall(d, s, r, rating) {
  d = Math.max(1, Math.min(10, d));
  s = Math.max(0.001, s);
  r = Math.max(0.001, Math.min(1, r));
  rating = Math.max(1, Math.min(4, rating));
  const hardPenalty = rating === FSRS_HARD ? FSRS_W[15] : 1;
  const easyBonus = rating === FSRS_EASY ? FSRS_W[16] : 1;
  return s * (Math.exp(FSRS_W[8]) * (11 - d) * Math.pow(s, -FSRS_W[9]) *
    (Math.exp(FSRS_W[10] * (1 - r)) - 1) * hardPenalty * easyBonus) + 1;
}

/**
 * New stability after forgetting (lapse).
 * @param {number} d - Current difficulty (1-10)
 * @param {number} s - Current stability
 * @param {number} r - Retrievability at time of review (0-1)
 * @returns {number} New stability (post-lapse)
 */
function fsrsSAfterForgetting(d, s, r) {
  d = Math.max(1, Math.min(10, d));
  s = Math.max(0.001, s);
  r = Math.max(0.001, Math.min(1, r));
  return FSRS_W[11] * Math.pow(d, -FSRS_W[12]) * (Math.pow(s + 1, FSRS_W[13]) - 1) *
    Math.exp(FSRS_W[14] * (1 - r));
}

/**
 * Next difficulty after a review.
 * @param {number} d - Current difficulty (1-10)
 * @param {number} rating - 1 (Again) to 4 (Easy)
 * @returns {number} Updated difficulty (clamped 1-10)
 */
function fsrsNextD(d, rating) {
  d = Math.max(1, Math.min(10, d));
  rating = Math.max(1, Math.min(4, rating));
  const d3 = fsrsInitD(FSRS_GOOD);
  const dp = d - FSRS_W[6] * (rating - 3);
  return Math.max(1, Math.min(10, FSRS_W[7] * d3 + (1 - FSRS_W[7]) * dp));
}

/**
 * Convert FSRS stability to a mastery level (1-4).
 * @param {number} s - Current stability
 * @returns {1 | 2 | 3 | 4} Mastery level
 */
function masteryFromFsrs(s) {
  if (!s || s < 0.5) return 1;
  if (s < 7) return 2;
  if (s < 21) return 3;
  return 4;
}
