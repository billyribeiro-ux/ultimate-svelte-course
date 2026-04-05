import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.2',
	moduleId: '02',
	number: '2',
	title: '$state with primitive types',
	subtitle: 'Booleans, numbers, and strings inside reactive context',
	conceptTags: ['$state', 'primitives', 'boolean', 'oklch', 'transitions'] as const,
	prerequisites: ['02.1'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Create reactive booleans, numbers, and strings with $state()',
		'Understand why count++ compiles to a tracked write',
		'Let TypeScript infer types from $state initial values',
		'Drive an OKLCH background transition from a reactive boolean'
	] as const
} as const satisfies LessonMeta;
