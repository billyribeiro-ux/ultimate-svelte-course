<script lang="ts">
	let on: boolean = $state<boolean>(false);
	const label: string = $derived(on ? 'ON' : 'OFF');

	function toggle(): void {
		on = !on;
	}
</script>

<div class="wrapper">
	<button class="switch" class:on aria-pressed={on} onclick={toggle}>
		<span class="thumb"></span>
		<span class="visually-hidden">Toggle</span>
	</button>
	<p class="label">{label}</p>
</div>

<style>
	.wrapper {
		display: grid;
		gap: var(--space-md);
		justify-items: center;
		padding-block: var(--space-lg);
		padding-inline: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);

		& .switch {
			position: relative;
			inline-size: 4rem;
			block-size: 2.25rem;
			padding: 0;
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-full);
			cursor: pointer;
			transition:
				background-color var(--dur-base) var(--ease-out),
				border-color var(--dur-base) var(--ease-out);

			&.on {
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}

			& .thumb {
				position: absolute;
				inset-block-start: 50%;
				inset-inline-start: 0.25rem;
				inline-size: 1.5rem;
				block-size: 1.5rem;
				background-color: var(--color-bg);
				border-radius: var(--radius-full);
				translate: 0 -50%;
				transition: inset-inline-start var(--dur-base) var(--ease-expressive);
			}

			&.on .thumb {
				inset-inline-start: 2.25rem;
			}
		}

		& .label {
			margin: 0;
			font-size: var(--text-lg);
			font-weight: 600;
			letter-spacing: 0.1em;
			color: var(--color-fg);
			font-variant-numeric: tabular-nums;
		}
	}

	.visually-hidden {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
