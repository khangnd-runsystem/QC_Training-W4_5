import { test } from '@playwright/test';
import ENV from '../../src/utils/env';
import ButtonPage from '../../pages/button.page';

// Determine environment key
const envKey = process.env.test_env || 'dev';
test.describe('Button actions', () => {
    test('click all buttons', async ({ page }, testInfo) => {
        // Ensure full screen
        await page.setViewportSize({ width: 1920, height: 1080 });
        const pageObj = new ButtonPage(page);
        await pageObj.navigate();
        await pageObj.clickAllButtons();
        const screenshotName = `button_${envKey}_${testInfo.project?.name || 'local'}`;
        await pageObj.verifyAllClickMessages(screenshotName);
    })
})