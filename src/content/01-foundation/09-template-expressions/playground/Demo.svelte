<script lang="ts">
	interface Plan {
		readonly id: string;
		readonly name: string;
		readonly priceCents: number;
		readonly features: readonly string[];
		readonly featured: boolean;
	}

	const plans: readonly Plan[] = [
		{
			id: 'starter',
			name: 'Starter',
			priceCents: 900,
			features: ['1 project', 'Community support', 'Basic analytics'],
			featured: false
		},
		{
			id: 'pro',
			name: 'Pro',
			priceCents: 1900,
			features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team seats'],
			featured: true
		}
	];
</script>

<section class="grid">
	{#each plans as plan (plan.id)}
		{@const price = (plan.priceCents / 100).toFixed(2)}
		<article class="plan" class:featured={plan.featured}>
			<header>
				<h3>{plan.name}</h3>
				<span class="badge">{plan.featured ? 'Most popular' : 'Standard'}</span>
			</header>

			<p class="price">
				<span class="currency">$</span><span class="amount">{price}</span><span class="period"
					>/mo</span
				>
			</p>

			<ul>
				{#each plan.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
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

	.plan {
		display: grid;
		gap: var(--space-md);
		padding-block: var(--space-lg);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition:
			box-shadow var(--dur-base) var(--ease-out),
			border-color var(--dur-base) var(--ease-out);
	}

	.plan.featured {
		border-color: var(--color-primary);
		box-shadow: var(--shadow-lg);
	}

	header {
		display: grid;
		gap: var(--space-2xs);
	}

	h3 {
		margin: 0;
		font-size: var(--text-xl);
		line-height: var(--leading-tight);
		color: var(--color-primary);
	}

	.badge {
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

	.plan.featured .badge {
		background: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	.price {
		margin: 0;
		display: flex;
		align-items: baseline;
		gap: var(--space-2xs);
	}

	.currency {
		font-size: var(--text-lg);
		color: var(--color-fg-muted);
	}

	.amount {
		font-size: var(--text-2xl);
		font-weight: 700;
		font-family: var(--font-mono);
		color: var(--color-fg);
	}

	.period {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	ul {
		display: grid;
		gap: var(--space-xs);
		margin: 0;
		padding-inline-start: 0;
		list-style: none;
	}

	li {
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		padding-inline-start: var(--space-md);
		position: relative;
	}

	li::before {
		content: '✓';
		position: absolute;
		inset-inline-start: 0;
		color: var(--color-success);
		font-weight: 700;
	}
</style>
