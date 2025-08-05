const {test, expect} = require('@playwright/test');

// 한 파일 내의 테스트는 순차적으로 진행된다.
test('Browser Playwright test', async ({browser}) => {
  // browser 생성 시 cookie, plugin 등을 설정할 수 있으며, 아무것도 하지 않을 시 fresh한 브라우저 컨텍스트 생성
  const context = await browser.newContext(); 
  // 테스트가 수행될 실제 페이지
  const page = await context.newPage();

  // locator
  const username = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  // go login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  // input wrong username
  await username.fill("rahulshetty"); // wrong username
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent()); // 최대 30초까지 기다린다. playwright 설정에 따라

  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  // input correct username
  await username.fill(""); 
  await username.fill("rahulshettyacademy");
  await signIn.click();

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(0).textContent());
  // allTextContents의 경우에는 리턴 값이 배열이므로, 모든 요소들이 attached 될 때까지 기다리지 않아 fail도 되지 않는다.
  console.log(await cardTitles.allTextContents()); 
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

/* How to write locator

If Id is present
css -> tagname#id (or) #id

If class attribute is present
css -> tagname.class (or) .class

Write css based on any Attribute
css -> [attribute='value']

Write css with traversing from parent to child
css -> parenttagname >> childtagname

If needs to write the locator based on text
text=''
*/

