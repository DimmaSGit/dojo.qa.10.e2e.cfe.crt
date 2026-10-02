import { Page } from '@playwright/test'

export async function clickOnEspresso(page: Page) {
        await page.getByTestId("Espresso").click();
}
export async function clickOnCappuccino(page: Page) {
    await page.getByTestId("Cappuccino").click();
}
export async function clickOnAmericano(page: Page) {
    await page.getByTestId("Americano").click();
}
export async function clickOnCheckout(page: Page) {
    await page.getByTestId("checkout").click();
}
export async function fillName(page: Page, name: string) {
    await page.getByRole("textbox", { name: "Name" }).fill(name);
}
export async function fillEmail(page: Page, email: string) {
    await page.getByRole("textbox", { name: "Email" }).fill(email);
}
export async function checkPromoCheckbox(page: Page) {
  await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
}
export async function clickOnSubmitButton(page: Page) {
    await page.getByRole("button", { name: "Submit" }).click();
}

export async function clickOnYesPromoButton(page: Page) {
    await page.getByRole("button", { name: "Yes, of course!" }).click();
}
export async function clickOnCart(page: Page) {
    await page.getByRole("link", { name: "Cart page" }).click();
}


    
    
    
    
    

    
    