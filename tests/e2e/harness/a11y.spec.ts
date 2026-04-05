/**
 * axe-core accessibility harness — runs WCAG 2.0/2.1 A & AA rules against
 * every lesson discovered on disk. Zero violations tolerated.
 */

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { getLessonManifest } from './manifest-generator';

const lessons = await getLessonManifest();

for (const lesson of lessons) {
	test(`a11y: ${lesson.id} ${lesson.title}`, async ({ page }) => {
		await page.goto(lesson.route);
		await page.waitForLoadState('networkidle');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze();

		const summary = results.violations
			.map((v) => `${v.id} (${v.impact}): ${v.help} [${v.nodes.length} node(s)]`)
			.join('\n');

		expect(results.violations, `axe violations on ${lesson.route}:\n${summary}`).toEqual([]);
	});
}
