/**
 * manifest-generator.ts
 *
 * Reads the JSON manifest produced by scripts/build-lesson-manifest.mjs
 * (invoked via Playwright's globalSetup) and exposes a typed view of every
 * lesson currently on disk. Tests iterate this list so Modules 3-5 are
 * picked up automatically as soon as their content lands.
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface LessonEntry {
	readonly id: string;
	readonly slug: string;
	readonly moduleId: string;
	readonly moduleSlug: string;
	readonly route: string;
	readonly title: string;
	readonly conceptTags: readonly string[];
}

interface ManifestFile {
	readonly generatedAt: string;
	readonly lessons: readonly LessonEntry[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestPath = resolve(__dirname, '..', '.generated', 'lessons.json');

let cache: readonly LessonEntry[] | null = null;

export async function getLessonManifest(): Promise<readonly LessonEntry[]> {
	if (cache) return cache;

	if (!existsSync(manifestPath)) {
		// Fallback: invoke the builder synchronously so dev runs without
		// globalSetup (e.g. `playwright test --list`) still work.
		const builderUrl = new URL('../../../scripts/build-lesson-manifest.mjs', import.meta.url);
		await import(builderUrl.href);
	}

	const raw = readFileSync(manifestPath, 'utf8');
	const parsed = JSON.parse(raw) as ManifestFile;
	cache = parsed.lessons;
	return cache;
}
