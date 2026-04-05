## $state with objects (deep reactivity)

### Concept

When you pass an object to `$state()`, Svelte wraps it in a Proxy that makes every property — and every nested property — reactive. Writing `user.name = 'Billy'` triggers re-renders of anything that read `user.name`, without any special API.

### Why it exists

Other frameworks require you to replace the whole object (`setUser({ ...user, name: 'Billy' })`) or use dedicated setters. Svelte's deep Proxy model lets you write natural imperative code that feels like mutating plain JavaScript, while under the hood the Proxy intercepts every set and notifies subscribers. This dramatically reduces boilerplate in forms and settings panels.

### JS/TS deep dive

A `Proxy` is a built-in JavaScript object that wraps a target object and lets you intercept operations like `get` and `set`. Svelte constructs a Proxy tree lazily: nested objects become Proxies only when you first access them, keeping the cost proportional to what you actually read. Typing is straightforward — `$state<User>({...})` or rely on inference from the initial literal.

```svelte
<script lang="ts">
  interface User { name: string; email: string; notify: boolean; }
  const user = $state<User>({ name: '', email: '', notify: true });
</script>
<input bind:value={user.name} placeholder="Name" />
<input bind:value={user.email} placeholder="Email" />
<p>Hello, {user.name || 'stranger'}</p>
```

### PE7 style notes

The settings panel uses a two-column `layout` layer grid at wider viewports (single column on mobile), fluid gap tokens, and component styling for each input row. Surfaces use `--color-surface` and `--color-surface-2` to separate form and preview.

### Mini-build spec

A user-settings panel with three bound fields (name, email, notify toggle) writing into a single `$state<UserSettings>` object. A live preview section on the right mirrors the object state in real time, proving nested reactivity works.

### Verification

- Typing in any input instantly updates the preview
- Mutating `user.name = 'X'` in a handler triggers DOM update
- `pnpm check` passes with strict typing
