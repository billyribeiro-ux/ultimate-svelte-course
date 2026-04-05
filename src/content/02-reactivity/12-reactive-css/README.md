## Reactivity in CSS via directives and custom properties

### Concept

Svelte has three directives that let reactive state drive styling: `class:name={boolean}` toggles a class, `style:property={value}` sets an inline style, and assigning to a CSS custom property via `style:--name={value}` bridges reactive JS into the cascade. Combined, they let you animate and re-theme components at 60fps without rewriting markup.

### Why it exists

Writing `class={cond ? 'active' : ''}` works but is verbose and conflates string building with semantic intent. Directives are declarative: each one says "this class or style is controlled by this reactive expression". Custom properties are especially powerful because they cascade through scoped styles, so a parent can expose a slider's value as `--hue` and every descendant selector can read it with `var(--hue)`.

### JS/TS deep dive

`class:active={isActive}` compiles into a tracked update that adds or removes the class whenever `isActive` changes — no string concatenation. `style:--hue={hue}` sets an inline custom property on the element, which scoped rules can read via `var(--hue)`. The types flow naturally: the expression must be compatible with the directive (boolean for `class:`, string or number for `style:`).

```svelte
<script lang="ts">
  let l = $state(70), c = $state(0.15), h = $state(260);
</script>
<div class="swatch" style:--l="{l}%" style:--c={c} style:--h={h}></div>
<style>
  .swatch { background: oklch(var(--l) var(--c) var(--h)); }
</style>
```

### PE7 style notes

The mixer lives in the `components` layer, uses fluid spacing between sliders, and every slider output feeds directly into OKLCH custom properties — pure PE7 with no utility classes and no hex values.

### Mini-build spec

An OKLCH color mixer with three sliders (L, C, H) driving a swatch whose background is `oklch(var(--l) var(--c) var(--h))`. Values are bridged via `style:--l`, `style:--c`, `style:--h`. Live color updates as the sliders move and the current values display as text below.

### Verification

- Moving any slider updates the swatch color live
- Inspecting the element shows inline `--l`, `--c`, `--h` custom properties updating
- Scoped CSS reads the custom properties via `var()` with no inline `background` set
