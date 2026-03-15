'use strict';

// ════════════════════════════════════════════════════════════════
//  quiz-engine.js — Generic reusable quiz engine for MC quizzes
// ════════════════════════════════════════════════════════════════

// ── Haptic feedback helper ────────────────────────────────────
// Vibration durations in milliseconds
var HAPTIC_CORRECT = [30];          // single short pulse
var HAPTIC_INCORRECT = [40, 30, 40]; // double pulse with gap

function _haptic(correct) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(correct ? HAPTIC_CORRECT : HAPTIC_INCORRECT);
  }
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
  var queue = [];
  var idx = 0;
  var score = 0;

  var submitBtnClass = config.submitBtnClass || 'mc-submit';

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
    var q = queue[idx];

    if (config.progressId) {
      var progEl = document.getElementById(config.progressId);
      if (progEl) progEl.textContent = (idx + 1) + ' / ' + queue.length;
    }

    var nextBtn = document.getElementById(config.nextBtnId);
    if (nextBtn) nextBtn.style.display = 'none';

    var container = document.getElementById(config.containerId);
    if (container && config.renderQuestion) {
      container.innerHTML = config.renderQuestion(q, idx, queue.length);
    }
  }

  function selectOption(optIdx) {
    var selector = '#' + config.containerId;
    var btns = document.querySelectorAll(selector + ' .quiz-option');
    if (btns[0] && btns[0].classList.contains('disabled')) return;
    btns.forEach(function (btn) { btn.classList.remove('selected'); });
    if (btns[optIdx]) btns[optIdx].classList.add('selected');

    if (config.autoSubmit) {
      // Auto-submit immediately on tap — skip the Submit button
      submit();
    } else {
      var submitBtn = document.querySelector(selector + ' .' + submitBtnClass);
      if (submitBtn) submitBtn.style.display = 'block';
    }
  }

  function submit() {
    var containerSel = '#' + config.containerId;
    var selectedBtn = document.querySelector(containerSel + ' .quiz-option.selected');
    if (!selectedBtn) return;

    var selectedIdx = parseInt(selectedBtn.dataset.idx, 10);
    var q = queue[idx];

    var correctIdx;
    if (config.getCorrectIdx) {
      correctIdx = config.getCorrectIdx(q);
    } else if (config.getCorrectValue) {
      var correctVal = config.getCorrectValue(q);
      var allBtns = document.querySelectorAll(containerSel + ' .quiz-option');
      allBtns.forEach(function (btn, i) {
        if (btn.textContent.trim() === correctVal || btn.dataset.val === correctVal) {
          correctIdx = i;
        }
      });
    }

    var isCorrect = selectedIdx === correctIdx;
    _haptic(isCorrect);

    var btns = document.querySelectorAll(containerSel + ' .quiz-option');
    btns.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (i === correctIdx) btn.classList.add('correct');
      if (i === selectedIdx && !isCorrect) btn.classList.add('incorrect');
    });

    var sBtnEl = document.querySelector(containerSel + ' .' + submitBtnClass);
    if (sBtnEl) sBtnEl.style.display = 'none';

    if (isCorrect) {
      score++;
      if (config.onCorrect) config.onCorrect(q, selectedIdx);
    } else {
      if (config.onIncorrect) config.onIncorrect(q, selectedIdx);
    }

    var explanation = config.getExplanation ? config.getExplanation(q) : null;
    if (explanation) {
      var expDiv = document.createElement('div');
      expDiv.className = 'quiz-feedback text-muted';
      expDiv.style.fontSize = '0.85rem';
      expDiv.textContent = explanation;
      var cont = document.getElementById(config.containerId);
      if (cont) cont.appendChild(expDiv);
    }

    var nextBtn = document.getElementById(config.nextBtnId);
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
  var selectedBtn = document.querySelector(opts.optionsSel.replace(' .quiz-option', ' .quiz-option.selected'));
  if (!selectedBtn) return false;

  var isCorrect = opts.isCorrectBtn(selectedBtn);
  _haptic(isCorrect);

  var btns = document.querySelectorAll(opts.optionsSel);
  btns.forEach(function (btn) {
    btn.classList.add('disabled');
    if (opts.isCorrectBtn(btn)) btn.classList.add('correct');
    else if (btn.classList.contains('selected')) btn.classList.add('incorrect');
  });

  if (opts.feedbackFn) {
    var fb = document.getElementById(opts.feedbackId);
    if (fb) {
      fb.innerHTML = opts.feedbackFn(isCorrect);
      fb.style.display = 'block';
    }
  }
  var nextBtn = document.getElementById(opts.nextBtnId);
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
  var chars = ['\u00e1', '\u00e9', '\u00ed', '\u00f3', '\u00fa', '\u00f1'];   // á é í ó ú ñ
  var inputAttr = inputId ? ' data-input-id="' + inputId + '"' : '';
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
  var pct = total > 0 ? (current / total * 100) : 0;
  var idAttr = fillId ? ' id="' + fillId + '"' : '';
  return '<div class="quiz-progress-fill"' + idAttr +
    ' role="progressbar" aria-valuenow="' + Math.round(pct) +
    '" aria-valuemin="0" aria-valuemax="100" style="width:' + pct + '%"></div>';
}
