"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { buildPath } from "@/app/utils";

import LabeledElement from "@/components/LabeledElement";
import Input from "@/components/Input";

import PokedexButton from "../../components/pokedexButton";

export const SORTING_METHODS = { alphabetical: "ALPHA", numerical: "NUM" };

export default function PokemonList({ pokemons }) {
  const pathname = usePathname();

  const [nameFilter, setNameFilter] = useState("");
  const [sort, setSort] = useState(SORTING_METHODS.numerical);

  return (
    <div
      className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center basis-0 grow overflow-y-scroll no-scrollbar"
      data-testid="pokemon-list-with-actions-container"
    >
      <h1 className="text-2xl">Pokemon</h1>
      <LabeledElement
        label="Search"
        testId="pokemon-list-search-input"
        containerTwExtraClasses="w-full"
      >
        <Input
          testId="pokemon-list-search"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
      </LabeledElement>
      <LabeledElement
        label="Sort"
        testId="pokemon-list-sort-dropdown"
        containerTwExtraClasses="w-full"
      >
        <select
          className="w-full rounded-md border-2 border-gray-400 bg-white p-2"
          data-testid="pokemon-list-sort-dropdown"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value={SORTING_METHODS.numerical}>By Pokedex Number</option>
          <option value={SORTING_METHODS.alphabetical}>By Name</option>
        </select>
      </LabeledElement>
      <ul
        className="min-w-[250px] mt-4 overflow-y-scroll"
        data-testid="pokemon-list"
      >
        {pokemons
          ?.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .sort((pokemon1, pokemon2) => {
            switch (sort) {
              case SORTING_METHODS.alphabetical:
                return (
                  (pokemon1.name > pokemon2.name) -
                  (pokemon1.name < pokemon2.name)
                );
              case SORTING_METHODS.numerical:
                return (
                  (pokemon1.pokedex_number > pokemon2.pokedex_number) -
                  (pokemon1.pokedex_number < pokemon2.pokedex_number)
                );
            }
          })
          .map((pokemon) => {
            return (
              <PokedexButton
                key={pokemon.name}
                pokemon={pokemon}
                href={buildPath(pathname, pokemon.name)}
                selected={pathname.includes(
                  pokemon.name.replace(" ", "-").toLowerCase()
                )}
              />
            );
          })}
      </ul>
    </div>
  );
}
