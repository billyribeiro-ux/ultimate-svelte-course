## Forwarding events from child to parent

### Concept

A reusable component often needs to expose the native events of its root element to its parent. The Svelte 5 pattern is plain callback props: declare `onclick: (e: MouseEvent) => void` in the `Props` interface and pass it to the underlying element. No dispatcher, no special forwarding syntax — just a function prop.

### Why it exists

A `Button` component should work as a drop-in replacement for `<button>`. That means any `onclick` you write on `<Button onclick={...} />` must fire exactly as it would on a native button. Forwarding by callback prop is simpler and more typed than the old event-dispatcher pattern and gives you the exact same mental model for every event.

### JS/TS deep dive

You can forward every native button event at once by extending `HTMLButtonAttributes` from `svelte/elements` — the interface already contains `onclick`, `onpointerenter`, `onfocus`, `onblur`, and many more. Combine with `{...rest}` to forward every property the parent did not explicitly name. This gives native-element ergonomics for free.

```ts
import type { HTMLButtonAttributes } from 'svelte/elements';
interface Props extends HTMLButtonAttributes {
  label: string;
}
let { label, ...rest }: Props = $props();
```

### PE7 style notes

The lesson-scope `LessonButton.svelte` uses canonical PE7 tokens, logical properties, a 44px minimum touch target, and a `:focus-visible` outline. This is a lesson-local component that lives under the lesson folder — the shared UI library is owned by Module 3.

### Mini-build spec

Build `LessonButton.svelte` in this lesson's `playground/` folder. Its Props interface extends `HTMLButtonAttributes` and adds a required `label`. The demo wires three separate instances to typed parent handlers for `onclick`, `onpointerenter`, and `onfocus`, and logs every trigger into a live event log.

### Verification

- All three event types fire from the parent handlers
- TypeScript refuses unknown handler names on the component
- The button renders with full native-button attribute typing
