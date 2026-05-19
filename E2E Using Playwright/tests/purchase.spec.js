const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('E2E Transaction Flow', () => {
  let loginPage, inventoryPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.validLogin();
  });

  test('E2E purchase of specific item', async () => {
    const itemCatalog = 'Sauce Labs Fleece Jacket';

    // Item Addition Phase
    await inventoryPage.addProductToCart(itemCatalog);
    expect(await inventoryPage.fetchCartCountValue()).toBe('1');
    await inventoryPage.clickCartIcon();

    // Order Information Completion Phase
    await checkoutPage.initCheckoutSequence();
    await checkoutPage.submitCustomerInformation('Alex', 'Mercer', '90210');
    
    // Order Dispatch Closure Phase
    await checkoutPage.processFinalOrderSubmission();
    const notificationMessage = await checkoutPage.getConfirmationText();
    expect(notificationMessage).toBe('Thank you for your order!');
  });
  
  test('E2E purchase of random item', async () => {
    await inventoryPage.addRandomItem();
    expect(await inventoryPage.fetchCartCountValue()).toBe('1');
    await inventoryPage.clickCartIcon();
    await checkoutPage.initCheckoutSequence();
    await checkoutPage.submitCustomerInformation('Testing', 'User', '50310');
    await checkoutPage.processFinalOrderSubmission();
    await inventoryPage.orderConfirmation();
  });
});