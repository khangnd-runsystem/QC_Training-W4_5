import { test } from '@playwright/test';
import ButtonPage from '../../pages/button.page';
import { URLS } from '../../constants/paths';

// Determine environment key
const envKey = process.env.test_env || 'dev';
test.describe('Button actions', () => {
    test('click all buttons', async ({ page }, testInfo) => {
        const pageObj = new ButtonPage(page);

        // Navigate to buttons page
        await pageObj.navigate(URLS.DEMOQA.BUTTONS);

        // Double click button
        await pageObj.dblclick(pageObj.locators.btn_doubleClickButton);
        await pageObj.verifyDoubleClickMessage();
        await pageObj.takeScreenshot(`button_doubleclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Right click button
        await pageObj.rightClick(pageObj.locators.btn_rightClickButton);
        await pageObj.verifyRightClickMessage();
        await pageObj.takeScreenshot(`button_rightclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Dynamic click button
        await pageObj.click(pageObj.locators.btn_dynamicClickButton);
        await pageObj.verifyDynamicClickMessage();
        await pageObj.takeScreenshot(`button_dynamicclick_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})