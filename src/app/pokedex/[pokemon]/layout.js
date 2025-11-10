import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";
import Tabs from "./components/Tabs";

export default async function PokedexEntryContainer({ params, children }) {
  const pokemons = await getAllPokemon();

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col items-stretch md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col flex-none rounded-md bg-gray-300 mr-4 lg:flex h-auto"
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
      <div className="flex flex-col h-full lg:h-auto w-full">{children}</div>
    </div>
  );
}
