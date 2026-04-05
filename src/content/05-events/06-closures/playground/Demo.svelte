<script lang="ts">
	type Section = { readonly id: string; readonly title: string; readonly body: string };

	const sections: readonly Section[] = [
		{
			id: 'shipping',
			title: 'Shipping & delivery',
			body: 'Standard delivery takes 3 to 5 business days. Express ships next day in most regions.'
		},
		{
			id: 'returns',
			title: 'Returns & refunds',
			body: 'Unworn items can be returned within 30 days for a full refund to the original payment method.'
		},
		{
			id: 'sizing',
			title: 'Sizing guide',
			body: 'Our sizes follow European standards. Consult the chart on each product page for exact measurements.'
		},
		{
			id: 'warranty',
			title: 'Warranty',
			body: 'Every product is covered by a two-year manufacturer warranty against defects.'
		},
		{
			id: 'contact',
			title: 'Contact support',
			body: 'Reach us at support@example.com or through the live chat in the bottom-right corner.'
		}
	] as const;

	let openMap: Map<string, boolean> = $state<Map<string, boolean>>(new Map());

	function toggle(id: string): void {
		const current: boolean = openMap.get(id) ?? false;
		openMap.set(id, !current);
	}
</script>

<section class="accordion" aria-label="Frequently asked questions">
	{#each sections as section (section.id)}
		{@const isOpen = openMap.get(section.id) ?? false}
		<article class="item" data-open={isOpen}>
			<h3 class="heading">
				<button
					type="button"
					class="trigger"
					aria-expanded={isOpen}
					aria-controls={`panel-${section.id}`}
					onclick={() => toggle(section.id)}
				>
					<span>{section.title}</span>
					<span class="chevron" aria-hidden="true">▸</span>
				</button>
			</h3>
			{#if isOpen}
				<div class="panel" id={`panel-${section.id}`} role="region">
					<p>{section.body}</p>
				</div>
			{/if}
		</article>
	{/each}
</section>

<style>
	.accordion {
		display: grid;
		gap: var(--space-xs);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.item {
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.heading {
		margin: 0;
		font-size: var(--text-base);
	}

	.trigger {
		display: flex;
		inline-size: 100%;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		min-block-size: 2.75rem;
		padding-block: var(--space-sm);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-fg);
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-align: start;

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: -2px;
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-bg);
			}
		}
	}

	.chevron {
		display: inline-block;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
		transition: transform var(--dur-fast) var(--ease-out);
	}

	.item[data-open='true'] .chevron {
		transform: rotate(90deg);
	}

	.panel {
		padding-block: var(--space-sm);
		padding-inline: var(--space-md);
		background-color: var(--color-bg);
		border-block-start: 1px solid var(--color-border);
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
		animation: fade-in var(--dur-fast) var(--ease-out);
	}

	.panel p {
		margin: 0;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-0.25rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron,
		.panel {
			transition: none;
			animation: none;
		}
	}
</style>
