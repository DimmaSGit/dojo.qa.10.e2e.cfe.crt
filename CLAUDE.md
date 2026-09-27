# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Playwright end-to-end test suite (TypeScript) with no application source code — every test drives a live, externally hosted site. There is nothing to build; the only artifacts are spec files under `tests/`.

## Commands

```bash
npm ci                                   # install dependencies
npx playwright install --with-deps       # install browsers (first run / CI)

npx playwright test                                      # run the full suite (all projects)
npx playwright test tests/coffee.cart/coffee.cart.spec.ts # run one file
npx playwright test -g "invalid email"                    # run tests matching a name substring
npx playwright test --project=coffee-cart                 # run one project only
npx playwright test --grep @negative                      # run by tag (@positive/@negative/@regression/@auth)
npx playwright test --headed                               # run with a visible browser
npx playwright test --ui                                   # interactive UI mode
npx playwright show-report                                  # open the last HTML report
```

There are no `lint`/`build` scripts defined in `package.json` (`scripts` is empty).

## Architecture

### Projects target different live sites

`playwright.config.ts` defines multiple `projects`, and each one sets its own `baseURL` (and sometimes `testDir`/`testIdAttribute`) rather than there being one app under test:

- **`coffee-cart`** → `https://coffee-cart.app/`, uses `data-test` as the test-id attribute (so `getByTestId(...)` matches `data-test="..."`).
- **`coffee-cart-css`** → same site, but scoped via `testDir` to only `tests/coffee.cart/coffee.cart.CSS.spec.ts`, and does **not** set `testIdAttribute`, since that spec deliberately uses raw CSS selectors (`page.locator("#name")`, `page.locator(".delete")`, `[data-test = 'X']`) instead of role/testid locators.
- A **`conduit`** project (a separate RealWorld-style app with its own `baseURL`) is currently commented out in the config. `tests/conduit/auth.spec.ts` exists but has no active project targeting it — the tests there are not scoped to run under any of the currently-enabled projects.

**Gotcha:** a project only restricts which spec files it runs if it sets `testDir`/`testMatch`. A project with no such restriction (like `coffee-cart`) picks up *every* spec under the top-level `testDir: "./tests"`, including specs written for a different site's `baseURL` — this has previously caused an unrelated project to run the coffee-cart spec against the wrong site and time out on every locator. When adding a new project for a new target site, scope it with `testDir`/`testMatch` or the existing projects will pick up its specs too.

### Test suites

- `tests/coffee.cart/coffee.cart.spec.ts` — coffee-cart.app flows (add to cart, checkout, promo, empty-cart/validation negatives) using `getByTestId(...)` and role-based locators. Wrapped in a single `test.describe("coffee-cart flow", { tag: "@regression" })` with a `beforeEach` that navigates to `/`.
- `tests/coffee.cart/coffee.cart.CSS.spec.ts` — the same coffee-cart.app scenarios, but written with plain CSS/attribute selectors instead of role/testid locators; kept as a separate spec/project pairing rather than merged into the main spec.
- `tests/conduit/auth.spec.ts` — registration and login flows for the conduit app, tagged `@auth`, using `getByTestId(...)`. Each `test.describe` block re-derives unique username/email/password in `beforeEach` (registration tests need fresh accounts; login tests register-then-logout in `beforeEach` before each login test runs). Some expected error-message assertions are in Ukrainian, matching that app's actual UI copy.

### Tagging convention

Tests are tagged via the second argument to `test()`/`test.describe()` (e.g. `{ tag: ["@positive"] }`), not comments — use `--grep @tag` to filter. Tags in use: `@regression`, `@positive`, `@negative`, `@auth`.

### CI

`.github/workflows/playwright.yml` runs `npx playwright test` on push/PR to `main`/`master` and uploads the `playwright-report/` directory as an artifact.

### Git workflow

Branches are per-homework: `hw-1`, `hw-2`, etc., PR'd into `main`. Incremental work within a homework can live on a dotted sub-branch (e.g. `hw-2.1` branched off `hw-2`).
