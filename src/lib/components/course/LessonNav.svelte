<script lang="ts">
	import type { LessonRef } from '$lib/types/lesson';
	import CompleteButton from './CompleteButton.svelte';
	import IconifyIcon from './IconifyIcon.svelte';

	interface Props {
		prev: LessonRef | null;
		next: LessonRef | null;
		currentId: string;
	}

	let { prev, next, currentId }: Props = $props();
</script>

<nav class="lesson-nav" aria-label="Lesson navigation">
	<div class="slot start">
		{#if prev}
			<a class="nav-link" href={prev.href} data-sveltekit-preload-data="hover">
				<IconifyIcon name="ph:arrow-left" />
				<span class="meta">
					<span class="label">Previous</span>
					<span class="title">{prev.number} · {prev.title}</span>
				</span>
			</a>
		{/if}
	</div>

	<div class="slot center">
		<CompleteButton lessonId={currentId} />
	</div>

	<div class="slot end">
		{#if next}
			<a class="nav-link align-end" href={next.href} data-sveltekit-preload-data="hover">
				<span class="meta">
					<span class="label">Next</span>
					<span class="title">{next.number} · {next.title}</span>
				</span>
				<IconifyIcon name="ph:arrow-right" />
			</a>
		{/if}
	</div>
</nav>

<style>
	.lesson-nav {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-s);
		padding-block: var(--space-l);
	}

	.slot {
		display: flex;
	}

	.slot.center {
		justify-content: center;
	}

	.slot.end {
		justify-content: flex-end;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-s);
		padding: var(--space-s) var(--space-m);
		min-block-size: var(--touch-min);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-m);
		background: var(--color-surface-1);
		color: var(--color-fg);
		text-decoration: none;
	}

	.nav-link:hover {
		background: var(--color-surface-2);
	}

	.nav-link:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.nav-link.align-end {
		text-align: end;
	}

	.meta {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.label {
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.title {
		font-size: var(--text-s);
		font-weight: 600;
	}

	@media (min-width: 768px) {
		.lesson-nav {
			grid-template-columns: 1fr auto 1fr;
		}
	}
</style>
