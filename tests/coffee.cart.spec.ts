import { test, expect } from '@playwright/test';

test(
  "successfully add a drink to the cart",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Espresso"]').click();

    await expect(page.locator('[aria-label="Cart page"]')).toContainText("1");
  },
);

test("check the sum of 2 drinks", { tag: ["@positive"] }, async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();

  await expect(page.locator('[data-test="checkout"]')).toContainText("29");
});

test(
  "validate the email and name for purchase",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Americano"]').click();
    await page.locator('[data-test="checkout"]').click();
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
  "validate the drinks purchase is successful",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Americano"]').click();
    await page.locator('[data-test="checkout"]').click();
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
  "validate promo for drinks is available",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Americano"]').click();

    await expect(page.locator("div.promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
  },
);

test(
  "validate the cart has specific drinks",
  { tag: ["@positive"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
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
  "validate empty cart has a error message",
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
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
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
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("trust");
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("trust-not-an-email");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator('[class="snackbar success"]')).not.toBeVisible();
  },
);

test(
  "validate removing the only item empties the cart",
  { tag: ["@negative"] },
  async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="Espresso"]').click();
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