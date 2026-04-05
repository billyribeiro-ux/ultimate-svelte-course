<script lang="ts">
	interface Message {
		id: number;
		text: string;
	}

	const seed: Message[] = Array.from({ length: 8 }, (_, i) => ({
		id: i,
		text: `Welcome message ${i + 1}`
	}));

	const messages = $state<Message[]>(seed);
	let list: HTMLDivElement | undefined = $state();
	let atBottom: boolean = $state(true);
	let nextId: number = seed.length;

	$effect.pre(() => {
		// Read length so this effect tracks message additions.
		messages.length;
		if (!list) return;
		atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 4;
	});

	$effect(() => {
		messages.length;
		if (atBottom && list) {
			list.scrollTop = list.scrollHeight;
		}
	});

	function push(): void {
		nextId += 1;
		messages.push({ id: nextId, text: `New message ${nextId}` });
	}
</script>

<section class="chat">
	<div class="log" bind:this={list}>
		{#each messages as msg (msg.id)}
			<p class="bubble">{msg.text}</p>
		{/each}
	</div>
	<div class="controls">
		<button type="button" class="btn" onclick={push}>Push message</button>
		<span class="status">{atBottom ? 'At bottom — will auto-scroll' : 'Scrolled up — held'}</span>
	</div>
</section>

<style>
	.chat {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .log {
			display: grid;
			gap: var(--space-xs);
			max-block-size: 14rem;
			padding: var(--space-sm);
			overflow-y: auto;
			background-color: var(--color-bg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .bubble {
			margin: 0;
			padding: var(--space-xs) var(--space-sm);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
			font-size: var(--text-sm);
		}

		& .controls {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--space-sm);
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

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .status {
			font-size: var(--text-xs);
			color: var(--color-fg-muted);
		}
	}
</style>
