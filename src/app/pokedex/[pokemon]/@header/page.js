import { Suspense } from "react";

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import { Skeleton } from "@/components/LoadingIndicators";

import PreviousPokemonLink from "./components/previousPokemonLink";
import NextPokemonLink from "./components/nextPokemonLink";

async function getPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  );
  return pokemon;
}

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = params;

  const { data: pokemon } = await getPokemon(pokemonSlug);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center mb-2">
        <Suspense fallback={<Skeleton className="w-24 h-[50px] mr-auto" />}>
          <PreviousPokemonLink pokemonSlug={pokemonSlug} />
        </Suspense>
        <h1
          className="text-2xl md:text-4xl"
          data-testid="pokemon-name"
        >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
          pokemon.name
        }`}</h1>
        <Suspense fallback={<Skeleton className="w-24 h-[50px] ml-auto" />}>
          <NextPokemonLink pokemonSlug={pokemonSlug} />
        </Suspense>
      </div>
    </div>
  );
}
