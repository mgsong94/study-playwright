const {test, expect} = require('@playwright/test');

test('', async ({page}) => {
    const BASE_URL = "https://eventhub.rahulshettyacademy.com"
    await page.goto(BASE_URL+"/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
});