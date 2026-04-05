<script lang="ts">
	type LikeState = { count: number; pulse: number };

	let alpha: LikeState = $state<LikeState>({ count: 0, pulse: 0 });
	let beta: LikeState = $state<LikeState>({ count: 0, pulse: 0 });

	function likeAlpha(_e: MouseEvent): void {
		alpha.count += 1;
		alpha.pulse += 1;
	}

	function likeBeta(_e: MouseEvent): void {
		beta.count += 1;
		beta.pulse += 1;
	}
</script>

<section class="likes">
	<article class="card">
		<h3 class="title">Sunset over the fjord</h3>
		<button type="button" class="like" aria-pressed={alpha.count > 0} onclick={likeAlpha}>
			{#key alpha.pulse}
				<span class="heart" aria-hidden="true">&#9829;</span>
			{/key}
			<span class="count">{alpha.count}</span>
			<span class="sr">likes</span>
		</button>
	</article>

	<article class="card">
		<h3 class="title">Midnight city lights</h3>
		<button type="button" class="like" aria-pressed={beta.count > 0} onclick={likeBeta}>
			{#key beta.pulse}
				<span class="heart" aria-hidden="true">&#9829;</span>
			{/key}
			<span class="count">{beta.count}</span>
			<span class="sr">likes</span>
		</button>
	</article>
</section>

<style>
	.likes {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		@media (min-width: 32rem) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.card {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.title {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-fg);
	}

	.like {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		min-block-size: 2.75rem;
		min-inline-size: 2.75rem;
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		font: inherit;
		font-weight: 600;
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);

		&:focus-visible {
			outline: 2px solid var(--color-focus);
			outline-offset: 2px;
		}

		&[aria-pressed='true'] {
			border-color: var(--color-danger);
			color: var(--color-danger);
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-surface);
			}
		}
	}

	.heart {
		display: inline-block;
		font-size: var(--text-lg);
		line-height: 1;
		animation: pop var(--dur-base) var(--ease-expressive);
	}

	.count {
		font-variant-numeric: tabular-nums;
	}

	.sr {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.heart {
			animation: none;
		}
		.like {
			transition: none;
		}
	}
</style>
