export interface ShortcutHandlers {
	onNext?: () => void;
	onPrev?: () => void;
	onTop?: () => void;
	onToggleComplete?: () => void;
	onFocusSearch?: () => void;
	onShowHelp?: () => void;
	onCommandPalette?: () => void;
	onEscape?: () => void;
}

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
	if (target.isContentEditable) return true;
	return false;
}

/**
 * Registers window-level keyboard shortcuts. Returns an unregister fn.
 * Implements j/k/c/g g / ? Cmd+K Esc. Ignores input/textarea/contenteditable.
 */
export function registerShortcuts(handlers: ShortcutHandlers): () => void {
	if (typeof window === 'undefined') return () => {};

	let lastG = 0;
	const G_WINDOW_MS = 500;

	const onKeyDown = (event: KeyboardEvent): void => {
		if (isEditableTarget(event.target)) {
			if (event.key === 'Escape') handlers.onEscape?.();
			return;
		}

		const meta = event.metaKey || event.ctrlKey;

		if (meta && (event.key === 'k' || event.key === 'K')) {
			event.preventDefault();
			handlers.onCommandPalette?.();
			return;
		}

		if (meta || event.altKey) return;

		switch (event.key) {
			case 'j':
				event.preventDefault();
				handlers.onNext?.();
				return;
			case 'k':
				event.preventDefault();
				handlers.onPrev?.();
				return;
			case 'c':
				event.preventDefault();
				handlers.onToggleComplete?.();
				return;
			case '/':
				event.preventDefault();
				handlers.onFocusSearch?.();
				return;
			case '?':
				event.preventDefault();
				handlers.onShowHelp?.();
				return;
			case 'Escape':
				handlers.onEscape?.();
				return;
			case 'g': {
				const now = Date.now();
				if (now - lastG <= G_WINDOW_MS) {
					event.preventDefault();
					lastG = 0;
					handlers.onTop?.();
				} else {
					lastG = now;
				}
				return;
			}
			default:
				return;
		}
	};

	window.addEventListener('keydown', onKeyDown);
	return () => window.removeEventListener('keydown', onKeyDown);
}
