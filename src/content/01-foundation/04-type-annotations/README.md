## TypeScript primitives and variable declarations

### Concept

A type annotation is a promise to the compiler about what kind of value a variable holds. The three JavaScript primitives you meet first are `string` (text), `number` (any numeric value including floats), and `boolean` (`true` or `false`). You attach a type with a colon after the variable name: `const age: number = 34`.

### Why it exists

Without types, JavaScript silently accepts `"5" + 5` and returns `"55"`. TypeScript rejects that mixture before your code ever runs, turning whole categories of runtime bugs into red squiggles in your editor. For a beginner this is training wheels; for a professional it is a specification. Annotations also document intent — future you (and your editor) always know what a value holds without guessing.

### JS/TS deep dive

`const` declares a binding that cannot be reassigned; `let` declares one that can. Prefer `const` by default and only reach for `let` when reassignment is genuinely needed. TypeScript *inference* means the compiler guesses the type from the initial value: `const age = 34` is inferred as `number` without you writing `: number`. *Annotations* are required whenever inference cannot see the type — function parameters, empty arrays, uninitialized variables — and are useful documentation on public API boundaries even when inference would succeed.

```ts
const name: string = 'Ada';
const age: number = 34;
const active: boolean = true;

// Inferred — equivalent to : number
const score = 99;

// Compile error: Type 'string' is not assignable to type 'number'.
// const broken: number = 'oops';
```

### PE7 style notes

The stats card uses `--text-lg` for the name, `--text-sm` for labels, and `--space-md` between rows. The `active` boolean toggles a status pill between `--color-success` and `--color-fg-muted`. Layout is a single-column flex stack — mobile-first, no breakpoints.

### Mini-build spec

A `Demo.svelte` with three typed constants — `name: string`, `age: number`, `active: boolean` — rendered as a stats card. The `active` flag drives a status pill that reads "Active" or "Inactive" via a ternary expression and swaps background colors accordingly.

### Verification

- All three variables have explicit type annotations
- Changing `const active: boolean = true` to `const active: boolean = 'yes'` produces a TypeScript error
- `pnpm check` passes with zero errors
- Toggling `active` between `true` and `false` in source flips the rendered pill text and color
