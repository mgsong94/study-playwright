const { expect } = require("@playwright/test");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryPlaceholder = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator("section.ta-results");
        this.cvscodePlaceholder = page.locator(".field.small >> .input.txt").first();
        this.namePlaceholder = page.locator(".field .input.txt").nth(2);
        this.email = page.locator(".user__name label");
        this.submitButton = page.locator(".action__submit");
    }

    async searchAndSelectCountry(countryCode, countryName) {
        await this.countryPlaceholder.pressSequentially(countryCode, { delay: 150 });
        await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.countryDropdown.locator("button").nth(i).click();
            }
        }
    }

    async fillCvscode(cvscode) {
        await this.cvscodePlaceholder.fill(cvscode);
    }

    async fillName(name) {
        await this.namePlaceholder.fill(name);
    }

    async verifytEmail(username) {
        await expect(this.email).toHaveText(username);
    }

    async submit() {
        await this.submitButton.click();
    }

}

module.exports = { CheckoutPage }