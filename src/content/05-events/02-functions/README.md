## JS functions deeply — parameters, return values, arrow functions

### Concept

A JavaScript function is a reusable block of code that can take inputs (parameters) and produce an output (return value). Two syntaxes exist: `function name() {}` (declaration) and `const name = () => {}` (arrow expression). Functions are first-class values — you can pass them around, store them, and return them from other functions.

### Why it exists

Event handlers are functions. Array methods take functions. Async operations deliver values to functions. Without functions as values, none of the patterns in this module would exist. Understanding them deeply — especially the difference between declarations and arrows — prevents subtle bugs later (notably around `this`, which we deliberately avoid).

### JS/TS deep dive

Arrow functions inherit `this` from their enclosing scope (lexical `this`), which for our purposes means we never use `this` at all — prefer arrows for everything except top-level named utilities. Parameters and return values get annotated explicitly: `(e: MouseEvent): void => { ... }`. A function that returns nothing has return type `void`; one that never returns has type `never`.

```ts
const save = (title: string, body: string): void => {
  console.log(title, body);
};
function clear(): void {
  /* ... */
}
```

### PE7 style notes

Toolbar is a flex row with a fluid gap token and logical padding. Buttons use canonical PE7 colors and a `:focus-visible` outline. Touch targets meet the 44px minimum. Status region animates the most recent action name in via motion tokens, disabled under `prefers-reduced-motion`.

### Mini-build spec

A toolbar with five buttons (New, Save, Copy, Paste, Clear). Each button is wired to its own typed named `(e: MouseEvent) => void` handler. A status region below displays the most recently triggered action's label, updated live.

### Verification

- Each button updates the status text with its action name
- All handlers share the signature `(e: MouseEvent) => void`
- No inline arrow functions are used in attribute positions
