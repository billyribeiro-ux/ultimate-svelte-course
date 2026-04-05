<script lang="ts">
	interface User {
		id: string;
		name: string;
		email: string;
		title: string;
	}

	const directory: Record<string, User> = {
		u1: { id: 'u1', name: 'Ada Lovelace', email: 'ada@analytical.co', title: 'Engineer' },
		u2: { id: 'u2', name: 'Grace Hopper', email: 'grace@cobol.mil', title: 'Admiral' }
	};

	let userId: string = $state('u1');

	function delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function loadUser(id: string): Promise<User> {
		await delay(700);
		const user = directory[id];
		if (!user) {
			throw new Error(`No user with id "${id}"`);
		}
		return user;
	}

	const promise = $derived(loadUser(userId));
</script>

<section class="demo">
	<label class="field">
		<span class="label">User id</span>
		<select class="select" bind:value={userId}>
			<option value="u1">u1 — Ada</option>
			<option value="u2">u2 — Grace</option>
			<option value="u3">u3 — not found</option>
		</select>
	</label>

	{#await promise}
		<div class="skeleton" aria-busy="true" aria-live="polite">
			<div class="skeleton-line" style:inline-size="60%"></div>
			<div class="skeleton-line" style:inline-size="40%"></div>
			<div class="skeleton-line" style:inline-size="75%"></div>
		</div>
	{:then user}
		<article class="card">
			<h3 class="name">{user.name}</h3>
			<p class="title">{user.title}</p>
			<p class="email">{user.email}</p>
		</article>
	{:catch err}
		<p class="error" role="alert">
			{err instanceof Error ? err.message : 'Unknown error'}
		</p>
	{/await}
</section>

<style>
	.demo {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);
		font-family: var(--font-sans);

		& .field {
			display: grid;
			gap: var(--space-2xs);
			inline-size: fit-content;
		}

		& .label {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .select {
			font: inherit;
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-bg);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .skeleton {
			display: grid;
			gap: var(--space-xs);
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .skeleton-line {
			block-size: 0.75rem;
			border-radius: var(--radius-sm);
			background: linear-gradient(
				90deg,
				var(--color-surface-2) 0%,
				var(--color-border) 50%,
				var(--color-surface-2) 100%
			);
			background-size: 200% 100%;
			animation: shimmer var(--dur-slower) var(--ease-in-out) infinite;
		}

		& .error {
			margin: 0;
			padding: var(--space-sm) var(--space-md);
			background-color: var(--color-surface-2);
			color: var(--color-danger);
			border: 1px solid var(--color-danger);
			border-radius: var(--radius-md);
			font-size: var(--text-sm);
		}

		& .card {
			display: grid;
			gap: var(--space-2xs);
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .name {
			margin: 0;
			font-size: var(--text-lg);
			color: var(--color-primary);
		}

		& .title {
			margin: 0;
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-accent);
		}

		& .email {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.demo .skeleton-line {
			animation: none;
		}
	}
</style>
