<script lang="ts">
	const isDev = import.meta.env.DEV;
</script>

{#if isDev}
	<div class="bp" aria-hidden="true">
		<span class="x xs">XS</span>
		<span class="x sm">SM</span>
		<span class="x md">MD</span>
		<span class="x lg">LG</span>
		<span class="x xl">XL</span>
		<span class="x xxl">2XL</span>
	</div>
{/if}

<style>
	.bp {
		position: fixed;
		inset-block-end: var(--space-s);
		inset-inline-end: var(--space-s);
		z-index: 9999;
		display: inline-flex;
		gap: 2px;
		padding: var(--space-2xs) var(--space-s);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		color: var(--color-fg);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		pointer-events: none;
	}

	.x {
		display: none;
	}

	.xs {
		display: inline;
	}

	@media (min-width: 480px) {
		.xs {
			display: none;
		}
		.sm {
			display: inline;
		}
	}

	@media (min-width: 768px) {
		.sm {
			display: none;
		}
		.md {
			display: inline;
		}
	}

	@media (min-width: 1024px) {
		.md {
			display: none;
		}
		.lg {
			display: inline;
		}
	}

	@media (min-width: 1280px) {
		.lg {
			display: none;
		}
		.xl {
			display: inline;
		}
	}

	@media (min-width: 1536px) {
		.xl {
			display: none;
		}
		.xxl {
			display: inline;
		}
	}
</style>
