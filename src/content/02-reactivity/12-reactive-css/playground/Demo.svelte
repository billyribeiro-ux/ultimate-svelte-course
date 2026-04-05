<script lang="ts">
	let l: number = $state<number>(70);
	let c: number = $state<number>(0.15);
	let h: number = $state<number>(260);

	const css: string = $derived(`oklch(${l}% ${c} ${h})`);
</script>

<section class="mixer">
	<div class="swatch" style:--l="{l}%" style:--c={c} style:--h={h}></div>

	<div class="sliders">
		<label class="slider">
			<span>Lightness <strong>{l}%</strong></span>
			<input type="range" min="0" max="100" step="1" bind:value={l} />
		</label>
		<label class="slider">
			<span>Chroma <strong>{c.toFixed(2)}</strong></span>
			<input type="range" min="0" max="0.4" step="0.01" bind:value={c} />
		</label>
		<label class="slider">
			<span>Hue <strong>{h}°</strong></span>
			<input type="range" min="0" max="360" step="1" bind:value={h} />
		</label>
	</div>

	<pre class="code"><code>{css}</code></pre>
</section>

<style>
	.mixer {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .swatch {
			block-size: clamp(8rem, 25vw, 14rem);
			background: oklch(var(--l) var(--c) var(--h));
			border: 1px solid var(--color-border);
			border-radius: var(--radius-lg);
			transition: background var(--dur-instant) linear;
		}

		& .sliders {
			display: grid;
			gap: var(--space-sm);
		}

		& .slider {
			display: grid;
			gap: var(--space-2xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);

			& strong {
				color: var(--color-fg);
				font-variant-numeric: tabular-nums;
			}

			& input[type='range'] {
				inline-size: 100%;
				accent-color: var(--color-primary);
			}
		}

		& .code {
			margin: 0;
			padding: var(--space-sm);
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}
	}
</style>
