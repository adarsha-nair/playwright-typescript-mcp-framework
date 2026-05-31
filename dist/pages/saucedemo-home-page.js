"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceDemoHomePage = void 0;
const base_page_1 = require("./base-page");
const test_1 = require("@playwright/test");
class SauceDemoHomePage extends base_page_1.SauceDemoBasePage {
    constructor() {
        super(...arguments);
        // Selectors
        this.appLogo = '.app_logo';
        this.shoppingCart = '.shopping_cart_link';
        this.menuButton = '#react-burger-menu-btn';
        this.inventoryContainer = '.inventory_container';
        this.inventoryItem = '.inventory_item';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
        this.addToCartButton = '.btn_inventory';
        this.sortDropdown = '.product_sort_container';
        this.footerText = '.footer_copy';
        this.twitterLink = '.social_twitter a';
        this.facebookLink = '.social_facebook a';
        this.linkedinLink = '.social_linkedin a';
    }
    async verifyHomePageLoaded() {
        await this.shouldBeVisible(this.appLogo);
        await this.shouldBeVisible(this.shoppingCart);
        await this.shouldBeVisible(this.inventoryContainer);
        await this.shouldBeVisible(this.sortDropdown);
    }
    async getPageTitle() {
        return await this.page.title();
    }
    async getCurrentUrl() {
        return this.page.url();
    }
    async getInventoryItemCount() {
        const items = await this.page.locator(this.inventoryItem).count();
        return items;
    }
    async getInventoryItemNames() {
        const itemNames = await this.page.locator(this.itemName).allTextContents();
        return itemNames;
    }
    async getInventoryItemPrices() {
        const itemPrices = await this.page.locator(this.itemPrice).allTextContents();
        return itemPrices;
    }
    async isItemVisible(itemName) {
        const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
        return await item.isVisible();
    }
    async getItemPrice(itemName) {
        const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
        const priceElement = item.locator(this.itemPrice);
        return await priceElement.textContent() || '';
    }
    async addToCart(itemName) {
        const item = this.page.locator(this.inventoryItem).filter({ hasText: itemName });
        const addToCartBtn = item.locator(this.addToCartButton);
        await addToCartBtn.click();
    }
    async addToCartByIndex(index) {
        const buttons = this.page.locator(this.addToCartButton);
        await buttons.nth(index).click();
    }
    async getCartBadgeCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        return await badge.textContent() || '0';
    }
    async clickShoppingCart() {
        await this.click(this.shoppingCart);
    }
    async clickMenuButton() {
        await this.click(this.menuButton);
    }
    async isMenuOpen() {
        const menu = this.page.locator('.bm-menu');
        return await menu.isVisible();
    }
    async selectSortOption(option) {
        await this.selectOption(this.sortDropdown, option);
    }
    async getSelectedSortOption() {
        return await this.page.inputValue(this.sortDropdown);
    }
    async getFooterText() {
        return await this.getText(this.footerText);
    }
    async clickTwitterLink() {
        await this.click(this.twitterLink);
    }
    async clickFacebookLink() {
        await this.click(this.facebookLink);
    }
    async clickLinkedinLink() {
        await this.click(this.linkedinLink);
    }
    // Verification methods
    async verifyInventoryItemsExist() {
        const itemCount = await this.getInventoryItemCount();
        (0, test_1.expect)(itemCount).toBeGreaterThan(0);
    }
    async verifySpecificItemExists(itemName) {
        const isPresent = await this.isItemVisible(itemName);
        (0, test_1.expect)(isPresent).toBe(true);
    }
    async verifyCartBadgeCount(expectedCount) {
        const actualCount = await this.getCartBadgeCount();
        (0, test_1.expect)(actualCount).toBe(expectedCount);
    }
    async verifyPageTitle(expectedTitle) {
        const actualTitle = await this.getPageTitle();
        (0, test_1.expect)(actualTitle).toBe(expectedTitle);
    }
    async verifyUrlContains(expectedUrl) {
        const currentUrl = await this.getCurrentUrl();
        (0, test_1.expect)(currentUrl).toContain(expectedUrl);
    }
    async verifyFooterTextContains(expectedText) {
        const footerText = await this.getFooterText();
        (0, test_1.expect)(footerText).toContain(expectedText);
    }
    async verifyItemsSortedByName(ascending = true) {
        const itemNames = await this.getInventoryItemNames();
        const sortedNames = [...itemNames].sort();
        if (!ascending) {
            sortedNames.reverse();
        }
        (0, test_1.expect)(itemNames).toEqual(sortedNames);
    }
    async verifyItemsSortedByPrice(ascending = true) {
        const itemPrices = await this.getInventoryItemPrices();
        const numericPrices = itemPrices.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => ascending ? a - b : b - a);
        (0, test_1.expect)(numericPrices).toEqual(sortedPrices);
    }
    // Utility methods
    async waitForInventoryToLoad() {
        await this.waitForElementVisible(this.inventoryContainer);
    }
    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }
    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
    async refreshPage() {
        await this.page.reload();
        await this.waitForInventoryToLoad();
    }
}
exports.SauceDemoHomePage = SauceDemoHomePage;
//# sourceMappingURL=saucedemo-home-page.js.map