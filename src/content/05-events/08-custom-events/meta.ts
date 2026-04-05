import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.8',
	moduleId: '05',
	number: '8',
	title: 'Custom events and the callback prop pattern',
	subtitle: 'Typed function props replace createEventDispatcher entirely',
	conceptTags: ['callback-props', 'custom-events', 'toast', 'typed-payloads'] as const,
	prerequisites: ['05.7'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Declare a typed callback prop with a precise payload signature',
		'Invoke an optional callback safely with onshow?.(...)',
		'Explain when callback props beat $bindable',
		'Build a toast host that exposes onshow to its parent'
	] as const
} as const satisfies LessonMeta;
