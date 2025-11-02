"use client";

import { useEffect, useState } from "react";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import PokemonDataEntry from "./pokemonDataEntry";

export default function Dashboard({ pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [selectedPokemonData, setSelectedPokemonData] = useState();

  useEffect(() => {
    getPokemonData("Bulbasaur");
  }, []);

  async function getPokemonData(pokemonName) {
    const pokemonData = await getUniquePokemonByName(pokemonName);

    setSelectedPokemon(pokemonData?.data?.name);
    setSelectedPokemonData(pokemonData.data);
  }

  return (
    <div
      data-testid="analytics-dashboard-container"
      className="flex flex-col md:flex-row h-auto w-full"
    >
      <div
        className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList
          pokemons={pokemons}
          selectedPokemon={selectedPokemon}
          getPokemonData={getPokemonData}
        />
      </div>
      <div
        className="flex flex-col m-4 mb-0 items-center lg:hidden"
        data-testid="pokemon-list-mobile-dropdown-container"
      >
        <PokemonListDropdown
          pokemons={pokemons}
          getPokemonData={getPokemonData}
        />
      </div>
      <div
        className="flex flex-col m-4 h-full md:h-auto md:w-full"
        data-testid="pokemon-entry-container"
      >
        {selectedPokemonData ? (
          <PokemonDataEntry pokemonData={selectedPokemonData} />
        ) : (
          <section
            className="flex flex-col p-6 h-full w-full bg-gray-200 rounded-md items-center"
            data-testid="loading-container"
          >
            loading...
          </section>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
