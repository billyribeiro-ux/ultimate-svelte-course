## $props() — passing data in

### Concept

`$props()` is the Svelte 5 rune that declares what data a component accepts from its parent. You call it once at the top of `<script>` and destructure the result. The parent passes data via HTML-style attributes, e.g. `<Avatar src="/me.jpg" alt="Me" size={64} />`.

### Why it exists

Without props, a component is a fixed block of HTML — reusable only if every instance looks identical. Props turn a component into a function: same structure, different data. `$props()` replaces the old Svelte 4 `export let name` syntax because runes give a single, explicit, typed API for every reactive primitive in the language.

### JS/TS deep dive

Destructuring is a JavaScript feature: `const { a, b } = obj` pulls named fields out of an object into local variables. `$props()` returns one object containing every attribute the parent passed, and you destructure it to name them. Defaults use the standard `=` destructuring syntax. Because it is one expression, TypeScript infers or checks the whole shape at once.

```svelte
<script lang="ts">
  interface Props { src: string; alt: string; size?: number }
  const { src, alt, size = 48 }: Props = $props();
</script>

<img {src} {alt} style="--avatar-size: {size}px" />
```

### PE7 style notes

Avatar sizes are driven by a CSS custom property written from the prop: `style="--avatar-size: {size}px"`. The scoped `<style>` block reads `inline-size: var(--avatar-size)` so every pixel decision lives in CSS, not inline. Border radius uses the `--radius-full` token for a true circle.

### Mini-build spec

Build `Avatar.svelte` with `src`, `alt`, and `size` props. Render a circular image using `border-radius: var(--radius-full)` and `object-fit: cover`. The demo renders four avatars: sizes 32, 64, 128, and one with no size at all (default 48).

### Verification

- All four avatars render at correct pixel sizes
- Omitting `size` defaults to 48
- Editor autocomplete lists `src`, `alt`, `size` when typing `<Avatar `
