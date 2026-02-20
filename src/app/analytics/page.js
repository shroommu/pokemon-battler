import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import AnalyticsClient from "./AnalyticsClient";

export default async function Analytics() {
  const { data } = await getAllPokemonWithMaxStats();

  return <AnalyticsClient pokemonData={data ?? []} testId="analytics-page" />;
}
