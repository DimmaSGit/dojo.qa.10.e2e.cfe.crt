import { test, expect } from '@playwright/test';

test.describe("coffee-cart flow loops", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page}) => {
    await page.goto("https://coffee-cart.app/");
  })

test(
  "successfully add all drinks to the cart",
  { tag: ["@positive"] },
  async ({ page }) => {
    const cupBodyLocator = page.locator('.cup-body')
    const orderCount = await cupBodyLocator.count()

    for(let i = 0; i < orderCount; i++) {
        await page.waitForTimeout(1000)
        await cupBodyLocator.nth(i).click()
    }

    await expect(page.getByRole("link", { name:"Cart page"})).toContainText("9");
  },
);

test(
  "validate prices for drinks are respectful to each",
  { tag: ["@positive"] },
  async ({ page }) => {
    const cupBodyPrices = await page.locator("h4>small").allTextContents();
    const actualPrices = [];

    const prices = ['$10.00', '$12.00', '$19.00', '$8.00', '$18.00', '$7.00', '$16.00', '$14.00', '$15.00'];


    for (let i = 0; i < cupBodyPrices.length; i++) {
      const actualText = cupBodyPrices[i];
      const expectedPrice = prices[i];

      expect(actualText).toBe(expectedPrice);
    }
});

test("check the sum of 100 Mocha in the cart", { tag: ["@positive"] }, async ({ page }) => {
  
  const mochaLocator = page.getByTestId("Mocha");

  await mochaLocator.click();

  await expect(page.getByTestId("checkout")).toContainText("29");
})

});