<script lang="ts">
	import IconifyIcon from './IconifyIcon.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	interface Props {
		moduleTitle: string;
		overallPercent: number;
		onSearchOpen: () => void;
		onMenuOpen?: () => void;
	}

	let { moduleTitle, overallPercent, onSearchOpen, onMenuOpen }: Props = $props();

	let percent = $derived(Math.round(Math.max(0, Math.min(1, overallPercent)) * 100));
</script>

<header class="header">
	<div class="start">
		{#if onMenuOpen}
			<button type="button" class="icon-button menu" onclick={onMenuOpen} aria-label="Open navigation">
				<IconifyIcon name="ph:list" />
			</button>
		{/if}
		<a class="brand" href="/" data-sveltekit-preload-data="hover">
			<span class="brand-mark" aria-hidden="true">US</span>
			<span class="brand-text">Ultimate Svelte</span>
		</a>
		<span class="sep" aria-hidden="true">/</span>
		<span class="module-title">{moduleTitle}</span>
	</div>

	<div class="end">
		<button type="button" class="icon-button" onclick={onSearchOpen} aria-label="Open search (/)">
			<IconifyIcon name="ph:magnifying-glass" />
		</button>
		<ThemeToggle />
		<span class="percent" aria-label="Course progress">{percent}%</span>
	</div>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		padding-inline: var(--space-m);
		padding-block: var(--space-s);
		background: var(--color-surface-1);
		border-block-end: 1px solid var(--color-border);
		block-size: var(--header-block-size, 3.5rem);
	}

	.start,
	.end {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		min-inline-size: 0;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--color-fg);
		text-decoration: none;
		font-weight: 600;
	}

	.brand:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
		border-radius: var(--radius-s);
	}

	.brand-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.75rem;
		block-size: 1.75rem;
		background: var(--color-accent);
		color: var(--color-on-accent);
		border-radius: var(--radius-s);
		font-size: var(--text-xs);
		font-weight: 700;
	}

	.brand-text {
		display: none;
	}

	.sep {
		color: var(--color-fg-muted);
		display: none;
	}

	.module-title {
		color: var(--color-fg-muted);
		font-size: var(--text-s);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: none;
	}

	.percent {
		font-variant-numeric: tabular-nums;
		font-size: var(--text-s);
		color: var(--color-fg-muted);
	}

	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-inline-size: var(--touch-min);
		min-block-size: var(--touch-min);
		padding: var(--space-2xs);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-m);
		color: var(--color-fg);
		cursor: pointer;
	}

	.icon-button:hover {
		background: var(--color-surface-2);
	}

	.icon-button:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (min-width: 768px) {
		.brand-text,
		.sep,
		.module-title {
			display: inline;
		}
		.menu {
			display: none;
		}
	}
</style>
