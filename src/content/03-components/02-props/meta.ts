import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.2',
	moduleId: '03',
	number: '2',
	title: '$props() — passing data in',
	subtitle: 'Destructuring props and building an Avatar with src, alt and size',
	conceptTags: ['props', 'runes', 'destructuring', 'avatar'] as const,
	prerequisites: ['03.1'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Call $props() once and destructure the returned object',
		'Pass attributes from a parent using HTML-style syntax',
		'Wire a prop to a CSS custom property for dynamic sizing',
		'Default an omitted prop through destructuring assignment'
	] as const
} as const satisfies LessonMeta;
