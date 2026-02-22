# Components Consistency Plan

## Goals
- Standardize `testId` usage so tests are stable and predictable.
- Improve accessibility defaults for interactive components.
- Prefer semantic test queries (`role`, `label`, visible text) over `data-testid` where possible.

## Conventions
- Use `data-testid` only for:
  - Repeated chart primitives where semantic queries are impractical.
  - Complex visual internals that are not user-facing.
- Build test IDs from deterministic tokens, not free-form display content.
- Keep `testId` props optional. Components must render correctly without them.
- Every interactive control must have:
  - An accessible name.
  - Keyboard support (or use a native interactive element).
  - Proper state attributes (`aria-expanded`, `aria-controls`, etc.) when applicable.

## Phase 1 (Completed)
- `NavButton`: removed nested interactive elements (`Link` no longer wraps `button`).
- `Dropdown`: added menu semantics and trigger linkage.
- `Input`: optional test ID behavior and pass-through props.
- `LabeledElement`: valid required marker markup and alert semantics for errors.
- `MultiBoxControl`: explicit checkbox-label wiring with `id`/`htmlFor` and fieldset grouping.
- Updated tests near these changes to use semantic queries.

## Phase 2 (Next)
- Standardize chart-level accessibility:
  - Add chart-level labels/roles on wrappers.
  - Add keyboard parity for interactive chart marks.
  - Hide decorative SVG content from assistive technology.
- Normalize chart test ID formats (`{chart}-{part}-{index}`).

## Phase 3 (Enforcement)
- Expand linting and test guidance:
  - Enforce semantic testing preference in new tests.
  - Add a11y checks in Storybook and/or Jest for key primitives and chart wrappers.
