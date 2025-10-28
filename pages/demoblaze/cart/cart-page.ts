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
    await this.click(this.locators.lnkCart);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickPlaceOrder(): Promise<void> {
    await this.click(this.locators.btnPlaceOrder);
    await this.page.waitForTimeout(500);
  }

  // Action methods
  async removeItem(productName: string): Promise<void> {
    const deleteButton = this.locators.getDeleteButtonByProduct(productName);
    await this.click(deleteButton);
    await this.page.waitForTimeout(500); // Allow UI to update
  }

  async clearAllItems(): Promise<void> {
    while (await this.locators.btnDeleteAll.count() > 0) {
      // Always click the first delete button since the list updates after each deletion
      const firstDeleteButton = this.locators.btnDeleteAll.first();
      if (await firstDeleteButton.isVisible()) {
        await this.click(firstDeleteButton);
        await this.waitForPageLoad();
      }
    }
    await this.verifyItemCount(0);
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.getText(this.locators.txtTotal);
    return parseInt(totalText.trim());
  }

  // Verification methods
  async verifyItemInCart(productName: string): Promise<void> {
    const productRow = this.locators.getProductRowByName(productName);
    await expect.soft(productRow).toBeVisible();
  }

  async verifyProductPrice(productName: string, expectedPrice: number): Promise<void> {
    const priceCell = this.locators.getProductPriceByName(productName);
    const actualPrice = await this.getText(priceCell);
    await expect.soft(parseInt(actualPrice)).toBe(expectedPrice);
  }

  async verifyItemNotInCart(productName: string): Promise<void> {
    const productLocator = this.locators.getProductCellByName(productName);
    await expect.soft(productLocator).toBeHidden();
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await this.waitForPageLoad();
    const count = await this.locators.rowCartItem.count();
    await expect.soft(count).toBe(expectedCount);
  }

  async verifyTotalAmount(expectedTotal: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    const actualTotal = await this.getTotalPrice();
    await expect.soft(actualTotal).toBe(expectedTotal);
  }
}
