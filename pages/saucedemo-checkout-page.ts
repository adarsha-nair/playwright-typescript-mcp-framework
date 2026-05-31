import { SauceDemoBasePage } from './base-page';
import { expect } from '@playwright/test';

export class SauceDemoCheckoutPage extends SauceDemoBasePage {
  // Step One - Information
  private readonly checkoutStepOneTitle = '.title';
  private readonly firstNameInput = '#first-name';
  private readonly lastNameInput = '#last-name';
  private readonly postalCodeInput = '#postal-code';
  private readonly continueButton = '#continue';
  private readonly cancelButton = '#cancel';
  private readonly errorMessage = '[data-test="error"]';
  
  // Step Two - Overview
  private readonly checkoutStepTwoTitle = '.title';
  private readonly cartItem = '.cart_item';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly itemQuantity = '.cart_quantity';
  private readonly paymentInfoLabel = '.summary_info_label';
  private readonly paymentInfoValue = '.summary_value';
  private readonly subtotalLabel = '.summary_subtotal_label';
  private readonly taxLabel = '.summary_tax_label';
  private readonly totalLabel = '.summary_total_label';
  private readonly finishButton = '#finish';
  
  // Step Two - Cart Summary
  private readonly paymentInfo = '[data-test="payment-info-value"]';
  private readonly shippingInfo = '[data-test="shipping-info-value"]';
  private readonly priceTotal = '[data-test="total-label"]';

  async verifyCheckoutStepOneLoaded(): Promise<void> {
    await this.shouldBeVisible(this.checkoutStepOneTitle);
    await this.shouldHaveText(this.checkoutStepOneTitle, 'Checkout: Your Information');
    await this.shouldBeVisible(this.firstNameInput);
    await this.shouldBeVisible(this.lastNameInput);
    await this.shouldBeVisible(this.postalCodeInput);
    await this.shouldBeVisible(this.continueButton);
    await this.shouldBeVisible(this.cancelButton);
  }

  async verifyCheckoutStepTwoLoaded(): Promise<void> {
    await this.shouldBeVisible(this.checkoutStepTwoTitle);
    await this.shouldHaveText(this.checkoutStepTwoTitle, 'Checkout: Overview');
    await this.shouldBeVisible(this.finishButton);
    await this.shouldBeVisible(this.cancelButton);
  }

