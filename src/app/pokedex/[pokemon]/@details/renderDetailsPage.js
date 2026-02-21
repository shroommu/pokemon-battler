import { notFound } from "next/navigation";

import Details from ".";
import { getPokemonBySlug } from "../getPokemonBySlug";

export async function renderDetailsPage(params, selectedTab) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    notFound();
  }

  return <Details pokemon={pokemon} pokemonSlug={pokemonSlug} selectedTab={selectedTab} />;
}
