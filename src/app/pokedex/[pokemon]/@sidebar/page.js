import { getAllPokemon } from "@/services/getAllPokemon";

import PokemonList from "../components/pokemonList";

export default async function Page({}) {
  const pokemons = await getAllPokemon();

  return <PokemonList pokemons={pokemons.data} />;
}
