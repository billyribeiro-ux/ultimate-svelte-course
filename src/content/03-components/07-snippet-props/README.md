## Passing snippets as props

### Concept

Snippets become truly useful when a parent passes them into a child as props. The child's interface lists them with the `Snippet` type from `svelte`, and the parent provides them either as named attributes or as direct children placed between the opening and closing tags of the component (mapping to the implicit `children` prop).

### Why it exists

A Modal component should not know what its body looks like — that is the caller's concern. By accepting a snippet prop, Modal controls structure (backdrop, dialog box, close button) while the caller controls content. Parameterised snippets let the child pass data back up: a `List` component hands each row snippet the current item.

### JS/TS deep dive

The `Snippet` generic from `svelte` encodes the parameter tuple: `Snippet<[]>` takes none, `Snippet<[item: Item]>` takes one. The special prop name `children` is automatically populated by any markup placed between the opening and closing tags of the component. Rendering still uses `{@render children()}` — there is no implicit output.

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props { title: string; children: Snippet }
  const { title, children }: Props = $props();
</script>
```

### PE7 style notes

Modal uses `position: fixed`, `inset: 0`, and `backdrop-filter: blur(6px)` in its scoped `<style>`. Entrance uses `--dur-fast` with `--ease-out`, and `prefers-reduced-motion: reduce` disables the animation. The close button meets 44px minimum touch target.

### Mini-build spec

Build `Modal.svelte` with a `title` prop, a required `children: Snippet`, an optional `footer: Snippet`, and a bindable `open` flag. The demo toggles `open` with a Button and supplies the dialog body directly as markup between `<Modal>` tags.

### Verification

- Child content renders inside the modal shell
- TS errors if `children` is omitted
- Escape key closes the modal
