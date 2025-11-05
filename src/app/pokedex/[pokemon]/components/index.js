"use client";

import { useState } from "react";

import Info from "./Info";
import Stats from "./Stats";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";
import Tabs from "./Tabs";

function capitalizePokemonSlug(slug) {
  const words = slug.split("-");
  const capitalizedWords = words.map(
    (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
  );
  return capitalizedWords.join(" ");
}

export default function PokedexEntry({ pokemon, pokemons }) {
  const [selectedTab, setSelectedTab] = useState("Info");

  console.log(selectedTab);

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList pokemons={pokemons} />
      </div>
      <div
        className="flex flex-col m-4 mb-0 items-center lg:hidden"
        data-testid="pokemon-list-mobile-dropdown-container"
      >
        <PokemonListDropdown pokemons={pokemons} />
      </div>
      <div className="absolute right-[25%] -top-8">
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="flex flex-col w-full p-4" data-testid="tabs-container">
        <div
          className="flex w-full p-4 pt-12 bg-gray-200 rounded-md"
          data-testid="pokemon-data-container"
        >
          {selectedTab == "Info" && <Info pokemon={pokemon} />}
          {selectedTab == "Stats" && <Stats pokemon={pokemon} />}
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
