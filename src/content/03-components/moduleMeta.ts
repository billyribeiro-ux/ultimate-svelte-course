import type { ModuleMeta } from '$lib/types/lesson';
import { meta as lesson01 } from './01-what-components-are/meta';
import { meta as lesson02 } from './02-props/meta';
import { meta as lesson03 } from './03-typed-props/meta';
import { meta as lesson04 } from './04-optional-props/meta';
import { meta as lesson05 } from './05-bindable/meta';
import { meta as lesson06 } from './06-snippets/meta';
import { meta as lesson07 } from './07-snippet-props/meta';
import { meta as lesson08 } from './08-composition/meta';
import { meta as lesson09 } from './09-css-custom-props/meta';
import { meta as lesson10 } from './10-responsive-components/meta';

export const moduleMeta = {
	id: '03',
	title: 'Components & Props',
	subtitle:
		'Design a typed, reusable UI component library from first principles — props, bindable state, snippets, composition, CSS custom properties, and container-query responsiveness.',
	order: 3,
	colorToken: '--module-components',
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
