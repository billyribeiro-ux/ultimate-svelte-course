## `{#key}` — forcing subtree re-creation

### Concept

`{#key expression}...{/key}` destroys and recreates its contents whenever `expression` changes. It is the opposite of a stable each key: a deliberate reset signal. Use it to replay entrance animations or reinitialise a child component from scratch.

### Why it exists

Sometimes persistence is the wrong default. If you are switching between tabs or profile pages, you want the fade-in animation to replay, any transient child state to reset, and any internal refs to rebind. Wrapping the subtree in `{#key currentTab}` achieves this without manual cleanup.

### JS/TS deep dive

The expression can be any value; Svelte uses referential equality for objects and strict equality for primitives. Because the subtree is fully unmounted and remounted, any `$state` inside resets to its initial value and any `$effect` setups run again. This is an escape hatch — reach for it only when reset is genuinely desired.

```svelte
{#key tab}
  <section in:fade={{ duration: 200 }}>{tab}</section>
{/key}
```

### PE7 style notes

Uses Svelte's `fade` transition with duration from `--dur-base`. The demo container respects `prefers-reduced-motion` via a scoped media rule that disables the animation.

### Mini-build spec

Build a three-tab content switcher. On tab change, the content area replays a fade transition thanks to `{#key currentTab}`.

### Verification

- Each tab change retriggers the fade
- Removing `{#key}` makes the fade run only on the first mount
- Reduced-motion disables the animation entirely
