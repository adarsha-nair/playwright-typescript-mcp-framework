import { Page } from '@playwright/test';
export declare class TestHelpers {
    static generateRandomString(length?: number): string;
    static generateRandomEmail(): string;
    static generateRandomNumber(min?: number, max?: number): number;
    static generateRandomPhone(): string;
    static getCurrentDate(format?: string): string;
    static addDaysToDate(days: number): string;
    static takeScreenshot(page: Page, testName: string): Promise<string>;
    static waitForElementWithRetry(page: Page, selector: string, maxRetries?: number, timeout?: number): Promise<void>;
    static capitalizeFirstLetter(str: string): string;
    static camelToSnakeCase(str: string): string;
    static snakeToCamelCase(str: string): string;
    static isValidEmail(email: string): boolean;
    static isValidPhone(phone: string): boolean;
    static isValidUrl(url: string): boolean;
    static getEnvironmentVariable(key: string, defaultValue?: string): string | undefined;
    static isCiEnvironment(): boolean;
    static log(message: string, level?: 'info' | 'warn' | 'error'): void;
}
//# sourceMappingURL=helpers.d.ts.map