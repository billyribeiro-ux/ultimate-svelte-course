<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
</script>

<Card>
	{#snippet header()}
		<span>Profile</span>
	{/snippet}
	{#snippet body()}
		<p>
			Snippets are named chunks of template you can render somewhere else.
			Card exposes a header and a body region and renders each by name.
		</p>
	{/snippet}
	{#snippet footer()}
		<small>Last updated just now</small>
	{/snippet}
</Card>
