import { getAllPokemon } from "@/services/getAllPokemon";
import { slugifyPokemonName } from "@/app/utils";
import { getPokemonBySlug } from "./getPokemonBySlug";

import PokemonList from "./components/pokemonList";

export async function generateStaticParams() {
  const { data: pokemons } = await getAllPokemon();

  return (pokemons ?? []).map((pokemon) => ({
    pokemon: slugifyPokemonName(pokemon.name),
  }));
}

export async function generateMetadata({ params }) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    return {
      title: "Pokemon Not Found | Pokedex",
      description: "This Pokemon entry could not be found in the Gen 1 Pokedex.",
    };
  }

  const pokemonNumber = String(pokemon.pokedex_number).padStart(3, "0");

  return {
    title: `#${pokemonNumber} ${pokemon.name} | Pokedex`,
    description: pokemon.pokedex_entry ?? `View details for ${pokemon.name} in the Gen 1 Pokedex.`,
  };
}

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
          className="flex flex-col xl:flex-row h-full w-full xl:items-start lg:pb-0 xl:flex-1"
          data-testid="pokedex-entry-container"
        >
          {info}
          {details}
        </div>
      </div>
    </div>
  );
}
