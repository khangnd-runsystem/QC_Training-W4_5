import { expect, Page } from '@playwright/test';
import TextBoxLocators from '../locators/textBox.locators';
import TextBoxData from '../interfaces/textBoxData';
import { CommonPage } from './common-page';

export default class TextBoxPage extends CommonPage {
  readonly locators: TextBoxLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new TextBoxLocators(page);
  }

  async verifyResult(data: TextBoxData) {
    // Verify that submitted values appear in the output
    await expect(this.locators.resultBox).toContainText(data.fullName);
    await expect(this.locators.resultBox).toContainText(data.email);
    await expect(this.locators.resultBox).toContainText(data.currentAddress);
    await expect(this.locators.resultBox).toContainText(data.permanentAddress);
    
  }
}
