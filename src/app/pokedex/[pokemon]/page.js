import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import Info from ".";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function InfoPage(props) {
  const params = await props.params;
  const pokemon = await getPokemon(params.pokemon);

  return <Info pokemon={pokemon.data} />;
}
