import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.1',
	moduleId: '02',
	number: '1',
	title: 'What state is and why it exists',
	subtitle: 'The $state() rune and the first reactive primitive',
	conceptTags: ['state', 'runes', '$state', 'reactivity'] as const,
	prerequisites: ['01.9'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Define state as data that changes over time in a component',
		'Explain why Svelte needs an explicit reactive signal',
		'Use $state() to create a tracked primitive value',
		'Read a derived length from a reactive string'
	] as const
} as const satisfies LessonMeta;
