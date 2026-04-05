<script lang="ts">
	interface Item {
		id: string;
		label: string;
	}

	const initial: readonly Item[] = [
		{ id: 'a', label: 'Apple' },
		{ id: 'b', label: 'Banana' },
		{ id: 'c', label: 'Cherry' },
		{ id: 'd', label: 'Date' },
		{ id: 'e', label: 'Elderberry' }
	] as const;

	let items: Item[] = $state([...initial]);

	function shuffle(): void {
		const next = [...items];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const a = next[i];
			const b = next[j];
			if (a && b) {
				next[i] = b;
				next[j] = a;
			}
		}
		items = next;
	}

	function reset(): void {
		items = [...initial];
	}
</script>

<section class="demo">
	<div class="controls">
		<button type="button" class="btn" onclick={shuffle}>Shuffle</button>
		<button type="button" class="btn" onclick={reset}>Reset</button>
	</div>

	<p class="hint">
		Focus an input in each column, then shuffle. The unkeyed column loses focus; the keyed column
		preserves it.
	</p>

	<div class="columns">
		<div class="column">
			<h4 class="heading">Unkeyed (positional)</h4>
			<ul class="list">
				{#each items as item}
					<li class="row">
						<span class="label">{item.label}</span>
						<input class="input" type="text" placeholder="type here" />
					</li>
				{/each}
			</ul>
		</div>

		<div class="column">
			<h4 class="heading">Keyed (stable id)</h4>
			<ul class="list">
				{#each items as item (item.id)}
					<li class="row">
						<span class="label">{item.label}</span>
						<input class="input" type="text" placeholder="type here" />
					</li>
				{/each}
			</ul>
		</div>
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
			gap: var(--space-xs);
		}

		& .btn {
			font: inherit;
			padding-block: var(--space-2xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-primary);
			color: var(--color-primary-contrast);
			border: 1px solid var(--color-primary);
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: filter var(--dur-fast) var(--ease-out);

			&:hover {
				filter: brightness(1.1);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .hint {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .columns {
			display: grid;
			grid-template-columns: 1fr;
			gap: var(--space-md);

			@media (min-width: 640px) {
				grid-template-columns: 1fr 1fr;
			}
		}

		& .heading {
			margin: 0 0 var(--space-xs);
			font-size: var(--text-sm);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-fg-muted);
		}

		& .list {
			display: grid;
			gap: var(--space-xs);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .row {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .label {
			min-inline-size: 6rem;
			font-size: var(--text-sm);
			font-weight: 500;
		}

		& .input {
			flex: 1;
			font: inherit;
			padding-block: var(--space-2xs);
			padding-inline: var(--space-xs);
			background-color: var(--color-bg);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-sm);
			min-inline-size: 0;

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}
	}
</style>
