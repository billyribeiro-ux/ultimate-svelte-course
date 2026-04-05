import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '03.8',
	moduleId: '03',
	number: '8',
	title: 'Component composition patterns',
	subtitle: 'Composing Avatar + Badge + Card into a reusable Notification',
	conceptTags: ['composition', 'spread', 'notification', 'patterns'] as const,
	prerequisites: ['03.7'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Build a complex component out of simpler components',
		'Forward unknown attributes through HTMLAttributes<...> and rest spread',
		'Keep each file under one screen by splitting responsibilities',
		'Recognise when a component is overdue for a split'
	] as const
} as const satisfies LessonMeta;
