<script lang="ts">
	import { progress } from '$lib/stores/progressStore.svelte';
	import IconifyIcon from './IconifyIcon.svelte';

	interface Props {
		lessonId: string;
	}

	let { lessonId }: Props = $props();

	let isComplete = $derived(progress.completedLessons.has(lessonId));

	function toggle(): void {
		progress.toggleComplete(lessonId);
	}
</script>

<button
	type="button"
	class="complete-button"
	class:is-complete={isComplete}
	onclick={toggle}
	aria-pressed={isComplete}
>
	<IconifyIcon name={isComplete ? 'ph:check-circle-fill' : 'ph:circle'} />
	<span>{isComplete ? 'Completed' : 'Mark complete'}</span>
</button>

<style>
	.complete-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		padding: var(--space-s) var(--space-m);
		min-block-size: var(--touch-min);
		background: var(--color-surface-1);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-m);
		font-size: var(--text-s);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-s) var(--ease-out),
			color var(--dur-s) var(--ease-out),
			border-color var(--dur-s) var(--ease-out);
	}

	.complete-button:hover {
		background: var(--color-surface-2);
	}

	.complete-button:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.complete-button.is-complete {
		background: var(--color-success-surface, var(--color-surface-accent));
		color: var(--color-success, var(--color-fg));
		border-color: var(--color-success, var(--color-border));
	}

	@media (prefers-reduced-motion: reduce) {
		.complete-button {
			transition: none;
		}
	}
</style>
