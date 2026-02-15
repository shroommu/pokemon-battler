"use server";

import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const toRoundedAverage = (value) => {
  return value == null ? 0 : Math.round(value);
};

const getAllPokemonAverageStatsCached = unstable_cache(
  async () => {
    const aggregate = await timedQuery("getAllPokemonAverageStats", () =>
      prisma.pokemon.aggregate({
        _avg: {
          hp: true,
          attack: true,
          defense: true,
          special: true,
          speed: true,
        },
      })
    );

    const data = {
      hp: toRoundedAverage(aggregate._avg.hp),
      attack: toRoundedAverage(aggregate._avg.attack),
      defense: toRoundedAverage(aggregate._avg.defense),
      special: toRoundedAverage(aggregate._avg.special),
      speed: toRoundedAverage(aggregate._avg.speed),
    };

    return { data };
  },
  ["pokemon:stats:average:all"],
  { revalidate: 900 }
);

export async function getAllPokemonAverageStats() {
  return getAllPokemonAverageStatsCached();
}
