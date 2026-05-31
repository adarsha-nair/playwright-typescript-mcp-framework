import { Page, Locator, expect } from '@playwright/test';
import { getSauceDemoEnvironment } from '../config/environments';

export class SauceDemoBasePage {
  protected page: Page;
  protected env = getSauceDemoEnvironment();

  constructor(page: Page) {
    this.page = page;
  }

  // SauceDemo-specific navigation
  async navigateToSauceDemo(): Promise<void> {
    await this.page.goto(this.env.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async reload(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  // Element interaction methods optimized for SauceDemo
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
    await this.page.waitForTimeout(100); // Small delay for SauceDemo UI
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async clearAndType(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, '');
    await this.page.type(selector, text);
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
    await this.page.waitForTimeout(200); // Wait for filter to apply
  }

  // Wait methods with SauceDemo timeouts
  async waitForElementVisible(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout: timeout || this.env.timeout 
    });
  }

  async waitForElementHidden(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, { 
      state: 'hidden', 
      timeout: timeout || this.env.timeout 
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Get methods
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async getValue(selector: string): Promise<string> {
    return await this.page.inputValue(selector);
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  async getInnerText(selector: string): Promise<string> {
    return await this.page.innerText(selector);
  }

  async getAllTextContents(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allTextContents();
  }

  // Verification methods
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isElementFocused(selector: string): Promise<boolean> {
    return await this.page.locator(selector).evaluate(el => document.activeElement === el);
  }

  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.isEnabled(selector);
  }

  async shouldContainText(selector: string, expectedText: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(expectedText);
  }

  async shouldHaveText(selector: string, expectedText: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  async shouldBeVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async shouldBeVisibleOptional(selector: string): Promise<void> {
    const locator = this.page.locator(selector);
    const isVisible = await locator.isVisible().catch(() => false);
    if (isVisible) {
      await expect(locator).toBeVisible();
    }
    // If not visible, just continue - it's optional
  }

  async shouldBeHidden(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeHidden();
  }

  async shouldBeEnabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeEnabled();
  }

  async shouldBeDisabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeDisabled();
  }

  // Keyboard and mouse actions for SauceDemo
  async press(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  // SauceDemo-specific utility methods
  async waitForSauceDemoLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500); // Wait for SauceDemo animations
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isOnLoginPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('saucedemo.com/') && !url.includes('inventory.html');
  }

  async isOnInventoryPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('inventory.html');
  }

  async isOnCartPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('cart.html');
  }

  async isOnCheckoutPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('checkout-step');
  }

  async isOnCompletePage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('checkout-complete.html');
  }

  // Error handling for SauceDemo
  async getErrorMessage(): Promise<string> {
    const errorSelector = '[data-test="error"]';
    if (await this.isVisible(errorSelector)) {
      return await this.getText(errorSelector);
    }
    return '';
  }

  async hasError(): Promise<boolean> {
    return await this.isVisible('[data-test="error"]');
  }

  async dismissError(): Promise<void> {
    const errorButton = '[data-test="error"] button';
    if (await this.isVisible(errorButton)) {
      await this.click(errorButton);
    }
  }

  // Screenshot methods
  async takeScreenshot(path?: string): Promise<void> {
    await this.page.screenshot({ 
      path, 
      fullPage: true,
      animations: 'disabled'
    });
  }

  async takeElementScreenshot(selector: string, path?: string): Promise<void> {
    await this.page.locator(selector).screenshot({ 
      path,
      animations: 'disabled'
    });
  }
}
