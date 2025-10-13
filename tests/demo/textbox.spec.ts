import { test } from '@playwright/test';
import ENV from '../../src/utils/env';
import { readJson } from '../../utils/jsonReader';
import TextBoxPage from '../../pages/textBox.page';
import TextBoxData from '../../interfaces/textBoxData';

// Determine environment key
const envKey = process.env.test_env || 'dev';

test.describe('Text box form', () => {
  test('fill and submit form', async ({ page }, testInfo) => {
    // Ensure full screen
    await page.setViewportSize({ width: 1920, height: 1080 });
    const allData = readJson<Record<string, TextBoxData>>('./data/textbox.testdata.json');
    const data = allData[envKey];
    const pageObj = new TextBoxPage(page);
    await pageObj.navigate();
    await pageObj.fillForm(data);
    await pageObj.submit();
    const screenshotName = `textbox_${envKey}_${testInfo.project?.name || 'local'}`;
    await pageObj.verifyResult(data, screenshotName);
  });
});
