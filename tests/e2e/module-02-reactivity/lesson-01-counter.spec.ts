/**
 * Canonical targeted test for lesson 02.1 — "What state is and why it exists".
 *
 * The playground is a reactive character/word counter bound to $state(),
 * so this is an ideal first interactive assertion: type into the input,
 * verify the rendered counts update.
 */

import { test, expect } from '@playwright/test';

const ROUTE = '/02/1';
const SAMPLE = 'hello svelte runes';

test.describe('module 02 · lesson 1 — reactive character counter', () => {
	test('typing updates character and word counts reactively', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (m) => {
			if (m.type() === 'error') errors.push(m.text());
		});
		page.on('pageerror', (e) => errors.push(e.message));

		await page.goto(ROUTE);
		await page.waitForLoadState('networkidle');

		await expect(page.locator('main h1').first()).toBeVisible();

		// Prefer accessible queries — the input has a <label for="text-input">.
		const input = page.getByLabel(/type something/i);
		await expect(input).toBeVisible();

		await input.fill(SAMPLE);

		// The Demo renders <dt>Characters</dt><dd>{length}</dd> and
		// <dt>Words</dt><dd>{words}</dd>. Locate each dd by its sibling dt.
		const charCount = page.locator('dt', { hasText: /^characters$/i }).locator('+ dd');
		const wordCount = page.locator('dt', { hasText: /^words$/i }).locator('+ dd');

		await expect(charCount).toHaveText(String(SAMPLE.length));
		await expect(wordCount).toHaveText(String(SAMPLE.trim().split(/\s+/).length));

		// Clearing resets reactively.
		await input.fill('');
		await expect(charCount).toHaveText('0');
		await expect(wordCount).toHaveText('0');

		expect(errors, 'no console/page errors').toEqual([]);
	});
});
