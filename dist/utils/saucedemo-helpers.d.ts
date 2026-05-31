import { Page } from '@playwright/test';
import { SauceDemoTestData } from '../config/saucedemo-test-data';
/**
 * SauceDemo-specific helper utilities
 */
export declare class SauceDemoHelpers {
    /**
     * Wait for SauceDemo page to fully load
     */
    static waitForSauceDemoLoad(page: Page): Promise<void>;
    /**
     * Check if SauceDemo is responsive
     */
    static isSauceDemoResponsive(page: Page): Promise<boolean>;
    /**
     * Get current SauceDemo user type from URL or page state
     */
    static getCurrentUserType(page: Page): Promise<string>;
    /**
     * Generate SauceDemo test data dynamically
     */
    static generateSauceDemoTestData(baseData: SauceDemoTestData): SauceDemoTestData;
    /**
     * Validate SauceDemo page elements
     */
    static validateSauceDemoPage(page: Page, expectedTitle: string): Promise<boolean>;
    /**
     * Get cart item count
     */
    static getCartItemCount(page: Page): Promise<number>;
    /**
     * Wait for cart to update
     */
    static waitForCartUpdate(page: Page, expectedCount: number): Promise<void>;
    /**
     * Check if user is logged in
     */
    static isLoggedIn(page: Page): Promise<boolean>;
    /**
     * Get current page identifier
     */
    static getCurrentPage(page: Page): Promise<string>;
    /**
     * Format currency values for comparison
     */
    static formatCurrency(amount: string): number;
    /**
     * Calculate total price of items
     */
    static calculateTotal(prices: string[]): number;
    /**
     * Wait for element to be stable (not moving)
     */
    static waitForElementStability(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Take screenshot with proper naming
     */
    static takeScreenshot(page: Page, testName: string, step?: string): Promise<string>;
    /**
     * Log test step with timing
     */
    static logStep(step: string, startTime: number): Promise<void>;
    /**
     * Retry function with exponential backoff
     */
    static retry<T>(fn: () => Promise<T>, maxAttempts?: number, baseDelay?: number): Promise<T>;
    /**
     * Check if element has specific CSS class
     */
    static hasClass(page: Page, selector: string, className: string): Promise<boolean>;
    /**
     * Get element text content safely
     */
    static getTextSafely(page: Page, selector: string): Promise<string>;
    /**
     * Wait for network idle for SauceDemo
     */
    static waitForNetworkIdle(page: Page, timeout?: number): Promise<void>;
}
//# sourceMappingURL=saucedemo-helpers.d.ts.map