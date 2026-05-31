import { test, expect } from '../fixtures/saucedemo-fixture';

test.describe('SauceDemo Inventory Page Tests', () => {
  test.beforeEach(async ({ sauceDemoLoginPage, sauceDemoHomePage, sauceDemoTestData }) => {
    await sauceDemoLoginPage.navigateToSauceDemo();
    await sauceDemoLoginPage.login(sauceDemoTestData.users.standardUser.username, sauceDemoTestData.users.standardUser.password);
    await sauceDemoHomePage.waitForInventoryToLoad();
  });

  test.describe('Page Load and Navigation', () => {
    test('should load inventory page successfully', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      await sauceDemoHomePage.verifyHomePageLoaded();
      await sauceDemoHomePage.verifyPageTitle(sauceDemoTestData.expectedElements.inventoryPage.title);
      await sauceDemoHomePage.verifyUrlContains('inventory.html');
    });

    test('should display correct page title', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      const title = await sauceDemoHomePage.getPageTitle();
      expect(title).toBe(sauceDemoTestData.expectedElements.inventoryPage.title);
    });

    test('should contain correct URL', async ({ sauceDemoHomePage }) => {
      const url = await sauceDemoHomePage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });
  });

  test.describe('Product Display', () => {
    test('should display all inventory items', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.verifyInventoryItemsExist();
      const itemCount = await sauceDemoHomePage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should display product names correctly', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      const itemNames = await sauceDemoHomePage.getInventoryItemNames();
      expect(itemNames.length).toBeGreaterThan(0);
      
      // Verify specific products are present
      const expectedProducts = sauceDemoTestData.testData.cart.testProducts;
      
      for (const product of expectedProducts) {
        const isVisible = await sauceDemoHomePage.isItemVisible(product);
        expect(isVisible).toBe(true);
      }
    });

    test('should display product prices correctly', async ({ sauceDemoHomePage }) => {
      const itemPrices = await sauceDemoHomePage.getInventoryItemPrices();
      expect(itemPrices.length).toBeGreaterThan(0);
      
      // Verify prices are in correct format
      itemPrices.forEach((price: string) => {
        expect(price).toMatch(/^\$\d+\.\d{2}$/);
      });
    });

    test('should display product details for specific item', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      const itemName = sauceDemoTestData.testData.cart.singleProduct;
      const price = await sauceDemoHomePage.getItemPrice(itemName);
      expect(price).toBe(sauceDemoTestData.testData.cart.expectedPrices[itemName]);
      
      const isVisible = await sauceDemoHomePage.isItemVisible(itemName);
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Product Sorting', () => {
    test('should sort products by name A to Z by default', async ({ sauceDemoHomePage }) => {
      const selectedOption = await sauceDemoHomePage.getSelectedSortOption();
      expect(selectedOption).toBe('az');
      
      await sauceDemoHomePage.verifyItemsSortedByName(true);
    });

    test('should sort products by name Z to A', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.selectSortOption('za');
      const selectedOption = await sauceDemoHomePage.getSelectedSortOption();
      expect(selectedOption).toBe('za');
      
      await sauceDemoHomePage.verifyItemsSortedByName(false);
    });

    test('should sort products by price low to high', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.selectSortOption('lohi');
      const selectedOption = await sauceDemoHomePage.getSelectedSortOption();
      expect(selectedOption).toBe('lohi');
      
      await sauceDemoHomePage.verifyItemsSortedByPrice(true);
    });

    test('should sort products by price high to low', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.selectOption('.product_sort_container', 'hilo');
      const selectedOption = await sauceDemoHomePage.getSelectedSortOption();
      expect(selectedOption).toBe('hilo');
      
      await sauceDemoHomePage.verifyItemsSortedByPrice(false);
    });
  });

  test.describe('Add to Cart Functionality', () => {
    test('should add single item to cart', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      const itemName = sauceDemoTestData.testData.cart.singleProduct;
      
      // Verify cart is empty initially
      await sauceDemoHomePage.verifyCartBadgeCount('0');
      
      // Add item to cart
      await sauceDemoHomePage.addToCart(itemName);
      
      // Verify cart badge updated
      await sauceDemoHomePage.verifyCartBadgeCount('1');
    });

    test('should add multiple items to cart', async ({ sauceDemoHomePage, sauceDemoTestData }) => {
      const itemsToAdd = sauceDemoTestData.testData.cart.testProducts;
      
      // Add multiple items
      for (const item of itemsToAdd) {
        await sauceDemoHomePage.addToCart(item);
      }
      
      // Verify cart badge count
      await sauceDemoHomePage.verifyCartBadgeCount(itemsToAdd.length.toString());
    });

    test('should add items by index', async ({ sauceDemoHomePage }) => {
      // Add first item by index
      await sauceDemoHomePage.addToCartByIndex(0);
      await sauceDemoHomePage.verifyCartBadgeCount('1');
      
      // Add second item by index
      await sauceDemoHomePage.addToCartByIndex(1);
      await sauceDemoHomePage.verifyCartBadgeCount('2');
    });
  });

  test.describe('Navigation Elements', () => {
    test('should display shopping cart link', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.shouldBeVisible('.shopping_cart_link');
    });

    test('should display menu button', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.shouldBeVisible('#react-burger-menu-btn');
    });

    test('should navigate to cart page', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.clickShoppingCart();
      
      // Verify navigation to cart
      const url = await sauceDemoHomePage.getCurrentUrl();
      expect(url).toContain('cart.html');
    });

    test('should open and close menu', async ({ page, sauceDemoHomePage }) => {
      // Open menu
      await sauceDemoHomePage.clickMenuButton();
      const isMenuOpen = await sauceDemoHomePage.isMenuOpen();
      expect(isMenuOpen).toBe(true);
      
      // Close menu by pressing Escape
     // await sauceDemoHomePage.press('Escape');
      await sauceDemoHomePage.clickMenuClose();
      await page.waitForTimeout(500);
      
      const isMenuStillOpen = await sauceDemoHomePage.isMenuOpen();
      expect(isMenuStillOpen).toBe(false);
    });
  });

  test.describe('Footer Elements', () => {
    test('should display footer text', async ({ sauceDemoHomePage }) => {
      const footerText = await sauceDemoHomePage.getFooterText();
      expect(footerText).toContain('©');
      expect(footerText).toContain('All Rights Reserved');
    });

    test('should display social media links', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.shouldBeVisible('.social_twitter a');
      await sauceDemoHomePage.shouldBeVisible('.social_facebook a');
      await sauceDemoHomePage.shouldBeVisible('.social_linkedin a');
    });

    test('should click social media links', async ({ page, sauceDemoHomePage, context }) => {
      // Test Twitter link
      const [newPageTw] = await Promise.all([
        context.waitForEvent('page'),
        await sauceDemoHomePage.clickTwitterLink()
      ]);
     await newPageTw.waitForLoadState();
  
      // Go back
       await page.bringToFront();
      await sauceDemoHomePage.waitForInventoryToLoad();
      
      // Test Facebook link
       const [newPageFb] = await Promise.all([
        context.waitForEvent('page'),
        await sauceDemoHomePage.clickFacebookLink()
      ]);
      await newPageFb.waitForLoadState();
    
      // Go back
      await page.bringToFront();
      await sauceDemoHomePage.waitForInventoryToLoad();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page, sauceDemoHomePage }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await sauceDemoHomePage.waitForInventoryToLoad();
      
      await sauceDemoHomePage.verifyHomePageLoaded();
      const itemCount = await sauceDemoHomePage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should display correctly on tablet viewport', async ({ page, sauceDemoHomePage }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await sauceDemoHomePage.waitForInventoryToLoad();
      
      await sauceDemoHomePage.verifyHomePageLoaded();
      const itemCount = await sauceDemoHomePage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle page refresh gracefully', async ({ sauceDemoHomePage }) => {
      await sauceDemoHomePage.refreshPage();
      await sauceDemoHomePage.verifyHomePageLoaded();
      
      const itemCount = await sauceDemoHomePage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should handle navigation back and forth', async ({ page, sauceDemoHomePage }) => {
      // Navigate to cart
      await sauceDemoHomePage.clickShoppingCart();
      await page.waitForTimeout(500);
      
      // Navigate back
      await page.goBack();
      await sauceDemoHomePage.waitForInventoryToLoad();
      
      // Verify inventory page is still functional
      await sauceDemoHomePage.verifyHomePageLoaded();
    });
  });

  test.describe('Performance', () => {
    test('should load inventory items within reasonable time', async ({ sauceDemoHomePage }) => {
      const startTime = Date.now();
      await sauceDemoHomePage.waitForInventoryToLoad();
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle sorting operations quickly', async ({ sauceDemoHomePage }) => {
      const startTime = Date.now();
      await sauceDemoHomePage.selectSortOption('za');
      const sortTime = Date.now() - startTime;
      
      // Should sort within 2 seconds
      expect(sortTime).toBeLessThan(2000);
    });
  });
});
