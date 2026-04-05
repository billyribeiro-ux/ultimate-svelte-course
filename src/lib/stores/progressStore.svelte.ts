import { SvelteSet } from 'svelte/reactivity';
import type { ModuleMeta } from '$lib/types/lesson';

const STORAGE_KEY = 'ultsvelte:progress:v1';

export type Theme = 'light' | 'dark' | 'system';

interface Snapshot {
	completed: string[];
	currentLessonId: string | null;
	theme: Theme;
}

class ProgressStore {
	completedLessons: SvelteSet<string> = new SvelteSet<string>();
	currentLessonId = $state<string | null>(null);
	theme = $state<Theme>('system');

	#manifest = $state<readonly ModuleMeta[]>([]);
	#hydrated = false;
	#persisting = false;

	setManifest(manifest: readonly ModuleMeta[]): void {
		this.#manifest = manifest;
	}

	overallPercent = $derived.by<number>(() => {
		const total = this.#manifest.reduce((n, m) => n + m.lessons.length, 0);
		if (total === 0) return 0;
		return this.completedLessons.size / total;
	});

	modulePercent(moduleId: string): number {
		const mod = this.#manifest.find((m) => m.id === moduleId);
		if (!mod || mod.lessons.length === 0) return 0;
		let done = 0;
		for (const lesson of mod.lessons) {
			if (this.completedLessons.has(lesson.id)) done++;
		}
		return done / mod.lessons.length;
	}

	markComplete(id: string): void {
		this.completedLessons.add(id);
	}

	markIncomplete(id: string): void {
		this.completedLessons.delete(id);
	}

	toggleComplete(id: string): void {
		if (this.completedLessons.has(id)) {
			this.markIncomplete(id);
		} else {
			this.markComplete(id);
		}
	}

	reset(): void {
		this.completedLessons.clear();
	}

	hydrate(): void {
		if (this.#hydrated) return;
		if (typeof localStorage === 'undefined') return;
		this.#hydrated = true;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw === null) return;
		try {
			const snap = JSON.parse(raw) as Snapshot;
			this.completedLessons.clear();
			for (const id of snap.completed ?? []) this.completedLessons.add(id);
			this.currentLessonId = snap.currentLessonId ?? null;
			this.theme = snap.theme ?? 'system';
		} catch {
			/* ignore malformed snapshot */
		}
	}

	persist(): void {
		if (this.#persisting) return;
		if (typeof window === 'undefined') return;
		this.#persisting = true;
		$effect.root(() => {
			$effect(() => {
				const snap: Snapshot = {
					completed: [...this.completedLessons],
					currentLessonId: this.currentLessonId,
					theme: this.theme
				};
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
				} catch {
					/* storage full or blocked */
				}
			});
		});
	}
}

export const progress = new ProgressStore();
