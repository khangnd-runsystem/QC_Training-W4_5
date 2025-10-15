import {Locator, Page} from '@playwright/test';
import {CommonLocators} from './common-locators';

export default class CheckBoxLocators extends CommonLocators {
    constructor(page: Page) {
        super(page);
        this.initializeLocators();
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
        this.cb_homeToggle = this.page.locator('//button[@title="Toggle"]').first();
        // this.cb_desktopToggle = this.page.locator('//span[text()="Desktop"]//preceding::button[1]');
        this.cb_desktopToggle = this.page.locator('//span[text()="Desktop"]//ancestor::span//button');
        this.cb_notesCheckBox = this.page.locator('//span[text()="Notes"]//preceding-sibling::span[@class ="rct-checkbox"]');
        this.cb_resultBox = this.page.locator('//div[@id="result"]');
    }


}