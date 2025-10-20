import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export default class TextBoxLocators extends CommonLocators {
  tb_fullNameInput!: Locator;
  tb_emailInput!: Locator;
  tb_currentAddressInput!: Locator;
  tb_permanentAddressInput!: Locator;
  tb_submitButton!: Locator;
  tb_resultBox!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected override initializeLocators(): void {
    super.initializeLocators();

    this.tb_fullNameInput = this.page.locator('//input[@id="userName"]');
    this.tb_emailInput = this.page.locator('//input[@id="userEmail"]');
    this.tb_currentAddressInput = this.page.locator('//textarea[@id="currentAddress"]');
    this.tb_permanentAddressInput = this.page.locator('//textarea[@id="permanentAddress"]');
    this.tb_submitButton = this.page.locator('//button[@id="submit"]');
    this.tb_resultBox = this.page.locator('//div[@id="output"]');
  }
}
