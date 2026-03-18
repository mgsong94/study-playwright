const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll( async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // navigate
  await page.goto("https://rahulshettyacademy.com/client");

  /* Login Page */
  await page.getByPlaceholder("email@example.com").fill("tysong0904@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Mingi!94");
  await page.getByRole("button", { name: "login" }).click();
  
  /* 요소 로딩 기다림 **/
  await page.waitForLoadState('networkidle'); 
  await page.locator(".card-body b").first().waitFor(); 

  /* 브라우저 스토리지 정보 저장 */
  await context.storageState({path: 'state.json'});
  webContext = await browser.newContext({storageState: 'state.json'});
})

test('Lets Shop Web', async () => {
  const page = await webContext.newPage();

  // navigate
  await page.goto("https://rahulshettyacademy.com/client");

  // add to cart
  const product1 = page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add To Cart"}).click();

  await page.pause();

  const cartBtn = page.locator("[routerlink='/dashboard/cart']");
  await cartBtn.click();

  // cart page
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

test('Test 2', async () => {
  const page = await webContext.newPage();

  // navigate
  await page.goto("https://rahulshettyacademy.com/client");

  // add to cart
  const product1 = page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add To Cart" }).click();

  await page.pause();
})


