"use server";

import prisma from "@/lib/prisma";
import { mean, round } from "mathjs";

export async function getPokemonTypeAverageStats (primaryTypeName) {
  const pokemons = await prisma.pokemon.findMany({
    where: {
        OR: [
          {primary_type: {
            name: primaryTypeName
            }
          },
          {secondary_type: {
              name: primaryTypeName
            }
          }
        ]
      }
    });

  const data = {
    hp: round(mean(pokemons.map(d => d.hp)), 0),
    attack: round(mean(pokemons.map(d => d.attack)), 0),
    defense: round(mean(pokemons.map(d => d.defense)), 0),
    special: round(mean(pokemons.map(d => d.special)), 0),
    speed: round(mean(pokemons.map(d => d.speed)), 0),
  }

  return { data };
}
