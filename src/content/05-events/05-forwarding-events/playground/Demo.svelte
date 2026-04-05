<script lang="ts">
	import LessonButton from './LessonButton.svelte';

	type LogEntry = { readonly id: number; readonly kind: string; readonly source: string };

	let log: LogEntry[] = $state<LogEntry[]>([]);
	let nextId: number = 0;

	function push(kind: string, source: string): void {
		nextId += 1;
		log = [{ id: nextId, kind, source }, ...log].slice(0, 6);
	}

	function handleClick(_e: MouseEvent): void {
		push('click', 'click-btn');
	}
	function handleEnter(_e: PointerEvent): void {
		push('pointerenter', 'hover-btn');
	}
	function handleFocus(_e: FocusEvent): void {
		push('focus', 'focus-btn');
	}
</script>

<section class="forward">
	<div class="buttons">
		<LessonButton label="Click me" onclick={handleClick} />
		<LessonButton label="Hover me" onpointerenter={handleEnter} />
		<LessonButton label="Focus me" onfocus={handleFocus} />
	</div>

	<h4 class="log-title">Event log</h4>
	<ol class="log" aria-live="polite">
		{#each log as entry (entry.id)}
			<li class="entry">
				<code class="kind">{entry.kind}</code>
				<span class="source">from {entry.source}</span>
			</li>
		{:else}
			<li class="empty">Interact with a button above.</li>
		{/each}
	</ol>
</section>

<style>
	.forward {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.log-title {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.log {
		display: grid;
		gap: var(--space-2xs);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.entry {
		display: flex;
		gap: var(--space-sm);
		align-items: baseline;
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
	}

	.kind {
		font-family: var(--font-mono);
		color: var(--color-primary);
	}

	.source {
		color: var(--color-fg-muted);
	}

	.empty {
		padding: var(--space-sm);
		color: var(--color-fg-muted);
		font-size: var(--text-sm);
		font-style: italic;
	}
</style>
