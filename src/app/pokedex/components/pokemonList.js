"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

const pokemonListButtonStyle = tv({
  base: "group py-2 px-4 mb-1 bg-gray-400 rounded-md hover:bg-gray-300 active:bg-gray-500 w-full",
  variants: {
    state: {
      selected:
        "group py-2 px-4 mb-1 bg-gray-300 rounded-md hover:bg-gray-200 active:bg-gray-400 w-full",
    },
  },
});

export default function PokemonList({ pokemons }) {
  const pathname = usePathname();

  return (
    <ul className="m-4 grow basis-0 overflow-y-scroll no-scrollbar">
      {pokemons?.map((pokemon) => {
        return (
          <Link
            href={
              pathname.includes("pokedex/")
                ? pokemon.name.toLowerCase()
                : `pokedex/${pokemon.name.toLowerCase()}`
            }
            key={pokemon.name}
          >
            <li
              className={pokemonListButtonStyle({
                state:
                  pathname.includes(pokemon.name.toLowerCase()) && "selected",
              })}
            >
              <button className="flex flex-row items-center w-full group-hover:[&>img]:animate-party_bounce">
                <div className="mr-2">{`#${String(
                  pokemon.pokedex_number
                ).padStart(3, "0")}`}</div>
                <Image
                  src={pokemon.sprite_party_filepath.toLowerCase()}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "100%" }}
                  alt={`${pokemon.name} party sprite`}
                  className="max-w-[75px]"
                  unoptimized
                  priority
                />
                <div className="ml-auto">{pokemon.name}</div>
              </button>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
