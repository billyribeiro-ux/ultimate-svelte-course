<script lang="ts">
	interface Props {
		title: string;
		price: string;
		imageUrl: string;
		description: string;
		onbuy?: (event: MouseEvent) => void;
	}

	const { title, price, imageUrl, description, onbuy }: Props = $props();
</script>

<article class="product-card">
	<div class="media">
		<img class="image" src={imageUrl} alt="" aria-hidden="true" />
	</div>
	<div class="content">
		<header class="header">
			<h3 class="title">{title}</h3>
			<p class="price">{price}</p>
		</header>
		<p class="description">{description}</p>
		<div class="actions">
			<button type="button" class="buy" onclick={onbuy}>Add to cart</button>
		</div>
	</div>
</article>

<style>
	.product-card {
		container-type: inline-size;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background-color: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);

		& .media {
			display: block;
			aspect-ratio: 4 / 3;
			overflow: hidden;
			border-radius: var(--radius-md);
			background-color: var(--color-surface-2);
		}

		& .image {
			inline-size: 100%;
			block-size: 100%;
			object-fit: cover;
			display: block;
		}

		& .content {
			display: grid;
			gap: var(--space-sm);
			min-inline-size: 0;
		}

		& .header {
			display: grid;
			gap: var(--space-2xs);
		}

		& .title {
			margin: 0;
			font-size: var(--text-lg);
			line-height: var(--leading-tight);
		}

		& .price {
			margin: 0;
			font-size: var(--text-base);
			font-weight: 600;
			color: var(--color-primary);
		}

		& .description {
			margin: 0;
			font-size: var(--text-sm);
			line-height: var(--leading-normal);
			color: var(--color-fg-muted);
		}

		& .actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-sm);
		}

		& .buy {
			min-block-size: 2.75rem;
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			font: inherit;
			font-weight: 600;
			color: var(--color-primary-contrast);
			background-color: var(--color-primary);
			border: 1px solid transparent;
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: background-color var(--dur-fast) var(--ease-out);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		@container (min-width: 30rem) {
			& {
				grid-template-columns: 14rem 1fr;
				align-items: start;
			}

			& .header {
				grid-template-columns: 1fr auto;
				align-items: baseline;
			}
		}
	}

	@media (hover: hover) {
		.product-card .buy:hover {
			background-color: color-mix(in oklch, var(--color-primary) 85%, black);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.product-card .buy {
			transition: none;
		}
	}
</style>
