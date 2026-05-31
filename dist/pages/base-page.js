"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceDemoBasePage = void 0;
const test_1 = require("@playwright/test");
const environments_1 = require("../config/environments");
class SauceDemoBasePage {
    constructor(page) {
        this.env = (0, environments_1.getSauceDemoEnvironment)();
        this.page = page;
    }
    // SauceDemo-specific navigation
    async navigateToSauceDemo() {
        await this.page.goto(this.env.baseUrl);
        await this.page.waitForLoadState('networkidle');
    }
    async reload() {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
    }
    // Element interaction methods optimized for SauceDemo
    async click(selector) {
        await this.page.click(selector);
        await this.page.waitForTimeout(100); // Small delay for SauceDemo UI
    }
    async type(selector, text) {
        await this.page.fill(selector, text);
    }
    async clearAndType(selector, text) {
        await this.page.fill(selector, '');
        await this.page.type(selector, text);
    }
    async selectOption(selector, value) {
        await this.page.selectOption(selector, value);
        await this.page.waitForTimeout(200); // Wait for filter to apply
    }
    // Wait methods with SauceDemo timeouts
    async waitForElementVisible(selector, timeout) {
        await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout: timeout || this.env.timeout
        });
    }
    async waitForElementHidden(selector, timeout) {
        await this.page.waitForSelector(selector, {
            state: 'hidden',
            timeout: timeout || this.env.timeout
        });
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    // Get methods
    async getText(selector) {
        return await this.page.textContent(selector) || '';
    }
    async getValue(selector) {
        return await this.page.inputValue(selector);
    }
    async getAttribute(selector, attribute) {
        return await this.page.getAttribute(selector, attribute);
    }
    async getInnerText(selector) {
        return await this.page.innerText(selector);
    }
    async getAllTextContents(selector) {
        return await this.page.locator(selector).allTextContents();
    }
    // Verification methods
    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }
    async isEnabled(selector) {
        return await this.page.isEnabled(selector);
    }
    async shouldContainText(selector, expectedText) {
        await (0, test_1.expect)(this.page.locator(selector)).toContainText(expectedText);
    }
    async shouldHaveText(selector, expectedText) {
        await (0, test_1.expect)(this.page.locator(selector)).toHaveText(expectedText);
    }
    async shouldBeVisible(selector) {
        await (0, test_1.expect)(this.page.locator(selector)).toBeVisible();
    }
    async shouldBeHidden(selector) {
        await (0, test_1.expect)(this.page.locator(selector)).toBeHidden();
    }
    async shouldBeEnabled(selector) {
        await (0, test_1.expect)(this.page.locator(selector)).toBeEnabled();
    }
    async shouldBeDisabled(selector) {
        await (0, test_1.expect)(this.page.locator(selector)).toBeDisabled();
    }
    // Keyboard and mouse actions for SauceDemo
    async press(key) {
        await this.page.keyboard.press(key);
    }
    async hover(selector) {
        await this.page.hover(selector);
    }
    async scrollToElement(selector) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }
    // SauceDemo-specific utility methods
    async waitForSauceDemoLoad() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(500); // Wait for SauceDemo animations
    }
    async getCurrentUrl() {
        return this.page.url();
    }
    async getPageTitle() {
        return await this.page.title();
    }
    async isOnLoginPage() {
        const url = await this.getCurrentUrl();
        return url.includes('saucedemo.com/') && !url.includes('inventory.html');
    }
    async isOnInventoryPage() {
        const url = await this.getCurrentUrl();
        return url.includes('inventory.html');
    }
    async isOnCartPage() {
        const url = await this.getCurrentUrl();
        return url.includes('cart.html');
    }
    async isOnCheckoutPage() {
        const url = await this.getCurrentUrl();
        return url.includes('checkout-step');
    }
    async isOnCompletePage() {
        const url = await this.getCurrentUrl();
        return url.includes('checkout-complete.html');
    }
    // Error handling for SauceDemo
    async getErrorMessage() {
        const errorSelector = '[data-test="error"]';
        if (await this.isVisible(errorSelector)) {
            return await this.getText(errorSelector);
        }
        return '';
    }
    async hasError() {
        return await this.isVisible('[data-test="error"]');
    }
    async dismissError() {
        const errorButton = '[data-test="error"] button';
        if (await this.isVisible(errorButton)) {
            await this.click(errorButton);
        }
    }
    // Screenshot methods
    async takeScreenshot(path) {
        await this.page.screenshot({
            path,
            fullPage: true,
            animations: 'disabled'
        });
    }
    async takeElementScreenshot(selector, path) {
        await this.page.locator(selector).screenshot({
            path,
            animations: 'disabled'
        });
    }
}
exports.SauceDemoBasePage = SauceDemoBasePage;
//# sourceMappingURL=base-page.js.map