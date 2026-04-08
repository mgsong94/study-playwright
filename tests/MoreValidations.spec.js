const {test, expect} = require('@playwright/test');

test('Popup validations', async({page}) => {
    // handle hidden
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handle popup
    page.on('dialog', dialog => dialog.accept()); // event listener
    await page.locator("#confirmbtn").click();
    
    // handle hover
    await page.pause();
    await page.locator("#mousehover").hover();
});