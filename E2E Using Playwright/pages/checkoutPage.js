const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.completeHeaderNotice = page.locator('.complete-header');
  }

  async initCheckoutSequence() {
    await this.checkoutBtn.click();
  }

  async submitCustomerInformation(first, last, zip) {
    await this.firstNameField.fill(first);
    await this.lastNameField.fill(last);
    await this.postalCodeField.fill(zip);
    await this.continueBtn.click();
  }

  async processFinalOrderSubmission() {
    await this.finishBtn.click();
  }

  async getConfirmationText() {
    return await this.completeHeaderNotice.textContent();
  }
}

module.exports = { CheckoutPage };