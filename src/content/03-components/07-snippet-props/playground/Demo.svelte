<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let open: boolean = $state(false);

	function openModal(): void {
		open = true;
	}
</script>

<section class="stack">
	<Button label="Open modal" onclick={openModal} />
	<Modal bind:open title="Welcome">
		<p>
			This content was passed as the implicit <code>children</code> snippet.
			The modal component controls structure (backdrop, dialog, close button),
			while the caller controls what lives inside.
		</p>
		<p>Press Escape or click the backdrop to close.</p>
	</Modal>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
</style>
