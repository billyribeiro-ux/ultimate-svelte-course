## Event handlers in Svelte 5

### Concept

In Svelte 5, event handlers are plain lowercase HTML attributes: `onclick={handleClick}`, `oninput={handleInput}`, `onsubmit={handleSubmit}`. There is no colon, no custom directive syntax — they align exactly with how the HTML spec writes inline event attributes, but the value is a real JavaScript function, not a string.

### Why it exists

Svelte 4 used `on:click`, a bespoke syntax that worked but diverged from HTML. Svelte 5 unifies with the platform: what you learn as an event attribute in plain HTML is what you write in Svelte. That reduces the mental model to "JS function in a standard HTML attribute, compiled efficiently". It also makes component props and DOM events indistinguishable syntactically, which is exactly what they are semantically.

### JS/TS deep dive

The value of `onclick` must be a function of type `(e: MouseEvent) => void`. Inline arrow functions work (`onclick={() => count++}`) but allocate on every render, so prefer named handlers for anything non-trivial. Svelte typechecks these against `svelte/elements` DOM interfaces, so misspelling `onClikc` is caught immediately.

```ts
let count = $state(0);
function handleLike(e: MouseEvent): void {
  count += 1;
}
```

### PE7 style notes

The heart icon animates with a scoped `@keyframes pop` scale pulse triggered by toggling a `data-liked` attribute from the handler. Motion tokens respect `prefers-reduced-motion`. Touch targets meet the 44px minimum via `min-block-size` and `min-inline-size` on the button.

### Mini-build spec

A like button with a counter and an animated heart. A typed named handler increments the counter and retriggers the pop animation. Two independent buttons prove that each component instance owns its own state.

### Verification

- Clicking increments the counter and the heart pops once per click
- Two buttons animate and count independently
- Changing the handler signature to the wrong type produces a TS error
