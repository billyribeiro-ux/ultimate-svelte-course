import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.10',
	moduleId: '03',
	number: '10',
	title: 'Responsive components — mobile-first and container queries',
	subtitle: 'A ResponsiveCard that reflows based on its container, not the viewport',
	conceptTags: ['responsive', 'container-queries', 'mobile-first', 'a11y'] as const,
	prerequisites: ['03.9'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Declare a container-type inline-size root',
		'Restyle with @container (min-width: ...) instead of @media',
		'Meet 44px minimum touch targets on every interactive element',
		'Scope hover styles with @media (hover: hover)'
	] as const
} as const satisfies LessonMeta;
