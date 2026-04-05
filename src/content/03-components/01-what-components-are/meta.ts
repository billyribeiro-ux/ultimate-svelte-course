import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.1',
	moduleId: '03',
	number: '1',
	title: 'What components are and why they exist',
	subtitle: 'Extracting a reusable ProfileCard from copy-pasted markup',
	conceptTags: ['components', 'import', 'modules', 'reuse'] as const,
	prerequisites: ['02.13'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Define a component as markup, logic and scoped CSS in one file',
		'Import a .svelte file as an ES module and mount it as a custom tag',
		'Extract a repeated markup block into a shared $lib component',
		'Explain how editing the source updates every instance at once'
	] as const
} as const satisfies LessonMeta;
