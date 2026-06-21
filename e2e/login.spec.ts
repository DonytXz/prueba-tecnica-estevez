import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('login');
  });

  test('should disable the submit button when fields are empty', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('should show error message on invalid login', async ({ page }) => {
    // Fill credentials with incorrect data
    await page.fill('input[formControlName="username"]', 'wronguser');
    await page.fill('input[formControlName="password"]', 'wrongpassword');
    
    await page.click('button[type="submit"]');

    // Check for the error message
    const errorMsg = page.locator('.error-message');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Credenciales inválidas');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Using the DummyJSON credentials
    await page.fill('input[formControlName="username"]', 'emilys');
    await page.fill('input[formControlName="password"]', 'emilyspass');
    
    // Click login and wait for navigation
    await page.click('button[type="submit"]');
    
    // Assert redirect to the dashboard (adjust path if different)
    await page.waitForURL('**/clients'); 
    await expect(page).toHaveURL(/.*clients/);
  });
});
