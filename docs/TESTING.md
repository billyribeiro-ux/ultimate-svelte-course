# Testing Guide

This project uses **Vitest 4** with **@testing-library/svelte** for unit and
component tests, and **Playwright** for end-to-end tests (see `E2E.md`).

## TL;DR

```sh
pnpm test            # run the full unit suite once
pnpm test:watch      # re-run on file change
pnpm test:ui         # open the Vitest UI in a browser
pnpm test:coverage   # run with v8 coverage + thresholds
```

Coverage thresholds are enforced at:

- **lines** >= 80
- **functions** >= 80
- **branches** >= 75
- **statements** >= 80

## File naming

Vitest is configured with two projects (see `vitest.config.ts`):

| Extension                 | Project  | Environment | Use for                              |
| ------------------------- | -------- | ----------- | ------------------------------------ |
| `foo.test.ts`             | `server` | `node`      | Pure TypeScript, no runes, no DOM    |
| `foo.svelte.test.ts`      | `client` | `jsdom`     | Runes logic (`$state`, `$derived`)   |
| `Foo.svelte.test.ts`      | `client` | `jsdom`     | Svelte component tests (render/DOM)  |

**Rule of thumb**: if the code under test uses `$state`, `$derived`, `$effect`,
or imports a `.svelte` file, use `.svelte.test.ts`. Otherwise use `.test.ts`.

## Shared helpers

Import from `$lib/test-utils`:

```ts
import {
  render,          // re-export of @testing-library/svelte
  screen,
  userEvent,
  renderWithContext,
  createMockLessonMeta,
  createMockModuleMeta
} from '$lib/test-utils';
```

Factories (`createMockLessonMeta`, `createMockModuleMeta`) return fully-typed
objects with sensible defaults and accept a `Partial<T>` override.

## Writing a runes logic test

Runes (`$state`, `$derived`, `$effect`) are compile-time transforms, so you
**must** use the `.svelte.test.ts` extension. Use `flushSync()` from `svelte`
to force pending reactive updates to run synchronously.

```ts
// counter.svelte.ts
class Counter {
  value = $state(0);
  doubled = $derived(this.value * 2);
  increment(): void {
    this.value += 1;
  }
}
export const counter = new Counter();
```

```ts
// counter.svelte.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { flushSync } from 'svelte';
import { counter } from './counter.svelte.ts';

describe('counter', () => {
  beforeEach(() => {
    counter.value = 0;
  });

  it('increments and keeps doubled in sync', () => {
    counter.increment();
    flushSync();
    expect(counter.value).toBe(1);
    expect(counter.doubled).toBe(2);
  });
});
```

### Testing `$effect`

`flushSync(fn)` runs `fn` inside the reactive graph and flushes all pending
effects before returning. Use this to drive effect-based persistence logic:

```ts
flushSync(() => {
  store.mutateSomething();
});
expect(persistSpy).toHaveBeenCalled();
```

## Writing a component test

```ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from './Button.svelte';

describe('Button', () => {
  it('fires onclick when clicked', async () => {
    const user = userEvent.setup();
    const onclick = vi.fn();
    render(Button, { props: { label: 'Save', onclick } });

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onclick).toHaveBeenCalledTimes(1);
  });
});
```

**Prefer queries in this order**: `getByRole` > `getByLabelText` >
`getByText` > `getByTestId`. Test IDs are a last resort.

Every assertion should be **specific**. Use:

- `toHaveAttribute('role', 'progressbar')`
- `toHaveTextContent('Next lesson')`
- `toBeInTheDocument()`

Avoid vague assertions like `toBeTruthy()`.

**No snapshot tests.** They encourage sloppy assertions that mask regressions.

## Mocking `$app` and `$env`

`vitest-setup.ts` already mocks the following for every client test:

- `$app/state` — `page`, `navigating`, `updated`
- `$app/navigation` — `goto`, `invalidate`, `afterNavigate`, etc.
- `$env/static/public`, `$env/static/private`
- `$env/dynamic/public`, `$env/dynamic/private`

To customise per-test, re-mock inside the test file:

```ts
vi.mock('$app/state', () => ({
  page: { url: new URL('http://localhost/lessons/1'), params: { id: '1' } },
  navigating: null,
  updated: { current: false }
}));
```

DOM polyfills are also set up: `matchMedia`, `ResizeObserver`,
`IntersectionObserver`.

## Performance budgets

- Each test should complete in **&lt; 100 ms**.
- The whole unit suite should complete in **&lt; 5 s**.

If a test is slow, first suspect an unflushed effect or a real network / timer.
Use `vi.useFakeTimers()` for any timing-sensitive code.

## Gotchas

- **Module-level singletons** (like `progress` in `$lib/stores/progressStore.svelte.ts`)
  persist across tests. Reset them explicitly in `beforeEach`.
- **jsdom** does not fully implement `HTMLElement.isContentEditable` — if you
  need to test it, patch it with `Object.defineProperty(el, 'isContentEditable', {...})`.
- **SvelteKit path aliases** (`$lib/...`, `$app/...`) work in tests thanks to
  the `sveltekit()` Vite plugin loaded in both project configs.
- Do not mix `vi.resetModules()` with Svelte runes — resetting the module
  cache breaks Svelte's internal reactive bookkeeping. Reset state instead.

## Adding coverage thresholds to a new directory

Coverage excludes are in `vitest.config.ts` under `test.coverage.exclude`.
Add new directories there if they contain generated code or fixtures.
