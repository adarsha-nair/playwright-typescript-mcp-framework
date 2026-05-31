import { test, expect } from '../fixtures/saucedemo-fixture';
import { SauceDemoOrderCompletionPage } from '../pages/saucedemo-order-completion-page';
import { SauceDemoCartPage } from '../pages/saucedemo-cart-page';
import { SauceDemoCheckoutPage } from '../pages/saucedemo-checkout-page';

test.describe('SauceDemo Order Completion Page Tests', () => {
  let orderCompletionPage: SauceDemoOrderCompletionPage;

  test.beforeEach(async ({ page, sauceDemoLoginPage, sauceDemoHomePage }) => {
    orderCompletionPage = new SauceDemoOrderCompletionPage(page);
    
    // Complete full checkout flow
    await sauceDemoLoginPage.navigateToSauceDemo();
    await sauceDemoLoginPage.login('standard_user', 'secret_sauce');
    await sauceDemoHomePage.waitForInventoryToLoad();
    
    // Add items and navigate through checkout
    await sauceDemoHomePage.addToCart('Sauce Labs Backpack');
    await sauceDemoHomePage.addToCart('Sauce Labs Bike Light');
    await sauceDemoHomePage.clickShoppingCart();
    
    const cartPage = new SauceDemoCartPage(page);
    await cartPage.waitForCartToLoad();
    await cartPage.clickCheckout();
    
    const checkoutPage = new SauceDemoCheckoutPage(page);
    await checkoutPage.waitForCheckoutStepOneToLoad();
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.waitForCheckoutStepTwoToLoad();
    await checkoutPage.clickFinish();
    
    await orderCompletionPage.waitForOrderCompletionPageToLoad();
  });

  test.describe('Page Load and Navigation', () => {
    test('should load order completion page successfully', async ({ page }) => {
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
      await orderCompletionPage.verifyPageTitle('Checkout: Complete!');
      await orderCompletionPage.verifyUrlContains('checkout-complete.html');
    });

    test('should display correct page title', async ({ page }) => {
      const title = await orderCompletionPage.getPageTitle();
      expect(title).toBe('Checkout: Complete!');
    });

    test('should contain correct URL', async ({ page }) => {
      const url = await orderCompletionPage.getCurrentUrl();
      expect(url).toContain('checkout-complete.html');
    });
  });

  test.describe('Order Completion Elements', () => {
    test('should display success message', async ({ page }) => {
      const message = await orderCompletionPage.getOrderCompletionMessage();
      expect(message).toBe('Thank you for your order!');
    });

    test('should display order completion text', async ({ page }) => {
      const text = await orderCompletionPage.getOrderCompletionText();
      expect(text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('should display pony express image', async ({ page }) => {
      const isVisible = await orderCompletionPage.isPonyExpressImageVisible();
      expect(isVisible).toBe(true);
      
      await orderCompletionPage.verifyPonyExpressImageDisplayed();
    });

    test('should display back to products button', async ({ page }) => {
      await orderCompletionPage.verifyBackToProductsButtonEnabled();
    });
  });

  test.describe('Order Verification', () => {
    test('should verify successful order completion', async ({ page }) => {
      const isCompleted = await orderCompletionPage.verifyOrderCompletedSuccessfully();
      expect(isCompleted).toBe(true);
    });

    test('should verify all order completion elements', async ({ page }) => {
      await orderCompletionPage.verifyAllOrderCompletionElements();
    });

    test('should get order completion details correctly', async ({ page }) => {
      const details = await orderCompletionPage.getOrderCompletionDetails();
      
      expect(details.header).toBe('Thank you for your order!');
      expect(details.text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
      expect(details.isImageVisible).toBe(true);
      expect(details.isBackButtonEnabled).toBe(true);
    });

    test('should display page header correctly', async ({ page }) => {
      await orderCompletionPage.verifyPageHeader('Checkout: Complete!');
    });
  });

  test.describe('Navigation Functionality', () => {
    test('should navigate back to products when button clicked', async ({ page }) => {
      await orderCompletionPage.clickBackToProducts();
      
      // Verify navigation back to inventory
      const url = await orderCompletionPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });

    test('should handle navigation correctly after completion', async ({ page }) => {
      // Navigate back and forth
      await page.goBack();
      await page.waitForTimeout(500);
      await page.goForward();
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      
      // Verify page is still functional
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle page refresh gracefully', async ({ page }) => {
      await orderCompletionPage.refreshOrderCompletionPage();
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
      
      const message = await orderCompletionPage.getOrderCompletionMessage();
      expect(message).toBe('Thank you for your order!');
    });

    test('should handle navigation back to checkout', async ({ page }) => {
      // Navigate back to checkout step two
      await page.goBack();
      await page.waitForTimeout(500);
      
      // Should be back on checkout step two
      const url = await orderCompletionPage.getCurrentUrl();
      expect(url).toContain('checkout-step-two.html');
      
      // Navigate forward again
      await page.goForward();
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
      const message = await orderCompletionPage.getOrderCompletionMessage();
      expect(message).toBe('Thank you for your order!');
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
      await orderCompletionPage.verifyPonyExpressImageDisplayed();
    });
  });

  test.describe('Performance', () => {
    test('should load order completion page within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle navigation quickly', async ({ page }) => {
      const startTime = Date.now();
      await orderCompletionPage.clickBackToProducts();
      const navigationTime = Date.now() - startTime;
      
      // Should navigate within 2 seconds
      expect(navigationTime).toBeLessThan(2000);
    });
  });

  test.describe('Screenshot and Documentation', () => {
    test('should take order completion screenshot', async ({ page }) => {
      await orderCompletionPage.takeOrderCompletionScreenshot('test-order-completion.png');
    });

    test('should wait for pony express image', async ({ page }) => {
      await orderCompletionPage.waitForPonyExpressImage();
      const isVisible = await orderCompletionPage.isPonyExpressImageVisible();
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Data Integrity', () => {
    test('should maintain order completion state', async ({ page }) => {
      // Get initial state
      const initialMessage = await orderCompletionPage.getOrderCompletionMessage();
      const initialText = await orderCompletionPage.getOrderCompletionText();
      
      // Refresh page
      await orderCompletionPage.refreshOrderCompletionPage();
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      
      // Verify state is maintained
      const refreshedMessage = await orderCompletionPage.getOrderCompletionMessage();
      const refreshedText = await orderCompletionPage.getOrderCompletionText();
      
      expect(refreshedMessage).toBe(initialMessage);
      expect(refreshedText).toBe(initialText);
    });

    test('should handle multiple order completions', async ({ page }) => {
      // Complete another order flow
      await orderCompletionPage.clickBackToProducts();
      await page.waitForTimeout(1000);
      
      // Add new item and complete checkout
      await page.click('.btn_inventory');
      await page.waitForTimeout(500);
      await page.click('.shopping_cart_link');
      await page.waitForTimeout(500);
      
      // Complete checkout quickly (simplified for test)
      const cartPage = new SauceDemoCartPage(page);
      await cartPage.clickCheckout();
      
      const checkoutPage = new SauceDemoCheckoutPage(page);
      await checkoutPage.fillCheckoutInformation('Jane', 'Smith', '54321');
      await checkoutPage.clickContinue();
      await checkoutPage.clickFinish();
      
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      await orderCompletionPage.verifyOrderCompletionPageLoaded();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper page structure', async ({ page }) => {
      // Check for proper heading structure
      const header = await orderCompletionPage.getPageTitle();
      expect(header).toBeTruthy();
      
      // Check for success message
      const message = await orderCompletionPage.getOrderCompletionMessage();
      expect(message).toBeTruthy();
      
      // Check for action button
      const isButtonEnabled = await orderCompletionPage.isEnabled('#back-to-products');
      expect(isButtonEnabled).toBe(true);
    });

    test('should be navigable by keyboard', async ({ page }) => {
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      
      // Should focus on actionable elements
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['BUTTON', 'A']).toContain(activeElement);
    });
  });

  test.describe('End-to-End Flow Verification', () => {
    test('should complete full purchase flow successfully', async ({ page, sauceDemoLoginPage, sauceDemoHomePage }) => {
      // Start fresh login
      await sauceDemoLoginPage.navigateToSauceDemo();
      await sauceDemoLoginPage.login('standard_user', 'secret_sauce');
      await sauceDemoHomePage.waitForInventoryToLoad();
      
      // Add item to cart
      await sauceDemoHomePage.addToCart('Sauce Labs Fleece Jacket');
      
      // Complete checkout flow
      await sauceDemoHomePage.clickShoppingCart();
      await page.waitForTimeout(500);
      
      const cartPage = new (await import('../pages/saucedemo-cart-page')).SauceDemoCartPage(page);
      await cartPage.clickCheckout();
      await page.waitForTimeout(500);
      
      const checkoutPage = new (await import('../pages/saucedemo-checkout-page')).SauceDemoCheckoutPage(page);
      await checkoutPage.fillCheckoutInformation('Test', 'User', '99999');
      await checkoutPage.clickContinue();
      await page.waitForTimeout(500);
      await checkoutPage.clickFinish();
      await page.waitForTimeout(500);
      
      // Verify order completion
      await orderCompletionPage.waitForOrderCompletionPageToLoad();
      await orderCompletionPage.verifySuccessfulOrderCompletion();
      
      // Navigate back to verify flow completion
      await orderCompletionPage.clickBackToProducts();
      await page.waitForTimeout(500);
      
      const url = await orderCompletionPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });
  });
});
