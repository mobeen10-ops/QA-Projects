const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorContainer = page.locator('[data-test="error"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
  }

  
  async validLogin(username,password){
    await this.usernameField.fill(process.env.valid_username);
    await this.passwordField.fill(process.env.user_password);
    await this.loginBtn.click();
    await expect(this.page.url()).toContain('/inventory');
    await expect(this.cartIcon).toBeVisible();

  }

  async invalidCredentials(username,password){
    await this.usernameField.fill(process.env.valid_username);
    await this.passwordField.fill('testing');
    await this.loginBtn.click();
    const errorMessage = await this.readErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  }
  
  
  async lockedUserLogin(username,password) {
    await this.usernameField.fill(process.env.locked_username);
    await this.passwordField.fill(process.env.user_password);
    await this.loginBtn.click();
    const errorMessage = await this.readErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out.');
  }

  async readErrorMessage() {
    return await this.errorContainer.textContent();
  }
}

module.exports = { LoginPage };