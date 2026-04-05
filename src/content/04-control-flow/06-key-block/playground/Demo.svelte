<script lang="ts">
	import { fade } from 'svelte/transition';

	type TabId = 'overview' | 'features' | 'pricing';

	interface Tab {
		id: TabId;
		label: string;
		body: string;
	}

	const tabs: readonly Tab[] = [
		{
			id: 'overview',
			label: 'Overview',
			body: 'A high-level tour of the product: what it is, who it is for, and why it exists.'
		},
		{
			id: 'features',
			label: 'Features',
			body: 'Everything the product does, organised by capability and paired with examples.'
		},
		{
			id: 'pricing',
			label: 'Pricing',
			body: 'Transparent tiers, predictable billing, and no surprise fees at renewal time.'
		}
	] as const;

	let currentId: TabId = $state('overview');

	const fallback: Tab = tabs[0] ?? { id: 'overview', label: 'Overview', body: '' };
	const currentTab = $derived<Tab>(tabs.find((t) => t.id === currentId) ?? fallback);
</script>

<section class="demo">
	<div class="tabs" role="tablist">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				class="tab"
				aria-selected={currentId === tab.id}
				onclick={() => (currentId = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	{#key currentId}
		<article class="panel" in:fade={{ duration: 250 }}>
			<h3 class="title">{currentTab.label}</h3>
			<p class="body">{currentTab.body}</p>
		</article>
	{/key}
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

		& .tabs {
			display: flex;
			gap: var(--space-xs);
			flex-wrap: wrap;
		}

		& .tab {
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: background-color var(--dur-fast) var(--ease-out);

			&:hover {
				background-color: var(--color-bg);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}

			&[aria-selected='true'] {
				background-color: var(--color-primary);
				color: var(--color-primary-contrast);
				border-color: var(--color-primary);
			}
		}

		& .panel {
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .title {
			margin: 0 0 var(--space-xs);
			font-size: var(--text-lg);
			color: var(--color-primary);
		}

		& .body {
			margin: 0;
			font-size: var(--text-sm);
			line-height: var(--leading-relaxed);
			color: var(--color-fg-muted);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.demo .panel {
			animation: none;
			transition: none;
		}
	}
</style>
