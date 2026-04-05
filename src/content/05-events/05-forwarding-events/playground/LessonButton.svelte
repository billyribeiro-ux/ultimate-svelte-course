<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		label: string;
	}

	let { label, ...rest }: Props = $props();
</script>

<button type="button" class="lesson-btn" {...rest}>{label}</button>

<style>
	.lesson-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		min-block-size: 2.75rem;
		min-inline-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-primary-contrast);
		background-color: var(--color-primary);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-accent);
				border-color: var(--color-accent);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lesson-btn {
			transition: none;
		}
	}
</style>
