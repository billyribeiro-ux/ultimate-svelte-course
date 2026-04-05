import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.8',
	moduleId: '04',
	number: '8',
	title: "{#await} — Svelte's built-in async",
	subtitle: 'Pending, resolved, and rejected in one block',
	conceptTags: ['await', 'promise', 'async', 'pending', 'then', 'catch'] as const,
	prerequisites: ['04.7'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Use {#await} / {:then} / {:catch} to replace manual state tracking',
		'Let Svelte handle race conditions when the promise reference changes',
		'Narrow the unknown {:catch} value before rendering',
		'Compare code size vs the manual version in lesson 4.7'
	] as const
} as const satisfies LessonMeta;
