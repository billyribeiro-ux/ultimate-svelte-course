## Nested `{#each}` — hierarchical data

### Concept

Each blocks nest freely: the inner block iterates a property of the outer item. This models any tree-shaped data — categories with products, threads with replies, days with events. Both levels can be keyed and destructured independently.

### Why it exists

Real data is rarely flat. A product catalogue groups items by category; a calendar groups events by day. Nesting each blocks expresses the hierarchy directly, avoiding flattening and reshaping code in the `<script>` block.

### JS/TS deep dive

Nested interfaces encode the structure: `Category` has a `products: Product[]` field. The inner `{#each category.products as product (product.id)}` infers `product` as `Product`. Performance matters at scale — every inner iteration costs work — so memoise expensive derived values with `$derived` at the outer level when possible.

```ts
interface Product { id: string; name: string; price: number; }
interface Category { id: string; title: string; products: Product[]; }
const catalog: Category[] = [/* ... */];
```

### PE7 style notes

Each category is a section with a sticky header (`position: sticky; inset-block-start: 0`). The inner grid uses `auto-fill`; the outer layout uses vertical stacking with fluid gap tokens.

### Mini-build spec

Render three categories (Snacks, Drinks, Toys) each with four products. Category title sticks to the top on scroll inside the demo container.

### Verification

- Twelve products render in three sections
- Category headers stick on scroll within the demo
- Both loops are keyed
