## Form accessibility and keyboard navigation

### Concept

A fully accessible interactive element supports keyboard operation (Tab, Arrow, Enter, Escape), announces state via ARIA attributes (`aria-expanded`, `aria-selected`, `aria-activedescendant`), and manages focus explicitly. Svelte gives you `onkeydown`, `onfocus`, `onblur`, and direct DOM refs to implement all of this natively.

### Why it exists

Many users — including keyboard-only users, screen reader users, and power users — never touch a mouse. A custom select component that only responds to clicks is broken for them. Proper keyboard support is a legal requirement in many jurisdictions and simply better UX for everyone. The WAI-ARIA Authoring Practices document specifies the expected keys for every widget pattern.

### JS/TS deep dive

`tabindex="0"` makes an element focusable in source order; `-1` makes it programmatically focusable only. The active-descendant pattern keeps focus on the combobox while tracking highlight via `aria-activedescendant={optionId}`. `onkeydown` handles ArrowDown and ArrowUp to move highlight, Enter to commit, Escape to close, Home and End to jump. With `noUncheckedIndexedAccess` the array access `options[highlight]` returns `T | undefined` and must be narrowed.

```ts
function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    highlight = (highlight + 1) % options.length;
  }
  if (e.key === 'Enter') {
    const choice = options[highlight];
    if (choice !== undefined) commit(choice);
  }
  if (e.key === 'Escape') close();
}
```

### PE7 style notes

Focus rings use a prominent `:focus-visible` outline with `--color-focus`. Highlighted option uses `--color-primary` as a background tint. Touch targets are at least 44px. No `outline: none` without a replacement.

### Mini-build spec

A lesson-scope `LessonSelect.svelte`: a combobox trigger showing the current value, a listbox with six options. Pattern: `role="combobox"` + `aria-expanded` + `aria-controls` on the button; `role="listbox"` with `aria-activedescendant` on the panel; each item `role="option"` with `aria-selected`. Keyboard: ArrowDown/ArrowUp move highlight, Home/End jump, Enter commits via `onchange(value)` callback prop, Escape closes, Tab moves focus out. The Demo wires it to a `$state` value.

### Verification

- Every interaction works without touching the mouse
- `aria-expanded`, `aria-selected`, `aria-activedescendant` update correctly
- Escape closes and returns focus to the trigger
