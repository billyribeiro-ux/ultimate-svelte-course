<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
</script>

<section class="row">
	<Avatar src="https://placehold.co/128x128/png?text=32" alt="Small avatar" size={32} />
	<Avatar src="https://placehold.co/128x128/png?text=64" alt="Medium avatar" size={64} />
	<Avatar src="https://placehold.co/128x128/png?text=128" alt="Large avatar" size={128} />
	<Avatar src="https://placehold.co/128x128/png?text=def" alt="Default avatar" />
</section>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md);
	}
</style>
