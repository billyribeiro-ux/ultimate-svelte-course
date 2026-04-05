## Promises and async/await — manual state tracking

### Concept

A Promise is a JavaScript object representing a value that is not available yet — it will resolve to a value later or reject with an error. `async function` declares a function that returns a Promise; `await expr` pauses inside that function until `expr` resolves and then continues with the resolved value. `fetch(url)` returns a Promise for an HTTP response.

### Why it exists

JavaScript runs on a single thread — if a function blocked waiting for the network, the whole UI would freeze. Promises let slow operations run in the background and deliver their result via callbacks scheduled on the event loop. `async/await` makes that callback code look synchronous without being synchronous.

### JS/TS deep dive

`await` can only appear inside `async` functions (or top-level in modules). The type of `await promise` is the resolved value: `await fetch(url)` has type `Response`. Chain `.json()` to parse the body, which itself returns a Promise. Errors propagate — a rejected promise throws at the `await` point, catchable with `try/catch`.

```ts
async function loadUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as User;
}
```

### PE7 style notes

Loading state uses a skeleton element with a `@keyframes shimmer` animation. A `@media (prefers-reduced-motion: reduce)` block disables the keyframe animation for sensitive users. Error box uses the `--color-danger` token.

### Mini-build spec

Build a fetcher that manually tracks `status`, `data`, and `error` in three separate `$state` variables, calls a simulated `loadUser` async function, and switches between loading, error, and data with `{#if}` chains. Deliberately verbose — lesson 4.8 cuts the code in half.

### Verification

- Initial render triggers the fetch and shows a skeleton
- Success branch shows the parsed user
- Triggering a forced error shows the error UI
