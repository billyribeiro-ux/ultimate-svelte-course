import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// --- $app/state ---------------------------------------------------------
vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost/'),
		params: {},
		route: { id: null },
		status: 200,
		error: null,
		data: {},
		form: null,
		state: {}
	},
	navigating: null,
	updated: { current: false }
}));

// --- $app/navigation ----------------------------------------------------
vi.mock('$app/navigation', () => ({
	afterNavigate: vi.fn(),
	beforeNavigate: vi.fn(),
	disableScrollHandling: vi.fn(),
	goto: vi.fn(async () => {}),
	invalidate: vi.fn(async () => {}),
	invalidateAll: vi.fn(async () => {}),
	preloadCode: vi.fn(async () => {}),
	preloadData: vi.fn(async () => {}),
	pushState: vi.fn(),
	replaceState: vi.fn(),
	onNavigate: vi.fn()
}));

// --- $env/* -------------------------------------------------------------
vi.mock('$env/static/public', () => ({}));
vi.mock('$env/static/private', () => ({}));
vi.mock('$env/dynamic/public', () => ({ env: {} }));
vi.mock('$env/dynamic/private', () => ({ env: {} }));

// --- window.matchMedia --------------------------------------------------
if (typeof window !== 'undefined') {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		configurable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	});
}
