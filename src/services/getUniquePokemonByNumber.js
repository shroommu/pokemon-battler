"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const getUniquePokemonByNumberCached = unstable_cache(
  async (pokedexNumber) => {
    const data = await timedQuery("getUniquePokemonByNumber", () =>
      prisma.pokemon.findFirst({
        where: {
          pokedex_number: pokedexNumber,
        },
        select: {
          id: true,
          name: true,
          pokedex_number: true,
          sprite_front_filepath: true,
          sprite_party_filepath: true,
        },
      })
    );

    return { data };
  },
  ["pokemon:detail:by-number"],
  { revalidate: 900 }
);

export async function getUniquePokemonByNumber(pokedexNumber) {
  return getUniquePokemonByNumberCached(pokedexNumber);
}
