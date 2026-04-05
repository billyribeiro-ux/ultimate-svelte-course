import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.7',
	moduleId: '04',
	number: '7',
	title: 'Promises and async/await — manual state tracking',
	subtitle: 'Verbose status/data/error rune pattern',
	conceptTags: ['promise', 'async', 'await', 'fetch', 'state-machine'] as const,
	prerequisites: ['04.6'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Understand Promise<T> as a pending value with typed resolution',
		'Write an async function that fetches and parses JSON',
		'Track loading, data, and error state in three $state variables',
		'Render a skeleton that respects prefers-reduced-motion'
	] as const
} as const satisfies LessonMeta;
