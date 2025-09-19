import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    use: {
        headless: true,
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
    },
});
