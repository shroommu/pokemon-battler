import prisma from "@/lib/prisma";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";

export default async function PokedexLayout({ children }) {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      primary_type: true,
      secondary_type: true,
      pokemon_moves: {
        select: {
          move: {
            select: {
              name: true,
              power: true,
              accuracy: true,
              pp: true,
              effect: true,
              type: { select: { name: true } },
            },
          },
        },
      },
    },
    orderBy: [{ pokedex_number: "asc" }],
  });

  return (
    <div data-testid="container" className="flex flex-row h-auto w-100 m-4 items-center">
      <section className="flex flex-col lg:flex-row items-center">
        <div
          className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex h-full"
          data-testid="pokemon-list-container"
        >
          <PokemonList pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          data-testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col m-4 w-full items-center"
          data-testid="pokedex-entry-container"
        >
          {children}
        </div>
      </section>
    </div>
  );
}
