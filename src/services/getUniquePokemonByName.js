"use server";

import { cache } from "react";
import prisma from "@/lib/prisma";

export const getUniquePokemonByName = cache(async (pokemonName) => {
  const data = await prisma.pokemon.findUnique({
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
  });

  return { data };
});
