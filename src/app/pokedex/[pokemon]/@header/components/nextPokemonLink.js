import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";
import { slugifyPokemonName } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";

async function getNextPokemon(currentPokedexNumber) {
  if (!currentPokedexNumber) {
    return { data: null };
  }

  return getUniquePokemonByNumber(currentPokedexNumber + 1);
}

export default async function NextPokemonLink({
  currentPokedexNumber,
  tabSegment = "moves",
}) {
  const { data: nextPokemon } = await getNextPokemon(currentPokedexNumber);

  return (
    <>
      {nextPokemon ? (
        <Link
          prefetch={true}
          href={`/pokedex/${slugifyPokemonName(nextPokemon.name)}/${tabSegment}`}
          className="flex flex-row ml-auto items-center underline"
          data-testid={"next-pokemon-link"}
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
        <div className="w-24 ml-auto" data-testid="next-pokemon-link-empty" />
      )}
    </>
  );
}
