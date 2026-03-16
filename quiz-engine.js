'use strict';

// ════════════════════════════════════════════════════════════════
//  quiz-engine.js — Generic reusable quiz engine for MC quizzes
// ════════════════════════════════════════════════════════════════

// ── Haptic feedback helper ────────────────────────────────────
// Vibration durations in milliseconds
const HAPTIC_CORRECT = [30];          // single short pulse
const HAPTIC_INCORRECT = [40, 30, 40]; // double pulse with gap

function _haptic(correct) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(correct ? HAPTIC_CORRECT : HAPTIC_INCORRECT);
  }
}

/**
 * Partially shuffle an array using Fisher-Yates, returning only the first n elements.
 * O(n) instead of O(N) for shuffle(arr).slice(0, n).
 *
 * @param {Array} arr - Source array (not mutated)
 * @param {number} n  - Number of random elements to return
 * @returns {Array} A new array of up to n randomly-selected elements
 */
function partialShuffle(arr, n) {
  const a = arr.slice();
  const len = a.length;
  const count = Math.min(n, len);
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (len - i));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a.slice(0, count);
}

/**
 * Creates a managed MC quiz flow.
 *
 * @param {Object} config
 * @param {string}   config.containerId    - ID of the quiz container element
 * @param {string}   config.nextBtnId      - ID of the next button
 * @param {string}   [config.progressId]   - ID of the progress text element (optional)
 * @param {string}   [config.submitBtnClass='mc-submit'] - CSS class for the submit button
 * @param {boolean}  [config.autoSubmit=false] - Auto-submit on option tap (skip Submit button)
 * @param {Function} [config.getCorrectIdx]   - (question) => index of correct option
 * @param {Function} [config.getCorrectValue] - (question) => correct value string (text comparison fallback)
 * @param {Function} [config.onCorrect]    - (question, selectedIdx) => called on correct answer
 * @param {Function} [config.onIncorrect]  - (question, selectedIdx) => called on incorrect answer
 * @param {Function} [config.onComplete]   - (score, total) => called when all questions are done
 * @param {Function} [config.renderQuestion] - (question, idx, total) => HTML string for the question
 * @param {Function} [config.getExplanation]  - (question) => explanation string or null
 * @returns {{ start, render, selectOption, submit, next, getState }}
 */
