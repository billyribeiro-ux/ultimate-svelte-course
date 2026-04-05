import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.4',
	moduleId: '01',
	number: '4',
	title: 'TypeScript primitives and variable declarations',
	subtitle: 'string, number, boolean, const vs let, inference vs annotation',
	conceptTags: ['typescript', 'primitives', 'const-let', 'inference'] as const,
	prerequisites: ['01.3'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Annotate variables with string, number, and boolean',
		'Distinguish const from let and prefer const by default',
		'Understand when to rely on inference and when to annotate explicitly',
		'Read and fix a strict-mode type error'
	] as const
} as const satisfies LessonMeta;
