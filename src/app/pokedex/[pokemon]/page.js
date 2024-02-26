import { PrismaClient } from "@prisma/client";

import PokedexEntry from "./components/pokedexEntry";

const prisma = new PrismaClient();

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
          (pokemon) => pokemon.name.toLowerCase() === params.pokemon
        )[0]
      }
    />
  );
}

export async function generateStaticParams() {
  const pokemons = await prisma.pokemon.findMany({ select: { name: true } });

  return pokemons.map((pokemon) => ({
    pokemon: pokemon.name.replace(" ", "-"),
  }));
}
