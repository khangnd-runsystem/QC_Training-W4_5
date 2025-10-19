import {expect, Page} from '@playwright/test';
import {ButtonLocators} from '../locators/button-locators';
import { CommonPage } from './common-page';

export default class ButtonPage extends CommonPage {
	readonly locators: ButtonLocators;

	constructor(page: Page) {
		super(page)
		this.locators = new ButtonLocators(page);
        
	}

	async verifyDoubleClickMessage()
	{
		await expect(this.locators.btn_doubleClickMessage).toHaveText('You have done a double click');
	}
	async verifyRightClickMessage()
	{
		await expect(this.locators.btn_rightClickMessage).toHaveText('You have done a right click');
	}
	async verifyDynamicClickMessage()
	{
		await expect(this.locators.btn_dynamicClickMessage).toHaveText('You have done a dynamic click');
	}



}

