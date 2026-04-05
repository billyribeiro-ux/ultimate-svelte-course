import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.3',
	moduleId: '03',
	number: '3',
	title: 'TypeScript interfaces for props',
	subtitle: 'Locking down a Button with variant and size literal unions',
	conceptTags: ['typescript', 'interface', 'literal-union', 'button'] as const,
	prerequisites: ['03.2'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Describe a props contract with an interface',
		'Use string literal unions to close a variant set',
		'Wire typed variants to data attributes in CSS',
		'Catch invalid prop values at compile time with pnpm check'
	] as const
} as const satisfies LessonMeta;
