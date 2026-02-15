"use server";

import { cache } from "react";
import prisma from "@/lib/prisma";

const toRoundedAverage = (value) => {
  return value == null ? 0 : Math.round(value);
};

export const getPokemonTypeAverageStats = cache(async (primaryTypeName) => {
  const aggregate = await prisma.pokemon.aggregate({
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
  });

  const data = {
    hp: toRoundedAverage(aggregate._avg.hp),
    attack: toRoundedAverage(aggregate._avg.attack),
    defense: toRoundedAverage(aggregate._avg.defense),
    special: toRoundedAverage(aggregate._avg.special),
    speed: toRoundedAverage(aggregate._avg.speed),
  };

  return { data };
});
