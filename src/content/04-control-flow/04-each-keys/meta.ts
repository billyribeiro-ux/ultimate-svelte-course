import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.4',
	moduleId: '04',
	number: '4',
	title: '{#each} with keys — stable reconciliation',
	subtitle: 'Identity-based matching vs positional reuse',
	conceptTags: ['each', 'keys', 'reconciliation', 'focus', 'identity'] as const,
	prerequisites: ['04.3'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Add a stable key expression to an each block',
		'Explain why positional matching loses focus and animation state',
		'Choose a stable primitive key from backing data',
		'Demonstrate the visible difference side by side'
	] as const
} as const satisfies LessonMeta;
