"use client";

import { usePathname, useRouter } from "next/navigation";

export default function PokemonListDropdown({ pokemons }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      onChange={(event) =>
        pathname.includes("pokedex/")
          ? router.push(event.target.value)
          : router.push(`pokedex/${event.target.value}`)
      }
      className="rounded-md p-2"
    >
      {pokemons?.map((pokemon) => {
        return (
          <option
            key={pokemon.name}
            value={pokemon.name.replace(" ", "-").toLowerCase()}
          >
            {`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
              pokemon.name
            }`}
          </option>
        );
      })}
    </select>
  );
}
