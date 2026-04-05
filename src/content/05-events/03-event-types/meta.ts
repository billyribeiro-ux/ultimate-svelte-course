import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.3',
	moduleId: '05',
	number: '3',
	title: 'TypeScript event types',
	subtitle: 'MouseEvent, KeyboardEvent, InputEvent, SubmitEvent, FocusEvent',
	conceptTags: ['typescript', 'keyboard-event', 'dom-types', 'effect-cleanup'] as const,
	prerequisites: ['05.2'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Pick the precise DOM event type for a given handler',
		'Narrow e.currentTarget versus e.target safely',
		'Combine e.key with e.ctrlKey / e.metaKey for shortcuts',
		'Attach a window keydown listener inside $effect with cleanup'
	] as const
} as const satisfies LessonMeta;
