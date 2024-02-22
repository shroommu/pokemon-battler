import PokedexContext from "./components/pokedexContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info"] });

export default async function Pokedex() {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      type_pokemon_primary_typeTotype: true,
      type_pokemon_secondary_typeTotype: true,
      pokemon_moves: {
        select: {
          moves: {
            select: {
              type_moves_typeTotype: true,
              power: true,
              accuracy: true,
              pp: true,
              effect: true,
            },
          },
        },
      },
    },
    orderBy: [{ pokedex_number: "asc" }],
  });

  return (
    <div testid="container" className="flex grow flex-row h-auto w-auto">
      <PokedexContext pokemons={pokemons} />
    </div>
  );
}
