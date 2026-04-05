## Template expressions: passing data into markup

### Concept

Inside Svelte markup, curly braces `{ ... }` delimit an expression slot where any valid JavaScript or TypeScript expression may be evaluated and its result rendered as text (or bound to an attribute). This is the bridge between the `<script>` block's typed data and the DOM. Whatever the expression evaluates to is inserted into the DOM.

### Why it exists

Templates need to display dynamic data. Rather than invent a new templating mini-language, Svelte lets you use the language you already know — JavaScript — for everything inside the braces. The mental model stays tiny: if it is a valid JS expression, it works. String interpolation, ternaries, method calls, arithmetic, and property access all compose naturally.

### JS/TS deep dive

A template expression is not a statement; you cannot put `if` or `let` inside the braces. You can put ternaries (`cond ? a : b`), function calls (`price.toFixed(2)`), property access (`plan.features[0]`), and template literals. `{@html expression}` renders raw HTML — dangerous with untrusted input because of cross-site scripting (XSS), so only use it with data you control or sanitize first. `{@const name = expr}` declares a block-local constant scoped to a `{#each}` or `{#if}` block, useful for naming an expression computed from iteration variables.

```svelte
<script lang="ts">
	interface Plan {
		name: string;
		priceCents: number;
		features: readonly string[];
		featured: boolean;
	}

	const plan: Plan = {
		name: 'Pro',
		priceCents: 1900,
		features: ['Unlimited projects', 'Priority support', 'Team seats'],
		featured: true
	};
</script>

<article class="plan" class:featured={plan.featured}>
	<h3>{plan.name}</h3>
	<p>${(plan.priceCents / 100).toFixed(2)}/mo</p>
	<ul>
		{#each plan.features as feature}
			<li>{feature}</li>
		{/each}
	</ul>
</article>
```

### PE7 style notes

The pricing card uses `components` layer via scoped `<style>`, fluid spacing tokens, a `:is(.featured)` modifier that swaps in `--shadow-lg` and `--color-primary` for the border, and a `class:featured` binding to toggle between states. Mobile-first: single column, then a two-card grid above `min-width: 40rem`.

### Mini-build spec

A `Demo.svelte` with two typed `Plan` values rendered side by side. One plan is `featured: true` and gains the elevated styling via a `class:` directive. Price is formatted inline with `(priceCents / 100).toFixed(2)`. Features are rendered from a `readonly string[]` inside an `{#each}` block. The badge text switches via a ternary expression.

### Verification

- `(priceCents / 100).toFixed(2)` runs correctly inside the template
- The ternary swaps the badge text between the two cards
- `class:featured` toggles the elevated styling visibly
- `pnpm check` passes with `readonly string[]` features preserved
