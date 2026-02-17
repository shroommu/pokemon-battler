# Missing `data-testid` audit

This audit lists JSX files under `src/` (excluding `__tests__`) with likely missing test identifiers.

## Files with **zero** `data-testid` / `testId` usage

- `src/app/(protected)/settings/page.js`
- `src/app/analytics/AnalyticsClient.js`
- `src/app/analytics/page.js`
- `src/app/dashboard/page.js`
- `src/app/pokedex/[pokemon]/@details/components/PagePill.js`
- `src/app/pokedex/[pokemon]/@details/moves/page.js`
- `src/app/pokedex/[pokemon]/@details/page.js`
- `src/app/pokedex/[pokemon]/@details/stats/page.js`
- `src/app/pokedex/[pokemon]/@header/components/nextPokemonLink.js`
- `src/app/pokedex/[pokemon]/@header/components/previousPokemonLink.js`
- `src/app/ui-playground/page.js`
- `src/components/LoadingIndicators.js`
- `src/components/Nav/index.js`
- `src/components/TypeTable.js`
- `src/components/charts/StarChart/AnimatedStar.js`
- `src/components/charts/StarChart/AnimatedValueLabel.js`

## Files with mixed coverage (some JSX tags have test IDs, others likely do not)

- `src/components/Header.js`
- `src/components/MobileNavMenu/index.js`
- `src/components/charts/StarChart/StarChart.js`
- `src/app/enter/page.js`
- `src/app/pokedex/[pokemon]/@details/components/moves.js`
- `src/components/charts/Histogram/Histogram.js`
- `src/components/charts/BoxPlot/HorizontalBoxPlot.js`
- `src/components/charts/BoxPlot/VerticalBoxPlot.js`
- `src/app/pokedex/[pokemon]/@details/components/stats.js`
- `src/components/Footer.js`
- `src/components/charts/HorizontalBarChart/HorizontalBarChart.js`
- `src/components/charts/VerticalBarChart/VerticalBarChart.js`
- `src/app/page.js`
- `src/app/pokedex/[pokemon]/@details/index.js`
- `src/app/pokedex/[pokemon]/@header/page.js`
- `src/app/pokedex/[pokemon]/@info/page.js`
- `src/app/pokedex/components/pokedexButton.js`
- `src/components/charts/BoxPlot/MultiBoxControl.js`
- `src/app/pokedex/page.js`
- `src/components/Nav/components/NavButton.js`
- `src/app/about/page.js`
- `src/app/layout.js`
- `src/app/login/page.js`
- `src/app/pokedex/[pokemon]/components/pokemonList.js`
- `src/app/sign-up/page.js`
- `src/components/charts/BoxPlot/BoxPlotItem.js`
- `src/components/LabeledElement.js`
- `src/components/charts/HorizontalBarChart/HorizontalBarItem.js`
- `src/components/charts/HorizontalBarChart/HorizontalBarReferenceLine.js`
- `src/components/charts/VerticalBarChart/VerticalBarItem.js`
- `src/components/charts/VerticalBarChart/VerticalBarReferenceLine.js`
- `src/components/Dropdown.js`
- `src/app/pokedex/[pokemon]/@details/default.js`
- `src/app/pokedex/[pokemon]/@details/loading.js`
- `src/app/pokedex/[pokemon]/@header/default.js`
- `src/app/pokedex/[pokemon]/@info/default.js`
- `src/app/pokedex/[pokemon]/@info/loading.js`
- `src/app/pokedex/[pokemon]/layout.js`

## Method

Used a static regex scan over `src/**/*.js` (excluding `__tests__`) to:

1. detect files that contain JSX-like tags (`<[A-Za-z]...>`), and
2. classify files by whether they contain `data-testid=` or `testId=`.

Note: this is intentionally a conservative inventory for follow-up, not an AST-precise count of every individual JSX element.
