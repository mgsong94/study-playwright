const { test, expect, request } = require('@playwright/test');
const loginPayload = {
    userEmail: "mgsong9194@gmail.com",
    userPassword: "Mingi94$"
}

const SIX_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
        { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
        { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

test('6 Events', async ({ page }) => {
    /* 로그인 페이지 */
    await page.goto("https://eventhub.rahulshettyacademy.com");

    await page.getByLabel("Email").fill(loginPayload.userEmail);
    await page.getByLabel("Password").fill(loginPayload.userPassword);
    await page.getByRole("button", {name : "Sign In"}).click();
    await page.waitForLoadState('networkidle'); 

    // response intercepting 과정
    // API response > browser > playwright fake response > browser(기존 response를 덮어씌움) > render data on front-end

    // 해당 request url에 대한 fake response를 만들고 대기
    await page.route("**/api/events**", async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(SIX_EVENTS_RESPONSE);
        await route.fulfill({ body, response }); // fulfill : 브라우저에 응답을 보낼 때 값을 덮어씌우는 메소드. 만약 아무것도 넣지 않을 시, 원래의 응답값을 보낸다.
    });
    
    /* 이벤트 페이지 */
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    await expect(page.getByTestId("event-card")).toHaveCount(6)

    await expect(page.getByText(/sandbox holds up to/)).toBeVisible();
    await expect(page.getByText(/sandbox holds up to/)).toContainText("9 bookings");
})

test('4 Events', async ({ page }) => {
    /* 로그인 페이지 */
    await page.goto("https://eventhub.rahulshettyacademy.com");

    await page.getByLabel("Email").fill(loginPayload.userEmail);
    await page.getByLabel("Password").fill(loginPayload.userPassword);
    await page.getByRole("button", {name : "Sign In"}).click();
    await page.waitForLoadState('networkidle'); 

    // response intercepting 과정
    // API response > browser > playwright fake response > browser(기존 response를 덮어씌움) > render data on front-end

    // 해당 request url에 대한 fake response를 만들고 대기
    await page.route("**/api/events**", async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(FOUR_EVENTS_RESPONSE);
        await route.fulfill({ body, response }); // fulfill : 브라우저에 응답을 보낼 때 값을 덮어씌우는 메소드. 만약 아무것도 넣지 않을 시, 원래의 응답값을 보낸다.
    });
    
    /* 이벤트 페이지 */
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    await expect(page.getByTestId("event-card")).toHaveCount(4)

    await expect(page.getByText(/sandbox holds up to/)).not.toBeVisible();
})