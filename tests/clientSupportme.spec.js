import { test, expect } from '@playwright/test';

const role = {name: "client", firstURL: "profile", password: "123456", email: "client@testsystem.ru"}

test.describe('Send message to support functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/#/auth/signin');
    });

    test(`should successfully login ${role.name} and send message to support`, async ({ page }) => {
        await page.fill('input[name="login-email"]', role.email);
        await page.fill('input[name="login-password"]', role.password);
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(`http://localhost:5173/#/${role.firstURL}`);
        await page.goto('http://localhost:5173/#/supportme')
        await expect(page).toHaveURL('http://localhost:5173/#/supportme')
        await page.fill('input[type="text"]', Math.random().toString(36).substring(2, 10))
        const [response] = await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForResponse(response => response.status() === 200),
        ]);  
        expect(response.ok()).toBeTruthy();
    });
});