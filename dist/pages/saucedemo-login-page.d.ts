import { SauceDemoBasePage } from './base-page';
export declare class SauceDemoLoginPage extends SauceDemoBasePage {
    private readonly usernameInput;
    private readonly passwordInput;
    private readonly loginButton;
    private readonly errorMessage;
    private readonly loginLogo;
    private readonly botColumn;
    private readonly loginCredentials;
    private readonly passwordInfo;
    navigate(): Promise<void>;
    login(username: string, password: string): Promise<void>;
    getUsernamePlaceholder(): Promise<string>;
    getPasswordPlaceholder(): Promise<string>;
    getErrorMessage(): Promise<string>;
    isErrorMessageVisible(): Promise<boolean>;
    isLoginButtonEnabled(): Promise<boolean>;
    getLoginButtonText(): Promise<string>;
    verifyLoginPageLoaded(): Promise<void>;
    verifyLoginCredentialsVisible(): Promise<void>;
    verifyErrorMessage(message: string): Promise<void>;
    verifyUsernamePlaceholder(expectedPlaceholder: string): Promise<void>;
    verifyPasswordPlaceholder(expectedPlaceholder: string): Promise<void>;
    verifyLoginButtonText(expectedText: string): Promise<void>;
    clearForm(): Promise<void>;
    getPageTitle(): Promise<string>;
    getCurrentUrl(): Promise<string>;
    waitForLoginButton(): Promise<void>;
    waitForErrorMessage(): Promise<void>;
    pressEnterOnUsername(): Promise<void>;
    pressEnterOnPassword(): Promise<void>;
    pressTabOnUsername(): Promise<void>;
    isUsernameFieldEmpty(): Promise<boolean>;
    isPasswordFieldEmpty(): Promise<boolean>;
    getUsernameValue(): Promise<string>;
    getPasswordValue(): Promise<string>;
}
//# sourceMappingURL=saucedemo-login-page.d.ts.map