export default function PokedexLoading() {
  return (
    <div
      className="flex flex-col h-full w-full"
      data-testid="pokedex-nav-container"
    >
      <div />
      <div
        className="flex flex-col xl:flex-row h-full w-full xl:items-start"
        data-testid="pokedex-entry-container"
      >
        <section
          className="flex flex-col w-full xl:flex-1 items-center"
          data-testid="pokemon-basics-container"
        >
          <div />
          <div className="mt-2" data-testid="pokemon-type">
            <div />
          </div>
        </section>
        <section
          className="flex flex-col min-h-72 h-full w-full xl:flex-1 items-center"
          data-testid="stats-chart-and-controls-container"
        >
          <h2
            className="text-2xl md:text-3xl mt-4 xl:mt-0"
            data-testid="stats-chart-title"
          />
          <div
            className="hidden xl:flex h-full w-full"
            data-testid="horizontal-stats-bar-chart-container"
          >
            <div />
          </div>
          <div
            className="flex xl:hidden h-full w-full"
            data-testid="vertical-stats-bar-chart-container"
          >
            <div />
          </div>
          <div
            className="flex flex-row justify-center"
            data-testid="stats-chart-controls-container"
          >
            <div />
          </div>
        </section>
      </div>
    </div>
  );
}
