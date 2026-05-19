import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Login - Valid user login', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.validLogin();
  });

    test('Login - Invalid user login', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.invalidCredentials();
  });

    test('Login - Locked Out user login', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.lockedUserLogin();
  });
});