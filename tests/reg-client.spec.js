import { test, expect } from '@playwright/test';

const role = "client"

test.describe(`Registration functionality ${role}`, () => {
        const email = `${Math.random().toString(36).substring(2, 10)}@testsystem.ru`;
        test(`should successfully reg with random email as ${role}`, async ({ page }) => {
            await page.goto(`http://localhost:5173/#/auth/${role}`);
            await page.fill('input[name="signup-email"]', email);
            await page.fill('input[name="signup-password"]', 'role@testsystem.ru');
            await page.fill('input[name="signup-password-confirm"]', 'role@testsystem.ru');
            await page.click('div[class="form-check"]');
            const [response] = await Promise.all([
                page.waitForResponse(response => response.status() === 200),
                page.click('button[type="submit"]')
            ]);
            expect(response.ok()).toBeTruthy();
        })
})