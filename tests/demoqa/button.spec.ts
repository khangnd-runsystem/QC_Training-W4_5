import { test } from '@playwright/test';
import ButtonPage from '../../pages/demoqa/button-page';
import { URLS } from '../../constants/paths';

// Determine environment key
const envKey = process.env.test_env || 'dev';
test.describe('Button actions', () => {
    test('click all buttons', async ({ page }, testInfo) => {
        const buttonPageObj = new ButtonPage(page);

        // Navigate to buttons page
        await buttonPageObj.navigate(URLS.DEMOQA.BUTTONS);

        // Double click button
        await buttonPageObj.dblclick(buttonPageObj.locators.btn_doubleClickButton);
        await buttonPageObj.verifyDoubleClickMessage();
        await buttonPageObj.takeScreenshot(`button_doubleclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Right click button
        await buttonPageObj.rightClick(buttonPageObj.locators.btn_rightClickButton);
        await buttonPageObj.verifyRightClickMessage();
        await buttonPageObj.takeScreenshot(`button_rightclick_${envKey}_${testInfo.project?.name || 'local'}`);

        // Dynamic click button
        await buttonPageObj.click(buttonPageObj.locators.btn_dynamicClickButton);
        await buttonPageObj.verifyDynamicClickMessage();
        await buttonPageObj.takeScreenshot(`button_dynamicclick_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})