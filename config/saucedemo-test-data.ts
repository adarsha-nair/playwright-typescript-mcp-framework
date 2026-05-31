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
    homePage: {
      title: string;
      expectedItemCount: number;
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
      title: string;
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
  // Additional test data for comprehensive testing
  testData: {
    checkout: {
      validUser: {
        firstName: string;
        lastName: string;
        postalCode: string;
      };
      invalidUsers: {
        emptyFirstName: {
          firstName: string;
          lastName: string;
          postalCode: string;
          expectedError: string;
        };
        emptyLastName: {
          firstName: string;
          lastName: string;
          postalCode: string;
          expectedError: string;
        };
        emptyPostalCode: {
          firstName: string;
          lastName: string;
          postalCode: string;
          expectedError: string;
        };
        emptyAll: {
          firstName: string;
          lastName: string;
          postalCode: string;
          expectedError: string;
        };
      };
    };
    cart: {
      testProducts: string[];
      singleProduct: string;
      expectedPrices: {
        [key: string]: string;
      };
      expectedTotals: {
        singleItem: number;
        twoItems: number;
        threeItems: number;
      };
    };
    orderCompletion: {
      successMessage: string;
      completeText: string;
      backButtonText: string;
    };
    performance: {
      maxLoadTime: number;
      maxOperationTime: number;
      maxSortTime: number;
    };
    viewports: {
      mobile: { width: number; height: number };
      tablet: { width: number; height: number };
      desktop: { width: number; height: number };
    };
  };
}

export const sauceDemoTestData: SauceDemoTestData = {
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
      loginButtonText: 'Login'
    },
    homePage: {
      title: 'Swag Labs',
      expectedItemCount: 6
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
      title: 'Swag Labs',
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
  },
  // Additional test data for comprehensive testing
  testData: {
    checkout: {
      validUser: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
      },
      invalidUsers: {
        emptyFirstName: {
          firstName: '',
          lastName: 'Doe',
          postalCode: '12345',
          expectedError: 'Error: First Name is required'
        },
        emptyLastName: {
          firstName: 'John',
          lastName: '',
          postalCode: '12345',
          expectedError: 'Error: Last Name is required'
        },
        emptyPostalCode: {
          firstName: 'John',
          lastName: 'Doe',
          postalCode: '',
          expectedError: 'Error: Postal Code is required'
        },
        emptyAll: {
          firstName: '',
          lastName: '',
          postalCode: '',
          expectedError: 'Error: First Name is required'
        }
      }
    },
    cart: {
      testProducts: ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'],
      singleProduct: 'Sauce Labs Backpack',
      expectedPrices: {
        'Sauce Labs Backpack': '$29.99',
        'Sauce Labs Bike Light': '$9.99',
        'Sauce Labs Bolt T-Shirt': '$15.99',
        'Sauce Labs Fleece Jacket': '$49.99',
        'Sauce Labs Onesie': '$7.99',
        'Test.allTheThings() T-Shirt (Red)': '$15.99'
      },
      expectedTotals: {
        singleItem: 29.99,
        twoItems: 39.98,
        threeItems: 55.97
      }
    },
    orderCompletion: {
      successMessage: 'Thank you for your order!',
      completeText: 'Your order has been dispatched, and will arrive just as fast as the pony express gets there!',
      backButtonText: 'BACK HOME'
    },
    performance: {
      maxLoadTime: 3000,
      maxOperationTime: 2000,
      maxSortTime: 2000
    },
    viewports: {
      mobile: { width: 375, height: 667 },
      tablet: { width: 768, height: 1024 },
      desktop: { width: 1920, height: 1080 }
    }
  }
};
