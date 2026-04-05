import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.12',
	moduleId: '02',
	number: '12',
	title: 'Reactivity in CSS via directives and custom properties',
	subtitle: 'class:, style:, and CSS custom properties driven by state',
	conceptTags: ['class-directive', 'style-directive', 'custom-properties', 'oklch'] as const,
	prerequisites: ['02.11'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Toggle classes reactively with class:name={expr}',
		'Set inline styles via style:property={value}',
		'Bridge reactive state into CSS custom properties',
		'Build an OKLCH color mixer from three sliders'
	] as const
} as const satisfies LessonMeta;
