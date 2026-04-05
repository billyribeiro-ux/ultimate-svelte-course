## What state is and why it exists

### Concept

State is data that changes over time during a component's life. A counter, a form input, a toggle — all state. The `$state()` rune wraps an initial value and returns a reactive version that Svelte tracks: any read of it registers a dependency, and any write of it schedules a re-render of everything that depended on it.

### Why it exists

Without an explicit signal, a framework cannot know which variables are meant to be reactive and which are ordinary constants. Older Svelte 3/4 used top-level `let` as the signal, but that conflated plain JavaScript variables with reactive ones and broke down inside `.js` modules. Runes make the signal explicit, work identically in `.svelte` and `.svelte.ts` files, and let the compiler produce highly optimized update code.

### JS/TS deep dive

A rune is not a function — it is compiler syntax that looks like a function. You cannot import `$state`; it is globally available wherever runes are enabled. For primitives, `$state(initial)` returns a value of the same type as `initial`; TypeScript infers it automatically. Reads and writes use plain dot/bracket syntax — no `.value` accessor, no `get()`/`set()` methods. The compiler transforms the usage sites into tracked reads and writes behind the scenes.

```svelte
<script lang="ts">
  let text = $state('');
  const length = $derived(text.length);
</script>
<input bind:value={text} />
<p>{length} characters</p>
```

### PE7 style notes

The character counter sits in the `components` layer for the input shell, uses a fluid spacing token for the gap, and a subtle OKLCH muted color on the count paragraph through `--color-fg-muted`.

### Mini-build spec

A `CharCounter.svelte` component with a `$state` string bound to an `<input>` and a `$derived` length displayed live. Typing in the input updates the count instantly.

### Verification

- Typing in the input updates the count on every keystroke
- Removing `$state` and using plain `let` breaks reactivity
- `pnpm check` passes with inferred types
