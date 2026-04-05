<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	const variants = ['primary', 'secondary', 'ghost'] as const;
	const sizes = ['sm', 'md', 'lg'] as const;
</script>

<section class="grid">
	{#each sizes as size (size)}
		{#each variants as variant (variant)}
			<Button label="{variant} {size}" {variant} {size} />
		{/each}
	{/each}
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-sm);
		align-items: start;
	}
</style>
