## Component composition patterns

### Concept

Composition means building complex components out of simpler ones rather than one giant component with dozens of props. Small components each solve one problem; larger ones arrange them. Prop spreading (`{...rest}`) forwards unknown attributes to a child element, keeping wrapper components transparent for accessibility and data attributes.

### Why it exists

A 500-line component with 30 props is impossible to test, restyle, or reuse. Composition lets each piece stay under one screen of code and gives you combinatorial reuse — Avatar + Badge + Card compose into a Notification, a UserChip, a Comment, a Toast, all without duplicating logic. The rule of thumb: split when a component grows two distinct responsibilities.

### JS/TS deep dive

`{...rest}` is JavaScript's rest pattern in destructuring: everything not explicitly named ends up in `rest`. With typed props, you extend `HTMLAttributes<HTMLDivElement>` from `svelte/elements` so TypeScript knows `rest` contains valid div attributes. You then apply `{...rest}` to the root element so callers can pass `aria-label`, `class`, or `data-*` through.

```svelte
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  interface Props extends HTMLAttributes<HTMLDivElement> {
    level: 'info' | 'success' | 'warning' | 'danger';
    children: Snippet;
  }
</script>
```

### PE7 style notes

`Notification.svelte` composes `Avatar`, `Badge`, and `Card` from earlier lessons. Its head row is a three-column grid with logical-property gaps. No component in the chain exceeds one screen; all styles use OKLCH tokens.

### Mini-build spec

Build `Notification.svelte` that composes Avatar, Badge, and Card. Props: `user` (name and avatar URL), `level`, `title`, and a `children` snippet for the message body. The demo renders three notifications at different levels, one of which passes `aria-live="polite"` through the spread.

### Verification

- Notification renders composed children in correct regions
- `aria-live="polite"` reaches the root element via rest spread
- No single component exceeds 80 lines
