# Ultimate Svelte Course

A production-grade, hands-on course for learning Svelte 5 and SvelteKit by building a real application. The course ships as a hybrid project: a SvelteKit web app that also runs as a native macOS application via Tauri, covering runes, component architecture, routing, data loading, forms, testing, performance, and native integration.

## Status

![CI](https://img.shields.io/badge/CI-pending-lightgrey) ![Version](https://img.shields.io/badge/version-0.0.1-blue) ![License](https://img.shields.io/badge/license-TBD-lightgrey)

## Prerequisites

- **Node.js 22 LTS** — pinned via `.nvmrc` (`nvm use` in repo root)
- **pnpm 10.x** — `corepack enable && corepack prepare pnpm@latest --activate`
- **Rust stable** — required for Tauri native builds on macOS
- **Xcode Command Line Tools** — `xcode-select --install` (macOS only, for Tauri)

## Setup

```sh
pnpm install
```

This will also install the lefthook git hooks via the `prepare` script.

## Development

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Start the SvelteKit dev server on `:5173`   |
| `pnpm dev:tauri` | Launch the app inside a native macOS window |
| `pnpm check`     | Run svelte-check / TypeScript diagnostics   |
| `pnpm test`      | Run Vitest unit + component tests           |
| `pnpm e2e`       | Run Playwright E2E tests                    |
| `pnpm preview`   | Preview the production web build locally    |

## Build

| Command                      | Description                               |
| ---------------------------- | ----------------------------------------- |
| `pnpm build`                 | Production web build (adapter-auto)       |
| `pnpm build:tauri:universal` | Universal macOS `.app` + `.dmg` via Tauri |

## Branch policy

- All day-to-day work lands on `claude/svelte-sveltekit-course-U8SZr`.
- **No force pushes** to shared branches.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with an enforced scope enum — see `commitlint.config.cjs`. Examples:
  - `feat(m3): add Button component`
  - `fix(phase-2): resolve hydration mismatch on route change`
  - `ci(deps): bump actions/checkout to v4`

Every commit is gated by lefthook (pre-commit + commit-msg) and every PR is gated by the full GitHub Actions matrix.

## Documentation

- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — Contributor quickstart
- [docs/CI.md](docs/CI.md) — CI pipeline reference
- [docs/TESTING.md](docs/TESTING.md) — Unit & component testing guide
- [docs/E2E.md](docs/E2E.md) — Playwright E2E guide
- [docs/VERSIONS.md](docs/VERSIONS.md) — Pinned dependency matrix

## Project structure

```
.
├── .github/            # CI workflows, Dependabot
├── docs/               # Project documentation
├── scripts/            # Build helpers, smoke tests
├── src/                # SvelteKit app source
│   ├── lib/            # Shared components, stores, utilities
│   └── routes/         # File-based routes
├── src-tauri/          # Tauri (Rust) shell + config
├── static/             # Public static assets
├── tests/e2e/          # Playwright E2E specs
├── lefthook.yml        # Git hooks config
└── vitest.config.ts    # Vitest config
```

## Progress

Phase 0 and 1 are in active development. Refer to the course plan for the full 14-phase roadmap and current milestones.

## License

License TBD.
