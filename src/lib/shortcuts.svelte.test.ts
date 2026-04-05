/**
 * Canonical utility test for the keyboard shortcut manager.
 *
 * Notes:
 *  - We run this in the jsdom client project (hence `.svelte.test.ts`) so that
 *    `window` is available.
 *  - The `g g` chord is timing-sensitive; we use fake timers + real Date.now
 *    advancement via `vi.advanceTimersByTime` in combination with `vi.setSystemTime`.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { registerShortcuts, type ShortcutHandlers } from './shortcuts.svelte';

function makeHandlers(): Required<ShortcutHandlers> {
	return {
		onNext: vi.fn(),
		onPrev: vi.fn(),
		onTop: vi.fn(),
		onToggleComplete: vi.fn(),
		onFocusSearch: vi.fn(),
		onShowHelp: vi.fn(),
		onCommandPalette: vi.fn(),
		onEscape: vi.fn()
	};
}

function dispatchKey(
	key: string,
	init: KeyboardEventInit & { target?: EventTarget } = {}
): KeyboardEvent {
	const { target, ...rest } = init;
	const event = new KeyboardEvent('keydown', {
		key,
		bubbles: true,
		cancelable: true,
		...rest
	});
	if (target !== undefined) {
		Object.defineProperty(event, 'target', { value: target, configurable: true });
	}
	window.dispatchEvent(event);
	return event;
}

describe('registerShortcuts', () => {
	let handlers: Required<ShortcutHandlers>;
	let unregister: () => void;

	beforeEach(() => {
		handlers = makeHandlers();
		unregister = registerShortcuts(handlers);
	});

	afterEach(() => {
		unregister();
		vi.useRealTimers();
	});

	it('fires onNext for the "j" key', () => {
		dispatchKey('j');
		expect(handlers.onNext).toHaveBeenCalledTimes(1);
	});

	it('fires onPrev for the "k" key', () => {
		dispatchKey('k');
		expect(handlers.onPrev).toHaveBeenCalledTimes(1);
	});

	it('fires onToggleComplete for the "c" key', () => {
		dispatchKey('c');
		expect(handlers.onToggleComplete).toHaveBeenCalledTimes(1);
	});

	it('fires onFocusSearch for "/"', () => {
		dispatchKey('/');
		expect(handlers.onFocusSearch).toHaveBeenCalledTimes(1);
	});

	it('fires onShowHelp for "?"', () => {
		dispatchKey('?');
		expect(handlers.onShowHelp).toHaveBeenCalledTimes(1);
	});

	it('fires onCommandPalette for Cmd+K and Ctrl+K', () => {
		dispatchKey('k', { metaKey: true });
		dispatchKey('K', { ctrlKey: true });
		expect(handlers.onCommandPalette).toHaveBeenCalledTimes(2);
	});

	it('fires onEscape for the Escape key', () => {
		dispatchKey('Escape');
		expect(handlers.onEscape).toHaveBeenCalledTimes(1);
	});

	it('fires onTop when "g" is pressed twice within 500ms', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1, 12, 0, 0));
		dispatchKey('g');
		vi.advanceTimersByTime(200);
		dispatchKey('g');
		expect(handlers.onTop).toHaveBeenCalledTimes(1);
	});

	it('does NOT fire onTop when "g" presses exceed the 500ms window', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1, 12, 0, 0));
		dispatchKey('g');
		vi.advanceTimersByTime(600);
		dispatchKey('g');
		expect(handlers.onTop).not.toHaveBeenCalled();
	});

	it('ignores events whose target is an <input>', () => {
		const input = document.createElement('input');
		document.body.appendChild(input);
		dispatchKey('j', { target: input });
		expect(handlers.onNext).not.toHaveBeenCalled();
		input.remove();
	});

	it('ignores events whose target is a <textarea>', () => {
		const textarea = document.createElement('textarea');
		document.body.appendChild(textarea);
		dispatchKey('k', { target: textarea });
		expect(handlers.onPrev).not.toHaveBeenCalled();
		textarea.remove();
	});

	it('ignores events whose target is a contenteditable element', () => {
		const div = document.createElement('div');
		div.setAttribute('contenteditable', 'true');
		// jsdom does not reflect the contenteditable attribute onto the
		// `isContentEditable` getter, so patch it for this element.
		Object.defineProperty(div, 'isContentEditable', {
			configurable: true,
			get: () => true
		});
		document.body.appendChild(div);
		dispatchKey('c', { target: div });
		expect(handlers.onToggleComplete).not.toHaveBeenCalled();
		div.remove();
	});

	it('still fires onEscape from inside editable targets', () => {
		const input = document.createElement('input');
		document.body.appendChild(input);
		dispatchKey('Escape', { target: input });
		expect(handlers.onEscape).toHaveBeenCalledTimes(1);
		input.remove();
	});

	it('cleanup function removes the window listener', () => {
		unregister();
		dispatchKey('j');
		dispatchKey('k');
		dispatchKey('c');
		expect(handlers.onNext).not.toHaveBeenCalled();
		expect(handlers.onPrev).not.toHaveBeenCalled();
		expect(handlers.onToggleComplete).not.toHaveBeenCalled();
		// Re-register a noop unregister so afterEach works.
		unregister = () => {};
	});
});
