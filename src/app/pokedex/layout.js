import { PrismaClient } from "@prisma/client";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";

const prisma = new PrismaClient();

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
    <div testid="container" className="flex grow flex-row h-auto w-auto">
      <section className="flex flex-col lg:flex-row w-full">
        <div
          className="hidden flex-col flex-none lg:flex"
          testid="pokemon-list-container"
        >
          <PokemonList pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col m-4 w-full items-center"
          testid="pokedex-entry-container"
        >
          {children}
        </div>
      </section>
    </div>
  );
}
