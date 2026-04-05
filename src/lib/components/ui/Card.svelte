<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		header?: Snippet;
		body?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	}

	const { header, body, footer, children }: Props = $props();
</script>

<article class="card">
	{#if header}
		<div class="region header">{@render header()}</div>
	{/if}
	{#if body}
		<div class="region body">{@render body()}</div>
	{/if}
	{#if children && !body}
		<div class="region body">{@render children()}</div>
	{/if}
	{#if footer}
		<div class="region footer">{@render footer()}</div>
	{/if}
</article>

<style>
	.card {
		display: grid;
		grid-template-areas:
			'header'
			'body'
			'footer';
		gap: var(--space-sm);
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background-color: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);

		& .region {
			min-inline-size: 0;
		}

		& .header {
			grid-area: header;
			font-size: var(--text-lg);
			font-weight: 600;
			line-height: var(--leading-tight);
		}

		& .body {
			grid-area: body;
			font-size: var(--text-base);
			line-height: var(--leading-normal);
			color: var(--color-fg);
		}

		& .footer {
			grid-area: footer;
			padding-block-start: var(--space-sm);
			border-block-start: 1px solid var(--color-border);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}
	}
</style>
