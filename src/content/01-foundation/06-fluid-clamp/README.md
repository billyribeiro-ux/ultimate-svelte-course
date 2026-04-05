## Fluid typography and spacing with clamp()

### Concept

`clamp(min, preferred, max)` is a CSS function that returns the `preferred` value clipped to the `[min, max]` range. When `preferred` contains a viewport unit like `vw`, the value grows linearly with screen width between the two bounds, giving smooth fluid scaling. A heading can slide from 28px on a phone to 56px on a desktop without a single media query.

### Why it exists

Traditional responsive design uses a staircase of media queries: 16px below 768px, 18px above, 20px above 1280px. Each breakpoint is a visible jump that requires maintenance. `clamp()` replaces the whole staircase with one line. Because it is a pure function of viewport width, every size between 320px and 1920px is handled automatically, and most media queries in a PE7 project simply disappear.

### JS/TS deep dive

There is no TypeScript in this lesson, but the underlying math is worth understanding. `clamp(1rem, 0.5rem + 1.5vw, 1.5rem)` evaluates the middle expression and returns it unless it falls outside the bounds. At a 320px viewport, `0.5rem + 1.5 * 3.2px = 0.5rem + 4.8px ≈ 0.8rem` — below the min, so it clamps to `1rem`. At 1920px it exceeds the max and clamps to `1.5rem`. Between the bounds it grows smoothly. `rem` is relative to the root font size (usually 16px); `vw` is 1% of viewport width.

```css
@layer tokens {
	:root {
		--text-sm: clamp(0.875rem, 0.83rem + 0.22vw, 0.9375rem);
		--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
		--text-xl: clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem);
		--text-hero: clamp(2.5rem, 1.75rem + 3.75vw, 5rem);
	}
}
```

### PE7 style notes

The fluid scale lives entirely in the `tokens` layer. The specimen page reads only tokens — no raw values — so changing `tokens.css` reshapes every example at once. Zero media queries permitted in the playground.

### Mini-build spec

A `Demo.svelte` typography specimen rendering an H1 hero, H2, H3, body paragraph, and caption text using `--text-hero`, `--text-2xl`, `--text-xl`, `--text-base`, and `--text-xs`. Open DevTools responsive mode and drag the viewport from 320px to 1920px — every element scales continuously.

### Verification

- No `@media` rules exist in the demo
- Heading scales visibly from 320px to 1920px
- Minimum size at 320px is legible (body ≥ 16px)
- Computed H1 font-size changes on every pixel of viewport resize between bounds
