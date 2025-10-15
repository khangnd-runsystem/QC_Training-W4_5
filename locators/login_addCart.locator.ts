import {Locator, Page} from '@playwright/test';
import {CommonLocators} from './common-locators';

export default class Login_AddCartLocators extends CommonLocators {

    userName!: Locator;
    password!: Locator;
    loginButton!: Locator;
    addToCartButton!: Locator;
    goToCartButton!: Locator;
    productTitle!: Locator;
    cartProductTitle!: Locator;
    pageTitle!: Locator;
    menuButton!: Locator;
    logOutButton!: Locator;

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }
    protected override initializeLocators(): void {
        super.initializeLocators();
        this.userName = this.page.locator('//input[@id="user-name"]');
        this.password = this.page.locator('//input[@id="password"]');
        this.loginButton = this.page.locator('//input[@id="login-button"]');
        this.addToCartButton = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
        this.goToCartButton = this.page.locator('//div[@id="shopping_cart_container"]');
        this.productTitle = this.page.locator('//a[@id="item_4_title_link"]//div[@class="inventory_item_name"]');
        this.cartProductTitle = this.page.locator('//div[@class="inventory_item_name"]');
        this.pageTitle = this.page.locator('//span[@class="title"]');
        this.menuButton = this.page.locator('//button[@id="react-burger-menu-btn"]');
        this.logOutButton = this.page.locator('//a[@id="logout_sidebar_link"]');
        
    }
}