import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";

export default async function PokedexLayout({ children }) {
  const pokemons = await getAllPokemon();

  return (
    <div
      data-testid="pokedex-container"
      className="flex flex-col md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList pokemons={pokemons.data} />
      </div>
      <div
        className="flex flex-col m-4 mb-0 items-center lg:hidden"
        data-testid="pokemon-list-mobile-dropdown-container"
      >
        <PokemonListDropdown pokemons={pokemons.data} />
      </div>
      <div className="flex w-full p-4">
        <div
          className="flex w-full p-4 pt-12 border-4 border-gray-500 bg-gray-300 rounded-md"
          data-testid="dark-gray-container"
        >
          <div
            className="flex w-full p-6 bg-gray-200 border-2 border-gray-400 rounded-md"
            data-testid="light-gray-container"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
