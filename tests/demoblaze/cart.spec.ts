import { test, expect } from './base-test';
import { readJson } from '../../utils/dataReader';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { ProductsData } from '../../interfaces/demoblaze';

test.describe('Cart Management', () => {
  test.beforeEach(async ({ page, cartPage, homePage }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Clear cart for clean state
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
    await homePage.navigateToHome()
  });

  test('TC2 - Cart - when adding multiple products - all items appear with correct totals', async ({ 
    page, 
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
    await productPage.verifyProductAddedAlert();
    
    // Step 4: Return to home
    await homePage.clickHomeInNavbar();
    
    // Steps 5-7: Add second product
    await homePage.selectCategory(laptop.category!);
    await homePage.verifyLaptopProductsVisible();
    await homePage.selectProduct(laptop.name);
    await productPage.verifyOnProductPage(laptop.name);
    await productPage.addToCart();
    await productPage.verifyProductAddedAlert();
    
    // Step 8: Navigate to cart
    await homePage.navigateToCart();
    
    // Verifications (all through page methods)
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemInCart(phone.name);
    await cartPage.verifyItemInCart(laptop.name);
    await cartPage.verifyTotalAmount(phone.price + laptop.price);
  });

  test('TC4 - Cart - when removing item - remaining items and total update correctly', async ({ 
    page, 
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
    await homePage.clickHomeInNavbar();
    
    // Add second product
    await homePage.selectCategory(laptop.category!);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();
    
    // Steps 1-2: Go to cart and verify both items
    await homePage.navigateToCart();
    await cartPage.verifyItemCount(2);
    
    // Step 3: Remove one item
    await cartPage.removeItem(phone.name);
    
    // Verifications (all through page methods)
    await cartPage.verifyItemNotInCart(phone.name);
    await cartPage.verifyItemInCart(laptop.name);
    await cartPage.verifyItemCount(1);
  });
});
