import { test } from '@playwright/test';
import ButtonPage from '../../pages/button.page';
import { ButtonLocators } from '../../locators/button.locator';

// Determine environment key
const envKey = process.env.test_env || 'dev';
test.describe('Button actions', () => {
    test('click all buttons', async ({ page }, testInfo) => {
        const pageObj = new ButtonPage(page);
        const locator = new ButtonLocators(page);

        // Navigate to buttons page
        await pageObj.navigate('https://demoqa.com/buttons');

        // Double click button
        await pageObj.dblclick(locator.btn_doubleClickButton);
        await pageObj.verifyDoubleClickMessage();
        await pageObj.takeScreenshot(`button_doubleclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Right click button
        await pageObj.rightClick(locator.btn_rightClickButton);
        await pageObj.verifyRightClickMessage();
        await pageObj.takeScreenshot(`button_rightclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Dynamic click button
        await pageObj.click(locator.btn_dynamicClickButton);
        await pageObj.verifyDynamicClickMessage();
        await pageObj.takeScreenshot(`button_dynamicclick_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})