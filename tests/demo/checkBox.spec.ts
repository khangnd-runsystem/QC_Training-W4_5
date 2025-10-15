import {test} from '@playwright/test';
import CheckBoxPage from '../../pages/checkBox.page';
import { URLS } from '../../constants/paths';

const envKey = process.env.test_env || 'dev';
test.describe('Check Box Demo Test', () => {
    test('Check Box Test', async ({page}, testInfo) => {
        const pageObj = new CheckBoxPage(page);

        // Navigate to checkbox page
        await pageObj.navigate(URLS.DEMOQA.CHECKBOX);

        // Expand home toggle
        await pageObj.click(pageObj.locators.cb_homeToggle);

        // Expand desktop toggle
        await pageObj.click(pageObj.locators.cb_desktopToggle);

        // Check notes checkbox
        await pageObj.check(pageObj.locators.cb_notesCheckBox);

        // Verify checkbox and take screenshot
        await pageObj.verifyCheckBox();
        await pageObj.takeScreenshot(`checkBox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})
