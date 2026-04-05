import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const tauri = process.env.TAURI_BUILD === '1';
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			// Use an absolute path because mdsvex resolves this from each .md file's
			// directory, not from the project root.
			layout: {
				_: resolve(projectRoot, 'src/lib/mdsvex-layout.svelte')
			}
		})
	],
	compilerOptions: {
		// Runes mode is the project default except for:
		//   1. node_modules (third-party libraries may still use legacy syntax)
		//   2. mdsvex-compiled .md files — mdsvex 0.12 inlines
		//      `<Layout_MDSVEX_DEFAULT {...$$props}>` in its generated wrapper,
		//      which is legacy Svelte 4 syntax incompatible with runes mode.
		//      The `src/lib/mdsvex-layout.svelte` file itself still uses runes
		//      because it is a `.svelte` file and is not matched by this rule.
		// Can be removed once mdsvex ships a runes-native output.
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');
			const isMdsvex = filename.endsWith('.md');

			if (isExternalLibrary || isMdsvex) return false;
			return true;
		}
	},
	kit: {
		// When TAURI_BUILD=1 we emit an adapter-node server into `build-node/`
		// which `scripts/package-sidecar.mjs` then compiles into a Tauri
		// sidecar via `bun build --compile`. Otherwise the project ships to
		// Vercel/Cloudflare/etc via adapter-auto.
		// See https://svelte.dev/docs/kit/adapters.
		adapter: tauri
			? adapterNode({ out: 'build-node', precompress: false })
			: adapterAuto(),
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
