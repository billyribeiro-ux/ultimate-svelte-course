<script lang="ts">
	interface Contact {
		id: string;
		name: string;
		email: string;
		initials: string;
		role: string;
	}

	const contacts: readonly Contact[] = [
		{ id: 'c1', name: 'Ada Lovelace', email: 'ada@analytical.co', initials: 'AL', role: 'Engineer' },
		{ id: 'c2', name: 'Alan Turing', email: 'alan@bletchley.uk', initials: 'AT', role: 'Mathematician' },
		{ id: 'c3', name: 'Grace Hopper', email: 'grace@cobol.mil', initials: 'GH', role: 'Admiral' },
		{ id: 'c4', name: 'Linus Torvalds', email: 'linus@kernel.org', initials: 'LT', role: 'Maintainer' },
		{ id: 'c5', name: 'Margaret Hamilton', email: 'margaret@apollo.nasa', initials: 'MH', role: 'Director' },
		{ id: 'c6', name: 'Tim Berners-Lee', email: 'tim@web.org', initials: 'TB', role: 'Inventor' }
	] as const;
</script>

<section class="demo">
	<h3 class="title">Contacts ({contacts.length})</h3>
	<ul class="grid">
		{#each contacts as { id, name, email, initials, role }, i (id)}
			<li class="card">
				<div class="avatar" aria-hidden="true">{initials}</div>
				<div class="body">
					<p class="name">
						<span class="index">#{i + 1}</span>
						{name}
					</p>
					<p class="role">{role}</p>
					<p class="email">{email}</p>
				</div>
			</li>
		{/each}
	</ul>
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

		& .title {
			margin: 0;
			font-size: var(--text-lg);
			color: var(--color-fg);
		}

		& .grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
			gap: var(--space-sm);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& .card {
			display: flex;
			gap: var(--space-sm);
			padding: var(--space-sm);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .avatar {
			display: grid;
			place-items: center;
			inline-size: 2.75rem;
			block-size: 2.75rem;
			background-color: var(--color-primary);
			color: var(--color-primary-contrast);
			border-radius: var(--radius-full);
			font-weight: 600;
			font-size: var(--text-sm);
		}

		& .body {
			display: grid;
			gap: var(--space-2xs);
			min-inline-size: 0;
		}

		& .name {
			display: flex;
			align-items: baseline;
			gap: var(--space-xs);
			margin: 0;
			font-size: var(--text-base);
			font-weight: 600;
		}

		& .index {
			font-size: var(--text-xs);
			color: var(--color-fg-muted);
			font-variant-numeric: tabular-nums;
		}

		& .role {
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
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
