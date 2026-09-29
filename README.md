# Playwright Test Automation Framework

A specialized Playwright test automation framework designed exclusively for testing the SauceDemo e-commerce application (https://www.saucedemo.com/).

## Overview

This framework is purpose-built for comprehensive testing of the SauceDemo application, featuring optimized page objects, SauceDemo-specific test data, and tailored testing strategies for all user types and scenarios.

## Features

- **SauceDemo-Specific Architecture**: Built exclusively for SauceDemo testing
- **Multi-User Testing**: Support for all SauceDemo user types (standard, problem, performance glitch, error, visual, locked out)
- **Comprehensive Page Coverage**: Login, inventory, cart, checkout, and order completion
- **Environment-Specific Testing**: Local, CI, mobile, and performance testing environments
- **Advanced Error Handling**: SauceDemo-specific error detection and handling
- **Visual Testing**: Optimized for visual user testing scenarios
- **Performance Monitoring**: Built-in performance tracking for glitch users
- **Mobile Responsive Testing**: Dedicated mobile testing configurations
- **Comprehensive Reporting**: HTML, JSON, JUnit, and Extent reports with SauceDemo context
- **Data-Driven Testing**: Comprehensive test data management for all scenarios
- **Test Categorization**: Smoke, regression, sanity, and performance test categories
- **Global Setup/Teardown**: Automated environment checks and cleanup
- **Custom Fixtures**: SauceDemo-specific test fixtures for enhanced test organization
- **Helper Utilities**: Specialized utility functions for common testing tasks

## Project Structure

```
playwright-mcp-framework/
|-- config/
|   |-- environments.ts              # SauceDemo environment configurations (local, ci, mobile, performance)
|   |-- saucedemo-test-data.ts      # Comprehensive SauceDemo test data (users, products, scenarios)
|   |-- extent-reporter.ts          # Custom Extent reporting configuration
|-- fixtures/
|   |-- saucedemo-fixture.ts        # SauceDemo-specific test fixtures (page objects, test data)
|-- pages/
|   |-- base-page.ts                # Base page class with common methods
|   |-- saucedemo-login-page.ts     # Login page object
|   |-- saucedemo-home-page.ts      # Inventory/home page object
|   |-- saucedemo-cart-page.ts      # Shopping cart page object
|   |-- saucedemo-checkout-page.ts  # Checkout page object
|   |-- saucedemo-order-completion-page.ts  # Order completion page object
|-- tests/
|   |-- saucedemo-login.spec.ts     # Login test suite
|   |-- saucedemo-inventory.spec.ts # Inventory/product browsing test suite
|   |-- saucedemo-cart.spec.ts      # Shopping cart test suite
|   |-- saucedemo-checkout.spec.ts  # Checkout flow test suite
|   |-- saucedemo-order-completion.spec.ts  # Order completion test suite
|-- utils/
|   |-- helpers.ts                  # General helper functions
|   |-- constants.ts                # General constants
|   |-- saucedemo-helpers.ts        # SauceDemo-specific helper utilities
|   |-- saucedemo-constants.ts      # SauceDemo selectors and constants
|-- global-setup.ts                 # Global setup (environment checks, directory creation)
|-- global-teardown.ts              # Global teardown (cleanup, test summary)
|-- playwright.config.ts            # Playwright configuration with SauceDemo optimizations
|-- playwright.config.headed.ts     # Headed browser configuration
|-- package.json                     # Dependencies and scripts
|-- tsconfig.json                    # TypeScript configuration
```

## SauceDemo Testing Coverage

### User Types Supported
- **Standard User**: Full functionality testing
- **Problem User**: Image loading and UI issue testing
- **Performance Glitch User**: Performance and timing testing
- **Error User**: Error handling and recovery testing
- **Visual User**: Visual regression testing
- **Locked Out User**: Security and authentication testing

### Test Scenarios
- **Authentication**: Login, logout, session management
- **Product Management**: Browse, sort, filter products
- **Shopping Cart**: Add, remove, update cart items
- **Checkout Flow**: Complete purchase process
- **Error Handling**: Invalid credentials, locked accounts
- **Performance**: Load times, response times
- **Visual**: UI consistency, element display

## Available Scripts

### Test Execution
```bash
npm test                    # Run all tests
npm run test:headed         # Run tests with headed browser
npm run test:debug          # Run tests in debug mode
npm run test:ui             # Run tests with Playwright UI
npm run test:chromium       # Run tests on Chromium only
npm run test:firefox        # Run tests on Firefox only
npm run test:webkit         # Run tests on WebKit only
```

### Test Categories
```bash
npm run test:smoke          # Run smoke tests only
npm run test:regression     # Run regression tests only
npm run test:sanity         # Run sanity tests only
```

### Reporting
```bash
npm run test:report         # Open HTML test report
```

### Setup and Maintenance
```bash
npm run test:install        # Install Playwright browsers
npm run test:install-deps   # Install Playwright with system dependencies
npm run build               # Build TypeScript to JavaScript
npm run build:watch         # Build with watch mode
npm run lint                # Run TypeScript linter
npm run clean               # Clean reports and test results
npm run validate            # Run lint and tests
npm run ci:test             # Run tests in CI mode
```

## Framework Components

### 1. Configuration Management

#### Environment Configuration (`config/environments.ts`)
- **local**: Development testing with visual validation
- **ci**: Continuous integration with performance testing
- **mobile**: Mobile responsive testing (iPhone viewport)
- **performance**: Performance-focused testing with extended timeouts

Each environment includes:
- Base URL configuration
- Timeout settings
- Retry attempts
- Headless mode settings
- Viewport dimensions
- Test scenario flags (performance glitch, visual testing, error simulation)

#### Test Data Configuration (`config/saucedemo-test-data.ts`)
Comprehensive test data including:
- **User credentials**: Standard, problem, performance glitch, error, visual users
- **Invalid users**: Locked out, invalid credentials, empty credentials
- **Product catalog**: All 6 SauceDemo products with prices and descriptions
- **URL mappings**: All SauceDemo page URLs
- **Expected elements**: Page titles, placeholders, button text
- **Test scenarios**: Smoke, regression, sanity, performance test lists
- **Checkout data**: Valid and invalid user data for checkout forms
- **Cart data**: Test products, expected prices, totals
- **Performance thresholds**: Maximum load times and operation times
- **Viewport configurations**: Mobile, tablet, desktop dimensions

### 2. Page Object Model

#### Base Page (`pages/base-page.ts`)
Common functionality for all pages:
- Navigation methods (navigate, reload)
- Element interactions (click, type, select)
- Wait methods (visible, hidden, page load)
- Get methods (text, value, attributes)
- Verification methods (should contain, should be visible, etc.)
- Keyboard and mouse actions
- SauceDemo-specific utilities (page detection, error handling)
- Screenshot capabilities

#### Page Objects
- **Login Page**: Authentication functionality
- **Home/Inventory Page**: Product browsing and management
- **Cart Page**: Shopping cart operations
- **Checkout Page**: Checkout process management
- **Order Completion Page**: Order confirmation and completion

### 3. Test Fixtures (`fixtures/saucedemo-fixture.ts`)

Custom Playwright fixtures providing:
- **Environment configuration**: Current test environment settings
- **Page configuration**: Viewport, timeouts, error handling
- **Test data**: Access to comprehensive SauceDemo test data
- **Page objects**: Pre-configured page instances
- **Performance monitoring**: Response time tracking for performance tests
- **Global hooks**: Before/after each test setup and cleanup
- **Error handling**: Automatic screenshot capture on failure

### 4. Utility Functions

#### SauceDemo Helpers (`utils/saucedemo-helpers.ts`)
Specialized utility functions:
- Page load waiting and stability checks
- SauceDemo responsiveness validation
- User type detection
- Cart operations (count, updates)
- Login state verification
- Page identification
- Currency formatting and calculations
- Screenshot management
- Test step logging with timing
- Retry logic with exponential backoff
- CSS class checking
- Safe text extraction
- Network idle waiting

#### Constants (`utils/saucedemo-constants.ts`)
SauceDemo-specific selectors and constants for:
- Page elements
- Error messages
- User credentials
- Product information
- URLs and endpoints

### 5. Global Setup and Teardown

#### Global Setup (`global-setup.ts`)
- Creates reports and screenshots directories
- Pre-warms SauceDemo to check availability
- Validates SauceDemo responsiveness
- Logs environment configuration

#### Global Teardown (`global-teardown.ts`)
- Cleans up temporary files
- Generates test summary with pass/fail rates
- Logs overall test results

### 6. Reporting

Multiple report formats:
- **HTML Report**: Interactive HTML report with screenshots
- **JSON Report**: Machine-readable test results
- **JUnit Report**: XML format for CI/CD integration
- **Extent Report**: Enhanced reporting with custom formatting

### 7. Browser Configuration

Playwright projects configured for:
- **Desktop browsers**: Chromium, Firefox, WebKit (Desktop Safari)
- **Mobile browsers**: Chrome (Pixel 5), Safari (iPhone 12)
- **Performance testing**: Chromium with performance optimizations
- **Visual testing**: Chromium with visual testing configurations

Each project includes:
- Device-specific settings
- Context permissions (geolocation, notifications)
- Test file matching patterns
- Retry configurations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-mcp-framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Run initial tests:
```bash
npm test
```

### Environment Configuration

The framework supports multiple SauceDemo testing environments:

- **local**: Development testing with visual validation
- **ci**: Continuous integration with performance testing
- **mobile**: Mobile responsive testing
- **performance**: Performance-focused testing

Set environment:
```bash
# For local development (default)
NODE_ENV=local npm test

# For CI/CD
NODE_ENV=ci npm test

# For mobile testing
NODE_ENV=mobile npm test

# For performance testing
NODE_ENV=performance npm test
```

### Test Categories

Use tags to categorize tests:

```typescript
test('@smoke should load quickly', async ({ sauceDemoHomePage }) => {
  // Smoke test implementation
});

test('@regression should handle all scenarios', async ({ sauceDemoHomePage }) => {
  // Regression test implementation
});

test('@sanity should verify core functionality', async ({ sauceDemoHomePage }) => {
  // Sanity test implementation
});
```

Run specific test categories:
```bash
npm run test:smoke          # Run smoke tests only
npm run test:regression     # Run regression tests only
npm run test:sanity         # Run sanity tests only
```

### Data-Driven Testing

Using the framework's test data:

```typescript
import { test, expect } from '../fixtures/saucedemo-fixture';

test('should login with different users', async ({ sauceDemoLoginPage, sauceDemoTestData }) => {
  const users = [
    sauceDemoTestData.users.standardUser,
    sauceDemoTestData.users.problemUser,
    sauceDemoTestData.users.performanceGlitchUser
  ];

  for (const user of users) {
    await sauceDemoLoginPage.navigate();
    await sauceDemoLoginPage.login(user.username, user.password);
    await expect(sauceDemoLoginPage.page).toHaveURL(/inventory.html/);
    await sauceDemoLoginPage.logout();
  }
});
```

Or with custom test data:

```typescript
const testData = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

testData.forEach(({ username, password }) => {
  test(`should login with ${username}`, async ({ sauceDemoLoginPage }) => {
    await sauceDemoLoginPage.login(username, password);
    // Assertions
  });
});
```

## 🔍 Debugging

### Debug Mode

```bash
# Run tests with debug mode
npm run test:debug

# Debug specific test
npx playwright test --debug tests/login-page.spec.ts
```

### Trace Viewer

```bash
# View trace files
npx playwright show-trace trace.zip
```

### VS Code Integration

Install the Playwright VS Code extension for:
- Test discovery
- Debugging support
- Test runner integration

## 🛠️ Development

### Adding New Pages

1. **Create a new page class** in `pages/` directory
```typescript
// pages/saucedemo-new-page.ts
import { SauceDemoBasePage } from './base-page';

export class SauceDemoNewPage extends SauceDemoBasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateToSauceDemo();
    // Add page-specific navigation logic
  }

  async performAction(): Promise<void> {
    // Add page-specific actions
  }
}
```

2. **Extend `SauceDemoBasePage` class** to inherit common functionality

3. **Implement page-specific methods** for element interactions and validations

4. **Add the page to fixtures** in `fixtures/saucedemo-fixture.ts`:
```typescript
import { SauceDemoNewPage } from '../pages/saucedemo-new-page';

export interface SauceDemoTestOptions {
  // ... existing fixtures
  sauceDemoNewPage: SauceDemoNewPage;
}

export const test = base.extend<SauceDemoTestOptions>({
  // ... existing fixtures
  sauceDemoNewPage: async ({ page }, use) => {
    const newPage = new SauceDemoNewPage(page);
    await use(newPage);
  },
});
```

5. **Add corresponding tests** in `tests/` directory:
```typescript
import { test, expect } from '../fixtures/saucedemo-fixture';

test('should perform action on new page', async ({ sauceDemoNewPage }) => {
  await sauceDemoNewPage.navigate();
  await sauceDemoNewPage.performAction();
  // Add assertions
});
```

### Adding New Test Scenarios

1. **Create a new test file** in `tests/` directory:
```typescript
// tests/saucedemo-new-feature.spec.ts
import { test, expect } from '../fixtures/saucedemo-fixture';

test.describe('New Feature', () => {
  test('@smoke should verify basic functionality', async ({ sauceDemoNewPage }) => {
    // Test implementation
  });

  test('@regression should handle edge cases', async ({ sauceDemoNewPage }) => {
    // Test implementation
  });
});
```

2. **Use appropriate tags** (@smoke, @regression, @sanity) for categorization

3. **Leverage existing fixtures** and test data

4. **Follow naming convention**: `saucedemo-[feature].spec.ts`

### Adding New Test Data

1. **Update `config/saucedemo-test-data.ts`** with new data:
```typescript
export interface SauceDemoTestData {
  // ... existing data
  newFeature: {
    testData: string[];
    expectedResults: {
      [key: string]: string;
    };
  };
}

export const sauceDemoTestData: SauceDemoTestData = {
  // ... existing data
  newFeature: {
    testData: ['test1', 'test2', 'test3'],
    expectedResults: {
      test1: 'result1',
      test2: 'result2',
      test3: 'result3'
    }
  }
};
```

2. **Add TypeScript interfaces** for type safety

3. **Organize data logically** by feature or scenario

### Adding New Utilities

1. **Create utility functions** in `utils/saucedemo-helpers.ts`:
```typescript
export class SauceDemoHelpers {
  static async newUtilityFunction(page: Page, param: string): Promise<boolean> {
    // Implementation
    return true;
  }
}
```

2. **Export functions** for use in tests and page objects

3. **Add JSDoc comments** for documentation

4. **Consider adding unit tests** for complex utilities

### Adding New Environments

1. **Update `config/environments.ts`** with new environment:
```typescript
export const sauceDemoEnvironments: Record<string, SauceDemoEnvironmentConfig> = {
  // ... existing environments
  staging: {
    baseUrl: 'https://staging.saucedemo.com',
    timeout: 20000,
    retryAttempts: 2,
    headless: true,
    slowMo: 0,
    viewport: { width: 1280, height: 720 },
    testScenarios: {
      performanceGlitch: false,
      visualTesting: true,
      errorSimulation: false
    }
  }
};
```

2. **Add environment-specific variables** as needed

3. **Update documentation** with new environment details

4. **Test the new environment** before using in CI/CD

### Adding New Browser Configurations

1. **Update `playwright.config.ts`** with new project:
```typescript
projects: [
  // ... existing projects
  {
    name: 'new-browser-config',
    use: { 
      ...devices['Desktop Chrome'],
      // Add custom configuration
    },
    testMatch: '**/*.new-feature.spec.ts',
  },
]
```

2. **Specify device settings** or custom launch options

3. **Define test file matching patterns**

4. **Configure retry settings** if needed

### Adding New Reporters

1. **Create custom reporter** in `config/` directory:
```typescript
// config/custom-reporter.ts
import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test';

class CustomReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log('Starting tests with custom reporter');
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Test ${test.title} ended with status ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log('Tests finished');
  }
}

export default CustomReporter;
```

2. **Add reporter to `playwright.config.ts`**:
```typescript
reporter: [
  // ... existing reporters
  ['./config/custom-reporter.ts'],
]
```

### Extending Global Setup/Teardown

1. **Update `global-setup.ts`** for additional setup:
```typescript
async function globalSetup(config: FullConfig) {
  console.log('SauceDemo Global Setup Started');
  
  // Add custom setup logic
  // e.g., database seeding, API initialization
  
  console.log('SauceDemo Global Setup Completed');
}
```

2. **Update `global-teardown.ts`** for additional cleanup:
```typescript
async function globalTeardown(config: FullConfig) {
  console.log('SauceDemo Global Teardown Started');
  
  // Add custom cleanup logic
  // e.g., database cleanup, API teardown
  
  console.log('SauceDemo Global Teardown Completed');
}
```

### Adding New NPM Scripts

1. **Update `package.json`** with new scripts:
```json
{
  "scripts": {
    "test:new-feature": "npx playwright test tests/saucedemo-new-feature.spec.ts",
    "test:custom": "npx playwright test --grep '@custom'",
    "report:custom": "node scripts/generate-custom-report.js"
  }
}
```

2. **Follow naming convention**: `test:[category]` or `report:[type]`

3. **Document new scripts** in README

### Best Practices for Adding New Functionalities

1. **Follow existing patterns** in the codebase
2. **Use TypeScript interfaces** for type safety
3. **Add comprehensive comments** and JSDoc documentation
4. **Write tests** for new utilities and helpers
5. **Update this README** with new functionality documentation
6. **Run linter** before committing: `npm run lint`
7. **Test locally** before pushing changes
8. **Use meaningful names** for functions, variables, and files
9. **Keep functions small** and focused on single responsibility
10. **Handle errors gracefully** with proper error messages

## 📚 Best Practices

1. **Page Object Model**: Keep page logic separate from test logic
2. **Descriptive Tests**: Use clear test names and descriptions
3. **Data Management**: Use external test data files for complex scenarios
4. **Error Handling**: Implement proper error handling and retry mechanisms
5. **Reporting**: Leverage multiple report formats for better insights
6. **Parallel Execution**: Design tests to run in parallel without conflicts
7. **Environment Isolation**: Use different environments for different test stages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
- Check the [Playwright documentation](https://playwright.dev/)
- Review existing GitHub issues
- Create a new issue with detailed information

## 🔄 Continuous Updates

The framework is designed to be:
- **Maintainable**: Clean code structure and documentation
- **Scalable**: Easy to add new tests and pages
- **Reliable**: Robust error handling and retry mechanisms
- **Flexible**: Configurable for different project needs
