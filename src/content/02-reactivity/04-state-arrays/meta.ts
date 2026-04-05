import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.4',
	moduleId: '02',
	number: '4',
	title: '$state with arrays and mutation methods',
	subtitle: 'Deep reactive arrays and the standard library under runes',
	conceptTags: ['$state', 'arrays', 'mutation', 'push', 'splice', 'filter'] as const,
	prerequisites: ['02.3'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Mutate reactive arrays with push, splice, and index writes',
		'Use non-mutating methods like filter and map in render',
		'Destructure reactive arrays safely',
		'Build a dynamic tag list with add, remove, and filter'
	] as const
} as const satisfies LessonMeta;
