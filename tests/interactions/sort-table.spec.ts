import { test, expect, Locator } from "@playwright/test";

test.describe("Sorting web table - xpath", () => {
  let authorizationLocator: Locator;
  let creatingLocator: Locator;
  let searchingLocator: Locator;
  let loadingLocator: Locator;
  let selectedCount: Locator;
  let durationButton: Locator;
  let testButton: Locator;

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
    selectedCount = page.locator('//span[@data-testid="interactions-selected-count"]');
    testButton = page.locator(
      '//button[@data-testid="interactions-sort-name"]',
    );
    durationButton = page.locator(
      '//button[@data-testid="interactions-sort-duration"]',
    );
  });

  test("rows are successfully checked", async ({ page }) => {
    await authorizationLocator.click();
    await expect(authorizationLocator).toBeChecked();
    await expect(selectedCount).toContainText("1");

    await creatingLocator.click();
    await expect(creatingLocator).toBeChecked();
    await expect(selectedCount).toContainText("2");

    await searchingLocator.click();
    await expect(searchingLocator).toBeChecked();
    await expect(selectedCount).toContainText("3");

    await loadingLocator.click();
    await expect(loadingLocator).toBeChecked();
    await expect(selectedCount).toContainText("4");

  });

  test("validate rows and columns counts", async ({
    page,
  }) => {
    const tableLocator = page.locator("//table");
    const rowsLocator:Locator = page.locator("//table/tbody/tr");
    const columnsLocator:Locator = page.locator("//table/thead/tr/th");

    await expect(tableLocator).toBeVisible();
    expect(await rowsLocator.count()).toEqual(4)
    expect(await columnsLocator.count()).toEqual(4);

  });

  test("Validate Test column sorting — ASC and DESC", async ({ page }) => {

    async function getUITestNames() {
      const raw = await page.locator("//tbody/tr/td[2]").allInnerTexts();
      return raw.map((name) => name.trim());
    }

    await test.step("sorting ASC", async () => {
      await testButton.dblclick();
      const names = await getUITestNames();
      const expected = [...names].sort((a, b) => a.localeCompare(b, "uk"));
      expect(names).toEqual(expected);
    });

    await test.step("sorting DESC", async () => {
      await testButton.click();
      const names = await getUITestNames();
      const expected = [...names].sort((a, b) => b.localeCompare(a, "uk"));
      expect(names).toEqual(expected);
    });
  });

  test("Validate duration column sorting - ASC", async ({ page }) => {

    await durationButton.click();

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
    await durationButton.dblclick();

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
