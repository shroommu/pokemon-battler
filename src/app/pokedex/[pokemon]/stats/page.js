import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";
import { notFound } from "next/navigation";

import PokemonDataEntry from ".";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Stats({ params }) {
  const { data: pokemon } = await getPokemon(params.pokemon);
  if (!pokemon) {
    notFound();
  }

  return (
    <PokemonDataEntry
      key={pokemon.id ?? pokemon.name}
      pokemon={pokemon}
    />
  );
}
