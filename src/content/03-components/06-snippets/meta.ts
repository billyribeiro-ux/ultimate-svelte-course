import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.6',
	moduleId: '03',
	number: '6',
	title: 'Snippets — {#snippet} and {@render}',
	subtitle: 'A Card with header and body regions powered by named snippets',
	conceptTags: ['snippets', 'render', 'template', 'card'] as const,
	prerequisites: ['03.5'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Define a snippet with {#snippet name()}',
		'Render a snippet at a specific position with {@render}',
		'Contrast snippets with the old slot system',
		'Arrange snippet output inside CSS grid template areas'
	] as const
} as const satisfies LessonMeta;
