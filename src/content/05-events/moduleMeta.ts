import type { ModuleMeta } from '$lib/types/lesson';
import { meta as lesson01 } from './01-event-handlers/meta';
import { meta as lesson02 } from './02-functions/meta';
import { meta as lesson03 } from './03-event-types/meta';
import { meta as lesson04 } from './04-prevent-stop/meta';
import { meta as lesson05 } from './05-forwarding-events/meta';
import { meta as lesson06 } from './06-closures/meta';
import { meta as lesson07 } from './07-debounce-throttle/meta';
import { meta as lesson08 } from './08-custom-events/meta';
import { meta as lesson09 } from './09-touch-pointer/meta';
import { meta as lesson10 } from './10-keyboard-a11y/meta';

export const moduleMeta = {
	id: '05',
	title: 'Events & Interaction',
	subtitle:
		"Every user interaction primitive in Svelte 5's HTML-aligned event system — lowercase handlers, fully typed DOM events, closures, debouncing, custom events via callback props, touch and pointer input, and full keyboard accessibility.",
	order: 5,
	colorToken: '--module-events',
	lessons: [
		lesson01,
		lesson02,
		lesson03,
		lesson04,
		lesson05,
		lesson06,
		lesson07,
		lesson08,
		lesson09,
		lesson10
	] as const
} as const satisfies ModuleMeta;
