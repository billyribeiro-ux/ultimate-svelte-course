<script lang="ts">
	const greeting: string = 'Hello, Svelte';
	const tagline: string = 'Compiled, not interpreted.';
</script>

<section class="hello">
	<h1>{greeting}</h1>
	<p>{tagline}</p>
</section>

<style>
	.hello {
		display: grid;
		gap: var(--space-sm);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition: box-shadow var(--dur-base) var(--ease-out);
	}

	.hello:hover {
		box-shadow: var(--shadow-md);
	}

	h1 {
		margin: 0;
		font-size: var(--text-hero);
		line-height: var(--leading-tight);
		color: var(--color-primary);
	}

	p {
		margin: 0;
		font-size: var(--text-base);
		line-height: var(--leading-snug);
		color: var(--color-fg-muted);
	}
</style>
