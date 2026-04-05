<script lang="ts">
	type Status = 'idle' | 'loading' | 'success' | 'error';

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

	let status: Status = $state('idle');
	let data: User | null = $state(null);
	let error: string | null = $state(null);
	let userId: string = $state('u1');
	let forceError: boolean = $state(false);

	function delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function loadUser(id: string, fail: boolean): Promise<User> {
		await delay(700);
		if (fail) {
			throw new Error('Simulated network failure');
		}
		const user = directory[id];
		if (!user) {
			throw new Error(`No user with id "${id}"`);
		}
		return user;
	}

	async function run(): Promise<void> {
		status = 'loading';
		data = null;
		error = null;
		try {
			const user = await loadUser(userId, forceError);
			data = user;
			status = 'success';
		} catch (e: unknown) {
			error = e instanceof Error ? e.message : 'Unknown error';
			status = 'error';
		}
	}

	$effect(() => {
		void run();
	});
</script>

<section class="demo">
	<div class="controls">
		<label class="field">
			<span class="label">User id</span>
			<select class="select" bind:value={userId}>
				<option value="u1">u1 — Ada</option>
				<option value="u2">u2 — Grace</option>
				<option value="u3">u3 — not found</option>
			</select>
		</label>
		<label class="toggle">
			<input type="checkbox" bind:checked={forceError} />
			<span>Force error</span>
		</label>
	</div>

	{#if status === 'loading'}
		<div class="skeleton" aria-busy="true" aria-live="polite">
			<div class="skeleton-line" style:inline-size="60%"></div>
			<div class="skeleton-line" style:inline-size="40%"></div>
			<div class="skeleton-line" style:inline-size="75%"></div>
		</div>
	{:else if status === 'error' && error !== null}
		<p class="error" role="alert">{error}</p>
	{:else if status === 'success' && data !== null}
		<article class="card">
			<h3 class="name">{data.name}</h3>
			<p class="title">{data.title}</p>
			<p class="email">{data.email}</p>
		</article>
	{/if}
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

		& .controls {
			display: flex;
			flex-wrap: wrap;
			align-items: end;
			gap: var(--space-md);
		}

		& .field {
			display: grid;
			gap: var(--space-2xs);
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

		& .toggle {
			display: inline-flex;
			align-items: center;
			gap: var(--space-xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
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
