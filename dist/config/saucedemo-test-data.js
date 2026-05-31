"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sauceDemoTestData = void 0;
exports.sauceDemoTestData = {
    users: {
        standardUser: {
            username: 'standard_user',
            password: 'secret_sauce',
            displayName: 'Standard User',
            permissions: ['browse', 'add_to_cart', 'checkout']
        },
        problemUser: {
            username: 'problem_user',
            password: 'secret_sauce',
            displayName: 'Problem User',
            permissions: ['browse', 'add_to_cart', 'checkout']
        },
        performanceGlitchUser: {
            username: 'performance_glitch_user',
            password: 'secret_sauce',
            displayName: 'Performance Glitch User',
            permissions: ['browse', 'add_to_cart', 'checkout']
        },
        errorUser: {
            username: 'error_user',
            password: 'secret_sauce',
            displayName: 'Error User',
            permissions: ['browse', 'add_to_cart', 'checkout']
        },
        visualUser: {
            username: 'visual_user',
            password: 'secret_sauce',
            displayName: 'Visual User',
            permissions: ['browse', 'add_to_cart', 'checkout']
        }
    },
    invalidUsers: {
        lockedOutUser: {
            username: 'locked_out_user',
            password: 'secret_sauce',
            expectedError: 'Epic sadface: Sorry, this user has been locked out.'
        },
        invalidUsername: {
            username: 'invalid_user',
            password: 'secret_sauce',
            expectedError: 'Epic sadface: Username and password do not match any user in this service'
        },
        invalidPassword: {
            username: 'standard_user',
            password: 'wrong_password',
            expectedError: 'Epic sadface: Username and password do not match any user in this service'
        },
        emptyCredentials: {
            username: '',
            password: '',
            expectedError: 'Epic sadface: Username is required'
        }
    },
    urls: {
        baseUrl: 'https://www.saucedemo.com',
        login: 'https://www.saucedemo.com/',
        inventory: 'https://www.saucedemo.com/inventory.html',
        cart: 'https://www.saucedemo.com/cart.html',
        checkout: 'https://www.saucedemo.com/checkout-step-one.html',
        checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
        checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
    },
    expectedElements: {
        loginPage: {
            title: 'Swag Labs',
            logoText: 'Swag Labs',
            usernamePlaceholder: 'Username',
            passwordPlaceholder: 'Password',
            loginButtonText: 'LOGIN'
        },
        inventoryPage: {
            title: 'Swag Labs',
            expectedItemCount: 6,
            sortDropdownText: 'Name (A to Z)'
        },
        cartPage: {
            title: 'Swag Labs',
            checkoutButtonText: 'CHECKOUT'
        },
        checkoutPage: {
            firstNamePlaceholder: 'First Name',
            lastNamePlaceholder: 'Last Name',
            postalCodePlaceholder: 'Zip/Postal Code',
            continueButtonText: 'CONTINUE'
        },
        completePage: {
            title: 'Swag Labs',
            completeHeaderText: 'THANK YOU FOR YOUR ORDER',
            completeMessageText: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
            backHomeButtonText: 'BACK HOME'
        }
    },
    products: [
        {
            name: 'Sauce Labs Backpack',
            price: '$29.99',
            description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with ergonomic design.',
            itemId: '4'
        },
        {
            name: 'Sauce Labs Bike Light',
            price: '$9.99',
            description: 'A red light isn\'t the desired state in test but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
            itemId: '0'
        },
        {
            name: 'Sauce Labs Bolt T-Shirt',
            price: '$15.99',
            description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
            itemId: '1'
        },
        {
            name: 'Sauce Labs Fleece Jacket',
            price: '$49.99',
            description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a cool day in LA to a brisk ski season in NH. Grab one now.",
            itemId: '5'
        },
        {
            name: 'Sauce Labs Onesie',
            price: '$7.99',
            description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
            itemId: '2'
        },
        {
            name: 'Test.allTheThings() T-Shirt (Red)',
            price: '$15.99',
            description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
            itemId: '3'
        }
    ],
    testScenarios: {
        smoke: ['login-success', 'add-to-cart', 'checkout'],
        regression: ['login-validation', 'product-sort', 'cart-management', 'checkout-flow'],
        sanity: ['page-load', 'element-display', 'navigation'],
        performance: ['load-times', 'response-times', 'resource-optimization']
    }
};
//# sourceMappingURL=saucedemo-test-data.js.map