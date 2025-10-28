import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';

const BASE_URL = process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com';
const USERNAME = process.env.DEMOBLAZE_USERNAME || '';
const PASSWORD = process.env.DEMOBLAZE_PASSWORD || '';

test.describe('Full Shopping Flow', () => {
  test.beforeEach(async ({ page, cartPage, loginPage, homePage }) => {
    await page.goto(BASE_URL);
    
    // Login before cart operations using environment variables
    await loginPage.openLoginModal();
    await loginPage.loginWithCredentials(USERNAME, PASSWORD);
    await loginPage.verifyLoginModalHidden();
    
    // Clear cart for clean state
    await cartPage.navigateToCart();
    await cartPage.waitForPageLoad();
    await cartPage.clearAllItems();
    await homePage.navigateToHome()
  });

  test('TC5 - Full Flow - when completing shopping journey - all steps execute successfully', async ({ 
    homePage, 
    productPage, 
    cartPage, 
    checkoutPage,
    loginPage
  }) => {
    // Load test data from JSON files
    const products: any = readJson('data/demoblaze/products.json');
    const laptop = products.laptops.sonyVaioI5;
    const monitor = products.monitors.appleMonitor24;
    const checkoutData: any = readJson('data/demoblaze/checkout-info.json');
    const customer = checkoutData.customer2;
    
    
    // Steps 1: Add products from different categories
    await homePage.selectCategory(laptop.category);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();

    
    await homePage.navigateToHome();
    await homePage.selectCategory(monitor.category);
    await homePage.selectProduct(monitor.name);
    await productPage.addToCart();

    // Step 6: Verify cart
    await homePage.navigateToCart();
    await cartPage.waitForPageLoad();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemInCart(laptop.name);
    await cartPage.verifyProductPrice(laptop.name, laptop.price);
    await cartPage.verifyItemInCart(monitor.name);
    await cartPage.verifyProductPrice(monitor.name, monitor.price);
    
    // Steps 7-8: Checkout with customer data from JSON
    await cartPage.clickPlaceOrder();
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      card: customer.card,
      month: customer.month,
      year: customer.year
    });
    await checkoutPage.clickPurchase();
    
    // Step 9: Confirm and close
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    
    // Verifications (all through page methods)
    await homePage.verifyOnHomePage();
    // Step 10: Logout
    await homePage.logout();
    await loginPage.verifyLoginButtonVisible();
  });
});
