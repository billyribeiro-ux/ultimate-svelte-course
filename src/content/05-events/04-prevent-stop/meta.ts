import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.4',
	moduleId: '05',
	number: '4',
	title: 'preventDefault and stopPropagation',
	subtitle: 'Cancel browser defaults and control event bubbling',
	conceptTags: ['prevent-default', 'stop-propagation', 'bubbling', 'dropdown'] as const,
	prerequisites: ['05.3'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Call e.preventDefault() to cancel native browser behaviour',
		'Call e.stopPropagation() to halt event bubbling to ancestors',
		'Build an outside-click-to-close pattern without a library',
		'Explain why the two methods are independent tools'
	] as const
} as const satisfies LessonMeta;
