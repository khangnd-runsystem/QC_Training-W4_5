import {test} from '@playwright/test';
import CheckBoxPage from '../../pages/checkBox.page';
import CheckBoxLocators from '../../locators/checkBox.locator';
test.describe('Check Box Demo Test', async () => {
    test('Check Box Test', async ({page}, testInfo) => {
        // Ensure full screen
        await page.setViewportSize({width: 1920, height: 1080});

        const pageObj = new CheckBoxPage(page);
        const locators = new CheckBoxLocators(page);
        await pageObj.navigate('https://demoqa.com/checkbox');
        await pageObj.click(locators.cb_homeToggle);
        await pageObj.click(locators.cb_desktopToggle);
        await pageObj.check(locators.cb_notesCheckBox);
        const screenshotName = `checkBox_local_${testInfo.project?.name || 'local'}`;
        await pageObj.verifyCheckBox();
        await pageObj.takeScreenshot(screenshotName);
    })
})
