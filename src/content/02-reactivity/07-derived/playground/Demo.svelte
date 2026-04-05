<script lang="ts">
	interface Line {
		id: string;
		name: string;
		price: number;
		qty: number;
	}

	const lines = $state<Line[]>([
		{ id: '1', name: 'Keyboard', price: 89, qty: 1 },
		{ id: '2', name: 'Mouse', price: 45, qty: 2 },
		{ id: '3', name: 'Cable', price: 12, qty: 3 }
	]);

	const TAX_RATE = 0.08;

	const subtotal: number = $derived(lines.reduce((sum, l) => sum + l.price * l.qty, 0));
	const tax: number = $derived(subtotal * TAX_RATE);
	const total: number = $derived(subtotal + tax);

	function format(value: number): string {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}

	function inc(line: Line): void {
		line.qty += 1;
	}

	function dec(line: Line): void {
		if (line.qty > 0) line.qty -= 1;
	}

	function remove(id: string): void {
		const i = lines.findIndex((l) => l.id === id);
		if (i >= 0) lines.splice(i, 1);
	}
</script>

<section class="cart">
	<ul class="lines">
		{#each lines as line (line.id)}
			<li class="line">
				<div class="info">
					<p class="name">{line.name}</p>
					<p class="price">{format(line.price)}</p>
				</div>
				<div class="qty">
					<button type="button" aria-label="Decrease" onclick={() => dec(line)}>−</button>
					<span>{line.qty}</span>
					<button type="button" aria-label="Increase" onclick={() => inc(line)}>+</button>
				</div>
				<p class="subtotal">{format(line.price * line.qty)}</p>
				<button type="button" class="remove" aria-label="Remove" onclick={() => remove(line.id)}>
					×
				</button>
			</li>
		{/each}
	</ul>

	<dl class="totals">
		<dt>Subtotal</dt>
		<dd>{format(subtotal)}</dd>
		<dt>Tax (8%)</dt>
		<dd>{format(tax)}</dd>
		<dt class="grand">Total</dt>
		<dd class="grand">{format(total)}</dd>
	</dl>
</section>

<style>
	.cart {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .lines {
			display: grid;
			gap: var(--space-xs);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .line {
			display: grid;
			grid-template-columns: 1fr auto auto auto;
			align-items: center;
			gap: var(--space-sm);
			padding: var(--space-sm);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}

		& .info {
			display: grid;
			gap: var(--space-2xs);

			& .name {
				margin: 0;
				font-weight: 600;
			}

			& .price {
				margin: 0;
				font-size: var(--text-sm);
				color: var(--color-fg-muted);
			}
		}

		& .qty {
			display: inline-flex;
			align-items: center;
			gap: var(--space-xs);
			font-variant-numeric: tabular-nums;

			& button {
				inline-size: 2rem;
				block-size: 2rem;
				padding: 0;
				font: inherit;
				color: var(--color-fg);
				background-color: var(--color-bg);
				border: 1px solid var(--color-border);
				border-radius: var(--radius-md);
				cursor: pointer;

				&:focus-visible {
					outline: 2px solid var(--color-focus);
					outline-offset: 2px;
				}
			}
		}

		& .subtotal {
			margin: 0;
			font-variant-numeric: tabular-nums;
			font-weight: 600;
		}

		& .remove {
			inline-size: 2rem;
			block-size: 2rem;
			padding: 0;
			font: inherit;
			color: var(--color-fg-muted);
			background-color: transparent;
			border: none;
			border-radius: var(--radius-full);
			cursor: pointer;

			&:hover {
				color: var(--color-danger);
			}
		}

		& .totals {
			display: grid;
			grid-template-columns: 1fr auto;
			gap: var(--space-2xs) var(--space-md);
			margin: 0;
			padding: var(--space-sm) var(--space-md);
			font-variant-numeric: tabular-nums;
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);

			& dt {
				color: var(--color-fg-muted);
			}

			& dd {
				margin: 0;
				text-align: end;
			}

			& .grand {
				font-size: var(--text-lg);
				font-weight: 700;
				color: var(--color-fg);
			}
		}
	}
</style>
