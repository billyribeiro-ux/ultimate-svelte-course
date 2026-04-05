import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.9',
	moduleId: '01',
	number: '9',
	title: 'Template expressions: passing data into markup',
	subtitle: '{expressions}, class:/style: directives, {@html}, {@const}',
	conceptTags: ['template', 'expressions', 'directives', 'class-binding'] as const,
	prerequisites: ['01.8'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Embed any valid JS/TS expression inside curly braces',
		'Use class: and style: directives to drive presentation from data',
		'Recognize the XSS risk of {@html} and when sanitization is required',
		'Declare block-local constants with {@const}'
	] as const
} as const satisfies LessonMeta;
