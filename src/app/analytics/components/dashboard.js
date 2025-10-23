"use client";

import { useState } from "react";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";
import { getUniquePokemonByName } from "@/actions/getUniquePokemonByName";

export default function Dashboard({ pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [selectedPokemonData, setSelectedPokemonData] = useState();

  async function getPokemonData(pokemonName) {
    const pokemonData = await getUniquePokemonByName(pokemonName);

    setSelectedPokemon(pokemonData?.data?.name);
    setSelectedPokemonData(pokemonData);

  } 

  return (
    <div data-testid="container" className="flex grow flex-row h-auto w-auto">
      <section className="flex flex-col lg:flex-row w-full">
        <div
          className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex"
          data-testid="pokemon-list-container"
        >
          <PokemonList pokemons={pokemons} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} getPokemonData={getPokemonData} />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          data-testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown pokemons={pokemons} setSelectedPokemon={setSelectedPokemon} />
        </div>
        <div
          className="flex flex-col m-4 md:w-full items-center"
          data-testid="pokedex-dashboard-container"
        >
          <section
            className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-screen"
            data-testid="pokedex-home-page"
          >
            Selected Pokemon: {selectedPokemonData?.data?.name}
          </section>
        </div>
      </section>
    </div>
  );
}