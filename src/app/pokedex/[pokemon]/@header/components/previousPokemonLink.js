import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

import { capitalizePokemonSlug } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";

async function getPreviousPokemon(pokemonName) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(pokemonName)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number - 1)
  );
  return pokemon;
}

export default async function PreviousPokemonLink({ pokemonSlug }) {
  const { data: previousPokemon } = await getPreviousPokemon(pokemonSlug);

  return (
    <>
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
    </>
  );
}
