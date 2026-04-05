## {:else if} and {:else} — multi-branch

### Concept

Inside `{#if}`, you can chain any number of `{:else if}` branches and a final `{:else}` fallback. Exactly one branch renders; the rest are unmounted. Branches are checked top to bottom, matching JavaScript's `if`/`else if`/`else` semantics.

### Why it exists

Many UIs have more than two states. A data fetch is `idle`, `loading`, `success`, or `error` — four mutually exclusive outcomes. A switch-like chain of `{:else if}` on a discriminated union is type-safe, exhaustive, and exactly as deep as the data demands.

### JS/TS deep dive

A TypeScript string-literal union (`type Status = 'idle' | 'loading' | 'error' | 'success'`) combined with sequential `{:else if status === 'loading'}` checks gives exhaustiveness: forgetting a branch leaves the variable typed with the remaining values, which you can catch by assigning to `never` in the final `{:else}`. This pattern makes invalid states unrepresentable.

```ts
type Status = 'idle' | 'loading' | 'error' | 'success';
let status = $state<Status>('idle');
```

### PE7 style notes

Each status maps to a token-driven badge. `idle` uses `--color-fg-muted`, `loading` uses `--color-primary`, `error` uses `--color-danger`, `success` uses `--color-success`. The loading dot pulses via `@keyframes` that respects `prefers-reduced-motion`.

### Mini-build spec

Build a `StatusBadge` showing a dot, label, and optional spinner for each of the four statuses. The demo has four buttons that set the status manually.

### Verification

- Each button swaps the badge instantly
- TypeScript errors if you pass a status outside the union
- Reduced-motion users see a static dot
