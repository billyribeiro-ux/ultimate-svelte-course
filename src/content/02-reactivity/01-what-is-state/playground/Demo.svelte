<script lang="ts">
	let text: string = $state('');
	const length: number = $derived(text.length);
	const words: number = $derived(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
</script>

<section class="counter">
	<label for="text-input" class="label">Type something</label>
	<input id="text-input" class="input" type="text" bind:value={text} placeholder="Start typing..." />
	<dl class="stats">
		<div class="stat">
			<dt>Characters</dt>
			<dd>{length}</dd>
		</div>
		<div class="stat">
			<dt>Words</dt>
			<dd>{words}</dd>
		</div>
	</dl>
</section>

<style>
	.counter {
		display: grid;
		gap: var(--space-sm);
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .label {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .input {
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-bg);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .stats {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--space-sm);
			margin: 0;
		}

		& .stat {
			display: grid;
			gap: var(--space-2xs);
			padding: var(--space-sm);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}

		& dt {
			font-size: var(--text-xs);
			color: var(--color-fg-muted);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		& dd {
			margin: 0;
			font-size: var(--text-2xl);
			font-variant-numeric: tabular-nums;
			color: var(--color-primary);
		}
	}
</style>
