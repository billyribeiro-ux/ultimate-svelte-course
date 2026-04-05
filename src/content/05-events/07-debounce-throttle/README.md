## Debouncing and throttling

### Concept

Debounce delays a function until a period of silence has passed — perfect for "fire once the user stops typing". Throttle enforces a maximum call rate — perfect for scroll or resize handlers. Both are implemented with `setTimeout` and a stored timer id; no library required.

### Why it exists

Raw input events fire on every keystroke. Sending a search request per keystroke wastes bandwidth and produces flicker. A 300ms debounce means the request fires once, 300ms after the last keystroke — the user perceives instant feedback without the overhead. Throttle is the right tool when you need regular updates but not every single one (e.g. updating a progress bar during scroll).

### JS/TS deep dive

A debounced function is a higher-order function: it takes your function and returns a wrapped version that closes over a timer id. Each call clears the previous timeout and sets a new one. The generic signature `<T extends (...a: never[]) => void>(fn: T, ms: number) => T` preserves the original parameter types through the wrapper. Clean up the timer on component destroy via the `$effect` return to avoid late fires after unmount.

```ts
export function debounce<T extends (...a: never[]) => void>(fn: T, ms: number): T {
  let id: ReturnType<typeof setTimeout> | undefined;
  return ((...args: never[]) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  }) as T;
}
```

### PE7 style notes

The search input uses logical padding tokens, a focus ring via `:focus-visible`, and an inline spinner animation from a scoped `@keyframes` rule. Counters for keystrokes and fetches use tabular numerals so they do not jitter.

### Mini-build spec

A search input with a 300ms debounce. Typing updates a keystroke counter instantly; a mock fetch runs only 300ms after the last keystroke, updating a separate fetch counter and a result list. The typed generic `debounce<T>` helper lives in a sibling `debounce.ts` file.

### Verification

- Typing quickly fires one fetch for many keystrokes
- Typing slowly fires more fetches
- Pending timer is cleared on unmount via the effect cleanup
