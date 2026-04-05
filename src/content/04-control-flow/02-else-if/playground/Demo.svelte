<script lang="ts">
	type Status = 'idle' | 'loading' | 'error' | 'success';

	const statuses: readonly Status[] = ['idle', 'loading', 'error', 'success'] as const;

	let status: Status = $state('idle');

	function setStatus(next: Status): void {
		status = next;
	}
</script>

<section class="demo">
	<div class="controls" role="group" aria-label="Set status">
		{#each statuses as s (s)}
			<button type="button" class="btn" aria-pressed={status === s} onclick={() => setStatus(s)}>
				{s}
			</button>
		{/each}
	</div>

	<div class="badge" data-status={status}>
		<span class="dot" aria-hidden="true"></span>
		{#if status === 'idle'}
			<span class="label">Idle — waiting for action</span>
		{:else if status === 'loading'}
			<span class="label">Loading — please wait</span>
		{:else if status === 'error'}
			<span class="label">Error — something went wrong</span>
		{:else}
			<span class="label">Success — all done</span>
		{/if}
	</div>
</section>

<style>
	.demo {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
		font-family: var(--font-sans);

		& .controls {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-xs);
		}

		& .btn {
			font: inherit;
			padding-block: var(--space-2xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			text-transform: capitalize;
			cursor: pointer;
			transition: background-color var(--dur-fast) var(--ease-out);

			&:hover {
				background-color: var(--color-bg);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}

			&[aria-pressed='true'] {
				background-color: var(--color-primary);
				color: var(--color-primary-contrast);
				border-color: var(--color-primary);
			}
		}

		& .badge {
			display: inline-flex;
			align-items: center;
			gap: var(--space-xs);
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-full);
			font-size: var(--text-sm);
			inline-size: fit-content;
		}

		& .dot {
			inline-size: 0.625rem;
			block-size: 0.625rem;
			border-radius: var(--radius-full);
			background-color: currentcolor;
		}

		& .badge[data-status='idle'] {
			color: var(--color-fg-muted);
		}

		& .badge[data-status='loading'] {
			color: var(--color-primary);
		}

		& .badge[data-status='loading'] .dot {
			animation: pulse var(--dur-slow) var(--ease-in-out) infinite;
		}

		& .badge[data-status='error'] {
			color: var(--color-danger);
		}

		& .badge[data-status='success'] {
			color: var(--color-success);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.demo .badge[data-status='loading'] .dot {
			animation: none;
		}
	}
</style>
