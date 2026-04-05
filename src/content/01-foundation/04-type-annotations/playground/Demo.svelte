<script lang="ts">
	const name: string = 'Ada Lovelace';
	const age: number = 34;
	const active: boolean = true;
</script>

<section class="stats">
	<header>
		<h2>{name}</h2>
		<span class="pill" class:active>{active ? 'Active' : 'Inactive'}</span>
	</header>

	<dl>
		<div class="row">
			<dt>Age</dt>
			<dd>{age}</dd>
		</div>
		<div class="row">
			<dt>Status</dt>
			<dd>{active ? 'In good standing' : 'Paused'}</dd>
		</div>
	</dl>
</section>

<style>
	.stats {
		display: grid;
		gap: var(--space-md);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
	}

	h2 {
		margin: 0;
		font-size: var(--text-lg);
		line-height: var(--leading-tight);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding-block: var(--space-2xs);
		padding-inline: var(--space-sm);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-fg-muted);
		background: var(--color-surface-2);
		border-radius: var(--radius-full);
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.pill.active {
		color: var(--color-primary-contrast);
		background: var(--color-success);
	}

	dl {
		display: grid;
		gap: var(--space-xs);
		margin: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-sm);
		padding-block: var(--space-xs);
		border-block-end: 1px solid var(--color-border);
	}

	.row:last-child {
		border-block-end: none;
	}

	dt {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	dd {
		margin: 0;
		font-size: var(--text-base);
		font-family: var(--font-mono);
	}
</style>
