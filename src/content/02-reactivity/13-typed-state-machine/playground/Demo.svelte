<script lang="ts">
	import { idle, loading, success, failure, type AsyncState, type User } from './state';

	let state: AsyncState = $state<AsyncState>(idle);
	let pendingId: number | null = null;

	const sampleUser: User = {
		id: 'u_1',
		name: 'Ada Lovelace',
		email: 'ada@example.com'
	};

	function clearPending(): void {
		if (pendingId !== null) {
			window.clearTimeout(pendingId);
			pendingId = null;
		}
	}

	function load(): void {
		clearPending();
		state = loading;
		pendingId = window.setTimeout(() => {
			state = success(sampleUser);
			pendingId = null;
		}, 900);
	}

	function fail(): void {
		clearPending();
		state = loading;
		pendingId = window.setTimeout(() => {
			state = failure('Network unreachable');
			pendingId = null;
		}, 900);
	}

	function reset(): void {
		clearPending();
		state = idle;
	}

	$effect(() => {
		return () => clearPending();
	});
</script>

<section class="panel">
	<div class="controls">
		<button type="button" class="btn" onclick={load}>Load (success)</button>
		<button type="button" class="btn" onclick={fail}>Load (fail)</button>
		<button type="button" class="btn ghost" onclick={reset}>Reset</button>
	</div>

	<div class="view">
		{#if state.status === 'idle'}
			<p class="hint">Press a button to start loading.</p>
		{:else if state.status === 'loading'}
			<div class="loading">
				<div class="spinner" aria-hidden="true"></div>
				<p>Loading…</p>
			</div>
		{:else if state.status === 'success'}
			<article class="success">
				<h3>{state.data.name}</h3>
				<p>{state.data.email}</p>
				<p class="id">id: {state.data.id}</p>
			</article>
		{:else if state.status === 'error'}
			<p class="error">Error: {state.message}</p>
		{/if}
	</div>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .controls {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-xs);
		}

		& .btn {
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			font: inherit;
			font-weight: 600;
			color: var(--color-primary-contrast);
			background-color: var(--color-primary);
			border: 1px solid var(--color-primary);
			border-radius: var(--radius-md);
			cursor: pointer;

			&.ghost {
				color: var(--color-fg);
				background-color: var(--color-surface-2);
				border-color: var(--color-border);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .view {
			min-block-size: 8rem;
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}

		& .hint {
			margin: 0;
			color: var(--color-fg-muted);
		}

		& .loading {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
			color: var(--color-fg-muted);

			& p {
				margin: 0;
			}
		}

		& .spinner {
			inline-size: 1.5rem;
			block-size: 1.5rem;
			border: 2px solid var(--color-border);
			border-block-start-color: var(--color-primary);
			border-radius: var(--radius-full);
			animation: spin var(--dur-slower) linear infinite;
		}

		& .success {
			padding: var(--space-sm);
			background-color: var(--color-bg);
			border: 1px solid var(--color-success);
			border-radius: var(--radius-md);

			& h3 {
				margin: 0 0 var(--space-2xs);
				color: var(--color-success);
			}

			& p {
				margin: 0;
				font-size: var(--text-sm);
			}

			& .id {
				margin-block-start: var(--space-2xs);
				font-family: var(--font-mono);
				color: var(--color-fg-muted);
			}
		}

		& .error {
			margin: 0;
			padding: var(--space-sm);
			color: var(--color-danger);
			background-color: var(--color-bg);
			border: 1px solid var(--color-danger);
			border-radius: var(--radius-md);
		}
	}

	@keyframes spin {
		to {
			rotate: 1turn;
		}
	}
</style>
