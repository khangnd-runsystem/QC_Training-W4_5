import { test, expect } from './base-test';

const BASE_URL = process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com';
const USERNAME = process.env.DEMOBLAZE_USERNAME || '';
const PASSWORD = process.env.DEMOBLAZE_PASSWORD || '';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page}) => {
    await page.goto(BASE_URL);
  });

  test('TC1 - Login - when using valid credentials - user is authenticated successfully', async ({ 
    loginPage, 
    homePage 
  }) => {
    // Step 1: Open login modal
    await loginPage.openLoginModal();
    
    // Steps 2-4: Login with credentials from environment variables
    await loginPage.loginWithCredentials(USERNAME, PASSWORD);
    
    // Verifications (all through page methods)
    await loginPage.verifyLoginModalHidden();
    await homePage.verifyOnHomePage();
    await homePage.verifyWelcomeMessage(USERNAME);
    await homePage.verifyLogoutVisible();
    await loginPage.verifyLoginButtonHidden();
  });
});
