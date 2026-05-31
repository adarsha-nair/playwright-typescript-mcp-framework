"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saucedemo_fixture_1 = require("../fixtures/saucedemo-fixture");
saucedemo_fixture_1.test.describe('Sauce Demo Login Tests', () => {
    // Fixtures are automatically injected and setup is handled in the fixture
    saucedemo_fixture_1.test.describe('Positive Login Scenarios', () => {
        (0, saucedemo_fixture_1.test)('@smoke should login successfully with standard user credentials', async () => {
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
        (0, saucedemo_fixture_1.test)('@regression should login successfully with problem user credentials', async () => {
            // Arrange
            const user = sauceDemoTestData.users.problemUser;
            // Act
            await loginPage.login(user.username, user.password);
            // Assert
            await homePage.verifyHomePageLoaded();
            await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
            await homePage.verifyUrlContains('inventory.html');
        });
        (0, saucedemo_fixture_1.test)('@regression should login successfully with performance glitch user', async () => {
            // Arrange
            const user = sauceDemoTestData.users.performanceGlitchUser;
            // Act
            await loginPage.login(user.username, user.password);
            // Assert
            await homePage.verifyHomePageLoaded();
            await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
            await homePage.verifyUrlContains('inventory.html');
        });
        (0, saucedemo_fixture_1.test)('@regression should login successfully with error user', async () => {
            // Arrange
            const user = sauceDemoTestData.users.errorUser;
            // Act
            await loginPage.login(user.username, user.password);
            // Assert
            await homePage.verifyHomePageLoaded();
            await homePage.verifyPageTitle(sauceDemoTestData.expectedElements.homePage.title);
            await homePage.verifyUrlContains('inventory.html');
        });
        (0, saucedemo_fixture_1.test)('@regression should login successfully with visual user', async () => {
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
    saucedemo_fixture_1.test.describe('Negative Login Scenarios', () => {
        (0, saucedemo_fixture_1.test)('@smoke should show error for locked out user', async () => {
            // Arrange
            const invalidUser = sauceDemoTestData.invalidUsers.lockedOutUser;
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage(invalidUser.expectedError);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@smoke should show error for invalid username', async () => {
            // Arrange
            const invalidUser = sauceDemoTestData.invalidUsers.invalidUsername;
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage(invalidUser.expectedError);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@smoke should show error for invalid password', async () => {
            // Arrange
            const invalidUser = sauceDemoTestData.invalidUsers.invalidPassword;
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage(invalidUser.expectedError);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@smoke should show error for empty credentials', async () => {
            // Arrange
            const invalidUser = sauceDemoTestData.invalidUsers.emptyCredentials;
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage(invalidUser.expectedError);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@regression should show error for empty username only', async () => {
            // Arrange
            const user = sauceDemoTestData.users.standardUser;
            // Act
            await loginPage.login('', user.password);
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage('Epic sadface: Username is required');
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@regression should show error for empty password only', async () => {
            // Arrange
            const user = sauceDemoTestData.users.standardUser;
            // Act
            await loginPage.login(user.username, '');
            // Assert
            await loginPage.waitForErrorMessage();
            await loginPage.verifyErrorMessage('Epic sadface: Password is required');
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
    });
    saucedemo_fixture_1.test.describe('Login Page UI Verification', () => {
        (0, saucedemo_fixture_1.test)('@sanity should display all login page elements correctly', async () => {
            // Assert
            await loginPage.verifyLoginPageLoaded();
            await loginPage.verifyLoginCredentialsVisible();
            await (0, saucedemo_fixture_1.expect)(await loginPage.getPageTitle()).toBe(sauceDemoTestData.expectedElements.loginPage.title);
            await loginPage.verifyUsernamePlaceholder(sauceDemoTestData.expectedElements.loginPage.usernamePlaceholder);
            await loginPage.verifyPasswordPlaceholder(sauceDemoTestData.expectedElements.loginPage.passwordPlaceholder);
            await loginPage.verifyLoginButtonText(sauceDemoTestData.expectedElements.loginPage.loginButtonText);
        });
        (0, saucedemo_fixture_1.test)('@sanity should have correct page title and URL', async () => {
            // Assert
            await (0, saucedemo_fixture_1.expect)(await loginPage.getPageTitle()).toBe(sauceDemoTestData.expectedElements.loginPage.title);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getCurrentUrl()).toBe(sauceDemoTestData.urls.login);
        });
        (0, saucedemo_fixture_1.test)('@sanity should enable login button only when credentials are entered', async () => {
            // Assert - Initially button should be enabled in Sauce Demo
            await (0, saucedemo_fixture_1.expect)(await loginPage.isLoginButtonEnabled()).toBe(true);
            // Act - Enter username only
            await loginPage.clearAndType(loginPage['usernameInput'], 'test');
            await (0, saucedemo_fixture_1.expect)(await loginPage.isLoginButtonEnabled()).toBe(true);
            // Act - Clear and enter password only
            await loginPage.clearForm();
            await loginPage.clearAndType(loginPage['passwordInput'], 'test');
            await (0, saucedemo_fixture_1.expect)(await loginPage.isLoginButtonEnabled()).toBe(true);
            // Act - Enter both credentials
            await loginPage.clearAndType(loginPage['usernameInput'], 'test');
            await (0, saucedemo_fixture_1.expect)(await loginPage.isLoginButtonEnabled()).toBe(true);
        });
    });
    saucedemo_fixture_1.test.describe('Keyboard Navigation', () => {
        (0, saucedemo_fixture_1.test)('@regression should login using Enter key on password field', async () => {
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
        (0, saucedemo_fixture_1.test)('@regression should navigate between fields using Tab key', async () => {
            // Arrange
            const user = sauceDemoTestData.users.standardUser;
            // Act
            await loginPage.clearAndType(loginPage['usernameInput'], user.username);
            await loginPage.pressTabOnUsername();
            // Assert - Focus should move to password field
            await (0, saucedemo_fixture_1.expect)(await loginPage.page.locator(loginPage['passwordInput'])).toBeFocused();
        });
    });
    saucedemo_fixture_1.test.describe('Form Validation', () => {
        (0, saucedemo_fixture_1.test)('@regression should clear form data correctly', async () => {
            // Arrange
            const user = sauceDemoTestData.users.standardUser;
            await loginPage.login(user.username, user.password);
            // Act
            await loginPage.clearForm();
            // Assert
            await (0, saucedemo_fixture_1.expect)(await loginPage.isUsernameFieldEmpty()).toBe(true);
            await (0, saucedemo_fixture_1.expect)(await loginPage.isPasswordFieldEmpty()).toBe(true);
        });
        (0, saucedemo_fixture_1.test)('@regression should retain form data after failed login', async () => {
            // Arrange
            const invalidUser = sauceDemoTestData.invalidUsers.invalidPassword;
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert
            await (0, saucedemo_fixture_1.expect)(await loginPage.getUsernameValue()).toBe(invalidUser.username);
            await (0, saucedemo_fixture_1.expect)(await loginPage.getPasswordValue()).toBe(invalidUser.password);
        });
    });
    saucedemo_fixture_1.test.describe('Post-Login Verification', () => {
        (0, saucedemo_fixture_1.test)('@smoke should display correct inventory items after successful login', async () => {
            // Arrange & Act
            const user = sauceDemoTestData.users.standardUser;
            await loginPage.login(user.username, user.password);
            // Assert
            await homePage.verifyInventoryItemsExist();
            const itemCount = await homePage.getInventoryItemCount();
            (0, saucedemo_fixture_1.expect)(itemCount).toBeGreaterThanOrEqual(sauceDemoTestData.expectedElements.homePage.expectedItemCount);
            const itemNames = await homePage.getInventoryItemNames();
            (0, saucedemo_fixture_1.expect)(itemNames.length).toBeGreaterThan(0);
            (0, saucedemo_fixture_1.expect)(itemNames[0]).toBeTruthy();
        });
        (0, saucedemo_fixture_1.test)('@regression should display shopping cart after login', async () => {
            // Arrange & Act
            const user = sauceDemoTestData.users.standardUser;
            await loginPage.login(user.username, user.password);
            // Assert
            await homePage.verifyHomePageLoaded();
            await homePage.verifyCartBadgeCount('0');
        });
        (0, saucedemo_fixture_1.test)('@regression should allow adding items to cart after login', async () => {
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
//# sourceMappingURL=saucedemo-login.spec.js.map