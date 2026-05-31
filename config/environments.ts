export interface SauceDemoEnvironmentConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  headless: boolean;
  slowMo: number;
  viewport: {
    width: number;
    height: number;
  };
  testScenarios: {
    performanceGlitch: boolean;
    visualTesting: boolean;
    errorSimulation: boolean;
  };
}

export const sauceDemoEnvironments: Record<string, SauceDemoEnvironmentConfig> = {
  local: {
    baseUrl: 'https://www.saucedemo.com',
    timeout: 10000,
    retryAttempts: 3,
    headless: false,
    slowMo: 100,
    viewport: { width: 1280, height: 720 },
    testScenarios: {
      performanceGlitch: false,
      visualTesting: true,
      errorSimulation: false
    }
  },
  ci: {
    baseUrl: 'https://www.saucedemo.com',
    timeout: 30000,
    retryAttempts: 2,
    headless: true,
    slowMo: 0,
    viewport: { width: 1280, height: 720 },
    testScenarios: {
      performanceGlitch: true,
      visualTesting: false,
      errorSimulation: true
    }
  },
  mobile: {
    baseUrl: 'https://www.saucedemo.com',
    timeout: 15000,
    retryAttempts: 2,
    headless: false,
    slowMo: 50,
    viewport: { width: 375, height: 667 }, // iPhone viewport
    testScenarios: {
      performanceGlitch: false,
      visualTesting: true,
      errorSimulation: false
    }
  },
  performance: {
    baseUrl: 'https://www.saucedemo.com',
    timeout: 60000,
    retryAttempts: 1,
    headless: true,
    slowMo: 0,
    viewport: { width: 1920, height: 1080 },
    testScenarios: {
      performanceGlitch: true,
      visualTesting: false,
      errorSimulation: false
    }
  }
};

export function getSauceDemoEnvironment(): SauceDemoEnvironmentConfig {
  const env = process.env.NODE_ENV || 'local';
  return sauceDemoEnvironments[env] || sauceDemoEnvironments.local;
}
