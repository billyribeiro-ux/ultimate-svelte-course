import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.9',
	moduleId: '02',
	number: '9',
	title: '$effect: side effects and the JS execution model',
	subtitle: 'Running code after the DOM updates with auto-tracked dependencies',
	conceptTags: ['$effect', 'side-effects', 'dom', 'auto-tracking'] as const,
	prerequisites: ['02.8'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Define a side effect and contrast it with derivation',
		'Use $effect for work that touches the world outside state',
		'Rely on auto-tracking instead of manual dependency lists',
		'Decide between $effect and $derived for a given task'
	] as const
} as const satisfies LessonMeta;
