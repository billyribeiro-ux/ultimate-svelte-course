<script lang="ts">
	let title: string = $state('My Page');
	let runs: number = $state(0);

	$effect(() => {
		const next: string = title.trim() === '' ? 'Untitled' : title;
		document.title = next;
		runs += 1;
	});
</script>

<section class="panel">
	<label class="field">
		<span>Document title</span>
		<input type="text" bind:value={title} placeholder="Type to update the tab..." />
	</label>
	<p class="preview">{title || 'Untitled'}</p>
	<p class="caption">
		Effect has run {runs} time{runs === 1 ? '' : 's'}. Look at the browser tab.
	</p>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .field {
			display: grid;
			gap: var(--space-2xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);

			& input {
				font: inherit;
				padding-block: var(--space-xs);
				padding-inline: var(--space-sm);
				color: var(--color-fg);
				background-color: var(--color-bg);
				border: 1px solid var(--color-border);
				border-radius: var(--radius-md);

				&:focus-visible {
					outline: 2px solid var(--color-focus);
					outline-offset: 2px;
				}
			}
		}

		& .preview {
			margin: 0;
			padding: var(--space-sm) var(--space-md);
			font-size: var(--text-2xl);
			font-weight: 700;
			color: var(--color-primary);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}

		& .caption {
			margin: 0;
			font-size: var(--text-xs);
			color: var(--color-fg-muted);
		}
	}
</style>
