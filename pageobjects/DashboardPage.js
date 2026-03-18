class DashboardPage {
  constructor(page) {
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cartBtn = page.locator("[routerlink='/dashboard/cart']");
  }

  async addProduct(productName) {
    // log titles
    const titles = await this.productsText.allTextContents();
    console.log(titles);

    // search product
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
        await this.products.nth(i).locator("text= Add To Cart").click();
      }
    }
  }

  async navigateToCart() {
    await this.cartBtn.click();
  }
}

module.exports = { DashboardPage };