import { notFound } from "next/navigation";

import Details from "..";
import { getPokemonBySlug } from "../getPokemon";

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    notFound();
  }

  return <Details pokemon={pokemon} pokemonSlug={pokemonSlug} selectedTab="Stats" />;
}
