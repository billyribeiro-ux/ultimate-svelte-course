import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.6',
	moduleId: '05',
	number: '6',
	title: 'Closures in event handlers',
	subtitle: 'Per-iteration scope, the classic loop bug, and accordions',
	conceptTags: ['closures', 'each', 'accordion', 'scope'] as const,
	prerequisites: ['05.5'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Define a closure as a function plus its captured lexical scope',
		'Explain why each-block bindings always capture the correct value',
		'Store per-item state in a Map<string, boolean> inside $state',
		'Build a multi-item accordion using closure-captured ids'
	] as const
} as const satisfies LessonMeta;
