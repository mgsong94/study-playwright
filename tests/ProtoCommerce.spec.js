const { test, expect } = require('@playwright/test');

test('Proto Commerce', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", {name: 'Submit'});
  await page.getByText("The Form has been submitted successfully!").isVisible();
  await page.getByRole("link", {name: "Shop"}).click();

  /* Shop Page */
  await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
  await page.pause();

})