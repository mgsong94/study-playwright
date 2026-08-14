const { test, expect } = require('@playwright/test');
// test.describe.configure({mode:'serial'}); // default : 독립적, serial : 일련(직렬), parallel : 병렬

test('Popup validations', async ({ page }) => {
    // handle hidden
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handle popup
    page.on('dialog', dialog => dialog.accept()); // event listener
    await page.locator("#confirmbtn").click();

    // handle hover
    await page.locator("#mousehover").hover();

    // handle frame
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});

test('Popup validations2', async ({ page }) => {
    // handle hidden
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handle popup
    page.on('dialog', dialog => dialog.accept()); // event listener
    await page.locator("#confirmbtn").click();

    // handle hover
    await page.locator("#mousehover").hover();

    // handle frame
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});