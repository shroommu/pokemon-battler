"use client";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";

export default function Dashboard({ pokemons }) {
  return (
    <div data-testid="container" className="flex grow flex-row h-auto w-auto">
      <section className="flex flex-col lg:flex-row w-full">
        <div
          className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex"
          data-testid="pokemon-list-container"
        >
          <PokemonList pokemons={pokemons} />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          data-testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown pokemons={pokemons} selectedPokemon={"Bulbasaur"} />
        </div>
        <div
          className="flex flex-col m-4 md:w-full items-center"
          data-testid="pokedex-dashboard-container"
        >
        </div>
      </section>
    </div>
  );
}