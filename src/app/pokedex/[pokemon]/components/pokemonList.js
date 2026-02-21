"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { buildPath, slugifyPokemonName } from "@/app/utils";

import LabeledElement from "@/components/LabeledElement";
import Input from "@/components/Input";

import PokedexButton from "../../components/pokedexButton";

export const SORTING_METHODS = { alphabetical: "ALPHA", numerical: "NUM" };

export default function PokemonList({ pokemons }) {
  const pathname = usePathname();
  const selectedPokemonSlug = pathname.split("/")[2] ?? "";

  const [nameFilter, setNameFilter] = useState("");
  const [sort, setSort] = useState(SORTING_METHODS.numerical);

  const filteredAndSortedPokemons = useMemo(() => {
    if (!pokemons) {
      return [];
    }

    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()),
    );

    return [...filtered].sort((pokemon1, pokemon2) => {
      switch (sort) {
        case SORTING_METHODS.alphabetical:
          return (pokemon1.name > pokemon2.name) - (pokemon1.name < pokemon2.name);
        case SORTING_METHODS.numerical:
        default:
          return (
            (pokemon1.pokedex_number > pokemon2.pokedex_number) -
            (pokemon1.pokedex_number < pokemon2.pokedex_number)
          );
      }
    });
  }, [pokemons, nameFilter, sort]);

  return (
    <div
      className="flex flex-col p-4 w-full items-center basis-0 grow overflow-y-scroll no-scrollbar"
      data-testid="pokemon-list-with-actions-container"
    >
      <h1 className="text-2xl">Pokemon</h1>
      <LabeledElement
        label="Search"
        childId="pokemon-list-search-field"
        testId="pokemon-list-search-input"
        containerTwExtraClasses="w-full"
      >
        <Input
          id="pokemon-list-search-field"
          testId="pokemon-list-search"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
      </LabeledElement>
      <LabeledElement
        label="Sort"
        childId="pokemon-list-sort-field"
        testId="pokemon-list-sort-dropdown"
        containerTwExtraClasses="w-full"
      >
        <select
          id="pokemon-list-sort-field"
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
        {filteredAndSortedPokemons.map((pokemon) => (
          <PokedexButton
            key={pokemon.name}
            pokemon={pokemon}
            href={buildPath(pathname, pokemon.name)}
            selected={selectedPokemonSlug === slugifyPokemonName(pokemon.name)}
          />
        ))}
      </ul>
    </div>
  );
}