function createQuizFlow(config) {
  let queue = [];
  let idx = 0;
  let score = 0;

  const submitBtnClass = config.submitBtnClass || 'mc-submit';

  // ── public API ────────────────────────────────────────────────

  function start(items) {
    queue = items;
    idx = 0;
    score = 0;
    render();
  }

  function render() {
    if (idx >= queue.length) {
      if (config.onComplete) config.onComplete(score, queue.length);
      return;
    }
    const q = queue[idx];

    if (config.progressId) {
      const progEl = document.getElementById(config.progressId);
      if (progEl) progEl.textContent = (idx + 1) + ' / ' + queue.length;
    }

    const nextBtn = document.getElementById(config.nextBtnId);
    if (nextBtn) nextBtn.style.display = 'none';

    const container = document.getElementById(config.containerId);
    if (container && config.renderQuestion) {
      container.innerHTML = config.renderQuestion(q, idx, queue.length);
    }
  }

  function selectOption(optIdx) {
    const selector = '#' + config.containerId;
    const btns = document.querySelectorAll(selector + ' .quiz-option');
    if (btns[0] && btns[0].classList.contains('disabled')) return;
    btns.forEach(function (btn) { btn.classList.remove('selected'); });
    if (btns[optIdx]) btns[optIdx].classList.add('selected');

    if (config.autoSubmit) {
      // Auto-submit immediately on tap — skip the Submit button
      submit();
    } else {
      const submitBtn = document.querySelector(selector + ' .' + submitBtnClass);
      if (submitBtn) submitBtn.style.display = 'block';
    }
  }

  function submit() {
    const containerSel = '#' + config.containerId;
    const selectedBtn = document.querySelector(containerSel + ' .quiz-option.selected');
    if (!selectedBtn) return;

    const selectedIdx = parseInt(selectedBtn.dataset.idx, 10);
    const q = queue[idx];

    let correctIdx = -1;
    if (config.getCorrectIdx) {
      const rawIdx = config.getCorrectIdx(q);
      correctIdx = typeof rawIdx === 'number' ? rawIdx : parseInt(rawIdx, 10);
      if (isNaN(correctIdx)) correctIdx = -1;
    } else if (config.getCorrectValue) {
      const correctVal = config.getCorrectValue(q);
      const allBtns = document.querySelectorAll(containerSel + ' .quiz-option');
      allBtns.forEach(function (btn, i) {
        if (btn.textContent.trim() === correctVal || btn.dataset.val === correctVal) {
          correctIdx = i;
        }
      });
    }

    // If no correct answer could be determined, skip grading this question
    if (correctIdx === -1) {
      const nextBtn = document.getElementById(config.nextBtnId);
      if (nextBtn) nextBtn.style.display = 'flex';
      return;
    }

    const isCorrect = selectedIdx === correctIdx;
    _haptic(isCorrect);

    const btns = document.querySelectorAll(containerSel + ' .quiz-option');
    btns.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (btn.setAttribute) btn.setAttribute('aria-disabled', 'true');
      if (i === correctIdx) btn.classList.add('correct');
      if (i === selectedIdx && !isCorrect) btn.classList.add('incorrect');
    });

    const sBtnEl = document.querySelector(containerSel + ' .' + submitBtnClass);
    if (sBtnEl) sBtnEl.style.display = 'none';

    if (isCorrect) {
      score++;
      if (config.onCorrect) config.onCorrect(q, selectedIdx);
    } else {
      if (config.onIncorrect) config.onIncorrect(q, selectedIdx);
    }

    const explanation = config.getExplanation ? config.getExplanation(q) : null;
    if (explanation) {
      const expDiv = document.createElement('div');
      expDiv.className = 'quiz-feedback text-muted';
      expDiv.style.fontSize = '0.85rem';
      expDiv.textContent = explanation;
      const cont = document.getElementById(config.containerId);
      if (cont) cont.appendChild(expDiv);
    }

    const nextBtn = document.getElementById(config.nextBtnId);
    if (nextBtn) nextBtn.style.display = 'flex';
  }

  function next() {
    idx++;
    render();
  }

  function getState() {
    return { queue: queue, idx: idx, score: score, total: queue.length };
  }

  return { start: start, render: render, selectOption: selectOption, submit: submit, next: next, getState: getState };
}


// ════════════════════════════════════════════════════════════════
//  Shared MC submit helper — reduces boilerplate across all quiz types
// ════════════════════════════════════════════════════════════════

/**
 * Process an MC answer submission: disable buttons, mark correct/incorrect,
 * update score/XP, show feedback, show next button, run FSRS review.
 *
 * @param {Object} opts
 * @param {string}   opts.optionsSel     - CSS selector for option buttons (e.g. '#mp-options .quiz-option')
 * @param {Function} opts.isCorrectBtn   - (btn) => boolean — whether this btn is the correct answer
 * @param {string}   opts.feedbackId     - ID of the feedback element
 * @param {string}   opts.nextBtnId      - ID of the next button
 * @param {Function} opts.feedbackFn     - (isCorrect) => HTML string for the feedback div
 * @param {Object}   [opts.fsrs]         - { store, masteryStore, key } for FSRS review (auto-rates GOOD/AGAIN)
 * @returns {boolean} whether the selected answer was correct
 */
function processMCSubmit(opts) {
  const selectedBtn = document.querySelector(opts.optionsSel.replace(' .quiz-option', ' .quiz-option.selected'));
  if (!selectedBtn) return false;

  const isCorrect = opts.isCorrectBtn(selectedBtn);
  _haptic(isCorrect);

  const btns = document.querySelectorAll(opts.optionsSel);
  btns.forEach(function (btn) {
    btn.classList.add('disabled');
    if (btn.setAttribute) btn.setAttribute('aria-disabled', 'true');
    if (opts.isCorrectBtn(btn)) btn.classList.add('correct');
    else if (btn.classList.contains('selected')) btn.classList.add('incorrect');
  });

  if (opts.feedbackFn) {
    const fb = document.getElementById(opts.feedbackId);
    if (fb) {
      fb.innerHTML = opts.feedbackFn(isCorrect);
      fb.style.display = 'block';
    }
  }
  const nextBtn = document.getElementById(opts.nextBtnId);
  if (nextBtn) nextBtn.style.display = 'flex';

  if (opts.fsrs) {
    reviewItem(opts.fsrs.store, opts.fsrs.masteryStore, opts.fsrs.key, isCorrect ? FSRS_GOOD : FSRS_AGAIN);
    saveProgress();
  }

  return isCorrect;
}

