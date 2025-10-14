import { test } from '@playwright/test';
import ButtonPage from '../../pages/button.page';
import { ButtonLocators } from '../../locators/button.locator';

// Determine environment key
const envKey = process.env.test_env || 'dev';
test.describe('Button actions', () => {
    test('click all buttons', async ({ page }, testInfo) => {
        // Ensure full screen
        await page.setViewportSize({ width: 1920, height: 1080 });
        const pageObj = new ButtonPage(page);
        const locator = new ButtonLocators(page);
        await pageObj.navigate('https://demoqa.com/buttons');
        
        await pageObj.dblclick(locator.btn_doubleClickButton);
        await pageObj.rightClick(locator.btn_rightClickButton)
        await pageObj.click(locator.btn_dynamicClickButton);

        const screenshotName = `button_${envKey}_${testInfo.project?.name || 'local'}`;
        await pageObj.verifyDoubleClickMessage()
        await pageObj.verifyRightClickMessage()
        await pageObj.verifyDynamicClickMessage();
        await pageObj.takeScreenshot(screenshotName);
    })
})