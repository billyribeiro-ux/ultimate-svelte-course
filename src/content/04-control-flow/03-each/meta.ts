import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.3',
	moduleId: '04',
	number: '3',
	title: '{#each} — array iteration and destructuring',
	subtitle: 'Render typed arrays with inline destructuring',
	conceptTags: ['each', 'array', 'destructuring', 'typed-array'] as const,
	prerequisites: ['04.2'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Iterate a typed array with {#each items as item}',
		'Destructure fields inline inside the each clause',
		'Capture the index binding for zebra striping or ordinals',
		'Build a responsive contact grid without media queries'
	] as const
} as const satisfies LessonMeta;
