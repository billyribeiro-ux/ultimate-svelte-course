<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		label?: string;
		id?: string;
		type?: 'text' | 'email' | 'password' | 'search' | 'url';
		invalid?: boolean;
		disabled?: boolean;
		oninput?: (event: Event) => void;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		label,
		id,
		type = 'text',
		invalid = false,
		disabled = false,
		oninput
	}: Props = $props();
</script>

<div class="field">
	{#if label}
		<label class="label" for={id}>{label}</label>
	{/if}
	<input
		class="input"
		{id}
		{type}
		{placeholder}
		{disabled}
		data-invalid={invalid}
		bind:value
		{oninput}
	/>
</div>

<style>
	.field {
		display: grid;
		gap: var(--space-2xs);

		& .label {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .input {
			font: inherit;
			inline-size: 100%;
			min-block-size: 2.75rem;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			color: var(--color-fg);
			background-color: var(--color-bg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			transition: border-color var(--dur-fast) var(--ease-out);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.55;
			}

			&[data-invalid='true'] {
				border-color: var(--color-danger);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.field .input {
			transition: none;
		}
	}
</style>
