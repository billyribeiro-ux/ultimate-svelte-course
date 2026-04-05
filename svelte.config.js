import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import { relative, sep } from 'node:path';

const tauri = process.env.TAURI_BUILD === '1';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: './src/lib/mdsvex-layout.svelte'
			}
		})
	],
	compilerOptions: {
		// defaults to rune mode for the project, except for `node_modules`. Can be removed in svelte 6.
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			return isExternalLibrary ? undefined : true;
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
