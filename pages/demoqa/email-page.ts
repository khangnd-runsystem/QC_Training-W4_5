import {expect, Page, Locator} from '@playwright/test';
import { EmailLocators } from '../locators/email-locators';
import { CommonPage } from '../common-page';

export default class EmailPage extends CommonPage {
    readonly locators: EmailLocators;
    
    constructor(page: Page) {
        super(page);
        this.locators = new EmailLocators(page);
    }
    async loginEmail(email: string, password: string) {
        await this.locators.email_inputField.click();
        await this.locators.email_inputField.fill(email);
        await this.locators.email_nextButton.click();
        await this.page.waitForSelector('//input[@type="password"]', { state: "visible", timeout: 20000 });
        
        await this.locators.email_passwordField.click();
        await this.locators.email_passwordField.fill(password);
        await this.locators.email_loginButton.click();
    }
    async clickEmail(text : string, name: string)
    {
        const email = this.page.locator(`(//span[text()="${text}" and @name="${name}"]//ancestor::tr)[1]`)
        await email.click()
    }



}