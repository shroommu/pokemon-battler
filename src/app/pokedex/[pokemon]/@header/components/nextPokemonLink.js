import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug, slugifyPokemonName } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";

async function getNextPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number + 1)
  );
  return pokemon;
}

export default async function NextPokemonLink({ pokemonSlug }) {
  const { data: nextPokemon } = await getNextPokemon(pokemonSlug);

  return (
    <>
      {nextPokemon ? (
        <Link
          prefetch={true}
          href={`/pokedex/${slugifyPokemonName(nextPokemon.name)}`}
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
