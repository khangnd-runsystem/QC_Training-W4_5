import {test} from '@playwright/test';
import CheckBoxLocators from '../../locators/checkBox.locator';
import CheckBoxPage from '../../pages/checkBox.page';
test.describe('Check Box Demo Test', async () => {
    test('Check Box Test', async ({page}, testInfo) => {
        // Ensure full screen
        await page.setViewportSize({width: 1920, height: 1080});
        const pageObj = new CheckBoxPage(page);
        await pageObj.navigate();
        await pageObj.openHomeChildren();
        await pageObj.openDesktopChildren();
        await pageObj.notesBoxChecking();
        const screenshotName = `checkBox_local_${testInfo.project?.name || 'local'}`;
        await pageObj.verifyResult(screenshotName);
    })
})
