import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { AppointmentPage } from '../pages/appointment';

test.describe('Book Appointment Tests', ()=>{
test('Book new appointment', async ({page})=> {
await page.goto('/');
const login = new LoginPage()
await login.validLogin(page);
const appointments = new AppointmentPage();
await appointments.bookAppointment(page);
});

test('Book new appointment with hospital readmission', async ({page})=> {
await page.goto('/');
const login = new LoginPage()
await login.validLogin(page);
const appointments = new AppointmentPage();
await appointments.hospitalReadmission(page);
await appointments.bookAppointment(page);
});

test('View appointment history', async ({page})=> {
await page.goto('/');
const login = new LoginPage()
await login.validLogin(page);
const appointments = new AppointmentPage();
await appointments.bookAppointment(page);
await appointments.viewAppointmentHistory(page);
});
});