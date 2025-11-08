"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buildPath } from "@/app/utils";

import Dropdown from "@/components/Dropdown";

export default function PokemonListDropdown({ pokemons }) {
  const pathname = usePathname();

  return (
    <Dropdown
      buttonText={"Select a Pokemon"}
      buttonType={"tertiary"}
      className="rounded-md p-2"
      data-testid="pokemon-list-dropdown"
    >
      {pokemons?.map((pokemon) => {
        return (
          <div key={pokemon.name} className="p-2">
            <Link
              prefetch={true}
              href={buildPath(pathname, pokemon.name)}
              data-testid={`${pokemon.name
                .replace(" ", "-")
                .toLowerCase()}-link`}
            >
              {`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
                pokemon.name
              }`}
            </Link>
          </div>
        );
      })}
    </Dropdown>
  );
}
