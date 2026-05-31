import { defineConfig, devices } from '@playwright/test';

/**
 * Temporary configuration for running tests with headed mode
 * Bypasses HTML report to avoid localhost:9323/ issues
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Disable parallel for headed mode
  forbidOnly: false,
  retries: 0, // No retries for quick testing
  workers: 1, // Single worker for headed mode
  
  // Simple reporter configuration to avoid localhost issues
  reporter: [
    ['line'],
    ['json', { outputFile: 'reports/test-results.json' }],
  ],
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    trace: 'off', // Disable trace to avoid localhost issues
    screenshot: 'only-on-failure',
    video: 'off', // Disable video to avoid localhost issues
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium-headed',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false, // Explicitly set headless to false
        contextOptions: {
          permissions: ['geolocation', 'notifications']
        }
      },
      testMatch: '**/*.spec.ts',
    },
  ],

  outputDir: 'reports/test-results',
});
