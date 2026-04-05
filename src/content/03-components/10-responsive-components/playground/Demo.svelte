<script lang="ts">
	import ResponsiveCard from '$lib/components/ui/ResponsiveCard.svelte';

	const product = {
		title: 'Mechanical Keyboard',
		price: '$149',
		imageUrl: 'https://placehold.co/640x480/png?text=Keyboard',
		description:
			'65% layout, hot-swappable switches, OKLCH-accurate keycap legends.'
	};
</script>

<section class="stack">
	<h3 class="caption">Narrow container (20rem)</h3>
	<div class="narrow">
		<ResponsiveCard {...product} />
	</div>

	<h3 class="caption">Wide container (40rem)</h3>
	<div class="wide">
		<ResponsiveCard {...product} />
	</div>

	<h3 class="caption">Full width</h3>
	<div class="full">
		<ResponsiveCard {...product} />
	</div>
</section>

<style>
	.stack {
		display: grid;
		gap: var(--space-md);
	}
	.caption {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.narrow {
		inline-size: min(100%, 20rem);
	}
	.wide {
		inline-size: min(100%, 40rem);
	}
	.full {
		inline-size: 100%;
	}
</style>
