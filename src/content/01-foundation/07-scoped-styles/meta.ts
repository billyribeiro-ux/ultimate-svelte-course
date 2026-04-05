import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.7',
	moduleId: '01',
	number: '7',
	title: 'Scoped style blocks and how Svelte isolates CSS',
	subtitle: 'Hash-class scoping, :global() escape hatch, custom properties as the bridge',
	conceptTags: ['scoped-css', 'css-hashing', 'global-escape', 'custom-properties'] as const,
	prerequisites: ['01.6'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Describe how Svelte scopes every selector with a hash class',
		'Recognize when to reach for :global() and why it is a last resort',
		'Use CSS custom properties to pass style values across scope boundaries',
		'Inspect scoping in DevTools'
	] as const
} as const satisfies LessonMeta;
