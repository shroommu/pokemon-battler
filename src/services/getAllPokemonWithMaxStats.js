"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

import { sum } from "mathjs";

export const getAllPokemonWithMaxStats = cache(async () => {
  const pokemons = await prisma.pokemon.findMany();

  const data = pokemons.map((pokemon) => {
    return {
      ...pokemon,
      maxStats: sum([
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.special,
        pokemon.speed,
      ]),
    };
  });

  return { data };
});
