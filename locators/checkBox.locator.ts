import {Locator, Page} from '@playwright/test';

export default class CheckBoxLocators {
    readonly page: Page;
    readonly homeToggle: Locator;
    readonly desktopToggle: Locator;
    readonly notesCheckBox: Locator;
    readonly resultBox: Locator;
    constructor(page: Page) {
        this.page = page;
        this.homeToggle = page.getByRole('button', { name: 'Toggle' });
        this.desktopToggle = page.getByRole('button', { name: 'Toggle' }).nth(1);
        this.notesCheckBox = page.locator('.rct-node.rct-node-leaf > .rct-text > label > .rct-checkbox > .rct-icon').first();
        this.resultBox = page.locator('#result');
    }
}