## `{#each}` — array iteration and destructuring

### Concept

`{#each items as item}...{/each}` iterates an array and renders its body once per element. You can destructure inline (`as { id, name }`) and capture the index as a second binding (`as item, i`). The array can be any typed array of objects.

### Why it exists

Lists are ubiquitous: contacts, products, messages, notifications, comments. Writing one markup template per item is infeasible; `{#each}` generates the DOM from data. Typed arrays ensure the per-item template only accesses fields the element actually has.

### JS/TS deep dive

The `Contact[]` type is the array generic — shorthand for `Array<Contact>`. Inline destructuring in `{#each contacts as { id, name, email }}` is the same JavaScript destructuring you use in function parameters, lowered by Svelte's compiler. Index `i` is of type `number`. TypeScript infers the element type from the source array, so autocomplete works inside the block.

```ts
interface Contact {
  id: string;
  name: string;
  email: string;
  initials: string;
}
const contacts: Contact[] = [/* ... */];
```

### PE7 style notes

The list uses CSS grid with `grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr))` — a fluid responsive grid with no media queries. Each card uses `--color-surface-2` as its inner surface and tokenised spacing.

### Mini-build spec

Define a typed `Contact[]` of six entries. Render them as a grid of cards showing avatar initials, name, and email. Use destructuring in the `{#each}`.

### Verification

- All six contacts render
- Autocomplete inside the block shows only Contact fields
- Grid reflows fluidly between 1 and 3 columns with no media queries
