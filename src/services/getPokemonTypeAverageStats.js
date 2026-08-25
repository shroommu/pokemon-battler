"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { timedQuery } from "@/lib/queryTiming";

const toRoundedAverage = (value) => {
  return value == null ? 0 : Math.round(value);
};

const getPokemonTypeAverageStatsCached = unstable_cache(
  async (primaryTypeName) => {
    const aggregate = await timedQuery("getPokemonTypeAverageStats", () =>
      prisma.pokemon.aggregate({
        _avg: {
          hp: true,
          attack: true,
          defense: true,
          special: true,
          speed: true,
        },
        where: {
          OR: [
            {
              primary_type: {
                is: {
                  name: primaryTypeName,
                },
              },
            },
            {
              secondary_type: {
                is: {
                  name: primaryTypeName,
                },
              },
            },
          ],
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
  ["pokemon:stats:average:type"],
  { revalidate: 86400 }
);

export async function getPokemonTypeAverageStats(primaryTypeName) {
  return getPokemonTypeAverageStatsCached(primaryTypeName);
}
