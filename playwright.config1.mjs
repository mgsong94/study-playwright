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
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on', // trace 를 통해서 api request, response 확인 가능.
        viewport: {width:720, height:720},
        // ...devices['Galaxy S24'],
        // ignoreHTTPSErrors: true, // SSL 에러 무시
        // permissions: ['geolocation'] // 위치 권한 허용
      },
    }, 
    {
      name: 'safari',
      use: { 
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure', // off, on, retry-on-first? // trace 를 통해서 api request, response 확인 가능.
        ...devices['iPhone 11']
      },
    }
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
});

