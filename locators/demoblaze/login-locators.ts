import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../../common_template/common-locators';

export class LoginLocators extends CommonLocators {
  // Declare all locator properties
  btnLoginNav!: Locator;
  modalLogin!: Locator;
  inputUsername!: Locator;
  inputPassword!: Locator;
  btnSubmit!: Locator;
  btnClose!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    // Use XPath for all locators
    this.btnLoginNav = this.page.locator('//a[@id="login2"]');
    this.modalLogin = this.page.locator('//div[@id="logInModal"]');
    this.inputUsername = this.page.locator('//input[@id="loginusername"]');
    this.inputPassword = this.page.locator('//input[@id="loginpassword"]');
    this.btnSubmit = this.page.locator('//button[text()="Log in" and @onclick]');
    this.btnClose = this.page.locator('//div[@id="logInModal"]//button[@class="close"]');
  }
}
