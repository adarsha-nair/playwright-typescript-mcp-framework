import { test, expect } from '../fixtures/saucedemo-fixture';
import { sauceDemoTestData } from '../config/saucedemo-test-data';

test.describe('Sauce Demo Login Tests', () => {
  // Fixtures are automatically injected and setup is handled in the fixture

  test.describe('Positive Login Scenarios', () => {
    test('@smoke should login successfully with standard user credentials', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      
      // Act
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
      await homePage.verifyUrlContains('inventory.html');
      await homePage.verifyInventoryItemsExist();
    });

    test('@regression should login successfully with problem user credentials', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.problemUser;
      
      // Act
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
      await homePage.verifyUrlContains('inventory.html');
    });

    test('@regression should login successfully with performance glitch user', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.performanceGlitchUser;
      
      // Act
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
      await homePage.verifyUrlContains('inventory.html');
    });

    test('@regression should login successfully with error user', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.errorUser;
      
      // Act
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
      await homePage.verifyUrlContains('inventory.html');
    });

    test('@regression should login successfully with visual user', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.visualUser;
      
      // Act
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
      await homePage.verifyUrlContains('inventory.html');
    });
  });

  test.describe('Negative Login Scenarios', () => {
    test('@smoke should show error for locked out user', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const invalidUser = sauceDemoTestData.invalidUsers.lockedOutUser;
      
      // Act
      await loginPage.login(invalidUser.username, invalidUser.password);
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage(invalidUser.expectedError);
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@smoke should show error for invalid username', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const invalidUser = sauceDemoTestData.invalidUsers.invalidUsername;
      
      // Act
      await loginPage.login(invalidUser.username, invalidUser.password);
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage(invalidUser.expectedError);
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@smoke should show error for invalid password', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const invalidUser = sauceDemoTestData.invalidUsers.invalidPassword;
      
      // Act
      await loginPage.login(invalidUser.username, invalidUser.password);
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage(invalidUser.expectedError);
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@smoke should show error for empty credentials', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const invalidUser = sauceDemoTestData.invalidUsers.emptyCredentials;
      
      // Act
      await loginPage.login(invalidUser.username, invalidUser.password);
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage(invalidUser.expectedError);
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@regression should show error for empty username only', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      
      // Act
      await loginPage.login('', user.password);
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage('Epic sadface: Username is required');
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@regression should show error for empty password only', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      
      // Act
      await loginPage.login(user.username, '');
      
      // Assert
      await loginPage.waitForErrorMessage();
      await loginPage.verifyErrorMessage('Epic sadface: Password is required');
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });
  });

  test.describe('Login Page UI Verification', () => {
    test('@sanity should display all login page elements correctly', async ({ sauceDemoLoginPage: loginPage }) => {
      // Assert
      await loginPage.verifyLoginPageLoaded();
      await loginPage.verifyLoginCredentialsVisible();
      await expect(await loginPage.getPageTitle()).toBe(sauceDemoTestData.expectedElements.loginPage.title);
      await loginPage.verifyUsernamePlaceholder(sauceDemoTestData.expectedElements.loginPage.usernamePlaceholder);
      await loginPage.verifyPasswordPlaceholder(sauceDemoTestData.expectedElements.loginPage.passwordPlaceholder);
      await loginPage.verifyLoginButtonText(sauceDemoTestData.expectedElements.loginPage.loginButtonText);
    });

    test('@sanity should have correct page title and URL', async ({ sauceDemoLoginPage: loginPage }) => {
      // Assert
      await expect(await loginPage.getPageTitle()).toBe(sauceDemoTestData.expectedElements.loginPage.title);
      await expect(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
    });

    test('@sanity should enable login button only when credentials are entered', async ({ sauceDemoLoginPage: loginPage }) => {
      // Assert - Initially button should be enabled in Sauce Demo
      await expect(await loginPage.isLoginButtonEnabled()).toBe(true);
      
      // Act - Enter username only
      await loginPage.clearAndType(loginPage['usernameInput'], 'test');
      await expect(await loginPage.isLoginButtonEnabled()).toBe(true);
      
      // Act - Clear and enter password only
      await loginPage.clearForm();
      await loginPage.clearAndType(loginPage['passwordInput'], 'test');
      await expect(await loginPage.isLoginButtonEnabled()).toBe(true);
      
      // Act - Enter both credentials
      await loginPage.clearAndType(loginPage['usernameInput'], 'test');
      await expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('@regression should login using Enter key on password field', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      
      // Act
      await loginPage.clearAndType(loginPage['usernameInput'], user.username);
      await loginPage.clearAndType(loginPage['passwordInput'], user.password);
      await loginPage.pressEnterOnPassword();
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyUrlContains('inventory.html');
    });

    test('@regression should navigate between fields using Tab key', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      
      // Act
      await loginPage.clearAndType(loginPage['usernameInput'], user.username);
      await loginPage.pressTabOnUsername();
      
      // Assert - Focus should move to password field
      await expect(await loginPage.isElementFocused(loginPage['passwordInput'])).toBe(true);
    });
  });

  test.describe('Form Validation', () => {
    test('@regression should clear form data correctly', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      await loginPage.clearAndType(loginPage['usernameInput'], user.username);
      await loginPage.clearAndType(loginPage['passwordInput'], user.password);
      
      // Verify data is entered
      await expect(await loginPage.getUsernameValue()).toBe(user.username);
      await expect(await loginPage.getPasswordValue()).toBe(user.password);
      
      // Act
      await loginPage.clearForm();
      
      // Assert
      await expect(await loginPage.isUsernameFieldEmpty()).toBe(true);
      await expect(await loginPage.isPasswordFieldEmpty()).toBe(true);
    });

    test('@regression should retain form data after failed login', async ({ sauceDemoLoginPage: loginPage }) => {
      // Arrange
      const invalidUser = sauceDemoTestData.invalidUsers.invalidPassword;
      
      // Act
      await loginPage.login(invalidUser.username, invalidUser.password);
      
      // Assert
      await expect(await loginPage.getUsernameValue()).toBe(invalidUser.username);
      await expect(await loginPage.getPasswordValue()).toBe(invalidUser.password);
    });
  });

  test.describe('Post-Login Verification', () => {
    test('@smoke should display correct inventory items after successful login', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange & Act
      const user = sauceDemoTestData.users.standardUser;
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyInventoryItemsExist();
      const itemCount = await homePage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThanOrEqual(sauceDemoTestData.expectedElements.homePage.expectedItemCount);
      
      const itemNames = await homePage.getInventoryItemNames();
      expect(itemNames.length).toBeGreaterThan(0);
      expect(itemNames[0]).toBeTruthy();
    });

    test('@regression should display shopping cart after login', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange & Act
      const user = sauceDemoTestData.users.standardUser;
      await loginPage.login(user.username, user.password);
      
      // Assert
      await homePage.verifyHomePageLoaded();
      await homePage.verifyCartBadgeCount('0');
    });

    test('@regression should allow adding items to cart after login', async ({ sauceDemoLoginPage: loginPage, sauceDemoHomePage: homePage }) => {
      // Arrange
      const user = sauceDemoTestData.users.standardUser;
      await loginPage.login(user.username, user.password);
      
      // Act
      await homePage.addToCart('Sauce Labs Backpack');
      
      // Assert
      await homePage.verifyCartBadgeCount('1');
    });
  });
});
