import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.2',
	moduleId: '04',
	number: '2',
	title: '{:else if} and {:else} — multi-branch',
	subtitle: 'Exhaustive state machines with string-literal unions',
	conceptTags: ['if', 'else-if', 'union', 'state-machine', 'exhaustive'] as const,
	prerequisites: ['04.1'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Chain {:else if} branches to express mutually exclusive states',
		'Model a four-state union (idle, loading, error, success) in TypeScript',
		'Use a terminal {:else} + never assignment for exhaustiveness',
		'Build a reusable StatusBadge component driven by typed props'
	] as const
} as const satisfies LessonMeta;
