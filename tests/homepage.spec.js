// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://radek-drweski.com/');
});

test('has title', async ({ page }) => {
  // Expect a title to contain the website owner's name
  await expect(page).toHaveTitle(/Radek Drweski/);
});

test('Lets Talk button scrolls to contact section', async ({ page }) => {
  // Click the "Let's Talk" button
  await page.getByRole('link', { name: /let's talk/i }).click();

  // Expect the contact section to be in the viewport
  await expect(page.locator('#contact')).toBeInViewport();
});

test('CV button downloads the PDF file', async ({ page }) => {
  // Wait for the download event
  const downloadPromise = page.waitForEvent('download');

  // Click the "CV" button
  await page.getByRole('link', { name: 'CV' }).click();

  // Get the downloaded file
  const download = await downloadPromise;

  // Verify the downloaded file name
  expect(download.suggestedFilename()).toBe('Radek Drweski CV.pdf');
});
