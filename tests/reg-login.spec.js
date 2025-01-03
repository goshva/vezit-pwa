import { test, expect } from '@playwright/test';

const roles = [{name:"client", firstURL: "profile"}, {name:"partner", firstURL: "about"}]

test.describe('Registration functionality', () => {
    
    roles.forEach((role) => {
        const email = `${Math.random().toString(36).substring(2, 10)}@testsystem.ru`;
        test(`should successfully reg and after login with random email as ${role.name}`, async ({ page }) => {
            await page.goto(`http://localhost:5173/#/auth/${role.name}`);
            await page.fill('input[name="signup-email"]', email);
            await page.fill('input[name="signup-password"]', 'role@testsystem.ru');
            await page.fill('input[name="signup-password-confirm"]', 'role@testsystem.ru');
            await page.click('div[class="form-check"]');
            const [response] = await Promise.all([
                page.waitForResponse(response => response.status() === 200),
                page.click('button[type="submit"]')
            ]);
            expect(response.ok()).toBeTruthy();
            await page.goto(`http://localhost:5173/#/auth/signin`);
            await page.fill('input[name="login-email"]', email);
            await page.fill('input[name="login-password"]', 'role@testsystem.ru');
            await page.click('button[type="submit"]')
            await page.waitForURL(`http://localhost:5173/#/${role.firstURL}`);
            await expect(page).toHaveURL(`http://localhost:5173/#/${role.firstURL}`);
        })
    })    
})