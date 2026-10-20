import { test, expect } from "@playwright/test";
import {
  registerUser,
  loginUser,
  TestUser,
  createArticle,
  TestArticle,
} from "./articles.actions";

test.describe("Create ten articles", { tag: "@auth" }, () => {
  let user: TestUser;

  test.beforeEach(async ({ page, request }) => {
    user = await registerUser(request);
    await loginUser(page, user);
  });

  test("CON-0010 user creates 10 new articles successfully", async ({
    page,
  }) => {
    await expect(page.getByTestId("nav-profile")).toContainText(user.username);
    
    const created: TestArticle[] = [];

    for (let i = 0; i < 10; i++) {
      created.push(await createArticle(page));
    }

    expect(created).toHaveLength(10);

    await page.getByTestId("nav-profile").click();
    // await assertArticlesListed(page, created);
    for (const article of created) {
    await expect(page.getByText(article.title, { exact: true })).toBeVisible();
    }
});
  

});
