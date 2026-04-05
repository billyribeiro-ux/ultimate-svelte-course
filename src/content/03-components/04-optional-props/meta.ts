import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.4',
	moduleId: '03',
	number: '4',
	title: 'Optional props and defaults',
	subtitle: 'A Badge with neutral defaults and overrideable color, size and shape',
	conceptTags: ['props', 'optional', 'defaults', 'badge'] as const,
	prerequisites: ['03.3'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Mark a prop optional in an interface with ?',
		'Provide a runtime default via destructuring assignment',
		'Explain how a default narrows string | undefined back to string',
		'Design sensible defaults that keep the common call site minimal'
	] as const
} as const satisfies LessonMeta;
