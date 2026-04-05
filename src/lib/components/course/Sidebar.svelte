<script lang="ts">
	import type { ModuleMeta } from '$lib/types/lesson';
	import { progress } from '$lib/stores/progressStore.svelte';
	import IconifyIcon from './IconifyIcon.svelte';

	interface Props {
		manifest: readonly ModuleMeta[];
		currentLessonId: string | null;
		open: boolean;
		onClose: () => void;
	}

	let { manifest, currentLessonId, open, onClose }: Props = $props();

	let dialogEl = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		const el = dialogEl;
		if (!el) return;
		if (open && !el.open) {
			if (typeof el.showModal === 'function') el.showModal();
		} else if (!open && el.open) {
			el.close();
		}
	});

	function isCurrentModule(mod: ModuleMeta): boolean {
		if (!currentLessonId) return false;
		return mod.lessons.some((l) => l.id === currentLessonId);
	}

	function lessonHref(moduleId: string, lessonNumber: string): string {
		return `/${moduleId}/${lessonNumber}`;
	}
</script>

{#snippet tree()}
	<nav class="nav" aria-label="Course">
		{#each manifest as mod (mod.id)}
			{@const pct = Math.round(progress.modulePercent(mod.id) * 100)}
			<details class="module" open={isCurrentModule(mod)}>
				<summary>
					<span class="chev" aria-hidden="true">
						<IconifyIcon name="ph:caret-right" />
					</span>
					<span class="mod-title">{mod.title}</span>
					<span class="mod-percent">{pct}%</span>
				</summary>
				<ul class="lessons">
					{#each mod.lessons as lesson (lesson.id)}
						{@const isCurrent = lesson.id === currentLessonId}
						{@const isComplete = progress.completedLessons.has(lesson.id)}
						<li>
							<a
								class="lesson"
								class:current={isCurrent}
								class:complete={isComplete}
								href={lessonHref(mod.id, lesson.number)}
								aria-current={isCurrent ? 'page' : undefined}
								data-sveltekit-preload-data="hover"
								data-sveltekit-preload-code="viewport"
							>
								<span class="marker" aria-hidden="true">
									{#if isComplete}
										<IconifyIcon name="ph:check-circle" />
									{:else}
										<IconifyIcon name="ph:circle" />
									{/if}
								</span>
								<span class="lesson-number">{lesson.number}</span>
								<span class="lesson-title">{lesson.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</details>
		{/each}
	</nav>
{/snippet}

<aside class="sidebar-desktop" aria-label="Course navigation">
	{@render tree()}
</aside>

<dialog bind:this={dialogEl} class="sidebar-drawer" aria-label="Course navigation" onclose={onClose}>
	<div class="drawer-head">
		<strong>Course</strong>
		<button type="button" class="close" onclick={onClose} aria-label="Close navigation">
			<IconifyIcon name="ph:x" />
		</button>
	</div>
	{@render tree()}
</dialog>

<style>
	.sidebar-desktop {
		display: none;
		inline-size: var(--sidebar-inline-size, 18rem);
		border-inline-end: 1px solid var(--color-border);
		background: var(--color-surface-1);
		overflow-y: auto;
		padding-block: var(--space-s);
	}

	@media (min-width: 768px) {
		.sidebar-desktop {
			display: block;
		}
	}

	.sidebar-drawer {
		position: fixed;
		inset-block: 0;
		inset-inline-start: 0;
		margin: 0;
		block-size: 100dvh;
		inline-size: min(20rem, 88vw);
		max-block-size: 100dvh;
		border: none;
		border-inline-end: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-fg);
		padding: 0;
	}

	.sidebar-drawer::backdrop {
		background: oklch(0% 0 0 / 0.5);
	}

	.drawer-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-s) var(--space-m);
		border-block-end: 1px solid var(--color-border);
	}

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-inline-size: var(--touch-min);
		min-block-size: var(--touch-min);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-m);
		color: var(--color-fg);
		cursor: pointer;
	}

	.close:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (min-width: 768px) {
		.sidebar-drawer {
			display: none;
		}
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		padding-inline: var(--space-s);
		padding-block: var(--space-s);
	}

	.module {
		border-radius: var(--radius-m);
	}

	.module > summary {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		padding: var(--space-2xs) var(--space-s);
		min-block-size: var(--touch-min);
		list-style: none;
		cursor: pointer;
		font-weight: 600;
		color: var(--color-fg);
		border-radius: var(--radius-m);
	}

	.module > summary::-webkit-details-marker {
		display: none;
	}

	.module > summary:hover {
		background: var(--color-surface-2);
	}

	.module > summary:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.chev {
		display: inline-flex;
		transition: transform var(--dur-s) var(--ease-out);
	}

	.module[open] > summary .chev {
		transform: rotate(90deg);
	}

	.mod-title {
		flex: 1 1 auto;
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mod-percent {
		font-variant-numeric: tabular-nums;
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.lessons {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-block-start: var(--space-2xs);
	}

	.lesson {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		padding: var(--space-2xs) var(--space-s);
		padding-inline-start: calc(var(--space-l) + var(--space-2xs));
		min-block-size: var(--touch-min);
		color: var(--color-fg);
		text-decoration: none;
		border-radius: var(--radius-m);
		font-size: var(--text-s);
	}

	.lesson:hover {
		background: var(--color-surface-2);
	}

	.lesson:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.lesson.current {
		background: var(--color-surface-accent);
		color: var(--color-fg);
	}

	.lesson.complete .marker {
		color: var(--color-success);
	}

	.marker {
		display: inline-flex;
		color: var(--color-fg-muted);
	}

	.lesson-number {
		font-variant-numeric: tabular-nums;
		color: var(--color-fg-muted);
		min-inline-size: 2ch;
	}

	.lesson-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		.chev {
			transition: none;
		}
	}
</style>
