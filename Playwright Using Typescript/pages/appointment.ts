import { expect, Page } from '@playwright/test';

class AppointmentPage {

async bookAppointment(page:Page){
const calendarIcon = page.locator('#txt_visit_date');
const commentsBox = page.locator('#txt_comment');
const bookAppointmentBtn = page.locator('#btn-book-appointment');

await calendarIcon.click();
await page.getByRole('cell', { name: '1', exact: true }).first().click();
await commentsBox.fill('Booking Testing Appointment');
await bookAppointmentBtn.click();
await expect(page.getByText('Please be informed that your appointment has been booked as following:')).toBeVisible(); 
}

async hospitalReadmission(page:Page){
const readmissionChkBox = page.locator('#chk_hospotal_readmission');

await readmissionChkBox.click();
}

async viewAppointmentHistory(page:Page){
 const hamburgerIcon = page.locator('#menu-toggle');

 await hamburgerIcon.click();
 await page.getByText('History').click();   
 await expect(page.locator('.panel-body').first()).toBeVisible();   
}


}

export {AppointmentPage}