<script lang="ts">
	import type { Component } from 'svelte';
	import type { LessonMeta, LessonRef, ModuleMeta } from '$lib/types/lesson';
	import LessonViewer from '$lib/components/course/LessonViewer.svelte';
	import LessonNav from '$lib/components/course/LessonNav.svelte';

	interface Props {
		data: {
			meta: LessonMeta;
			Readme: Component;
			Demo: Component;
			currentLessonId: string;
			manifest: readonly ModuleMeta[];
		};
	}

	let { data }: Props = $props();

	let flatLessons = $derived<readonly LessonRef[]>(
		data.manifest.flatMap((mod) =>
			mod.lessons.map<LessonRef>((l) => ({
				id: l.id,
				moduleId: mod.id,
				number: l.number,
				title: l.title,
				href: `/${mod.id}/${l.number}`
			}))
		)
	);

	let currentIndex = $derived(flatLessons.findIndex((l) => l.id === data.meta.id));
	let prev = $derived<LessonRef | null>(
		currentIndex > 0 ? (flatLessons[currentIndex - 1] ?? null) : null
	);
	let next = $derived<LessonRef | null>(
		currentIndex >= 0 && currentIndex < flatLessons.length - 1
			? (flatLessons[currentIndex + 1] ?? null)
			: null
	);
</script>

<svelte:head>
	<title>{data.meta.number} · {data.meta.title}</title>
</svelte:head>

<LessonViewer meta={data.meta} Readme={data.Readme} Demo={data.Demo} />
<div class="nav-wrap">
	<LessonNav {prev} {next} currentId={data.meta.id} />
</div>

<style>
	.nav-wrap {
		padding-inline: var(--space-m);
		max-inline-size: var(--measure-wide, 80rem);
		margin-inline: auto;
	}
</style>
