import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { ModuleMeta } from '$lib/types/lesson';

export const load: LayoutLoad = async ({ params, parent }) => {
	const { manifest } = (await parent()) as { manifest: readonly ModuleMeta[] };
	const module = manifest.find((m) => m.id === params.module);
	if (!module) {
		throw error(404, `Module ${params.module} not found`);
	}
	return { module };
};
