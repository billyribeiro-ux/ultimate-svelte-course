## Custom events and the callback prop pattern

### Concept

When a child wants to notify a parent of something custom (an item was selected, a toast should show, a dialog was confirmed), Svelte 5 uses callback props: the parent passes a typed function, the child calls it with the relevant data. This replaces the old `createEventDispatcher` API entirely.

### Why it exists

`createEventDispatcher` gave loosely typed custom events that needed listener syntax to consume. Callback props are just function calls with full TypeScript inference — simpler, more direct, and identical to how every other framework handles it. When you need to return data upward without two-way-binding an entire piece of state, this is the right tool.

### JS/TS deep dive

The callback's signature encodes the payload precisely: `onshow: (msg: string, level: 'info' | 'error') => void`. The parent writes `<Triggers onshow={(msg, level) => { /* typed */ }} />`. For optional events, use `?` in the interface and call with `onshow?.(msg, level)` so omitting the prop is safe. This is more flexible than `$bindable` when the parent does not need a persistent synced value but merely wants to react to discrete events.

```ts
interface Props {
  onshow: (msg: string, level: 'info' | 'error') => void;
}
let { onshow }: Props = $props();
```

### PE7 style notes

Toasts stack in the block-end-inline-end corner using logical properties. Enter and exit animations use motion tokens and fall back to instant under `prefers-reduced-motion`. Each toast auto-dismisses after four seconds; the timer is cleared if the user dismisses it manually first.

### Mini-build spec

A two-component toast system living in this lesson folder: `ToastHost.svelte` displays a list of toasts and exposes a `ondismiss` callback, and `ToastTriggers.svelte` exposes an `onshow(msg, level)` callback upward. The Demo page wires them together: it holds a `toasts` array in `$state`, passes the show handler to triggers, and renders the host.

### Verification

- Clicking an Info or Error button calls the typed `onshow` callback
- Multiple toasts stack without overlapping
- Dismiss button cancels the auto-dismiss timer for that toast
