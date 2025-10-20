"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function PokemonListDropdown({ pokemons }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      onChange={(event) => {
        pathname.includes("pokedex/")
          ? router.push(event.target.value)
          : router.push(`pokedex/${event.target.value}`);
      }}
      className="rounded-md p-2"
      data-testid="pokemon-list-dropdown"
    >
      <option value="" data-testid="default-option">
        Select a Pokemon
      </option>
      {pokemons?.map((pokemon) => {
        return (
          <option
            key={pokemon.name}
            value={pokemon.name.replace(" ", "-").toLowerCase()}
            data-testid={`${pokemon.name
              .replace(" ", "-")
              .toLowerCase()}-option`}
          >
            <Link
              prefetch={true}
              href={
                pathname.includes("pokedex/")
                  ? pokemon.name.replace(" ", "-").toLowerCase()
                  : `pokedex/${pokemon.name.replace(" ", "-").toLowerCase()}`
              }
              data-testid={`${pokemon.name
                .replace(" ", "-")
                .toLowerCase()}-link`}
            >
              {`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
                pokemon.name
              }`}
            </Link>
          </option>
        );
      })}
    </select>
  );
}
