/**
 * Ambient types for Vitest tests.
 *
 * Importing `@testing-library/jest-dom/vitest` at runtime in `vitest-setup.ts`
 * extends Vitest's `expect` with DOM matchers, but TypeScript needs this
 * reference to surface the matcher types (`toHaveAttribute`, `toHaveTextContent`,
 * `toBeInTheDocument`, etc.) in every `*.test.ts` file under `src/`.
 */
/// <reference types="@testing-library/jest-dom" />

import 'vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface Assertion<T = unknown> extends TestingLibraryMatchers<unknown, T> {}
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, unknown> {}
}
