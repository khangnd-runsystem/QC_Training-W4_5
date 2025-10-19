import { test } from '@playwright/test';
import { readJson } from '../../utils/dataReader';
import TextBoxData from '../../interfaces/textBoxData';
import TextBoxPage from '../../pages/textbox-page';
import { URLS } from '../../constants/paths';

// Determine environment key
const envKey = process.env.test_env || 'dev';

test.describe('Text box form', () => {
  test('fill and submit form', async ({ page }, testInfo) => {
    const allTextboxData = readJson<Record<string, TextBoxData>>('./data/textbox.testdata.json');
    const textBoxData = allTextboxData[envKey];
    const textBoxPageObj = new TextBoxPage(page);

    // Navigate to text box page
    await textBoxPageObj.navigate(URLS.DEMOQA.TEXT_BOX);

    // Fill form fields
    await textBoxPageObj.fill(textBoxPageObj.locators.tb_fullNameInput, textBoxData.tb_fullName);
    await textBoxPageObj.fill(textBoxPageObj.locators.tb_emailInput, textBoxData.tb_email);
    await textBoxPageObj.fill(textBoxPageObj.locators.tb_currentAddressInput, textBoxData.tb_currentAddress);
    await textBoxPageObj.fill(textBoxPageObj.locators.tb_permanentAddressInput, textBoxData.tb_permanentAddress);
    // Submit form
    await textBoxPageObj.click(textBoxPageObj.locators.tb_submitButton);
    // Verify result and take screenshot
    await textBoxPageObj.verifyResult(textBoxData);
    await textBoxPageObj.takeScreenshot(`textbox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
  });
});
