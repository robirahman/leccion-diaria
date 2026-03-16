// @ts-check
const { test, expect } = require('@playwright/test');
const { createProfileAndLogin } = require('./helpers');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage so each test starts fresh
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await createProfileAndLogin(page);
  });

  test('app loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForTimeout(1000);

    // Filter out known non-critical errors (e.g. service worker in test env)
    const critical = errors.filter(
      (e) => !e.includes('service-worker') && !e.includes('ServiceWorker')
    );
    expect(critical).toHaveLength(0);
  });

  test('home screen shows stat cards and tab bar', async ({ page }) => {
    // Today screen should be active
    await expect(page.locator('#screen-today')).toHaveClass(/active/);

    // Stat cards area exists
    await expect(page.locator('#today-stats')).toBeVisible();

    // Tab bar is visible with 5 tabs
    await expect(page.locator('#tab-bar')).toBeVisible();
    const tabs = page.locator('#tab-bar .tab');
    await expect(tabs).toHaveCount(5);
  });

  test('can navigate to Learn tab', async ({ page }) => {
    await page.locator('.tab[data-tab="learn"]').click();
    await expect(page.locator('#screen-learn')).toHaveClass(/active/);
    await expect(page.locator('#screen-learn h2')).toHaveText('Learn');
  });

  test('can navigate to Practice tab', async ({ page }) => {
    await page.locator('.tab[data-tab="practice"]').click();
    await expect(page.locator('#screen-practice')).toHaveClass(/active/);
    await expect(page.locator('#screen-practice h2')).toHaveText('Practice');
  });

  test('can navigate back to Home', async ({ page }) => {
    // Go to Learn first
    await page.locator('.tab[data-tab="learn"]').click();
    await expect(page.locator('#screen-learn')).toHaveClass(/active/);

    // Click Today tab to go home
    await page.locator('.tab[data-tab="today"]').click();
    await expect(page.locator('#screen-today')).toHaveClass(/active/);
  });

  test('back button works', async ({ page }) => {
    // Navigate to Vocab tab, then open a category to push onto the screen stack
    await page.locator('.tab[data-tab="learn"]').click();
    await page.locator('#screen-learn [data-tab="vocab"]').click();
    await expect(page.locator('#screen-vocab')).toHaveClass(/active/);

    // Open first vocab category — this pushes onto the stack
    const categories = page.locator('#vocab-categories .card');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    await categories.first().click();
    await expect(page.locator('#screen-vocab-cat')).toHaveClass(/active/);

    // Back button should now be visible (stack has more than 1 entry)
    const backBtn = page.locator('[data-action="go-back"]');
    await expect(backBtn).toBeVisible({ timeout: 3000 });
    await backBtn.click();

    // Should go back to vocab screen
    await expect(page.locator('#screen-vocab')).toHaveClass(/active/);
  });
});
