## Snippets — `{#snippet}` and `{@render}`

### Concept

A snippet is a named chunk of template you can render somewhere else. You define one with `{#snippet name()}...{/snippet}` and call it with `{@render name()}`. Snippets replace Svelte 4 slots and are strictly more powerful — they accept typed parameters, live in ordinary scope, and can be passed as values.

### Why it exists

Many components have multiple "holes" the parent wants to fill — a card with a header area and a body area, a table with a header row and a data row. Slots worked but were their own sublanguage with limited typing. Snippets reuse the existing component/function mental model: a snippet is essentially a typed local function that returns markup.

### JS/TS deep dive

A snippet is compiled to a function value. `{@render header()}` is a call expression: the renderer invokes the function and splices its output into the DOM at that spot. Because snippets are values, you can pass them as props, store them in variables, or conditionally render them. Parameters use square-bracket tuple syntax in the type: `Snippet<[user: User]>` means "a snippet that takes one `User` argument".

```svelte
<Card>
  {#snippet header()}<span>Profile</span>{/snippet}
  {#snippet body()}<p>Hello world</p>{/snippet}
</Card>
```

### PE7 style notes

`Card.svelte` defines regions as CSS grid template areas (`grid-template-areas: 'header' 'body' 'footer'`). Gap and padding use spacing tokens (`--space-sm`, `--space-md`). The card surface uses `--color-surface`, `--color-border`, and `--shadow-sm`.

### Mini-build spec

Build `Card.svelte` that accepts `header`, `body`, and optional `footer` snippet props. The demo passes three inline snippets via the component tag body — a title, a paragraph of explanation, and a footer line.

### Verification

- Both regions render in their correct grid positions
- Removing one `@render` removes only that region
- No `slot` syntax anywhere
