<script lang="ts">
	interface Props {
		value: number;
		label?: string;
	}

	let { value, label }: Props = $props();

	let clamped = $derived(Math.max(0, Math.min(1, value)));
	let percent = $derived(Math.round(clamped * 100));
</script>

<div
	class="bar"
	role="progressbar"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={percent}
	aria-label={label ?? 'Progress'}
>
	<div class="fill" style:inline-size="{percent}%"></div>
</div>

<style>
	.bar {
		inline-size: 100%;
		block-size: 4px;
		background: var(--color-surface-2);
		border-radius: var(--radius-pill);
		overflow: hidden;
	}

	.fill {
		block-size: 100%;
		background: var(--color-accent);
		transition: inline-size var(--dur-m) var(--ease-out);
	}

	@media (prefers-reduced-motion: reduce) {
		.fill {
			transition: none;
		}
	}
</style>
