/**
 * Lesson meta harness — runs the same battery of checks against every
 * lesson discovered on disk. Iterates the generated manifest so new
 * modules are picked up automatically.
 */

import { test, expect } from '@playwright/test';
import { getLessonManifest } from './manifest-generator';

const lessons = await getLessonManifest();

for (const lesson of lessons) {
	test.describe(`lesson ${lesson.id} — ${lesson.title}`, () => {
		test('renders cleanly with PE7 tokens, 44px touch targets, and reduced-motion safety', async ({
			page
		}) => {
			const errors: string[] = [];
			page.on('console', (m) => {
				if (m.type() === 'error') errors.push(m.text());
			});
			page.on('pageerror', (e) => errors.push(e.message));

			await page.goto(lesson.route, { waitUntil: 'networkidle' });

			// Basic structural expectations.
			await expect(page.locator('main')).toBeVisible();
			await expect(page.locator('h1, h2').first()).toBeVisible();

			// PE7 design tokens must resolve — catches broken CSS custom-property
			// inheritance or missing theme imports.
			const bg = await page.evaluate(() =>
				getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
			);
			expect(bg, `--color-bg should be defined on ${lesson.route}`).toMatch(/^oklch\(/);

			// Touch targets >= 44x44 for every visible interactive element.
			const tooSmall = await page.$$eval(
				'button, a, [role="button"], [role="option"], [role="tab"], [role="menuitem"], input[type="checkbox"], input[type="radio"], input[type="button"], input[type="submit"]',
				(els) =>
					els
						.filter((el) => {
							const r = el.getBoundingClientRect();
							if (r.width === 0 || r.height === 0) return false;
							const style = getComputedStyle(el);
							if (style.display === 'none' || style.visibility === 'hidden') return false;
							return r.width < 44 || r.height < 44;
						})
						.map((el) => {
							const r = el.getBoundingClientRect();
							return `${el.tagName.toLowerCase()}[${Math.round(r.width)}x${Math.round(r.height)}]`;
						})
			);
			expect(
				tooSmall,
				`too-small touch targets on ${lesson.route}: ${tooSmall.join(', ')}`
			).toEqual([]);

			// Reduced-motion compliance — emulate reduce and assert no visible
			// animation runs longer than ~10ms.
			await page.emulateMedia({ reducedMotion: 'reduce' });
			const overLongAnim = await page.$$eval('*', (els) =>
				els
					.filter((el) => {
						const d = getComputedStyle(el).animationDuration;
						if (!d || d === '0s' || d === '0ms' || d === '0.01ms') return false;
						const first = (d.split(',')[0] ?? '').trim();
						if (!first) return false;
						const v = parseFloat(first);
						if (Number.isNaN(v)) return false;
						const ms = first.includes('ms') ? v : v * 1000;
						return ms > 10;
					})
					.map((el) => `${el.tagName.toLowerCase()}:${getComputedStyle(el).animationDuration}`)
			);
			expect(
				overLongAnim,
				`animations exceed 10ms under prefers-reduced-motion on ${lesson.route}`
			).toEqual([]);

			expect(errors, `console/page errors on ${lesson.route}`).toEqual([]);
		});
	});
}
