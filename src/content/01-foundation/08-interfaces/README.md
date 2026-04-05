## TypeScript interfaces: defining object shapes

### Concept

An `interface` in TypeScript describes the shape of an object — which properties it has and what type each property holds. Once defined, you can annotate any variable with that interface name and the compiler enforces the shape. Interfaces are the backbone of every real application's type system.

### Why it exists

Objects are the primary way JavaScript groups related data, and without type information the compiler cannot know whether `user.name` is a string, a number, or undefined. Interfaces give names to the shapes you use repeatedly, so the type appears once in your definition and is reused everywhere. This eliminates the class of bug where one caller spells a field `userName` and another spells it `username` — the compiler catches it before you run the code.

### JS/TS deep dive

A `type` alias can do almost everything an `interface` can, but interfaces support declaration merging and are the idiomatic choice for public object shapes. Optional properties use `?`, meaning the property may be present or `undefined`. `readonly` properties prevent reassignment after construction. Literal union types like `'admin' | 'member'` restrict a field to a finite set of strings. An interface is a compile-time construct — it disappears when TypeScript emits JavaScript, so it costs nothing at runtime.

```ts
export interface User {
	readonly id: string;
	name: string;
	role: 'admin' | 'member';
	avatar?: string;
	bio?: string;
}

const alice: User = {
	id: 'u_1',
	name: 'Alice',
	role: 'admin'
	// avatar and bio omitted — still valid
};
```

### PE7 style notes

The profile card uses the `components` layer via scoped `<style>`, a single-column mobile-first layout that becomes two columns above `min-width: 40rem` (the only concession to breakpoints in this lesson), an OKLCH accent border driven by `--color-primary`, and `--radius-xl` on the avatar placeholder. Missing `bio` renders nothing — not even an empty paragraph.

### Mini-build spec

A `Demo.svelte` that imports `interface User` from a sibling `types.ts`, instantiates two users — one with a bio and avatar, one without — and renders both as profile cards. The `bio` paragraph and the `avatar` image only appear when the fields exist, using conditional rendering with `{#if}`.

### Verification

- `interface User` declared in `types.ts` with required and optional properties
- Omitting `name` from a `User` literal produces a TypeScript error referencing the interface
- The card without `bio` renders without an empty paragraph element
- `pnpm check` passes with strict mode
