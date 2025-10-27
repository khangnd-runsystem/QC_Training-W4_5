import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../../pages/demoblaze/auth/login-page';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { ProductPage } from '../../pages/demoblaze/product/product-page';
import { CartPage } from '../../pages/demoblaze/cart/cart-page';
import { CheckoutPage } from '../../pages/demoblaze/cart/checkout-page';
import { readJson } from '../../utils/dataReader';

// Export
export { expect } from '@playwright/test';

// Define fixtures type
type DemoblazeFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

// Extend base test with page object fixtures
export const test = baseTest.extend<DemoblazeFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }
});

// BaseTest class for loading test data
export class BaseTest {
  loadTestData<T>(filePath: string): T {
    return readJson<T>(filePath);
  }
}
