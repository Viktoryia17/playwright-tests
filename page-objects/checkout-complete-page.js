class CheckoutCompletePage {
    constructor(page) {
        this.page = page;

        this.message = '.complete-header[data-test="complete-header"]';
        this.backButton = '#back-to-products';
    }

    async getCompletionMessage() {
        return this.page.locator(this.message).innerText();
    }

    async getGoHomeButton() {
        return this.page.locator(this.backButton).first();
    }
}

module.exports = { CheckoutCompletePage };