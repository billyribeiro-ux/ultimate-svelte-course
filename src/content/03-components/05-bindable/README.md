## $bindable() — two-way binding

### Concept

A bindable prop lets the child write back to the parent's state. The child declares `let { value = $bindable('') }: Props = $props()` and mutates `value` normally; the parent opts in with `bind:value={myState}`. Both sides see the same value.

### Why it exists

Form inputs are the canonical case: the user types, the DOM fires an `input` event, the new string must reach the parent's state. Without two-way binding, every input component needs boilerplate — a value prop plus an `oninput` callback, wired up manually. `$bindable()` collapses that into one declaration and one `bind:` directive.

### JS/TS deep dive

`$bindable()` is a rune that marks a specific prop as writable from inside the component. The argument is the default value when the parent does not bind. The parent's `bind:value={x}` is syntactic sugar: Svelte's compiler generates the two-way wiring. Because `value` is bindable, it must be declared with `let` (not `const`).

```svelte
<script lang="ts">
  interface Props { value?: string; placeholder?: string }
  let { value = $bindable(''), placeholder = '' }: Props = $props();
</script>

<input class="input" {placeholder} bind:value />
```

### PE7 style notes

The `<input>` uses `inline-size: 100%` (logical property), `min-block-size: 2.75rem` (44px touch target), and a focus ring via `outline` with an OKLCH focus token. Invalid state is a `data-invalid` attribute styled in the scoped `<style>` block.

### Mini-build spec

Build `Input.svelte` with a bindable `value`, an optional `label`, `placeholder`, and an `invalid` flag. The demo binds it to `$state('')`, shows live character count via `$derived`, and flips the border red through `invalid` while the value has between 1 and 2 characters.

### Verification

- Typing updates the parent's displayed character count in real time
- Removing `bind:` and using `value={x}` stops propagation
- TS infers `value` as `string` inside the child
