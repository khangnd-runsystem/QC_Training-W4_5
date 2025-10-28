import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';
import { UsersData } from '../../interfaces/demoblaze/user.interface';

const BASE_URL = process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page}) => {
    await page.goto(BASE_URL);
  });

  test('TC1 - Login - when using valid credentials - user is authenticated successfully', async ({ 
    loginPage, 
    homePage 
  }) => {
    // Load test data from JSON with type safety
    const users = readJson('data/demoblaze/users.json') as UsersData;
    const validUser = users.validUser;
    
    // Step 1: Open login modal
    await loginPage.openLoginModal();
    
    // Steps 2-4: Login with credentials from data file
    await loginPage.loginWithCredentials(validUser.username, validUser.password);
    
    // Verifications (all through page methods)
    await loginPage.verifyLoginModalHidden();
    await homePage.verifyOnHomePage();
    await homePage.verifyWelcomeMessage(validUser.username);
    await homePage.verifyLogoutVisible();
  });
});
