// @ts-check
const { test, expect } = require('@playwright/test');
const { createProfileAndLogin } = require('./helpers');

test.describe('Placement test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await createProfileAndLogin(page);
  });

  test('can navigate to placement test and see the level selection', async ({ page }) => {
    // The placement test can be started from the Stats screen
    // or via the settings area. We'll trigger it via the action directly.
    await page.evaluate(() => {
      // Use the app's own function to start placement
      if (typeof startPlacementTest === 'function') {
        startPlacementTest();
      }
    });

    // Should see the placement level selection screen
    await expect(page.locator('#screen-placement')).toHaveClass(/active/, { timeout: 5000 });

    // Level choice cards should be visible (A1, A2, B1, etc.)
    const levelCards = page.locator('#screen-placement [data-action="start-placement-at"]');
    await expect(levelCards.first()).toBeVisible({ timeout: 5000 });
    const count = await levelCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('can start placement at A1 and see a question', async ({ page }) => {
    // Start placement test
    await page.evaluate(() => {
      if (typeof startPlacementTest === 'function') {
        startPlacementTest();
      }
    });
    await expect(page.locator('#screen-placement')).toHaveClass(/active/, { timeout: 5000 });

    // Pick A1 level
    await page.locator('[data-action="start-placement-at"][data-level="A1"]').click();

    // A mode selection may appear (both, grammar, vocab) — pick "both"
    const modeBtn = page.locator('[data-action="start-placement-mode"][data-mode="both"]');
    if (await modeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await modeBtn.click();
    }

    // Now the placement quiz should be active with a question
    const container = page.locator('#pt-container');
    await expect(container).toBeVisible({ timeout: 5000 });

    // Should have quiz content (question text)
    await expect(container).not.toBeEmpty();
  });

  test('can select an answer and progress bar updates', async ({ page }) => {
    // Start placement at A1
    await page.evaluate(() => {
      if (typeof startPlacementTest === 'function') {
        startPlacementTest();
      }
    });
    await expect(page.locator('#screen-placement')).toHaveClass(/active/, { timeout: 5000 });

    await page.locator('[data-action="start-placement-at"][data-level="A1"]').click();

    const modeBtn = page.locator('[data-action="start-placement-mode"][data-mode="both"]');
    if (await modeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await modeBtn.click();
    }

    // Wait for first question
    const container = page.locator('#pt-container');
    await expect(container).toBeVisible({ timeout: 5000 });

    // Record initial progress text
    const progressText = page.locator('#pt-progress');
    await expect(progressText).toBeVisible({ timeout: 5000 });
    const initialText = await progressText.textContent();

    // Answer the question — could be MC or fill-in-blank
    const mcOption = container.locator('.quiz-option');
    const fibInput = container.locator('#pt-fib-input');

    if (await mcOption.first().isVisible().catch(() => false)) {
      // MC flow: select option, then click Submit, then click Next
      await mcOption.first().click();
      const submitBtn = container.locator('.mc-submit');
      await expect(submitBtn).toBeVisible({ timeout: 3000 });
      await submitBtn.click();
    } else if (await fibInput.isVisible().catch(() => false)) {
      // FIB flow: type an answer and submit
      await fibInput.fill('test');
      await container.locator('[data-action="submit-placement-fib"]').click();
    }

    // Click Next to advance to second question
    const nextBtn = page.locator('[data-action="next-placement"]');
    await expect(nextBtn).toBeVisible({ timeout: 5000 });
    await nextBtn.click();

    // Progress text should update (e.g., from "1 / 20" to "2 / 20")
    await expect(progressText).not.toHaveText(initialText, { timeout: 5000 });
    const updatedText = await progressText.textContent();
    expect(updatedText).toBeTruthy();
    expect(updatedText).not.toBe(initialText);
  });
});
