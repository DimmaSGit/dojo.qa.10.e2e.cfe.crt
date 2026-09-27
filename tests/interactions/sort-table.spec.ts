import { test, expect, Locator } from "@playwright/test";

test.describe("Sorting web table - xpath", () => {
  let authorizationLocator: Locator;
  let creatingLocator: Locator;
  let searchingLocator: Locator;
  let loadingLocator: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://104.168.59.50/laboratory/interactions");

    authorizationLocator = page.locator(
      '//input[contains(@aria-label, "Вибрати Авторизація")]',
    );
    creatingLocator = page.locator(
      '//input[contains(@aria-label, "Вибрати Створення статті")]',
    );
    searchingLocator = page.locator(
      '//input[contains(@aria-label, "Вибрати Пошук за тегом")]',
    );
    loadingLocator = page.locator(
      '//input[contains(@aria-label, "Вибрати Завантаження файлу")]',
    );
  });

  test("rows are successfully checked", async ({ page }) => {
    await authorizationLocator.click();
    await creatingLocator.click();
    await searchingLocator.click();
    await loadingLocator.click();

    await expect(authorizationLocator).toBeChecked();
    await expect(creatingLocator).toBeChecked();
    await expect(searchingLocator).toBeChecked();
    await expect(loadingLocator).toBeChecked();
    await expect(
      page.locator('//span[@data-testid="interactions-selected-count"]'),
    ).toContainText('4');
  });

  test("validate rows and columns counts", async ({
    page,
  }) => {
    await expect(page.locator('//table')).toBeVisible();
    const rowsLocator:Locator = page.locator("//table/tbody/tr");
    const columnsLocator:Locator = page.locator("//table/thead/tr/th");

    expect(await rowsLocator.count()).toEqual(4)
    expect(await columnsLocator.count()).toEqual(4);

  });

  test("Validate Test column sorting — ASC and DESC", async ({ page }) => {

    const testHeader = page.locator('//button[@data-testid="interactions-sort-name"]');

    async function getUITestNames() {
      const raw = await page.locator("//tbody/tr/td[2]").allInnerTexts();
      return raw.map((name) => name.trim());
    }

    await test.step("sorting ASC", async () => {
      await testHeader.dblclick();
      const names = await getUITestNames();
      const expected = [...names].sort((a, b) => a.localeCompare(b, "uk"));
      expect(names).toEqual(expected);
    });

    await test.step("sorting DESC", async () => {
      await testHeader.click();
      const names = await getUITestNames();
      const expected = [...names].sort((a, b) => b.localeCompare(a, "uk"));
      expect(names).toEqual(expected);
    });
  });

  test("Validate duration column sorting - ASC", async ({ page }) => {

    await page.locator('//button[@data-testid="interactions-sort-duration"]').click();

    const durationValues = await page
      .locator(
        "//tbody[contains(@class, 'divide-y')]/tr/td[contains(@class, 'tabular-nums')]",
      )
      .allInnerTexts();
    const UIDuration = durationValues.map((value) =>
      parseFloat(value.replace(/[^0-9.-]+/g, "")),
    );
    const expectedSortedDurationAsc = [...UIDuration].sort((a, b) => a - b);

    expect(UIDuration).toEqual(expectedSortedDurationAsc);
  });

  test("Validate duration column sorting - DESC", async ({ page }) => {
    await page
      .locator('//button[@data-testid="interactions-sort-duration"]')
      .dblclick();

    const durationValues = await page
      .locator(
        "//tbody[contains(@class, 'divide-y')]/tr/td[contains(@class, 'tabular-nums')]",
      )
      .allInnerTexts();
    const UIDuration = durationValues.map((value) =>
      parseFloat(value.replace(/[^0-9.-]+/g, "")),
    );
    const expectedSortedDurationDesc = [...UIDuration].sort((a, b) => b - a);

    expect(UIDuration).toEqual(expectedSortedDurationDesc);
  });

});
