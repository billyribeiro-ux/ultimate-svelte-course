import type { ModuleMeta } from '$lib/types/lesson';
import { meta as lesson01 } from './01-if/meta';
import { meta as lesson02 } from './02-else-if/meta';
import { meta as lesson03 } from './03-each/meta';
import { meta as lesson04 } from './04-each-keys/meta';
import { meta as lesson05 } from './05-nested-each/meta';
import { meta as lesson06 } from './06-key-block/meta';
import { meta as lesson07 } from './07-promises-async/meta';
import { meta as lesson08 } from './08-await-block/meta';
import { meta as lesson09 } from './09-error-handling/meta';
import { meta as lesson10 } from './10-typed-async/meta';

export const moduleMeta = {
	id: '04',
	title: 'Control Flow',
	subtitle:
		'Conditionals, loops, keyed reconciliation, async boundaries, and typed error handling — every Svelte control-flow block alongside the JavaScript primitives that power them.',
	order: 4,
	colorToken: '--module-control-flow',
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
