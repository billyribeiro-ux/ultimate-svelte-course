<script lang="ts">
	const tokenName: string = '--color-primary';
	const caption: string = 'Resolved via var() through the PE7 token layer.';
</script>

<article class="swatch-card">
	<div class="swatch" aria-hidden="true"></div>
	<div class="meta">
		<code>{tokenName}</code>
		<p>{caption}</p>
	</div>
</article>

<style>
	.swatch-card {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-md);
		align-items: center;
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.swatch {
		inline-size: clamp(3rem, 10vw, 5rem);
		block-size: clamp(3rem, 10vw, 5rem);
		background: var(--color-primary);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
	}

	.meta {
		display: grid;
		gap: var(--space-2xs);
	}

	code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-primary);
	}

	p {
		margin: 0;
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		color: var(--color-fg-muted);
	}
</style>
