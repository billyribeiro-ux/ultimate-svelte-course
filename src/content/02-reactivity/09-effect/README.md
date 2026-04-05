## $effect: side effects and the JS execution model

### Concept

`$effect(() => { ... })` runs the callback after the component mounts and re-runs it whenever any reactive value read inside the callback changes. Use it for side effects — work that affects the world outside your component's data: setting `document.title`, calling a DOM API, logging, starting timers.

### Why it exists

Some work cannot be expressed as pure derivation because it has external consequences. `$derived` is for values; `$effect` is for actions. Effects run after the DOM has been updated, which is the right moment to read DOM measurements or attach listeners to freshly rendered nodes. Auto-tracking means you do not maintain a dependency list by hand.

### JS/TS deep dive

The effect callback can return a cleanup function, which Svelte calls before the next run and when the component unmounts. This is how you tear down whatever the effect set up. Use `$effect` sparingly — if a computation can be expressed as `$derived`, prefer `$derived`, because derivations are lazier, cached, and harder to get wrong.

```svelte
<script lang="ts">
  let title = $state('Home');
  $effect(() => {
    document.title = title;
  });
</script>
<input bind:value={title} />
```

### PE7 style notes

A single-input demo in the `components` layer with a large fluid heading previewing the current title using `--text-2xl`. A muted caption below explains that the browser tab mirrors the state.

### Mini-build spec

A live document-title updater with one `$state` string bound to an input. An `$effect` writes the value to `document.title`. Watch the browser tab title change as you type.

### Verification

- Typing updates the browser tab title live
- `$effect` fires once on mount and once per change
- Unmounting the component stops updates
