<script lang="ts">
	import LessonSelect, { type SelectOption } from './LessonSelect.svelte';

	const countries: readonly SelectOption[] = [
		{ value: 'no', label: 'Norway' },
		{ value: 'se', label: 'Sweden' },
		{ value: 'dk', label: 'Denmark' },
		{ value: 'fi', label: 'Finland' },
		{ value: 'is', label: 'Iceland' },
		{ value: 'de', label: 'Germany' }
	] as const;

	let country: string = $state<string>('no');

	function onCountryChange(next: string): void {
		country = next;
	}
</script>

<section class="panel">
	<LessonSelect
		id="country"
		label="Country"
		options={countries}
		value={country}
		onchange={onCountryChange}
	/>

	<p class="summary" aria-live="polite">
		Selected: <strong>{country}</strong>
	</p>

	<ul class="keys">
		<li><kbd>Tab</kbd> focus the trigger</li>
		<li><kbd>Enter</kbd> / <kbd>Space</kbd> / <kbd>↓</kbd> open the listbox</li>
		<li><kbd>↑</kbd> / <kbd>↓</kbd> / <kbd>Home</kbd> / <kbd>End</kbd> move highlight</li>
		<li><kbd>Enter</kbd> commit selection</li>
		<li><kbd>Esc</kbd> close and return focus</li>
	</ul>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.summary {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.keys {
		display: grid;
		gap: var(--space-2xs);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	kbd {
		display: inline-block;
		min-inline-size: 1.5rem;
		padding-block: 0.125rem;
		padding-inline: var(--space-2xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		text-align: center;
	}
</style>
