const { test, expect } = require('@playwright/test');

test('Playwright Special locators', async ({ page }) => {
  /* 사이트 접속 */
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  
  /* 항목 체크 */
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", {name: 'Submit'}).click();
  
  /* 제출 후 확인 */
  await page.getByText("The Form has been submitted successfully!").isVisible(); // true or false 값만 반환
  // 5 seconds default timeout for expect assertions --(timeout:10000) Step level
  // expect의 timeout 시간을 Step level로 조정하려면 method에서, Global level로 조정하러면 config에서 수정
  await expect( page.getByText("The Form has been submitted successfully!")).toBeVisible(); // 어서션 진행, expect의 timeout은 기본 5초
  

  await page.getByRole("link", {name: "Shop"}).click();

  /* Shop Page */
  await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
})

test('Playwright Test level timeout', async ({ page }) => {

  // Test level에서 test의 timeout 조정
  test.setTimeout(60000);
  // Test level에서 action의 timeout 조정
  page.setDefaultTimeout(9000);
  // Test level에서 expect의 timeout 조정
  const slowExpect = expect.configure({timeout : 9000});

  /* 사이트 접속 */
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  
  /* 항목 체크 */
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", {name: 'Submit'}).click();
  
  /* 제출 후 상단 메시지 확인 */
  await page.getByText("The Form has been submitted successfully!").isVisible(); // true or false 값만 반환
  // 5 seconds default timeout for exp ect assertions --(timeout:10000) Step level
  // expect의 timeout 시간을 Step level로 조정하려면 method에서, Global level로 조정하러면 config에서, Test level에서도 조정 가능
  await slowExpect(page.getByText("The Form has been submitted successfully!")).toBeVisible(); // 어서션 진행, expect의 timeout은 기본 5초
  
  /* 페이지 네비게이션 바 Shop 클릭 */
  await page.getByRole("link", {name: "Shop"}).click({timeout : 15000}); // action의 Step level timeout

  /* Shop Page */
  await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
  await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

  // timeout 우선순위
  // step > test > global
})