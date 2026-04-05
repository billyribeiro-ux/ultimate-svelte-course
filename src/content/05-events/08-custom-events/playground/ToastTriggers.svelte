<script lang="ts">
	import type { ToastLevel } from './types';

	interface Props {
		onshow: (message: string, level: ToastLevel) => void;
	}

	let { onshow }: Props = $props();

	function fireInfo(_e: MouseEvent): void {
		onshow('Draft saved just now.', 'info');
	}

	function fireError(_e: MouseEvent): void {
		onshow('Unable to reach the server.', 'error');
	}
</script>

<div class="triggers">
	<button type="button" class="btn info" onclick={fireInfo}>Show info toast</button>
	<button type="button" class="btn error" onclick={fireError}>Show error toast</button>
</div>

<style>
	.triggers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.btn {
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-primary-contrast);
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		cursor: pointer;

		&.info {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
		}

		&.error {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
		}

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}
	}
</style>
