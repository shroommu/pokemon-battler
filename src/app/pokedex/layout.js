import { PrismaClient } from "@prisma/client";

import PokedexList from "./components/pokemonList";

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
      <section className="flex flex-row w-full">
        <div
          className="flex flex-col flex-none"
          testid="pokemon-list-container"
        >
          <PokedexList pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col w-full m-4 ml-0"
          testid="pokedex-entry-container"
        >
          {children}
        </div>
      </section>
    </div>
  );
}
