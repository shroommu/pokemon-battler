"use server";

import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { sum } from "mathjs";
import { timedQuery } from "@/lib/queryTiming";

const toStatValue = (value) => value ?? 0;

const getAllPokemonWithMaxStatsCached = unstable_cache(
  async () => {
    const pokemons = await timedQuery("getAllPokemonWithMaxStats", () =>
      prisma.pokemon.findMany({
        select: {
          id: true,
          name: true,
          pokedex_number: true,
          sprite_party_filepath: true,
          hp: true,
          attack: true,
          defense: true,
          special: true,
          speed: true,
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
      })
    );

    const data = pokemons.map((pokemon) => ({
      ...pokemon,
      max_stats: sum([
        toStatValue(pokemon.hp),
        toStatValue(pokemon.attack),
        toStatValue(pokemon.defense),
        toStatValue(pokemon.special),
        toStatValue(pokemon.speed),
      ]),
    }));

    return { data };
  },
  ["pokemon:list:with-max-stats"],
  { revalidate: 900 }
);

export async function getAllPokemonWithMaxStats() {
  return getAllPokemonWithMaxStatsCached();
}
