import prisma from "@/lib/prisma";

import PokedexEntry from "./components/pokedexEntry";

export default async function PokedexEntryContainer({ params }) {
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
    <PokedexEntry
      pokemon={
        pokemons.filter(
          (pokemon) =>
            pokemon.name.replace(" ", "-").toLowerCase() === params.pokemon
        )[0]
      }
    />
  );
}

export const dynamic = "force-dynamic";
