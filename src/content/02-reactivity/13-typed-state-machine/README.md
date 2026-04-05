## TypeScript with reactive state: union types and state machines

### Concept

Everything about runes works with TypeScript generics. `$state<T>(initial)` constrains the state type, `$derived` infers from its expression, and discriminated union types let you model finite-state machines (`'idle' | 'loading' | 'error' | 'success'`) where the compiler rejects invalid states at compile time.

### Why it exists

Async UIs constantly hold combinations of flags — `isLoading`, `error`, `data` — that can drift into impossible states like "loading AND error AND has data". Union types collapse the possibility space: the status is exactly one of four strings, and the compiler enforces exhaustive handling in every switch. This turns a whole class of runtime bugs into compile errors.

### JS/TS deep dive

A discriminated union is a type like `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: User } | { status: 'error'; message: string }`. TypeScript narrows the type inside each branch of a check on `.status`, so in the `'success'` branch you can access `.data` safely but not `.message`. Pair this with `$state` and you get a bulletproof typed state machine.

```ts
interface User { name: string; }
export type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; message: string };
```

### PE7 style notes

Each status renders a different visual — idle hint, spinner, error panel with `--color-danger`, success card with `--color-success` — all in the `components` layer with fluid padding.

### Mini-build spec

A status panel with a typed state machine and four buttons (load, succeed, fail, reset) that transition between states. Each state renders a distinct UI. All transitions are compiler-checked through a discriminated union stored in `state.ts`.

### Verification

- Accessing `s.data` outside the `'success'` branch produces a TS error
- All four states render distinct UI without visual overlap
- `pnpm check` passes and an exhaustive switch on `s.status` type-checks
