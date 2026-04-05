<script lang="ts">
	import { items, type Item } from './fixtures';

	const PAGE_SIZE = 5;

	let query: string = $state('');
	let page: number = $state(0);
	let sortDir: 'asc' | 'desc' = $state<'asc' | 'desc'>('desc');

	interface Results {
		rows: readonly Item[];
		totalPages: number;
		totalMatches: number;
	}

	const results: Results = $derived.by<Results>(() => {
		const q = query.trim().toLowerCase();
		const filtered: Item[] = items.filter((i) => i.name.toLowerCase().includes(q));
		const sorted: Item[] = [...filtered].sort((a, b) =>
			sortDir === 'desc' ? b.score - a.score : a.score - b.score
		);
		const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
		const safePage = Math.min(page, totalPages - 1);
		const start = safePage * PAGE_SIZE;
		return {
			rows: sorted.slice(start, start + PAGE_SIZE),
			totalPages,
			totalMatches: sorted.length
		};
	});

	function prev(): void {
		if (page > 0) page -= 1;
	}

	function next(): void {
		if (page < results.totalPages - 1) page += 1;
	}

	function toggleSort(): void {
		sortDir = sortDir === 'desc' ? 'asc' : 'desc';
	}
</script>

<section class="search">
	<div class="toolbar">
		<input
			class="input"
			type="search"
			placeholder="Search items..."
			bind:value={query}
			oninput={() => (page = 0)}
		/>
		<button type="button" class="btn" onclick={toggleSort}>
			Score {sortDir === 'desc' ? '↓' : '↑'}
		</button>
	</div>

	<p class="summary">{results.totalMatches} matches</p>

	<ul class="list">
		{#each results.rows as row (row.id)}
			<li class="row">
				<span class="name">{row.name}</span>
				<span class="score">{row.score}</span>
			</li>
		{/each}
		{#if results.rows.length === 0}
			<li class="empty">No results.</li>
		{/if}
	</ul>

	<nav class="pager">
		<button type="button" class="btn" onclick={prev} disabled={page === 0}>Prev</button>
		<span>Page {page + 1} / {results.totalPages}</span>
		<button type="button" class="btn" onclick={next} disabled={page >= results.totalPages - 1}>
			Next
		</button>
	</nav>
</section>

<style>
	.search {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .toolbar {
			display: flex;
			gap: var(--space-xs);
		}

		& .input {
			flex: 1;
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			color: var(--color-fg);
			background-color: var(--color-bg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .btn {
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			font: inherit;
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			cursor: pointer;

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .summary {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .list {
			display: grid;
			gap: var(--space-2xs);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .row {
			display: flex;
			justify-content: space-between;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
			font-variant-numeric: tabular-nums;
		}

		& .score {
			color: var(--color-primary);
			font-weight: 600;
		}

		& .empty {
			padding: var(--space-sm);
			text-align: center;
			color: var(--color-fg-muted);
		}

		& .pager {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-sm);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}
	}
</style>
