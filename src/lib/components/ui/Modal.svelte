<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title: string;
		children: Snippet;
		footer?: Snippet;
		onclose?: () => void;
	}

	let {
		open = $bindable(false),
		title,
		children,
		footer,
		onclose
	}: Props = $props();

	function close(): void {
		open = false;
		onclose?.();
	}

	function onBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div
		class="backdrop"
		role="presentation"
		onclick={onBackdropClick}
	>
		<div
			class="dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<header class="header">
				<h2 id="modal-title" class="title">{title}</h2>
				<button
					type="button"
					class="close"
					aria-label="Close dialog"
					onclick={close}
				>
					×
				</button>
			</header>
			<div class="body">{@render children()}</div>
			{#if footer}
				<footer class="footer">{@render footer()}</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		padding: var(--space-md);
		background-color: oklch(0% 0 0 / 0.5);
		backdrop-filter: blur(6px);
		z-index: 100;
		animation: fade-in var(--dur-fast) var(--ease-out);

		& .dialog {
			display: grid;
			gap: var(--space-sm);
			inline-size: min(100%, 32rem);
			max-block-size: calc(100dvh - var(--space-xl));
			overflow: auto;
			padding-block: var(--space-md);
			padding-inline: var(--space-md);
			background-color: var(--color-surface);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-lg);
			animation: rise var(--dur-base) var(--ease-out);
		}

		& .header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-sm);
		}

		& .title {
			margin: 0;
			font-size: var(--text-xl);
			line-height: var(--leading-tight);
		}

		& .close {
			inline-size: 2.75rem;
			block-size: 2.75rem;
			font: inherit;
			font-size: var(--text-2xl);
			line-height: 1;
			color: var(--color-fg);
			background-color: transparent;
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			cursor: pointer;

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .body {
			font-size: var(--text-base);
			line-height: var(--leading-normal);
		}

		& .footer {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			gap: var(--space-sm);
			padding-block-start: var(--space-sm);
			border-block-start: 1px solid var(--color-border);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.backdrop,
		.backdrop .dialog {
			animation: none;
		}
	}
</style>
