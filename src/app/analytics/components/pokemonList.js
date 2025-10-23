"use client";

import LabeledElement from "@/components/LabeledElement";
import Input from "@/components/Input";
import Image from "next/image";
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

export const SORTING_METHODS = { alphabetical: "ALPHA", numerical: "NUM" };

export default function PokemonList({ pokemons, selectedPokemon, setSelectedPokemon, getPokemonData }) {

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
          className="w-full rounded-md border-2 border-gray-400 p-2"
          data-testid="pokemon-list-sort-dropdown"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value={SORTING_METHODS.numerical}>By Pokedex Number</option>
          <option value={SORTING_METHODS.alphabetical}>By Name</option>
        </select>
      </LabeledElement>
      <ul
        className="min-w-[250px] mt-4 overflow-y-scroll no-scrollbar"
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
              <li
                key={pokemon.name}
                className={pokemonListButtonStyle({
                  state:
                    pokemon.name == selectedPokemon && "selected",
                })}
              >
                <button className="flex flex-row items-center w-full group-hover:[&>img]:animate-party_bounce" onClick={() => getPokemonData(pokemon.name)}>
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
            );
          })}
      </ul>
    </div>
  );
}
