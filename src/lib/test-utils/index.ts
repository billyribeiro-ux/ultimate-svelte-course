/**
 * Shared test utilities for the Ultimate Svelte Course.
 *
 * Import from `$lib/test-utils` in any `*.test.ts` or `*.svelte.test.ts` file.
 * Re-exports the main testing-library APIs so tests only need one import line.
 */
import { render, type RenderResult } from '@testing-library/svelte';
import type { Component, ComponentProps } from 'svelte';
import type { LessonMeta, ModuleMeta } from '$lib/types/lesson';

export * from '@testing-library/svelte';
export { default as userEvent } from '@testing-library/user-event';

/**
 * Render a Svelte component with typed props. Thin wrapper around
 * `@testing-library/svelte`'s `render` that preserves full type inference
 * on the props parameter. Add shared context providers here as the app grows.
 */
export function renderWithContext<TComponent extends Component<Record<string, unknown>>>(
	Component: TComponent,
	props: ComponentProps<TComponent>
): RenderResult<TComponent> {
	return render(Component, { props }) as RenderResult<TComponent>;
}

/**
 * Factory producing a fully-typed `LessonMeta` with sensible defaults.
 * Override any field via the `overrides` parameter.
 */
export function createMockLessonMeta(overrides: Partial<LessonMeta> = {}): LessonMeta {
	return {
		id: 'test-lesson-1',
		moduleId: 'test-module-1',
		number: '1.1',
		title: 'Test Lesson',
		subtitle: 'A lesson used in tests',
		conceptTags: ['testing'],
		prerequisites: [],
		estMinutes: 10,
		learningObjectives: ['Understand testing'],
		...overrides
	};
}

/**
 * Factory producing a fully-typed `ModuleMeta` with sensible defaults.
 * Lessons default to a single lesson produced by `createMockLessonMeta`.
 */
export function createMockModuleMeta(overrides: Partial<ModuleMeta> = {}): ModuleMeta {
	const base: ModuleMeta = {
		id: 'test-module-1',
		title: 'Test Module',
		subtitle: 'A module used in tests',
		order: 1,
		colorToken: '--module-test',
		lessons: [createMockLessonMeta()]
	};
	return { ...base, ...overrides };
}
