<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';

	const colors = ['neutral', 'success', 'warning', 'danger', 'primary'] as const;
	const sizes = ['sm', 'md', 'lg'] as const;
</script>

<section class="stack">
	<div class="row">
		<Badge label="New" />
	</div>
	<div class="matrix">
		{#each colors as color (color)}
			{#each sizes as size (size)}
				<Badge label="{color} {size}" {color} {size} />
			{/each}
			<Badge label="square" {color} rounded={false} />
		{/each}
	</div>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
	.row {
		display: flex;
		gap: var(--space-sm);
	}
	.matrix {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, auto));
		gap: var(--space-sm);
		align-items: center;
		justify-content: start;
	}
</style>
