# Compare Page Step 1: Scope and UX Definition

## Goal
Let a user compare exactly two Pokemon side-by-side based on base stats.

## In Scope
- Two Pokemon selected at once: `Pokemon A` and `Pokemon B`.
- Side-by-side display of:
  - Name
  - Sprite
  - Type(s)
  - Base stats (`HP`, `Attack`, `Defense`, `Special`, `Speed`)
  - Total stat value (`max_stats` or computed total)
- Per-stat "winner" highlighting when one value is higher than the other.

## Out of Scope (for this phase)
- Team comparisons (3+ Pokemon).
- Type matchup simulation.
- Move-set effectiveness or battle simulation.
- Historical generations outside current project dataset.

## UX Requirements
- The page supports only one-vs-one comparison at a time.
- Both Pokemon must be visible together to minimize context switching.
- Stats are readable in one scan, with clear visual winner cues.
- Tie states must be shown as ties rather than forcing a winner.
- Empty state should communicate that two selections are needed.

## Acceptance Criteria
1. Product requirements explicitly enforce exactly two compared Pokemon.
2. Required fields for both sides are documented and fixed.
3. Winner logic expectation is defined per stat.
4. Tie behavior is defined for equal stat values.
