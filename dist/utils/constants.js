"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_CONSTANTS = void 0;
exports.TEST_CONSTANTS = {
    // Timeouts
    DEFAULT_TIMEOUT: 30000,
    SHORT_TIMEOUT: 5000,
    LONG_TIMEOUT: 60000,
    // Retry attempts
    DEFAULT_RETRY_ATTEMPTS: 3,
    // Viewport sizes
    VIEWPORT: {
        DESKTOP: { width: 1280, height: 720 },
        TABLET: { width: 768, height: 1024 },
        MOBILE: { width: 375, height: 668 }
    },
    // Test data
    TEST_USER: {
        VALID_USERNAME: 'testuser',
        VALID_EMAIL: 'test@example.com',
        VALID_PASSWORD: 'Test@123456',
        INVALID_PASSWORD: 'wrong',
        INVALID_EMAIL: 'invalid-email'
    },
    // URLs
    URLS: {
        BASE_URL: process.env.BASE_URL || 'https://playwright.dev',
        LOGIN: '/login',
        DASHBOARD: '/dashboard',
        PROFILE: '/profile'
    },
    // Selectors
    SELECTORS: {
        COMMON: {
            BUTTON: 'button',
            INPUT: 'input',
            LINK: 'a',
            TEXT_AREA: 'textarea',
            SELECT: 'select',
            CHECKBOX: 'input[type="checkbox"]',
            RADIO: 'input[type="radio"]',
            LOADING_SPINNER: '.loading',
            ERROR_MESSAGE: '.error',
            SUCCESS_MESSAGE: '.success',
            MODAL: '.modal',
            TOOLTIP: '.tooltip'
        }
    },
    // Messages
    MESSAGES: {
        LOGIN_SUCCESS: 'Login successful',
        LOGIN_FAILED: 'Login failed',
        INVALID_CREDENTIALS: 'Invalid credentials',
        REQUIRED_FIELD: 'This field is required',
        EMAIL_INVALID: 'Please enter a valid email address',
        PASSWORD_TOO_SHORT: 'Password must be at least 8 characters'
    },
    // File paths
    PATHS: {
        REPORTS: './reports',
        SCREENSHOTS: './reports/screenshots',
        VIDEOS: './reports/videos',
        TRACES: './reports/traces',
        DATA: './data',
        CONFIG: './config'
    },
    // Browser configurations
    BROWSERS: {
        CHROMIUM: 'chromium',
        FIREFOX: 'firefox',
        WEBKIT: 'webkit'
    },
    // Test categories
    TEST_CATEGORIES: {
        SMOKE: 'smoke',
        REGRESSION: 'regression',
        SANITY: 'sanity',
        INTEGRATION: 'integration',
        E2E: 'e2e'
    },
    // Priority levels
    PRIORITY: {
        HIGH: 'high',
        MEDIUM: 'medium',
        LOW: 'low'
    }
};
//# sourceMappingURL=constants.js.map