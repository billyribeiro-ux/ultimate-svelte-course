<script lang="ts">
	import ToastHost from './ToastHost.svelte';
	import ToastTriggers from './ToastTriggers.svelte';
	import type { Toast, ToastLevel } from './types';

	const AUTO_DISMISS_MS: number = 4000;

	let toasts: Toast[] = $state<Toast[]>([]);
	let nextId: number = 0;
	const timers: Map<number, ReturnType<typeof setTimeout>> = new Map();

	function show(message: string, level: ToastLevel): void {
		nextId += 1;
		const id: number = nextId;
		toasts = [...toasts, { id, message, level }];
		const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
		timers.set(id, timer);
	}

	function dismiss(id: number): void {
		const timer = timers.get(id);
		if (timer !== undefined) {
			clearTimeout(timer);
			timers.delete(id);
		}
		toasts = toasts.filter((t) => t.id !== id);
	}

	$effect(() => {
		return () => {
			for (const timer of timers.values()) clearTimeout(timer);
			timers.clear();
		};
	});
</script>

<section class="panel">
	<header class="header">
		<h3 class="title">Toast notifications</h3>
		<p class="hint">Click a trigger to fire a typed toast via callback prop.</p>
	</header>
	<ToastTriggers onshow={show} />
</section>

<ToastHost {toasts} ondismiss={dismiss} />

<style>
	.panel {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.header {
		display: grid;
		gap: var(--space-2xs);
	}

	.title {
		margin: 0;
		font-size: var(--text-base);
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}
</style>
