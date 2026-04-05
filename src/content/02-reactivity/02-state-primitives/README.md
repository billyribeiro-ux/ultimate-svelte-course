## $state with primitive types

### Concept

`$state()` called with a primitive (`string`, `number`, `boolean`) returns a tracked version of that primitive. You read and write it with ordinary syntax: `count` to read, `count = count + 1` or `count++` to write.

### Why it exists

Primitives in JavaScript are immutable by value — you cannot mutate a number, only replace it. Svelte's compiler rewrites every assignment to a `$state` variable into a tracked set operation, so `count++` (which desugars to `count = count + 1`) becomes a reactive write without you thinking about it. This makes reactive primitives feel identical to ordinary variables, flattening the learning curve.

### JS/TS deep dive

TypeScript infers the type from the initial value: `let count = $state(0)` is inferred as `number`. You can widen the type explicitly with a generic: `let mode = $state<'on' | 'off'>('off')`. The compiler does not require you to use `.value` or any accessor — it rewrites the source to use accessors internally on your behalf.

```svelte
<script lang="ts">
  let on = $state<boolean>(false);
  const label = $derived(on ? 'ON' : 'OFF');
</script>
<button class:on onclick={() => (on = !on)}>{label}</button>
```

### PE7 style notes

The toggle uses a `class:on` binding to drive an OKLCH background transition on the `--dur-base` timing token. The component sits in the `components` layer with logical padding and a full pill radius.

### Mini-build spec

A toggle-switch component: a boolean `$state`, a button that flips it on click, and a CSS transition on `background-color` between two OKLCH token colors. The label updates live with a derived string.

### Verification

- Clicking the button flips the state and the background color transitions smoothly
- TypeScript infers `boolean` without an explicit annotation
- `pnpm check` passes
