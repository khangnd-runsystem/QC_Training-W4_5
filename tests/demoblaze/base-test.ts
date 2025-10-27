import { test as baseTest } from '@playwright/test';
import { LoginPage, HomePage,  CartPage, CheckoutPage, ProductPage} from '../../pages/demoblaze';
import { readJson } from '../../utils/dataReader';

//Export
export { expect } from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage; 
    checkoutPage: CheckoutPage;
    productPage: ProductPage;
}

export const test = baseTest.extend<MyFixtures>(
    {
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    }

});


export class BaseTest {

    loadDataInfo<T>(filePath: string): T | null {
        const fullPath = `data/${process.env.TEST_ENV || 'demoblaze'}/${filePath}`;

        try {
            const dataInfo = readJson<T>(fullPath);
            if (dataInfo) {
                console.log(`Data loaded successfully from file ${fullPath}`);
                return dataInfo;
            } else {
                console.error(`Error: Unable to read data from file ${fullPath}`);
            }
        } catch (error) {
            console.error(`Exception occurred while reading file ${fullPath}:`, error);
        }

        return null;
    }

}
