import { test, expect } from '@playwright/test'

const role = {name: "client", firstURL: "profile", password: "123456", email: "client@testsystem.ru"}

test.describe('Send client info functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/#/auth/signin');
        await page.fill('input[name="login-email"]', role.email);
        await page.fill('input[name="login-password"]', role.password);
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(`http://localhost:5173/#/${role.firstURL}`);
        await page.goto('http://localhost:5173/#/profile')
        await expect(page).toHaveURL('http://localhost:5173/#/profile')
    });

    test('should successfully send info about client with checkbox', async ({page}) => {
        await expect(page).toHaveURL('http://localhost:5173/#/profile')
        await page.fill('input[placeholder="Наименование компании"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[placeholder="Вид деятельности"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[placeholder="ОГРН/ОГРНИП"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[placeholder="Р/с"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[placeholder="БИК"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[placeholder="Контактное лицо"]', 'Test Contact');
        await page.fill('input[placeholder="Телефон контактного лица"]', '1234567890');
        await page.check('#copyContactToDirector');
        await page.fill('input[placeholder="Электронная почта"]', Math.random().toString(36).substring(2, 10) + '@test.com');
        await page.fill('textarea[placeholder="Описание деятельности"]', Math.random().toString(36).substring(2, 10));
        await page.check('#publicOfferConsent');
        const response = await Promise.all([
            page.click('button.btn.w-100'),
            page.waitForResponse(response => response.status() === 200)
        ]);
        expect(response[1].ok()).toBeTruthy();
    });
})

