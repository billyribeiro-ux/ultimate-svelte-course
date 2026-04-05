<script lang="ts">
	import Notification from '$lib/components/ui/Notification.svelte';

	const ada = {
		name: 'Ada Lovelace',
		avatarUrl: 'https://placehold.co/96x96/png?text=AL'
	};
	const grace = {
		name: 'Grace Hopper',
		avatarUrl: 'https://placehold.co/96x96/png?text=GH'
	};
	const linus = {
		name: 'Linus Torvalds',
		avatarUrl: 'https://placehold.co/96x96/png?text=LT'
	};
</script>

<section class="stack">
	<Notification user={ada} level="info" title="mentioned you" aria-live="polite">
		Ada tagged you in <em>Analytical Engine Notes</em>.
	</Notification>
	<Notification user={grace} level="success" title="merged your PR">
		Compiler benchmarks now run in under a second.
	</Notification>
	<Notification user={linus} level="warning" title="requested changes">
		Please rebase onto <code>main</code> before merging.
	</Notification>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
</style>
