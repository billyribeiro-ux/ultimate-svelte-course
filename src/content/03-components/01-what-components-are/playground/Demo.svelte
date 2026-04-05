<script lang="ts">
	import ProfileCard from '$lib/components/ui/ProfileCard.svelte';
</script>

<section class="stack">
	<ProfileCard
		name="Ada Lovelace"
		role="Analytical engineer"
		bio="Wrote the first algorithm meant to be executed by a machine."
		avatarUrl="https://placehold.co/128x128/png?text=AL"
		links={[
			{ label: 'Notes', href: '#notes' },
			{ label: 'Letters', href: '#letters' }
		]}
	/>
	<ProfileCard
		name="Grace Hopper"
		role="Compiler pioneer"
		bio="Invented the first compiler and popularised machine-independent languages."
		avatarUrl="https://placehold.co/128x128/png?text=GH"
	/>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
</style>
