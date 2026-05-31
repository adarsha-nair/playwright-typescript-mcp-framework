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
export declare const sauceDemoEnvironments: Record<string, SauceDemoEnvironmentConfig>;
export declare function getSauceDemoEnvironment(): SauceDemoEnvironmentConfig;
//# sourceMappingURL=environments.d.ts.map