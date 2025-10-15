import {test} from '@playwright/test';
import LoginAddCartPage from '../../pages/login_addCart.page';
import { URLS } from '../../constants/paths';
import { readJson } from '../../utils/jsonReader';
import { SauceDemoData } from '../../interfaces/sauceDemoData';

const envKey = process.env.test_env || 'dev';
test.describe('Login and Add to Cart Test Suite', () => {

    test('Login, Add to Cart, Verify Cart, and Logout', async ({page}, testInfo) => {
        const pageObj = new LoginAddCartPage(page);

        // Load test data from JSON
        const testData = readJson<SauceDemoData>('./data/saucedemo.testdata.json');
        const user = testData.users.standard;

        // Navigate to website
        await pageObj.navigate(URLS.SAUCEDEMO.BASE);

        // Login
        await pageObj.login(user.username, user.password);

        // Verify login success and take screenshot
        await pageObj.verifyLoginSuccess();
        await pageObj.takeScreenshot(`login_success_${envKey}_${testInfo.project?.name || 'local'}`);

        // Add to cart
        await pageObj.addToCart();

        // Go to cart
        await pageObj.goToCart();

        // Verify product in cart and take screenshot
        await pageObj.verifyProductInCart();
        await pageObj.takeScreenshot(`cart_verify_${envKey}_${testInfo.project?.name || 'local'}`);

        // Logout
        await pageObj.logout();
    })

});