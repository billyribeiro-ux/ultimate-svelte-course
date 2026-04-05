<script lang="ts">
	const THRESHOLD: number = 120;

	let offset: number = $state<number>(0);
	let dragging: boolean = $state<boolean>(false);
	let dismissed: boolean = $state<boolean>(false);
	let startX: number = 0;
	let pointerId: number | null = null;

	function onPointerDown(e: PointerEvent): void {
		if (dismissed) return;
		const target = e.currentTarget;
		if (!(target instanceof HTMLElement)) return;
		dragging = true;
		startX = e.clientX;
		pointerId = e.pointerId;
		target.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent): void {
		if (!dragging) return;
		offset = e.clientX - startX;
	}

	function onPointerUp(e: PointerEvent): void {
		if (!dragging) return;
		dragging = false;
		if (pointerId !== null) {
			const target = e.currentTarget;
			if (target instanceof HTMLElement) {
				try {
					target.releasePointerCapture(pointerId);
				} catch {
					/* already released */
				}
			}
			pointerId = null;
		}
		if (Math.abs(offset) > THRESHOLD) {
			offset = offset > 0 ? 600 : -600;
			dismissed = true;
		} else {
			offset = 0;
		}
	}

	function reset(_e: MouseEvent): void {
		offset = 0;
		dismissed = false;
	}
</script>

<section class="stage">
	<div class="track">
		{#if !dismissed}
			<article
				class="card"
				data-dragging={dragging}
				style:transform="translateX({offset}px) rotate({offset * 0.05}deg)"
				onpointerdown={onPointerDown}
				onpointermove={onPointerMove}
				onpointerup={onPointerUp}
				onpointercancel={onPointerUp}
			>
				<h3 class="title">Swipe me away</h3>
				<p class="body">Drag left or right past the threshold to dismiss. Release early to snap back.</p>
				<p class="meta">Works with mouse, touch, and stylus.</p>
			</article>
		{:else}
			<p class="dismissed">Dismissed. <button type="button" class="reset" onclick={reset}>Bring it back</button></p>
		{/if}
	</div>
</section>

<style>
	.stage {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-lg);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
	}

	.track {
		display: grid;
		place-items: center;
		min-block-size: 14rem;
		overflow: hidden;
	}

	.card {
		display: grid;
		gap: var(--space-sm);
		inline-size: min(90%, 22rem);
		padding: var(--space-lg);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: 0 0.5rem 1.5rem oklch(0% 0 0 / 0.15);
		touch-action: none;
		user-select: none;
		cursor: grab;
		transition: transform var(--dur-base) var(--ease-spring);

		&[data-dragging='true'] {
			cursor: grabbing;
			transition: none;
		}

		@media (hover: hover) {
			&:hover {
				border-color: var(--color-primary);
			}
		}
	}

	.title {
		margin: 0;
		font-size: var(--text-lg);
	}

	.body {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.meta {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
		font-style: italic;
	}

	.dismissed {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	.reset {
		min-block-size: 2.75rem;
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

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}
	}
</style>
