import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.9',
	moduleId: '05',
	number: '9',
	title: 'Touch and pointer events',
	subtitle: 'Unified pointer API, swipe detection, 44px touch targets',
	conceptTags: ['pointer-events', 'touch', 'swipe', 'mobile'] as const,
	prerequisites: ['05.8'] as const,
	estMinutes: 30,
	learningObjectives: [
		'Prefer pointer events over mouse+touch pairs for unified input',
		'Track drag deltas across pointerdown / pointermove / pointerup',
		'Animate a transform driven by reactive state during drag',
		'Gate hover affordances behind @media (hover: hover)'
	] as const
} as const satisfies LessonMeta;
