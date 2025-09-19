import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');
    await expect(page).toHaveTitle(/My App/);
});
