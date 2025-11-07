"use client";

import { locations } from "@/app/constants";
import { buildPath } from "@/app/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobilePokedexNav({ previousPokemon, nextPokemon }) {
  const pathname = usePathname();

  return (
    <div className="grid md:hidden mb-4 justify-center grid-cols-3">
      {previousPokemon ? (
        <Link
          href={buildPath(pathname, previousPokemon.name)}
          className="mr-auto"
        >
          ← Previous
        </Link>
      ) : (
        <div className="mr-auto" />
      )}
      <Link href={locations.POKEDEX} className="mx-auto">
        Pokedex
      </Link>
      {nextPokemon && (
        <Link href={buildPath(pathname, nextPokemon.name)} className="ml-auto">
          Next →
        </Link>
      )}
    </div>
  );
}
