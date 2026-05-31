import { Page } from '@playwright/test';

export class TestHelpers {
  // Random data generators
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'test.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `test.${this.generateRandomString(8)}@${domain}`;
  }

  static generateRandomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomPhone(): string {
    return `+1${this.generateRandomNumber(10)}`;
  }

  // Date utilities
  static getCurrentDate(format: string = 'YYYY-MM-DD'): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }

  static addDaysToDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // File utilities
  static async takeScreenshot(page: Page, testName: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}_${timestamp}.png`;
    const path = `reports/screenshots/${filename}`;
    
    await page.screenshot({ path, fullPage: true });
    return path;
  }

  // Wait utilities
  static async waitForElementWithRetry(
    page: Page,
    selector: string,
    maxRetries: number = 3,
    timeout: number = 5000
  ): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await page.waitForSelector(selector, { timeout });
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  // String utilities
  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  static snakeToCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  // Validation utilities
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Environment utilities
  static getEnvironmentVariable(key: string, defaultValue?: string): string | undefined {
    return process.env[key] || defaultValue;
  }

  static isCiEnvironment(): boolean {
    return process.env.CI === 'true' || process.env.CI === '1';
  }

  // Logging utilities
  static log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    switch (level) {
      case 'error':
        console.error(logMessage);
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }
}
