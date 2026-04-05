## $effect.pre for pre-DOM-update work

### Concept

`$effect.pre(() => { ... })` is the same as `$effect` except the callback runs *before* Svelte flushes DOM updates, not after. Use it for work that must see the current DOM before it changes — measuring scroll position, capturing focus, reading layout rects.

### Why it exists

Some UX patterns require reading the DOM as it exists *now* and then applying a correction after the update. The canonical example is a chat log: when a new message arrives, if the user is scrolled to the bottom you want to auto-scroll; if they are scrolled up reading history, you want to preserve their position. Both require measuring `scrollTop` before the update. A regular `$effect` would run too late — after the DOM has already scrolled.

### JS/TS deep dive

`$effect.pre` follows the same rules as `$effect`: return a cleanup function, track dependencies automatically, runs on every change. The only difference is timing. 95% of the time you want `$effect`; reach for `.pre` only when measurement is required.

```svelte
<script lang="ts">
  let list: HTMLDivElement | undefined = $state();
  const messages = $state<string[]>([]);
  let atBottom = $state(true);
  $effect.pre(() => {
    messages.length;
    if (!list) return;
    atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 4;
  });
  $effect(() => {
    if (atBottom && list) list.scrollTop = list.scrollHeight;
  });
</script>
```

### PE7 style notes

The list uses `layout` layer for the scrolling region with a logical `max-block-size` and `overflow-y: auto`, plus `components` layer for message bubble styling.

### Mini-build spec

A scroll-preserving log that auto-scrolls to the bottom when new items arrive *only if the user was already at the bottom*. A button pushes a new message on every click. Scroll up, click, and observe that the reading position is preserved.

### Verification

- Adding a message while at bottom auto-scrolls
- Adding a message while scrolled up preserves the exact scroll position
- `$effect.pre` runs before `$effect` on each update
