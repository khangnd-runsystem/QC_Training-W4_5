import { Page, expect } from '@playwright/test';
import CheckBoxLocators from '../locators/checkBox.locator';

export default class CheckBoxPage {
    readonly page: Page;
    readonly locators: CheckBoxLocators;
    constructor(page: Page) {
        this.page = page;
        this.locators = new CheckBoxLocators(page);
    }
    // await page.goto('https://demoqa.com/checkbox');
    // await page.getByRole('button', { name: 'Toggle' }).click();
    // await page.getByRole('button', { name: 'Toggle' }).nth(1).click();
    // await page.locator('.rct-node.rct-node-leaf > .rct-text > label > .rct-checkbox > .rct-icon').first().click();
    async navigate() {
        await this.page.goto('https://demoqa.com/checkbox');
    }

    async openHomeChildren() 
    {
        await this.locators.homeToggle.click();
    }
    async openDesktopChildren()
    {
        await this.locators.desktopToggle.click();
    }
    async notesBoxChecking()
    {
        await this.locators.notesCheckBox.check();
    }
    async verifyResult(screenshotName: string)
    {
        await expect(this.locators.resultBox).toBeVisible();
        await expect(this.locators.resultBox).toContainText('You have selected :notes');
        await this.page.screenshot({path: `test-results/${screenshotName}.png`, fullPage: true});
    }

}