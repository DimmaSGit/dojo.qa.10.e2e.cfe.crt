import { test, expect } from '@playwright/test';

test(
  "successfully add a drink to the cart",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();

    await expect(page.locator('[aria-label="Cart page"]')).toContainText("1");
  },
);

test("check the sum of 2 drinks in the cart", { tag: ["@positive"] }, async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("Espresso").click();
  await page.getByTestId("Cappuccino").click();

  await expect(page.getByTestId("checkout")).toContainText("29");
});

test(
  "validate the email and name for purchase",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Cappuccino").click();
    await page.getByTestId("Americano").click();
    await page.getByTestId("checkout").click();
    await page.getByRole("textbox", { name: "Name" }).fill("trust");
    await page.getByRole("textbox", { name: "Email" }).fill("trust@gm.com");

    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue(
      "trust",
    );
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
      "trust@gm.com",
    );
  },
);

test(
  "validate that purchase of drinks is successful",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Cappuccino").click();
    await page.getByTestId("Americano").click();
    await page.getByTestId("checkout").click();
    await page.getByRole("textbox", { name: "Name" }).fill("trust");
    await page.getByRole("textbox", { name: "Email" }).fill("trust@gm.com");
    await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator('[class="snackbar success"]')).toBeVisible();
    await expect(page.locator('[class="snackbar success"]')).toContainText(
      "Thanks for your purchase",
    );
  },
);

test(
  "validate promo for drinks is available and Discounted drink is in place",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();
    await page.getByTestId("Cappuccino").click();
    await page.getByTestId("Americano").click();

    await expect(page.locator("div.promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );

    await page.getByRole("button", {name: "Yes, of course!"}).click();
    await page.locator('[aria-label="Cart page"]').click();
    await expect(page.locator('div').filter({ hasText: /^\(Discounted\) Mocha$/ })).toBeVisible();
  },
);

test(
  "validate the cart has specific drinks",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();
    await page.getByTestId("Espresso_Macchiato").click();
    await page.getByTestId("Cappuccino").click();
    await page.locator('[aria-label="Cart page"]').click();

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
    await page.goto("/");

    await page.locator('[aria-label="Cart page"]').click();

    await expect(
      page.locator("p").filter({ hasText: /^No coffee, go add some.$/ }),
    ).toBeVisible();
  },
);

test(
  "validate checkout is rejected when name and email are empty",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();
    await page.getByTestId("checkout").click();
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator('[class="snackbar success"]')).not.toBeVisible();
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue("");
  },
);

test(
  "validate checkout is rejected with an invalid email format",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();
    await page.getByTestId("checkout").click();

    const emailInput = page
      .getByRole("textbox", { name: "Email" });
    await page.getByRole("textbox", { name: "Name" }).fill("trust");
    await emailInput.fill("invalid-email-format");
    await page.getByRole("button", { name: "Submit" }).click();

    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    
    expect(validationMessage).toContain(
      "Please include an '@' in the email address",
    );
  },
);

test(
  "validate removing the only item empties the cart",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("Espresso").click();
    await page.locator('[aria-label="Cart page"]').click();
    await page.getByRole("button", { name: "Remove one Espresso" }).click();

    await expect(page.locator('[aria-label="Cart page"]')).toContainText(
      "cart (0)",
    );
    await expect(
      page.locator("p").filter({ hasText: /^No coffee, go add some.$/ }),
    ).toBeVisible();
  },
);