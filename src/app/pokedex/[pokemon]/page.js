import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import Info from ".";

export default async function InfoPage({ params }) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  const previousPokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number - 1)
  );

  const nextPokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number + 1)
  );

  return (
    <Info
      pokemon={pokemon.data}
      previousPokemon={previousPokemon?.data}
      nextPokemon={nextPokemon?.data}
    />
  );
}
