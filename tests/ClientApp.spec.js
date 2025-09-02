const {test, expect} = require('@playwright/test');

test('Client App login', async ({ page }) => {
  // login
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("tysong0904@gmail.com");
  await page.locator("#userPassword").fill("Mingi!94");
  await page.locator("[value='Login']").click();
  
  /* dashboard */
  // allTextContents 메소드는 auto wait 기능이 없으므로, 요소가 state 될때까지 기다려야 한다.
  
  // 이를 위한 2가지 방법
  // 방법 1 : 브라우저에서 요소를 업로드하기 위한 network 통신이 끝나고 idle 상태임을 체크
  await page.waitForLoadState('networkidle'); 
  
  // 방법 2 : 해당 요소가 업 되었음을 체크
  await page.locator(".card-body b").first().waitFor(); 
  /************ */

  // get products titles
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  // add to cart
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if(await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click(); 
    }
  }

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


