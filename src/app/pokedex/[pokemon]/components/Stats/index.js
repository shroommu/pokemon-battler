"use client";

import { useEffect, useState } from "react";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import PokemonDataEntry from "./components/pokemonDataEntry";

export default function Stats({ pokemons }) {
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
      className="flex flex-col m-4 h-full lg:h-auto lg:w-full"
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
  );
}

export const dynamic = "force-dynamic";
