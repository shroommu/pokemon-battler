"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const getPokemonByNameBasicCached = unstable_cache(
  async (pokemonName) => {
    const data = await timedQuery("getPokemonByNameBasic", () =>
      prisma.pokemon.findUnique({
        where: { name: pokemonName },
        select: {
          id: true,
          name: true,
          pokedex_number: true,
        },
      })
    );

    return { data };
  },
  ["pokemon:basic:by-name"],
  { revalidate: 900 }
);

export async function getPokemonByNameBasic(pokemonName) {
  return getPokemonByNameBasicCached(pokemonName);
}
