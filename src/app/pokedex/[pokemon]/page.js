import PokedexEntry from "./components/pokedexEntry";
import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "./components/pokemonList";
import PokemonListDropdown from "./components/pokemonListDropdown";
import Tabs from "./components/Tabs";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

export default async function PokedexEntryContainer({ params }) {
  function capitalizePokemonSlug(slug) {
    const words = slug.split("-");
    const capitalizedWords = words.map(
      (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
    );
    return capitalizedWords.join(" ");
  }

  const pokemons = await getAllPokemon();
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  return (
    <div
      data-testid="pokedex-container"
      className="relative flex flex-col md:flex-row h-full w-full"
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
      <div className="absolute right-8 -top-8">
        <Tabs />
      </div>
      <div className="flex flex-col w-full p-4" data-testid="tabs-container">
        <div
          className="flex w-full p-4 pt-12 bg-gray-200 rounded-md"
          data-testid="pokemon-data-container"
        >
          <PokedexEntry pokemon={pokemon.data} />
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
