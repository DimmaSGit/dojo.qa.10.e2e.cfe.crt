import { test, expect } from '@playwright/test';

test.describe("interactions - xpath", () => {
    test.beforeEach(async ({ page }) => {
     await page.goto("http://104.168.59.50/laboratory/interactions");
    })
  test(
    "xpath - interaction with elements",
    { tag: ["@smoke"] },
    async ({ page }) => {
      await page.locator("//button[text()='Передумови']").click();

      await page.locator("//button", { hasText: "Кроки" }).click();

      expect(page.locator('//*[@id="panel-steps"]//li')).toContainText([
        "Відкрити глобальну стрічку.",
        "Ввести запит.",
        "Застосувати фільтр.",
      ]);

      await page.locator("//button[contains(text(), 'Результат')]").click();

      expect(page.locator('//*[@id="panel-result"]//p')).toContainText([
        "У списку залишаються лише статті, заголовок яких відповідає запиту.",
      ]);
    },
  );

  test(
    "xpath - interaction with accordion",
    { tag: ["@smoke"] },
    async ({ page }) => {
      await page.goto("http://104.168.59.50/laboratory/interactions");

      const accordionLocator = page.locator(
        "//h2[text()='Accordion']/parent::section",
      );

      // locator chaining
      await accordionLocator.locator("details").nth(0).click();
      await accordionLocator.locator("details").nth(1).click();
      await accordionLocator.locator("details").nth(2).click();
    },
  );

  test(
    "xpath - interaction with dialog",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // const dialogPromise = page.waitForEvent('dialog')
      const dialogLocator = page.locator("//button[text() = 'Відкрити modal']");
      await dialogLocator.click();
      await page.locator("//button[@value = 'confirm']").click();

      await expect(
        page.locator("//div[@data-testid='interactions-toast']"),
      ).toContainText("Regression suite запущено");

    },
  );

  test(
    "xpath - interaction with progress bar",
    { tag: ["@smoke"] },
    async ({ page }) => {
      const progressBarLocator = page.locator(
        "//progress[@data-testid='interactions-progress']",
      );
      const plusTenLocator = page.locator(
        "//button[@data-testid='interactions-progress-increase']",
      );
      const minusTenLocator = page.locator(
        "//button[@data-testid='interactions-progress-decrease']",
      );

      await expect(progressBarLocator).toHaveAttribute("value", "35");
      await plusTenLocator.click();
      await expect(progressBarLocator).toHaveAttribute("value", "45");

      await minusTenLocator.click({ clickCount: 2 });
      await expect(progressBarLocator).toHaveAttribute("value", "25");

      await page
        .locator("//button[@class='btn-primary'] [text() = 'Сформувати звіт']")
        .click();

      
      await expect(
        page.locator("//div[@data-testid='interactions-toast']"),
      ).toContainText("Асинхронний звіт готовий");
      
      },
  );

  test(
    "xpath - interaction with drug&drop",
    { tag: ["@smoke"] },
    async ({ page }) => {
      const articleLocator = page.locator(
        "//article[@data-testid='interactions-drag-item-locators']",
      );
      const dropZone = page.locator(
        "//div[@data-testid='interactions-dropzone-done']",
      );

      articleLocator.dragTo(dropZone);

      expect(dropZone.locator(articleLocator)).toBeVisible();
    },
  );
});
