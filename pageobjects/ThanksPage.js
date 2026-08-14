const { expect } = require("@playwright/test");

class ThanksPage {
    constructor(page) {
        this.page = this.page;
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderText = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async confirmAndGetOrderId() {
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderText.textContent();
    }
}

module.exports = { ThanksPage }