class CartPage {
    constructor(page) {
        this.page = page;
        this.firstItemTitle = '.inventory_item_name[data-test="inventory-item-name"]';
        this.checkoutButton = '#checkout';
    }

    async getFirstItemTitle() {
        return this.page.locator(this.firstItemTitle).innerText();
    }

    async goToCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }
}

module.exports = { CartPage };