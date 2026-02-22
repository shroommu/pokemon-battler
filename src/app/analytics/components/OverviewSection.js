import Histogram from "@/components/charts/Histogram/Histogram";

export default function OverviewSection({
  overviewStats,
  histogramDimensions,
  histogramData,
  histogramRef,
}) {
  return (
    <div
      className="flex flex-col gap-3 sm:gap-4"
      data-testid="analytics-overview-section"
    >
      <div
        className="grid grid-cols-2 xl:grid-cols-4 gap-2"
        data-testid="analytics-overview-stats-grid"
      >
        <div
          className="bg-gray-200 rounded-md p-3"
          data-testid="analytics-stat-pokemon-count"
        >
          <div className="text-xs sm:text-sm">Pokemon</div>
          <div className="text-lg sm:text-xl">{overviewStats.pokemonCount}</div>
        </div>
        <div
          className="bg-gray-200 rounded-md p-3"
          data-testid="analytics-stat-type-count"
        >
          <div className="text-xs sm:text-sm">Types Represented</div>
          <div className="text-lg sm:text-xl">
            {overviewStats.representedTypeCount}
          </div>
        </div>
        <div
          className="bg-gray-200 rounded-md p-3"
          data-testid="analytics-stat-average-max-stats"
        >
          <div className="text-xs sm:text-sm">Avg Max Stats</div>
          <div className="text-lg sm:text-xl">
            {overviewStats.averageMaxStats}
          </div>
        </div>
        <div
          className="bg-gray-200 rounded-md p-3"
          data-testid="analytics-stat-top-pokemon"
        >
          <div className="text-xs sm:text-sm">Top Max Stats</div>
          <div className="text-lg sm:text-xl">
            {overviewStats.topPokemonByMaxStats}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <section
          className="h-[21rem] sm:h-[24rem]"
          data-testid="analytics-overview-histogram-panel"
        >
          <h2 className="text-base sm:text-lg">Max Stats Histogram</h2>
          <p className="text-xs sm:text-sm mb-2">
            How max stats are distributed across all Pokemon.
          </p>
          <Histogram
            width={histogramDimensions.width}
            height={histogramDimensions.height}
            bins={histogramData}
            barFillColor="#616161ff"
            innerRef={histogramRef}
          />
        </section>
      </div>
    </div>
  );
}
