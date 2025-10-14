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
  }

  protected override initializeLocators(): void {
    super.initializeLocators();

    this.fullNameInput = this.page.locator('#userName');
    this.emailInput = this.page.locator('#userEmail');
    this.currentAddressInput = this.page.locator('#currentAddress');
    this.permanentAddressInput = this.page.locator('#permanentAddress');
    this.submitButton = this.page.locator('#submit');
    this.resultBox = this.page.locator('#output');
  }
}
