// @ts-check
const { test, expect } = require('@playwright/test');
const { createProfileAndLogin } = require('./helpers');

test.describe('Learn flow — Vocabulary', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await createProfileAndLogin(page);
  });

  test('can navigate to Vocabulary screen from Learn tab', async ({ page }) => {
    // Go to Learn tab
    await page.locator('.tab[data-tab="learn"]').click();
    await expect(page.locator('#screen-learn')).toHaveClass(/active/);

    // Click Vocabulary card
    await page.locator('#screen-learn [data-tab="vocab"]').click();
    await expect(page.locator('#screen-vocab')).toHaveClass(/active/);
    await expect(page.locator('#screen-vocab h2')).toContainText('Vocab');
  });

  test('vocab screen shows category cards', async ({ page }) => {
    await page.locator('.tab[data-tab="learn"]').click();
    await page.locator('#screen-learn [data-tab="vocab"]').click();
    await expect(page.locator('#screen-vocab')).toHaveClass(/active/);

    // There should be vocab category cards
    const categories = page.locator('#vocab-categories .card');
    // Wait for categories to render (they are populated by JS)
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
  });

  test('can open a vocab category and see words', async ({ page }) => {
    await page.locator('.tab[data-tab="learn"]').click();
    await page.locator('#screen-learn [data-tab="vocab"]').click();
    await expect(page.locator('#screen-vocab')).toHaveClass(/active/);

    // Click first vocab category card
    const categories = page.locator('#vocab-categories .card');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    await categories.first().click();

    // Should land on vocab-cat screen with a title and Learn/Quiz buttons
    await expect(page.locator('#screen-vocab-cat')).toHaveClass(/active/);
    await expect(page.locator('[data-action="start-vocab-learn"]')).toBeVisible();
    await expect(page.locator('[data-action="start-vocab-quiz"]')).toBeVisible();
  });

  test('can start vocab quiz and see a question with options', async ({ page }) => {
    await page.locator('.tab[data-tab="learn"]').click();
    await page.locator('#screen-learn [data-tab="vocab"]').click();

    // Open first category
    const categories = page.locator('#vocab-categories .card');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    await categories.first().click();
    await expect(page.locator('#screen-vocab-cat')).toHaveClass(/active/);

    // Start quiz
    await page.locator('[data-action="start-vocab-quiz"]').click();
    await expect(page.locator('#screen-vocab-quiz')).toHaveClass(/active/);

    // Quiz container should have content
    const container = page.locator('#vocq-container');
    await expect(container).toBeVisible();

    // Should see answer options (buttons inside the quiz container)
    const options = container.locator('.quiz-option, .option-btn, button');
    await expect(options.first()).toBeVisible({ timeout: 5000 });
    const optionCount = await options.count();
    expect(optionCount).toBeGreaterThan(1);
  });

  test('clicking an answer shows feedback', async ({ page }) => {
    await page.locator('.tab[data-tab="learn"]').click();
    await page.locator('#screen-learn [data-tab="vocab"]').click();

    const categories = page.locator('#vocab-categories .card');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    await categories.first().click();

    await page.locator('[data-action="start-vocab-quiz"]').click();
    await expect(page.locator('#screen-vocab-quiz')).toHaveClass(/active/);

    // Click first answer option
    const container = page.locator('#vocq-container');
    const options = container.locator('.quiz-option, .option-btn, button');
    await expect(options.first()).toBeVisible({ timeout: 5000 });
    await options.first().click();

    // After answering, the Next button should appear or options get styled
    // The next button (#vocq-next) becomes visible after answering
    await expect(page.locator('#vocq-next')).toBeVisible({ timeout: 5000 });
  });
});
