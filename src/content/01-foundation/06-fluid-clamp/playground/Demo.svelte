<script lang="ts">
	const heroText: string = 'Fluid type, zero breakpoints';
	const subText: string = 'Resize the browser and watch every size scale smoothly.';
	const bodyText: string =
		'The preferred value mixes rem and vw so every width between 320px and 1920px is handled by the same declaration. No media queries. No jumps.';
	const captionText: string = 'clamp(min, preferred, max)';
</script>

<section class="specimen">
	<h1>{heroText}</h1>
	<h2>A quiet revolution in responsive design</h2>
	<h3>One function replaces the media-query staircase</h3>
	<p>{subText}</p>
	<p class="body">{bodyText}</p>
	<small>{captionText}</small>
</section>

<style>
	.specimen {
		display: grid;
		gap: var(--space-md);
		padding-block: var(--space-xl);
		padding-inline: var(--space-lg);
		background: var(--color-surface);
		color: var(--color-fg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	h1 {
		margin: 0;
		font-size: var(--text-hero);
		line-height: var(--leading-tight);
		color: var(--color-primary);
	}

	h2 {
		margin: 0;
		font-size: var(--text-2xl);
		line-height: var(--leading-tight);
	}

	h3 {
		margin: 0;
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		color: var(--color-fg-muted);
	}

	p {
		margin: 0;
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
	}

	.body {
		max-inline-size: 60ch;
	}

	small {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-accent);
	}
</style>
