## What Svelte is and why it compiles

### Concept

Svelte is a UI compiler, not a runtime framework. You write `.svelte` files describing what the DOM should look like, and at build time Svelte transforms them into small, surgical JavaScript modules that update the DOM directly. There is no "Svelte library" shipped to the browser the way React or Vue ship theirs.

### Why it exists

Traditional frameworks ship a virtual DOM diffing engine to every visitor, meaning every user downloads the framework even if the page only renders a headline. Svelte asks a sharper question: if we know at build time exactly what changes, why ship a general-purpose engine at all? The result is smaller bundles, less JavaScript to parse, and faster interactivity — especially on mobile networks.

Svelte the compiler is distinct from **SvelteKit** (the application framework for routing, SSR, and data loading) and from **Node** (the JavaScript runtime Vite uses during development). You will use all three together, but only Svelte runs at build time to emit component code.

### JS/TS deep dive

A compiler is a program that reads one language and writes another. Your `.svelte` file is the source language; the output is a JavaScript module exporting a component function. "JavaScript" is the scripting language the browser natively executes; "TypeScript" is JavaScript with static type annotations that are stripped at compile time. Because Svelte compiles, TypeScript annotations cost zero runtime bytes — they vanish before the browser ever sees them.

```ts
// A .svelte file compiles, in simplified form, to a module like this.
// No framework imports — just direct DOM instructions.
export default function Hello(target: HTMLElement): void {
	target.innerHTML = '<h1>Hello, Svelte</h1>';
}
```

### PE7 style notes

The mini-build lives in the `components` layer conceptually (via a scoped `<style>` block), reads an OKLCH surface color from `--color-surface`, and uses a fluid `--text-hero` token for the heading. Mobile-first: the baseline styles target a 320px viewport with zero media queries.

### Mini-build spec

A single `Demo.svelte` rendering a styled "Hello, Svelte" card. Open DevTools, find the compiled module in the Sources panel, and note the absence of a framework bundle — just a compact component module.

### Verification

- DevTools Network tab shows no `svelte.js` runtime bundle over 10KB
- Compiled `.js` module in the Sources panel contains the literal string `Hello, Svelte`
- Background color reports as `oklch(...)` in the Computed styles panel
- Scoped `<style>` produces a `svelte-*` hash class on the selector
