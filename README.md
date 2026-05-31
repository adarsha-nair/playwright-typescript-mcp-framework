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

## Project Structure

```
playwright-mcp-framework/
|-- config/
|   |-- environments.ts              # SauceDemo environment configurations
|   |-- saucedemo-test-data.ts      # Comprehensive SauceDemo test data
|   |-- extent-reporter.ts          # Custom reporting configuration
|-- fixtures/
|   |-- saucedemo-fixture.ts        # SauceDemo-specific test fixtures
|-- pages/
|   |-- base-page.ts                # SauceDemo base page class
|   |-- saucedemo-login-page.ts     # SauceDemo login page object
|   |-- saucedemo-home-page.ts      # SauceDemo inventory page object
|-- tests/
|   |-- saucedemo-login.spec.ts     # SauceDemo login test suite
|-- utils/
|   |-- saucedemo-helpers.ts        # SauceDemo utility functions
|   |-- saucedemo-constants.ts      # SauceDemo selectors and constants
|-- global-setup.ts                 # SauceDemo global setup
|-- global-teardown.ts              # SauceDemo global teardown
|-- playwright.config.ts            # SauceDemo-optimized Playwright config
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

### Environment Configuration

The framework supports multiple SauceDemo testing environments:

- **local**: Development testing with visual validation
- **ci**: Continuous integration with performance testing
- **mobile**: Mobile responsive testing
- **performance**: Performance-focused testing

Set environment:
### Test Categories

Use tags to categorize tests:

```typescript
test('@smoke should load quickly', async ({ homePage }) => {
  // Smoke test implementation
});

test('@regression should handle all scenarios', async ({ homePage }) => {
  // Regression test implementation
});

test('@sanity should verify core functionality', async ({ homePage }) => {
  // Sanity test implementation
});
```

### Data-Driven Testing

```typescript
const testData = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

testData.forEach(({ username, password }) => {
  test(`should login with ${username}`, async ({ loginPage }) => {
    await loginPage.login(username, password);
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

1. Create a new page class in `pages/` directory
2. Extend `BasePage` class
3. Implement page-specific methods
4. Add corresponding tests in `tests/` directory

### Adding New Utilities

1. Create utility functions in `utils/helpers.ts`
2. Export functions for use in tests
3. Add unit tests if needed

### Environment Configuration

1. Update `config/environments.ts` with new environment settings
2. Add environment-specific variables
3. Update `.env.example` with new variables

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
