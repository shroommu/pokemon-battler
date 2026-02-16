import { getPokemonByNameBasic } from "@/services/getPokemonByNameBasic";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug, slugifyPokemonName } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";

async function getNextPokemon(pokemonName) {
  const pokemon = await getPokemonByNameBasic(capitalizePokemonSlug(pokemonName));
  if (!pokemon.data?.pokedex_number) {
    return { data: null };
  }

  return getUniquePokemonByNumber(pokemon.data.pokedex_number + 1);
}

export default async function NextPokemonLink({ pokemonSlug, tabSegment = "moves" }) {
  const { data: nextPokemon } = await getNextPokemon(pokemonSlug);

  return (
    <>
      {nextPokemon ? (
        <Link
          prefetch={true}
          href={`/pokedex/${slugifyPokemonName(nextPokemon.name)}/${tabSegment}`}
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
    </>
  );
}
