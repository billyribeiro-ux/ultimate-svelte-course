import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.5',
	moduleId: '04',
	number: '5',
	title: 'Nested {#each} — hierarchical data',
	subtitle: 'Categories × products with sticky headers',
	conceptTags: ['each', 'nested', 'hierarchy', 'sticky', 'keys'] as const,
	prerequisites: ['04.4'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Nest each blocks to render tree-shaped data',
		'Type nested interfaces (Category containing Product[])',
		'Key every level independently for stable reconciliation',
		'Pin category headers with position: sticky and logical properties'
	] as const
} as const satisfies LessonMeta;
