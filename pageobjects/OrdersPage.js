class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }

    async waitFor() {
        await this.ordersTable.waitFor();
    }

    async searchOrderAndSelect(orderText) {    
        for (let i = 0; i < await this.rows.count(); i++) {
            const orderId = await this.rows.nth(i).locator("th").textContent();
            if (orderText.includes(orderId)) {
                console.log("Order Success!");
                await this.rows.nth(i).locator(".btn-primary:has-text('View')").click();
                break;
            }
        }
    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }
}

module.exports = { OrdersPage };