  // Step One - Information Methods
  async fillFirstName(firstName: string): Promise<void> {
    await this.type(this.firstNameInput, firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.type(this.lastNameInput, lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.type(this.postalCodeInput, postalCode);
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async clearFirstName(): Promise<void> {
    await this.page.fill(this.firstNameInput, '');
  }

  async clearLastName(): Promise<void> {
    await this.page.fill(this.lastNameInput, '');
  }

  async clearPostalCode(): Promise<void> {
    await this.page.fill(this.postalCodeInput, '');
  }

  async clearAllFields(): Promise<void> {
    await this.clearFirstName();
    await this.clearLastName();
    await this.clearPostalCode();
  }

  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
  }

  async clickCancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  // Step Two - Overview Methods
  async getCheckoutItemCount(): Promise<number> {
    const items = await this.page.locator(this.cartItem).count();
    return items;
  }

  async getCheckoutItemNames(): Promise<string[]> {
    const itemNames = await this.page.locator(this.itemName).allTextContents();
    return itemNames;
  }

  async getCheckoutItemPrices(): Promise<string[]> {
    const itemPrices = await this.page.locator(this.itemPrice).allTextContents();
    return itemPrices;
  }

  async getCheckoutItemQuantities(): Promise<string[]> {
    const quantities = await this.page.locator(this.itemQuantity).allTextContents();
    return quantities;
  }

  async getSubtotal(): Promise<number> {
    const subtotalText = await this.getText(this.subtotalLabel);
    const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
    return subtotal;
  }

  async getTax(): Promise<number> {
    const taxText = await this.getText(this.taxLabel);
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    return tax;
  }

  async getTotal(): Promise<number> {
    const totalText = await this.getText(this.totalLabel);
    const total = parseFloat(totalText.replace('Total: $', ''));
    return total;
  }

  async getPaymentInformation(): Promise<string> {
    return await this.getInnerText(this.paymentInfo);
  }

  async getShippingInformation(): Promise<string> {
    return await this.getInnerText(this.shippingInfo);
  }

  async clickFinish(): Promise<void> {
    await this.click(this.finishButton);
  }

  async clickCancelFromOverview(): Promise<void> {
    await this.click(this.cancelButton);
  }

  // Error handling
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async hasErrorMessage(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async dismissError(): Promise<void> {
    const errorButton = `${this.errorMessage} button`;
    if (await this.isVisible(errorButton)) {
      await this.click(errorButton);
    }
  }

  // Verification methods
  async verifyFirstNameValue(expectedValue: string): Promise<void> {
    const actualValue = await this.getValue(this.firstNameInput);
    expect(actualValue).toBe(expectedValue);
  }

  async verifyLastNameValue(expectedValue: string): Promise<void> {
    const actualValue = await this.getValue(this.lastNameInput);
    expect(actualValue).toBe(expectedValue);
  }

  async verifyPostalCodeValue(expectedValue: string): Promise<void> {
    const actualValue = await this.getValue(this.postalCodeInput);
    expect(actualValue).toBe(expectedValue);
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.shouldContainText(this.errorMessage, expectedMessage);
  }

  async verifyNoErrorMessage(): Promise<void> {
    await this.shouldBeHidden(this.errorMessage);
  }

  async verifyCheckoutItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCheckoutItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  async verifyItemInCheckout(itemName: string): Promise<void> {
    const itemNames = await this.getCheckoutItemNames();
    expect(itemNames).toContain(itemName);
  }

  async verifySubtotalAmount(expectedAmount: number): Promise<void> {
    const actualSubtotal = await this.getSubtotal();
    expect(actualSubtotal).toBeCloseTo(expectedAmount, 2);
  }

  async verifyTaxAmount(expectedAmount: number): Promise<void> {
    const actualTax = await this.getTax();
    expect(actualTax).toBeCloseTo(expectedAmount, 2);
  }

  async verifyTotalAmount(expectedAmount: number): Promise<void> {
    const actualTotal = await this.getTotal();
    expect(actualTotal).toBeCloseTo(expectedAmount, 2);
  }

  async verifyTotalEqualsSubtotalPlusTax(): Promise<void> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }

  async verifyPaymentInfoContains(expectedText: string): Promise<void> {
    const paymentInfo = await this.getPaymentInformation();
    expect(paymentInfo).toContain(expectedText);
  }

  async verifyShippingInfoContains(expectedText: string): Promise<void> {
    const shippingInfo = await this.getShippingInformation();
    expect(shippingInfo).toContain(expectedText);
  }

  async verifyContinueButtonEnabled(): Promise<void> {
    await this.shouldBeEnabled(this.continueButton);
  }

  async verifyContinueButtonDisabled(): Promise<void> {
    await this.shouldBeDisabled(this.continueButton);
  }

  async verifyFinishButtonEnabled(): Promise<void> {
    await this.shouldBeEnabled(this.finishButton);
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).toContain(expectedUrl);
  }

  // Utility methods
  async waitForCheckoutStepOneToLoad(): Promise<void> {
    await this.waitForElementVisible(this.checkoutStepOneTitle);
  }

  async waitForCheckoutStepTwoToLoad(): Promise<void> {
    await this.waitForElementVisible(this.checkoutStepTwoTitle);
  }

  async refreshCheckout(): Promise<void> {
    await this.reload();
    if (await this.isVisible(this.checkoutStepOneTitle)) {
      await this.waitForCheckoutStepOneToLoad();
    } else if (await this.isVisible(this.checkoutStepTwoTitle)) {
      await this.waitForCheckoutStepTwoToLoad();
    }
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
