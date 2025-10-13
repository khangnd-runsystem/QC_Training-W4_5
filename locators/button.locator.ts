import {Locator, Page} from '@playwright/test';
export default class ButtonLocators {
    readonly page: Page;
    readonly doubleClickButton: Locator;
    readonly rightClickButton: Locator;
    readonly dynamicClickButton: Locator;
    readonly doubleClickMessage: Locator;
    readonly rightClickMessage: Locator;
    readonly dynamicClickMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.doubleClickButton = page.locator('#doubleClickBtn');
        this.rightClickButton = page.locator('#rightClickBtn');
        this.dynamicClickButton = page.locator('button:has-text("Click Me")').nth(2);
        this.doubleClickMessage = page.locator('#doubleClickMessage');
        this.rightClickMessage = page.locator('#rightClickMessage');
        this.dynamicClickMessage = page.locator('#dynamicClickMessage');
    }
}