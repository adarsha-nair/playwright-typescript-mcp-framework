import { SauceDemoBasePage } from './base-page';
import { expect } from '@playwright/test';

export class SauceDemoCartPage extends SauceDemoBasePage {
  // Selectors
  private readonly cartTitle = '.title';
  private readonly cartItem = '.cart_item';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly itemQuantity = '.cart_quantity';
  private readonly removeButton = '.cart_button';
  private readonly continueShoppingButton = '#continue-shopping';
  private readonly checkoutButton = '#checkout';
  private readonly cartBadge = '.shopping_cart_badge';

  async verifyCartPageLoaded(): Promise<void> {
    await this.shouldBeVisible(this.cartTitle);
    await this.shouldHaveText(this.cartTitle, 'Your Cart');
    await this.shouldBeVisible(this.continueShoppingButton);
    await this.shouldBeVisible(this.checkoutButton);
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.page.locator(this.cartItem).count();
    return items;
  }

  async getCartItemNames(): Promise<string[]> {
    const itemNames = await this.page.locator(this.itemName).allTextContents();
    return itemNames;
  }

  async getCartItemPrices(): Promise<string[]> {
    const itemPrices = await this.page.locator(this.itemPrice).allTextContents();
    return itemPrices;
  }

  async getCartItemQuantities(): Promise<string[]> {
    const quantities = await this.page.locator(this.itemQuantity).allTextContents();
    return quantities;
  }

  async getItemQuantity(itemName: string): Promise<string> {
    const item = this.page.locator(this.cartItem).filter({ hasText: itemName });
    const quantityElement = item.locator(this.itemQuantity);
    return await quantityElement.textContent() || '0';
  }

  async getItemPrice(itemName: string): Promise<string> {
    const item = this.page.locator(this.cartItem).filter({ hasText: itemName });
    const priceElement = item.locator(this.itemPrice);
    return await priceElement.textContent() || '';
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const itemNames = await this.getCartItemNames();
    return itemNames.includes(itemName);
  }

  async removeItem(itemName: string): Promise<void> {
    const item = this.page.locator(this.cartItem).filter({ hasText: itemName });
    const removeBtn = item.locator(this.removeButton);
    await removeBtn.click();
  }

  async removeItemByIndex(index: number): Promise<void> {
    const removeButtons = this.page.locator(this.removeButton);
    await removeButtons.nth(index).click();
  }

  async removeAllItems(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    for (let i = 0; i < itemCount; i++) {
      await this.removeItemByIndex(0);
    }
  }

  async clickContinueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }

  async clickCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async getCartTotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    return prices.reduce((total, price) => {
      const numericPrice = parseFloat(price.replace('$', ''));
      return total + numericPrice;
    }, 0);
  }

  async getCartBadgeCount(): Promise<string> {
    const badge = this.page.locator(this.cartBadge);
    return await badge.textContent() || '0';
  }

  // Verification methods
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  async verifyItemInCart(itemName: string): Promise<void> {
    const isPresent = await this.isItemInCart(itemName);
    expect(isPresent).toBe(true);
  }

  async verifyItemNotInCart(itemName: string): Promise<void> {
    const isPresent = await this.isItemInCart(itemName);
    expect(isPresent).toBe(false);
  }

  async verifyItemQuantity(itemName: string, expectedQuantity: string): Promise<void> {
    const actualQuantity = await this.getItemQuantity(itemName);
    expect(actualQuantity).toBe(expectedQuantity);
  }

  async verifyItemPrice(itemName: string, expectedPrice: string): Promise<void> {
    const actualPrice = await this.getItemPrice(itemName);
    expect(actualPrice).toBe(expectedPrice);
  }

  async verifyCartTotal(expectedTotal: number): Promise<void> {
    const actualTotal = await this.getCartTotal();
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  }

  async verifyCartIsEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    expect(itemCount).toBe(0);
  }

  async verifyContinueShoppingButtonEnabled(): Promise<void> {
    await this.shouldBeEnabled(this.continueShoppingButton);
  }

  async verifyCheckoutButtonEnabled(): Promise<void> {
    await this.shouldBeEnabled(this.checkoutButton);
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).toContain(expectedUrl);
  }

  // Utility methods
  async waitForCartToLoad(): Promise<void> {
    await this.waitForElementVisible(this.cartTitle);
  }

  async refreshCart(): Promise<void> {
    await this.reload();
    await this.waitForCartToLoad();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
