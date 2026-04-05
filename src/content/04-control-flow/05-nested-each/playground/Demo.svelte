<script lang="ts">
	interface Product {
		id: string;
		name: string;
		price: number;
	}

	interface Category {
		id: string;
		title: string;
		products: readonly Product[];
	}

	const catalog: readonly Category[] = [
		{
			id: 'snacks',
			title: 'Snacks',
			products: [
				{ id: 's1', name: 'Salted Pretzels', price: 3.5 },
				{ id: 's2', name: 'Dark Chocolate', price: 4.2 },
				{ id: 's3', name: 'Mixed Nuts', price: 6.9 },
				{ id: 's4', name: 'Rice Crackers', price: 2.8 }
			]
		},
		{
			id: 'drinks',
			title: 'Drinks',
			products: [
				{ id: 'd1', name: 'Sparkling Water', price: 1.5 },
				{ id: 'd2', name: 'Cold Brew', price: 4.8 },
				{ id: 'd3', name: 'Green Tea', price: 3.2 },
				{ id: 'd4', name: 'Fresh Juice', price: 5.5 }
			]
		},
		{
			id: 'toys',
			title: 'Toys',
			products: [
				{ id: 't1', name: 'Rubber Duck', price: 4.0 },
				{ id: 't2', name: 'Yo-Yo', price: 7.5 },
				{ id: 't3', name: 'Puzzle Cube', price: 12.0 },
				{ id: 't4', name: 'Kite', price: 18.0 }
			]
		}
	] as const;

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
</script>

<section class="demo">
	<div class="scroller">
		{#each catalog as category (category.id)}
			<section class="category">
				<header class="header">
					<h3 class="title">{category.title}</h3>
					<span class="count">{category.products.length} items</span>
				</header>
				<ul class="grid">
					{#each category.products as product (product.id)}
						<li class="card">
							<p class="name">{product.name}</p>
							<p class="price">{formatter.format(product.price)}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</section>

<style>
	.demo {
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
		font-family: var(--font-sans);

		& .scroller {
			display: grid;
			gap: var(--space-lg);
			max-block-size: 28rem;
			overflow-y: auto;
			padding-inline-end: var(--space-xs);
		}

		& .category {
			display: grid;
			gap: var(--space-sm);
		}

		& .header {
			position: sticky;
			inset-block-start: 0;
			z-index: 1;
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface);
			border-block-end: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .title {
			margin: 0;
			font-size: var(--text-lg);
			color: var(--color-primary);
		}

		& .count {
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-fg-muted);
		}

		& .grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
			gap: var(--space-sm);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .card {
			display: grid;
			gap: var(--space-2xs);
			padding: var(--space-sm);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .name {
			margin: 0;
			font-size: var(--text-sm);
			font-weight: 500;
		}

		& .price {
			margin: 0;
			font-size: var(--text-base);
			font-variant-numeric: tabular-nums;
			color: var(--color-accent);
		}
	}
</style>
