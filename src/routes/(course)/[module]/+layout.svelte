<script lang="ts">
	import type { ModuleMeta } from '$lib/types/lesson';

	interface Props {
		data: { module: ModuleMeta };
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
	<ol>
		<li><a href="/" data-sveltekit-preload-data="hover">Course</a></li>
		<li aria-current="page">{data.module.title}</li>
	</ol>
</nav>

{@render children()}

<style>
	.breadcrumb {
		padding: var(--space-s) var(--space-m) 0;
	}

	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.breadcrumb li + li::before {
		content: '/';
		margin-inline-end: var(--space-2xs);
		color: var(--color-fg-muted);
	}

	.breadcrumb a {
		color: var(--color-fg-muted);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--color-fg);
		text-decoration: underline;
	}

	.breadcrumb a:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
		border-radius: var(--radius-s);
	}
</style>
