<script lang="ts">
	interface Props {
		name: string;
		role: string;
		bio: string;
		avatarUrl: string;
		links?: ReadonlyArray<{ label: string; href: string }>;
	}

	const { name, role, bio, avatarUrl, links = [] }: Props = $props();
</script>

<article class="profile-card">
	<img class="avatar" src={avatarUrl} alt="" aria-hidden="true" />
	<header class="header">
		<h2 class="name">{name}</h2>
		<p class="role">{role}</p>
	</header>
	<p class="bio">{bio}</p>
	{#if links.length > 0}
		<ul class="links">
			{#each links as link (link.href)}
				<li>
					<a href={link.href}>{link.label}</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	.profile-card {
		display: grid;
		gap: var(--space-sm);
		padding-block: var(--space-md);
		padding-inline: var(--space-md);
		background-color: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);

		& .avatar {
			inline-size: 4rem;
			block-size: 4rem;
			border-radius: var(--radius-full);
			object-fit: cover;
			border: 1px solid var(--color-border);
		}

		& .header {
			display: grid;
			gap: var(--space-2xs);
		}

		& .name {
			margin: 0;
			font-size: var(--text-xl);
			line-height: var(--leading-tight);
		}

		& .role {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .bio {
			margin: 0;
			font-size: var(--text-base);
			line-height: var(--leading-normal);
			color: var(--color-fg);
		}

		& .links {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-sm);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .links a {
			display: inline-flex;
			align-items: center;
			min-block-size: 2.75rem;
			padding-inline: var(--space-sm);
			color: var(--color-link);
			text-decoration: none;
			border-radius: var(--radius-md);

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}
	}

	@media (hover: hover) {
		.profile-card .links a:hover {
			text-decoration: underline;
		}
	}
</style>
