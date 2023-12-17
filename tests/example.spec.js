const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/account/login');
  const login = page.getByTestId("login-email-field");
  const password = page.getByTestId("login-password-field");
  await login.fill("kijek93@gmail.com");
  await password.fill('Test123!');
  await password.press('Enter');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Pielgrzymappka/);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Pielgrzymappka/);
});
