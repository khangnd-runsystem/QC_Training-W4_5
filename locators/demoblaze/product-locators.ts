import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class ProductLocators extends CommonLocators {
  btnAddToCart!: Locator;
  txtProductName!: Locator;
  txtProductPrice!: Locator;
  lnkHome!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.btnAddToCart = this.page.locator('//a[contains(@class, "btn-success") and text()="Add to cart"]');
    this.txtProductName = this.page.locator('//h2[@class="name"]');
    this.txtProductPrice = this.page.locator('//h3[@class="price-container"]');
    this.lnkHome = this.page.locator('//a[@class="nav-link" and contains(text(), "Home")]');
  }
}
