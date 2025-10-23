"use server";

import prisma from "@/lib/prisma";

export async function getUniquePokemonByName( pokemonName ) {
  const data = await prisma.pokemon.findUnique({
    where: {
      name: pokemonName
    },
  })

  return { data };
}
