## The three blocks: script, markup, style

### Concept

A `.svelte` file is divided into three optional blocks: a `<script lang="ts">` block holding component logic, a markup section containing HTML-like template code, and a `<style>` block containing scoped CSS. The compiler reads all three and fuses them into one JavaScript module. Convention is to order them script, markup, style — top to bottom.

### Why it exists

Single-File Components (SFCs) keep a component's behavior, structure, and appearance in one place. If you need to change the button, you open one file. Contrast this with the traditional split of `.html`, `.js`, and `.css` across three directories, where finding the CSS that styles a specific element becomes an archaeology project. Co-locating related code means related changes happen in a single edit.

### JS/TS deep dive

The `<script>` block runs once per component instance when that instance is created — it is ordinary JavaScript/TypeScript executed in module scope. `lang="ts"` tells the Svelte preprocessor to run the TypeScript compiler over that block, strip the types, and hand the plain JS to the Svelte compiler. The markup block is not HTML; it is a template language that looks like HTML but allows `{expressions}` inside attributes and text. The `<style>` block is automatically scoped to the component (covered in depth in Lesson 1.7).

```svelte
<script lang="ts">
	const name: string = 'Ada';
	const role: string = 'Engineer';
</script>

<article class="card">
	<h2>{name}</h2>
	<p>{role}</p>
</article>

<style>
	.card {
		padding: var(--space-md);
		border-radius: var(--radius-md);
	}
</style>
```

### PE7 style notes

The name-tag card pulls spacing, radius, and surface color tokens from the `tokens` layer. The scoped `<style>` block lives conceptually in the `components` layer. Fluid padding comes from `--space-md`, and the layout is a single-column stack — mobile-first with no breakpoints.

### Mini-build spec

A `Demo.svelte` declaring typed `name` and `role` string constants and rendering them inside a styled name-tag card with a colored border, rounded corners, and fluid padding. No props yet — everything is hard-coded to isolate the three-blocks concept.

### Verification

- Component renders "Ada — Engineer" inside a styled card
- `pnpm check` reports zero TypeScript errors
- Removing the `<style>` block visually strips the card, proving the CSS was scoped to the component
- Replacing `const name: string` with `const name: number` causes a type error
