import type { ModuleMeta } from '$lib/types/lesson';
import { meta as lesson01 } from './01-what-is-svelte/meta';
import { meta as lesson02 } from './02-project-setup/meta';
import { meta as lesson03 } from './03-three-blocks/meta';
import { meta as lesson04 } from './04-type-annotations/meta';
import { meta as lesson05 } from './05-pe7-css-architecture/meta';
import { meta as lesson06 } from './06-fluid-clamp/meta';
import { meta as lesson07 } from './07-scoped-styles/meta';
import { meta as lesson08 } from './08-interfaces/meta';
import { meta as lesson09 } from './09-template-expressions/meta';

export const moduleMeta = {
	id: '01',
	title: 'The Foundation',
	subtitle:
		'From an empty folder to a fully typed, PE7-styled, mobile-first Svelte 5 component — every concept built from first principles.',
	order: 1,
	colorToken: '--module-foundation',
	lessons: [
		lesson01,
		lesson02,
		lesson03,
		lesson04,
		lesson05,
		lesson06,
		lesson07,
		lesson08,
		lesson09
	] as const
} as const satisfies ModuleMeta;
