import path from 'path';

// Directory paths
export const REPORTS_DIR = path.resolve(process.cwd(), 'reports');
export const SCREENSHOT_DIR = path.resolve(process.cwd(), 'test-results');
export const ALLURE_RESULTS = path.resolve(REPORTS_DIR, 'allure-results');

// Test URLs - DemoQA
export const URLS = {
  DEMOQA: {
    BASE: 'https://demoqa.com',
    TEXT_BOX: 'https://demoqa.com/text-box',
    BUTTONS: 'https://demoqa.com/buttons',
    CHECKBOX: 'https://demoqa.com/checkbox',
  },
  SAUCEDEMO: {
    BASE: 'https://www.saucedemo.com',
    INVENTORY: 'https://www.saucedemo.com/inventory.html',
    CART: 'https://www.saucedemo.com/cart.html',
  },
  LETCODE: {
    BASE: 'https://letcode.in',
  },
} as const;
