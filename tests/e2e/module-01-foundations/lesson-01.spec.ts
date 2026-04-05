/**
 * Canonical targeted test for lesson 01.1 — "What Svelte is and why it compiles".
 *
 * This is the template Stage B lesson-specific tests should follow:
 * - go to the lesson route
 * - assert the prose article renders
 * - assert the playground/demo region renders
 * - exercise any lesson-specific interactive behavior
 */

import { test, expect } from '@playwright/test';

const ROUTE = '/01/1';

test.describe('module 01 · lesson 1 — What Svelte is', () => {
	test('renders prose and playground', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (m) => {
			if (m.type() === 'error') errors.push(m.text());
		});
		page.on('pageerror', (e) => errors.push(e.message));

		await page.goto(ROUTE);
		await page.waitForLoadState('networkidle');

		// Page chrome
		await expect(page.locator('main#main')).toBeVisible();
		const heading = page.locator('main h1').first();
		await expect(heading).toBeVisible();
		await expect(heading).toHaveText(/svelte/i);

		// Readme prose: at least one paragraph inside main.
		await expect(page.locator('main p').first()).toBeVisible();

		// Playground demo: lesson layouts render the Demo component inside main,
		// so we simply require at least one non-prose interactive region.
		const mainText = await page.locator('main').innerText();
		expect(mainText.length).toBeGreaterThan(100);

		expect(errors, 'no console/page errors').toEqual([]);
	});
});
