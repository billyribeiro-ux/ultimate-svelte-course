## PE7 CSS architecture: layers, OKLCH, mobile-first

### Concept

PE7 is the course's house CSS architecture. It uses six native CSS `@layer`s in strict cascade order (`reset`, `tokens`, `base`, `layout`, `components`, `animations`), OKLCH as the exclusive color space, a complete token system expressed as custom properties, fluid `clamp()` values for spacing and type, and a mobile-first rule where the unqualified stylesheet targets 320px. All global CSS lives in `app.css`; all component CSS lives in scoped `<style>` blocks.

### Why it exists

CSS specificity wars — where one rule loses to another because of an extra class somewhere — are the largest source of styling bugs in real projects. `@layer` gives you explicit, ordered buckets: anything in `components` beats anything in `base`, regardless of selector complexity inside those layers. OKLCH replaces the old sRGB color space with a perceptually uniform one, so equal numeric changes correspond to equal visible changes — lightening a color by 10% actually looks 10% lighter. Mobile-first means styles cost nothing on the smallest device and grow with `min-width` queries when needed.

### JS/TS deep dive

No JavaScript in this lesson. You are writing pure CSS using modern features: `@layer`, `oklch()`, CSS custom properties (`--color-surface`), logical properties (`padding-inline`, `margin-block`), and native nesting. Custom properties cascade like any other property, which makes them the bridge between JavaScript state and CSS styling in later lessons.

```css
@layer reset, tokens, base, layout, components, animations;

@layer tokens {
	:root {
		--color-surface: oklch(97% 0.008 260);
		--color-fg: oklch(22% 0.02 260);
		--space-md: clamp(1rem, 0.88rem + 0.6vw, 1.5rem);
		--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
		--radius-md: 0.5rem;
		--dur-fast: 200ms;
	}
}
```

### PE7 style notes

This lesson *is* the style notes — it lays down the tokens every subsequent lesson consumes. Colors, spacing, typography, motion, radii, and shadows all get their baseline values here in `src/app.css` and the imported files under `src/lib/styles/`. The Demo in this lesson is intentionally minimal: it proves the tokens resolve by rendering a small swatch card.

### Mini-build spec

`src/app.css` contains the six `@layer` declarations and imports layer-scoped stylesheets for reset, tokens, base, prose, and motion. The playground Demo renders a single card that consumes half a dozen tokens — surface, primary, border, spacing, radius, shadow — proving that the cascade resolves correctly inside a scoped component.

### Verification

- DevTools "Layers" panel shows all six layers in correct cascade order
- `--color-surface` evaluates to a valid `oklch()` value in computed styles
- Every color in the token file is OKLCH (no hex, no rgb)
- Changing a token in `tokens.css` recolors the demo card on next HMR
