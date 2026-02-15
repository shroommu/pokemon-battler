"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const getUniquePokemonByNameCached = unstable_cache(
  async (pokemonName) => {
    const data = await timedQuery("getUniquePokemonByName", () =>
      prisma.pokemon.findUnique({
        where: {
          name: pokemonName,
        },
        include: {
          primary_type: true,
          secondary_type: true,
          pokemon_moves: {
            select: {
              move: {
                include: {
                  type: { select: { name: true } },
                },
              },
            },
          },
        },
      })
    );

    return { data };
  },
  ["pokemon:detail:by-name"],
  { revalidate: 900 }
);

export async function getUniquePokemonByName(pokemonName) {
  return getUniquePokemonByNameCached(pokemonName);
}
