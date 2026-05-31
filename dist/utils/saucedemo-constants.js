"use strict";
/**
 * SauceDemo-specific constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAUCEDEMO_ENVIRONMENTS = exports.SAUCEDEMO_TEST_TAGS = exports.SAUCEDEMO_VIEWPORTS = exports.SAUCEDEMO_TIMEOUTS = exports.SAUCEDEMO_PRICES = exports.SAUCEDEMO_PRODUCTS = exports.SAUCEDEMO_SORT_OPTIONS = exports.SAUCEDEMO_BUTTON_TEXTS = exports.SAUCEDEMO_PLACEHOLDERS = exports.SAUCEDEMO_ERROR_MESSAGES = exports.SAUCEDEMO_TITLES = exports.SAUCEDEMO_URLS = exports.SAUCEDEMO_PASSWORDS = exports.SAUCEDEMO_USERS = exports.SAUCEDEMO_SELECTORS = void 0;
exports.SAUCEDEMO_SELECTORS = {
    // Login page
    LOGIN: {
        USERNAME_INPUT: '#user-name',
        PASSWORD_INPUT: '#password',
        LOGIN_BUTTON: '#login-button',
        ERROR_MESSAGE: '[data-test="error"]',
        LOGIN_LOGO: '.login_logo',
        BOT_COLUMN: '.bot_column',
        LOGIN_CREDENTIALS: '.login_credentials',
        PASSWORD_INFO: '.login_password',
        ERROR_BUTTON: '[data-test="error"] button',
    },
    // Inventory page
    INVENTORY: {
        APP_LOGO: '.app_logo',
        SHOPPING_CART: '.shopping_cart_link',
        CART_BADGE: '.shopping_cart_badge',
        MENU_BUTTON: '#react-burger-menu-btn',
        INVENTORY_CONTAINER: '.inventory_container',
        INVENTORY_ITEM: '.inventory_item',
        ITEM_NAME: '.inventory_item_name',
        ITEM_PRICE: '.inventory_item_price',
        ITEM_DESCRIPTION: '.inventory_item_desc',
        ITEM_IMAGE: '.inventory_item_img',
        ADD_TO_CART_BUTTON: '.btn_inventory',
        REMOVE_BUTTON: '.btn_secondary.btn_inventory',
        SORT_DROPDOWN: '.product_sort_container',
        FOOTER: '.footer',
        SOCIAL_TWITTER: '.social_twitter',
        SOCIAL_FACEBOOK: '.social_facebook',
        SOCIAL_LINKEDIN: '.social_linkedin',
    },
    // Cart page
    CART: {
        CART_LIST: '.cart_list',
        CART_ITEM: '.cart_item',
        CART_QUANTITY: '.cart_quantity',
        CART_ITEM_NAME: '.inventory_item_name',
        CART_ITEM_PRICE: '.inventory_item_price',
        CART_ITEM_DESC: '.inventory_item_desc',
        CART_REMOVE: '.cart_button',
        CHECKOUT_BUTTON: '#checkout',
        CONTINUE_SHOPPING: '#continue-shopping',
    },
    // Checkout pages
    CHECKOUT: {
        // Step One
        FIRST_NAME: '#first-name',
        LAST_NAME: '#last-name',
        POSTAL_CODE: '#postal-code',
        CONTINUE_BUTTON: '#continue',
        CANCEL_BUTTON: '#cancel',
        // Step Two
        CART_CONTENTS: '.cart_contents_container',
        SUMMARY_INFO: '.summary_info',
        SUBTOTAL_LABEL: '.summary_subtotal_label',
        TAX_LABEL: '.summary_tax_label',
        TOTAL_LABEL: '.summary_total_label',
        FINISH_BUTTON: '#finish',
        CANCEL_BACK: '#cancel',
        // Complete
        COMPLETE_HEADER: '.complete-header',
        COMPLETE_TEXT: '.complete-text',
        BACK_HOME: '#back-to-products',
        PONY_EXPRESS: '.pony-express',
    },
    // Menu
    MENU: {
        MENU_CONTAINER: '.bm-menu',
        MENU_ITEMS: '.bm-item',
        CLOSE_MENU: '#react-burger-cross-btn',
        ALL_ITEMS: '#inventory_sidebar_link',
        ABOUT: '#about_sidebar_link',
        LOGOUT: '#logout_sidebar_link',
        RESET_APP: '#reset_sidebar_link',
    },
    // Footer
    FOOTER: {
        FOOTER: '.footer',
        COPY_TEXT: '.footer_copy',
        ROBOT_IMAGE: '.footer_robot',
    },
};
exports.SAUCEDEMO_USERS = {
    STANDARD_USER: 'standard_user',
    PROBLEM_USER: 'problem_user',
    PERFORMANCE_GLITCH_USER: 'performance_glitch_user',
    ERROR_USER: 'error_user',
    VISUAL_USER: 'visual_user',
    LOCKED_OUT_USER: 'locked_out_user',
};
exports.SAUCEDEMO_PASSWORDS = {
    VALID: 'secret_sauce',
    INVALID: 'wrong_password',
};
exports.SAUCEDEMO_URLS = {
    BASE: 'https://www.saucedemo.com',
    LOGIN: 'https://www.saucedemo.com/',
    INVENTORY: 'https://www.saucedemo.com/inventory.html',
    CART: 'https://www.saucedemo.com/cart.html',
    CHECKOUT_STEP_ONE: 'https://www.saucedemo.com/checkout-step-one.html',
    CHECKOUT_STEP_TWO: 'https://www.saucedemo.com/checkout-step-two.html',
    CHECKOUT_COMPLETE: 'https://www.saucedemo.com/checkout-complete.html',
};
exports.SAUCEDEMO_TITLES = {
    LOGIN: 'Swag Labs',
    INVENTORY: 'Swag Labs',
    CART: 'Swag Labs',
    CHECKOUT_STEP_ONE: 'Swag Labs',
    CHECKOUT_STEP_TWO: 'Swag Labs',
    CHECKOUT_COMPLETE: 'Swag Labs',
};
exports.SAUCEDEMO_ERROR_MESSAGES = {
    LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
    INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
    USERNAME_REQUIRED: 'Epic sadface: Username is required',
    PASSWORD_REQUIRED: 'Epic sadface: Password is required',
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
};
exports.SAUCEDEMO_PLACEHOLDERS = {
    USERNAME: 'Username',
    PASSWORD: 'Password',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    POSTAL_CODE: 'Zip/Postal Code',
};
exports.SAUCEDEMO_BUTTON_TEXTS = {
    LOGIN: 'LOGIN',
    ADD_TO_CART: 'ADD TO CART',
    REMOVE: 'REMOVE',
    CHECKOUT: 'CHECKOUT',
    CONTINUE: 'CONTINUE',
    FINISH: 'FINISH',
    CANCEL: 'CANCEL',
    BACK_HOME: 'BACK HOME',
    CONTINUE_SHOPPING: 'CONTINUE SHOPPING',
};
exports.SAUCEDEMO_SORT_OPTIONS = {
    NAME_A_TO_Z: 'Name (A to Z)',
    NAME_Z_TO_A: 'Name (Z to A)',
    PRICE_LOW_TO_HIGH: 'Price (low to high)',
    PRICE_HIGH_TO_LOW: 'Price (high to low)',
};
exports.SAUCEDEMO_PRODUCTS = {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
    FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
    ONESIE: 'Sauce Labs Onesie',
    RED_TSHIRT: 'Test.allTheThings() T-Shirt (Red)',
};
exports.SAUCEDEMO_PRICES = {
    BACKPACK: '$29.99',
    BIKE_LIGHT: '$9.99',
    BOLT_TSHIRT: '$15.99',
    FLEECE_JACKET: '$49.99',
    ONESIE: '$7.99',
    RED_TSHIRT: '$15.99',
};
exports.SAUCEDEMO_TIMEOUTS = {
    SHORT: 2000,
    MEDIUM: 5000,
    LONG: 10000,
    EXTRA_LONG: 30000,
};
exports.SAUCEDEMO_VIEWPORTS = {
    DESKTOP: { width: 1280, height: 720 },
    MOBILE: { width: 375, height: 667 },
    TABLET: { width: 768, height: 1024 },
    WIDESCREEN: { width: 1920, height: 1080 },
};
exports.SAUCEDEMO_TEST_TAGS = {
    SMOKE: '@smoke',
    REGRESSION: '@regression',
    SANITY: '@sanity',
    PERFORMANCE: '@performance',
    VISUAL: '@visual',
    MOBILE: '@mobile',
    DESKTOP: '@desktop',
};
exports.SAUCEDEMO_ENVIRONMENTS = {
    LOCAL: 'local',
    CI: 'ci',
    MOBILE: 'mobile',
    PERFORMANCE: 'performance',
};
//# sourceMappingURL=saucedemo-constants.js.map