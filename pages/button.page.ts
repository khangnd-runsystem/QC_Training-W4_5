import {expect, Page} from '@playwright/test';
import ButtonLocators from '../locators/button.locator';

export default class ButtonPage {
    readonly page: Page;
    readonly locators: ButtonLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ButtonLocators(page);
    }

    async navigate()
    {
        await this.page.goto('https://demoqa.com/buttons');
    }
    async doubleClick()
    {
        await this.locators.doubleClickButton.dblclick();
    }
    async rightClick()
    {
        await this.locators.rightClickButton.click({button: 'right'});
    }
    async dynamicClick()
    {
        await this.locators.dynamicClickButton.click();
    }
    async clickAllButtons()
    {
        await this.doubleClick();
        await this.rightClick();
        await this.dynamicClick();
    }
    async verifyDoubleClickMessage()
    {
        await expect(this.locators.doubleClickMessage).toBeVisible();
        await expect(this.locators.doubleClickMessage).toHaveText('You have done a double click');
    }
    async verifyRightClickMessage()
    {
        await expect(this.locators.rightClickMessage).toBeVisible();
        await expect(this.locators.rightClickMessage).toHaveText('You have done a right click');
    }
    async verifyDynamicClickMessage()
    {
        await expect(this.locators.dynamicClickMessage).toBeVisible();
        await expect(this.locators.dynamicClickMessage).toHaveText('You have done a dynamic click');
    }
    async verifyAllClickMessages(screenshotName: string)
    {
        await this.verifyDoubleClickMessage();
        await this.verifyRightClickMessage();
        await this.verifyDynamicClickMessage();
        await this.page.screenshot({path: `test-results/${screenshotName}.png`, fullPage: true});
    }



}