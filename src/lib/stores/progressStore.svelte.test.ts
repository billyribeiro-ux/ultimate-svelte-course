/**
 * Canonical runes class test.
 *
 * Uses the `.svelte.test.ts` extension so Vite compiles `$state` / `$derived`
 * / `$effect` inside the code under test. Uses `flushSync` to synchronize
 * reactive updates after mutations.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushSync } from 'svelte';
import { createMockLessonMeta, createMockModuleMeta } from '$lib/test-utils';
import type { ModuleMeta } from '$lib/types/lesson';

const STORAGE_KEY = 'ultsvelte:progress:v1';

function buildManifest(): readonly ModuleMeta[] {
	return [
		createMockModuleMeta({
			id: 'm1',
			lessons: [
				createMockLessonMeta({ id: 'm1-l1', moduleId: 'm1' }),
				createMockLessonMeta({ id: 'm1-l2', moduleId: 'm1' })
			]
		}),
		createMockModuleMeta({
			id: 'm2',
			lessons: [
				createMockLessonMeta({ id: 'm2-l1', moduleId: 'm2' }),
				createMockLessonMeta({ id: 'm2-l2', moduleId: 'm2' })
			]
		})
	];
}

// Fresh module import per test so singleton `progress` state is isolated.
async function freshStore(): Promise<typeof import('./progressStore.svelte.ts')> {
	vi.resetModules();
	return await import('./progressStore.svelte.ts');
}

describe('ProgressStore', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
		vi.restoreAllMocks();
	});

	it('markComplete adds to completedLessons', async () => {
		const { progress } = await freshStore();
		progress.markComplete('lesson-a');
		flushSync();
		expect(progress.completedLessons.has('lesson-a')).toBe(true);
		expect(progress.completedLessons.size).toBe(1);
	});

	it('markIncomplete removes from completedLessons', async () => {
		const { progress } = await freshStore();
		progress.markComplete('lesson-a');
		progress.markIncomplete('lesson-a');
		flushSync();
		expect(progress.completedLessons.has('lesson-a')).toBe(false);
		expect(progress.completedLessons.size).toBe(0);
	});

	it('reset empties the completed set', async () => {
		const { progress } = await freshStore();
		progress.markComplete('a');
		progress.markComplete('b');
		progress.reset();
		flushSync();
		expect(progress.completedLessons.size).toBe(0);
	});

	it('toggleComplete flips membership', async () => {
		const { progress } = await freshStore();
		progress.toggleComplete('x');
		flushSync();
		expect(progress.completedLessons.has('x')).toBe(true);
		progress.toggleComplete('x');
		flushSync();
		expect(progress.completedLessons.has('x')).toBe(false);
	});

	it('overallPercent recomputes via $derived.by after mutations', async () => {
		const { progress } = await freshStore();
		progress.setManifest(buildManifest());
		flushSync();
		expect(progress.overallPercent).toBe(0);

		progress.markComplete('m1-l1');
		flushSync();
		expect(progress.overallPercent).toBeCloseTo(0.25, 5);

		progress.markComplete('m1-l2');
		progress.markComplete('m2-l1');
		progress.markComplete('m2-l2');
		flushSync();
		expect(progress.overallPercent).toBe(1);
	});

	it('overallPercent is 0 when manifest is empty', async () => {
		const { progress } = await freshStore();
		flushSync();
		expect(progress.overallPercent).toBe(0);
	});

	it('modulePercent returns 0 for unknown modules', async () => {
		const { progress } = await freshStore();
		progress.setManifest(buildManifest());
		expect(progress.modulePercent('does-not-exist')).toBe(0);
	});

	it('modulePercent computes correctly for known modules', async () => {
		const { progress } = await freshStore();
		progress.setManifest(buildManifest());
		progress.markComplete('m1-l1');
		flushSync();
		expect(progress.modulePercent('m1')).toBe(0.5);
		progress.markComplete('m1-l2');
		flushSync();
		expect(progress.modulePercent('m1')).toBe(1);
		expect(progress.modulePercent('m2')).toBe(0);
	});

	it('hydrate restores state from a localStorage snapshot', async () => {
		const snapshot = {
			completed: ['lesson-a', 'lesson-b'],
			currentLessonId: 'lesson-a',
			theme: 'dark' as const
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
		const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

		const { progress } = await freshStore();
		progress.hydrate();
		flushSync();

		expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
		expect(progress.completedLessons.has('lesson-a')).toBe(true);
		expect(progress.completedLessons.has('lesson-b')).toBe(true);
		expect(progress.currentLessonId).toBe('lesson-a');
		expect(progress.theme).toBe('dark');
	});

	it('hydrate is a no-op when no snapshot exists', async () => {
		const { progress } = await freshStore();
		progress.hydrate();
		flushSync();
		expect(progress.completedLessons.size).toBe(0);
		expect(progress.theme).toBe('system');
	});

	it('hydrate ignores malformed JSON', async () => {
		localStorage.setItem(STORAGE_KEY, '{not-json');
		const { progress } = await freshStore();
		expect(() => progress.hydrate()).not.toThrow();
		flushSync();
		expect(progress.completedLessons.size).toBe(0);
	});

	it('persist writes a JSON snapshot to localStorage via $effect', async () => {
		const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
		const { progress } = await freshStore();

		flushSync(() => {
			progress.persist();
		});
		flushSync(() => {
			progress.markComplete('lesson-a');
			progress.currentLessonId = 'lesson-a';
			progress.theme = 'dark';
		});

		expect(setItemSpy).toHaveBeenCalled();
		const raw = localStorage.getItem(STORAGE_KEY);
		expect(raw).not.toBeNull();
		const parsed = JSON.parse(raw ?? '{}') as {
			completed: string[];
			currentLessonId: string | null;
			theme: string;
		};
		expect(parsed.completed).toContain('lesson-a');
		expect(parsed.currentLessonId).toBe('lesson-a');
		expect(parsed.theme).toBe('dark');
	});
});
