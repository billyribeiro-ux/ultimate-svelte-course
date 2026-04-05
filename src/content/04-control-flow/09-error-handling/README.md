## Error handling with {:catch} and try/catch

### Concept

JavaScript errors are values thrown with `throw` and caught with `try { ... } catch (e) { ... }`. Anything can be thrown — strings, numbers, objects — so the caught value is `unknown` by default in TypeScript strict mode. You narrow it with `instanceof Error` or custom shape checks before using its properties.

### Why it exists

Production apps must degrade gracefully when the network fails, the server is down, or the response is malformed. Silent failures or raw stack traces erode trust. Typed error handling — catch, narrow, surface a friendly message, offer retry — turns failure into part of the UX.

### JS/TS deep dive

A custom error class `class ApiError extends Error {}` creates a named subtype you can detect with `instanceof`. Inside the `catch`, you narrow with `if (e instanceof ApiError) { ... }` and then get full typed access to its `status` and `url` fields. `{:catch err}` in templates passes the same `unknown` value — narrow it in the template expression or in a helper before rendering.

```ts
try {
  return await fetchUser(id);
} catch (e: unknown) {
  if (e instanceof ApiError) throw e;
  throw new Error('Unknown failure');
}
```

### PE7 style notes

Error UI: an icon, message, and retry button. Retry is a full-width button in the danger variant. A gentle shake keyframe plays once on error, and reduced-motion disables it.

### Mini-build spec

Build a robust API fetcher with a custom `ApiError` class in `./playground/errors.ts`, a typed async function that throws it on non-2xx responses, `{#await}` with `{:catch}` rendering a friendly error UI, and a retry button that re-triggers the fetch by changing a `$state` attempt counter.

### Verification

- Forcing a failure shows the error UI with the status code
- Retry refetches without page reload
- The catch parameter is typed `unknown` and narrowed via `instanceof ApiError`
