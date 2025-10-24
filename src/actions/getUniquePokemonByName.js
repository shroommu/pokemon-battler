"use server";

import prisma from "@/lib/prisma";

export async function getUniquePokemonByName( pokemonName ) {
  const data = await prisma.pokemon.findUnique({
    where: {
      name: pokemonName
    },
    include: {
      primary_type: true,
    }
  })

  return { data };
}
