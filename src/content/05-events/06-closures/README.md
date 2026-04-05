## Closures in event handlers

### Concept

A closure is a function that remembers the variables from the scope where it was created. When an `{#each}` block defines a handler that references the current item, each iteration produces a fresh closure bound to its own item. Svelte's compiler turns this into correct per-item behaviour automatically.

### Why it exists

Handlers often need the specific item they belong to — clicking row 3 should open row 3, not the last row. In naive JavaScript loops this was the classic "closure in loop" bug where every iteration captured the same mutable variable. Svelte's each block gives each iteration its own scope, so closures capture the right value by construction.

### JS/TS deep dive

Inside `{#each items as item}`, `item` is a fresh const-like binding per iteration. An arrow function `onclick={() => toggle(item.id)}` captures that specific `item`. Contrast with a `for (var i = 0; ...) { el.onclick = () => console.log(i); }` in plain JS where every handler logs the final `i` because `var` is function-scoped. `let` fixes this in modern JS because it is block-scoped; Svelte's each bindings are always fresh per-iteration.

```svelte
{#each items as item (item.id)}
  <button onclick={() => toggle(item.id)}>{item.title}</button>
{/each}
```

### PE7 style notes

Each accordion row uses logical properties, OKLCH surface tokens, and a `:focus-visible` outline. The expand/collapse transition is driven by a rotation on the chevron plus an `aria-expanded` toggle. Motion is disabled under `prefers-reduced-motion`.

### Mini-build spec

A five-item accordion. Per-item open state lives in a `Map<string, boolean>` stored in `$state`. Each row's header button owns a closure that captures the row's id and toggles only that entry. Keyboard Enter/Space also toggle (native button semantics).

### Verification

- Opening one section does not affect the others
- Each closure captures the right id
- Enter and Space toggle focused row via native button semantics
