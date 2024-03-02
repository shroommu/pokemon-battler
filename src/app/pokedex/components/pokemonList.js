"use client";

import LabeledElement from "@/components/LabeledElement";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tv } from "tailwind-variants";

const pokemonListButtonStyle = tv({
  base: "group py-2 px-4 mb-1 bg-gray-400 rounded-md hover:bg-gray-300 active:bg-gray-500 w-full border-2 border-gray-400",
  variants: {
    state: {
      selected: "bg-gray-300 hover:bg-gray-200 active:bg-gray-400",
    },
  },
});

export default function PokemonList({ pokemons }) {
  const pathname = usePathname();

  const [nameFilter, setNameFilter] = useState("");

  return (
    <div
      className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center basis-0 grow overflow-y-scroll no-scrollbar"
      testid="pokemon-list-with-actions-container"
    >
      <h1 className="text-2xl">Pokemon</h1>
      <LabeledElement
        label="Search"
        testId="pokemon-list-search-input"
        containerTwExtraClasses="w-full"
      >
        <input
          className="w-full rounded-md border-2 border-gray-400 p-2"
          testid="pokemon-list-search-input"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
      </LabeledElement>

      <ul className="min-w-[250px] mt-4 overflow-y-scroll no-scrollbar">
        {pokemons
          ?.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .map((pokemon) => {
            return (
              <Link
                href={
                  pathname.includes("pokedex/")
                    ? pokemon.name.replace(" ", "-").toLowerCase()
                    : `pokedex/${pokemon.name.replace(" ", "-").toLowerCase()}`
                }
                prefetch={true}
                key={pokemon.name}
              >
                <li
                  className={pokemonListButtonStyle({
                    state:
                      pathname.includes(
                        pokemon.name.replace(" ", "-").toLowerCase()
                      ) && "selected",
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
    </div>
  );
}
