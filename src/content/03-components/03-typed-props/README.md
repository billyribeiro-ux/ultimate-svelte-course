## TypeScript interfaces for props

### Concept

A TypeScript `interface` is a named description of an object's shape. Attaching one to `$props()` tells the compiler exactly which props are allowed, what types they must be, and which string literals count as valid variants. Misuse becomes a compile-time error, not a runtime surprise.

### Why it exists

JavaScript lets any value flow anywhere — a `count` prop could silently receive `"five"` and break rendering. Interfaces document the contract between parent and child in a machine-checked way. They also power editor autocomplete: type `<Button ` and press Ctrl-Space to see every valid prop and every valid value.

### JS/TS deep dive

An `interface` lives only at compile time — it is erased before the code ships. Union string types like `'primary' | 'secondary' | 'ghost'` create a closed set: the compiler refuses any other string. Combined with `$props()`, the destructured variables inherit those precise types automatically, so `variant` inside your component is not just `string` but one of three literals — narrow enough to `switch` on exhaustively.

```svelte
<script lang="ts">
  interface Props {
    label: string;
    variant: 'primary' | 'secondary' | 'ghost';
    size: 'sm' | 'md' | 'lg';
  }
  const { label, variant, size }: Props = $props();
</script>
```

### PE7 style notes

Variants map to `data-variant` attributes and CSS uses attribute selectors with native nesting: `.btn { &[data-variant='primary'] { ... } }`. Every colour is an OKLCH token. Hover styles are gated behind `@media (hover: hover)`.

### Mini-build spec

Build the first version of `Button.svelte` with `label`, `variant` (`'primary' | 'secondary' | 'ghost'`), and `size` (`'sm' | 'md' | 'lg'`) props. The demo renders a 3×3 grid — three variants across, three sizes down.

### Verification

- `pnpm check` fails if you write `variant="huge"` in the demo
- Nine buttons render with visually distinct styles
- Hovering over `variant` in VS Code shows the literal union
