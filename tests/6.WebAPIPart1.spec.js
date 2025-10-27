const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = { 
  userEmail: "tysong0904@gmail.com", 
  userPassword: "Mingi!94" 
}
const orderPayload = {
  orders: [{ "country": "Korea, Republic of", "productOrderedId": "68a961459320a140fe1ca57a" }]
}
let token;
let orderText;

test.beforeAll(async() => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext);
  
  token = await apiUtils.getToken(loginPayload);
  orderText = await apiUtils.createOrder(orderPayload, token);
});

test('Check the order', async ({ page }) => {
  // 로그인 토큰 값 저장.
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token)
  
  await page.goto("https://rahulshettyacademy.com/client/");

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
  await page.pause();
  expect(orderText).toContain(orderIdDetail);
  
});


