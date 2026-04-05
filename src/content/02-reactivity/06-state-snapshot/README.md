## $state.snapshot for serialization

### Concept

`$state.snapshot(value)` takes a reactive value and returns a plain, non-reactive JavaScript copy. It recursively unwraps every Proxy so the result is a pure object tree you can JSON-serialize, log, send to an API, or compare by value.

### Why it exists

Reactive state is wrapped in Proxies, and Proxies have subtle differences from plain objects: `JSON.stringify` mostly works but devtools logs show the Proxy wrapper, structured cloning can behave unexpectedly, and sending a Proxy over the wire via `postMessage` throws. Snapshot is the clean boundary: anywhere you leave the reactive world — network, storage, worker — you snapshot first.

### JS/TS deep dive

`$state.snapshot` returns a deep clone. The returned object has the same TypeScript type as the input but with all Proxies removed. This means snapshots are safe to hand to `JSON.stringify`, to `structuredClone`, or to `fetch(url, { body: JSON.stringify($state.snapshot(form)) })`. It is not a subscription — call it at the moment you need a plain copy.

```svelte
<script lang="ts">
  interface Form { name: string; tags: string[]; }
  const form = $state<Form>({ name: '', tags: [] });
  const submit = () => {
    const plain = $state.snapshot(form);
    console.log(JSON.stringify(plain));
  };
</script>
```

### PE7 style notes

The form uses `components` layer styling with fluid inputs and a primary action button from the token colors. A `<pre>` block displays the logged JSON using the monospace stack from `--font-mono`.

### Mini-build spec

A form with two inputs, a reactive tags array, and a submit button. On submit, snapshot the form, `JSON.stringify` it, and display the result in a `<pre>` below. Compare logging the raw `form` (shows Proxy) vs the snapshot (shows plain object) in DevTools.

### Verification

- Logged snapshot appears as a plain object in DevTools (no Proxy wrapper)
- `JSON.stringify` on the snapshot produces clean JSON
- Modifying the form after snapshotting does not mutate the captured copy
