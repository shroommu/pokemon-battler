"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

export const getAllPokemon = cache(async () => {
  const data = await prisma.pokemon.findMany({
    include: {
      primary_type: true,
      secondary_type: true,
    },

    orderBy: [{ pokedex_number: "asc" }],
  });

  return { data };
});
