import { SauceDemoBasePage } from './base-page';
import { expect } from '@playwright/test';

export class SauceDemoOrderCompletionPage extends SauceDemoBasePage {
  // Selectors
  private readonly completeHeader = '.complete-header';
  private readonly completeText = '.complete-text';
  private readonly ponyExpressImage = '.pony_express';
  private readonly backToProductsButton = '#back-to-products';
  private readonly pageHeader = '.title';

  async verifyOrderCompletionPageLoaded(): Promise<void> {
    await this.shouldBeVisible(this.completeHeader);
    await this.shouldBeVisible(this.completeText);
    await this.shouldBeVisible(this.ponyExpressImage);
    await this.shouldBeVisible(this.backToProductsButton);
  }

  async getOrderCompletionMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  async getOrderCompletionText(): Promise<string> {
    return await this.getText(this.completeText);
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this.isVisible(this.ponyExpressImage);
  }

  async clickBackToProducts(): Promise<void> {
    await this.click(this.backToProductsButton);
  }

  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageHeader);
  }

  // Verification methods
  async verifyOrderCompletionMessage(expectedMessage: string): Promise<void> {
    const actualMessage = await this.getOrderCompletionMessage();
    expect(actualMessage).toBe(expectedMessage);
  }

  async verifyOrderCompletionText(expectedText: string): Promise<void> {
    const actualText = await this.getOrderCompletionText();
    expect(actualText).toBe(expectedText);
  }

  async verifyPonyExpressImageDisplayed(): Promise<void> {
    const isVisible = await this.isPonyExpressImageVisible();
    expect(isVisible).toBe(true);
  }

  async verifyBackToProductsButtonEnabled(): Promise<void> {
    await this.shouldBeEnabled(this.backToProductsButton);
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).toContain(expectedUrl);
  }

  async verifySuccessfulOrderCompletion(): Promise<void> {
    await this.verifyOrderCompletionMessage('Thank you for your order!');
    await this.verifyOrderCompletionText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await this.verifyPonyExpressImageDisplayed();
    await this.verifyBackToProductsButtonEnabled();
  }

  async verifyPageHeader(expectedHeader: string): Promise<void> {
    await this.shouldHaveText(this.pageHeader, expectedHeader);
  }

  // Utility methods
  async waitForOrderCompletionPageToLoad(): Promise<void> {
    await this.waitForElementVisible(this.completeHeader);
  }

  async refreshOrderCompletionPage(): Promise<void> {
    await this.reload();
    await this.waitForOrderCompletionPageToLoad();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async takeOrderCompletionScreenshot(path?: string): Promise<void> {
    await this.takeScreenshot(path);
  }

  async waitForPonyExpressImage(): Promise<void> {
    await this.waitForElementVisible(this.ponyExpressImage);
  }

  // Order verification methods
  async verifyOrderCompletedSuccessfully(): Promise<boolean> {
    try {
      await this.verifyOrderCompletionPageLoaded();
      const message = await this.getOrderCompletionMessage();
      return message.includes('Thank you for your order');
    } catch (error) {
      return false;
    }
  }

  async getOrderCompletionDetails(): Promise<{
    header: string;
    text: string;
    isImageVisible: boolean;
    isBackButtonEnabled: boolean;
  }> {
    return {
      header: await this.getOrderCompletionMessage(),
      text: await this.getOrderCompletionText(),
      isImageVisible: await this.isPonyExpressImageVisible(),
      isBackButtonEnabled: await this.isEnabled(this.backToProductsButton)
    };
  }

  async verifyAllOrderCompletionElements(): Promise<void> {
    const details = await this.getOrderCompletionDetails();
    
    expect(details.header).toBe('Thank you for your order!');
    expect(details.text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    expect(details.isImageVisible).toBe(true);
    expect(details.isBackButtonEnabled).toBe(true);
  }
}
