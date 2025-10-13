import { test, expect } from '@playwright/test';
import ENV from '../src/utils/env'; 
test('test', async ({ page }) => {
  console.log(ENV.BASE_URL);
  console.log(ENV.USERNAME);
  console.log(ENV.PASSWORD);
  await page.goto(ENV.BASE_URL || 'https://letcode.in/');
});
// test('has title', async ({ page }) => {
//   await page.goto(process.env.BASE_URL || 'https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
