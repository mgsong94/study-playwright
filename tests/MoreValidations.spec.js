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
    await page.locator("#mousehover").hover();
    
    // handle frame
    await page.pause();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});