import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import AnalyticsClient from "./AnalyticsClient";

export default async function Analytics({ searchParams } = {}) {
  const { data } = await getAllPokemonWithMaxStats();
  const resolvedSearchParams = await searchParams;
  const selectedSection =
    typeof resolvedSearchParams?.section === "string"
      ? resolvedSearchParams.section
      : "overview";

  return (
    <AnalyticsClient
      pokemonData={data ?? []}
      selectedSection={selectedSection}
      testId="analytics-page"
    />
  );
}
