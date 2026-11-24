// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Radek Drweski/);
});

test('clicking the "Let`s talk" button scrolls to the contact section', async ({ page }) => {
  await page.getByRole('button', { name: /let's talk/i }).click();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('CV button downloads the PDF file', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'CV' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Radek Drweski CV.pdf');
});
