export declare const TEST_CONSTANTS: {
    readonly DEFAULT_TIMEOUT: 30000;
    readonly SHORT_TIMEOUT: 5000;
    readonly LONG_TIMEOUT: 60000;
    readonly DEFAULT_RETRY_ATTEMPTS: 3;
    readonly VIEWPORT: {
        readonly DESKTOP: {
            readonly width: 1280;
            readonly height: 720;
        };
        readonly TABLET: {
            readonly width: 768;
            readonly height: 1024;
        };
        readonly MOBILE: {
            readonly width: 375;
            readonly height: 668;
        };
    };
    readonly TEST_USER: {
        readonly VALID_USERNAME: "testuser";
        readonly VALID_EMAIL: "test@example.com";
        readonly VALID_PASSWORD: "Test@123456";
        readonly INVALID_PASSWORD: "wrong";
        readonly INVALID_EMAIL: "invalid-email";
    };
    readonly URLS: {
        readonly BASE_URL: any;
        readonly LOGIN: "/login";
        readonly DASHBOARD: "/dashboard";
        readonly PROFILE: "/profile";
    };
    readonly SELECTORS: {
        readonly COMMON: {
            readonly BUTTON: "button";
            readonly INPUT: "input";
            readonly LINK: "a";
            readonly TEXT_AREA: "textarea";
            readonly SELECT: "select";
            readonly CHECKBOX: "input[type=\"checkbox\"]";
            readonly RADIO: "input[type=\"radio\"]";
            readonly LOADING_SPINNER: ".loading";
            readonly ERROR_MESSAGE: ".error";
            readonly SUCCESS_MESSAGE: ".success";
            readonly MODAL: ".modal";
            readonly TOOLTIP: ".tooltip";
        };
    };
    readonly MESSAGES: {
        readonly LOGIN_SUCCESS: "Login successful";
        readonly LOGIN_FAILED: "Login failed";
        readonly INVALID_CREDENTIALS: "Invalid credentials";
        readonly REQUIRED_FIELD: "This field is required";
        readonly EMAIL_INVALID: "Please enter a valid email address";
        readonly PASSWORD_TOO_SHORT: "Password must be at least 8 characters";
    };
    readonly PATHS: {
        readonly REPORTS: "./reports";
        readonly SCREENSHOTS: "./reports/screenshots";
        readonly VIDEOS: "./reports/videos";
        readonly TRACES: "./reports/traces";
        readonly DATA: "./data";
        readonly CONFIG: "./config";
    };
    readonly BROWSERS: {
        readonly CHROMIUM: "chromium";
        readonly FIREFOX: "firefox";
        readonly WEBKIT: "webkit";
    };
    readonly TEST_CATEGORIES: {
        readonly SMOKE: "smoke";
        readonly REGRESSION: "regression";
        readonly SANITY: "sanity";
        readonly INTEGRATION: "integration";
        readonly E2E: "e2e";
    };
    readonly PRIORITY: {
        readonly HIGH: "high";
        readonly MEDIUM: "medium";
        readonly LOW: "low";
    };
};
//# sourceMappingURL=constants.d.ts.map