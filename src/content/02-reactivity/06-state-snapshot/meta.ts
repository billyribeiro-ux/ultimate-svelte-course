import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.6',
	moduleId: '02',
	number: '6',
	title: '$state.snapshot for serialization',
	subtitle: 'Turning reactive Proxies back into plain JavaScript',
	conceptTags: ['$state.snapshot', 'serialization', 'json', 'proxy'] as const,
	prerequisites: ['02.5'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Describe why reactive Proxies cannot cross certain boundaries',
		'Use $state.snapshot() to obtain a plain object copy',
		'Serialize a snapshot with JSON.stringify',
		'Know when snapshotting is required vs optional'
	] as const
} as const satisfies LessonMeta;
