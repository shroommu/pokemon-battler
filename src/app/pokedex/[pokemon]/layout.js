import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";
import Tabs from "./components/Tabs";

export default async function PokedexEntryContainer({ params, children }) {
  const pokemons = await getAllPokemon();

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col items-stretch md:flex-row h-auto w-full"
    >
      <div
        className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList pokemons={pokemons.data} />
      </div>

      <div
        className="absolute right-[7.5%] -top-4 lg:right-[25%] lg:-top-8"
        data-testid="tabs-container"
      >
        <Tabs />
      </div>
      <div className="flex flex-col h-full lg:h-auto w-full p-4">
        <div
          className="flex h-full w-full p-4 bg-gray-200 rounded-md justify-center"
          data-testid="pokemon-data-container"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
