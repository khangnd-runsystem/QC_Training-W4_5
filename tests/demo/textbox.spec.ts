import { test } from '@playwright/test';
import { readJson } from '../../utils/jsonReader';
import { CommonLocators } from '../../locators/common-locators';
import { CommonPage } from '../../pages/common-page';
import TextBoxData from '../../interfaces/textBoxData';
import TextBoxPage from '../../pages/textBox.page';
import TextBoxLocators from '../../locators/textBox.locators';

// Determine environment key
const envKey = process.env.test_env || 'dev';

test.describe('Text box form', () => {
  test('fill and submit form', async ({ page }, testInfo) => {
    // Ensure full screen
    await page.setViewportSize({ width: 1920, height: 1080 });
    const allData = readJson<Record<string, TextBoxData>>('./data/textbox.testdata.json');
    const data = allData[envKey];
    const pageObj = new TextBoxPage(page);
    const locators = new TextBoxLocators(page);

    await pageObj.navigate('https://demoqa.com/text-box');
    await pageObj.fill(locators.fullNameInput, data.fullName);
    await pageObj.fill(locators.emailInput, data.email);
    await pageObj.fill(locators.currentAddressInput, data.currentAddress);
    await pageObj.fill(locators.permanentAddressInput, data.permanentAddress);
    await pageObj.click(locators.submitButton);

    const screenshotName = `textbox_${envKey}_${testInfo.project?.name || 'local'}`;
    await pageObj.verifyResult(data);
    await pageObj.takeScreenshot(screenshotName);
  });
});
