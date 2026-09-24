import { test, expect } from "@playwright/test";

const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;

test.describe("Registration", { tag: "@auth" }, () => {
    let uniqueUserName: string;
    let email = `student-${Date.now()}-${Math.random()}@example.com`;
    let password = "ValidPassword123!";

    test.beforeEach(async ( { page }) => {
      uniqueUserName = `student-${Date.now()}`;
      email = `student-${Date.now()}-${Math.random()}@example.com`;
      password = "ValidPassword123!";

      await page.goto("/register");
    });
  test("new user registers with unique data", async ({ page }) => {
    
    await page.getByTestId("auth-username").fill(uniqueUserName);
    await page.getByTestId("auth-email").fill(uniqueEmail());
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("register-confirm-password").fill(password);
    await page.getByTestId("register-country").selectOption("United States");
    await page.getByTestId("register-source-search").check();
    expect(page.getByTestId("register-newsletter").isChecked());
    await page.getByTestId("register-newsletter").uncheck();
    expect(page.getByTestId("register-newsletter").isDisabled());
    await page.getByTestId("register-terms").check();
    expect(page.getByTestId("register-terms").isChecked());
    await page.getByTestId("auth-submit").click();
    await expect(page.getByTestId("nav-profile")).toBeVisible();

    await expect(page.getByTestId("nav-profile")).toContainText(uniqueUserName);
  });

  test("user can't register with same email", async ({ page }) => {
    await page.getByTestId("auth-username").fill(uniqueUserName);
    await page.getByTestId("auth-email").fill(email);
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("register-confirm-password").fill(password);
    await page.getByTestId("register-country").selectOption("United States");
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();
    await expect(page.getByTestId("nav-profile")).toBeVisible();
    await page.getByTestId("nav-profile").click();
    await page.getByRole("link", { name: "Edit profile" }).click();
    await page.getByRole("button", { name: "Log out" }).click();

    await page.getByTestId("nav-sign-up").click();
    await page.getByTestId("auth-username").fill(uniqueUserName);
    await page.getByTestId("auth-email").fill(email);
    await page.getByTestId("auth-password").fill("123test");
    await page.getByTestId("register-confirm-password").fill("123test");
    await page.getByTestId("register-country").selectOption("United States");
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();

    expect(page.getByTestId("error-messages")).toContainText(
      "body email або username вже зайняті"
    );
    expect(page.getByTestId("nav-profile")).not.toBeVisible();
  });

    test("user can't register if UserName is <3 characters", async ({ page }) => {
        await page.getByTestId("auth-username").fill("TS");
        await page.getByTestId("auth-email").fill(email);
        await page.getByTestId("auth-password").fill(password);
        await page.getByTestId("register-confirm-password").fill(password);
        await page
          .getByTestId("register-country")
          .selectOption("United States");
        await page.getByTestId("register-terms").check();
        await page.getByTestId("auth-submit").click();
  
        expect(page.getByTestId("error-messages")).toContainText(
          "username ім'я має містити щонайменше 3 символи");
    });

});

test.describe("Login", { tag: "@auth" }, () => {
    let uniqueUserName: string;
    let email: string;
    let password: string;

    test.beforeEach(async ({ page }) => {
      uniqueUserName = `student-${Date.now()}`;
      email = `student-${Date.now()}-${Math.random()}@example.com`;
      password = "ValidPassword123!";

       await page.goto("/register");
       await page.getByTestId("auth-username").fill(uniqueUserName);
       await page.getByTestId("auth-email").fill(email);
       await page.getByTestId("auth-password").fill(password);
       await page.getByTestId("register-confirm-password").fill(password);
       await page.getByTestId("register-country").selectOption("United States");
       await page.getByTestId("register-terms").check();
       await page.getByTestId("auth-submit").click();
       await expect(page.getByTestId("nav-profile")).toBeVisible();
       await page.getByTestId("nav-profile").click();
       await page.getByRole("link", { name: "Edit profile" }).click();
       await page.getByRole("button", { name: "Log out" }).click();
       await page.getByTestId("nav-sign-in").click();
    });
  test("user is successfully logged in with valid credentials", async ({ page }) => {
       await page.getByTestId("auth-email").fill(email);
       await page.getByTestId("auth-password").fill(password);
       await page.getByTestId("auth-submit").click();

       await expect(page.getByTestId("nav-profile")).toContainText(
         uniqueUserName,
       );
  });

    test("user can't log in with valid email - invalid password", async ({ page }) => {
       await page.getByTestId("auth-email").fill(email);
       await page.getByTestId("auth-password").fill("invalid123password");
       await page.getByTestId("auth-submit").click();

       await expect(page.getByTestId("error-messages")).toContainText(
         "email or password неправильні",
       );
  });

    test("user can't log in with invalid email - valid password", async ({
      page,
    }) => {
      await page.getByTestId("auth-email").fill("invalid@mail.com");
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("auth-submit").click();

      await expect(page.getByTestId("error-messages")).toContainText(
        "email or password неправильні",
      );
    });

});