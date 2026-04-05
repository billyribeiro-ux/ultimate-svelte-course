<script lang="ts">
	export interface SelectOption {
		readonly value: string;
		readonly label: string;
	}

	interface Props {
		id: string;
		label: string;
		options: readonly SelectOption[];
		value: string;
		onchange: (value: string) => void;
	}

	let { id, label, options, value, onchange }: Props = $props();

	let open: boolean = $state<boolean>(false);
	let highlight: number = $state<number>(0);
	let triggerEl: HTMLButtonElement | null = $state<HTMLButtonElement | null>(null);

	const selectedLabel: string = $derived(
		options.find((o) => o.value === value)?.label ?? 'Select an option'
	);

	const listId: string = `${id}-listbox`;
	const optionId = (i: number): string => `${id}-option-${i}`;

	function openMenu(): void {
		const selectedIdx: number = options.findIndex((o) => o.value === value);
		highlight = selectedIdx >= 0 ? selectedIdx : 0;
		open = true;
	}

	function closeMenu(): void {
		open = false;
	}

	function commit(index: number): void {
		const choice: SelectOption | undefined = options[index];
		if (choice === undefined) return;
		onchange(choice.value);
		closeMenu();
		triggerEl?.focus();
	}

	function onTriggerKeydown(e: KeyboardEvent): void {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openMenu();
		}
	}

	function onListKeydown(e: KeyboardEvent): void {
		if (!open) return;
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				highlight = (highlight + 1) % options.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				highlight = (highlight - 1 + options.length) % options.length;
				break;
			case 'Home':
				e.preventDefault();
				highlight = 0;
				break;
			case 'End':
				e.preventDefault();
				highlight = options.length - 1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				commit(highlight);
				break;
			case 'Escape':
				e.preventDefault();
				closeMenu();
				triggerEl?.focus();
				break;
			case 'Tab':
				closeMenu();
				break;
		}
	}

	function onOptionClick(index: number, e: MouseEvent): void {
		e.preventDefault();
		commit(index);
	}
</script>

<div class="select">
	<label class="label" for={id}>{label}</label>
	<button
		bind:this={triggerEl}
		{id}
		type="button"
		class="trigger"
		role="combobox"
		aria-expanded={open}
		aria-controls={listId}
		aria-haspopup="listbox"
		aria-activedescendant={open ? optionId(highlight) : undefined}
		onclick={() => (open ? closeMenu() : openMenu())}
		onkeydown={(e) => (open ? onListKeydown(e) : onTriggerKeydown(e))}
	>
		<span class="value">{selectedLabel}</span>
		<span class="caret" aria-hidden="true">{open ? '▲' : '▼'}</span>
	</button>

	{#if open}
		<ul class="listbox" id={listId} role="listbox" aria-label={label}>
			{#each options as option, i (option.value)}
				<li
					class="option"
					id={optionId(i)}
					role="option"
					aria-selected={option.value === value}
					data-highlighted={i === highlight}
					onclick={(e) => onOptionClick(i, e)}
					onmouseenter={() => (highlight = i)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.select {
		position: relative;
		display: grid;
		gap: var(--space-2xs);
		inline-size: min(100%, 20rem);
	}

	.label {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		text-align: start;

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}
	}

	.value {
		flex: 1;
	}

	.caret {
		color: var(--color-fg-muted);
		font-size: var(--text-xs);
	}

	.listbox {
		position: absolute;
		inset-block-start: calc(100% + var(--space-2xs));
		inset-inline-start: 0;
		inline-size: 100%;
		max-block-size: 16rem;
		overflow-y: auto;
		margin: 0;
		padding: var(--space-2xs);
		list-style: none;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 0.5rem 1.5rem oklch(0% 0 0 / 0.2);
		z-index: 10;
	}

	.option {
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-fg);
		cursor: pointer;
		display: flex;
		align-items: center;

		&[data-highlighted='true'] {
			background-color: var(--color-primary);
			color: var(--color-primary-contrast);
		}

		&[aria-selected='true'] {
			font-weight: 600;
		}
	}
</style>
