## {#if} — conditional rendering and JS boolean logic

### Concept

`{#if condition}...{/if}` mounts its contents only when `condition` is truthy and unmounts them when it becomes falsy. The condition is any JavaScript expression, so boolean operators (`&&`, `||`, `!`), comparisons (`===`, `>=`), and function calls are all fair game. The DOM nodes are genuinely created and destroyed, not just hidden.

### Why it exists

UIs are conditional by nature: show a loading spinner while waiting, show errors when things break, show content when data arrives. Without a conditional block you would use CSS `display: none` and pay the cost of rendering invisible DOM. `{#if}` lets Svelte skip that work entirely and keeps the DOM minimal.

### JS/TS deep dive

JavaScript's truthiness rules matter: `0`, `''`, `null`, `undefined`, and `NaN` are falsy; everything else (including `[]` and `{}`) is truthy — this trips up beginners coming from Python. Use strict equality `===` over `==` to avoid coercion surprises. TypeScript narrows types inside an `{#if}` branch: `if (user)` inside the block, `user` is narrowed from `User | null` to `User`.

```ts
const score = $derived(password.length * 10 + (hasDigit ? 20 : 0));
const strength = $derived<'weak' | 'medium' | 'strong'>(
  score < 30 ? 'weak' : score < 60 ? 'medium' : 'strong'
);
```

### PE7 style notes

Strength levels map to `data-strength` attributes styled via nested selectors. Weak, medium, and strong use `--color-danger`, `--color-warning`, and `--color-success` respectively — OKLCH tokens with comparable perceptual weight so no single state dominates.

### Mini-build spec

Build a password strength indicator: one `<input>` bound to a `$state('')`, a computed `strength` derived from length and character variety, and three conditional visual states rendered via `{#if}`/`{:else if}`.

### Verification

- Empty password shows a hint, no strength bar
- Weak, medium, and strong swap as you type
- TypeScript narrows `strength` to a literal union everywhere it is used
