## $state with arrays and mutation methods

### Concept

Arrays passed to `$state()` become deeply reactive just like objects. Mutation methods (`push`, `pop`, `splice`, `sort`, `shift`, `unshift`) work naturally because the Proxy intercepts writes to numeric indices and to `length`. Non-mutating methods (`map`, `filter`, `find`, `some`, `every`) work because they only read.

### Why it exists

In immutable-style frameworks, you must replace the array on every change (`items = [...items, newItem]`). Svelte's Proxy lets you call `items.push(newItem)` directly, matching how the standard library was designed and removing the mental tax of "must spread to update". This is a major ergonomic win for list-heavy UIs.

### JS/TS deep dive

JavaScript arrays are objects with numeric keys and a `length` property. The Proxy intercepts both, which is why `push` (writes to `items[items.length]` then increments `length`) is fully tracked. Destructuring (`const [first, ...rest] = items`) reads the array reactively. Generic typing is `$state<string[]>([])` or inference from a literal.

```svelte
<script lang="ts">
  const tags = $state<string[]>(['svelte', 'typescript']);
  let input = $state('');
  const add = () => { if (input.trim()) { tags.push(input.trim()); input = ''; } };
</script>
```

### PE7 style notes

Tag pills use a fluid gap and a motion token for their hover transition. The remove button sits on the logical inline-end of each pill. Layout wraps with flex and a fluid gap from the token set.

### Mini-build spec

A tag-list component with an input to add tags, an X button on each tag to remove it via `tags.splice(i, 1)`, and a filter input using `tags.filter(...)` to derive the visible list. New tags appear in the list immediately.

### Verification

- `push`, `splice`, and assignment to indices all trigger updates
- The filter input narrows the rendered tags without mutating the source array
- `pnpm check` passes and the type is `string[]`
