import path from 'path';

export const REPORTS_DIR = path.resolve(process.cwd(), 'reports');
export const SCREENSHOT_DIR = path.resolve(process.cwd(), 'test-results');
export const ALLURE_RESULTS = path.resolve(REPORTS_DIR, 'allure-results');
