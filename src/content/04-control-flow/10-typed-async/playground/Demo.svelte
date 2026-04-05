<script lang="ts">
	import { simulateJson } from './api';

	interface UserProfile {
		id: string;
		name: string;
		handle: string;
		title: string;
		followers: number;
		joined: string;
	}

	const profiles: readonly UserProfile[] = [
		{
			id: 'u1',
			name: 'Ada Lovelace',
			handle: '@ada',
			title: 'Analytical Engineer',
			followers: 1837,
			joined: '1843-07-10'
		},
		{
			id: 'u2',
			name: 'Grace Hopper',
			handle: '@grace',
			title: 'Compiler Pioneer',
			followers: 1952,
			joined: '1944-09-01'
		}
	] as const;

	let selectedId: string = $state('u1');

	async function loadProfile(id: string): Promise<UserProfile> {
		const match = profiles.find((p) => p.id === id);
		if (!match) {
			throw new Error(`No profile for id "${id}"`);
		}
		return simulateJson<UserProfile>(match, 500);
	}

	const promise = $derived(loadProfile(selectedId));

	const numberFormatter = new Intl.NumberFormat('en-US');
</script>

<section class="demo">
	<div class="controls">
		{#each profiles as profile (profile.id)}
			<button
				type="button"
				class="chip"
				aria-pressed={selectedId === profile.id}
				onclick={() => (selectedId = profile.id)}
			>
				{profile.handle}
			</button>
		{/each}
	</div>

	{#await promise}
		<div class="skeleton" aria-busy="true" aria-live="polite">
			<div class="skeleton-line" style:inline-size="45%"></div>
			<div class="skeleton-line" style:inline-size="70%"></div>
			<div class="skeleton-line" style:inline-size="30%"></div>
		</div>
	{:then user}
		<article class="card">
			<header class="head">
				<h3 class="name">{user.name}</h3>
				<span class="handle">{user.handle}</span>
			</header>
			<p class="title">{user.title}</p>
			<dl class="stats">
				<div class="stat">
					<dt>Followers</dt>
					<dd>{numberFormatter.format(user.followers)}</dd>
				</div>
				<div class="stat">
					<dt>Joined</dt>
					<dd>{user.joined}</dd>
				</div>
			</dl>
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

		& .controls {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-xs);
		}

		& .chip {
			font: inherit;
			padding-block: var(--space-2xs);
			padding-inline: var(--space-sm);
			background-color: var(--color-surface-2);
			color: var(--color-fg);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-full);
			cursor: pointer;
			transition: background-color var(--dur-fast) var(--ease-out);

			&:hover {
				background-color: var(--color-bg);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}

			&[aria-pressed='true'] {
				background-color: var(--color-primary);
				color: var(--color-primary-contrast);
				border-color: var(--color-primary);
			}
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
			gap: var(--space-sm);
			padding: var(--space-md);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .head {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: var(--space-xs);
		}

		& .name {
			margin: 0;
			font-size: var(--text-lg);
			color: var(--color-primary);
		}

		& .handle {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
			font-family: var(--font-mono);
		}

		& .title {
			margin: 0;
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-accent);
		}

		& .stats {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--space-sm);
			margin: 0;
		}

		& .stat {
			display: grid;
			gap: var(--space-2xs);
			padding: var(--space-sm);
			background-color: var(--color-surface);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-sm);
		}

		& dt {
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-fg-muted);
		}

		& dd {
			margin: 0;
			font-size: var(--text-base);
			font-variant-numeric: tabular-nums;
			color: var(--color-fg);
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
