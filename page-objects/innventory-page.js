class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = '.inventory_item';
        this.cartIcon = '#shopping_cart_container';
        this.title = '.title[data-test="title"]';
        this.sorting = '.product_sort_container[data-test="product-sort-container"]';
        this.itemTitle = '.inventory_list .inventory_item_name[data-test="inventory-item-name"]';
        this.addToCartButton = '.inventory_list .btn_inventory';
        this.goToCartButton = '.shopping_cart_link[data-test="shopping-cart-link"]';
    }

    async addFirstItemToCart() {
        await this.page.locator(this.addToCartButton).first().click();
    }

    async openCart() {
        await this.page.click(this.cartIcon);
    }

    async getPageTitle() {
        return this.page.locator(this.title).innerText();
    }

    async sortByPrice() {
        await this.page.selectOption(this.sorting, 'hilo');
    }

    async getFirstItemTitle() {
        return this.page.locator(this.itemTitle).first().innerText();
    }

    async goToCartPage() {
        await this.page.locator(this.goToCartButton).click();
    }
}

module.exports = { InventoryPage };