import { test } from '@playwright/test';
import { readJson } from '../../utils/jsonReader';
import TextBoxData from '../../interfaces/textBoxData';
import TextBoxPage from '../../pages/textBox.page';

// Determine environment key
const envKey = process.env.test_env || 'dev';

test.describe('Text box form', () => {
  test('fill and submit form', async ({ page }, testInfo) => {
    const allData = readJson<Record<string, TextBoxData>>('./data/textbox.testdata.json');
    const data = allData[envKey];
    const pageObj = new TextBoxPage(page);

    // Navigate to text box page
    await pageObj.navigate('https://demoqa.com/text-box');

    // Fill form fields
    await pageObj.fill(pageObj.locators.fullNameInput, data.fullName);
    await pageObj.fill(pageObj.locators.emailInput, data.email);
    await pageObj.fill(pageObj.locators.currentAddressInput, data.currentAddress);
    await pageObj.fill(pageObj.locators.permanentAddressInput, data.permanentAddress);

    // Submit form
    await pageObj.click(pageObj.locators.submitButton);

    // Verify result and take screenshot
    await pageObj.verifyResult(data);
    await pageObj.takeScreenshot(`textbox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
  });
});
