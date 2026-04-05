<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		name: `ph:${string}` | `carbon:${string}`;
		size?: number | string;
		label?: string;
	}

	let { name, size = '1.25em', label }: Props = $props();
</script>

{#if label}
	<span class="icon" role="img" aria-label={label}>
		<Icon icon={name} width={size} height={size} />
	</span>
{:else}
	<span class="icon" aria-hidden="true">
		<Icon icon={name} width={size} height={size} />
	</span>
{/if}

<style>
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		color: currentColor;
	}
</style>
