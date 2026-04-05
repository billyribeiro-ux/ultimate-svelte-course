import type { ModuleMeta } from '$lib/types/lesson';
import { meta as lesson01 } from './01-what-is-state/meta';
import { meta as lesson02 } from './02-state-primitives/meta';
import { meta as lesson03 } from './03-state-objects/meta';
import { meta as lesson04 } from './04-state-arrays/meta';
import { meta as lesson05 } from './05-state-raw/meta';
import { meta as lesson06 } from './06-state-snapshot/meta';
import { meta as lesson07 } from './07-derived/meta';
import { meta as lesson08 } from './08-derived-by/meta';
import { meta as lesson09 } from './09-effect/meta';
import { meta as lesson10 } from './10-effect-pre/meta';
import { meta as lesson11 } from './11-effect-cleanup/meta';
import { meta as lesson12 } from './12-reactive-css/meta';
import { meta as lesson13 } from './13-typed-state-machine/meta';

export const moduleMeta = {
	id: '02',
	title: 'Reactivity',
	subtitle:
		"Master Svelte 5's rune system and the underlying JavaScript data model — $state, $derived, $effect, typed state machines, and reactive CSS from first principles.",
	order: 2,
	colorToken: '--module-reactivity',
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
		lesson10,
		lesson11,
		lesson12,
		lesson13
	] as const
} as const satisfies ModuleMeta;
