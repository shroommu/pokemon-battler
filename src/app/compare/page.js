import {
  getComparePokemonByName,
  getComparePokemonOptions,
  getPokemonNameFromSlug,
} from "./data";
import CompareClient from "./CompareClient";

export default async function ComparePage({ searchParams } = {}) {
  const pokemonOptions = await getComparePokemonOptions();
  const resolvedSearchParams = await searchParams;
  const initialA =
    typeof resolvedSearchParams?.a === "string" ? resolvedSearchParams.a : "";
  const initialB =
    typeof resolvedSearchParams?.b === "string" ? resolvedSearchParams.b : "";
  const selectedAName = getPokemonNameFromSlug(pokemonOptions, initialA);
  const selectedBName = getPokemonNameFromSlug(pokemonOptions, initialB);

  const [pokemonA, pokemonB] = await Promise.all([
    selectedAName ? getComparePokemonByName(selectedAName) : Promise.resolve(null),
    selectedBName && selectedBName !== selectedAName
      ? getComparePokemonByName(selectedBName)
      : Promise.resolve(null),
  ]);

  return (
    <CompareClient
      pokemonOptions={pokemonOptions}
      initialA={initialA}
      initialB={initialB}
      pokemonA={pokemonA}
      pokemonB={pokemonB}
    />
  );
}
