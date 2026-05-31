export interface SauceDemoUser {
    username: string;
    password: string;
    displayName: string;
    permissions?: string[];
}
export interface SauceDemoInvalidUser {
    username: string;
    password: string;
    expectedError: string;
}
export interface SauceDemoProduct {
    name: string;
    price: string;
    description: string;
    itemId: string;
}
export interface SauceDemoTestData {
    users: {
        standardUser: SauceDemoUser;
        problemUser: SauceDemoUser;
        performanceGlitchUser: SauceDemoUser;
        errorUser: SauceDemoUser;
        visualUser: SauceDemoUser;
    };
    invalidUsers: {
        lockedOutUser: SauceDemoInvalidUser;
        invalidUsername: SauceDemoInvalidUser;
        invalidPassword: SauceDemoInvalidUser;
        emptyCredentials: SauceDemoInvalidUser;
    };
    urls: {
        baseUrl: string;
        login: string;
        inventory: string;
        cart: string;
        checkout: string;
        checkoutStepTwo: string;
        checkoutComplete: string;
    };
    expectedElements: {
        loginPage: {
            title: string;
            logoText: string;
            usernamePlaceholder: string;
            passwordPlaceholder: string;
            loginButtonText: string;
        };
        inventoryPage: {
            title: string;
            expectedItemCount: number;
            sortDropdownText: string;
        };
        cartPage: {
            title: string;
            checkoutButtonText: string;
        };
        checkoutPage: {
            firstNamePlaceholder: string;
            lastNamePlaceholder: string;
            postalCodePlaceholder: string;
            continueButtonText: string;
        };
        completePage: {
            title: string;
            completeHeaderText: string;
            completeMessageText: string;
            backHomeButtonText: string;
        };
    };
    products: SauceDemoProduct[];
    testScenarios: {
        smoke: string[];
        regression: string[];
        sanity: string[];
        performance: string[];
    };
}
export declare const sauceDemoTestData: SauceDemoTestData;
//# sourceMappingURL=saucedemo-test-data.d.ts.map