<script lang="ts">
	const title: string = 'Card A';
	const description: string = 'Primary surface, bold border, tight radius.';
</script>

<article class="card">
	<h3>{title}</h3>
	<p>{description}</p>
</article>

<style>
	.card {
		display: grid;
		gap: var(--space-xs);
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background: var(--color-primary);
		color: var(--color-primary-contrast);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);
	}

	h3 {
		margin: 0;
		font-size: var(--text-lg);
		line-height: var(--leading-tight);
	}

	p {
		margin: 0;
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		opacity: 0.9;
	}
</style>
