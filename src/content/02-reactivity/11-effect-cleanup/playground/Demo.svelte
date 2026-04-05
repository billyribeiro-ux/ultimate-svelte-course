<script lang="ts">
	const START_SECONDS = 60;

	let seconds: number = $state<number>(START_SECONDS);
	let running: boolean = $state<boolean>(false);

	$effect(() => {
		if (!running) return;
		const id: number = window.setInterval(() => {
			seconds -= 1;
			if (seconds <= 0) {
				seconds = 0;
				running = false;
			}
		}, 1000);
		return () => {
			window.clearInterval(id);
		};
	});

	function start(): void {
		if (seconds === 0) seconds = START_SECONDS;
		running = true;
	}

	function pause(): void {
		running = false;
	}

	function reset(): void {
		running = false;
		seconds = START_SECONDS;
	}

	const display: string = $derived(String(seconds).padStart(2, '0'));
</script>

<section class="timer">
	<p class="display" aria-live="polite">{display}</p>
	<div class="controls">
		{#if running}
			<button type="button" class="btn" onclick={pause}>Pause</button>
		{:else}
			<button type="button" class="btn primary" onclick={start}>Start</button>
		{/if}
		<button type="button" class="btn" onclick={reset}>Reset</button>
	</div>
</section>

<style>
	.timer {
		display: grid;
		gap: var(--space-md);
		justify-items: center;
		padding: var(--space-lg);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .display {
			margin: 0;
			font-size: var(--text-hero);
			font-weight: 700;
			font-variant-numeric: tabular-nums;
			color: var(--color-primary);
			transition: color var(--dur-fast) var(--ease-out);
		}

		& .controls {
			display: flex;
			gap: var(--space-sm);
		}

		& .btn {
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			font: inherit;
			font-weight: 600;
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			cursor: pointer;

			&.primary {
				color: var(--color-primary-contrast);
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}
	}
</style>
