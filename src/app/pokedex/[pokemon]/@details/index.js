import Moves from "./components/moves";
import Stats from "./components/stats";
import PagePill from "./components/PagePill";

export default function Details({ pokemon, pokemonSlug, selectedTab }) {
  const isMovesSelected = selectedTab === "Moves";

  return (
    <div
      className="flex flex-col w-full py-4 xl:py-0 xl:flex-1 xl:h-full"
      data-testid="details-container"
    >
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row gap-2">
          <PagePill
            text="Moves"
            href={`/pokedex/${pokemonSlug}/moves`}
            selected={isMovesSelected}
          />
          <PagePill
            text="Stats"
            href={`/pokedex/${pokemonSlug}/stats`}
            selected={!isMovesSelected}
          />
        </div>
      </div>
      <div className="w-full xl:h-full">
        {isMovesSelected ? <Moves pokemon={pokemon} /> : <Stats pokemon={pokemon} />}
      </div>
    </div>
  );
}
