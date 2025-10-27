import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { CartLocators } from '../../../locators/demoblaze/cart-locators';

export class CartPage extends CommonPage {
  readonly locators: CartLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  // Navigation methods
  async navigateToCart(): Promise<void> {
    const cartLink = this.page.locator('//a[@id="cartur"]');
    await this.click(cartLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickPlaceOrder(): Promise<void> {
    await this.click(this.locators.btnPlaceOrder);
    await this.page.waitForTimeout(500);
  }

  // Action methods
  async removeItem(productName: string): Promise<void> {
    // Use XPath to find delete button for specific product
    const deleteButton = this.page.locator(
      `//tr[td[contains(text(), "${productName}")]]//a[text()="Delete"]`
    );
    await this.click(deleteButton);
    await this.page.waitForTimeout(500); // Allow UI to update
  }

  async clearAllItems(): Promise<void> {
    const deleteButtons = this.page.locator('//a[text()="Delete"]');
    let count = await deleteButtons.count();
    
    while (count > 0) {
      // Always click the first delete button since the list updates after each deletion
      const firstDeleteButton = deleteButtons.first();
      if (await firstDeleteButton.isVisible()) {
        await this.click(firstDeleteButton);
        await this.waitForPageLoad();
      }
      // Update count after each deletion
      count = count - 1;
    }
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.getText(this.locators.txtTotal);
    return parseInt(totalText.trim());
  }

  // Verification methods
  async verifyProductInCart(productName: string, expectedPrice?: number): Promise<void> {
    const productRow = this.page.locator(
      `//tr[td[contains(text(), "${productName}")]]`
    );
    await expect.soft(productRow).toBeVisible();
    
    if (expectedPrice !== undefined) {
      const priceCell = productRow.locator('td').nth(2);
      const actualPrice = await this.getText(priceCell);
      await expect.soft(parseInt(actualPrice)).toBe(expectedPrice);
    }
  }

  async verifyItemInCart(productName: string): Promise<void> {
    const productLocator = this.page.locator(`//td[contains(text(), "${productName}")]`);
    await expect.soft(productLocator).toBeVisible();
  }

  async verifyItemNotInCart(productName: string): Promise<void> {
    const productLocator = this.page.locator(`//td[contains(text(), "${productName}")]`);
    await expect.soft(productLocator).toBeHidden();
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    const count = await this.locators.rowCartItem.count();
    await expect.soft(count).toBe(expectedCount);
  }

  async verifyTotalAmount(expectedTotal: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    const actualTotal = await this.getTotalPrice();
    await expect.soft(actualTotal).toBe(expectedTotal);
  }
}
