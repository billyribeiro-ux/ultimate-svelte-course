## $effect cleanup and memory leak prevention

### Concept

An effect that registers a timer, event listener, or subscription must un-register it when the effect re-runs or the component unmounts. You do this by returning a cleanup function from the effect callback: Svelte calls that function before the next run and at unmount time.

### Why it exists

Forgetting cleanup is the canonical memory leak in frontend code. An orphaned `setInterval` keeps its closure alive forever, which keeps every referenced state and DOM node alive, which prevents garbage collection. Over a session this can grow to hundreds of megabytes. The cleanup contract makes the pairing explicit: set up and tear down in the same place.

### JS/TS deep dive

`setInterval(fn, ms)` returns a numeric handle in the browser; `clearInterval(handle)` cancels it. `addEventListener(event, handler)` pairs with `removeEventListener(event, handler)`. Any resource you acquire in an effect must be released in the returned cleanup function. TypeScript's `number` is the correct type for the browser interval handle.

```svelte
<script lang="ts">
  let seconds = $state(60);
  $effect(() => {
    const id = setInterval(() => { seconds -= 1; }, 1000);
    return () => clearInterval(id);
  });
</script>
<p>{seconds}s</p>
```

### PE7 style notes

The countdown uses a large fluid numeric display via `--text-hero`, centered in a square surface from the `components` layer, with `--dur-fast` on number transitions.

### Mini-build spec

A countdown timer that decrements once per second while running. Start, pause, and reset controls drive the state. The `$effect` that registers `setInterval` returns a cleanup that calls `clearInterval`, so pausing, resetting, or unmounting leaves no orphan timers.

### Verification

- Countdown decrements once per second while running
- Pausing or unmounting stops the interval (verified by a console log in cleanup)
- Repeated mount/unmount cycles show flat memory in a DevTools Memory snapshot
