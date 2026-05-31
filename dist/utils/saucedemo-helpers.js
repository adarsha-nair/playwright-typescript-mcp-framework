"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceDemoHelpers = void 0;
/**
 * SauceDemo-specific helper utilities
 */
class SauceDemoHelpers {
    /**
     * Wait for SauceDemo page to fully load
     */
    static async waitForSauceDemoLoad(page) {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500); // Wait for animations
    }
    /**
     * Check if SauceDemo is responsive
     */
    static async isSauceDemoResponsive(page) {
        try {
            const response = await page.goto('https://www.saucedemo.com', {
                waitUntil: 'domcontentloaded',
                timeout: 10000
            });
            return response?.status() === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Get current SauceDemo user type from URL or page state
     */
    static async getCurrentUserType(page) {
        const url = page.url();
        if (url.includes('inventory.html')) {
            // Check for visual user indicators
            const hasVisualIssues = await page.locator('.inventory_item_img').count() > 0;
            if (hasVisualIssues)
                return 'visual_user';
            // Check for problem user indicators
            const images = await page.locator('.inventory_item_img').all();
            for (const img of images) {
                const src = await img.getAttribute('src');
                if (src?.includes('sl-404'))
                    return 'problem_user';
            }
            return 'standard_user';
        }
        return 'unknown';
    }
    /**
     * Generate SauceDemo test data dynamically
     */
    static generateSauceDemoTestData(baseData) {
        return {
            ...baseData,
            // Add any dynamic data generation here
            products: baseData.products.map(product => ({
                ...product,
                // Add dynamic properties if needed
            }))
        };
    }
    /**
     * Validate SauceDemo page elements
     */
    static async validateSauceDemoPage(page, expectedTitle) {
        try {
            const title = await page.title();
            const hasLogo = await page.locator('.app_logo').isVisible();
            return title === expectedTitle && hasLogo;
        }
        catch {
            return false;
        }
    }
    /**
     * Get cart item count
     */
    static async getCartItemCount(page) {
        const badge = page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            const text = await badge.textContent();
            return parseInt(text || '0');
        }
        return 0;
    }
    /**
     * Wait for cart to update
     */
    static async waitForCartUpdate(page, expectedCount) {
        await page.waitForFunction((count) => {
            const badge = document.querySelector('.shopping_cart_badge');
            const currentCount = badge ? parseInt(badge.textContent || '0') : 0;
            return currentCount === count;
        }, expectedCount, { timeout: 5000 });
    }
    /**
     * Check if user is logged in
     */
    static async isLoggedIn(page) {
        return page.url().includes('inventory.html') &&
            await page.locator('.app_logo').isVisible();
    }
    /**
     * Get current page identifier
     */
    static async getCurrentPage(page) {
        const url = page.url();
        if (url.includes('inventory.html'))
            return 'inventory';
        if (url.includes('cart.html'))
            return 'cart';
        if (url.includes('checkout-step-one'))
            return 'checkout-step-one';
        if (url.includes('checkout-step-two'))
            return 'checkout-step-two';
        if (url.includes('checkout-complete'))
            return 'checkout-complete';
        if (url.includes('saucedemo.com/') && !url.includes('.html'))
            return 'login';
        return 'unknown';
    }
    /**
     * Format currency values for comparison
     */
    static formatCurrency(amount) {
        return parseFloat(amount.replace('$', ''));
    }
    /**
     * Calculate total price of items
     */
    static calculateTotal(prices) {
        return prices.reduce((total, price) => total + this.formatCurrency(price), 0);
    }
    /**
     * Wait for element to be stable (not moving)
     */
    static async waitForElementStability(page, selector, timeout = 5000) {
        await page.waitForSelector(selector, { state: 'attached', timeout });
        await page.waitForTimeout(200); // Wait for any animations to complete
    }
    /**
     * Take screenshot with proper naming
     */
    static async takeScreenshot(page, testName, step) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = step
            ? `saucedemo_${testName}_${step}_${timestamp}.png`
            : `saucedemo_${testName}_${timestamp}.png`;
        const path = `reports/screenshots/${filename}`;
        await page.screenshot({
            path,
            fullPage: true,
            animations: 'disabled'
        });
        return path;
    }
    /**
     * Log test step with timing
     */
    static async logStep(step, startTime) {
        const duration = Date.now() - startTime;
        console.log(`[SauceDemo] ${step} - ${duration}ms`);
    }
    /**
     * Retry function with exponential backoff
     */
    static async retry(fn, maxAttempts = 3, baseDelay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (attempt === maxAttempts)
                    break;
                const delay = baseDelay * Math.pow(2, attempt - 1);
                console.log(`Retry attempt ${attempt}/${maxAttempts} after ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
    /**
     * Check if element has specific CSS class
     */
    static async hasClass(page, selector, className) {
        const element = page.locator(selector);
        const classes = await element.getAttribute('class');
        return classes?.includes(className) || false;
    }
    /**
     * Get element text content safely
     */
    static async getTextSafely(page, selector) {
        try {
            return await page.textContent(selector) || '';
        }
        catch {
            return '';
        }
    }
    /**
     * Wait for network idle for SauceDemo
     */
    static async waitForNetworkIdle(page, timeout = 30000) {
        await page.waitForLoadState('networkidle', { timeout });
    }
}
exports.SauceDemoHelpers = SauceDemoHelpers;
//# sourceMappingURL=saucedemo-helpers.js.map