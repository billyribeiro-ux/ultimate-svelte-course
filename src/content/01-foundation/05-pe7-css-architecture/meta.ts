import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.5',
	moduleId: '01',
	number: '5',
	title: 'PE7 CSS architecture: layers, OKLCH, mobile-first',
	subtitle: 'Six @layer cascade, OKLCH-only color, fluid tokens, zero utility classes',
	conceptTags: ['pe7', 'css-layers', 'oklch', 'tokens', 'mobile-first'] as const,
	prerequisites: ['01.4'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Explain why @layer solves CSS specificity wars',
		'Read an OKLCH color declaration and identify lightness, chroma, hue',
		'Use CSS custom properties as design tokens',
		'Verify the six-layer cascade in DevTools'
	] as const
} as const satisfies LessonMeta;
