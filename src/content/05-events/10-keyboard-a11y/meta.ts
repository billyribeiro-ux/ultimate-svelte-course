import type { LessonMeta } from '$lib/types/lesson';

export const meta = {
	id: '05.10',
	moduleId: '05',
	number: '10',
	title: 'Form accessibility and keyboard navigation',
	subtitle: 'Tab, Arrow, Enter, Escape — custom select with full ARIA',
	conceptTags: ['accessibility', 'keyboard', 'aria', 'listbox', 'combobox'] as const,
	prerequisites: ['05.9'] as const,
	estMinutes: 35,
	learningObjectives: [
		'Implement the WAI-ARIA combobox + listbox pattern',
		'Wire ArrowDown / ArrowUp / Enter / Escape / Home / End handlers',
		'Use aria-activedescendant to track highlight without moving DOM focus',
		'Commit selection via a typed callback prop'
	] as const
} as const satisfies LessonMeta;
