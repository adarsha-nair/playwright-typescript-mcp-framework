import { SauceDemoBasePage } from './base-page';
import { expect } from '@playwright/test';

export class SauceDemoHomePage extends SauceDemoBasePage {
  // Selectors
  private readonly appLogo = '.app_logo';
  private readonly shoppingCart = '.shopping_cart_link';
  private readonly menuButton = '#react-burger-menu-btn';
  private readonly menuClose = '#react-burger-cross-btn';
  private readonly inventoryContainer = '.inventory_container';
  private readonly inventoryItem = '.inventory_item';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly addToCartButton = '.btn_inventory';
  private readonly sortDropdown = '.product_sort_container';
  private readonly footerText = '.footer_copy';
  private readonly twitterLink = '.social_twitter a';
  private readonly facebookLink = '.social_facebook a';
  private readonly linkedinLink = '.social_linkedin a';

  async verifyHomePageLoaded(): Promise<void> {
    await this.shouldBeVisible(this.appLogo);
    await this.shouldBeVisible(this.shoppingCart);
    await this.shouldBeVisible(this.inventoryContainer);
    await this.shouldBeVisible(this.sortDropdown);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getInventoryItemCount(): Promise<number> {
    const items = await this.page.locator(this.inventoryItem).count();
    return items;
  }

  async getInventoryItemNames(): Promise<string[]> {
    const itemNames = await this.page.locator(this.itemName).allTextContents();
    return itemNames;
  }

  async getInventoryItemPrices(): Promise<string[]> {
    const itemPrices = await this.page.locator(this.itemPrice).allTextContents();
    return itemPrices;
  }

  async isItemVisible(itemName: string): Promise<boolean> {
    const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
    return await item.isVisible();
  }

  async getItemPrice(itemName: string): Promise<string> {
    const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
    const priceElement = item.locator(this.itemPrice);
    return await priceElement.textContent() || '';
  }

  async addToCart(itemName: string): Promise<void> {
    const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
    const addToCartBtn = item.locator(this.addToCartButton);
    await addToCartBtn.click();
  }

  async addToCartByIndex(index: number): Promise<void> {
    const buttons = this.page.locator(this.addToCartButton);
    await buttons.nth(index).click();
  }

  async getCartBadgeCount(): Promise<string> {
    const badge = this.page.locator('.shopping_cart_badge');
    const isVisible = await badge.isVisible().catch(() => false);
    if (!isVisible) {
      return '0';
    }
    return await badge.textContent() || '0';
  }

  async clickShoppingCart(): Promise<void> {
    await this.click(this.shoppingCart);
  }

  async clickMenuButton(): Promise<void> {
    await this.click(this.menuButton);
  }
  async clickMenuClose(): Promise<void> {
    await this.click(this.menuClose);
  }

  async isMenuOpen(): Promise<boolean> {
    const menu = this.page.locator('.bm-item-list');
    return await menu.isVisible();
  }

  async selectSortOption(option: string): Promise<void> {
    await this.selectOption(this.sortDropdown, option);
  }

  async getSelectedSortOption(): Promise<string> {
    return await this.page.inputValue(this.sortDropdown);
  }

  async getFooterText(): Promise<string> {
    return await this.getText(this.footerText);
  }

  async clickTwitterLink(): Promise<void> {
    await this.click(this.twitterLink);
  }

  async clickFacebookLink(): Promise<void> {
    await this.click(this.facebookLink);
  }

  async clickLinkedinLink(): Promise<void> {
    await this.click(this.linkedinLink);
  }

  // Verification methods
  async verifyInventoryItemsExist(): Promise<void> {
    const itemCount = await this.getInventoryItemCount();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifySpecificItemExists(itemName: string): Promise<void> {
    const isPresent = await this.isItemVisible(itemName);
    expect(isPresent).toBe(true);
  }

  async verifyCartBadgeCount(expectedCount: string): Promise<void> {
    const actualCount = await this.getCartBadgeCount();
    expect(actualCount).toBe(expectedCount);
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).toContain(expectedUrl);
  }

  async verifyFooterTextContains(expectedText: string): Promise<void> {
    const footerText = await this.getFooterText();
    expect(footerText).toContain(expectedText);
  }

  async verifyItemsSortedByName(ascending: boolean = true): Promise<void> {
    const itemNames = await this.getInventoryItemNames();
    const sortedNames = [...itemNames].sort();
    if (!ascending) {
      sortedNames.reverse();
    }
    expect(itemNames).toEqual(sortedNames);
  }

  async verifyItemsSortedByPrice(ascending: boolean = true): Promise<void> {
    const itemPrices = await this.getInventoryItemPrices();
    const numericPrices = itemPrices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => ascending ? a - b : b - a);
    expect(numericPrices).toEqual(sortedPrices);
  }

  // Utility methods
  async waitForInventoryToLoad(): Promise<void> {
    await this.waitForElementVisible(this.inventoryContainer);
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.waitForInventoryToLoad();
  }
}
