# End-to-End Testing Conventions

Playwright powers the enterprise-grade E2E layer for the Ultimate Svelte Course. This document explains how the suite is organized, how the lesson harness works, and how to run and extend it.

## Test organization

```
tests/e2e/
├── _fixtures/                 deterministic Playwright fixtures (lessonPage, consoleErrors)
├── .generated/                auto-written lesson manifest (gitignored)
├── harness/
│   ├── manifest-generator.ts  typed loader for the generated manifest
│   ├── lessons.spec.ts        meta harness — iterates every lesson on disk
│   └── a11y.spec.ts           axe-core harness — iterates every lesson on disk
├── smoke/
│   └── homepage.spec.ts       course shell smoke test
├── module-01-foundations/
│   └── lesson-01.spec.ts      canonical targeted lesson test
├── module-02-reactivity/
│   └── lesson-01-counter.spec.ts
└── ...                        one directory per module for targeted tests
```

Each module gets its own directory. File names are `lesson-<N>-<slug>.spec.ts`. Shared helpers live in `_fixtures/`.

## The lesson manifest (self-updating)

`scripts/build-lesson-manifest.mjs` walks `src/content/<module>/moduleMeta.ts` and every lesson's `meta.ts`, extracts identity (`id`, `moduleId`, `number`, `title`, `conceptTags`) via regex, and writes `tests/e2e/.generated/lessons.json`.

Playwright runs this script through the `globalSetup` hook configured in `playwright.config.ts`, so every `pnpm e2e` run starts with an up-to-date manifest. When Modules 3-5 land, the harness picks them up automatically — no test code changes required.

`tests/e2e/harness/manifest-generator.ts` exposes:

```ts
export interface LessonEntry {
  readonly id: string;          // "02.1"
  readonly slug: string;        // "01-what-is-state"
  readonly moduleId: string;    // "02"
  readonly moduleSlug: string;  // "02-reactivity"
  readonly route: string;       // "/02/1"
  readonly title: string;
  readonly conceptTags: readonly string[];
}

export function getLessonManifest(): Promise<readonly LessonEntry[]>;
```

## The meta harness — `harness/lessons.spec.ts`

For every lesson on disk it asserts:

- The main landmark and a top-level heading render.
- The `--color-bg` PE7 token resolves to an `oklch(...)` value (catches missing theme imports).
- Every visible interactive element is at least `44×44` CSS pixels (WCAG 2.5.5 / 2.5.8).
- Under `prefers-reduced-motion: reduce`, no element has an animation longer than 10ms.
- Zero console errors or uncaught page errors.

Touch-target and reduced-motion checks run once per lesson — they are cheap, deterministic, and catch regressions before they reach main.

## The a11y harness — `harness/a11y.spec.ts`

Uses `@axe-core/playwright` with the `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` tag set. Any non-empty violations array fails the test and prints a human-readable summary.

## Writing a targeted lesson test

Use the canonical templates as starting points:

- `tests/e2e/module-01-foundations/lesson-01.spec.ts` — static prose + playground render
- `tests/e2e/module-02-reactivity/lesson-01-counter.spec.ts` — interactive playground exercise

Conventions:

1. Hard-code the lesson route at the top as `const ROUTE = '/<moduleId>/<number>'`.
2. Collect `console` errors and `pageerror` into a list and assert `[]` at the end.
3. Prefer accessibility queries: `getByRole`, `getByLabel`, `getByText` over `data-testid`.
4. Use Playwright's auto-waiting assertions (`toBeVisible`, `toHaveText`) — no `waitForTimeout`.
5. Each test must be independent and parallel-safe.

## Running tests locally

```bash
pnpm e2e                        # full matrix (chromium, firefox, webkit, iphone-15, pixel-8)
pnpm e2e -- --project=chromium  # chromium only — fastest for local dev
pnpm e2e:ui                     # interactive UI mode
pnpm e2e:debug                  # step-through debugger
pnpm e2e:report                 # open the last HTML report
pnpm e2e:codegen                # record a new test against the preview server
```

The Playwright `webServer` block builds the app and boots `pnpm preview --port 4173` automatically. First-run setup: `pnpm exec playwright install`.

## Projects (browser matrix)

| Project     | Device                     | Purpose                          |
| ----------- | -------------------------- | -------------------------------- |
| `chromium`  | Desktop Chrome             | primary regression lane          |
| `firefox`   | Desktop Firefox            | engine coverage                  |
| `webkit`    | Desktop Safari             | engine coverage                  |
| `iphone-15` | `devices['iPhone 15']`     | mobile viewport + touch          |
| `pixel-8`   | `devices['Pixel 7']`       | Android viewport + touch         |

`retries: 2` on CI, `0` locally. `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`.

## Visual regression (Stage B)

Stage B will add `toHaveScreenshot()` assertions per lesson using Playwright's built-in visual diff engine, with baselines stored under `tests/e2e/__screenshots__/`. The config already sets `expect.toHaveScreenshot.maxDiffPixelRatio = 0.01`. Lighthouse CI will run in a separate workflow against the same preview server.

## Rules

- **TypeScript strict**, no `any`.
- **Accessibility-first** queries (`getByRole`, `getByLabel`).
- **Deterministic**: no `sleep` / `waitForTimeout` unless absolutely necessary.
- **Parallel-safe**: tests share no state.
- **No hardcoded lesson lists** in harness files — always iterate the manifest.
