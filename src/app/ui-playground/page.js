import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import UIPlaygroundClient from "./UIPlaygroundClient";

export default async function UIPlayground() {
  const { data } = await getAllPokemonWithMaxStats();

  return <UIPlaygroundClient pokemonData={data ?? []} />;
}
