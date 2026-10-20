import { expect, APIRequestContext, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

const BASE_URL = "http://104.168.59.50";

export type TestUser = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type TestArticle = {
    title: string;
    description: string;
    body: string;
}

export async function registerUser(
  request: APIRequestContext,
){
  const username = `user-${faker.string.alphanumeric(8)}`;
  const email = faker.internet.email();
  const password = "test123";

  const response = await request.post(`${BASE_URL}/api/users`, {
    data: { user: { username, email, password } },
    failOnStatusCode: true,
  });

  const body = await response.json();

  return { username, email, password, token: body.user.token };
}

export async function loginUser(
  page: Page,
  user: Pick<TestUser, "email" | "password" | "username">,
){
  await page.goto(`${BASE_URL}/articles`);
  await page.getByTestId("nav-sign-in").click();

  await page.getByTestId("auth-email").fill(user.email);
  await page.getByTestId("auth-password").fill(user.password);
  await page.getByTestId("auth-submit").click();

  await expect(page.getByTestId("nav-profile")).toContainText(user.username);
}

export async function createArticle(
  page: Page,
  article = {
    title: `Title-${faker.string.alphanumeric(8)}`,
    description: `Desc-${faker.string.alphanumeric(15)}`,
    body: `Body-${faker.string.alphanumeric(25)}`,
  },
){
  await page.getByTestId("nav-new-article").click();
  await page.getByTestId("editor-title").fill(article.title);
  await page.getByTestId("editor-description").fill(article.description);
  await page.getByTestId("editor-body").fill(article.body);
  await page.getByTestId("editor-submit").click();

  await expect(
    page.getByRole("heading", { name: article.title }),
  ).toBeVisible();
  
  return article
}

export async function assertArticlesListed(
  page: Page,
  articles: TestArticle[],
){
  const missing: string[] = [];

  for (const article of articles) {
    try {
      await page
        .getByText(article.title, { exact: true })
        .waitFor({ state: "visible", timeout: 3000 });
    } catch {
      missing.push(article.title);
    }
  }
  expect(missing.length, `expected missing articles to be 0, but got ${missing}`).toBe(0)
}