// ════════════════════════════════════════════════════════════════
//  Shared HTML helpers
// ════════════════════════════════════════════════════════════════

/**
 * Generate accent button bar HTML.
 */
function accentBarHTML(action, inputId) {
  const chars = ['\u00e1', '\u00e9', '\u00ed', '\u00f3', '\u00fa', '\u00f1'];   // á é í ó ú ñ
  const inputAttr = inputId ? ' data-input-id="' + inputId + '"' : '';
  return '<div class="accent-bar">\n' +
    chars.map(function (c) {
      return '    <button class="accent-btn" data-action="' + action +
        '" data-char="' + c + '"' + inputAttr +
        ' aria-label="Insert ' + c + '">' + c + '</button>';
    }).join('\n') +
    '\n  </div>';
}

/**
 * Generate a progress-bar fill element.
 */
function progressBarHTML(current, total, fillId) {
  const pct = total > 0 ? (current / total * 100) : 0;
  const idAttr = fillId ? ' id="' + fillId + '"' : '';
  return '<div class="quiz-progress-fill"' + idAttr +
    ' role="progressbar" aria-valuenow="' + Math.round(pct) +
    '" aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress" style="width:' + pct + '%"></div>';
}

/**
 * Generate the common MC quiz question HTML: question + option buttons + submit button.
 *
 * @param {Object} cfg
 * @param {string}   cfg.question      - Inner HTML for the question div
 * @param {string[]} cfg.options       - Array of option label strings (will be escaped)
 * @param {string}   cfg.answerAction  - data-action for option buttons (e.g. 'answer-verb-quiz')
 * @param {string}   cfg.submitAction  - data-action for submit button (e.g. 'submit-verb-quiz-mc')
 * @param {string}   [cfg.submitLabel] - Label for the submit button (default: tBtn('submit'))
 * @returns {string} HTML string
 */
function renderMCQuestionHTML(cfg) {
  const submitLabel = cfg.submitLabel || tBtn('submit');
  return '<div class="quiz-question">' + cfg.question + '</div>\n' +
    '<div class="quiz-options">\n' +
    cfg.options.map(function (opt, i) {
      return '  <button class="quiz-option" data-action="' + cfg.answerAction +
        '" data-idx="' + i + '">' + esc(opt) + '</button>';
    }).join('\n') +
    '\n</div>\n' +
    '<button class="btn btn-primary btn-block mt-1 mc-submit" data-action="' +
    cfg.submitAction + '" style="display:none">' + submitLabel + '</button>';
}

/**
 * Generate the common FIB (fill-in-blank / production) quiz question HTML:
 * question + input row + accent bar + feedback div.
 *
 * @param {Object} cfg
 * @param {string}   cfg.question         - Inner HTML for the question div
 * @param {string}   cfg.inputId          - ID for the text input
 * @param {string}   cfg.inputPlaceholder - Placeholder text
 * @param {string}   cfg.submitAction     - data-action for the check button
 * @param {string}   cfg.accentAction     - data-action for accent bar buttons
 * @param {string}   cfg.feedbackId       - ID for the feedback div
 * @param {string}   [cfg.submitLabel]    - Label for the check button (default: tBtn('check'))
 * @param {string}   [cfg.inputValue]     - Pre-filled value for the input
 * @param {string}   [cfg.preInputHTML]   - Extra HTML before the input row (e.g. error sentence div)
 * @returns {string} HTML string
 */
function renderFIBQuestionHTML(cfg) {
  const submitLabel = cfg.submitLabel || tBtn('check');
  const valueAttr = cfg.inputValue ? ' value="' + esc(cfg.inputValue) + '"' : '';
  return '<div class="quiz-question">' + cfg.question + '</div>\n' +
    (cfg.preInputHTML || '') +
    '<div class="quiz-input-row">\n' +
    '  <input type="text" id="' + cfg.inputId + '" placeholder="' + cfg.inputPlaceholder +
    '" autocomplete="off" autocapitalize="off"' + valueAttr + '>\n' +
    '  <button class="btn btn-primary" data-action="' + cfg.submitAction + '">' + submitLabel + '</button>\n' +
    '</div>\n' +
    accentBarHTML(cfg.accentAction, cfg.inputId) + '\n' +
    '<div class="quiz-feedback" id="' + cfg.feedbackId + '" style="display:none"></div>';
}
