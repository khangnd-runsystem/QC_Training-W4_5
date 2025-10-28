import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { LoginLocators } from '../../../locators/demoblaze/login-locators';

export class LoginPage extends CommonPage {
  readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  // Action methods
  async openLoginModal(): Promise<void> {
    await this.click(this.locators.btnLoginNav);
    await this.waitForVisible(this.locators.modalLogin);
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.fill(this.locators.inputUsername, username);
    await this.fill(this.locators.inputPassword, password);
    await this.click(this.locators.btnSubmit);
    await this.waitForHidden(this.locators.modalLogin);
  }

  async closeModal(): Promise<void> {
    await this.click(this.locators.btnClose);
    await this.waitForHidden(this.locators.modalLogin);
  }

  // Verification methods
  async verifyLoginModalVisible(): Promise<void> {
    await expect.soft(this.locators.modalLogin).toBeVisible();
  }

  async verifyLoginModalHidden(): Promise<void> {
    await expect.soft(this.locators.modalLogin).toBeHidden();
  }

  async verifyLoginButtonHidden(): Promise<void> {
    await expect.soft(this.locators.btnLoginNav).toBeHidden();
  }
}
