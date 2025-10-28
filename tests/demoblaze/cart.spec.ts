import { test} from './base-test';
import { readJson } from '../../utils/dataReader';
import { ProductsData } from '../../interfaces/demoblaze/product.interface';

const BASE_URL = process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com';
const USERNAME = process.env.DEMOBLAZE_USERNAME || '';
const PASSWORD = process.env.DEMOBLAZE_PASSWORD || '';

test.describe('Cart Management', () => {
  test.beforeEach(async ({ page, loginPage, cartPage, homePage }) => {
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

  test('TC2 - Cart - when adding multiple products - all items appear with correct totals', async ({ 
    homePage, 
    productPage, 
    cartPage 
  }) => {
    // Load test data from JSON with type safety
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.samsungGalaxyS6;
    const laptop = products.laptops.macBookPro;
    
    // Steps 1-3: Add first product
    await homePage.selectCategory(phone.category!);
    await homePage.verifyPhoneProductsVisible();
    await homePage.selectProduct(phone.name);
    await productPage.verifyOnProductPage(phone.name);
    await productPage.addToCart();
    
    // Step 4: Return to home
    await homePage.navigateToHome();
    
    // Steps 5-7: Add second product
    await homePage.selectCategory(laptop.category!);
    await homePage.verifyLaptopProductsVisible();
    await homePage.selectProduct(laptop.name);
    await productPage.verifyOnProductPage(laptop.name);
    await productPage.addToCart();
    
    // Step 8: Navigate to cart
    await homePage.navigateToCart();
    
    // Verifications (all through page methods)
    await cartPage.waitForPageLoad();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyProductPrice(phone.name, phone.price);
    await cartPage.verifyProductPrice(laptop.name, laptop.price);
    await cartPage.verifyTotalAmount(phone.price + laptop.price);
  });

  test('TC4 - Cart - when removing item - remaining items and total update correctly', async ({ 
    homePage, 
    productPage, 
    cartPage 
  }) => {
    // Load test data from JSON with type safety
    const products = readJson('data/demoblaze/products.json') as ProductsData;
    const phone = products.phones.sonyXperiaZ5;
    const laptop = products.laptops.macBookAir;
    
    // Add first product
    await homePage.selectCategory(phone.category!);
    await homePage.selectProduct(phone.name);
    await productPage.addToCart();
    await homePage.navigateToHome();
    
    // Add second product
    await homePage.selectCategory(laptop.category!);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();
    
    // Steps 1-2: Go to cart and verify both items
    await homePage.navigateToCart();
    await cartPage.waitForPageLoad();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemInCart(phone.name);
    await cartPage.verifyItemInCart(laptop.name);
    // Step 3: Remove one item
    await cartPage.removeItem(phone.name);
    await cartPage.waitForPageLoad();
    
    // Verifications (all through page methods)
    await cartPage.verifyItemNotInCart(phone.name);
    await cartPage.verifyItemInCart(laptop.name);
    await cartPage.verifyItemCount(1);
    await cartPage.verifyTotalAmount(laptop.price);
  });
});
