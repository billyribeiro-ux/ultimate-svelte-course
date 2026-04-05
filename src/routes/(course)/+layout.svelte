<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/course/Header.svelte';
	import Sidebar from '$lib/components/course/Sidebar.svelte';
	import ProgressBar from '$lib/components/course/ProgressBar.svelte';
	import BreakpointIndicator from '$lib/components/course/BreakpointIndicator.svelte';
	import { progress } from '$lib/stores/progressStore.svelte';
	import { registerShortcuts } from '$lib/shortcuts.svelte';
	import type { LessonRef, ModuleMeta } from '$lib/types/lesson';

	interface Props {
		data: {
			manifest: readonly ModuleMeta[];
			currentLessonId: string | null;
		};
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let drawerOpen = $state(false);
	let liveMessage = $state('');

	// Seed the store with the manifest so $derived percentages work.
	$effect(() => {
		progress.setManifest(data.manifest);
	});

	// Track current lesson id in the store when the route provides one.
	$effect(() => {
		if (data.currentLessonId) {
			progress.currentLessonId = data.currentLessonId;
		}
	});

	// Hydrate from localStorage on the client; persist continuously.
	$effect(() => {
		if (!browser) return;
		progress.hydrate();
		progress.persist();
	});

	// Current module from the route manifest.
	let currentModule = $derived<ModuleMeta | null>(
		data.manifest.find((m) => m.lessons.some((l) => l.id === data.currentLessonId)) ?? null
	);

	// Flat ordered lesson list for prev/next computation.
	let flatLessons = $derived<readonly LessonRef[]>(
		data.manifest.flatMap((mod) =>
			mod.lessons.map<LessonRef>((l) => ({
				id: l.id,
				moduleId: mod.id,
				number: l.number,
				title: l.title,
				href: `/${mod.id}/${l.number}`
			}))
		)
	);

	let currentIndex = $derived(
		data.currentLessonId ? flatLessons.findIndex((l) => l.id === data.currentLessonId) : -1
	);

	function gotoOffset(delta: -1 | 1): void {
		if (currentIndex < 0) return;
		const target = flatLessons[currentIndex + delta];
		if (!target) return;
		void goto(target.href);
	}

	function openSearch(): void {
		void goto('/search');
	}

	function openMenu(): void {
		drawerOpen = true;
	}

	function closeMenu(): void {
		drawerOpen = false;
	}

	// Keyboard shortcuts.
	$effect(() => {
		if (!browser) return;
		const unregister = registerShortcuts({
			onNext: () => gotoOffset(1),
			onPrev: () => gotoOffset(-1),
			onTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
			onToggleComplete: () => {
				if (data.currentLessonId) progress.toggleComplete(data.currentLessonId);
			},
			onFocusSearch: openSearch,
			onShowHelp: () => {
				/* shortcuts modal — phase 1+ */
			},
			onCommandPalette: () => {
				/* command palette — module 13+ */
			},
			onEscape: closeMenu
		});
		return unregister;
	});

	// Focus the lesson h1 and announce title on navigation.
	afterNavigate(() => {
		if (!browser) return;
		const h1 = document.querySelector<HTMLElement>('main h1');
		if (h1) {
			h1.focus();
			liveMessage = h1.textContent?.trim() ?? '';
		}
		drawerOpen = false;
	});

	let overallPercent = $derived(progress.overallPercent);
	let moduleTitle = $derived(currentModule?.title ?? 'Ultimate Svelte Course');
	// Silence unused-variable warning in builds where page.* isn't read.
	$effect(() => {
		void page.url;
	});
</script>

<a class="skip-link" href="#main">Skip to lesson content</a>

<div class="shell">
	<Header {moduleTitle} {overallPercent} onSearchOpen={openSearch} onMenuOpen={openMenu} />

	<div class="body">
		<Sidebar
			manifest={data.manifest}
			currentLessonId={data.currentLessonId}
			open={drawerOpen}
			onClose={closeMenu}
		/>

		<main id="main" class="main">
			{@render children()}
		</main>
	</div>

	<div class="progress-slot">
		<ProgressBar value={overallPercent} label="Overall course progress" />
	</div>

	<div class="sr-live" role="status" aria-live="polite">{liveMessage}</div>
</div>

<BreakpointIndicator />

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-block-size: 100dvh;
		background: var(--color-bg);
		color: var(--color-fg);
	}

	.body {
		flex: 1 1 auto;
		display: flex;
		align-items: stretch;
		min-block-size: 0;
	}

	.main {
		flex: 1 1 auto;
		min-inline-size: 0;
		padding: 0;
	}

	.progress-slot {
		position: sticky;
		inset-block-end: 0;
		background: var(--color-bg);
		border-block-start: 1px solid var(--color-border);
	}

	.skip-link {
		position: absolute;
		inset-inline-start: var(--space-s);
		inset-block-start: var(--space-s);
		padding: var(--space-2xs) var(--space-s);
		background: var(--color-surface-1);
		color: var(--color-fg);
		border: 2px solid var(--color-focus);
		border-radius: var(--radius-m);
		transform: translateY(-200%);
		transition: transform var(--dur-s) var(--ease-out);
		z-index: 10000;
	}

	.skip-link:focus {
		transform: translateY(0);
	}

	.sr-live {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.skip-link {
			transition: none;
		}
	}
</style>
