import { expect, Page } from '@playwright/test';
import process from 'process';

class LoginPage {

async validLogin(page:Page){
const hamburgerIcon = page.locator('#menu-toggle');
const username = page.locator('#txt-username');
const password = page.locator('#txt-password');
const loginBtn = page.locator('#btn-login');
const bookAppointmentBtn = page.locator('#btn-book-appointment');

await hamburgerIcon.click();
await page.getByText('Login').click();
await expect(loginBtn).toBeEnabled();
await username.fill(process.env.valid_username ?? '')
await password.fill(process.env.valid_password ?? '')
await loginBtn.click();
expect(page.url()).toContain('appointment');
await expect(bookAppointmentBtn).toBeVisible();
}

async invalidLogin(page:Page){
const hamburgerIcon = page.locator('#menu-toggle');
const username = page.locator('#txt-username');
const password = page.locator('#txt-password');
const loginBtn = page.locator('#btn-login');
const errorMsg = page.locator('.lead.text-danger')

await hamburgerIcon.click();
await page.getByText('Login').click();
await expect(loginBtn).toBeEnabled();
await username.fill(process.env.valid_username ?? '')
await password.fill('Testing')
await loginBtn.click();
await expect(errorMsg).toBeVisible();
const errorMessage = await errorMsg.textContent();
await expect(errorMessage).toEqual('Login failed! Please ensure the username and password are valid.');

}
}
export { LoginPage };