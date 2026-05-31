import { Page } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/saucedemo-login-page';
import { SauceDemoHomePage } from '../pages/saucedemo-home-page';
import { SauceDemoTestData } from '../config/saucedemo-test-data';
import { getSauceDemoEnvironment } from '../config/environments';
export interface SauceDemoTestOptions {
    page: Page;
    sauceDemoLoginPage: SauceDemoLoginPage;
    sauceDemoHomePage: SauceDemoHomePage;
    sauceDemoTestData: SauceDemoTestData;
    env: ReturnType<typeof getSauceDemoEnvironment>;
}
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & SauceDemoTestOptions, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
export { expect } from '@playwright/test';
export default test;
//# sourceMappingURL=saucedemo-fixture.d.ts.map