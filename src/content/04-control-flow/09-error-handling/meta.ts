import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.9',
	moduleId: '04',
	number: '9',
	title: 'Error handling with {:catch} and try/catch',
	subtitle: 'Custom error classes and typed narrowing',
	conceptTags: ['error', 'catch', 'unknown', 'custom-error', 'retry'] as const,
	prerequisites: ['04.8'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Subclass Error with a custom ApiError carrying status and url',
		'Type caught values as unknown and narrow with instanceof',
		'Render a friendly retry UI in a {:catch} block',
		'Force refetches by bumping a $state attempt counter'
	] as const
} as const satisfies LessonMeta;
