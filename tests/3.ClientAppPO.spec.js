const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
<<<<<<< HEAD
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('Lets Shop Web', async ({ page }) => {
  /* Login Page */
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.validLogin(dataset.username, dataset.password);
=======

test('Lets Shop Web', async ({ page }) => {
  // needed datas
  const username = "tysong0904@gmail.com";
  const password = "Mingi!94";
  const productName = "ZARA COAT 3";

  /* Login Page */
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.validLogin(username, password);
>>>>>>> 80bcad2e9cdd1e223bd8e91a87d488e8b4ea407e
  
  /* Dashboard Page */
  // allTextContents 메소드는 auto wait 기능이 없으므로, 요소가 state 될때까지 기다려야 한다.
  const dashboardPage = new DashboardPage(page);
  
  // 방법 2 : 해당 요소가 업 되었음을 체크
  await dashboardPage.productsText.first().waitFor(); 
  

  // add to cart and go to cart
<<<<<<< HEAD
  await dashboardPage.addProduct(dataset.productName);
=======
  await dashboardPage.addProduct(productName);
>>>>>>> 80bcad2e9cdd1e223bd8e91a87d488e8b4ea407e
  await dashboardPage.navigateToCart();

  /* cart */ 
  await page.locator("div li").first().waitFor(); // 요소들이 모두 로딩될 때까지 기다림
  const product = page.locator("h3:has-text('ZARA COAT 3')");
  const bool = await product.isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();

  /* Checkout Page */
  await page.locator("[placeholder*='Country']").pressSequentially("korea", { delay: 150});

  // select dropdown option
  const dropdown = page.locator("section.ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " Korea, Republic of") {
      await dropdown.locator("button").nth(i).click();
    }
  }

  // fill cvs code, name
  await page.locator(".field.small >> .input.txt").first().fill("123");
  await page.locator(".field .input.txt").nth(2).fill("Ignim");

  // check email address
  const label = page.locator(".user__name label");
  await expect(label).toHaveText("tysong0904@gmail.com");

  // place order
  await page.locator(".action__submit").click();

  /* Thanks Page */
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderText = await page.locator("label.ng-star-inserted").textContent();
  console.log(orderText);

  // click orders
  const ordersBtn = page.locator("button[routerlink*='myorders']");
  await ordersBtn.click();

  /* Orders Page*/
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  let isOrdered = false;
  for (let i = 0; i < await rows.count(); i++) {
    const orderId = await rows.nth(i).locator("th").textContent();
    if (orderText.includes(orderId)) {
      console.log("Order Success!");
      isOrdered = true;

      await rows.nth(i).locator(".btn-primary:has-text('View')").click();
      break;
    }
  }
  expect(isOrdered).toBeTruthy();

  /* Order Detail Page */
  const orderIdDetail = await page.locator("div.col-text").textContent();
  expect(orderText).toContain(orderIdDetail);
});


