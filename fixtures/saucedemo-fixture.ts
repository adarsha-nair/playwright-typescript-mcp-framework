import { test as base, Page, TestInfo } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/saucedemo-login-page';
import { SauceDemoHomePage } from '../pages/saucedemo-home-page';
import { SauceDemoCartPage } from '../pages/saucedemo-cart-page';
import { SauceDemoCheckoutPage } from '../pages/saucedemo-checkout-page';
import { SauceDemoOrderCompletionPage } from '../pages/saucedemo-order-completion-page';
import { SauceDemoTestData, sauceDemoTestData } from '../config/saucedemo-test-data';
import { getSauceDemoEnvironment } from '../config/environments';

// SauceDemo-specific test options
export interface SauceDemoTestOptions {
  page: Page;
  sauceDemoLoginPage: SauceDemoLoginPage;
  sauceDemoHomePage: SauceDemoHomePage;
  sauceDemoCartPage: SauceDemoCartPage;
  sauceDemoCheckoutPage: SauceDemoCheckoutPage;
  sauceDemoOrderCompletionPage: SauceDemoOrderCompletionPage;
  sauceDemoTestData: SauceDemoTestData;
  env: ReturnType<typeof getSauceDemoEnvironment>;
}

// Extend base test with SauceDemo-specific fixtures
export const test = base.extend<SauceDemoTestOptions>({
  // Environment fixture
  env: async ({}, use) => {
    const environment = getSauceDemoEnvironment();
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
    await use(sauceDemoTestData);
  },

  // SauceDemo login page fixture
  sauceDemoLoginPage: async ({ page }, use) => {
    const loginPage = new SauceDemoLoginPage(page);
    await use(loginPage);
  },

  // SauceDemo home page fixture
  sauceDemoHomePage: async ({ page }, use) => {
    const homePage = new SauceDemoHomePage(page);
    await use(homePage);
  },

  // SauceDemo cart page fixture
  sauceDemoCartPage: async ({ page }, use) => {
    const cartPage = new SauceDemoCartPage(page);
    await use(cartPage);
  },

  // SauceDemo checkout page fixture
  sauceDemoCheckoutPage: async ({ page }, use) => {
    const checkoutPage = new SauceDemoCheckoutPage(page);
    await use(checkoutPage);
  },

  // SauceDemo order completion page fixture
  sauceDemoOrderCompletionPage: async ({ page }, use) => {
    const orderCompletionPage = new SauceDemoOrderCompletionPage(page);
    await use(orderCompletionPage);
  },
});

// Export expect from base test
export { expect } from '@playwright/test';

// SauceDemo-specific global hooks
test.beforeAll(async () => {
  console.log('Starting SauceDemo test suite...');
  console.log(`Testing environment: ${process.env.NODE_ENV || 'local'}`);
});

test.afterAll(async () => {
  console.log('SauceDemo test suite completed.');
});

// Before each hook for SauceDemo tests
test.beforeEach(async ({ page, sauceDemoLoginPage, env }, testInfo) => {
  console.log(`Setting up SauceDemo test: ${testInfo.title}`);
  
  // Clear cookies and storage before each test
  await page.context().clearCookies();
  // await page.evaluate(() => {
  //   //localStorage.clear();
  //   sessionStorage.clear();
  // });
  
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
test.afterEach(async ({ page, sauceDemoLoginPage }, testInfo) => {
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
    
    // Log any error messages (only if error is visible)
    const isErrorVisible = await sauceDemoLoginPage.isErrorMessageVisible().catch(() => false);
    if (isErrorVisible) {
      const errorMessage = await sauceDemoLoginPage.getErrorMessage();
      if (errorMessage) {
        console.error(`Error message in ${testInfo.title}: ${errorMessage}`);
      }
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
export default test;
