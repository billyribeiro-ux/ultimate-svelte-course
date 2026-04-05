import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.2',
	moduleId: '05',
	number: '2',
	title: 'JS functions deeply — parameters, return values, arrow functions',
	subtitle: 'Declarations vs arrows, typed params, first-class values',
	conceptTags: ['functions', 'typescript', 'arrow-functions', 'handlers'] as const,
	prerequisites: ['05.1'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Distinguish function declarations from arrow function expressions',
		'Annotate parameters and return types explicitly',
		'Recognise functions as first-class values passed to event props',
		'Wire multiple typed named handlers to a toolbar'
	] as const
} as const satisfies LessonMeta;
