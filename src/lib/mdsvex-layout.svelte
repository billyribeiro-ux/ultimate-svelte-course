<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
</script>

<article class="prose">
	{@render children?.()}
</article>

<style>
	article.prose {
		max-inline-size: var(--measure-prose);
		margin-inline: auto;
		color: var(--color-fg);
	}
</style>
