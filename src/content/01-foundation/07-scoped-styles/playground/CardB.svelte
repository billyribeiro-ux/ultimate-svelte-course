<script lang="ts">
	const title: string = 'Card B';
	const description: string = 'Muted surface, dashed border, generous radius.';
</script>

<article class="card">
	<h3>{title}</h3>
	<p>{description}</p>
</article>

<style>
	.card {
		display: grid;
		gap: var(--space-sm);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface-2);
		color: var(--color-fg);
		border: 2px dashed var(--color-accent);
		border-radius: var(--radius-xl);
		box-shadow: none;
	}

	h3 {
		margin: 0;
		font-size: var(--text-xl);
		line-height: var(--leading-tight);
		color: var(--color-accent);
		font-style: italic;
	}

	p {
		margin: 0;
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--color-fg-muted);
	}
</style>
