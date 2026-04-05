<script lang="ts">
	import { debounce } from './debounce';

	const CATALOG: readonly string[] = [
		'Svelte 5 runes',
		'SvelteKit routing',
		'TypeScript generics',
		'OKLCH colors',
		'Container queries',
		'Logical properties',
		'Pointer events',
		'Keyboard accessibility',
		'Debounce and throttle',
		'Custom select patterns'
	] as const;

	let query: string = $state<string>('');
	let results: readonly string[] = $state<readonly string[]>([]);
	let loading: boolean = $state<boolean>(false);
	let keystrokes: number = $state<number>(0);
	let fetches: number = $state<number>(0);

	async function mockFetch(q: string): Promise<readonly string[]> {
		await new Promise<void>((resolve) => setTimeout(resolve, 200));
		if (q.trim() === '') return [];
		const lower: string = q.toLowerCase();
		return CATALOG.filter((item) => item.toLowerCase().includes(lower));
	}

	const runSearch = debounce((q: string): void => {
		fetches += 1;
		loading = true;
		mockFetch(q)
			.then((items) => {
				results = items;
			})
			.finally(() => {
				loading = false;
			});
	}, 300);

	function onInput(e: InputEvent): void {
		const target = e.currentTarget;
		if (!(target instanceof HTMLInputElement)) return;
		query = target.value;
		keystrokes += 1;
		runSearch(query);
	}

	$effect(() => {
		return () => {
			runSearch.cancel();
		};
	});
</script>

<section class="search">
	<label class="label" for="search-input">Search topics</label>
	<div class="input-wrap">
		<input
			id="search-input"
			class="input"
			type="search"
			placeholder="Try 'svelte' or 'color'..."
			value={query}
			oninput={onInput}
		/>
		{#if loading}
			<span class="spinner" aria-hidden="true"></span>
		{/if}
	</div>

	<dl class="stats">
		<div class="stat">
			<dt>Keystrokes</dt>
			<dd>{keystrokes}</dd>
		</div>
		<div class="stat">
			<dt>Fetches</dt>
			<dd>{fetches}</dd>
		</div>
	</dl>

	<ul class="results" aria-live="polite">
		{#each results as item, i (i)}
			<li>{item}</li>
		{:else}
			<li class="empty">
				{query.trim() === '' ? 'Start typing to search.' : 'No matches.'}
			</li>
		{/each}
	</ul>
</section>

<style>
	.search {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.label {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.input-wrap {
		position: relative;
	}

	.input {
		inline-size: 100%;
		min-block-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		padding-inline-end: calc(var(--space-md) + 1.5rem);
		font: inherit;
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}
	}

	.spinner {
		position: absolute;
		inset-inline-end: var(--space-sm);
		inset-block-start: 50%;
		inline-size: 1rem;
		block-size: 1rem;
		border: 2px solid var(--color-border);
		border-block-start-color: var(--color-primary);
		border-radius: var(--radius-full);
		transform: translateY(-50%);
		animation: spin var(--dur-slow) linear infinite;
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
		margin: 0;
	}

	.stat {
		display: grid;
		gap: var(--space-2xs);
		padding: var(--space-sm);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.stat dt {
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat dd {
		margin: 0;
		font-size: var(--text-2xl);
		font-variant-numeric: tabular-nums;
		color: var(--color-primary);
	}

	.results {
		display: grid;
		gap: var(--space-2xs);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.results li {
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
	}

	.empty {
		color: var(--color-fg-muted);
		font-style: italic;
	}

	@keyframes spin {
		to {
			transform: translateY(-50%) rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation-duration: 2s;
		}
	}
</style>
