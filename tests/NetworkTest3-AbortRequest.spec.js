const { test, expect } = require('@playwright/test');
const { request } = require('http');

// 한 파일 내의 테스트는 순차적으로 진행된다.
test('Browser Playwright test', async ({ browser }) => {
    // browser 생성 시 cookie, plugin 등을 설정할 수 있으며, 아무것도 하지 않을 시 fresh한 브라우저 컨텍스트 생성
    const context = await browser.newContext();
    // 테스트가 수행될 실제 페이지
    const page = await context.newPage();

    // abort request
    page.route('**/*.{css, jpg, png, jpeg}', route => route.abort()); // 특정 주소로 연결될 시 요청을 중지함
    page.on('request', request => console.log(request.url())); // 모든 요청에 대하여 url 출력
    page.on('response', response => console.log(response.status())); // 모든 응답에 대하여 status 출력

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