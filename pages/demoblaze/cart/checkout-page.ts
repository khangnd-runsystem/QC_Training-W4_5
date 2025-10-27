import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { CheckoutLocators } from '../../../locators/demoblaze/checkout-locators';
import { CheckoutInfo } from '../../../interfaces/demoblaze/checkout-info.interface';
import { OrderConfirmation } from '../../../interfaces/demoblaze/order-confirmation.interface';

export class CheckoutPage extends CommonPage {
  readonly locators: CheckoutLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutLocators(page);
  }

  // Action methods
  async fillCheckoutForm(info: CheckoutInfo): Promise<void> {
    await this.waitForPageLoad();
    await this.click(this.locators.inputName)
    await this.fill(this.locators.inputName, info.name);
    await this.click(this.locators.inputCountry)
    await this.fill(this.locators.inputCountry, info.country);
    await this.click(this.locators.inputCity)
    await this.fill(this.locators.inputCity, info.city);
    await this.click(this.locators.inputCreditCard)
    await this.fill(this.locators.inputCreditCard, info.card);
    await this.click(this.locators.inputMonth)
    await this.fill(this.locators.inputMonth, info.month);
    await this.click(this.locators.inputYear)
    await this.fill(this.locators.inputYear, info.year);
  }

  async clickPurchase(): Promise<void> {
    await this.click(this.locators.btnPurchase);
    await this.page.waitForTimeout(1000); // Wait for confirmation popup
  }

  async closeConfirmation(): Promise<void> {
    await this.waitForVisible(this.locators.btnConfirmationOk);
    await this.click(this.locators.btnConfirmationOk);
  }

  async getOrderConfirmation(): Promise<OrderConfirmation> {
    await this.waitForVisible(this.locators.modalConfirmation);
    const confirmationText = await this.getText(this.locators.txtConfirmationMessage);
    
    // Parse the confirmation message
    // Expected format contains ID, Amount, Card Number, Name, Date
    const lines = confirmationText.split('\n');
    
    return {
      orderId: lines.find(l => l.includes('Id:'))?.split(':')[1]?.trim() || '',
      amount: parseInt(lines.find(l => l.includes('Amount:'))?.split(':')[1]?.trim() || '0'),
      cardNumber: lines.find(l => l.includes('Card Number:'))?.split(':')[1]?.trim() || '',
      name: lines.find(l => l.includes('Name:'))?.split(':')[1]?.trim() || '',
      date: lines.find(l => l.includes('Date:'))?.split(':')[1]?.trim() || ''
    };
  }

  // Verification methods
  async verifyCheckoutModalVisible(): Promise<void> {
    await expect.soft(this.locators.modalCheckout).toBeVisible();
  }

  async verifyConfirmationPopup(): Promise<void> {
    await expect.soft(this.locators.modalConfirmation).toBeVisible();
    await expect.soft(this.locators.txtConfirmationMessage).toContainText('Thank you for your purchase');
  }
}
