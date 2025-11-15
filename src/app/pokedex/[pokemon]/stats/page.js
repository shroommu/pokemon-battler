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
  const pokemonSlug = await params;
  const pokemon = await getPokemon(pokemonSlug.pokemon);

  return <PokemonDataEntry pokemon={pokemon.data} />;
}
