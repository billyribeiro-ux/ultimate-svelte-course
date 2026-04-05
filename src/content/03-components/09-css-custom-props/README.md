## CSS custom properties as the bridge

### Concept

A CSS custom property (`--name: value`) is a CSS-level variable that cascades through the DOM. Components expose style knobs as custom properties and read them in their scoped `<style>`; variants are swapped by overriding those custom properties on `data-*` attribute selectors. This is how you get unlimited variants from one component without prop explosion.

### Why it exists

Encoding every visual variant as a prop (`color`, `bgColor`, `borderColor`, `hoverColor`) quickly becomes unmanageable and leaks CSS concerns into TypeScript. Custom properties keep styling in CSS where it belongs. One `Button` with `--btn-bg` and `--btn-fg` tokens can express every variant the design system needs — and responds to dark mode automatically when those tokens reference OKLCH tokens from `@layer tokens`.

### JS/TS deep dive

`var(--btn-bg, var(--color-primary))` reads a cascaded value with a fallback. For variant dispatch, native CSS nesting plus attribute selectors (`&[data-variant='danger'] { --btn-bg: var(--color-danger); }`) keep the mapping declarative. The component's `<script>` contains zero colour literals — it only forwards the typed variant to a `data-variant` attribute.

```svelte
<button class="btn" data-variant={variant}>{label}</button>
<style>
  .btn {
    --btn-bg: var(--color-primary);
    background: var(--btn-bg);
    &[data-variant='danger'] { --btn-bg: var(--color-danger); }
  }
</style>
```

### PE7 style notes

All colours are OKLCH tokens (`--color-primary`, `--color-danger`, `--color-surface-2`, ...). Hover state is computed with `color-mix(in oklch, var(--btn-bg) 85%, black)` and scoped under `@media (hover: hover)`. Transitions respect `prefers-reduced-motion: reduce`.

### Mini-build spec

Extend `Button.svelte` from lesson 3.3 so its four variants (`primary`, `secondary`, `ghost`, `danger`) are expressed entirely via custom-property overrides on `data-variant` selectors inside a single `<style>` block. Add a `disabled` prop. The demo renders all four variants plus a disabled example.

### Verification

- `<script>` contains zero colour values
- Toggling `data-variant` in devtools instantly re-skins the button
- Hover styles disappear on touch devices
