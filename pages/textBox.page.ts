import { expect, Page } from '@playwright/test';
import TextBoxLocators from '../locators/textBox.locators';
import TextBoxData from '../interfaces/textBoxData';

export default class TextBoxPage {
  readonly page: Page;
  readonly locators: TextBoxLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new TextBoxLocators(page);
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async fillForm(data: TextBoxData) {
    await this.locators.fullNameInput.fill(data.fullName);
    await this.locators.emailInput.fill(data.email);
    await this.locators.currentAddressInput.fill(data.currentAddress);
    await this.locators.permanentAddressInput.fill(data.permanentAddress);
  }

  async submit() {
    // The submit button may be covered; ensure focus and click via JS if needed
    await this.locators.submitButton.click({ force: true });
  }

  async verifyResult(data: TextBoxData, screenshotName: string) {
    await expect(this.locators.resultBox).toBeVisible();
    // Verify that submitted values appear in the output
    await expect(this.locators.resultBox).toContainText(data.fullName);
    await expect(this.locators.resultBox).toContainText(data.email);
    await expect(this.locators.resultBox).toContainText(data.currentAddress);
    await expect(this.locators.resultBox).toContainText(data.permanentAddress);
    // take screenshot for verification step
    await this.page.screenshot({ path: `test-results/${screenshotName}.png`, fullPage: true });
  }
}
