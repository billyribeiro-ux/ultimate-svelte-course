## $state.raw for non-deep reactivity

### Concept

`$state.raw()` creates a value that is only reactive at the top level: reassigning the whole value triggers updates, but mutating properties inside it does not. The value is stored as-is, with no Proxy wrapping.

### Why it exists

Deep reactivity has a cost — every nested object access allocates a Proxy on first read. For large immutable datasets (a 10,000-row table, a parsed JSON blob from an API) this overhead is wasted because you never mutate individual rows; you only ever swap the whole array. `$state.raw` lets you opt out of deep tracking and keep Svelte's update mechanism fast while still re-rendering when the reference changes.

### JS/TS deep dive

With `$state.raw`, you must replace the value to trigger updates: `data = newArray`, not `data.push(...)`. The underlying value is the literal object you passed, with no wrapping, so any external code that holds a reference sees the same identity. Typing is identical to `$state`: `let rows = $state.raw<Row[]>([])`.

```svelte
<script lang="ts">
  interface Row { id: string; name: string; score: number; }
  let rows = $state.raw<Row[]>([]);
  const loadA = () => (rows = datasetA);
</script>
```

### PE7 style notes

The table uses the `layout` layer for grid structure and `components` layer for row styling. Mobile-first: on narrow viewports rows collapse to a two-column list; above a breakpoint they render as a proper table.

### Mini-build spec

A data table that renders up to 500 rows from `$state.raw`. Two buttons swap between dataset A and dataset B. Initial render and swaps are notably faster than the equivalent `$state` version because no Proxies are allocated.

### Verification

- Swapping datasets re-renders the table
- Mutating `rows[0].name = 'x'` does NOT trigger a re-render (proving opt-out)
- `pnpm check` passes
