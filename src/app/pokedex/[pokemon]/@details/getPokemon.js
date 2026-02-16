import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

export async function getPokemonBySlug(pokemonSlug) {
  const { data: pokemon } = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonSlug),
  );

  return pokemon;
}
