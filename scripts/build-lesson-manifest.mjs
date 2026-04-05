#!/usr/bin/env node
/**
 * build-lesson-manifest.mjs
 *
 * Walks src/content/<module-slug>/moduleMeta.ts and each lesson's meta.ts,
 * extracts lesson identity via regex (no TS loader required), and emits
 * tests/e2e/.generated/lessons.json for the Playwright harness to consume.
 *
 * This runs as Playwright's globalSetup so the harness is always in sync
 * with whatever content is currently on disk — new modules are picked up
 * automatically.
 */

import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const contentRoot = join(repoRoot, 'src', 'content');
const outDir = join(repoRoot, 'tests', 'e2e', '.generated');
const outFile = join(outDir, 'lessons.json');

function isDir(p) {
	try {
		return statSync(p).isDirectory();
	} catch {
		return false;
	}
}

function extractBetween(src, key) {
	const re = new RegExp(`${key}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`);
	const m = src.match(re);
	return m ? m[1] : null;
}

function extractConceptTags(src) {
	const m = src.match(/conceptTags\s*:\s*\[([^\]]*)\]/);
	if (!m) return [];
	return Array.from(m[1].matchAll(/['"`]([^'"`]+)['"`]/g)).map((mm) => mm[1]);
}

function extractModuleId(src) {
	return extractBetween(src, 'id');
}

function buildManifest() {
	if (!isDir(contentRoot)) {
		throw new Error(`content root not found: ${contentRoot}`);
	}

	const moduleSlugs = readdirSync(contentRoot)
		.filter((name) => isDir(join(contentRoot, name)))
		.sort();

	const lessons = [];

	for (const moduleSlug of moduleSlugs) {
		const moduleDir = join(contentRoot, moduleSlug);
		const moduleMetaPath = join(moduleDir, 'moduleMeta.ts');
		let moduleId = moduleSlug.split('-')[0];
		try {
			const moduleMetaSrc = readFileSync(moduleMetaPath, 'utf8');
			const parsedId = extractModuleId(moduleMetaSrc);
			if (parsedId) moduleId = parsedId;
		} catch {
			// skip modules without a moduleMeta.ts
			continue;
		}

		const lessonDirs = readdirSync(moduleDir)
			.filter((name) => isDir(join(moduleDir, name)))
			.sort();

		for (const lessonDir of lessonDirs) {
			const metaPath = join(moduleDir, lessonDir, 'meta.ts');
			let metaSrc;
			try {
				metaSrc = readFileSync(metaPath, 'utf8');
			} catch {
				continue;
			}

			const id = extractBetween(metaSrc, 'id');
			const number = extractBetween(metaSrc, 'number');
			const title = extractBetween(metaSrc, 'title');
			if (!id || !number || !title) continue;

			const conceptTags = extractConceptTags(metaSrc);
			const route = `/${moduleId}/${number}`;

			lessons.push({
				id,
				slug: lessonDir,
				moduleId,
				moduleSlug,
				route,
				title,
				conceptTags
			});
		}
	}

	lessons.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
	return lessons;
}

function main() {
	const lessons = buildManifest();
	mkdirSync(outDir, { recursive: true });
	writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), lessons }, null, 2));
	// eslint-disable-next-line no-console
	console.log(`[lesson-manifest] wrote ${lessons.length} lessons to ${outFile}`);
}

// Run immediately when invoked as a script.
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
	main();
}

// Playwright globalSetup hook.
export default function globalSetup() {
	main();
}
