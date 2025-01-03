import { test, expect } from '@playwright/test';

test.describe('Registration functionality Partner', () => {
    const email = `${Math.random().toString(36).substring(2, 10)}@testsystem.ru`;
    test(`should successfully reg and after login with random email as Partner`, async ({ page }) => {
        await page.goto(`http://localhost:5173/#/auth/partner`);
        await page.fill('input[name="signup-email"]', email);
        await page.fill('input[name="signup-password"]', 'role@testsystem.ru');
        await page.fill('input[name="signup-password-confirm"]', 'role@testsystem.ru');
        await page.click('div[class="form-check"]');
        await Promise.all([
            page.waitForResponse(response => response.status() === 200),
            page.click('button[type="submit"]')
        ]);

        
        await page.waitForTimeout(2000);

        await Promise.all([
            page.waitForURL('http://localhost:5173/#/auth/signin'),
            page.goto(`http://localhost:5173/#/auth/signin`, {timeout: 20000})
        ]);


        try {
            const emailInput = page.locator('input[name="login-email"]');
            await emailInput.waitFor({ state: 'visible', timeout: 5000 });
            await emailInput.fill(email);
        } catch (error) {
            throw new Error(`Failed to fill email input: ${error.message}`);
        }

        try {
            const passwordInput = page.locator('input[name="login-password"]');
            await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
            await passwordInput.fill('role@testsystem.ru');
        } catch (error) {
            throw new Error(`Failed to fill email input: ${error.message}`);
        }
        await page.click('button[type="submit"]')
        await page.waitForURL(`http://localhost:5173/#/about`);
        await expect(page).toHaveURL(`http://localhost:5173/#/about`);
    })
})    