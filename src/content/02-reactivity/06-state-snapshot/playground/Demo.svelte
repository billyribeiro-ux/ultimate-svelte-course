<script lang="ts">
	interface FormState {
		name: string;
		email: string;
		tags: string[];
	}

	const form = $state<FormState>({
		name: '',
		email: '',
		tags: []
	});

	let tagInput: string = $state('');
	let output: string = $state('');

	function addTag(): void {
		const value = tagInput.trim();
		if (value === '') return;
		form.tags.push(value);
		tagInput = '';
	}

	function submit(): void {
		const plain: FormState = $state.snapshot(form);
		output = JSON.stringify(plain, null, 2);
		console.log('raw reactive form:', form);
		console.log('snapshot:', plain);
	}
</script>

<section class="wrap">
	<form
		class="form"
		onsubmit={(event) => {
			event.preventDefault();
			submit();
		}}
	>
		<label class="field">
			<span>Name</span>
			<input type="text" bind:value={form.name} />
		</label>
		<label class="field">
			<span>Email</span>
			<input type="email" bind:value={form.email} />
		</label>

		<div class="field">
			<span>Tags</span>
			<div class="tag-row">
				<input
					type="text"
					bind:value={tagInput}
					onkeydown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							addTag();
						}
					}}
				/>
				<button type="button" class="btn secondary" onclick={addTag}>Add</button>
			</div>
			<ul class="tags">
				{#each form.tags as tag (tag)}
					<li>{tag}</li>
				{/each}
			</ul>
		</div>

		<button type="submit" class="btn">Snapshot & log</button>
	</form>

	{#if output !== ''}
		<pre class="output"><code>{output}</code></pre>
	{/if}
</section>

<style>
	.wrap {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .form {
			display: grid;
			gap: var(--space-sm);
		}

		& .field {
			display: grid;
			gap: var(--space-2xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);

			& input {
				font: inherit;
				padding-block: var(--space-xs);
				padding-inline: var(--space-sm);
				color: var(--color-fg);
				background-color: var(--color-bg);
				border: 1px solid var(--color-border);
				border-radius: var(--radius-md);

				&:focus-visible {
					outline: 2px solid var(--color-focus);
					outline-offset: 2px;
				}
			}
		}

		& .tag-row {
			display: flex;
			gap: var(--space-xs);

			& input {
				flex: 1;
				font: inherit;
				padding-block: var(--space-xs);
				padding-inline: var(--space-sm);
				color: var(--color-fg);
				background-color: var(--color-bg);
				border: 1px solid var(--color-border);
				border-radius: var(--radius-md);
			}
		}

		& .tags {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-2xs);
			margin: 0;
			padding: 0;
			list-style: none;

			& li {
				padding-block: var(--space-2xs);
				padding-inline: var(--space-sm);
				font-size: var(--text-xs);
				color: var(--color-fg);
				background-color: var(--color-surface-2);
				border-radius: var(--radius-full);
			}
		}

		& .btn {
			justify-self: start;
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			font: inherit;
			font-weight: 600;
			color: var(--color-primary-contrast);
			background-color: var(--color-primary);
			border: 1px solid var(--color-primary);
			border-radius: var(--radius-md);
			cursor: pointer;

			&.secondary {
				color: var(--color-fg);
				background-color: var(--color-surface-2);
				border-color: var(--color-border);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .output {
			margin: 0;
			padding: var(--space-sm);
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			overflow: auto;
		}
	}
</style>
