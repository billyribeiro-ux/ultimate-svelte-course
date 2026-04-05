import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.8',
	moduleId: '02',
	number: '8',
	title: '$derived.by for multi-statement derivations',
	subtitle: 'Filter, sort, and paginate in one tracked function',
	conceptTags: ['$derived.by', 'pagination', 'filter', 'sort'] as const,
	prerequisites: ['02.7'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Use $derived.by when a single expression is not enough',
		'Keep derivation callbacks pure',
		'Combine filtering, sorting, and pagination in one derived',
		'Type the return value of a $derived.by callback'
	] as const
} as const satisfies LessonMeta;
