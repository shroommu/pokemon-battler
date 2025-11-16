import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import PokedexHeader from "../components/PokedexHeader";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

async function getPreviousPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number - 1)
  );
  return pokemon;
}

async function getNextPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number + 1)
  );
  return pokemon;
}

export default async function Page({ params }) {
  const { pokemon } = await params;

  const pokemonData = await getPokemon(pokemon);
  const previousPokemon = await getPreviousPokemon(pokemon);
  const nextPokemon = await getNextPokemon(pokemon);

  return (
    <PokedexHeader
      pokemon={pokemonData.data}
      nextPokemon={nextPokemon.data}
      previousPokemon={previousPokemon.data}
    />
  );
}
