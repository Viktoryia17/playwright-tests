class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';
        this.continueButton = '#continue';
    }

    async fillUserInfo(firstName, lastName, postalCode) {
        await this.page.fill(this.firstName, firstName);
        await this.page.fill(this.lastName, lastName);
        await this.page.fill(this.postalCode, postalCode);
    }

    async continue() {
        return this.page.locator(this.continueButton).click();
    }
}

module.exports = { CheckoutStepOnePage };