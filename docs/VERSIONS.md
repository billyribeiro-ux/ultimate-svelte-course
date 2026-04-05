# Resolved Versions

> Resolved versions as of 2026-04-04. This file is the reproducibility snapshot
> captured in Phase 0 of the Ultimate Svelte Course build. Every package was
> installed via `pnpm add <pkg>@latest` on this date, and `pnpm-lock.yaml` pins
> the exact transitive graph. Future students can diff against this file if
> upstream drifts.

## `pnpm ls --depth 0`

```
ultimate-svelte-course@0.0.1 /home/user/ultimate-svelte-course (PRIVATE)

  dependencies:
  @iconify/svelte            5.2.1
  @tanstack/svelte-table     8.21.3
  gsap                       3.14.2
  valibot                    1.3.1

  devDependencies:
  @eslint/js                    10.0.1
  @iconify-json/carbon          1.2.20
  @iconify-json/ph              1.2.2
  @playwright/test              1.59.1
  @sveltejs/adapter-auto        7.0.1
  @sveltejs/adapter-node        5.5.4
  @sveltejs/adapter-static      3.0.10
  @sveltejs/kit                 2.56.1
  @sveltejs/vite-plugin-svelte  6.2.4
  @testing-library/jest-dom     6.9.1
  @testing-library/svelte       5.3.1
  @testing-library/user-event   14.6.1
  cross-env                     10.1.0
  eslint                        10.2.0
  eslint-plugin-svelte          3.17.0
  globals                       17.4.0
  jsdom                         29.0.1
  mdsvex                        0.12.7
  prettier                      3.8.1
  prettier-plugin-svelte        3.5.1
  svelte                        5.55.1
  svelte-check                  4.4.6
  typescript                    6.0.2
  typescript-eslint             8.58.0
  vite                          7.3.1
  vitest                        4.1.2
```

## Notes on pin choices

- **vite** is held at the latest `7.x` line (7.3.1) per the curriculum Tech
  Stack table, not the newer `8.x`. `@sveltejs/vite-plugin-svelte@6.2.4` is the
  matching plugin; `vite-plugin-svelte@7.x` requires `vite@8` and was
  deliberately not taken.
- **typescript** resolved to `6.0.2` (the true `latest` dist-tag on
  2026-04-04). The curriculum Tech Stack column says "latest 5.x" but the
  Phase 0 assignment explicitly installs `typescript@latest`; the 6.x line is
  backward compatible with the strict-mode flags used here.
- **@tauri-apps/cli** and **@tauri-apps/api** are installed by the Tauri agent
  and are therefore not listed above from this agent's perspective.
