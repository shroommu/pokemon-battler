import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import Details from ".";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = params;
  const { data: pokemon } = await getPokemon(pokemonSlug);

  return <Details pokemon={pokemon} />;
}
