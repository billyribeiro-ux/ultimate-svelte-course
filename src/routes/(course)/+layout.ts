import type { LayoutLoad } from './$types';
import type { ModuleMeta } from '$lib/types/lesson';

interface ModuleMetaModule {
	default: ModuleMeta;
}

/**
 * Walks src/content at build time via import.meta.glob and produces the
 * typed manifest consumed by the shell. Eager + import: 'default' so the
 * manifest is static and edge-cacheable.
 */
const moduleModules = import.meta.glob<ModuleMetaModule>(
	'/src/content/*/moduleMeta.ts',
	{ eager: true }
);

function buildManifest(): readonly ModuleMeta[] {
	const modules: ModuleMeta[] = [];
	for (const mod of Object.values(moduleModules)) {
		modules.push(mod.default);
	}
	modules.sort((a, b) => a.order - b.order);
	return modules;
}

export const load: LayoutLoad = async () => {
	const manifest = buildManifest();
	return {
		manifest,
		currentLessonId: null as string | null
	};
};
