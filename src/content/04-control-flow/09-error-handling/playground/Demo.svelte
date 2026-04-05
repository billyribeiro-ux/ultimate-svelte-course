<script lang="ts">
	import { ApiError } from './errors';

	interface Profile {
		id: string;
		handle: string;
		bio: string;
	}

	let attempt: number = $state(0);
	let forceFailure: boolean = $state(true);

	function delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function loadProfile(attemptNumber: number, fail: boolean): Promise<Profile> {
		const url = `/api/profile?attempt=${attemptNumber}`;
		await delay(600);
		if (fail) {
			throw new ApiError(503, url, 'Service temporarily unavailable');
		}
		return {
			id: 'p1',
			handle: '@ada',
			bio: 'Writing notes on the Analytical Engine.'
		};
	}

	const promise = $derived(loadProfile(attempt, forceFailure));

	function retry(): void {
		attempt += 1;
	}

	function errorMessage(e: unknown): string {
		if (e instanceof ApiError) return `${e.status} — ${e.message}`;
		if (e instanceof Error) return e.message;
		return 'Unknown error';
	}

	function errorStatus(e: unknown): number | null {
		return e instanceof ApiError ? e.status : null;
	}
</script>

<section class="demo">
	<div class="controls">
		<label class="toggle">
			<input type="checkbox" bind:checked={forceFailure} />
			<span>Simulate failure</span>
		</label>
		<span class="counter">attempts: {attempt + 1}</span>
	</div>

	{#await promise}
		<div class="skeleton" aria-busy="true" aria-live="polite">
			<div class="skeleton-line" style:inline-size="50%"></div>
			<div class="skeleton-line" style:inline-size="80%"></div>
		</div>
	{:then profile}
		<article class="card">
			<h3 class="handle">{profile.handle}</h3>
			<p class="bio">{profile.bio}</p>
		</article>
	{:catch err}
		<div class="error" role="alert">
			<div class="error-body">
				<p class="error-title">
					Request failed{#if errorStatus(err) !== null}
						{' '}({errorStatus(err)}){/if}
				</p>
				<p class="error-message">{errorMessage(err)}</p>
			</div>
			<button type="button" class="retry" onclick={retry}>Retry</button>
		</div>
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

		& .controls {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: var(--space-sm);
		}

		& .toggle {
			display: inline-flex;
			align-items: center;
			gap: var(--space-xs);
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .counter {
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
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

		& .card {
			display: grid;
			gap: var(--space-xs);
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .handle {
			margin: 0;
			font-size: var(--text-lg);
			color: var(--color-primary);
		}

		& .bio {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .error {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-md);
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-danger);
			border-radius: var(--radius-md);
			animation: shake var(--dur-base) var(--ease-out) 1;
		}

		& .error-body {
			display: grid;
			gap: var(--space-2xs);
		}

		& .error-title {
			margin: 0;
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-danger);
		}

		& .error-message {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .retry {
			font: inherit;
			min-block-size: var(--touch-min);
			padding-block: var(--space-xs);
			padding-inline: var(--space-md);
			background-color: var(--color-danger);
			color: var(--color-primary-contrast);
			border: 1px solid var(--color-danger);
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: filter var(--dur-fast) var(--ease-out);

			&:hover {
				filter: brightness(1.1);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
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

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-0.25rem);
		}
		75% {
			transform: translateX(0.25rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.demo .skeleton-line,
		.demo .error {
			animation: none;
		}
	}
</style>
