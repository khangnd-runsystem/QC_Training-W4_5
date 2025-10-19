import {test} from '@playwright/test';
import LoginAddCartPage from '../../pages/login-addcart-page';
import { URLS } from '../../constants/paths';
import { readJson } from '../../utils/jsonReader';
import { SauceDemoData } from '../../interfaces/sauceDemoData';

const envKey = process.env.test_env || 'dev';
test.describe('Login and Add to Cart Test Suite', () => {

    test('Login, Add to Cart, Verify Cart, and Logout', async ({page}, testInfo) => {
        const loginAddCartPageObj = new LoginAddCartPage(page);

        // Load test data from JSON
        const testData = readJson<SauceDemoData>('./data/saucedemo.testdata.json');
        const user = testData.users.standard;

        // Navigate to website
        await loginAddCartPageObj.navigate(URLS.SAUCEDEMO.BASE);

        // Login
        await loginAddCartPageObj.login(user.username, user.password);

        // Verify login success and take screenshot
        await loginAddCartPageObj.verifyLoginSuccess();
        await loginAddCartPageObj.takeScreenshot(`login_success_${envKey}_${testInfo.project?.name || 'local'}`);

        // Add to cart
        await loginAddCartPageObj.addToCart();

        // Go to cart
        await loginAddCartPageObj.goToCart();

        // Verify product in cart and take screenshot
        await loginAddCartPageObj.verifyProductInCart();
        await loginAddCartPageObj.takeScreenshot(`cart_verify_${envKey}_${testInfo.project?.name || 'local'}`);

        // Logout
        await loginAddCartPageObj.logout();
    })

});