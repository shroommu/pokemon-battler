import { getAllPokemon } from "@/services/getAllPokemon";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonList from "./components/pokemonList";
import PokemonInfo from "./components/PokemonInfo";
import PokedexHeader from "./components/PokedexHeader";
import { Suspense } from "react";
import PokedexNavSkeleton from "./components/PokedexHeader/skeleton";
import PokedexInfoSkeleton from "./skeleton";

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

export default async function PokedexEntryContainer({ params, children }) {
  const pokemons = await getAllPokemon();
  const pokemonSlug = await params;

  const pokemonData = getPokemon(pokemonSlug.pokemon);
  const previousPokemonData = getPreviousPokemon(pokemonSlug.pokemon);
  const nextPokemonData = getNextPokemon(pokemonSlug.pokemon);

  const [pokemon, previousPokemon, nextPokemon] = await Promise.all([
    pokemonData,
    previousPokemonData,
    nextPokemonData,
  ]);

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col items-stretch md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col flex-none rounded-md bg-gray-300 mr-4 lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList pokemons={pokemons.data} />
      </div>
      <div
        className="flex flex-col h-full lg:h-auto w-full"
        data-testid="pokedex-entry-layout"
      >
        <Suspense fallback={<PokedexNavSkeleton />}>
          <PokedexHeader
            pokemon={pokemon.data}
            nextPokemon={nextPokemon.data}
            previousPokemon={previousPokemon.data}
          />
        </Suspense>
        <div
          className="flex flex-col xl:flex-row w-full xl:items-start"
          data-testid="pokedex-entry-container"
        >
          <Suspense fallback={<PokedexInfoSkeleton />}>
            <PokemonInfo pokemon={pokemon.data} />
          </Suspense>
          {children}
        </div>
      </div>
    </div>
  );
}
