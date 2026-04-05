import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.11',
	moduleId: '02',
	number: '11',
	title: '$effect cleanup and memory leak prevention',
	subtitle: 'Returning teardown functions for timers and listeners',
	conceptTags: ['$effect', 'cleanup', 'memory-leak', 'setInterval'] as const,
	prerequisites: ['02.10'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Describe how orphaned timers leak memory',
		'Return a cleanup function from an $effect callback',
		'Pair every setup with a teardown in the same effect',
		'Verify leak-free lifecycle via DevTools'
	] as const
} as const satisfies LessonMeta;
