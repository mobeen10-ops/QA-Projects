import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login Tests', ()=>{
test('Login - Valid Credentials', async ({page})=>{
await page.goto('/');
const loginPage = new LoginPage();
await loginPage.validLogin(page);
});

test('Login - Invalid Credentials', async ({page})=>{
await page.goto('/');
const loginPage = new LoginPage();
await loginPage.invalidLogin(page);
});
});