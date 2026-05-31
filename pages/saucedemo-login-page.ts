import { SauceDemoBasePage } from './base-page';
import { expect } from '@playwright/test';

export class SauceDemoLoginPage extends SauceDemoBasePage {
  // Selectors
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '[data-test="error"]';
  private readonly loginLogo = '.login_logo';
  private readonly botColumn = '.bot_column';
  private readonly loginCredentials = '.login_credentials';
  private readonly passwordInfo = '.login_password';

  async navigate(): Promise<void> {
    await this.navigateToSauceDemo();
  }

  async login(username: string, password: string): Promise<void> {
    await this.clearAndType(this.usernameInput, username);
    await this.clearAndType(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getUsernamePlaceholder(): Promise<string> {
    return await this.getAttribute(this.usernameInput, 'placeholder') || '';
  }

  async getPasswordPlaceholder(): Promise<string> {
    return await this.getAttribute(this.passwordInput, 'placeholder') || '';
  }

  async getErrorMessage(): Promise<string> {
    const isVisible = await this.isErrorMessageVisible();
    if (!isVisible) {
      return '';
    }
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.isVisible(this.errorMessage);
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.page.isEnabled(this.loginButton);
  }

  async getLoginButtonText(): Promise<string> {
    return await this.getAttribute(this.loginButton, 'value') || '';
  }

  // Verification methods
  async verifyLoginPageLoaded(): Promise<void> {
    await this.shouldBeVisible(this.loginLogo);
    await this.shouldBeVisible(this.usernameInput);
    await this.shouldBeVisible(this.passwordInput);
    await this.shouldBeVisible(this.loginButton);
    // bot_column is optional - may not always be present
    await this.shouldBeVisibleOptional(this.botColumn);
  }

  async verifyLoginCredentialsVisible(): Promise<void> {
    await this.shouldBeVisible(this.loginCredentials);
    await this.shouldBeVisible(this.passwordInfo);
  }

  async verifyErrorMessage(message: string): Promise<void> {
    await this.shouldContainText(this.errorMessage, message);
  }

  async verifyUsernamePlaceholder(expectedPlaceholder: string): Promise<void> {
    const actualPlaceholder = await this.getUsernamePlaceholder();
    expect(actualPlaceholder).toBe(expectedPlaceholder);
  }

  async verifyPasswordPlaceholder(expectedPlaceholder: string): Promise<void> {
    const actualPlaceholder = await this.getPasswordPlaceholder();
    expect(actualPlaceholder).toBe(expectedPlaceholder);
  }

  async verifyLoginButtonText(expectedText: string): Promise<void> {
    const actualText = await this.getLoginButtonText();
    expect(actualText).toBe(expectedText);
  }

  // Clear form
  async clearForm(): Promise<void> {
    await this.clearAndType(this.usernameInput, '');
    await this.clearAndType(this.passwordInput, '');
  }

  // Get page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Get URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Wait for specific elements
  async waitForLoginButton(): Promise<void> {
    await this.waitForElementVisible(this.loginButton);
  }

  async waitForErrorMessage(): Promise<void> {
    await this.waitForElementVisible(this.errorMessage);
  }

  // Keyboard interactions
  async pressEnterOnUsername(): Promise<void> {
    await this.page.press(this.usernameInput, 'Enter');
  }

  async pressEnterOnPassword(): Promise<void> {
    await this.page.press(this.passwordInput, 'Enter');
  }

  async pressTabOnUsername(): Promise<void> {
    await this.page.press(this.usernameInput, 'Tab');
  }

  // Form validation
  async isUsernameFieldEmpty(): Promise<boolean> {
    const value = await this.page.inputValue(this.usernameInput);
    return value === '';
  }

  async isPasswordFieldEmpty(): Promise<boolean> {
    const value = await this.page.inputValue(this.passwordInput);
    return value === '';
  }

  async getUsernameValue(): Promise<string> {
    return await this.page.inputValue(this.usernameInput);
  }

  async getPasswordValue(): Promise<string> {
    return await this.page.inputValue(this.passwordInput);
  }
}
