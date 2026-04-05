import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import type { LessonMeta } from '$lib/types/lesson';

interface ReadmeModule {
	default: Component;
}

interface DemoModule {
	default: Component;
}

interface MetaModule {
	default: LessonMeta;
}

const readmeModules = import.meta.glob<ReadmeModule>('/src/content/*/*/README.md');
const demoModules = import.meta.glob<DemoModule>('/src/content/*/*/playground/Demo.svelte');
const metaModules = import.meta.glob<MetaModule>('/src/content/*/*/meta.ts');

function resolve<T>(
	registry: Record<string, () => Promise<T>>,
	moduleId: string,
	lessonNumber: string,
	suffix: string
): (() => Promise<T>) | null {
	for (const [path, loader] of Object.entries(registry)) {
		if (!path.includes(`/${moduleId}/`)) continue;
		if (!path.endsWith(suffix)) continue;
		const segments = path.split('/');
		// Expect: '', 'src', 'content', <moduleId>, <lessonDir>, ...
		const lessonDir = segments[4];
		if (!lessonDir) continue;
		if (lessonDir === lessonNumber || lessonDir.startsWith(`${lessonNumber}-`)) {
			return loader;
		}
	}
	return null;
}

export const load: PageLoad = async ({ params }) => {
	const { module: moduleId, lesson: lessonNumber } = params;

	const readmeLoader = resolve(readmeModules, moduleId, lessonNumber, 'README.md');
	const demoLoader = resolve(demoModules, moduleId, lessonNumber, 'Demo.svelte');
	const metaLoader = resolve(metaModules, moduleId, lessonNumber, 'meta.ts');

	if (!readmeLoader || !demoLoader || !metaLoader) {
		throw error(404, `Lesson ${moduleId}/${lessonNumber} not found`);
	}

	const [readme, demo, meta] = await Promise.all([readmeLoader(), demoLoader(), metaLoader()]);

	return {
		meta: meta.default,
		Readme: readme.default,
		Demo: demo.default,
		currentLessonId: meta.default.id
	};
};
