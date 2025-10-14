import {Locator, Page} from '@playwright/test';
import {CommonLocators} from './common-locators';

export class ButtonLocators extends CommonLocators {
    // button-specific locator properties
    btn_doubleClickButton!: Locator;
    btn_rightClickButton!: Locator;
    btn_dynamicClickButton!: Locator;
    btn_doubleClickMessage!: Locator;
    btn_rightClickMessage!: Locator;
    btn_dynamicClickMessage!: Locator;

    constructor(page: Page) {
        super(page);
    }

    protected override initializeLocators(): void {
        super.initializeLocators();

        this.btn_doubleClickButton = this.page.locator('#doubleClickBtn');
        this.btn_rightClickButton = this.page.locator('#rightClickBtn');
        this.btn_dynamicClickButton = this.page.locator('button:has-text("Click Me")').nth(2);
        this.btn_doubleClickMessage = this.page.locator('#doubleClickMessage');
        this.btn_rightClickMessage = this.page.locator('#rightClickMessage');
        this.btn_dynamicClickMessage = this.page.locator('#dynamicClickMessage');
    }

}
