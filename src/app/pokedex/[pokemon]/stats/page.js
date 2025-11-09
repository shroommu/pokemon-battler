import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

export default async function Stats({ params }) {
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
    <PokemonDataEntry
      pokemon={pokemon.data}
      previousPokemon={previousPokemon?.data}
      nextPokemon={nextPokemon?.data}
    />
  );
}
