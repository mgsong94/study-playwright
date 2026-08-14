// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  use: {
    actionTimeout: 10 * 1000, // action method 타임아웃
    navigationTimeout: 30 * 1000, // 페이지 로딩 타임아웃
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure' // off, on, retry-on-first?
    // trace 를 통해서 api request, response 확인 가능.
  },
  timeout: 30 * 1000, // Test 타임아웃
  expect: {
    timeout: 5000 // Assertion 타임아웃
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
});

