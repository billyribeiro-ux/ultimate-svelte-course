import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.5',
	moduleId: '02',
	number: '5',
	title: '$state.raw for non-deep reactivity',
	subtitle: 'Opting out of Proxy wrapping for large datasets',
	conceptTags: ['$state.raw', 'performance', 'proxy', 'datasets'] as const,
	prerequisites: ['02.4'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Explain when deep reactivity becomes expensive',
		'Use $state.raw for wholesale dataset swaps',
		'Trigger updates by reassigning the whole value',
		'Compare raw and deep state performance profiles'
	] as const
} as const satisfies LessonMeta;
