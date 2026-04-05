import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const CI = !!process.env.CI;

export default defineConfig({
	testDir: './tests/e2e',
	globalSetup: fileURLToPath(new URL('./scripts/build-lesson-manifest.mjs', import.meta.url)),
	fullyParallel: true,
	forbidOnly: CI,
	retries: CI ? 2 : 0,
	workers: CI ? 4 : undefined,
	reporter: [
		['html', { open: 'never' }],
		['list'],
		['github']
	],
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01
		}
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			name: 'iphone-15',
			use: { ...devices['iPhone 15'] }
		},
		{
			name: 'pixel-8',
			use: { ...devices['Pixel 7'] }
		}
	],
	webServer: {
		command: 'pnpm build && pnpm preview --port 4173',
		url: 'http://localhost:4173',
		reuseExistingServer: !CI,
		timeout: 180_000
	}
});
