<script lang="ts">
	import { progress } from '$lib/stores/progressStore.svelte';
	import type { ModuleMeta } from '$lib/types/lesson';

	interface Props {
		data: {
			manifest: readonly ModuleMeta[];
			currentLessonId: string | null;
		};
	}

	let { data }: Props = $props();

	let continueHref = $derived.by<string | null>(() => {
		const id = progress.currentLessonId;
		if (!id) return null;
		for (const mod of data.manifest) {
			const lesson = mod.lessons.find((l) => l.id === id);
			if (lesson) return `/${mod.id}/${lesson.number}`;
		}
		return null;
	});

	let firstLessonHref = $derived.by<string | null>(() => {
		const mod = data.manifest[0];
		if (!mod) return null;
		const first = mod.lessons[0];
		if (!first) return null;
		return `/${mod.id}/${first.number}`;
	});
</script>

<svelte:head>
	<title>Ultimate Svelte Course</title>
</svelte:head>

<section class="landing">
	<h1 tabindex="-1">Welcome to the Ultimate Svelte Course</h1>
	<p class="lede">
		140+ lessons covering Svelte 5 runes, SvelteKit 2, Tauri desktop, and production patterns.
	</p>

	<div class="actions">
		{#if continueHref}
			<a class="cta primary" href={continueHref} data-sveltekit-preload-data="hover">
				Continue where you left off
			</a>
		{:else if firstLessonHref}
			<a class="cta primary" href={firstLessonHref} data-sveltekit-preload-data="hover">
				Start the course
			</a>
		{/if}
	</div>
</section>

<style>
	.landing {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		max-inline-size: var(--measure-prose);
		margin-inline: auto;
		padding: var(--space-xl) var(--space-m);
	}

	.landing h1 {
		margin: 0;
		font-size: var(--text-4xl);
		line-height: 1.1;
		color: var(--color-fg);
	}

	.landing h1:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 4px;
		border-radius: var(--radius-s);
	}

	.lede {
		margin: 0;
		color: var(--color-fg-muted);
		font-size: var(--text-l);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s);
		margin-block-start: var(--space-s);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		min-block-size: var(--touch-min);
		padding: var(--space-s) var(--space-l);
		border-radius: var(--radius-m);
		text-decoration: none;
		font-weight: 600;
		background: var(--color-surface-1);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
	}

	.cta.primary {
		background: var(--color-accent);
		color: var(--color-on-accent);
		border-color: var(--color-accent);
	}

	.cta:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}
</style>
