import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.9',
	moduleId: '03',
	number: '9',
	title: 'CSS custom properties as the bridge',
	subtitle: 'Extending Button to every variant via OKLCH custom properties',
	conceptTags: ['css', 'custom-properties', 'variants', 'tokens'] as const,
	prerequisites: ['03.8'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Expose style knobs as CSS custom properties on a component',
		'Switch variants by overriding custom properties on data-* selectors',
		'Keep every colour in OKLCH tokens, never hard-coded',
		'Eliminate prop explosion by moving styling decisions to CSS'
	] as const
} as const satisfies LessonMeta;
