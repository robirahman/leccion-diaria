'use strict';

// ════════════════════════════════════════════════════════════════
//  quiz-engine.js — Generic reusable quiz engine for MC quizzes
// ════════════════════════════════════════════════════════════════

/**
 * Creates a managed MC quiz flow.
 *
 * @param {Object} config
 * @param {string}   config.containerId    - ID of the quiz container element
 * @param {string}   config.nextBtnId      - ID of the next button
 * @param {string}   [config.progressId]   - ID of the progress text element (optional)
 * @param {string}   [config.submitBtnClass='mc-submit'] - CSS class for the submit button
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

  /**
   * Begin a new quiz run with the given list of question objects.
   */
  function start(items) {
    queue = items;
    idx = 0;
    score = 0;
    render();
  }

  /**
   * Render the current question (or trigger onComplete if finished).
   */
  function render() {
    if (idx >= queue.length) {
      if (config.onComplete) config.onComplete(score, queue.length);
      return;
    }
    var q = queue[idx];

    // Update progress text
    if (config.progressId) {
      var progEl = document.getElementById(config.progressId);
      if (progEl) progEl.textContent = (idx + 1) + ' / ' + queue.length;
    }

    // Hide next button until submit
    var nextBtn = document.getElementById(config.nextBtnId);
    if (nextBtn) nextBtn.style.display = 'none';

    // Render question content into the container
    var container = document.getElementById(config.containerId);
    if (container && config.renderQuestion) {
      container.innerHTML = config.renderQuestion(q, idx, queue.length);
    }
  }

  /**
   * Mark one of the MC option buttons as selected (mirrors selectMCOption).
   */
  function selectOption(optIdx) {
    var selector = '#' + config.containerId;
    var btns = document.querySelectorAll(selector + ' .quiz-option');
    // Don't allow re-selection after submit
    if (btns[0] && btns[0].classList.contains('disabled')) return;
    btns.forEach(function (btn) { btn.classList.remove('selected'); });
    if (btns[optIdx]) btns[optIdx].classList.add('selected');
    var submitBtn = document.querySelector(selector + ' .' + submitBtnClass);
    if (submitBtn) submitBtn.style.display = 'block';
  }

  /**
   * Submit the currently-selected answer.
   * Marks buttons correct/incorrect, invokes callbacks, shows explanation
   * and reveals the next button.
   */
  function submit() {
    var containerSel = '#' + config.containerId;
    var selectedBtn = document.querySelector(containerSel + ' .quiz-option.selected');
    if (!selectedBtn) return;

    var selectedIdx = parseInt(selectedBtn.dataset.idx, 10);
    var q = queue[idx];

    // Determine the correct option index
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

    // Mark all buttons disabled and highlight correct / incorrect
    var btns = document.querySelectorAll(containerSel + ' .quiz-option');
    btns.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (i === correctIdx) btn.classList.add('correct');
      if (i === selectedIdx && !isCorrect) btn.classList.add('incorrect');
    });

    // Hide submit button
    var sBtnEl = document.querySelector(containerSel + ' .' + submitBtnClass);
    if (sBtnEl) sBtnEl.style.display = 'none';

    // Score + callbacks
    if (isCorrect) {
      score++;
      if (config.onCorrect) config.onCorrect(q, selectedIdx);
    } else {
      if (config.onIncorrect) config.onIncorrect(q, selectedIdx);
    }

    // Show explanation (if any)
    var explanation = config.getExplanation ? config.getExplanation(q) : null;
    if (explanation) {
      var expDiv = document.createElement('div');
      expDiv.className = 'quiz-feedback text-muted';
      expDiv.style.fontSize = '0.85rem';
      expDiv.textContent = explanation;
      var cont = document.getElementById(config.containerId);
      if (cont) cont.appendChild(expDiv);
    }

    // Reveal the next button
    var nextBtn = document.getElementById(config.nextBtnId);
    if (nextBtn) nextBtn.style.display = 'flex';
  }

  /**
   * Advance to the next question.
   */
  function next() {
    idx++;
    render();
  }

  /**
   * Return current quiz state (useful for external progress display, etc.).
   */
  function getState() {
    return { queue: queue, idx: idx, score: score, total: queue.length };
  }

  return { start: start, render: render, selectOption: selectOption, submit: submit, next: next, getState: getState };
}


// ════════════════════════════════════════════════════════════════
//  Shared HTML helpers
// ════════════════════════════════════════════════════════════════

/**
 * Generate accent button bar HTML.
 *
 * @param {string}  action   - The data-action prefix (e.g. 'insert-accent-gq')
 * @param {string}  [inputId] - Optional data-input-id for unified accent handling
 * @returns {string} HTML string
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
 *
 * @param {number}  current - Current step (0-based or 1-based, caller decides)
 * @param {number}  total   - Total number of steps
 * @param {string}  [fillId] - Optional id attribute for the fill element
 * @returns {string} HTML string for the progress-bar fill div
 */
function progressBarHTML(current, total, fillId) {
  var pct = total > 0 ? (current / total * 100) : 0;
  var idAttr = fillId ? ' id="' + fillId + '"' : '';
  return '<div class="quiz-progress-fill"' + idAttr +
    ' role="progressbar" aria-valuenow="' + Math.round(pct) +
    '" aria-valuemin="0" aria-valuemax="100" style="width:' + pct + '%"></div>';
}
