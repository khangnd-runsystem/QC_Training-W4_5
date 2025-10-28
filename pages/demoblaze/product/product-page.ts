import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { ProductLocators } from '../../../locators/demoblaze/product-locators';

export class ProductPage extends CommonPage {
  readonly locators: ProductLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductLocators(page);
  }

  // Action methods
  async addToCart(): Promise<void> {
    // Set up alert handler before clicking
    this.page.once('dialog', async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.accept();
      await this.waitForPageLoad();

    });
    
    await this.click(this.locators.btnAddToCart);
    await this.waitForPageLoad();
    

  }

  async navigateHome(): Promise<void> {
    await this.click(this.locators.lnkHome);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToCart(): Promise<void> {
    const cartLink = this.page.locator('//a[@id="cartur"]');
    await this.click(cartLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verification methods
  async verifyOnProductPage(productName: string): Promise<void> {
    await this.waitForVisible(this.locators.txtProductName);
    await expect.soft(this.locators.txtProductName).toContainText(productName);
  }

  async verifyProductName(expectedName: string): Promise<void> {
    await expect.soft(this.locators.txtProductName).toHaveText(expectedName);
  }
}
