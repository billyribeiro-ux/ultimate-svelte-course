import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 75,
				statements: 80
			},
			exclude: [
				'**/node_modules/**',
				'**/.svelte-kit/**',
				'**/build/**',
				'**/build-node/**',
				'**/src-tauri/**',
				'**/tests/e2e/**',
				'**/*.config.{js,ts}',
				'**/vitest-setup.ts'
			]
		},
		workspace: [
			{
				extends: true,
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					setupFiles: ['./vitest-setup.ts'],
					include: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'src/**/*.test.svelte.{js,ts}',
						'src/**/*.{test,spec}.svelte.{js,ts}',
						'src/**/*Component.{test,spec}.{js,ts}'
					],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: true,
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'src/**/*.test.svelte.{js,ts}',
						'src/**/*.{test,spec}.svelte.{js,ts}',
						'src/**/*Component.{test,spec}.{js,ts}'
					]
				}
			}
		]
	}
});
