## {#await} — Svelte's built-in async

### Concept

`{#await promise}` has three phases: the pending block (before `{:then}`), the resolved block (`{:then data}`), and the rejected block (`{:catch error}`). Svelte subscribes to the promise and swaps phases automatically. A short form `{#await promise then data}` skips the pending phase if you do not need one.

### Why it exists

The manual pattern from lesson 4.7 has a lot of moving parts: three state variables, a `try/catch`, an async function, and an effect to kick it off. `{#await}` collapses that into one template block. It also handles the subtle race conditions that manual code gets wrong — if the promise reference changes, Svelte automatically re-subscribes to the new one.

### JS/TS deep dive

`{:then data}` narrows `data` to the promise's resolved type: `Promise<User>` gives you `User` inside the block. `{:catch error}` gives you `unknown` (because any value can be thrown in JavaScript), and you must narrow it yourself before using it. The promise expression is usually a call, e.g. `{#await loadUser(id)}`, so it re-runs whenever `id` changes.

```svelte
{#await loadUser(id)}
  <Skeleton />
{:then user}
  <Profile {user} />
{:catch err}
  <ErrorBox error={err} />
{/await}
```

### PE7 style notes

Same skeleton and error tokens as lesson 4.7, but the `<script>` block visibly shrinks.

### Mini-build spec

Rebuild the lesson 4.7 fetcher with `{#await}`. The `<script>` block should contain just the typed async function and a reactive `userId`.

### Verification

- Side-by-side comparison with 4.7 shows dramatically fewer lines
- Identical UX to lesson 4.7
- Changing the user id re-fetches automatically
