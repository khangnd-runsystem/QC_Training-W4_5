import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';

test.describe('Full Shopping Flow', () => {
  test.beforeEach(async ({ page, cartPage }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Clear cart for clean state
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
  });

  test('TC5 - Full Flow - when completing shopping journey - all steps execute successfully', async ({ 
    page, 
    loginPage, 
    homePage, 
    productPage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Load test data from JSON files
    const users: any = readJson('data/demoblaze/users.json');
    const validUser = users.validUser;
    const products: any = readJson('data/demoblaze/products.json');
    const laptop = products.laptops.sonyVaioI5;
    const monitor = products.monitors.appleMonitor24;
    const checkoutData: any = readJson('data/demoblaze/checkout-info.json');
    const customer = checkoutData.customer2;
    
    // Step 1: Login with data from JSON
    await loginPage.openLoginModal();
    await loginPage.loginWithCredentials(validUser.username, validUser.password);
    
    // Verify login successful
    await loginPage.verifyLoginModalHidden();
    await homePage.verifyWelcomeMessage(validUser.username);
    
    // Steps 2-5: Add products from different categories
    await homePage.selectCategory(laptop.category);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();
    
    await homePage.clickHomeInNavbar();
    await homePage.selectCategory(monitor.category);
    await homePage.selectProduct(monitor.name);
    await productPage.addToCart();
    
    // Step 6: Verify cart
    await homePage.navigateToCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemInCart(laptop.name);
    await cartPage.verifyItemInCart(monitor.name);
    
    // Steps 7-8: Checkout with customer data from JSON
    await cartPage.clickPlaceOrder();
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      card: customer.creditCard,
      month: customer.month,
      year: customer.year
    });
    await checkoutPage.clickPurchase();
    
    // Step 9: Confirm and close
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    
    // Step 10: Logout
    await homePage.logout();
    
    // Verifications (all through page methods)
    await homePage.verifyOnHomePage();
  });
});
