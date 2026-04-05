<script lang="ts">
	import CardA from './CardA.svelte';
	import CardB from './CardB.svelte';
</script>

<section class="grid">
	<CardA />
	<CardB />
</section>

<p class="hint">
	Open DevTools and inspect each <code>.card</code>. Each one carries a different
	<code>svelte-*</code>
	hash class, proving the two components cannot collide despite the identical selector.
</p>

<style>
	.grid {
		display: grid;
		gap: var(--space-md);
		grid-template-columns: 1fr;
	}

	@media (min-width: 40rem) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.hint {
		margin-block-start: var(--space-md);
		font-size: var(--text-sm);
		line-height: var(--leading-relaxed);
		color: var(--color-fg-muted);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		padding-block: 0.1em;
		padding-inline: 0.35em;
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
	}
</style>
