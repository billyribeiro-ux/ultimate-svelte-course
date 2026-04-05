<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		Demo: Component;
		lessonId: string;
	}

	let { Demo, lessonId }: Props = $props();
</script>

<aside class="playground" aria-label="Playground">
	{#key lessonId}
		<Demo />
	{/key}
</aside>

<style>
	.playground {
		display: block;
		inline-size: 100%;
		padding: var(--space-m);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-l);
		container-type: inline-size;
	}
</style>
