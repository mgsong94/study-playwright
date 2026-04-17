const {test, expect} = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com"

test('Create a new event', async ({page}) => {
    await page.goto(BASE_URL+"/login");
    
    /* Login Page */
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.goto(BASE_URL+"/admin/events");

    /** New Event Page */
    await page.locator('#event-title-input').fill('Table Tennis');
    await page.locator('#admin-event-form textarea').fill('Table tennis competition');
    await page.getByLabel('city').fill('Paju');
    await page.getByLabel('venue').fill('Unjeong Jungangro 200');
    await page.getByLabel('Event Date & Time').click();
    await page.keyboard.type('0020260425');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.type('0900');

    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Event created!')).toBeVisible();

    
});

test('Find the event card and capture seats', async({page}) => {
    /* Login Page */
    await page.goto(BASE_URL+"/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    /* Events Page */
    await page.goto(BASE_URL+"/events");
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    console.log(await page.getByTestId('event-card').filter({ hasText: 'Table Tennis' }).allTextContents());
    const text = (await page.getByTestId('event-card').filter({ hasText: 'Table Tennis' }).locator('.text-emerald-600').textContent());
    const seatsBeforeBooking = text.match(/\d+/)[0];
});

test.only('Booking', async({page}) => {
    /* Login Page */
    await page.goto(BASE_URL+"/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    /* Events Page */
    await page.goto(BASE_URL+"/events");
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    await page.getByTestId('event-card').filter({ hasText: 'Table Tennis' }).getByTestId('book-now-btn').click();

    /** Booking Page */
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel('Full Name').fill('mingi');
    await page.locator('#customer-email').fill('mingi9194@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('01012345678');
    await page.locator('.confirm-booking-btn').click();

    await expect(page.locator('.booking-ref').first()).toBeVisible();
    const bookingRef = await page.locator('.booking-ref').first().textContent();
    bookingRef.trim();

    await page.getByText('View My Bookings').click();

    /** My Bookings Page */
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
});