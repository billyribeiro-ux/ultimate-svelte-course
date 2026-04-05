## Responsive components — mobile-first and container queries

### Concept

A responsive component adapts to its surrounding space, not the viewport. Container queries (`@container (min-width: 30rem)`) let a component restyle based on its parent's width — the same component can be a horizontal row in a wide sidebar and a stacked card in a narrow column. Mobile-first means the default styles target the smallest container; container queries only add layout for larger ones.

### Why it exists

Viewport media queries break composition: a component placed in a narrow sidebar still thinks the viewport is wide and overflows. Container queries solve this decisively. Combined with `@media (hover: hover)` for pointer capability and 44px minimum touch targets for accessibility, you get components that genuinely work everywhere — desktop, mobile, Tauri window, embedded sidebar.

### JS/TS deep dive

Container queries require declaring a containment context: `container-type: inline-size` on the component root. Inside the scoped `<style>`, `@container (min-width: 30rem) { ... }` targets that context. The component still accepts props for content, but layout decisions move entirely to CSS. There is no JavaScript measuring involved — the browser does it natively and efficiently.

```svelte
<article class="card">...</article>
<style>
  .card {
    container-type: inline-size;
    display: grid;
    gap: var(--space-sm);
    @container (min-width: 30rem) {
      & { grid-template-columns: 14rem 1fr; }
    }
  }
</style>
```

### PE7 style notes

Base styles (stacked, single column) live in the component's scoped `<style>`. The 30rem container breakpoint expands to a horizontal layout. Every interactive element has `min-block-size: 2.75rem`. Logical properties (`inline-size`, `padding-inline`, `block-size`) throughout. Hover is gated behind `@media (hover: hover)`.

### Mini-build spec

Build `ResponsiveCard.svelte` with image, title, price, description, and buy button. The demo renders three instances inside containers of increasing width (20rem, 40rem, full) — identical markup, three different layouts driven entirely by container width.

### Verification

- Resizing the browser does not affect layout — only the containing column does
- The buy button measures at least 44px in devtools
- No viewport `@media` breakpoints for layout
