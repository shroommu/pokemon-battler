import { cache } from "react";

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

export const getPokemonBySlug = cache(async (pokemonSlug) => {
  const { data: pokemon } = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonSlug),
  );

  return pokemon;
});
