<script lang="ts">
	const projectName: string = 'ultimate-svelte-course';
	const packageManager: string = 'pnpm';
	const framework: string = 'SvelteKit 2';
	const strict: boolean = true;
</script>

<section class="setup">
	<header>
		<h2>Project ready</h2>
		<p>Scaffolded with <code>{packageManager} dlx sv create</code></p>
	</header>

	<dl>
		<div class="row">
			<dt>Project</dt>
			<dd>{projectName}</dd>
		</div>
		<div class="row">
			<dt>Framework</dt>
			<dd>{framework}</dd>
		</div>
		<div class="row">
			<dt>Package manager</dt>
			<dd>{packageManager}</dd>
		</div>
		<div class="row">
			<dt>TypeScript strict</dt>
			<dd class:ok={strict}>{strict ? 'enabled' : 'disabled'}</dd>
		</div>
	</dl>
</section>

<style>
	.setup {
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
		display: grid;
		gap: var(--space-2xs);
	}

	h2 {
		margin: 0;
		font-size: var(--text-2xl);
		line-height: var(--leading-tight);
		color: var(--color-primary);
	}

	header p {
		margin: 0;
		font-size: var(--text-sm);
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

	dl {
		display: grid;
		gap: var(--space-xs);
		margin: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-sm);
		align-items: baseline;
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
		color: var(--color-fg);
	}

	dd.ok {
		color: var(--color-success);
	}
</style>
