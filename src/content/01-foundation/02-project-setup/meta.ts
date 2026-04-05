import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.2',
	moduleId: '01',
	number: '2',
	title: 'Project setup with pnpm + SvelteKit 2 + TypeScript strict',
	subtitle: 'pnpm dlx sv create, strict mode, function-based svelte.config.js',
	conceptTags: ['pnpm', 'sveltekit', 'typescript-strict', 'vite'] as const,
	prerequisites: ['01.1'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Scaffold a SvelteKit 2 project with pnpm dlx sv create',
		'Verify TypeScript strict mode in tsconfig.json',
		'Understand function-based svelte.config.js (Svelte 5.54+)',
		'Run pnpm dev and recognize the Vite 7 Rolldown output'
	] as const
} as const satisfies LessonMeta;
