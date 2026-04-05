<script lang="ts">
	type Action = 'new' | 'save' | 'copy' | 'paste' | 'clear';

	let lastAction: Action | null = $state<Action | null>(null);
	let pulse: number = $state<number>(0);

	function record(action: Action): void {
		lastAction = action;
		pulse += 1;
	}

	function onNew(_e: MouseEvent): void {
		record('new');
	}
	function onSave(_e: MouseEvent): void {
		record('save');
	}
	function onCopy(_e: MouseEvent): void {
		record('copy');
	}
	function onPaste(_e: MouseEvent): void {
		record('paste');
	}
	function onClear(_e: MouseEvent): void {
		record('clear');
	}

	const labels: Record<Action, string> = {
		new: 'New document',
		save: 'Saved',
		copy: 'Copied to clipboard',
		paste: 'Pasted',
		clear: 'Cleared'
	};

	const statusText: string = $derived(
		lastAction === null ? 'Ready' : (labels[lastAction] ?? 'Ready')
	);
</script>

<section class="toolbar-shell">
	<div class="toolbar" role="toolbar" aria-label="Document actions">
		<button type="button" class="btn" onclick={onNew}>New</button>
		<button type="button" class="btn" onclick={onSave}>Save</button>
		<button type="button" class="btn" onclick={onCopy}>Copy</button>
		<button type="button" class="btn" onclick={onPaste}>Paste</button>
		<button type="button" class="btn danger" onclick={onClear}>Clear</button>
	</div>

	<p class="status" aria-live="polite">
		{#key pulse}
			<span class="status-text">{statusText}</span>
		{/key}
	</p>
</section>

<style>
	.toolbar-shell {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.btn {
		min-block-size: 2.75rem;
		min-inline-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-fg);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}

		&.danger {
			color: var(--color-danger);
			border-color: var(--color-danger);
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-bg);
			}
		}
	}

	.status {
		margin: 0;
		padding-block: var(--space-sm);
		padding-inline: var(--space-md);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.status-text {
		display: inline-block;
		color: var(--color-primary);
		font-weight: 600;
		animation: slide-in var(--dur-base) var(--ease-out);
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(0.25rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
		.status-text {
			animation: none;
		}
	}
</style>
