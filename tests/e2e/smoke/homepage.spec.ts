import { test, expect } from '@playwright/test';

test.describe('homepage smoke', () => {
	test('root route loads and renders the course shell', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));
		page.on('console', (m) => {
			if (m.type() === 'error') errors.push(m.text());
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		await expect(page.locator('main#main')).toBeVisible();
		await expect(page.getByRole('link', { name: /skip to lesson content/i })).toBeAttached();

		expect(errors, 'no console or page errors on homepage').toEqual([]);
	});
});
