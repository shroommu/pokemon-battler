import { Suspense } from "react";

import { getAllPokemon } from "@/services/getAllPokemon";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import { Skeleton } from "@/components/LoadingIndicators";

import PokemonList from "./components/pokemonList";
import PokemonInfo from "./components/PokemonInfo";
import PokedexHeader from "./components/PokedexHeader";

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

export default async function PokedexEntryLayout({ params, children }) {
  const pokemons = await getAllPokemon();
  const pokemonSlug = await params;

  const pokemon = await getPokemon(pokemonSlug.pokemon);
  const previousPokemon = await getPreviousPokemon(pokemonSlug.pokemon);
  const nextPokemon = await getNextPokemon(pokemonSlug.pokemon);

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col items-stretch md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col flex-none rounded-md bg-gray-300 mr-4 lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <Suspense fallback={<Skeleton className="h-full w-[275px]" />}>
          <PokemonList pokemons={pokemons.data} />
        </Suspense>
      </div>
      <div
        className="flex flex-col h-full lg:h-auto w-full"
        data-testid="pokedex-entry-layout"
      >
        <Suspense fallback={<Skeleton className="h-[75px] w-full" />}>
          <PokedexHeader
            pokemon={pokemon.data}
            nextPokemon={nextPokemon.data}
            previousPokemon={previousPokemon.data}
          />
        </Suspense>
        <div
          className="flex flex-col xl:flex-row w-full xl:items-start pb-4 lg:pb-0"
          data-testid="pokedex-entry-container"
        >
          <Suspense fallback={<PokedexInfoSkeleton />}>
            <PokemonInfo pokemon={pokemon.data} />
          </Suspense>
          <Suspense fallback={<Skeleton className="mt-4 h-full w-full" />}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
