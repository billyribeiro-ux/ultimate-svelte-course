/**
 * Shared Playwright fixtures.
 *
 * `lessonPage` gives every test a deterministic environment:
 *   - 1440x900 viewport (desktop baseline)
 *   - animations disabled via prefers-reduced-motion emulation
 *   - console errors collected into `consoleErrors`
 *
 * Import from this module instead of `@playwright/test` when you need
 * the deterministic lesson page.
 */

import { test as base, expect, type Page } from '@playwright/test';

export interface LessonFixtures {
	lessonPage: Page;
	consoleErrors: string[];
}

export const test = base.extend<LessonFixtures>({
	// eslint-disable-next-line no-empty-pattern
	consoleErrors: async ({}, use) => {
		const errors: string[] = [];
		await use(errors);
	},
	lessonPage: async ({ page, consoleErrors }, use) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.emulateMedia({ reducedMotion: 'reduce' });
		page.on('console', (msg) => {
			if (msg.type() === 'error') consoleErrors.push(msg.text());
		});
		page.on('pageerror', (err) => consoleErrors.push(err.message));
		await use(page);
	}
});

export { expect };
