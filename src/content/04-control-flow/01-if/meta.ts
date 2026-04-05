import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.1',
	moduleId: '04',
	number: '1',
	title: '{#if} — conditional rendering and JS boolean logic',
	subtitle: 'Mount and unmount DOM from truthy expressions',
	conceptTags: ['if', 'conditional', 'boolean', 'truthiness', 'narrowing'] as const,
	prerequisites: ['03.10'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Use {#if} to mount and unmount DOM based on an expression',
		'Apply JavaScript truthiness rules and strict equality safely',
		'Narrow TypeScript unions inside conditional branches',
		'Build a password strength indicator with derived state'
	] as const
} as const satisfies LessonMeta;
