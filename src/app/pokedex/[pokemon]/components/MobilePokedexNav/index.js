"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildPath } from "@/app/utils";

export default function PokedexHeader({
  pokemon,
  previousPokemon,
  nextPokemon,
}) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center">
      {previousPokemon ? (
        <Link
          prefetch={true}
          href={buildPath(pathname, previousPokemon.name)}
          className="flex flex-row mr-auto items-center underline"
        >
          {`← #${String(previousPokemon.pokedex_number).padStart(3, "0")}`}
          <Image
            src={previousPokemon.sprite_party_filepath.toLowerCase()}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            alt={`${previousPokemon.name} party sprite`}
            className="max-w-[50px]"
            unoptimized
            priority
          />
        </Link>
      ) : (
        <div className="w-24 mr-auto" />
      )}
      <h1
        className="text-2xl md:text-4xl"
        data-testid="pokemon-name"
      >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
        pokemon.name
      }`}</h1>
      {nextPokemon ? (
        <Link
          href={buildPath(pathname, nextPokemon.name)}
          className="flex flex-row ml-auto items-center underline"
        >
          <Image
            src={nextPokemon.sprite_party_filepath.toLowerCase()}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            alt={`${nextPokemon.name} party sprite`}
            className="max-w-[25px] md:max-w-[50px]"
            unoptimized
            priority
          />
          {`#${String(nextPokemon.pokedex_number).padStart(3, "0")} →`}
        </Link>
      ) : (
        <div className="w-24 ml-auto" />
      )}
    </div>
  );
}
