import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonInfo from "../components/PokemonInfo";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Page({ params }) {
  const { pokemon } = await params;

  const pokemonData = await getPokemon(pokemon);

  return <PokemonInfo pokemon={pokemonData.data} />;
}
