"use server";

import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const getAllPokemonCached = unstable_cache(
  async () => {
    const data = await timedQuery("getAllPokemon", () =>
      prisma.pokemon.findMany({
        select: {
          id: true,
          name: true,
          pokedex_number: true,
          sprite_party_filepath: true,
          primary_type: {
            select: {
              id: true,
              name: true,
              display_color: true,
            },
          },
          secondary_type: {
            select: {
              id: true,
              name: true,
              display_color: true,
            },
          },
        },
        orderBy: [{ pokedex_number: "asc" }],
      })
    );

    return { data };
  },
  ["pokemon:list"],
  { revalidate: 86400 }
);

export async function getAllPokemon() {
  return getAllPokemonCached();
}
