import { test, expect} from '@playwright/test';

// Создаем объект для более простого внедрения в другие тесты
const role = {name: "agent", firstURL: "Agdashboard", password: "agent@testsystem.ru", email: "agent@testsystem.ru"}

test.describe('Agent add advertiser functionality', () => {
    test('should successfully add advertiser on /advertisers', async ({page}) => {
        // Заполняем форму входда и входим
        await page.goto(`http://localhost:5173/#/auth/signin`);
        await page.fill('input[name="login-email"]', role.email);
        await page.fill('input[name="login-password"]', role.password);
        await page.click('button[type="submit"]');


        await page.waitForURL(`http://localhost:5173/#/${role.firstURL}`); 
        await expect(page).toHaveURL(`http://localhost:5173/#/${role.firstURL}`); // Проверяем, на первой странице ли мы, удачно ли вошли

        // Если да то пойдем на страницу с рекламами
        await page.goto(`http://localhost:5173/#/advertisers`);
        await expect(page).toHaveURL(`http://localhost:5173/#/advertisers`);
        await page.waitForResponse(response => response.status() === 200);
        await expect(page.locator('.isModerated')).toBeVisible(); // Если все окей жмем кнопку добавления
        await page.click('.isModerated');

        // Заполняем форму нового рекламодателя
        await page.fill('input[id="name"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="bussines"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="description"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="OGRN"]', Math.random().toString(36).substring(2, 10))
        await page.fill('input[id="BANK"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="BIK"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="contactName"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="contactTel"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="contactEMail"]', `${Math.random().toString(36).substring(2, 10)}@testsystem.ru`);
        await page.fill('input[id="director_name"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="director_tel"]', Math.random().toString(36).substring(2, 10));
        await page.fill('input[id="password"]', Math.random().toString(36).substring(2, 10));
        const [response] = await Promise.all([
            page.waitForResponse(response => response.status() === 200),
            page.click('button[type="submit"]')
        ]);

        expect(response.ok()).toBeTruthy(); // Если все ок, тест пройден
})
})