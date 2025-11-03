import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";

export default async function PokedexLayout({ children }) {
  const pokemons = await getAllPokemon();

  return (
    <div
      data-testid="container"
      className="flex flex-row h-auto w-full items-center"
    >
      <section className="flex flex-col lg:flex-row h-full w-full">
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
        <div
          className="flex flex-col p-4 h-full md:h-auto md:w-full"
          data-testid="page-container"
        >
          <div
            className="h-full p-4 pt-12 border-4 border-gray-500 bg-gray-300 rounded-md"
            data-testid="dark-gray-container"
          >
            <div
              className="h-full p-6 bg-gray-200 border-2 border-gray-400 rounded-md"
              data-testid="light-gray-container"
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
