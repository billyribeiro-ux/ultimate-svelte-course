import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.6',
	moduleId: '01',
	number: '6',
	title: 'Fluid typography and spacing with clamp()',
	subtitle: 'Replace the media-query staircase with one smooth line',
	conceptTags: ['clamp', 'fluid-type', 'responsive', 'viewport-units'] as const,
	prerequisites: ['01.5'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Read a clamp(min, preferred, max) declaration and predict its output',
		'Explain why fluid type eliminates most media queries',
		'Compose a preferred value from rem + vw units',
		'Verify smooth scaling from 320px to 1920px'
	] as const
} as const satisfies LessonMeta;
