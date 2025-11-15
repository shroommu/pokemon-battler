"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildPath } from "@/app/utils";
import PagePill from "./components/pagePill";

export default function PokedexHeader({
  pokemon,
  previousPokemon,
  nextPokemon,
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center mb-2">
        {previousPokemon ? (
          <Link
            prefetch={true}
            href={buildPath(
              pathname,
              previousPokemon.name.replace(" ", "-").toLowerCase()
            )}
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
        <h1
          className="text-2xl md:text-4xl"
          data-testid="pokemon-name"
        >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
          pokemon.name
        }`}</h1>
        {nextPokemon ? (
          <Link
            href={buildPath(
              pathname,
              nextPokemon.name.replace(" ", "-").toLowerCase()
            )}
            className="flex flex-row ml-auto items-center underline"
          >
            <div className="relative w-[50px] aspect-square">
              <Image
                src={nextPokemon.sprite_party_filepath.toLowerCase()}
                fill
                alt={`${nextPokemon.name} party sprite`}
                className="max-w-[50px] [image-rendering:pixelated]"
                unoptimized
                priority
              />
            </div>
            {`#${String(nextPokemon.pokedex_number).padStart(3, "0")} →`}
          </Link>
        ) : (
          <div className="w-24 ml-auto" />
        )}
      </div>
      <div
        className="flex w-full justify-center"
        data-testid="subpage-navigation"
      >
        <PagePill
          text={"Info"}
          href={`/pokedex/${pokemon.name}`}
          selected={pathname.split("/").length == 3}
        />
        <PagePill
          text={"Stats"}
          href={`/pokedex/${pokemon.name}/stats`}
          selected={pathname.includes("stats")}
        />
      </div>
    </div>
  );
}
