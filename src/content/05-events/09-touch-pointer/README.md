## Touch and pointer events

### Concept

Touch-capable devices generate their own event stream: `ontouchstart`, `ontouchmove`, `ontouchend`. Modern browsers also unify mouse, touch, and pen under pointer events: `onpointerdown`, `onpointermove`, `onpointerup`. Pointer events are the recommended default because one handler set covers all input modalities.

### Why it exists

Touchscreens dominate the web. A click-only UI ignores swipe, pinch, and long-press affordances that users expect. Pointer events let you write one implementation that works with a mouse in devtools, a finger on a phone, and a stylus on a tablet. Combined with `@media (hover: hover)` you can disable hover-dependent affordances on devices where hover is unreliable.

### JS/TS deep dive

`PointerEvent` extends `MouseEvent` with `pointerType` (`'mouse' | 'touch' | 'pen'`), `pressure`, and `isPrimary`. A swipe detector stores `pointerdown` start coordinates, updates position on `pointermove`, and on `pointerup` computes the delta and decides whether to dismiss. The 44px minimum touch-target rule comes from Apple HIG and WCAG — elements smaller than that are hard to tap accurately.

```ts
let startX = 0;
function onDown(e: PointerEvent): void {
  startX = e.clientX;
}
function onUp(e: PointerEvent): void {
  const delta = e.clientX - startX;
  if (Math.abs(delta) > 60) dismiss(delta > 0 ? 'right' : 'left');
}
```

### PE7 style notes

Card uses logical properties throughout. The drag transform is a reactive `translateX()` driven by `$state`. Snap-back animation uses `--ease-spring`. Hover cues live inside `@media (hover: hover)`. Animation suppressed under `prefers-reduced-motion`.

### Mini-build spec

A swipe-to-dismiss card. `onpointerdown` captures the pointer and records the start X. `onpointermove` updates a reactive offset. `onpointerup` either dismisses (offset past threshold) or snaps back. Works identically with mouse drag and touch drag.

### Verification

- Mouse drag and touch drag both move and dismiss the card
- Releasing before the threshold snaps back with animation
- Hover cues only appear with a real mouse
