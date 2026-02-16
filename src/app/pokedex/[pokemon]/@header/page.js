import { Suspense } from "react";

import { notFound } from "next/navigation";

import { Skeleton } from "@/components/LoadingIndicators";

import { getPokemonBySlug } from "../getPokemonBySlug";

import PreviousPokemonLink from "./components/previousPokemonLink";
import NextPokemonLink from "./components/nextPokemonLink";

export default async function Page({ params, tabSegment = "moves" }) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center mb-2">
        <Suspense fallback={<Skeleton className="w-24 h-[50px] mr-auto" />}>
          <PreviousPokemonLink pokemonSlug={pokemonSlug} tabSegment={tabSegment} />
        </Suspense>
        <h1
          className="text-2xl md:text-4xl"
          data-testid="pokemon-name"
        >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
          pokemon.name
        }`}</h1>
        <Suspense fallback={<Skeleton className="w-24 h-[50px] ml-auto" />}>
          <NextPokemonLink pokemonSlug={pokemonSlug} tabSegment={tabSegment} />
        </Suspense>
      </div>
    </div>
  );
}
