<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';

	let name: string = $state('');
	const length: number = $derived(name.length);
	const invalid: boolean = $derived(name.length > 0 && name.length < 3);
</script>

<section class="stack">
	<Input
		id="name-input"
		label="Your name"
		placeholder="Type at least 3 characters"
		bind:value={name}
		{invalid}
	/>
	<dl class="stats">
		<div class="stat">
			<dt>Characters</dt>
			<dd>{length}</dd>
		</div>
		<div class="stat">
			<dt>Valid</dt>
			<dd>{length >= 3 ? 'yes' : 'no'}</dd>
		</div>
	</dl>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
		margin: 0;
	}
	.stat {
		display: grid;
		gap: var(--space-2xs);
		padding: var(--space-sm);
		background-color: var(--color-surface-2);
		border-radius: var(--radius-md);
	}
	dt {
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	dd {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--color-primary);
	}
</style>
