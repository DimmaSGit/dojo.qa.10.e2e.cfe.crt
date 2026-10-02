import { test, expect, Page } from '@playwright/test';
import * as actions from './pageActions'

test.describe("coffee-cart flow - with functions", () => {
  test.beforeEach(async ({ page}) => {
    page.goto("/")
  })

test(
  "REF-00001 validate that purchase of drinks is successful",
  { tag: ["@positive"] },
  async ({ page }) => {
    await actions.clickOnEspresso(page);
    await actions.clickOnCappuccino(page);
    await actions.clickOnAmericano(page);
    await actions.clickOnCheckout(page);
    await actions.fillName(page, "tester");
    await actions.fillEmail(page, "trust@gm.com")
    await actions.checkPromoCheckbox(page);
    await actions.clickOnSubmitButton(page);

    await expect(page.getByRole("button", {name: "Thanks for your purchase. Please check your email for payment."})).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Thanks for your purchase. Please check your email for payment.",
      }),
    ).toContainText("Thanks for your purchase");
  },
);

test(
  "REF-0002 validate promo for drinks is available and Discounted drink added to the cart",
  { tag: ["@positive"] },
  async ({ page }) => {
    await actions.clickOnEspresso(page);
    await actions.clickOnCappuccino(page);
    await actions.clickOnAmericano(page);

    await expect(page.locator("div.promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );

    await actions.clickOnYesPromoButton(page);
    await actions.clickOnCart(page);

    await expect(page.locator('div').filter({ hasText: /^\(Discounted\) Mocha$/ })).toBeVisible();
  },
);

});