## $derived.by for multi-statement derivations

### Concept

`$derived.by(() => { ... })` accepts a function whose body may contain multiple statements (locals, loops, early returns) and whose return value is the derived value. Use it whenever a single expression becomes unreadable or impossible.

### Why it exists

Real derivations often need intermediate variables: filter first, then sort, then paginate. Forcing it all into one expression hurts readability. `$derived.by` keeps the same tracking semantics as `$derived` but lets you write normal imperative code inside the callback. The callback still must be pure.

### JS/TS deep dive

The callback is a parameterless function returning the computed value. TypeScript infers the return type from the function body. Dependencies are tracked by what the callback reads, exactly as with `$derived`. The purity rule still applies: no mutation of external state, no side effects.

```svelte
<script lang="ts">
  interface Item { id: string; name: string; score: number; }
  const items = $state<Item[]>(fixtures);
  let query = $state('');
  let page = $state(0);
  const results = $derived.by(() => {
    const filtered = items.filter(i => i.name.includes(query));
    const sorted = [...filtered].sort((a, b) => b.score - a.score);
    const start = page * 10;
    return sorted.slice(start, start + 10);
  });
</script>
```

### PE7 style notes

The results list uses `components` layer row styling with fluid vertical rhythm. Pagination controls live in a `layout` layer footer region with logical margin tokens.

### Mini-build spec

A search-results component with a query input, a results list, and prev/next pagination. The filtered-sorted-paginated list is one `$derived.by`. The demo runs smoothly over a 60-item typed fixture dataset.

### Verification

- Typing in the query filters results instantly
- Prev/next cycles through pages without losing query state
- Sorting is stable across re-renders
