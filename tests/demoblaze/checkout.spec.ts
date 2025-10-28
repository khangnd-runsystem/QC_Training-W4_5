import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';
import { ProductsData } from '../../interfaces/demoblaze/product.interface';
import { CheckoutData } from '../../interfaces/demoblaze/checkout-info.interface';
import { UsersData } from '../../interfaces/demoblaze/user.interface';

const BASE_URL = process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, loginPage, homePage, productPage, cartPage }) => {
    await page.goto(BASE_URL);
    
    // Load user data for login
    const users = readJson('data/demoblaze/users.json') as UsersData;
    const validUser = users.validUser;
    
    // Login before checkout operations
    await loginPage.openLoginModal();
    await loginPage.loginWithCredentials(validUser.username, validUser.password);
    await loginPage.verifyLoginModalHidden();
    
    // Load test data with type safety
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.samsungGalaxyS6;
    
    // Clear cart for clean state
    await cartPage.navigateToCart();
    await cartPage.waitForPageLoad();
    await cartPage.clearAllItems();

    // Add a product for checkout tests
    await homePage.navigateToHome();
    await homePage.selectCategory(phone.category!);
    await homePage.verifyPhoneProductsVisible();
    await homePage.selectProduct(phone.name);
    await productPage.addToCart();

  });

  test('TC3 - Checkout - when placing order with valid info - order completes successfully', async ({ 
    page, 
    cartPage, 
    checkoutPage, 
    homePage,
    productPage 
  }) => {
    // Load checkout test data with type safety
    const checkoutData = readJson('data/demoblaze/checkout-info.json') as CheckoutData;
    const customer = checkoutData.customer1;
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.samsungGalaxyS6;
    
    // Step 1: Navigate to cart and verify item
    await cartPage.navigateToCart();
    await cartPage.verifyItemInCart(phone.name);
    await cartPage.verifyProductPrice(phone.name, phone.price);

    
    // Step 4: Click Place Order
    await cartPage.clickPlaceOrder();

    // Step 5: Fill checkout form with data from JSON
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      card: customer.card,
      month: customer.month,
      year: customer.year
    });

    // Step 6: Click Purchase
    await checkoutPage.clickPurchase();
    
    // Verifications (all through page methods)
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    await cartPage.navigateToCart();
    await cartPage.verifyItemCount(0);
  });
});
