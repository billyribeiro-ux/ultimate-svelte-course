import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.3',
	moduleId: '01',
	number: '3',
	title: 'The three blocks: script, markup, style',
	subtitle: 'Anatomy of a .svelte single-file component',
	conceptTags: ['sfc', 'script', 'markup', 'scoped-style', 'lang-ts'] as const,
	prerequisites: ['01.2'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Identify the three blocks in a .svelte file and what each does',
		'Explain why lang="ts" is always present',
		'Understand that the <script> block runs once per component instance',
		'Write a first typed component by hand'
	] as const
} as const satisfies LessonMeta;
