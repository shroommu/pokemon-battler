import { notFound } from "next/navigation";

import Details from "..";
import { getPokemonBySlug } from "../../getPokemonBySlug";

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    notFound();
  }

  return <Details pokemon={pokemon} pokemonSlug={pokemonSlug} selectedTab="Stats" data-testid="details-page-stats" />;
}
