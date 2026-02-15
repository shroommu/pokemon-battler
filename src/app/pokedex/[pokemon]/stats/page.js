import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Stats({ params }) {
  const pokemon = await getPokemon(params.pokemon);

  return (
    <PokemonDataEntry
      key={pokemon.data?.id ?? pokemon.data?.name}
      pokemon={pokemon.data}
    />
  );
}
