import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.3',
	moduleId: '02',
	number: '3',
	title: '$state with objects (deep reactivity)',
	subtitle: 'Proxies, nested reactivity, and typed settings panels',
	conceptTags: ['$state', 'proxy', 'deep-reactivity', 'interface'] as const,
	prerequisites: ['02.2'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Explain how Svelte wraps objects in a deep Proxy',
		'Write natural mutation code like user.name = "Billy"',
		'Type reactive objects with $state<User>({...})',
		'Bind inputs directly to nested reactive fields'
	] as const
} as const satisfies LessonMeta;
