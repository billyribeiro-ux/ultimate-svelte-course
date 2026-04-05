## TypeScript with async — `Promise<T>` return types

### Concept

`Promise<T>` is a generic type: the `T` is the value that the promise resolves to. Annotating an async function's return type as `Promise<User>` tells callers exactly what they will get. Generics on fetch wrappers let one function type every endpoint precisely.

### Why it exists

Without generics, every fetch helper returns `unknown` or `any`, forcing callers to assert types manually — error-prone and noisy. A generic wrapper pushes the type parameter up to the caller so each call site stays sharp and no `any` ever enters the codebase.

### JS/TS deep dive

Declaring `async function getJson<T>(url: string): Promise<T>` makes `T` a caller-supplied parameter. Inside, `res.json()` returns `Promise<unknown>`, so you cast to `T` at the boundary with a documented assertion — deeper code can then rely on the type. Even better, validate with a runtime schema (zod or valibot) and assert the parsed value is `T`. For this lesson we keep the cast explicit and deliberate.

```ts
async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new ApiError(res.status, url);
  return (await res.json()) as T;
}
const user = await getJson<User>('/api/me');
```

### PE7 style notes

Profile card uses the standard token palette. No hard-coded colours, no inline styles.

### Mini-build spec

Build a fully typed user profile loader: `getJson<User>()` in `./playground/api.ts`, `{#await}` with a typed `{:then user}`, render using scoped styles. Zero `any` in the entire module.

### Verification

- `pnpm check` passes with strict settings
- Ripgrep for `any` in the lesson files returns nothing
- Profile renders with correct typing inside `{:then}`
