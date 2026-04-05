import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.8',
	moduleId: '01',
	number: '8',
	title: 'TypeScript interfaces: defining object shapes',
	subtitle: 'interface vs type alias, optional properties, readonly, literal unions',
	conceptTags: ['typescript', 'interface', 'optional-properties', 'readonly'] as const,
	prerequisites: ['01.4'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Declare an interface with required and optional properties',
		'Explain the difference between interface and type alias',
		'Use literal union types to constrain a field',
		'Handle optional properties in markup with conditional rendering'
	] as const
} as const satisfies LessonMeta;
