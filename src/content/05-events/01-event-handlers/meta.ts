import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.1',
	moduleId: '05',
	number: '1',
	title: 'Event handlers in Svelte 5',
	subtitle: 'Lowercase HTML-aligned handler attributes and typed named functions',
	conceptTags: ['events', 'onclick', 'handlers', 'svelte-5'] as const,
	prerequisites: ['04.10'] as const,
	estMinutes: 20,
	learningObjectives: [
		'Use lowercase onclick / oninput / onsubmit attributes instead of on:click',
		'Type an event handler as (e: MouseEvent) => void',
		'Prefer named handlers over inline arrows for non-trivial logic',
		'Toggle a data attribute to trigger a scoped keyframe animation'
	] as const
} as const satisfies LessonMeta;
