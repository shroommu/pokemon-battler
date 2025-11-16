import { Suspense } from "react";

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/LoadingIndicators";

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
  const { pokemon: pokemonSlug } = await params;

  const { data: pokemon } = await getPokemon(pokemonSlug);
  const { data: previousPokemon } = await getPreviousPokemon(pokemonSlug);
  const { data: nextPokemon } = await getNextPokemon(pokemonSlug);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center mb-2">
        <Suspense fallback={<Skeleton className="w-24 mr-auto" />}>
          {previousPokemon ? (
            <Link
              prefetch={true}
              href={`/pokedex/${previousPokemon.name
                .replace(" ", "-")
                .toLowerCase()}`}
              className="flex flex-row mr-auto items-center underline"
            >
              {`← #${String(previousPokemon.pokedex_number).padStart(3, "0")}`}
              <div className="relative w-[50px] aspect-square">
                <Image
                  src={previousPokemon.sprite_party_filepath.toLowerCase()}
                  fill
                  alt={`${previousPokemon.name} party sprite`}
                  unoptimized
                  priority
                />
              </div>
            </Link>
          ) : (
            <div className="w-24 mr-auto" />
          )}
        </Suspense>
        <h1
          className="text-2xl md:text-4xl"
          data-testid="pokemon-name"
        >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
          pokemon.name
        }`}</h1>
        <Suspense fallback={<Skeleton className="w-24 mr-auto" />}>
          {nextPokemon ? (
            <Link
              prefetch={true}
              href={`/pokedex/${nextPokemon.name
                .replace(" ", "-")
                .toLowerCase()}`}
              className="flex flex-row ml-auto items-center underline"
            >
              <div className="relative w-[50px] aspect-square">
                <Image
                  src={nextPokemon.sprite_party_filepath.toLowerCase()}
                  fill
                  alt={`${nextPokemon.name} party sprite`}
                  className="max-w-[50px]"
                  unoptimized
                  priority
                />
              </div>
              {`#${String(nextPokemon.pokedex_number).padStart(3, "0")} →`}
            </Link>
          ) : (
            <div className="w-24 ml-auto" />
          )}
        </Suspense>
      </div>
    </div>
  );
}
