<script lang="ts">
	type Strength = 'weak' | 'medium' | 'strong';

	let password: string = $state('');

	const hasDigit = $derived(/\d/.test(password));
	const hasUpper = $derived(/[A-Z]/.test(password));
	const hasSymbol = $derived(/[^A-Za-z0-9]/.test(password));

	const score = $derived(
		password.length * 6 +
			(hasDigit ? 15 : 0) +
			(hasUpper ? 15 : 0) +
			(hasSymbol ? 20 : 0)
	);

	const strength = $derived<Strength>(
		score < 40 ? 'weak' : score < 75 ? 'medium' : 'strong'
	);
</script>

<section class="demo">
	<label class="field">
		<span class="label">Password</span>
		<input
			class="input"
			type="password"
			bind:value={password}
			placeholder="Try: hunter2, Tr0ub4dor, correct-horse-battery-staple!"
			autocomplete="new-password"
		/>
	</label>

	{#if password === ''}
		<p class="hint">Start typing to see a strength rating.</p>
	{:else if strength === 'weak'}
		<p class="result" data-strength="weak">
			<span class="dot"></span>Weak — add length, digits, and symbols
		</p>
	{:else if strength === 'medium'}
		<p class="result" data-strength="medium">
			<span class="dot"></span>Medium — getting there
		</p>
	{:else}
		<p class="result" data-strength="strong">
			<span class="dot"></span>Strong — nice work
		</p>
	{/if}
</section>

<style>
	.demo {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
		font-family: var(--font-sans);

		& .field {
			display: grid;
			gap: var(--space-2xs);
		}

		& .label {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .input {
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-bg);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .hint {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .result {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			margin: 0;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
			font-size: var(--text-sm);

			&[data-strength='weak'] {
				color: var(--color-danger);
			}

			&[data-strength='medium'] {
				color: var(--color-warning);
			}

			&[data-strength='strong'] {
				color: var(--color-success);
			}
		}

		& .dot {
			inline-size: 0.625rem;
			block-size: 0.625rem;
			border-radius: var(--radius-full);
			background-color: currentcolor;
		}
	}
</style>
