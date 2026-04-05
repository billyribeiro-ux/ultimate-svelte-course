import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.10',
	moduleId: '04',
	number: '10',
	title: 'TypeScript with async — Promise<T> return types',
	subtitle: 'Generic fetch wrappers with zero any',
	conceptTags: ['promise', 'generic', 'typed', 'fetch', 'async'] as const,
	prerequisites: ['04.9'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Annotate async functions with Promise<T> return types',
		'Write a generic getJson<T>() helper that types every call site',
		'Consume typed data inside {:then user} without casts',
		'Keep the module free of any and explicit assertions beyond the boundary'
	] as const
} as const satisfies LessonMeta;
