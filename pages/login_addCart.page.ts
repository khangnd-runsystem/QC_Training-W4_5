import {expect, Page} from '@playwright/test';
import Login_AddCartLocators from '../locators/login_addCart.locator';
import { CommonPage } from './common-page';
export default class LoginAddCartPage extends CommonPage {
    readonly locators: Login_AddCartLocators;
    constructor(page: Page) {
        super(page);
        this.locators = new Login_AddCartLocators(page);
    }
    async login(username: string, password: string) {
        await this.fill(this.locators.userName, username);
        await this.fill(this.locators.password, password);
        await this.click(this.locators.loginButton);
    }
    async verifyLoginSuccess() {
        await expect(this.locators.pageTitle).toBeVisible();
        await expect(this.locators.pageTitle).toHaveText('Products');
        console.log(`Title của trang web là: ${await this.locators.pageTitle.textContent()}`);
    }
}