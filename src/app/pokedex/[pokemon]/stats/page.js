import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Stats(props) {
  const params = await props.params;
  const pokemon = getPokemon(params.pokemon);

  return <PokemonDataEntry pokemon={pokemon.data} />;
}
