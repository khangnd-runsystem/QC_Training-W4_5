import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';
import { ProductsData } from '../../interfaces/demoblaze/product.interface';
import { CheckoutData} from '../../interfaces/demoblaze/checkout-info.interface';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, homePage, productPage, cartPage }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Load test data with type safety
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.samsungGalaxyS6;
    
    // Clear cart for clean state
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
    
    // Add a product for checkout tests
    await homePage.navigateToHome();
    await homePage.selectCategory(phone.category!);
    await homePage.selectProduct(phone.name);
    await productPage.addToCart();
  });

  test('TC3 - Checkout - when placing order with valid info - order completes successfully', async ({ 
    page, 
    cartPage, 
    checkoutPage, 
    homePage 
  }) => {
    // Load checkout test data with type safety
    const checkoutData = readJson('data/demoblaze/checkout-info.json') as CheckoutData;
    const customer = checkoutData.customer1;
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.samsungGalaxyS6;
    
    // Steps 1-2: Navigate to cart and verify items
    await cartPage.navigateToCart();
    await cartPage.verifyItemInCart(phone.name);
    
    // Step 3: Click Place Order
    await cartPage.clickPlaceOrder();
    
    // Step 4: Fill checkout form with data from JSON
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      card: customer.card,
      month: customer.month,
      year: customer.year
    });
    
    // Step 5: Click Purchase
    await checkoutPage.clickPurchase();
    
    // Verifications (all through page methods)
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    await homePage.verifyOnHomePage();
  });
});
