const {test, expect} = require('@playwright/test');

test('Client App login', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("tysong0904@gmail.com");
  await page.locator("#userPassword").fill("Mingi!94");
  await page.locator("[value='Login']").click();

  // dashboard
  // allTextContents 메소드는 auto wait 기능이 없으므로, 요소가 state 될때까지 기다려야 한다.
  
  // 이를 위한 2가지 방법
  // 방법 1 : 브라우저에서 요소를 업로드하기 위한 network 통신이 끝나고 idle 상태임을 체크
  await page.waitForLoadState('networkidle'); 
  
  // 방법 2 : 해당 요소가 업 되었음을 체크
  // await page.locator(".card-body b").first().waitFor(); 
  
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});


