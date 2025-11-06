import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import Info from ".";

export default async function InfoPage({ params }) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  return <Info pokemon={pokemon.data} />;
}
