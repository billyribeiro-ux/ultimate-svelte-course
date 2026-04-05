<script lang="ts">
	type Command = {
		readonly id: string;
		readonly label: string;
		readonly combo: readonly string[];
		readonly key: string;
	};

	const commands: readonly Command[] = [
		{ id: 'palette', label: 'Open command palette', combo: ['Ctrl', 'K'], key: 'k' },
		{ id: 'save', label: 'Save document', combo: ['Ctrl', 'S'], key: 's' },
		{ id: 'find', label: 'Find in document', combo: ['Ctrl', 'F'], key: 'f' },
		{ id: 'new', label: 'New document', combo: ['Ctrl', 'N'], key: 'n' }
	] as const;

	let lastShortcut: string = $state<string>('(press a shortcut)');
	let matchedId: string | null = $state<string | null>(null);
	let pulse: number = $state<number>(0);

	function formatCombo(e: KeyboardEvent): string {
		const parts: string[] = [];
		if (e.ctrlKey) parts.push('Ctrl');
		if (e.metaKey) parts.push('Meta');
		if (e.altKey) parts.push('Alt');
		if (e.shiftKey) parts.push('Shift');
		parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
		return parts.join('+');
	}

	$effect(() => {
		function onKeydown(e: KeyboardEvent): void {
			const modifier: boolean = e.ctrlKey || e.metaKey;
			if (!modifier) return;
			const match: Command | undefined = commands.find((c) => c.key === e.key.toLowerCase());
			if (match === undefined) return;
			e.preventDefault();
			lastShortcut = formatCombo(e);
			matchedId = match.id;
			pulse += 1;
		}

		window.addEventListener('keydown', onKeydown);
		return () => {
			window.removeEventListener('keydown', onKeydown);
		};
	});
</script>

<section class="shortcuts">
	<header class="header">
		<h3 class="title">Keyboard shortcut detector</h3>
		<p class="hint">Press any listed combo anywhere on the page.</p>
	</header>

	<p class="display" aria-live="polite">
		Last: <strong class="combo">{lastShortcut}</strong>
	</p>

	<ul class="list">
		{#each commands as cmd (cmd.id)}
			<li class="row" data-matched={matchedId === cmd.id ? 'true' : 'false'}>
				{#key matchedId === cmd.id ? pulse : 0}
					<span class="label">{cmd.label}</span>
				{/key}
				<span class="keys">
					{#each cmd.combo as k, i (i)}
						<kbd>{k}</kbd>
					{/each}
				</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.shortcuts {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.header {
		display: grid;
		gap: var(--space-2xs);
	}

	.title {
		margin: 0;
		font-size: var(--text-base);
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.display {
		margin: 0;
		padding: var(--space-sm);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}

	.combo {
		font-family: var(--font-mono);
		color: var(--color-primary);
	}

	.list {
		display: grid;
		gap: var(--space-xs);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: border-color var(--dur-fast) var(--ease-out);

		&[data-matched='true'] {
			border-color: var(--color-primary);
		}
	}

	.label {
		font-size: var(--text-sm);
	}

	.keys {
		display: inline-flex;
		gap: var(--space-2xs);
	}

	kbd {
		display: inline-block;
		min-inline-size: 1.75rem;
		padding-block: 0.125rem;
		padding-inline: var(--space-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		box-shadow: inset 0 -1px 0 var(--color-border);
		text-align: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.row {
			transition: none;
		}
	}
</style>
