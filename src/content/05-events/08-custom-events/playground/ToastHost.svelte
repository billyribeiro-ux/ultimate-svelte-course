<script lang="ts">
	import type { Toast } from './types';

	interface Props {
		toasts: readonly Toast[];
		ondismiss: (id: number) => void;
	}

	let { toasts, ondismiss }: Props = $props();
</script>

<div class="host" role="region" aria-label="Notifications" aria-live="polite">
	{#each toasts as toast (toast.id)}
		<article class="toast" data-level={toast.level}>
			<span class="icon" aria-hidden="true">
				{toast.level === 'error' ? '!' : 'i'}
			</span>
			<p class="message">{toast.message}</p>
			<button
				type="button"
				class="dismiss"
				aria-label="Dismiss notification"
				onclick={() => ondismiss(toast.id)}
			>
				×
			</button>
		</article>
	{/each}
</div>

<style>
	.host {
		position: fixed;
		inset-block-end: var(--space-lg);
		inset-inline-end: var(--space-lg);
		display: grid;
		gap: var(--space-sm);
		max-inline-size: min(90vw, 24rem);
		z-index: 50;
		pointer-events: none;
	}

	.toast {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-inline-start-width: 4px;
		border-radius: var(--radius-md);
		box-shadow: 0 0.5rem 1.5rem oklch(0% 0 0 / 0.2);
		color: var(--color-fg);
		pointer-events: auto;
		animation: slide-in var(--dur-base) var(--ease-expressive);

		&[data-level='info'] {
			border-inline-start-color: var(--color-primary);
		}

		&[data-level='error'] {
			border-inline-start-color: var(--color-danger);
		}
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		font-family: var(--font-mono);
		font-weight: 700;
		color: var(--color-primary-contrast);
		background-color: var(--color-primary);
		border-radius: var(--radius-full);
	}

	.toast[data-level='error'] .icon {
		background-color: var(--color-danger);
	}

	.message {
		margin: 0;
		font-size: var(--text-sm);
	}

	.dismiss {
		min-block-size: 2.75rem;
		min-inline-size: 2.75rem;
		font: inherit;
		font-size: var(--text-xl);
		line-height: 1;
		color: var(--color-fg-muted);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(1rem);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.toast {
			animation: none;
		}
	}
</style>
