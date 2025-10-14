import {Locator, Page} from '@playwright/test';
import {CommonLocators} from './common-locators';

export default class CheckBoxLocators extends CommonLocators {
    constructor(page: Page) {
        super(page);
    }
    // checkbox-specific locator properties (initialized in initializeLocators)
    cb_homeToggle!: Locator;
    cb_desktopToggle!: Locator;
    cb_notesCheckBox!: Locator;
    cb_resultBox!: Locator;

    protected override initializeLocators(): void {
        // keep parent initializations
        super.initializeLocators();

        // initialize checkbox locators for this subclass
        this.cb_homeToggle = this.page.getByRole('button', { name: 'Toggle' });
        this.cb_desktopToggle = this.page.getByRole('button', { name: 'Toggle' }).nth(1);
        this.cb_notesCheckBox = this.page.locator('.rct-node.rct-node-leaf > .rct-text > label > .rct-checkbox > .rct-icon').first();
        this.cb_resultBox = this.page.locator('#result');
    }


}