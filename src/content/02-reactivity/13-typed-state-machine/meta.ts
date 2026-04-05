import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '02.13',
	moduleId: '02',
	number: '13',
	title: 'TypeScript with reactive state: union types and state machines',
	subtitle: 'Discriminated unions for idle, loading, success, and error',
	conceptTags: ['typescript', 'discriminated-union', 'state-machine', 'async'] as const,
	prerequisites: ['02.12'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Type reactive state with a discriminated union',
		'Narrow state in template branches by discriminator',
		'Prevent impossible combinations at compile time',
		'Transition a typed state machine between four states'
	] as const
} as const satisfies LessonMeta;
