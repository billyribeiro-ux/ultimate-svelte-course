# Contributing

Thanks for helping improve the Ultimate Svelte Course. This guide is the quickstart — for deep dives, see [CI.md](CI.md), [TESTING.md](TESTING.md), and [E2E.md](E2E.md).

## Quickstart

```sh
git clone <repo-url>
cd ultimate-svelte-course
nvm use            # Node 22 LTS, pinned in .nvmrc
corepack enable    # pnpm 10.x
pnpm install       # also installs lefthook hooks
pnpm dev           # http://localhost:5173
```

## Branching

- Work off `claude/svelte-sveltekit-course-U8SZr` by default.
- Create topic branches for non-trivial changes: `feat/m3-button`, `fix/hydration-race`, `docs/ci-update`.
- Never force-push a shared branch.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint. The commit-msg hook will reject non-conforming messages.

**Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes** (from `commitlint.config.cjs`):

- Phases: `phase-0` .. `phase-14`
- Modules: `m1` .. `m13`, `m9a`, `m9b`, `capstone`
- Areas: `shell`, `tauri`, `deps`, `ci`, `tests`, `docs`

**Examples:**

```
feat(m3): add Button component with size variants
fix(phase-2): correct hydration mismatch on navigate
test(m5): cover error boundary edge case
ci(deps): bump pnpm/action-setup to v4
```

## Running tests

```sh
pnpm check                 # TypeScript / svelte-check
pnpm test                  # Vitest (unit + component)
pnpm test --coverage       # With v8 coverage
pnpm exec playwright test  # Full E2E suite
pnpm exec playwright test --project=chromium  # Single browser
```

## Pre-commit hooks

Lefthook runs in parallel on staged files:

- `prettier --check`
- `eslint`
- `svelte-check`
- `vitest run --changed`

Hooks are non-blocking on transient/offline failures (they append `|| true` so you can still commit work-in-progress on a plane). CI will catch any real failures.

If you need to bypass a hook intentionally, use `git commit --no-verify` — but prefer fixing the issue.

## Opening a PR

1. Push your branch.
2. Open a PR against the default branch.
3. Ensure CI is green: lint, typecheck, unit, E2E × 3 browsers, and build-web must all pass.
4. Request review.
5. Squash-merge when approved.

## Questions?

Check the [course plan](../README.md#documentation) or open a discussion in the repo.
