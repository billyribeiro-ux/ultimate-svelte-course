## TypeScript event types

### Concept

The DOM defines dozens of event types: `MouseEvent` for clicks, `KeyboardEvent` for keypresses, `InputEvent` for typing, `SubmitEvent` for forms, `FocusEvent` for focus. TypeScript ships them all. Using the precise type in your handler signature gives you typed access to event-specific fields: `e.key`, `e.ctrlKey`, `e.currentTarget`, `e.clientX`.

### Why it exists

A generic `Event` parameter works but robs you of autocomplete on the useful fields. Worse, it hides mistakes — reading `e.key` on a `MouseEvent` silently compiles as `undefined`. Specific event types catch this at compile time and document intent.

### JS/TS deep dive

`e.currentTarget` is typed as the element you attached the handler to (e.g. `HTMLInputElement` when attached to an input). `e.target` is `EventTarget | null` and often needs narrowing via `instanceof`: prefer `e.currentTarget` when you want the element that owns the handler. For a keyboard shortcut, combine modifier booleans (`e.ctrlKey`, `e.metaKey`, `e.shiftKey`) with `e.key` — the typed string for the logical key pressed.

```ts
function onKeydown(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
}
```

### PE7 style notes

Shortcut display uses `<kbd>` elements styled with OKLCH surface tokens, a subtle inset shadow, and fluid typography. The recognised command row uses a brief highlight animation bound to a `$state` pulse key.

### Mini-build spec

A keyboard shortcut detector. Attach `onkeydown` to `window` via `$effect` with proper `removeEventListener` cleanup. Display the last shortcut pressed (e.g. `Ctrl+K`). A small list of known commands flashes the matching row when recognised.

### Verification

- Pressing Ctrl+K or Cmd+K is detected and shown
- `e.key` autocompletes as a string
- The effect cleans up its listener on unmount
