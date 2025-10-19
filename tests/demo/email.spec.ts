import {test} from '@playwright/test';
import EmailPage from '../../pages/email-page';
import ENV from '../../src/utils/env';

const envKey = process.env.ENV_KEY || 'stg';
test.describe('Email Login Test', () => {
    test('Login and Verify Inbox', async ({page}, testInfo) => {
        if (!ENV.EMAIL || !ENV.PASSWORD) {
            throw new Error('ENV.EMAIL and ENV.PASSWORD must be set in environment variables');
        }
        const emailPageObj = new EmailPage(page);
        // Navigate to email login page
        await emailPageObj.navigate(ENV.BASE_URL);
        // Perform login
        await emailPageObj.loginEmail(ENV.EMAIL, ENV.PASSWORD);
        // Click on the email
        await emailPageObj.locators.getEmailInbox('GitHub Education', 'GitHub Education').click();
        // Take screenshot after login and inbox verification
        await emailPageObj.takeScreenshot(`email_inbox_verify_${envKey}_${testInfo.project?.name || 'local'}`);
    })
})