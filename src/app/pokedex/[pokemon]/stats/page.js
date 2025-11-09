import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";

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

export default async function Stats({ params }) {
  const pokemonData = getPokemon(params.pokemon);
  const previousPokemonData = getPreviousPokemon(params.pokemon);
  const nextPokemonData = getNextPokemon(params.pokemon);

  const [pokemon, previousPokemon, nextPokemon] = await Promise.all([
    pokemonData,
    previousPokemonData,
    nextPokemonData,
  ]);

  return (
    <PokemonDataEntry
      pokemon={pokemon.data}
      previousPokemon={previousPokemon.data}
      nextPokemon={nextPokemon.data}
    />
  );
}
