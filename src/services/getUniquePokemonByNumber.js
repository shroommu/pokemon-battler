"use server";

import { cache } from "react";
import prisma from "@/lib/prisma";

export const getUniquePokemonByNumber = cache(async (pokedexNumber) => {
  const data = await prisma.pokemon.findFirst({
    where: {
      pokedex_number: pokedexNumber,
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
