const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const {CheckoutPage} = require('./checkoutPage')

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutPage = new CheckoutPage(page);
    this.pageHeader = page.locator('.title');
    this.cartCounterBadge = page.locator('.shopping_cart_badge');
    this.cartAnchorLink = page.locator('.shopping_cart_link');
    this.addToCartBtn = page.getByRole('button', {name:'Add to cart'})
  }

  generateProductSelector(itemName) {
    const serializedId = itemName.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="add-to-cart-${serializedId}"]`);
  }

  async addProductToCart(itemName) {
    const targetElement = this.generateProductSelector(itemName);
    await targetElement.waitFor({ state: 'visible' });
    await targetElement.click();
  }

  async fetchCartCountValue() {
    if (await this.cartCounterBadge.isVisible()) {
      return await this.cartCounterBadge.textContent();
    }
    return '0';
  }

  async clickCartIcon() {
    await this.cartAnchorLink.click();
  }

  async addRandomItem(){
    await expect(this.addToCartBtn.last()).toBeVisible();
     let totalItems = await this.addToCartBtn.count();
     totalItems = totalItems - 1
     const random = await Math.floor(Math.random() * (totalItems - 0 + 1) + 0);
     await this.addToCartBtn.nth(random).click();
  }

  async orderConfirmation(){
    const notificationMessage = await this.checkoutPage.getConfirmationText();
    expect(notificationMessage).toBe('Thank you for your order!');
    await this.page.getByRole('button', {name:'Back Home'}).click();
  }
}

module.exports = { InventoryPage };