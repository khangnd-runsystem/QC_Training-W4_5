import {expect, Page} from '@playwright/test';
import Login_AddCartLocators from '../locators/login-addcart-locators';
import { CommonPage } from '../common-page';

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
		console.log(`Title c\u1ee7a trang web l\u00e0: ${await this.locators.pageTitle.textContent()}`);
	}
	async addToCart() {
		await this.click(this.locators.addToCartButton);
	}
	async goToCart() {
		await this.click(this.locators.goToCartButton);
	}
	async verifyProductInCart() {
		await expect(this.locators.cartProductTitle).toBeVisible();
		await expect(this.locators.cartProductTitle).toHaveText(await this.locators.productTitle.innerText());
	}
	async logout() {
		await this.click(this.locators.menuButton);
		await this.click(this.locators.logOutButton);
	}
}
