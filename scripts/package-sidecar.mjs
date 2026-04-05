#!/usr/bin/env node
/**
 * package-sidecar.mjs
 *
 * Cross-compiles the SvelteKit `adapter-node` output (`build-node/index.js`)
 * into two single-file executables via `bun build --compile`, one per macOS
 * architecture, and writes them to `src-tauri/binaries/` using the exact
 * target-triple suffix that Tauri's `externalBin` lookup requires.
 *
 *   src-tauri/binaries/usc-server-aarch64-apple-darwin
 *   src-tauri/binaries/usc-server-x86_64-apple-darwin
 *
 * Both files must exist before `tauri build --target universal-apple-darwin`
 * runs, otherwise the universal bundle step fails.
 *
 * If Bun is not installed, this script prints a warning with install
 * instructions and exits with a non-zero status so CI fails loudly.
 */

import { execSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const entryPoint = resolve(repoRoot, 'build-node', 'index.js');
const outDir = resolve(repoRoot, 'src-tauri', 'binaries');

/** @type {ReadonlyArray<readonly [string, string]>} */
const targets = [
	['bun-darwin-arm64', 'usc-server-aarch64-apple-darwin'],
	['bun-darwin-x64', 'usc-server-x86_64-apple-darwin']
];

function hasBun() {
	const probe = spawnSync('bun', ['--version'], { stdio: 'ignore' });
	return probe.status === 0;
}

function main() {
	if (!existsSync(entryPoint)) {
		console.error(
			`[package-sidecar] Missing ${entryPoint}.\n` +
				`Run \`cross-env TAURI_BUILD=1 vite build\` first so adapter-node emits build-node/.`
		);
		process.exit(1);
	}

	if (!hasBun()) {
		console.error(
			'[package-sidecar] Bun is not installed on PATH.\n' +
				'Install it with:  curl -fsSL https://bun.sh/install | bash\n' +
				'Bun is required to cross-compile the adapter-node server into a Tauri sidecar.\n' +
				'(Node SEA is a possible fallback but is not wired up in this script.)'
		);
		process.exit(1);
	}

	mkdirSync(outDir, { recursive: true });

	for (const [bunTarget, outName] of targets) {
		const outFile = resolve(outDir, outName);
		const cmd = `bun build ${JSON.stringify(entryPoint)} --compile --target=${bunTarget} --outfile ${JSON.stringify(outFile)}`;
		console.log(`[package-sidecar] ${cmd}`);
		execSync(cmd, { stdio: 'inherit', cwd: repoRoot });
	}

	console.log('[package-sidecar] sidecar binaries written to', outDir);
}

main();
