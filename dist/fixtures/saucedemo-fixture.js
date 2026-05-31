"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
const saucedemo_login_page_1 = require("../pages/saucedemo-login-page");
const saucedemo_home_page_1 = require("../pages/saucedemo-home-page");
const saucedemo_test_data_1 = require("../config/saucedemo-test-data");
const environments_1 = require("../config/environments");
// Extend base test with SauceDemo-specific fixtures
exports.test = test_1.test.extend({
    // Environment fixture
    env: async ({}, use) => {
        const environment = (0, environments_1.getSauceDemoEnvironment)();
        await use(environment);
    },
    // Page fixture with SauceDemo configuration
    page: async ({ page, env }, use, testInfo) => {
        // Set viewport based on environment
        await page.setViewportSize(env.viewport);
        // Set default timeout
        page.setDefaultTimeout(env.timeout);
        // Add SauceDemo-specific error handling
        page.on('pageerror', (error) => {
            console.error(`SauceDemo page error in ${testInfo.title}:`, error.message);
        });
        page.on('requestfailed', (request) => {
            if (request.url().includes('saucedemo.com')) {
                console.error(`SauceDemo request failed in ${testInfo.title}: ${request.url()} - ${request.failure()?.errorText}`);
            }
        });
        // Performance monitoring for performance tests
        if (env.testScenarios.performanceGlitch) {
            page.on('response', (response) => {
                const url = response.url();
                if (url.includes('saucedemo.com') && response.status() !== 200) {
                    console.warn(`Performance warning: ${url} returned ${response.status()}`);
                }
            });
        }
        await use(page);
    },
    // SauceDemo test data fixture
    sauceDemoTestData: async ({}, use) => {
        await use(saucedemo_test_data_1.sauceDemoTestData);
    },
    // SauceDemo login page fixture
    sauceDemoLoginPage: async ({ page }, use) => {
        const loginPage = new saucedemo_login_page_1.SauceDemoLoginPage(page);
        await use(loginPage);
    },
    // SauceDemo home page fixture
    sauceDemoHomePage: async ({ page }, use) => {
        const homePage = new saucedemo_home_page_1.SauceDemoHomePage(page);
        await use(homePage);
    },
});
// Export expect from base test
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
// SauceDemo-specific global hooks
exports.test.beforeAll(async () => {
    console.log('Starting SauceDemo test suite...');
    console.log(`Testing environment: ${process.env.NODE_ENV || 'local'}`);
});
exports.test.afterAll(async () => {
    console.log('SauceDemo test suite completed.');
});
// Before each hook for SauceDemo tests
exports.test.beforeEach(async ({ page, sauceDemoLoginPage, env }, testInfo) => {
    console.log(`Setting up SauceDemo test: ${testInfo.title}`);
    // Clear cookies and storage before each test
    await page.context().clearCookies();
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    // Navigate to SauceDemo login page
    await sauceDemoLoginPage.navigate();
    // Wait for page to fully load
    await sauceDemoLoginPage.waitForSauceDemoLoad();
    // Additional setup for specific test scenarios
    if (env.testScenarios.visualTesting) {
        // Disable animations for visual testing
        await page.addStyleTag({
            content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
        }
      `
        });
    }
});
// After each hook for SauceDemo tests
exports.test.afterEach(async ({ page, sauceDemoLoginPage }, testInfo) => {
    console.log(`SauceDemo test completed: ${testInfo.title} - Status: ${testInfo.status}`);
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = `reports/screenshots/saucedemo_${testInfo.title.replace(/\s+/g, '_')}_${timestamp}.png`;
        await page.screenshot({
            path: screenshotPath,
            fullPage: true,
            animations: 'disabled'
        });
        console.log(`SauceDemo screenshot saved: ${screenshotPath}`);
        // Log any error messages
        const errorMessage = await sauceDemoLoginPage.getErrorMessage();
        if (errorMessage) {
            console.error(`Error message in ${testInfo.title}: ${errorMessage}`);
        }
    }
    // Cleanup
    await page.context().clearCookies();
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    // Close any error dialogs
    await sauceDemoLoginPage.dismissError();
});
// Export the test as default
exports.default = exports.test;
//# sourceMappingURL=saucedemo-fixture.js.map