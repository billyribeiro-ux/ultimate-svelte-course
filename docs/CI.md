# CI Pipeline

This document describes the GitHub Actions workflow defined in `.github/workflows/ci.yml`.

## Triggers

- `push` to `main`
- Every `pull_request`
- Manual `workflow_dispatch`

Concurrency is scoped per-ref with in-progress cancellation, so a new push to a PR cancels any stale runs for that branch.

## Jobs

### 1. `lint-and-typecheck` (ubuntu-latest)

The entry point. Runs:

- `pnpm prettier --check .`
- `pnpm eslint .`
- `pnpm check` (svelte-check + TypeScript)

All downstream jobs fan out from this job, so formatting and type errors fail fast before burning runner minutes on tests or builds.

### 2. `unit-test` (ubuntu-latest, needs `lint-and-typecheck`)

Runs `pnpm test --coverage` (Vitest) and uploads the `coverage/` directory as an artifact for inspection.

### 3. `e2e-test` (ubuntu-latest, needs `lint-and-typecheck`)

A 3-way matrix over `chromium`, `firefox`, and `webkit`. Playwright browsers are cached at `~/.cache/ms-playwright`, keyed on the hash of `pnpm-lock.yaml`. On failure, the `playwright-report/` directory is uploaded as an artifact per-project.

### 4. `lighthouse` (ubuntu-latest, needs `unit-test` + `e2e-test`)

Runs `@lhci/cli autorun` against a production build — but **only if** a Lighthouse CI config file (`.lighthouserc.cjs`, `.lighthouserc.js`, or `.lighthouserc.json`) exists at the repository root. The job skips gracefully while the config has yet to be added in a later phase.

### 5. `build-web` (ubuntu-latest, needs `lint-and-typecheck`)

Runs `pnpm build` and uploads `.svelte-kit/output` as an artifact.

### 6. `build-tauri-macos` (macos-latest, needs `unit-test` + `build-web`)

Gated to `refs/heads/main` and tag pushes. Installs the Rust stable toolchain with both Apple Silicon and Intel targets, warms a rust-cache workspace at `src-tauri`, installs Tauri CLI + API, installs Bun (required by a sidecar packaging step), and then runs `pnpm tauri build --target universal-apple-darwin`. A post-build smoke test (`scripts/tauri-smoke.sh`) launches the `.app`, captures the screen, and asserts the screenshot is larger than 50KB (a reliable proxy for "the window actually rendered, not blank"). The universal `.app` bundle is uploaded as an artifact.

## Cache strategy

- **pnpm store** via `actions/setup-node@v4` `cache: pnpm`
- **Playwright browsers** via `actions/cache@v4` keyed on `pnpm-lock.yaml`
- **Rust build cache** via `swatinem/rust-cache@v2` scoped to `src-tauri`

## Re-running failed jobs

From the GitHub UI: _Actions_ → pick the run → _Re-run failed jobs_ (or _Re-run all jobs_). For transient Playwright flakes, prefer re-running just the affected matrix leg.

## Debugging locally

There is no single composite script, but you can reproduce the gating locally with:

```sh
pnpm install --frozen-lockfile
pnpm prettier --check .
pnpm eslint .
pnpm check
pnpm test --coverage
pnpm exec playwright test
pnpm build
```

## Release flow

1. Land changes on `main` via PR (full CI must be green).
2. Tag a release: `git tag vX.Y.Z && git push --tags`.
3. The tag push re-triggers CI including `build-tauri-macos`, producing a signed-ready universal `.app` artifact.
4. Promote the artifact to a GitHub Release (manual, for now).

## Pinned action versions (as of April 2026)

- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/cache@v4`
- `actions/upload-artifact@v4`
- `pnpm/action-setup@v4`
- `dtolnay/rust-toolchain@stable`
- `swatinem/rust-cache@v2`

Dependabot updates these weekly — see `.github/dependabot.yml`.
