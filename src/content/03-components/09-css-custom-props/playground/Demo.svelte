<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section class="grid">
	<Button label="Primary" variant="primary" />
	<Button label="Secondary" variant="secondary" />
	<Button label="Ghost" variant="ghost" />
	<Button label="Danger" variant="danger" />
	<Button label="Disabled" variant="primary" disabled />
</section>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}
</style>
