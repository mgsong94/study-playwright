const { test, expect } = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com"

let eventTitle;
let seatsBeforeBooking;
let seatsAfterBooking;

test('Create a new event', async ({ page }) => {
    await page.goto(BASE_URL + "/login");

    /* Login Page */
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.goto(BASE_URL + "/admin/events");

    /** New Event Page */
    eventTitle = 'Table Tennis ' + Date.now();
    await page.locator('#event-title-input').fill(eventTitle);
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

test('Find the event card and capture seats', async ({ page }) => {
    /* Login Page */
    await page.goto(BASE_URL + "/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    /* Events Page */
    await page.goto(BASE_URL + "/events");
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    console.log(await page.getByTestId('event-card').filter({ hasText: eventTitle }).allTextContents());
    const text = (await page.getByTestId('event-card').filter({ hasText: eventTitle }).locator('.text-emerald-600').textContent());
    seatsBeforeBooking = parseInt(text.match(/\d+/)[0]);
});

test('Booking', async ({ page }) => {
    /* Login Page */
    await page.goto(BASE_URL + "/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    /* Events Page */
    await page.goto(BASE_URL + "/events");
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    await page.getByTestId('event-card').filter({ hasText: eventTitle }).getByTestId('book-now-btn').click();

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
    console.log(await page.locator('#booking-card').allTextContents());
    await expect(page.locator('#booking-card').first()).toBeVisible();
    const cards = await page.getByTestId('booking-card').all();
    let matchedCard;
    for (const card of cards) {
        if (await card.locator('.booking-ref').textContent() === bookingRef) {
            matchedCard = card;
        }
    }

    await expect(matchedCard).toBeVisible();
    await expect(matchedCard.locator('h3')).toHaveText(eventTitle);
});

test('Verify seat reduction', async ({ page }) => {
    /* Login Page */
    await page.goto(BASE_URL + "/login");
    await page.getByPlaceholder("you@email.com").fill("mgsong9194@gmail.com");
    await page.getByLabel("password").fill("Mingi94$");
    await page.locator("#login-btn").click();

    /* Dashboard Page */
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    /* Events Page */
    await page.goto(BASE_URL + "/events");
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    const matchedEvent = page.getByTestId('event-card').filter({ hasText: eventTitle });

    await expect(matchedEvent).toBeVisible();
    const text = await matchedEvent.locator('.text-emerald-600').textContent();
    seatsAfterBooking = parseInt(text.match(/\d+/)[0]);
    await expect(seatsAfterBooking).toEqual(seatsBeforeBooking - 1);
});