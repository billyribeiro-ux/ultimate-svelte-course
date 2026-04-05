import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '01.1',
	moduleId: '01',
	number: '1',
	title: 'What Svelte is and why it compiles',
	subtitle: 'Compiler vs runtime, zero framework bundle, first compiled output',
	conceptTags: ['compiler', 'runtime', 'bundle-size', 'oklch'] as const,
	prerequisites: [] as const,
	estMinutes: 20,
	learningObjectives: [
		'Explain the difference between a compiler and a runtime framework',
		'Describe why Svelte ships less JavaScript than virtual-DOM frameworks',
		'Distinguish Svelte, SvelteKit, and Node',
		'Inspect compiled component output in browser devtools'
	] as const
} as const satisfies LessonMeta;
