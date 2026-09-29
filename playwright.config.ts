import { defineConfig, devices } from '@playwright/test';

/**
 * SauceDemo-specific Playwright Configuration
 * Optimized for testing https://www.saucedemo.com/ application
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry configuration for SauceDemo stability */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI for SauceDemo */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters - HTML disabled to fix localhost issue */
  reporter: [
  ['list'],
  ['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ['json', { outputFile: 'reports/test-results.json' }],
  ['junit', { outputFile: 'reports/test-results.xml' }],
  ['./config/extent-reporter.ts'],
],
  /* Shared settings for all SauceDemo tests */
  use: {
    /* SauceDemo base URL */
    baseURL: 'https://www.saucedemo.com',
    
    /* SauceDemo-specific timeouts */
    actionTimeout: 15000,
    navigationTimeout: 30000,

    /* Collect trace when retrying the failed test - temporarily disabled to fix localhost issue */
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
    
    /* SauceDemo-specific viewport */
    viewport: { width: 1280, height: 720 },
    
    /* Ignore HTTPS errors for SauceDemo */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for SauceDemo testing */
  projects: [
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.spec.ts',
      testIgnore: '**/*.mobile.spec.ts',
    },

    {
      name: 'firefox-desktop',
      use: { 
        ...devices['Desktop Firefox'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.spec.ts',
      testIgnore: '**/*.mobile.spec.ts',
    },

    {
      name: 'webkit-desktop',
      use: { 
        ...devices['Desktop Safari'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.spec.ts',
      testIgnore: '**/*.mobile.spec.ts',
    },

    /* SauceDemo mobile testing */
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.mobile.spec.ts',
    },

    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.mobile.spec.ts',
    },

    /* SauceDemo performance testing */
    {
      name: 'performance-chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--no-sandbox'
          ]
        }
      },
      testMatch: '**/*.performance.spec.ts',
      retries: 0, // No retries for performance tests
    },

    /* SauceDemo visual testing */
    {
      name: 'visual-chromium',
      use: { 
        ...devices['Desktop Chrome'],
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.visual.spec.ts',
    },
  ],

  /* Global setup for SauceDemo */
  globalSetup: require.resolve('./global-setup.ts'),
  
  /* Global teardown for SauceDemo */
  globalTeardown: require.resolve('./global-teardown.ts'),

  /* Test metadata */
  metadata: {
    'Test Environment': 'SauceDemo',
    'Application': 'Swag Labs',
    'Base URL': 'https://www.saucedemo.com',
    'Test Type': 'E2E Automation'
  },

  /* Output directory */
  outputDir: 'reports/test-results',

  /* Web server - not needed for SauceDemo */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
