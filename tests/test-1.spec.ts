import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://104.168.59.50/articles/register');
  await page.getByTestId('auth-username').click();
  await page.getByTestId('auth-username').fill('golova1');
  await page.getByTestId('auth-email').click();
  await page.getByTestId("auth-email").fill("test@123test.com");
  await page.getByTestId('auth-password').click();
  await page.getByTestId('auth-password').fill('test123');
  await page.getByTestId('register-confirm-password').click();
  await page.getByTestId('register-confirm-password').fill('test123');
  await page.getByTestId('register-country').selectOption('United States');
  await page.getByTestId('register-newsletter').uncheck();
  await page.getByTestId('register-terms').check();
  await page.getByTestId('auth-submit').click();
  await page.getByTestId('auth-submit').click();
  await page.getByTestId('auth-email').click();
  await page.getByTestId('auth-submit').click();
  await expect(page.getByTestId('nav-profile')).toContainText('golova1');
});