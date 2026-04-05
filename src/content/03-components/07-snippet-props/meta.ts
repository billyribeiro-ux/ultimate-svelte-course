import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.7',
	moduleId: '03',
	number: '7',
	title: 'Passing snippets as props',
	subtitle: 'Modal with a typed children snippet and a title prop',
	conceptTags: ['snippets', 'children', 'modal', 'typed'] as const,
	prerequisites: ['03.6'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Import Snippet from svelte and type a children prop',
		'Use the implicit children snippet when content appears between tags',
		'Separate structure (the component) from content (the caller)',
		'Trigger focus trap and close handling on a modal dialog'
	] as const
} as const satisfies LessonMeta;
