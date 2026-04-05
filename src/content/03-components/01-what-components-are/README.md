## What components are and why they exist

### Concept

A component is a single `.svelte` file that bundles markup, behaviour, and scoped CSS into a reusable, importable unit. You import it like any JavaScript module and mount it as a custom HTML tag: `<ProfileCard />`. Every Svelte app is a tree of components rooted at `+page.svelte`.

### Why it exists

Copy-pasting HTML blocks is how small projects become unmaintainable. If the same card markup appears five times and you fix a bug in one copy, the other four still break. A component turns that repeated block into a single source of truth: edit once, fix everywhere. It also gives you a natural unit for reasoning, testing, and styling in isolation, and it is the only sane way to grow a codebase past a few hundred lines.

### JS/TS deep dive

`import ProfileCard from '$lib/components/ui/ProfileCard.svelte'` is the same ES module import you would use for a `.ts` file. Vite compiles the `.svelte` file into a JavaScript module that default-exports a component. TypeScript understands the import because `svelte-check` generates typings from the file's `<script lang="ts">` block, so editor autocomplete and compile errors work the same as with plain TypeScript.

```svelte
<script lang="ts">
  import ProfileCard from '$lib/components/ui/ProfileCard.svelte';
</script>

<ProfileCard name="Ada" role="Engineer" bio="..." avatarUrl="/ada.png" />
```

### PE7 style notes

`ProfileCard.svelte` carries its own scoped `<style>` block, consuming OKLCH colour tokens (`--color-surface`, `--color-border`), spacing (`--space-md`), and radii (`--radius-lg`). Every interactive link meets the 44px minimum touch target via `min-block-size`, and hover styles are gated behind `@media (hover: hover)`.

### Mini-build spec

Extract the portfolio card into a `ProfileCard.svelte` under `src/lib/components/ui/`. The demo imports it and renders two instances with different data, proving the same component is the source of truth for every caller.

### Verification

- `pnpm check` reports zero errors
- Editing padding in `ProfileCard.svelte` updates both demo instances at once
- Deleting the file produces a TypeScript error in the importer
