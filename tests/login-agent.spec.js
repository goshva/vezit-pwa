import { test, expect } from '@playwright/test';

const role = {name: "agent", firstURL: "Agdashboard", password: "agent@testsystem.ru", email: "agent@testsystem.ru"}

test.describe('Login functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/#/auth/signin');
    });

    test(`should successfully login ${role.name} with valid credentials`, async ({ page }) => {
        await page.fill('input[name="login-email"]', role.email);
        await page.fill('input[name="login-password"]', role.password);
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(`http://localhost:5173/#/${role.firstURL}`);
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.fill('input[name="login-email"]', 'wrong@example.com');
        await page.fill('input[name="login-password"]', 'wrongpass');
        await page.click('button[type="submit"]');
        await expect(page.locator('.alert-danger')).toBeVisible();
        await expect(page).toHaveURL('http://localhost:5173/#/auth/signin');
    });  
});