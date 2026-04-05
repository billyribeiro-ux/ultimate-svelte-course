<script lang="ts">
	interface UserSettings {
		name: string;
		email: string;
		notify: boolean;
		theme: 'light' | 'dark';
	}

	const user = $state<UserSettings>({
		name: '',
		email: '',
		notify: true,
		theme: 'light'
	});

	const greeting: string = $derived(user.name.trim() === '' ? 'stranger' : user.name);
</script>

<section class="panel">
	<form class="form">
		<h3 class="title">Settings</h3>
		<label class="field">
			<span>Name</span>
			<input type="text" bind:value={user.name} placeholder="Your name" />
		</label>
		<label class="field">
			<span>Email</span>
			<input type="email" bind:value={user.email} placeholder="you@example.com" />
		</label>
		<label class="field">
			<span>Theme</span>
			<select bind:value={user.theme}>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</select>
		</label>
		<label class="checkbox">
			<input type="checkbox" bind:checked={user.notify} />
			<span>Send notifications</span>
		</label>
	</form>

	<aside class="preview">
		<h3 class="title">Live preview</h3>
		<p class="hello">Hello, {greeting}</p>
		<dl class="meta">
			<dt>Email</dt>
			<dd>{user.email || '—'}</dd>
			<dt>Theme</dt>
			<dd>{user.theme}</dd>
			<dt>Notifications</dt>
			<dd>{user.notify ? 'On' : 'Off'}</dd>
		</dl>
	</aside>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		@media (min-width: 640px) {
			grid-template-columns: 1fr 1fr;
		}

		& .title {
			margin: 0 0 var(--space-sm);
			font-size: var(--text-lg);
		}

		& .form {
			display: grid;
			gap: var(--space-sm);
		}

		& .field {
			display: grid;
			gap: var(--space-2xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);

			& input,
			& select {
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

		& .checkbox {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			font-size: var(--text-sm);
			color: var(--color-fg);
		}

		& .preview {
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border-radius: var(--radius-md);
		}

		& .hello {
			margin: 0 0 var(--space-sm);
			font-size: var(--text-xl);
			color: var(--color-primary);
		}

		& .meta {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: var(--space-2xs) var(--space-sm);
			margin: 0;
			font-size: var(--text-sm);
		}

		& dt {
			color: var(--color-fg-muted);
		}

		& dd {
			margin: 0;
			color: var(--color-fg);
		}
	}
</style>
