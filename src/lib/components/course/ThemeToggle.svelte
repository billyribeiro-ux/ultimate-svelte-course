<script lang="ts">
	import { progress, type Theme } from '$lib/stores/progressStore.svelte';
	import IconifyIcon from './IconifyIcon.svelte';

	const order: readonly Theme[] = ['system', 'light', 'dark'] as const;

	function cycle(): void {
		const idx = order.indexOf(progress.theme);
		const next = order[(idx + 1) % order.length] ?? 'system';
		progress.theme = next;
	}

	$effect(() => {
		if (typeof document === 'undefined') return;
		const theme = progress.theme;
		if (theme === 'system') {
			delete document.documentElement.dataset.theme;
		} else {
			document.documentElement.dataset.theme = theme;
		}
	});

	let iconName = $derived<`ph:${string}`>(
		progress.theme === 'dark'
			? 'ph:moon'
			: progress.theme === 'light'
				? 'ph:sun'
				: 'ph:monitor'
	);

	let label = $derived(
		`Theme: ${progress.theme}. Click to cycle theme.`
	);
</script>

<button type="button" class="toggle" onclick={cycle} aria-label={label} title={label}>
	<IconifyIcon name={iconName} />
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-inline-size: var(--touch-min);
		min-block-size: var(--touch-min);
		padding: var(--space-2xs);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-m);
		background: var(--color-surface-1);
		color: var(--color-fg);
		cursor: pointer;
		transition: background var(--dur-s) var(--ease-out);
	}

	.toggle:hover {
		background: var(--color-surface-2);
	}

	.toggle:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle {
			transition: none;
		}
	}
</style>
