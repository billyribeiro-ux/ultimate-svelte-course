## Scoped style blocks and how Svelte isolates CSS

### Concept

Svelte automatically scopes every selector inside a component's `<style>` block by appending a unique hash class (e.g. `.card.svelte-x7a9b2`). Two components can both declare `.card` and they will not collide because the compiler rewrites each to a different hashed selector. Scoping is the default; you opt out with `:global(selector)` when you truly need global reach.

### Why it exists

Global CSS is the default web platform behavior, and it scales badly — every class name becomes a shared resource across every file in the project. Methodologies like BEM and CSS Modules impose manual naming conventions to avoid collisions. Svelte solves the problem mechanically: the compiler guarantees no collision without the developer having to invent unique names. When you genuinely need a global rule (resetting body margin, targeting third-party markup), `:global(.selector)` is the escape hatch.

### JS/TS deep dive

There is no runtime cost — scoping happens at compile time. The compiler generates a class like `svelte-a1b2c3` and appends it to every selector *and* every matching element in the markup. CSS custom properties (`--my-color`) cross the scoping boundary because they cascade normally — which is how parent components pass style values into children without breaking scoping. This is the "bridge" you will lean on in every later lesson.

```svelte
<!-- CardA.svelte -->
<div class="card">A</div>
<style>
	.card { background: var(--color-primary); }
	/* compiles to: .card.svelte-a1b2c3 { ... } */
</style>
```

### PE7 style notes

Both demo cards live conceptually in the `components` layer and consume the same tokens. Despite identical `.card` class names, DevTools reveals different hashed selectors. The parent Demo renders both side-by-side with a responsive grid.

### Mini-build spec

Two sibling components — `CardA.svelte` and `CardB.svelte` — both defining a `.card` class with completely different styles (different backgrounds, borders, padding). The parent `Demo.svelte` renders both in a grid. Open DevTools Elements panel, find the `.card.svelte-<hash>` selectors, and observe the different hashes.

### Verification

- Both `.card` elements render with distinct styles, no overrides
- DevTools shows `.card.svelte-<hash>` with different hashes per component
- Removing the `<style>` from one card does not affect the other
- A `:global(selector)` rule inside one component affects elements outside that component
