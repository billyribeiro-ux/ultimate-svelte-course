## Optional props and defaults

### Concept

Props can be required or optional. A `?` after a property name in the interface marks it optional — the parent is free to omit it. Destructuring provides a runtime default for the omitted case, so the component never sees `undefined` unless you want it to.

### Why it exists

Real components have sensible defaults: a Badge is usually pill-shaped, usually neutral-coloured, usually medium-sized. Forcing every caller to specify every prop would be noisy. Optional props let you expose knobs while keeping the common case a one-liner: `<Badge label="New" />`.

### JS/TS deep dive

In TypeScript, `color?: 'neutral' | 'success'` is shorthand for `color: 'neutral' | 'success' | undefined`. Providing a default in destructuring (`color = 'neutral'`) replaces `undefined` with the fallback at the moment of assignment, so the local `color` variable narrows back to the non-undefined union. This two-step pattern — optional in the interface, default in the destructure — is idiomatic and type-safe.

```svelte
<script lang="ts">
  interface Props {
    label: string;
    color?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
  }
  const { label, color = 'neutral', size = 'md', rounded = true }: Props = $props();
</script>
```

### PE7 style notes

Badge variants are dispatched via `data-color`, `data-size`, and `data-rounded` attribute selectors inside a single scoped `<style>` block. Colours come from OKLCH tokens and `color-mix(in oklch, ...)`. Rounded corners swap between `--radius-full` and `--radius-sm` via the `data-rounded` attribute.

### Mini-build spec

Build `Badge.svelte` with `label`, optional `color`, optional `size`, and optional `rounded`. The demo shows one minimal call (`<Badge label="New" />`) plus a matrix that exercises every colour across every size, including a square variant per colour.

### Verification

- Omitting `color` renders neutral
- Omitting `rounded` renders fully pill-shaped
- TS error if `label` is omitted
