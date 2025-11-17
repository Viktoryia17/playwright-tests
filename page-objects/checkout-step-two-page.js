class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.finishButton = '#finish';
    }

    async finishCheckout() {
        await this.page.locator(this.finishButton).click();
    }
}

module.exports = { CheckoutStepTwoPage };