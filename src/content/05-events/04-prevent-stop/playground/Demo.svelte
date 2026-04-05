<script lang="ts">
	let open: boolean = $state<boolean>(false);
	let notifications: boolean = $state<boolean>(true);
	let darkMode: boolean = $state<boolean>(false);
	let autoSave: boolean = $state<boolean>(true);

	function toggleOpen(e: MouseEvent): void {
		e.stopPropagation();
		open = !open;
	}

	function onPanelClick(e: MouseEvent): void {
		// Keep the panel open regardless of what was clicked inside it.
		e.stopPropagation();
	}

	function onPanelKeydown(e: KeyboardEvent): void {
		// Mirror stopPropagation for keyboard activation inside the panel.
		e.stopPropagation();
	}

	$effect(() => {
		function onDocClick(_e: MouseEvent): void {
			open = false;
		}
		document.addEventListener('click', onDocClick);
		return () => {
			document.removeEventListener('click', onDocClick);
		};
	});
</script>

<section class="wrapper">
	<div class="menu">
		<button
			type="button"
			class="trigger"
			aria-haspopup="menu"
			aria-expanded={open}
			onclick={toggleOpen}
		>
			Settings
			<span class="chevron" aria-hidden="true">{open ? '▲' : '▼'}</span>
		</button>

		{#if open}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div class="panel" role="group" aria-label="Settings" onclick={onPanelClick} onkeydown={onPanelKeydown}>
				<label class="row">
					<input type="checkbox" bind:checked={notifications} />
					<span>Enable notifications</span>
				</label>
				<label class="row">
					<input type="checkbox" bind:checked={darkMode} />
					<span>Dark mode</span>
				</label>
				<label class="row">
					<input type="checkbox" bind:checked={autoSave} />
					<span>Auto-save drafts</span>
				</label>
			</div>
		{/if}
	</div>

	<p class="hint">Click outside the menu to close. Toggling a checkbox keeps it open.</p>
</section>

<style>
	.wrapper {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.menu {
		position: relative;
		inline-size: fit-content;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-primary-contrast);
		background-color: var(--color-primary);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-md);
		cursor: pointer;

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}
	}

	.chevron {
		font-size: var(--text-xs);
	}

	.panel {
		position: absolute;
		inset-block-start: calc(100% + var(--space-2xs));
		inset-inline-start: 0;
		display: grid;
		gap: var(--space-2xs);
		min-inline-size: 14rem;
		padding: var(--space-sm);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 0.5rem 1.5rem oklch(0% 0 0 / 0.15);
		animation: scale-in var(--dur-fast) var(--ease-out);
		z-index: 1;
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		cursor: pointer;

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-surface);
			}
		}
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	@keyframes scale-in {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.panel {
			animation: none;
		}
	}
</style>
