## $derived: pure computed values

### Concept

`$derived(expression)` creates a value that is automatically recomputed whenever any reactive dependency used inside the expression changes. Dependencies are tracked automatically by reading them during evaluation — no dependency array, no manual subscription.

### Why it exists

In a cart, the subtotal is a function of the line items; the tax is a function of the subtotal; the total is a function of both. Writing this with effects and manual assignment is error-prone (you can forget to update the total when the subtotal changes). `$derived` models it as a pull-based computation: you declare "total is subtotal plus tax" and Svelte guarantees it stays correct, recomputing only when a dependency changes and only when someone reads the derived value.

### JS/TS deep dive

The expression inside `$derived` must be a single expression and must be *pure* — no side effects, no mutation of other state, no DOM access. Purity is what lets Svelte cache the result and recompute only when inputs change. The type is inferred from the expression: `$derived(items.reduce((s, i) => s + i.price, 0))` is `number`.

```svelte
<script lang="ts">
  interface Line { name: string; price: number; qty: number; }
  const lines = $state<Line[]>([]);
  const subtotal = $derived(lines.reduce((s, l) => s + l.price * l.qty, 0));
  const tax = $derived(subtotal * 0.08);
  const total = $derived(subtotal + tax);
</script>
```

### PE7 style notes

The cart uses `layout` layer for the two-region split (items + totals) and `components` layer for line item styling. The totals block uses `--color-surface-2` as an elevated surface, with tabular numerals for price alignment.

### Mini-build spec

A cart component with a `$state` array of line items (add, remove, change quantity) and three derived values — subtotal, tax, total — displayed in a totals block. Numbers update live on any change.

### Verification

- Changing a line item's quantity updates all three totals instantly
- Inserting a `console.log` inside a `$derived` fires only when dependencies change
- `pnpm check` passes
