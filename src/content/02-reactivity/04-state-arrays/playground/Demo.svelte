<script lang="ts">
	const tags = $state<string[]>(['svelte', 'typescript', 'oklch']);
	let input: string = $state('');
	let filter: string = $state('');

	const visible: string[] = $derived(
		filter.trim() === ''
			? tags
			: tags.filter((t) => t.toLowerCase().includes(filter.toLowerCase()))
	);

	function add(): void {
		const value = input.trim();
		if (value === '') return;
		if (tags.includes(value)) {
			input = '';
			return;
		}
		tags.push(value);
		input = '';
	}

	function remove(index: number): void {
		tags.splice(index, 1);
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
			add();
		}
	}
</script>

<section class="tags">
	<div class="row">
		<input
			class="input"
			type="text"
			placeholder="Add a tag..."
			bind:value={input}
			onkeydown={onKeydown}
		/>
		<button class="btn" type="button" onclick={add}>Add</button>
	</div>

	<input class="input filter" type="search" placeholder="Filter tags..." bind:value={filter} />

	<ul class="list">
		{#each visible as tag, i (tag)}
			<li class="pill">
				<span>{tag}</span>
				<button
					class="remove"
					type="button"
					aria-label="Remove {tag}"
					onclick={() => remove(tags.indexOf(tag))}
				>
					×
				</button>
			</li>
		{/each}
		{#if visible.length === 0}
			<li class="empty">No tags match.</li>
		{/if}
	</ul>
</section>

<style>
	.tags {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .row {
			display: flex;
			gap: var(--space-xs);
		}

		& .input {
			flex: 1;
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-bg);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .btn {
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			font: inherit;
			font-weight: 600;
			color: var(--color-primary-contrast);
			background-color: var(--color-primary);
			border: 1px solid var(--color-primary);
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: filter var(--dur-fast) var(--ease-out);

			&:hover {
				filter: brightness(1.1);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .list {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-xs);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .pill {
			display: inline-flex;
			align-items: center;
			gap: var(--space-2xs);
			padding-block: var(--space-2xs);
			padding-inline-start: var(--space-sm);
			padding-inline-end: var(--space-2xs);
			font-size: var(--text-sm);
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-full);
			transition:
				background-color var(--dur-fast) var(--ease-out),
				transform var(--dur-fast) var(--ease-expressive);

			&:hover {
				background-color: var(--color-bg);
				transform: translateY(-1px);
			}
		}

		& .remove {
			inline-size: 1.5rem;
			block-size: 1.5rem;
			padding: 0;
			font: inherit;
			font-size: var(--text-base);
			line-height: 1;
			color: var(--color-fg-muted);
			background-color: transparent;
			border: none;
			border-radius: var(--radius-full);
			cursor: pointer;

			&:hover {
				color: var(--color-danger);
			}
		}

		& .empty {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}
	}
</style>
