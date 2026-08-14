const { Cartpage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrdersPage } = require("./OrdersPage");
const { ThanksPage } = require("./ThanksPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new Cartpage(page);
        this.ordersPage = new OrdersPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.thanksPage = new ThanksPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getThanksPage() {
        return this.thanksPage;
    }
}

module.exports = { POManager };