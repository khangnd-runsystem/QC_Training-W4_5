import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment file based on test_env (for example: .env.dev, .env.stg)
if (process.env.test_env) {
  dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.test_env}`), override: true });
} else {
  // fallback to .env if present
  dotenv.config({ path: path.resolve(__dirname, `.env`), override: false });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 60_000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'always', outputFolder: 'reports/html-report' }],
    ["allure-playwright", { open: 'always' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // headless mode controlled by .env via HEADLESS=true/false
    headless: process.env.HEADLESS === 'true',
    // Use null viewport to allow fullscreen window
    viewport: null,
    // Force browser to start in fullscreen on supported channels
    // Optional slowMo (ms) can be set via SLOW_MO env var or .env file to slow actions for easier visual debugging
    launchOptions: {
      slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : undefined,
      	
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },
  globalSetup: "src/utils/globalSetup.ts",

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : undefined,
        },
      },
    },

    // Run against Microsoft Edge (Chromium)
    {
      name: 'edge',
      use: {
        channel: 'msedge',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : undefined,
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
