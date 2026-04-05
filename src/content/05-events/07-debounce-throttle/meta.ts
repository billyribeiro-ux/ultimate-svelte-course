import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.7',
	moduleId: '05',
	number: '7',
	title: 'Debouncing and throttling',
	subtitle: 'Higher-order timers for input, search, scroll, and resize',
	conceptTags: ['debounce', 'throttle', 'setTimeout', 'higher-order'] as const,
	prerequisites: ['05.6'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Distinguish debounce (wait until silence) from throttle (cap rate)',
		'Write a typed generic debounce<T>() higher-order function',
		'Clear pending timers on component destroy to avoid late fires',
		'Wire a 300ms debounced search input to a mock fetch'
	] as const
} as const satisfies LessonMeta;
