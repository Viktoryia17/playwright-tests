// Импортируем 'test' и 'expect' из библиотеки Playwright
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/login-page');
const { InventoryPage } = require('../page-objects/innventory-page');
const { CartPage } = require('../page-objects/cart-page');
const { CheckoutStepOnePage } = require('../page-objects/checkout-step-one-page');
const { CheckoutStepTwoPage } = require('../page-objects/checkout-step-two-page');
const { CheckoutCompletePage } = require('../page-objects/checkout-complete-page');

// Описываем наш набор тестов
test.describe(' Автоматизация E2E сценария покупки с использование паттерна Page Object Model', () => {
    // Создаем тест-кейс
    test.only('Сквозной сценарий', async ({ page }) => {
        // 1. Открыть страницу логина

        const loginPage = new LoginPage(page);

        await loginPage.open();

        const isLoginButtonVisible = await page.isVisible(loginPage.loginButton);
        const isLoginFieldVisible = await page.isVisible(loginPage.usernameInput);
        const isPasswordFieldVisible = await page.isVisible(loginPage.passwordInput);

        expect(isLoginButtonVisible).toBeTruthy();
        expect(isLoginFieldVisible).toBeTruthy();
        expect(isPasswordFieldVisible).toBeTruthy();

        // 2. Залогиниться, используя валидные данные
        await loginPage.login('standard_user', 'secret_sauce');

        // 3. Убедиться, что после логина открылась страница с товарами
        const inventoryPage = new InventoryPage(page);

        const pageTitle = await inventoryPage.getPageTitle();
        expect(pageTitle).toBe('Products');

        // 4. Добавить в корзину самый дорогой товар на странице
        await inventoryPage.sortByPrice();
        await inventoryPage.addFirstItemToCart();
        const firstItemTitle = await inventoryPage.getFirstItemTitle();
        expect(firstItemTitle).toBeTruthy();

        // 5. Перейти в корзину.
        await inventoryPage.goToCartPage();

        // 6. Проверить, что в корзине находится именно тот товар, который вы добавили.
        const cartPage = new CartPage(page);

        const firstCartItemTitle = await cartPage.getFirstItemTitle();
        expect(firstCartItemTitle).toEqual(firstItemTitle);

        // 7. Начать оформление заказа (нажать "Checkout").
        await cartPage.goToCheckout();

        // 8. Заполнить информацию о пользователе
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');

        // 9. Продолжить оформление заказа (нажать "Continue").
        await checkoutStepOnePage.continue();

        // 10. Завершить покупку (нажать "Finish").
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.finishCheckout();

        // 11. Убедиться, что заказ успешно оформлен
        const checkoutCompletePage = new CheckoutCompletePage(page);
        const message = await checkoutCompletePage.getCompletionMessage();
        expect(message).toEqual('Thank you for your order!')

        const isButtonVisible = await page.isVisible(checkoutCompletePage.backButton);
        expect(isButtonVisible).toBe(true);
    });
});