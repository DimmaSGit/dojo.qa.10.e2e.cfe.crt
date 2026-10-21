import { expect, Page } from '@playwright/test';

export async function checkErrorMessagesForFeedbackForm(page: Page) {
    await expect(page.getByText("name обов'язкове поле")).toBeVisible();
    await expect(page.getByText("email некоректний email")).toBeVisible();
    await expect(page.getByText("message обов'язкове поле")).toBeVisible();
}

export async function checkSuccessMessageForFeedbackForm(page: Page) {
    await expect(page.getByRole('heading', { name: 'Дякуємо! 🎉' })).toBeVisible();
}

async function submitFeedbackForm(page: Page) {  
    await page.getByTestId("contact-submit").click();
}
export async function fillFeedbackForm(
    page: Page, 
    userData: {
        name?: string;
        email?: string;
        message?: string;
        subject?: string;
        priority?: string;
        attachment?: string;
        obtainCopy?: boolean;
    }

) {
   if (userData.name) await fillName(page, userData.name);
   if (userData.email) await fillEmail(page, userData.email);
   if (userData.message) await fillMessage(page, userData.message);
   if (userData.subject) await fillSubject(page, userData.subject);
   if (userData.priority) await selectPriority(page, userData.priority);
   if (userData.attachment) await uploadAttachment(page, userData.attachment);
   if (userData.obtainCopy !== undefined) await checkObtainCopy(page, userData.obtainCopy);

   await submitFeedbackForm(page);
} 

async function fillName(page: Page, name: string) {
    await page.getByTestId("contact-name" ).fill(name);
}   

async function fillEmail(page: Page, email: string) {
    await page.getByTestId("contact-email" ).fill(email);
}

async function fillMessage(page: Page, message: string) {
    await page.getByTestId('contact-message' ).fill(message);
}

async function fillSubject(page: Page, subject: string) {
    if (subject !== "Загальне питання") {
      await page.getByTestId("contact-subject").selectOption("feature");
    }
}

async function selectPriority(page: Page, priority: string) {
    if (priority !== 'medium' && priority !== '') {
        await page.getByTestId(`contact-priority-${priority}`).check();
    }
}

async function uploadAttachment(page: Page, filePath: string) {
    if (filePath !== '') {
        await page.getByTestId("contact-attachments").setInputFiles(filePath);
    }
}

async function checkObtainCopy(page: Page, obtainCopy: boolean) {
    if (obtainCopy) {
        await page.getByTestId("contact-copy-me").check();
    }
}