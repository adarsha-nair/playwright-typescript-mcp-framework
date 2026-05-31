"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceDemoLoginPage = void 0;
const base_page_1 = require("./base-page");
const test_1 = require("@playwright/test");
class SauceDemoLoginPage extends base_page_1.SauceDemoBasePage {
    constructor() {
        super(...arguments);
        // Selectors
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
        this.loginLogo = '.login_logo';
        this.botColumn = '.bot_column';
        this.loginCredentials = '.login_credentials';
        this.passwordInfo = '.login_password';
    }
    async navigate() {
        await this.navigateToSauceDemo();
    }
    async login(username, password) {
        await this.clearAndType(this.usernameInput, username);
        await this.clearAndType(this.passwordInput, password);
        await this.click(this.loginButton);
    }
    async getUsernamePlaceholder() {
        return await this.getAttribute(this.usernameInput, 'placeholder') || '';
    }
    async getPasswordPlaceholder() {
        return await this.getAttribute(this.passwordInput, 'placeholder') || '';
    }
    async getErrorMessage() {
        await this.waitForElementVisible(this.errorMessage);
        return await this.getText(this.errorMessage);
    }
    async isErrorMessageVisible() {
        return await this.page.isVisible(this.errorMessage);
    }
    async isLoginButtonEnabled() {
        return await this.page.isEnabled(this.loginButton);
    }
    async getLoginButtonText() {
        return await this.getAttribute(this.loginButton, 'value') || '';
    }
    // Verification methods
    async verifyLoginPageLoaded() {
        await this.shouldBeVisible(this.loginLogo);
        await this.shouldBeVisible(this.usernameInput);
        await this.shouldBeVisible(this.passwordInput);
        await this.shouldBeVisible(this.loginButton);
        await this.shouldBeVisible(this.botColumn);
    }
    async verifyLoginCredentialsVisible() {
        await this.shouldBeVisible(this.loginCredentials);
        await this.shouldBeVisible(this.passwordInfo);
    }
    async verifyErrorMessage(message) {
        await this.shouldContainText(this.errorMessage, message);
    }
    async verifyUsernamePlaceholder(expectedPlaceholder) {
        const actualPlaceholder = await this.getUsernamePlaceholder();
        (0, test_1.expect)(actualPlaceholder).toBe(expectedPlaceholder);
    }
    async verifyPasswordPlaceholder(expectedPlaceholder) {
        const actualPlaceholder = await this.getPasswordPlaceholder();
        (0, test_1.expect)(actualPlaceholder).toBe(expectedPlaceholder);
    }
    async verifyLoginButtonText(expectedText) {
        const actualText = await this.getLoginButtonText();
        (0, test_1.expect)(actualText).toBe(expectedText);
    }
    // Clear form
    async clearForm() {
        await this.clearAndType(this.usernameInput, '');
        await this.clearAndType(this.passwordInput, '');
    }
    // Get page title
    async getPageTitle() {
        return await this.page.title();
    }
    // Get URL
    async getCurrentUrl() {
        return this.page.url();
    }
    // Wait for specific elements
    async waitForLoginButton() {
        await this.waitForElementVisible(this.loginButton);
    }
    async waitForErrorMessage() {
        await this.waitForElementVisible(this.errorMessage);
    }
    // Keyboard interactions
    async pressEnterOnUsername() {
        await this.page.press(this.usernameInput, 'Enter');
    }
    async pressEnterOnPassword() {
        await this.page.press(this.passwordInput, 'Enter');
    }
    async pressTabOnUsername() {
        await this.page.press(this.usernameInput, 'Tab');
    }
    // Form validation
    async isUsernameFieldEmpty() {
        const value = await this.page.inputValue(this.usernameInput);
        return value === '';
    }
    async isPasswordFieldEmpty() {
        const value = await this.page.inputValue(this.passwordInput);
        return value === '';
    }
    async getUsernameValue() {
        return await this.page.inputValue(this.usernameInput);
    }
    async getPasswordValue() {
        return await this.page.inputValue(this.passwordInput);
    }
}
exports.SauceDemoLoginPage = SauceDemoLoginPage;
//# sourceMappingURL=saucedemo-login-page.js.map