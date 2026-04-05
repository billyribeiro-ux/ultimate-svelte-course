## Project setup with pnpm + SvelteKit 2 + TypeScript strict

### Concept

SvelteKit is the official application framework built on Svelte: it provides file-based routing, server rendering, build tooling via Vite, and conventions for where code lives. `pnpm` is a fast, disk-efficient package manager that uses a content-addressable store so shared dependencies exist only once on disk. Together they give every project the same reproducible starting shape.

### Why it exists

Svelte alone compiles components; it does not tell you how to build a real app with pages, APIs, and production builds. SvelteKit fills that gap with opinionated conventions so every project has the same shape — tutorials, docs, and help from strangers all apply to your setup. Strict TypeScript is non-negotiable in this course because strictness catches entire categories of bugs at compile time and forces you to internalize types instead of papering over them with `any`.

### JS/TS deep dive

`tsconfig.json` is the TypeScript compiler configuration file. The `strict: true` flag enables a bundle of checks — `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and more — that together guarantee you cannot use a value without the compiler knowing its exact shape. A `svelte.config.js` exports a configuration object (or, since Svelte 5.54, a function returning one) consumed by the Vite plugin at build time. The function form lets the config read environment variables before returning.

```ts
// svelte.config.js — function form lets us read env vars and use logic
import adapter from '@sveltejs/adapter-auto';

export default () => ({
	kit: { adapter: adapter() }
});
```

### PE7 style notes

After scaffolding, the student empties the generated `app.css` and prepares six empty `@layer` declarations in cascade order. No tokens yet; just the skeleton that Lesson 1.5 will populate.

### Mini-build spec

Run `pnpm dlx sv create ultimate-svelte-course` and select the SvelteKit minimal template with TypeScript strict. Run `pnpm install` then `pnpm dev`. Open `http://localhost:5173`, see the welcome page, open `tsconfig.json`, and verify `"strict": true`. The "mini-build" for this lesson is a small confirmation card rendered in the playground that reads the environment it is running in.

### Verification

- `pnpm dev` starts Vite 7 Rolldown and prints a localhost URL
- `pnpm check` runs `svelte-check` with zero errors
- `tsconfig.json` (or the extended config) shows `strict: true`
- `svelte.config.js` uses the function form and exports a config
