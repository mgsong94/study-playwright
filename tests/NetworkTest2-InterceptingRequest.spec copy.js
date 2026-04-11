const {test, expect} = require('@playwright/test');

const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test(`Security test request intercept`, async({ page }) => {
    /* Login Page */
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.validLogin(dataset[1].username, dataset[1].password);

    /* Dashboard Page */
    const dashboardPage = new DashboardPage(page);
    // 방법 2 : 해당 요소가 업 되었음을 체크
    await dashboardPage.productsText.first().waitFor(); 

    // click orders
    const ordersBtn = page.locator("button[routerlink*='myorders']");
    await ordersBtn.click();

    /* Orders Page */
    // intercept request(지정한 url 요청이 들어올 시,지정한 url로 request 하도록 함)
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route => route.continue({ url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69d364c0f86ba51a654a96ad"})
    );
    await page.locator("button:has-text('View')").first().click();

    // unauthorized page
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
