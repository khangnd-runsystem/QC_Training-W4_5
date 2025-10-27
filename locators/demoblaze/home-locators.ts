import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class HomeLocators extends CommonLocators {
  // Declare all locator properties
  lnkCategoryPhones!: Locator;
  lnkCategoryLaptops!: Locator;
  lnkCategoryMonitors!: Locator;
  lnkHome!: Locator;
  lnkCart!: Locator;
  btnLogout!: Locator;
  txtWelcome!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    // Use XPath for all static locators
    this.lnkCategoryPhones = this.page.locator('//a[text()="Phones"]');
    this.lnkCategoryLaptops = this.page.locator('//a[text()="Laptops"]');
    this.lnkCategoryMonitors = this.page.locator('//a[text()="Monitors"]');
    this.lnkHome = this.page.locator('//a[@class="nav-link" and contains(text(), "Home")]');
    this.lnkCart = this.page.locator('//a[@id="cartur"]');
    this.btnLogout = this.page.locator('//a[@id="logout2"]');
    this.txtWelcome = this.page.locator('//a[@id="nameofuser"]');
  }
}
