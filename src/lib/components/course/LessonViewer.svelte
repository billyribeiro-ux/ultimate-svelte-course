<script lang="ts">
	import type { Component } from 'svelte';
	import type { LessonMeta } from '$lib/types/lesson';
	import PlaygroundHost from './PlaygroundHost.svelte';

	interface Props {
		meta: LessonMeta;
		Readme: Component;
		Demo: Component;
	}

	let { meta, Readme, Demo }: Props = $props();
</script>

<section class="viewer" aria-labelledby="lesson-heading">
	<header class="lesson-header">
		<p class="eyebrow">
			<span>Module {meta.moduleId}</span>
			<span aria-hidden="true">·</span>
			<span>Lesson {meta.number}</span>
			<span aria-hidden="true">·</span>
			<span>{meta.estMinutes} min</span>
		</p>
		<h1 id="lesson-heading" tabindex="-1">{meta.title}</h1>
		{#if meta.subtitle}
			<p class="subtitle">{meta.subtitle}</p>
		{/if}
	</header>

	<div class="viewer-grid">
		<div class="prose-pane">
			<Readme />
		</div>
		<div class="preview-pane">
			<PlaygroundHost {Demo} lessonId={meta.id} />
		</div>
	</div>
</section>

<style>
	.viewer {
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		gap: var(--space-l);
		padding: var(--space-l) var(--space-m);
	}

	.lesson-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
	}

	.eyebrow {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin: 0;
		color: var(--color-fg-muted);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.lesson-header h1 {
		margin: 0;
		font-size: var(--text-3xl);
		line-height: 1.15;
		color: var(--color-fg);
	}

	.lesson-header h1:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 4px;
		border-radius: var(--radius-s);
	}

	.subtitle {
		margin: 0;
		color: var(--color-fg-muted);
		font-size: var(--text-m);
	}

	.viewer-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-l);
	}

	.prose-pane,
	.preview-pane {
		min-inline-size: 0;
	}

	@container (min-width: 900px) {
		.viewer-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
</style>
