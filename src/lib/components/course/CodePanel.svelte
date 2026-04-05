<script lang="ts">
	interface Props {
		highlightedHtml: string;
		filename: string;
		lang: 'svelte' | 'ts' | 'js' | 'css' | 'html';
	}

	let { highlightedHtml, filename, lang }: Props = $props();
</script>

<figure class="code-panel">
	<figcaption class="head">
		<span class="filename">{filename}</span>
		<span class="lang" aria-label="Language">{lang}</span>
	</figcaption>
	<div class="body">
		<!-- Pre-highlighted HTML is trusted: produced at build time by Shiki. -->
		{@html highlightedHtml}
	</div>
</figure>

<style>
	.code-panel {
		display: flex;
		flex-direction: column;
		margin: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-l);
		background: var(--color-code-bg);
		overflow: hidden;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: var(--space-s);
		padding-block: var(--space-2xs);
		background: var(--color-surface-2);
		border-block-end: 1px solid var(--color-border);
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.filename {
		font-family: var(--font-mono);
	}

	.lang {
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.body {
		overflow-x: auto;
		padding: var(--space-m);
		font-family: var(--font-mono);
		font-size: var(--text-s);
		line-height: var(--leading-code, 1.6);
	}

	.body :global(pre) {
		margin: 0;
		background: transparent;
	}
</style>
