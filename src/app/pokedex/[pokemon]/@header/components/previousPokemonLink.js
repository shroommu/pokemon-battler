import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";
import { slugifyPokemonName } from "@/app/utils";

import Image from "next/image";
import Link from "next/link";

async function getPreviousPokemon(currentPokedexNumber) {
  if (!currentPokedexNumber) {
    return { data: null };
  }

  return getUniquePokemonByNumber(currentPokedexNumber - 1);
}

export default async function PreviousPokemonLink({
  currentPokedexNumber,
  tabSegment = "moves",
}) {
  const { data: previousPokemon } = await getPreviousPokemon(currentPokedexNumber);

  return (
    <>
      {previousPokemon ? (
        <Link
          prefetch={true}
          href={`/pokedex/${slugifyPokemonName(previousPokemon.name)}/${tabSegment}`}
          className="flex flex-row mr-auto items-center underline"
          data-testid={"previous-pokemon-link"}
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
        <div className="w-24 mr-auto" data-testid="previous-pokemon-link-empty" />
      )}
    </>
  );
}
