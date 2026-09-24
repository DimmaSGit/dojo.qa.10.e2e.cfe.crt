import { test, expect } from '@playwright/test';

test.describe("coffee-cart flow", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page}) => {
    page.goto("/")
  })

test(
  "successfully add a drink to the cart",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Espresso']").click();

    await expect(page.locator("[aria-label = 'Cart page']")).toContainText("1");
  },
);

test("check the sum of 2 drinks in the cart", { tag: ["@positive"] }, async ({ page }) => {
  await page.locator("[data-test = 'Espresso']").click();
  await page.locator("[data-test = 'Cappuccino']").click();

  await expect(page.locator("[data-test='checkout']")).toContainText("29");
});

test(
  "validate the email and name for purchase",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[data-test = 'Americano']").click();
    await page.locator("[data-test='checkout']").click();
    await page.locator("#name").fill("trust");
    await page.locator("#email").fill("trust@gm.com");

    await expect(page.locator("#name")).toHaveValue("trust");
    await expect(page.locator("#email")).toHaveValue("trust@gm.com");
  },
);

test(
  "validate that purchase of drinks is successful",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[data-test = 'Americano']").click();
    await page.locator("[data-test='checkout']").click();
    await page.locator("#name").fill("trust");
    await page.locator("#email").fill("trust@gm.com");
    await page.locator("#promotion").check();
    await page.locator("#submit-payment").click();

    await expect(page.locator(".snackbar.success")).toBeVisible();
    await expect(page.locator(".snackbar.success")).toContainText(
      "Thanks for your purchase",
    );
  },
);

test(
  "validate promo for drinks is available and Discounted drink is in place",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Espresso']").click();
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[data-test = 'Americano']").click();

    await expect(page.locator("div.promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );

    await page.locator(".yes").click();
    await page.locator("[aria-label = 'Cart page']").click();
    await expect(page.locator('div').filter({ hasText: /^\(Discounted\) Mocha$/ })).toBeVisible();
  },
);

test(
  "validate the cart has specific drinks",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Espresso']").click();
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[data-test = 'Espresso_Macchiato']").click();
    await page.locator("[aria-label = 'Cart page']").click();

    await expect(
      page.locator("div").filter({ hasText: /^Espresso$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Espresso Macchiato$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Cappuccino$/ }),
    ).toBeVisible();
  },
);

test(
  "validate empty cart has an error message",
  { tag: ["@negative"] },
  async ({ page }) => {
    page.locator("[aria-label = 'Cart page']").click();

    await expect(
      page.locator("p").filter({ hasText: /^No coffee, go add some.$/ }),
    ).toBeVisible();
  },
);

test(
  "validate checkout is rejected when name and email are empty",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[data-test='checkout']").click();
    await page.locator("#name").fill("");
    await page.locator("#email").fill("");
    await page.locator("#submit-payment").click();

    await expect(page.locator(".snackbar.success")).not.toBeVisible();
    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
  },
);

test(
  "validate checkout is rejected with an invalid email format",
  { tag: ["@negative"] },
  async ({ page }) => {
   await page.locator("[data-test = 'Cappuccino']").click();
   await page.locator("[data-test='checkout']").click();

    const emailInput = page.locator("#email");
    await page.locator("#name").fill("trust");
    await emailInput.fill("invalid-email-format");
    await page.locator("#submit-payment").click();

    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    
    expect(validationMessage).toContain(
      "Please include an '@' in the email address",
    );
  },
);

test(
  "validate removing an item empties the cart",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.locator("[data-test = 'Cappuccino']").click();
    await page.locator("[aria-label = 'Cart page']").click();
    await page.locator(".delete").click();

    await expect(page.locator("[aria-label = 'Cart page']")).toContainText(
      "cart (0)",
    );
    await expect(
      page.locator("p").filter({ hasText: /^No coffee, go add some.$/ }),
    ).toBeVisible();
  },
);
});