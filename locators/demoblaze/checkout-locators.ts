import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class CheckoutLocators extends CommonLocators {
  modalCheckout!: Locator;
  inputName!: Locator;
  inputCountry!: Locator;
  inputCity!: Locator;
  inputCreditCard!: Locator;
  inputMonth!: Locator;
  inputYear!: Locator;
  btnPurchase!: Locator;
  btnClose!: Locator;
  modalConfirmation!: Locator;
  txtConfirmationMessage!: Locator;
  btnConfirmationOk!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.modalCheckout = this.page.locator('//div[@id="orderModal"]');
    this.inputName = this.page.locator('//input[@id="name"]');
    this.inputCountry = this.page.locator('//input[@id="country"]');
    this.inputCity = this.page.locator('//input[@id="city"]');
    this.inputCreditCard = this.page.locator('//input[@id="card"]');
    this.inputMonth = this.page.locator('//input[@id="month"]');
    this.inputYear = this.page.locator('//input[@id="year"]');
    this.btnPurchase = this.page.locator('//button[text()="Purchase"]');
    this.btnClose = this.page.locator('//div[@id="orderModal"]//button[@class="close"]');
    this.modalConfirmation = this.page.locator('//div[@class="sweet-alert  showSweetAlert visible"]');
    this.txtConfirmationMessage = this.page.locator('//h2[text()="Thank you for your purchase!"]');
    this.btnConfirmationOk = this.page.locator('//button[text()="OK"]');
  }
}
