import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.5',
	moduleId: '05',
	number: '5',
	title: 'Forwarding events from child to parent',
	subtitle: 'Callback props, HTMLButtonAttributes, and native-element ergonomics',
	conceptTags: ['callback-props', 'forwarding', 'html-attributes', 'typed-props'] as const,
	prerequisites: ['05.4'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Extend HTMLButtonAttributes from svelte/elements in a Props interface',
		'Forward onclick / onpointerenter / onfocus through callback props',
		'Spread remaining attributes onto the root element',
		'Verify that forwarded handlers fire from the parent'
	] as const
} as const satisfies LessonMeta;
