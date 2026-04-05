<script lang="ts">
	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		label: string;
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
	}

	const {
		label,
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		onclick
	}: Props = $props();
</script>

<button
	class="btn"
	data-variant={variant}
	data-size={size}
	{type}
	{disabled}
	{onclick}
>
	{label}
</button>

<style>
	.btn {
		/* Default variant knobs (overridden by data-variant below). */
		--btn-bg: var(--color-primary);
		--btn-fg: var(--color-primary-contrast);
		--btn-border: transparent;
		--btn-bg-hover: color-mix(in oklch, var(--btn-bg) 85%, black);
		--btn-pad-block: var(--space-xs);
		--btn-pad-inline: var(--space-md);
		--btn-font: var(--text-base);

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2xs);
		min-block-size: 2.75rem;
		padding-block: var(--btn-pad-block);
		padding-inline: var(--btn-pad-inline);
		font: inherit;
		font-size: var(--btn-font);
		font-weight: 600;
		line-height: var(--leading-tight);
		color: var(--btn-fg);
		background-color: var(--btn-bg);
		border: 1px solid var(--btn-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.55;
		}

		&[data-variant='primary'] {
			--btn-bg: var(--color-primary);
			--btn-fg: var(--color-primary-contrast);
			--btn-border: transparent;
		}

		&[data-variant='secondary'] {
			--btn-bg: var(--color-surface-2);
			--btn-fg: var(--color-fg);
			--btn-border: var(--color-border);
		}

		&[data-variant='ghost'] {
			--btn-bg: transparent;
			--btn-fg: var(--color-fg);
			--btn-border: transparent;
		}

		&[data-variant='danger'] {
			--btn-bg: var(--color-danger);
			--btn-fg: var(--color-primary-contrast);
			--btn-border: transparent;
		}

		&[data-size='sm'] {
			--btn-pad-block: var(--space-2xs);
			--btn-pad-inline: var(--space-sm);
			--btn-font: var(--text-sm);
		}

		&[data-size='md'] {
			--btn-pad-block: var(--space-xs);
			--btn-pad-inline: var(--space-md);
			--btn-font: var(--text-base);
		}

		&[data-size='lg'] {
			--btn-pad-block: var(--space-sm);
			--btn-pad-inline: var(--space-lg);
			--btn-font: var(--text-lg);
		}
	}

	@media (hover: hover) {
		.btn:hover:not(:disabled) {
			background-color: var(--btn-bg-hover);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
	}
</style>
