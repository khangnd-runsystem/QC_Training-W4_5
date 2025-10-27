import { expect, Page } from '@playwright/test';
import TextBoxLocators from '../locators/textbox-locators';
import TextBoxData from '../../interfaces/demoqa/textBoxData';
import { CommonPage } from '../common-page';

export default class TextBoxPage extends CommonPage {
  readonly locators: TextBoxLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new TextBoxLocators(page);
  }

  async verifyResult(data: TextBoxData) {
    // Verify that submitted values appear in the output
    await expect(this.locators.tb_resultBox).toContainText(data.tb_fullName);
    await expect(this.locators.tb_resultBox).toContainText(data.tb_email);
    await expect(this.locators.tb_resultBox).toContainText(data.tb_currentAddress);
    await expect(this.locators.tb_resultBox).toContainText(data.tb_permanentAddress);
    
  }
}

