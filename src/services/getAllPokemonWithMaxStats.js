"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

import { sum } from "mathjs";

export const getAllPokemonWithMaxStats = cache(async () => {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      primary_type: true,
      secondary_type: true,
    },
  });

  const data = pokemons.map((pokemon) => {
    return {
      ...pokemon,
      max_stats: sum([
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.special,
        pokemon.speed,
      ]),
      primary_type_name: pokemon.primary_type.name,
      secondary_type_name: pokemon.secondary_type?.name,
    };
  });

  return { data };
});
