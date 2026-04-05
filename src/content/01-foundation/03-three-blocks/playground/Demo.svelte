<script lang="ts">
	const name: string = 'Ada Lovelace';
	const role: string = 'Engineer';
	const team: string = 'Analytical Engine';
</script>

<article class="card">
	<header>
		<h2>{name}</h2>
		<p class="role">{role}</p>
	</header>
	<footer>
		<span class="team">{team}</span>
	</footer>
</article>

<style>
	.card {
		display: grid;
		gap: var(--space-md);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-inline-start: 4px solid var(--color-primary);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	header {
		display: grid;
		gap: var(--space-2xs);
	}

	h2 {
		margin: 0;
		font-size: var(--text-2xl);
		line-height: var(--leading-tight);
		color: var(--color-fg);
	}

	.role {
		margin: 0;
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-primary);
	}

	footer {
		padding-block-start: var(--space-sm);
		border-block-start: 1px solid var(--color-border);
	}

	.team {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}
</style>
