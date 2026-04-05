import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.5',
	moduleId: '03',
	number: '5',
	title: '$bindable() — two-way binding',
	subtitle: 'An Input whose value flows both ways with a single bind: directive',
	conceptTags: ['bindable', 'runes', 'forms', 'input'] as const,
	prerequisites: ['03.4'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Declare a bindable prop with $bindable() and a default',
		'Consume it from a parent with bind:value',
		'Combine a bindable prop with $derived validity',
		'Explain why $bindable() replaces the manual value + oninput pattern'
	] as const
} as const satisfies LessonMeta;
