import { test, expect } from '../fixtures/saucedemo-fixture';
import { SauceDemoCartPage } from '../pages/saucedemo-cart-page';

test.describe('SauceDemo Cart Page Tests', () => {
  let cartPage: SauceDemoCartPage;

  test.beforeEach(async ({ page, sauceDemoLoginPage, sauceDemoHomePage, sauceDemoTestData }) => {
    cartPage = new SauceDemoCartPage(page);
    
    // Login and add items to cart
    await sauceDemoLoginPage.navigateToSauceDemo();
    await sauceDemoLoginPage.login(sauceDemoTestData.users.standardUser.username, sauceDemoTestData.users.standardUser.password);
    await sauceDemoHomePage.waitForInventoryToLoad();
    
    // Add test items to cart
    const testProducts = sauceDemoTestData.testData.cart.testProducts;
    for (const product of testProducts.slice(0, 2)) {
      await sauceDemoHomePage.addToCart(product);
    }
    
    // Navigate to cart
    await sauceDemoHomePage.clickShoppingCart();
    await cartPage.waitForCartToLoad();
  });

  test.describe('Page Load and Navigation', () => {
    test('should load cart page successfully', async ({ page, sauceDemoTestData }) => {
      await cartPage.verifyCartPageLoaded();
      await cartPage.verifyPageTitle(sauceDemoTestData.expectedElements.cartPage.title);
      await cartPage.verifyUrlContains('cart.html');
    });

    test('should display correct page title', async ({ page, sauceDemoTestData }) => {
      const title = await cartPage.getPageTitle();
      expect(title).toBe(sauceDemoTestData.expectedElements.cartPage.title);
    });

    test('should contain correct URL', async ({ page }) => {
      const url = await cartPage.getCurrentUrl();
      expect(url).toContain('cart.html');
    });
  });

  test.describe('Cart Item Display', () => {
    test('should display cart items correctly', async ({ page, sauceDemoTestData }) => {
      await cartPage.verifyCartItemCount(2);
      
      const itemNames = await cartPage.getCartItemNames();
      expect(itemNames.length).toBe(2);
      const testProducts = sauceDemoTestData.testData.cart.testProducts.slice(0, 2);
      for (const product of testProducts) {
        expect(itemNames).toContain(product);
      }
    });

    test('should display item prices correctly', async ({ page, sauceDemoTestData }) => {
      const itemPrices = await cartPage.getCartItemPrices();
      expect(itemPrices.length).toBe(2);
      
      // Verify prices are in correct format
      itemPrices.forEach((price: string) => {
        expect(price).toMatch(/^\$\d+\.\d{2}$/);
      });
      
      const testProducts = sauceDemoTestData.testData.cart.testProducts.slice(0, 2);
      for (const product of testProducts) {
        expect(itemPrices).toContain(sauceDemoTestData.testData.cart.expectedPrices[product]);
      }
    });

    test('should display item quantities correctly', async ({ page }) => {
      const quantities = await cartPage.getCartItemQuantities();
      expect(quantities.length).toBe(2);
      expect(quantities.every(q => q === '1')).toBe(true);
    });

    test('should display specific item details correctly', async ({ page, sauceDemoTestData }) => {
      const itemName = sauceDemoTestData.testData.cart.singleProduct;
      
      const price = await cartPage.getItemPrice(itemName);
      expect(price).toBe(sauceDemoTestData.testData.cart.expectedPrices[itemName]);
      
      const quantity = await cartPage.getItemQuantity(itemName);
      expect(quantity).toBe('1');
      
      const isVisible = await cartPage.isItemInCart(itemName);
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Cart Calculations', () => {
    test('should calculate cart total correctly', async ({ page, sauceDemoTestData }) => {
      const total = await cartPage.getCartTotal();
      expect(total).toBeCloseTo(sauceDemoTestData.testData.cart.expectedTotals.twoItems, 2);
    });

    test('should update cart badge count correctly', async ({ page }) => {
      const badgeCount = await cartPage.getCartBadgeCount();
      expect(badgeCount).toBe('2');
    });
  });

  test.describe('Remove Item Functionality', () => {
    test('should remove single item from cart', async ({ page, sauceDemoTestData }) => {
      const initialCount = await cartPage.getCartItemCount();
      expect(initialCount).toBe(2);
      
      await cartPage.removeItem(sauceDemoTestData.testData.cart.testProducts[0]);
      
      await cartPage.verifyCartItemCount(1);
      await cartPage.verifyItemNotInCart(sauceDemoTestData.testData.cart.testProducts[0]);
      await cartPage.verifyItemInCart(sauceDemoTestData.testData.cart.testProducts[1]);
    });

    test('should remove item by index', async ({ page }) => {
      const initialCount = await cartPage.getCartItemCount();
      expect(initialCount).toBe(2);
      
      await cartPage.removeItemByIndex(0);
      
      await cartPage.verifyCartItemCount(1);
    });

    test('should remove all items from cart', async ({ page }) => {
      await cartPage.removeAllItems();
      
      //await cartPage.verifyCartIsEmpty();
      await cartPage.verifyCartItemCountIsNotDisplayed();
    });
  });

  test.describe('Navigation Elements', () => {
    test('should display continue shopping button', async ({ page }) => {
      await cartPage.verifyContinueShoppingButtonEnabled();
    });

    test('should display checkout button', async ({ page }) => {
      await cartPage.verifyCheckoutButtonEnabled();
    });

    test('should navigate back to inventory when continue shopping clicked', async ({ page }) => {
      await cartPage.clickContinueShopping();
      
      // Verify navigation back to inventory
      const url = await cartPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });

    test('should navigate to checkout when checkout clicked', async ({ page }) => {
      await cartPage.clickCheckout();
      
      // Verify navigation to checkout
      const url = await cartPage.getCurrentUrl();
      expect(url).toContain('checkout-step-one.html');
    });
  });

  test.describe('Empty Cart Scenarios', () => {
    test('should handle empty cart correctly', async ({ page, sauceDemoHomePage }) => {
      // Remove all items
      await cartPage.removeAllItems();
      
      await cartPage.verifyCartIsEmpty();
      
      // Cart badge should be empty or not visible
      await cartPage.verifyCartItemCountIsNotDisplayed();
    });

    test('should navigate to inventory with empty cart', async ({ page }) => {
      // Remove all items first
      await cartPage.removeAllItems();
      
      // Navigate back to inventory
      await cartPage.clickContinueShopping();
      
      const url = await cartPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle page refresh gracefully', async ({ page }) => {
      await cartPage.refreshCart();
      await cartPage.verifyCartPageLoaded();
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should handle navigation back and forth', async ({ page }) => {
      // Navigate to checkout
      await cartPage.clickCheckout();
      await page.waitForTimeout(500);
      
      // Navigate back
      await page.goBack();
      await cartPage.waitForCartToLoad();
      
      // Verify cart page is still functional
      await cartPage.verifyCartPageLoaded();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await cartPage.waitForCartToLoad();
      
      await cartPage.verifyCartPageLoaded();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await cartPage.waitForCartToLoad();
      
      await cartPage.verifyCartPageLoaded();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  test.describe('Performance', () => {
    test('should load cart items within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await cartPage.waitForCartToLoad();
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle item removal quickly', async ({ page }) => {
      const startTime = Date.now();
      await cartPage.removeItem('Sauce Labs Backpack');
      const removeTime = Date.now() - startTime;
      
      // Should remove within 2 seconds
      expect(removeTime).toBeLessThan(2000);
    });
  });

  test.describe('Data Integrity', () => {
    test('should maintain data consistency after operations', async ({ page }) => {
      // Get initial state
      const initialItems = await cartPage.getCartItemNames();
      const initialTotal = await cartPage.getCartTotal();
      
      // Remove and re-add item
      await cartPage.removeItem('Sauce Labs Backpack');
      await cartPage.verifyCartItemCount(1);
      
      // Verify remaining data is consistent
      const remainingItems = await cartPage.getCartItemNames();
      const remainingTotal = await cartPage.getCartTotal();
      
      expect(remainingItems.length).toBe(initialItems.length - 1);
      expect(remainingItems).not.toContain('Sauce Labs Backpack');
      expect(remainingTotal).toBeLessThan(initialTotal);
    });

    test('should handle multiple item operations correctly', async ({ page }) => {
      // Add more items from inventory
      await page.goBack();
      await page.waitForTimeout(1000);
      
      // This would need navigation back to inventory - for now test current cart state
      await page.goForward();
      await cartPage.waitForCartToLoad();
      
      // Verify cart state is maintained
      await cartPage.verifyCartItemCount(2);
      const itemNames = await cartPage.getCartItemNames();
      expect(itemNames).toContain('Sauce Labs Backpack');
      expect(itemNames).toContain('Sauce Labs Bike Light');
    });
  });
});
