## {#each} with keys — stable reconciliation

### Concept

A keyed each block is `{#each items as item (item.id)}` — the expression in parentheses is a stable unique identifier. Svelte uses keys to match DOM nodes to array elements across updates, moving existing nodes rather than destroying and recreating them.

### Why it exists

Without a key, Svelte falls back to positional matching: the element at index 0 stays at index 0. If you reorder an array, Svelte updates the text of every node rather than moving nodes — which destroys focus, breaks animations, and resets component state. Keys fix this by tracking identity.

### JS/TS deep dive

The key must be a primitive (string or number) and unique across the array; using the index as a key is equivalent to no key at all. A stable key usually comes from the backing data — a database ID, a UUID, or a slug. Inside a keyed each, component instances persist across reorders, which matters when those components hold `$state`.

```svelte
{#each todos as todo (todo.id)}
  <TodoRow {todo} />
{/each}
```

### PE7 style notes

The demo renders two columns side by side so the contrast is visible. Rows use `--color-surface-2` and a tokenised border; the focused input gets the standard `--color-focus` ring.

### Mini-build spec

Build a reorderable list of five items with a "shuffle" button. Render it twice side by side: once with `(item.id)`, once without. Each row contains an `<input>` to visualise focus loss on the unkeyed version.

### Verification

- Focus an input in each column, then shuffle
- The unkeyed column loses visible focus to a different row's content
- The keyed column keeps focus on the same logical item
