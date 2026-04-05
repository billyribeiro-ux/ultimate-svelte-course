## preventDefault and stopPropagation

### Concept

Every DOM event has a default browser behaviour and a propagation path. `e.preventDefault()` cancels the default (e.g. stops a form submission from navigating, stops a link from following its href). `e.stopPropagation()` stops the event from bubbling up to ancestor handlers. Both are methods on the event object.

### Why it exists

Custom form handling needs to prevent the browser's native submission. A dropdown that closes on outside click should not close when you click *inside* it — the inner click handler calls `stopPropagation()` so the document-level close handler never sees the event. These are the two primary tools for taking control of event flow.

### JS/TS deep dive

Unlike Svelte 4 which offered `on:click|preventDefault` modifiers, Svelte 5 expects you to call the methods yourself in the handler body. This is more explicit and integrates with any arbitrary logic. Remember: prevent-default is about the browser's reaction, stop-propagation is about the event travelling to other handlers — they are unrelated and independently toggleable.

```ts
function onSubmit(e: SubmitEvent): void {
  e.preventDefault();
  saveForm();
}
```

### PE7 style notes

The dropdown panel is absolutely positioned beneath the trigger, uses a token-driven shadow, an OKLCH surface background, and a subtle scale-in transition on open. All interactive elements meet the 44px minimum and use `:focus-visible` focus rings.

### Mini-build spec

A custom dropdown. Clicking the trigger toggles the panel open. A document-level click handler closes it when clicking outside. Clicking inside the panel — including toggling a checkbox inside it — does NOT close the menu, thanks to `stopPropagation` on the panel's click handler.

### Verification

- Outside clicks close the panel
- Clicks inside the panel do not close it
- The checkbox inside the panel can be toggled without dismissing
