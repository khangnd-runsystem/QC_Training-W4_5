import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class CartLocators extends CommonLocators {
  rowCartItem!: Locator;
  btnPlaceOrder!: Locator;
  txtTotal!: Locator;
  lnkHome!: Locator;

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
  }
}
