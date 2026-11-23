// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('implementation tools have title attributes', async ({ page }) => {
  const tools = page.locator('.implementation__tools img');

  await expect(tools).not.toHaveCount(0);
  for (const tool of await tools.all()) {
    await expect(tool).toHaveAttribute('title', /.+/);
  }
});

test('Car Sport Point View Project link opens the live project', async ({ page }) => {
  const project = page.locator('.project-info').filter({
    has: page.getByRole('heading', { name: 'Car Sport Point' }),
  });

  const viewProject = project.getByRole('link', {
    name: 'View Project',
  });

  await expect(viewProject).toBeVisible();

  const popupPromise = page.waitForEvent('popup');

  await viewProject.click();

  const popup = await popupPromise;

  await expect(popup).toHaveURL('https://master.d15pql8ca0vxrn.amplifyapp.com/');
});
