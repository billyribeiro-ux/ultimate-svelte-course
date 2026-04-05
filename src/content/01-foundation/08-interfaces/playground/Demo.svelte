<script lang="ts">
	import type { User } from './types';

	const alice: User = {
		id: 'u_1',
		name: 'Alice Chen',
		role: 'admin',
		avatar: 'AC',
		bio: 'Compiler enthusiast. Writes about type systems and build tools.'
	};

	const bob: User = {
		id: 'u_2',
		name: 'Bob Reyes',
		role: 'member'
	};

	const users: readonly User[] = [alice, bob];
</script>

<section class="grid">
	{#each users as user (user.id)}
		<article class="card">
			<header>
				<div class="avatar" aria-hidden="true">
					{user.avatar ?? user.name.slice(0, 1)}
				</div>
				<div class="headings">
					<h3>{user.name}</h3>
					<span class="role" class:admin={user.role === 'admin'}>{user.role}</span>
				</div>
			</header>

			{#if user.bio}
				<p class="bio">{user.bio}</p>
			{/if}
		</article>
	{/each}
</section>

<style>
	.grid {
		display: grid;
		gap: var(--space-md);
		grid-template-columns: 1fr;
	}

	@media (min-width: 40rem) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.card {
		display: grid;
		gap: var(--space-md);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-inline-start: 4px solid var(--color-primary);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-md);
		align-items: center;
	}

	.avatar {
		inline-size: 3rem;
		block-size: 3rem;
		display: grid;
		place-items: center;
		font-family: var(--font-mono);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-primary-contrast);
		background: var(--color-primary);
		border-radius: var(--radius-full);
	}

	.headings {
		display: grid;
		gap: var(--space-2xs);
	}

	h3 {
		margin: 0;
		font-size: var(--text-lg);
		line-height: var(--leading-tight);
	}

	.role {
		justify-self: start;
		padding-block: var(--space-2xs);
		padding-inline: var(--space-sm);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		background: var(--color-surface-2);
		color: var(--color-fg-muted);
		border-radius: var(--radius-full);
	}

	.role.admin {
		background: var(--color-accent);
		color: var(--color-primary-contrast);
	}

	.bio {
		margin: 0;
		font-size: var(--text-sm);
		line-height: var(--leading-relaxed);
		color: var(--color-fg-muted);
	}
</style>
