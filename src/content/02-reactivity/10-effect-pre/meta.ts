import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.10',
	moduleId: '02',
	number: '10',
	title: '$effect.pre for pre-DOM-update work',
	subtitle: 'Measuring the DOM before Svelte flushes changes',
	conceptTags: ['$effect.pre', 'dom-measurement', 'scroll', 'timing'] as const,
	prerequisites: ['02.9'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Contrast $effect and $effect.pre timing',
		'Capture DOM measurements before updates apply',
		'Preserve scroll position when new items arrive',
		'Choose the right effect flavor for a task'
	] as const
} as const satisfies LessonMeta;
