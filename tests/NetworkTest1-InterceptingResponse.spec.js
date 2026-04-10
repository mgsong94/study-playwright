const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = { 
  userEmail: "tysong0904@gmail.com", 
  userPassword: "Mingi!94" 
}
const fakeOrdersPayload = {
  data: [],
  message: "No Orders"
}
const orderPayload = {
  orders: [{ "country": "Korea, Republic of", "productOrderedId": "68a961459320a140fe1ca57a" }]
}
let token;
let orderText;

// 로그인 토큰, 주문 정보 미리 저장
test.beforeAll(async() => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext);
  
  token = await apiUtils.getToken(loginPayload);
  orderText = await apiUtils.createOrder(orderPayload, token);
});

test('Check orders page', async ({ page }) => {
  // 로그인 토큰 값 브라우저3저장.
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);
  
  await page.goto("https://rahulshettyacademy.com/client/");

  // response intercepting 과정
  // API response > browser > playwright fake response > browser(기존 response를 덮어씌움) > render data on front-end

  // 해당 request url에 대한 fake response를 만들고 대기
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakeOrdersPayload);
    await route.fulfill({ body, response }); // fulfill : 브라우저에 응답을 보낼 때 값을 덮어씌우는 메소드. 만약 아무것도 넣지 않을 시, 원래의 응답값을 보낸다.
  });

  // click orders
  const ordersBtn = page.locator("button[routerlink*='myorders']");
  await ordersBtn.click();

  /* Orders Page*/
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); // 원래 응답을 기다림.
  console.log(await page.locator(".mt-4").textContent());
});


