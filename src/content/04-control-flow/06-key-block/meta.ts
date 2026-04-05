import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '04.6',
	moduleId: '04',
	number: '6',
	title: '{#key} — forcing subtree re-creation',
	subtitle: 'Replay transitions on a key change',
	conceptTags: ['key', 'transition', 'remount', 'animation'] as const,
	prerequisites: ['04.5'] as const,
	estMinutes: 25,
	learningObjectives: [
		'Wrap a subtree in {#key} to destroy and recreate it on change',
		'Replay entrance transitions without manual lifecycle code',
		'Understand the difference between identity keys and reset keys',
		'Respect prefers-reduced-motion when replaying animations'
	] as const
} as const satisfies LessonMeta;
