// Shared helpers for E2E tests

/**
 * Create a test profile and land on the Today screen.
 * This bypasses the profile-selection screen so every test
 * starts from a known, logged-in state.
 */
async function createProfileAndLogin(page) {
  await page.goto('/');
  // Wait for profile screen to be visible
  await page.locator('#screen-profile').waitFor({ state: 'visible' });

  // Click "New Profile"
  await page.locator('[data-action="create-profile"]').click();

  // Fill in profile name in the modal
  await page.locator('#new-profile-name').waitFor({ state: 'visible' });
  await page.locator('#new-profile-name').fill('TestUser');

  // Confirm creation
  await page.locator('[data-action="confirm-create-profile"]').click();

  // Onboarding carousel may appear — dismiss it
  // Keep clicking the skip/next button until we land on the today screen
  const maxClicks = 10;
  for (let i = 0; i < maxClicks; i++) {
    const onboardingSkip = page.locator('[data-action="onboarding-skip"]');
    const onboardingNext = page.locator('[data-action="onboarding-next"]');
    const todayScreen = page.locator('#screen-today.active');

    if (await todayScreen.isVisible().catch(() => false)) break;

    if (await onboardingSkip.isVisible().catch(() => false)) {
      await onboardingSkip.click();
      continue;
    }
    if (await onboardingNext.isVisible().catch(() => false)) {
      await onboardingNext.click();
      continue;
    }

    // Also dismiss placement test prompt if it appears (modal)
    const closeModal = page.locator('[data-action="close-modal"]');
    if (await closeModal.isVisible().catch(() => false)) {
      await closeModal.click();
      continue;
    }

    // Wait a bit before retrying
    await page.waitForTimeout(300);
  }

  // Ensure we are on the today screen with tab bar visible
  await page.locator('#tab-bar').waitFor({ state: 'visible', timeout: 5000 });
}

module.exports = { createProfileAndLogin };
