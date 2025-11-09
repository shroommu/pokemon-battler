import { Skeleton } from "./components/loadingIndicators";
import PokedexNavSkeleton from "./components/MobilePokedexNav/skeleton";
import PokedexInfoSkeleton from "./skeleton";

export default function PokedexLoading() {
  return (
    <div
      className="flex flex-col h-full w-full"
      data-testid="pokedex-nav-container"
    >
      <PokedexNavSkeleton />
      <div
        className="flex flex-col xl:flex-row h-full w-full xl:items-start"
        data-testid="pokedex-entry-container"
      >
        <section
          className="flex flex-col w-full xl:flex-1 items-center"
          data-testid="pokemon-basics-container"
        >
          <PokedexInfoSkeleton />
        </section>
        <section
          className="flex flex-col min-h-72 h-full w-full xl:flex-1 items-center"
          data-testid="stats-chart-and-controls-container"
        >
          <Skeleton className="mt-4 h-full w-full" />
        </section>
      </div>
    </div>
  );
}
