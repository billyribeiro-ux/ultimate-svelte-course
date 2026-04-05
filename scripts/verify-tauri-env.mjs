#!/usr/bin/env node
/**
 * verify-tauri-env.mjs
 *
 * Sanity-checks that the host toolchain required to build the Tauri 2.x
 * macOS bundle is installed. Prints a checklist and exits non-zero if any
 * hard requirement is missing.
 *
 * Hard requirements:
 *   - rustup    (manages Rust toolchains)
 *   - cargo     (Rust build tool)
 *   - pnpm      (JS package manager)
 *   - bun       (cross-compiles the adapter-node sidecar)
 *
 * Soft checks:
 *   - rustup targets include aarch64-apple-darwin + x86_64-apple-darwin
 *   - xcrun (Xcode command line tools) available on macOS
 */

import { spawnSync } from 'node:child_process';
import { platform } from 'node:os';

function which(cmd, args = ['--version']) {
	const res = spawnSync(cmd, args, { encoding: 'utf8' });
	if (res.status === 0) {
		const line = (res.stdout || res.stderr || '').split('\n')[0].trim();
		return { ok: true, version: line };
	}
	return { ok: false, version: null };
}

const checks = [
	{ name: 'rustup', cmd: 'rustup', args: ['--version'], required: true },
	{ name: 'cargo', cmd: 'cargo', args: ['--version'], required: true },
	{ name: 'rustc', cmd: 'rustc', args: ['--version'], required: true },
	{ name: 'pnpm', cmd: 'pnpm', args: ['--version'], required: true },
	{ name: 'bun', cmd: 'bun', args: ['--version'], required: true },
	{ name: 'node', cmd: 'node', args: ['--version'], required: true }
];

let hardFail = false;
console.log('Tauri 2.x macOS environment check\n');

for (const c of checks) {
	const r = which(c.cmd, c.args);
	const mark = r.ok ? '[ok]  ' : c.required ? '[FAIL]' : '[warn]';
	console.log(`  ${mark} ${c.name.padEnd(8)} ${r.version ?? '(not found)'}`);
	if (!r.ok && c.required) hardFail = true;
}

// Rustup targets
const rustupTargets = spawnSync('rustup', ['target', 'list', '--installed'], {
	encoding: 'utf8'
});
if (rustupTargets.status === 0) {
	const installed = rustupTargets.stdout.split('\n').map((l) => l.trim());
	const required = ['aarch64-apple-darwin', 'x86_64-apple-darwin'];
	console.log('\n  Rustup targets:');
	for (const t of required) {
		const ok = installed.includes(t);
		console.log(`    ${ok ? '[ok]  ' : '[warn]'} ${t}`);
		if (!ok) {
			console.log(`           install with: rustup target add ${t}`);
		}
	}
}

if (platform() === 'darwin') {
	const xcrun = which('xcrun', ['--version']);
	console.log(
		`\n  ${xcrun.ok ? '[ok]  ' : '[warn]'} xcrun     ${xcrun.version ?? '(xcode-select --install)'}`
	);
}

console.log('');
if (hardFail) {
	console.error('One or more required tools are missing. See marks above.');
	process.exit(1);
}
console.log('All required tools present.');
