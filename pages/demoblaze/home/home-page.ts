import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { HomeLocators } from '../../../locators/demoblaze/home-locators';

export class HomePage extends CommonPage {
  readonly locators: HomeLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new HomeLocators(page);
  }

  // Navigation methods
  async navigateToHome(): Promise<void> {
    await this.navigate('https://www.demoblaze.com/');
    await this.waitForVisible(this.locators.lnkHome);
  }

  async selectCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    // Handle dynamic category selection in page method using XPath
    const categoryLocator = this.page.locator(`//a[text()="${categoryName}"]`);
    await this.click(categoryLocator);
    await this.page.waitForTimeout(1000); // Wait for products to load
  }

  async selectProduct(productName: string): Promise<void> {
    // Handle dynamic product selection in page method using XPath
    const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
    await this.click(productLocator);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickHomeInNavbar(): Promise<void> {
    await this.click(this.locators.lnkHome);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToCart(): Promise<void> {
    await this.click(this.locators.lnkCart);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async logout(): Promise<void> {
    await this.click(this.locators.btnLogout);
    await this.page.waitForTimeout(1000);
  }

  // Verification methods
  async verifyOnHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL(/index\.html/);
  }

  async verifyProductDisplayed(productName: string): Promise<void> {
    const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
    await expect.soft(productLocator).toBeVisible();
  }

  async verifyWelcomeMessage(username: string): Promise<void> {
    await expect.soft(this.locators.txtWelcome).toContainText(username);
  }

  async verifyLogoutVisible(): Promise<void> {
    await expect.soft(this.locators.btnLogout).toBeVisible();
  }

  async verifyPhoneProductsVisible(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    const phoneProducts = this.page.locator('//div[@id="tbodyid"]//a');
    await expect.soft(phoneProducts.first()).toBeVisible();
  }

  async verifyLaptopProductsVisible(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    const laptopProducts = this.page.locator('//div[@id="tbodyid"]//a');
    await expect.soft(laptopProducts.first()).toBeVisible();
  }
}
