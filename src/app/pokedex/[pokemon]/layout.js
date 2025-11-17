import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";

export default async function Layout({ info, details, header }) {
  const { data: pokemons } = await getAllPokemon();

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col items-stretch md:flex-row h-full w-full"
    >
      <div
        className="hidden flex-col flex-none rounded-md bg-gray-300 mr-4 lg:flex h-auto"
        data-testid="pokemon-list-container"
      >
        <PokemonList pokemons={pokemons} />
      </div>
      <div
        className="flex flex-col h-full lg:h-auto w-full"
        data-testid="pokedex-entry-layout"
      >
        {header}
        <div
          className="flex flex-col xl:flex-row w-full xl:items-start pb-4 lg:pb-0 xl:flex-1"
          data-testid="pokedex-entry-container"
        >
          {info}
          {details}
        </div>
      </div>
    </div>
  );
}
