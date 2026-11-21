// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('displays the first set of skills by default', async ({ page }) => {
  const activeSkills = page.locator('.skills__list-item--active');
  const activeDot = page.locator('.progress-bar-dot--active');

  await expect(activeSkills).toHaveCount(8);
  await expect(activeDot).toHaveCount(1);
  await expect(activeDot.first()).toBeVisible();
});

test('displays the correct number of progress dots', async ({ page }) => {
  const skills = page.locator('.skills__list-item');
  const dots = page.locator('.skills__list-progress-bar > .progress-bar-dot');
  const expectedDots = Math.ceil((await skills.count()) / 8);

  await expect(dots).toHaveCount(expectedDots);
});

test('automatically displays the next set of skills', async ({ page }) => {
  await expect(page.locator('.skills__list-item--active')).toHaveCount(8);
  await page.waitForTimeout(5500);
  await expect(page.locator('.skills__list-progress-bar > .progress-bar-dot--active')).toHaveCount(
    1
  );
  await expect(page.locator('.skills__list-progress-bar > .progress-bar-dot').nth(1)).toHaveClass(
    /progress-bar-dot--active/
  );
});

test('returns to the first set of skills after the last set', async ({ page }) => {
  const dots = page.locator('.skills__list-progress-bar > .progress-bar-dot');
  const lastDotIndex = (await dots.count()) - 1;

  await dots.nth(lastDotIndex).click();
  await expect(dots.nth(lastDotIndex)).toHaveClass(/progress-bar-dot--active/);
  await page.waitForTimeout(5500);
  await expect(dots.first()).toHaveClass(/progress-bar-dot--active/);
});

test('displays the corresponding skills when clicking a progress dot', async ({ page }) => {
  const dots = page.locator('.skills__list-progress-bar > .progress-bar-dot');

  await dots.nth(1).click();
  await expect(dots.nth(1)).toHaveClass(/progress-bar-dot--active/);
  await expect(page.locator('.skills__list-item--active')).toHaveCount(8);
});
