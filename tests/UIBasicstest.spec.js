const {test, expect} = require('@playwright/test');

// 한 파일 내의 테스트는 순차적으로 진행된다.
test('Browser Playwright test', async ({browser}) => {
  // browser 생성 시 cookie, plugin 등을 설정할 수 있으며, 아무것도 하지 않을 시 fresh한 브라우저 컨텍스트 생성
  const context = await browser.newContext(); 
  // 테스트가 수행될 실제 페이지
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

test('Page playwright test', async ({ page }) => {
  // global parameter인 page를 넣게 되면 아무 설정이 되지 않은 fresh한 페이지가 생성된다.
  await page.goto("https://google.com");
  // get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
})

/* 
npx playwright 의미 : node module의 playwright 실행 파일 경로를 찾음.
test.only : 해당 테스트만 실행
--headed : headless 모드
*/

