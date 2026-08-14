const {test, expect} = require('@playwright/test');

class Cartpage {
    constructor(page) {
        this.page = page;
        this.cartProduct = page.locator("div li").first();
        this.cartProductsText = page.locator(".card-body b");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartProduct.waitFor(); // 요소들이 모두 로딩될 때까지 기다림
        const bool = await this.getCartProduct(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getCartProduct(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { Cartpage };