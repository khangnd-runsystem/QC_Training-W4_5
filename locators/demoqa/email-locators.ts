import {Locator, Page} from '@playwright/test';
import {CommonLocators} from '../common-locators';

export class EmailLocators extends CommonLocators {
    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    email_inputField!: Locator;
    email_nextButton!: Locator;
    email_passwordField!: Locator;
    email_loginButton!: Locator;
    // email_inbox!: Locator;

    protected initializeLocators(): void {
        super.initializeLocators();
        this.email_inputField = this.page.locator('//input[@type="email"]');
        this.email_nextButton = this.page.locator('//div[@id = "identifierNext"]');
        this.email_passwordField = this.page.locator('//input[@type="password"]');
        this.email_loginButton = this.page.locator('//div[@id =  "passwordNext"]')
        // this.email_inbox = this.page.locator(`/(//span[text() = ${}  and @name =${} ]//ancestor::tr)[1]`);
    }

    // getEmailInbox(text: string, name: string): Locator {
    //     return this.page.locator(`(//span[text()="${text}" and @name="${name}"]//ancestor::tr)[1]`);
    // }
}