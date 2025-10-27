import { Page, expect } from '@playwright/test';
import CheckBoxLocators from '../locators/checkbox-locators';
import { CommonPage } from '../common-page';

export default class CheckBoxPage extends CommonPage {
	readonly locators: CheckBoxLocators;

	constructor(page: Page) {
		super(page)
		this.locators = new CheckBoxLocators(page);
	}

	async verifyCheckBox()
	{
		await expect(this.locators.cb_resultBox).toHaveText('You have selected :notes');
	}

}

