import {test} from '@playwright/test';
import CheckBoxPage from '../../pages/checkbox-page';
import { URLS } from '../../constants/paths';

const envKey = process.env.test_env || 'dev';
test.describe('Check Box Demo Test', () => {
    test('Check Box Test', async ({page}, testInfo) => {
        const checkBoxPageObj = new CheckBoxPage(page);

        // Navigate to checkbox page
        await checkBoxPageObj.navigate(URLS.DEMOQA.CHECKBOX);

        // Expand home toggle
        await checkBoxPageObj.click(checkBoxPageObj.locators.cb_homeToggle);

        // Expand desktop toggle
        await checkBoxPageObj.click(checkBoxPageObj.locators.cb_desktopToggle);

        // Check notes checkbox
        await checkBoxPageObj.check(checkBoxPageObj.locators.cb_notesCheckBox);

        // Verify checkbox and take screenshot
        await checkBoxPageObj.verifyCheckBox();
        await checkBoxPageObj.takeScreenshot(`checkBox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})
