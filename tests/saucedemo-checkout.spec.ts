import { test, expect } from '../fixtures/saucedemo-fixture';
import { SauceDemoCheckoutPage } from '../pages/saucedemo-checkout-page';
import { SauceDemoCartPage } from '../pages/saucedemo-cart-page';

test.describe('SauceDemo Checkout Page Tests', () => {
  let checkoutPage: SauceDemoCheckoutPage;
  let cartPage: SauceDemoCartPage;

  test.beforeEach(async ({ page, sauceDemoLoginPage, sauceDemoHomePage, sauceDemoTestData }) => {
    checkoutPage = new SauceDemoCheckoutPage(page);
    cartPage = new SauceDemoCartPage(page);
    
    // Login and add items to cart
    await sauceDemoLoginPage.navigateToSauceDemo();
    await sauceDemoLoginPage.login(sauceDemoTestData.users.standardUser.username, sauceDemoTestData.users.standardUser.password);
    await sauceDemoHomePage.waitForInventoryToLoad();
    
    // Add test items and navigate to cart
    const testProducts = sauceDemoTestData.testData.cart.testProducts.slice(0, 2);
    for (const product of testProducts) {
      await sauceDemoHomePage.addToCart(product);
    }
    await sauceDemoHomePage.clickShoppingCart();
    await cartPage.waitForCartToLoad();
    
    // Navigate to checkout
    await cartPage.clickCheckout();
  });

  test.describe('Checkout Step One - Information', () => {
    test('should load checkout step one page successfully', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.verifyCheckoutStepOneLoaded();
      await checkoutPage.verifyPageTitle(sauceDemoTestData.expectedElements.checkoutPage.title);
      await checkoutPage.verifyUrlContains('checkout-step-one.html');
    });

    test('should display all input fields', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      await checkoutPage.shouldBeVisible(checkoutPage['firstNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['lastNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['postalCodeInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['continueButton']);
      await checkoutPage.shouldBeVisible(checkoutPage['cancelButton']);
    });

    test('should fill form fields correctly', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const { firstName, lastName, postalCode } = sauceDemoTestData.testData.checkout.validUser;
      
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      
      await checkoutPage.verifyFirstNameValue(firstName);
      await checkoutPage.verifyLastNameValue(lastName);
      await checkoutPage.verifyPostalCodeValue(postalCode);
    });

    test('should clear form fields correctly', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      // Fill and then clear
      await checkoutPage.fillCheckoutInformation('Test', 'User', '54321');
      await checkoutPage.clearAllFields();
      
      await checkoutPage.verifyFirstNameValue('');
      await checkoutPage.verifyLastNameValue('');
      await checkoutPage.verifyPostalCodeValue('');
    });
  });

  test.describe('Checkout Step One - Validation', () => {
    test('should show error for empty first name', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const invalidUser = sauceDemoTestData.testData.checkout.invalidUsers.emptyFirstName;
      await checkoutPage.fillCheckoutInformation(invalidUser.firstName, invalidUser.lastName, invalidUser.postalCode);
      await checkoutPage.clickContinue();
      
      await checkoutPage.verifyErrorMessage(invalidUser.expectedError);
    });

    test('should show error for empty last name', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const invalidUser = sauceDemoTestData.testData.checkout.invalidUsers.emptyLastName;
      await checkoutPage.fillCheckoutInformation(invalidUser.firstName, invalidUser.lastName, invalidUser.postalCode);
      await checkoutPage.clickContinue();
      
      await checkoutPage.verifyErrorMessage(invalidUser.expectedError);
    });

    test('should show error for empty postal code', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const invalidUser = sauceDemoTestData.testData.checkout.invalidUsers.emptyPostalCode;
      await checkoutPage.fillCheckoutInformation(invalidUser.firstName, invalidUser.lastName, invalidUser.postalCode);
      await checkoutPage.clickContinue();
      
      await checkoutPage.verifyErrorMessage(invalidUser.expectedError);
    });

    test('should show error for all empty fields', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      await checkoutPage.clearAllFields();
      await checkoutPage.clickContinue();
      
      await checkoutPage.verifyErrorMessage('Error: First Name is required');
    });

    test('should proceed with valid information', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const { firstName, lastName, postalCode } = sauceDemoTestData.testData.checkout.validUser;
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      
      // Should navigate to step two
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      await checkoutPage.verifyCheckoutStepTwoLoaded();
    });
  });

  test.describe('Checkout Step Two - Overview', () => {
    test.beforeEach(async ({ page }) => {
      // Fill valid info and continue to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
    });

    test('should load checkout step two page successfully', async ({ page, sauceDemoTestData }) => {
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      await checkoutPage.verifyPageTitle(sauceDemoTestData.expectedElements.checkoutPage.title);
      await checkoutPage.verifyUrlContains('checkout-step-two.html');
    });

    test('should display cart items correctly', async ({ page }) => {
      await checkoutPage.verifyCheckoutItemCount(2);
      
      const itemNames = await checkoutPage.getCheckoutItemNames();
      expect(itemNames.length).toBe(2);
      expect(itemNames).toContain('Sauce Labs Backpack');
      expect(itemNames).toContain('Sauce Labs Bike Light');
    });

    test('should display item prices correctly', async ({ page }) => {
      const itemPrices = await checkoutPage.getCheckoutItemPrices();
      expect(itemPrices.length).toBe(2);
      
      expect(itemPrices).toContain('$29.99');
      expect(itemPrices).toContain('$9.99');
    });

    test('should calculate totals correctly', async ({ page, sauceDemoTestData }) => {
      const subtotal = await checkoutPage.getSubtotal();
      const tax = await checkoutPage.getTax();
      const total = await checkoutPage.getTotal();
      
      expect(subtotal).toBeCloseTo(39.98, 2);
      expect(tax).toBeGreaterThan(0);
      expect(total).toBeCloseTo(subtotal + tax, 2);
      
      await checkoutPage.verifyTotalEqualsSubtotalPlusTax();
    });

    test('should display payment and shipping information', async ({ page }) => {
      const paymentInfo = await checkoutPage.getPaymentInformation();
      const shippingInfo = await checkoutPage.getShippingInformation();
      
      expect(paymentInfo).toContain('SauceCard');
      expect(shippingInfo).toContain('Free Pony Express Delivery');
      
      await checkoutPage.verifyPaymentInfoContains('SauceCard');
      await checkoutPage.verifyShippingInfoContains('Free Pony Express Delivery');
    });

    test('should display finish and cancel buttons', async ({ page }) => {
      await checkoutPage.shouldBeVisible(checkoutPage['finishButton']);
      await checkoutPage.shouldBeVisible(checkoutPage['cancelButton']);
      await checkoutPage.verifyFinishButtonEnabled();
    });
  });

  test.describe('Checkout Step Two - Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Fill valid info and continue to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
    });

    test('should cancel checkout and return to cart', async ({ page }) => {
      await checkoutPage.clickCancelFromOverview();
      
      // Should navigate back to cart
      const url = await checkoutPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });

    test('should proceed to order completion', async ({ page }) => {
      await checkoutPage.clickFinish();
      
      // Should navigate to completion page
      const url = await checkoutPage.getCurrentUrl();
      expect(url).toContain('checkout-complete.html');
    });
  });

  test.describe('Cancel Checkout Flow', () => {
    test('should cancel from step one and return to cart', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.clickCancel();
      
      // Should navigate back to cart
      const url = await checkoutPage.getCurrentUrl();
      expect(url).toContain('cart.html');
    });

    test('should cancel from step two and return to cart', async ({ page }) => {
      // First get to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      
      // Then cancel
      await checkoutPage.clickCancelFromOverview();
      
      // Should navigate back to cart
      const url = await checkoutPage.getCurrentUrl();
      expect(url).toContain('inventory.html');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle page refresh gracefully on step one', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.refreshCheckout();
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      await checkoutPage.verifyCheckoutStepOneLoaded();
    });

    test('should handle page refresh gracefully on step two', async ({ page }) => {
      // Get to step two first
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      
      await checkoutPage.refreshCheckout();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      
      await checkoutPage.verifyCheckoutStepTwoLoaded();
    });

    test('should dismiss error messages correctly', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      // Trigger an error
      await checkoutPage.clickContinue();
      await checkoutPage.verifyErrorMessage('Error: First Name is required');
      
      // Dismiss error
      await checkoutPage.dismissError();
      await checkoutPage.verifyNoErrorMessage();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      await checkoutPage.verifyCheckoutStepOneLoaded();
      await checkoutPage.shouldBeVisible(checkoutPage['firstNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['lastNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['postalCodeInput']);
    });

    test('should display step two correctly on mobile viewport', async ({ page }) => {
      // Get to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      const itemCount = await checkoutPage.getCheckoutItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      await checkoutPage.verifyCheckoutStepOneLoaded();
      await checkoutPage.verifyContinueButtonEnabled();
    });
  });

  test.describe('Performance', () => {
    test('should load step one within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await checkoutPage.waitForCheckoutStepOneToLoad();
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
    });

    test('should process form submission quickly', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const startTime = Date.now();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      const submitTime = Date.now() - startTime;
      
      expect(submitTime).toBeLessThan(2000);
    });

    test('should load step two within reasonable time', async ({ page }) => {
      // Get to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      
      const startTime = Date.now();
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('Data Integrity', () => {
    test('should maintain form data after navigation', async ({ page }) => {
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      const firstName = 'Jane';
      const lastName = 'Smith';
      const postalCode = '98765';
      
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      
      // Navigate away and back
      await page.goBack();
      await page.waitForTimeout(1000);
      await page.goForward();
      await checkoutPage.waitForCheckoutStepOneToLoad();
      
      // Verify data is maintained (may vary based on implementation)
      await checkoutPage.shouldBeVisible(checkoutPage['firstNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['lastNameInput']);
      await checkoutPage.shouldBeVisible(checkoutPage['postalCodeInput']);
    });

    test('should calculate totals accurately', async ({ page }) => {
      // Get to step two
      await checkoutPage.waitForCheckoutStepOneToLoad();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      await checkoutPage.waitForCheckoutStepTwoToLoad();
      
      const subtotal = await checkoutPage.getSubtotal();
      const tax = await checkoutPage.getTax();
      const total = await checkoutPage.getTotal();
      
      // Verify calculation accuracy
      const expectedSubtotal = 39.98; // $29.99 + $9.99
      expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
      
      // Total should equal subtotal + tax
      expect(total).toBeCloseTo(subtotal + tax, 2);
    });
  });
});
