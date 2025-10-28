import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class CartLocators extends CommonLocators {
  rowCartItem!: Locator;
  btnPlaceOrder!: Locator;
  txtTotal!: Locator;
  lnkHome!: Locator;
  lnkCart!: Locator;
  btnDeleteAll!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.rowCartItem = this.page.locator('//tbody[@id="tbodyid"]/tr');
    this.btnPlaceOrder = this.page.locator('//button[text()="Place Order"]');
    this.txtTotal = this.page.locator('//h3[@id="totalp"]');
    this.lnkHome = this.page.locator('//a[@class="nav-link" and contains(text(), "Home")]');
    this.lnkCart = this.page.locator('//a[@id="cartur"]');
    this.btnDeleteAll = this.page.locator('//a[text()="Delete"]');
  }

  // Dynamic locator methods
  getDeleteButtonByProduct(productName: string): Locator {
    return this.page.locator(`//tr[td[contains(text(), "${productName}")]]//a[text()="Delete"]`);
  }

  getProductRowByName(productName: string): Locator {
    return this.page.locator(`//tr[td[contains(text(), "${productName}")]]`);
  }

  getProductCellByName(productName: string): Locator {
    return this.page.locator(`//td[contains(text(), "${productName}")]`);
  }

  getProductPriceByName(productName: string): Locator {
    return this.page.locator(`//tr[td[contains(text(), "${productName}")]]//td[3]`);
  }
}
