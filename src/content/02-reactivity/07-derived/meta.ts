import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.7',
	moduleId: '02',
	number: '7',
	title: '$derived: pure computed values',
	subtitle: 'Values that recompute automatically from their dependencies',
	conceptTags: ['$derived', 'pure', 'computed', 'auto-tracking'] as const,
	prerequisites: ['02.6'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Define $derived as a pure computed value',
		'Chain multiple derived values together',
		'Let TypeScript infer derived types from the expression',
		'Prefer $derived over $effect for values'
	] as const
} as const satisfies LessonMeta;
