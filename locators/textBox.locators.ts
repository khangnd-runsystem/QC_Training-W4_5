import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export default class TextBoxLocators extends CommonLocators {
  fullNameInput!: Locator;
  emailInput!: Locator;
  currentAddressInput!: Locator;
  permanentAddressInput!: Locator;
  submitButton!: Locator;
  resultBox!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected override initializeLocators(): void {
    super.initializeLocators();

    this.fullNameInput = this.page.locator('//input[@id="userName"]');
    this.emailInput = this.page.locator('//input[@id="userEmail"]');
    this.currentAddressInput = this.page.locator('//textarea[@id="currentAddress"]');
    this.permanentAddressInput = this.page.locator('//textarea[@id="permanentAddress"]');
    this.submitButton = this.page.locator('//button[@id="submit"]');
    this.resultBox = this.page.locator('//div[@id="output"]');
  }
}
