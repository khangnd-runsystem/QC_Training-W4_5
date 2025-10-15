import {test} from '@playwright/test';
import CheckBoxPage from '../../pages/checkBox.page';
import CheckBoxLocators from '../../locators/checkBox.locator';

const envKey = process.env.test_env || 'dev';
test.describe('Check Box Demo Test', () => {
    test('Check Box Test', async ({page}, testInfo) => {
        const pageObj = new CheckBoxPage(page);
        const locators = new CheckBoxLocators(page);

        // Navigate to checkbox page
        await pageObj.navigate('https://demoqa.com/checkbox');

        // Expand home toggle
        await pageObj.click(locators.cb_homeToggle);

        // Expand desktop toggle
        await pageObj.click(locators.cb_desktopToggle);

        // Check notes checkbox
        await pageObj.check(locators.cb_notesCheckBox);

        // Verify checkbox and take screenshot
        await pageObj.verifyCheckBox();
        await pageObj.takeScreenshot(`checkBox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})
